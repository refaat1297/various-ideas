
<script setup>

  import {ref} from "vue";

  const editor = ref('')
  const preview = ref('')

  // watchEffect(() => {
  //   console.log('editor', editor.value)
  //   console.log('editor', editor.value)
  // })


  function update (e) {
    // console.log('----------------------------')
    // console.log('innerText', e.target.innerText)
    // console.log('textContent', e.target.textContent)
    // console.log('innerHTML', e.target.innerHTML)
    // console.log('----------------------------')


    editor.value = e.target.innerText



    preview.value = e.target.innerText

      .replace(/^(# )(.*$)/gim, '<h1>$2</h1>') // heading 1
      .replace(/^(#{2} )(.*$)/gim, '<h2>$2</h2>') // heading 2
      .replace(/^(#{3} )(.*$)/gim, '<h3>$2</h3>') // heading 3
      .replace(/^(#{4} )(.*$)/gim, '<h4>$2</h4>') // heading 4
      .replace(/^(#{5} )(.*$)/gim, '<h5>$2</h5>') // heading 5
      .replace(/^(#{6} )(.*$)/gim, '<h6>$2</h6>') // heading 6
      .replace(/\b^(.* *)$( *|\b)/gim, '<p>$1</p>') // paragraph
      .replace(/((\*\*|__)(.*?)(\2))/gi, '<b>$3</b>') // bold
      .replace(/((\*|_)(.*?)(\2))/gi, '<i>$3</i>') // italic
      .replace(/((~~)(.*?)(\2))/gi, '<s>$3</s>') // line through
      .replace(/((\[(.*)\])(\(((https?:\/\/)(www\.)?([\w+\-_\.?]+)([^\W_]+)([\/\w\-?]*)(\?[\w+\-_\.]+\=[\w+\-_\.&?=]+)?)\)))/gi,
          '<a href="$5" target="_blank">$3</a>') // URL




      // .replace(/^(# {1,6})(.*$)/gim, (match, hash, str) => {
      //   return '<h' + hash.length + '>' + str + '</h' + hash.length + '>'
      // })









  }


</script>

<template>
  <div class="markdown">

    <div class="editor" spellcheck="true" contenteditable="true" @input="update"></div>

    <div class="preview" v-html="preview"></div>

  </div>
</template>


<style lang="scss" scoped>
.markdown {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: CairoRgularFont, sans-serif;

  @media (max-width: 767px) {
    flex-direction: column;
  }


  .editor {
    outline: none;
    border: none;

    height: 100%;
    width: 50vw;


    background-color: #1e2126;
    color: #abb2bf;

    padding: 50px 20px;
    padding-top: 80px !important;

    caret-color: #abb2bf;
    font-size: 20px;
    line-height: 1.4;

    @media (max-width: 767px) {
      width: 100%;
    }

  }

  .preview {
    outline: none;
    border: none;

    height: 100%;
    width: 50vw;

    //background-color: #1e2126;
    color: #1e2126;;

    padding: 50px 20px;
    padding-top: 80px !important;

    font-size: 20px;
    line-height: 1.4;

    @media (max-width: 767px) {
      width: 100%;
    }

  }
}


</style>
