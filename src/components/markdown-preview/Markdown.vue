
<script setup>

import {computed, onMounted, ref} from "vue";

  import NewNoteIcon from "@/components/shared/icons/NewNoteIcon.vue";
  import MenuIcon from "@/components/shared/icons/MenuIcon.vue";
  import SlideShowIcon from "@/components/shared/icons/SlideShowIcon.vue";
  import EditorIcon from "@/components/shared/icons/EditorIcon.vue";

  const editorRef = ref('')
  const preview = ref('')

  const notes = ref([])
  const sidebarNotes = computed(() => {
    return notes.value.map(el => {
      return {
        title: 'Title',
        description: 'description'
      }
    })
  })
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

  function newNote () {


    notes.value.push({
      id: Math.random().toString(36).substring(2, 9),
      text: ''
    })
    isEditorActive.value = true
  }

  onMounted(() => update())


</script>

<template>
  <div class="markdown">

    <div class="all-notes">
      <div class="actions">
        <MenuIcon />
        <span>All Notes</span>
        <NewNoteIcon @click="newNote" />
      </div>

      <div class="notes">
        <template v-if="sidebarNotes.length">
          <div class="note" v-for="note in sidebarNotes" :key="note.id">
            <p>{{ note.title }}</p>
            <span>{{ note.description }}</span>
          </div>
        </template>
        <template v-else>
          <div class="new-note" @click="newNote">
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
<!--          <p>Please add new note...</p>-->
        </div>
      </template>
    </div>


  </div>
</template>


<style lang="scss">
@import "style.scss";
</style>
