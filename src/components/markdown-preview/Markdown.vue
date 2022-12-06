
<script setup>

  import {onMounted, ref} from "vue";
  import {collection, addDoc, getDocs, serverTimestamp, query, orderBy} from 'firebase/firestore'
  import {db} from "@/services/firebase.js";

  import NewNoteIcon from "@/components/shared/icons/NewNoteIcon.vue";
  import MenuIcon from "@/components/shared/icons/MenuIcon.vue";
  import SlideShowIcon from "@/components/shared/icons/SlideShowIcon.vue";
  import EditorIcon from "@/components/shared/icons/EditorIcon.vue";
  import CreateNoteModal from './create-note-modal/Index.vue'





  // Notes

  const isModalOpened = ref(false)
  const title = ref('')
  const description = ref('')
  const notes = ref([])

  function toggleModal () {
    isModalOpened.value = !isModalOpened.value
  }

  async function getNotes () {
    notes.value = []
    const q = query(collection(db, "markdowns"), orderBy('createdAt', 'asc'))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      notes.value.push({
        id: doc.id,
        ...doc.data()
      })
    });
  }

  async function createNote () {

    if (!title.value || !description.value) return

    const docRef = await addDoc(collection(db, "markdowns"), {
      title: title.value,
      description: description.value,
      content: '',
      createdAt: serverTimestamp()
    });

    console.log('docRef', docRef)

    toggleModal()

    await getNotes()

  }


  // Notes




  const editorRef = ref('')
  const preview = ref('')

  const selectedNote = ref({})
  const isEditorActive = ref(false)


  const patterns = {
    h1: /^(# )(.*$)/gim,
    h2: /^(#{2} )(.*$)/gim,
    h3: /^(#{3} )(.*$)/gim,
    h4: /^(#{4} )(.*$)/gim,
    h5: /^(#{5} )(.*$)/gim,
    h6: /^(#{6} )(.*$)/gim,
    paragraph: /\b^(.* *)$( *|\b)/gim,
    bold: /((\*\*|__)(.*?)(\2))/gi,
    italic: /((\*|_)(.*?)(\2))/gi,
    lineThrough: /((~~)(.*?)(\2))/gi,
    url: /((\[(.*)\])(\(((https?:\/\/)(www\.)?([\w+\-_\.?]+)([^\W_]+)([\/\w\-?]*)(\?[\w+\-_\.]+\=[\w+\-_\.&?=]+)?)\)))/gi,
    img: /!\[(.*)\](\(((https?:\/\/)[www\.]?[\w+\-_\.?]+[^\W_]+[\/\w\-?]*(\?[\w+\-_\.]+\=[\w+\-_\.&?=]+)?)(\s+"(.*)")?(\s+=(\d+)x(\d+))?\))/ig,
    line: /(-{3,})/gi,
    // code: /`{3}([\S]*)?\n([\s\S]+)\n`{3}/gi,
    // quote: />([\S]*)?\n([\s\S]+)\n>/gi,
    code: /`{3}([\S]*)?\n([\s\S]+?)\n`{3}/gi,
    quote: />([\S]*)?\n([\s\S]+?)\n>/gi,
    // newLine: /--\s*/gi
  }

  function markdown (str = '') {
    return str
        .replace(/\u00a0/g, " ")
        // .replace(patterns.newLine, "<br>")
        .replace(patterns.quote, '<div class="quote">$2</div>') // quote
        .replace(patterns.h1, '<h1>$2</h1>') // heading 1
        .replace(patterns.h2, '<h2>$2</h2>') // heading 2
        .replace(patterns.h3, '<h3>$2</h3>') // heading 3
        .replace(patterns.h4, '<h4>$2</h4>') // heading 4
        .replace(patterns.h5, '<h5>$2</h5>') // heading 5
        .replace(patterns.h6, '<h6>$2</h6>') // heading 6
        .replace(patterns.paragraph, '<p>$1</p>') // paragraph
        .replace(patterns.bold, '<b>$3</b>') // bold
        .replace(patterns.italic, '<i>$3</i>') // italic
        .replace(patterns.lineThrough, '<s>$3</s>') // line through
        .replace(patterns.url, '<a href="$5" target="_blank">$3</a>') // URL
        .replace(patterns.img, '<img src="$3" title="$7" alt="$1" width="$9" height="$10" />') // img
        .replace(patterns.line, '<div class="line"></div>') // img
        .replace(patterns.code, '<pre>$2</pre>').replace(/`{3}( )*`{3}/g, ' ') // code
  }

  function update (e) {
    const value = e?.target?.innerText || editorRef.value?.innerText
    preview.value = markdown(value)
  }



  onMounted(() => {
    getNotes()
  })


</script>

<template>
  <CreateNoteModal
      :is-opened="isModalOpened"
      @close="toggleModal"
  >
    <div class="new-note-from">
      <div class="form-input">
        <label for="title">Title</label>
        <input id="title" type="text" v-model="title">
      </div>

      <div class="form-input">
        <label for="description">Description</label>
        <input id="description" type="text" v-model="description">
      </div>

      <button @click="createNote">Create</button>
    </div>
  </CreateNoteModal>

  <div class="markdown">
    <div class="all-notes">
      <div class="actions">
        <MenuIcon />
        <span>All Notes</span>
        <NewNoteIcon @click="toggleModal" />
      </div>

      <div class="notes">
        <template v-if="notes.length">
          <div class="note" v-for="note in notes" :key="note.id">
            <p>{{ note.title }}</p>
            <span>{{ note.description }}</span>
          </div>
        </template>
        <template v-else>
          <div class="new-note" @click="isModalOpened = true">
            <EditorIcon />
            <p>Create a note</p>
          </div>
        </template>
      </div>
    </div>

    <div class="selected-note">
      <template v-if="isEditorActive">
        <div
            ref="editorRef"
            class="editor overflow-scroll-y"
            spellcheck="true"
            contenteditable="true"
            @input.prevent="update"></div>
        <div class="preview overflow-scroll-y" v-html="preview"></div>
      </template>

      <template v-else>
        <div class="no-notes">
          <SlideShowIcon />
        </div>
      </template>
    </div>


  </div>
</template>


<style lang="scss">
@import "style.scss";
</style>
