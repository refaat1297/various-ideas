
<script setup>

import {onMounted, ref} from "vue";

  const editorRef = ref('')
  const preview = ref('')

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
    code: /`{3}([\S]*)?\n([\s\S]+)\n`{3}/gi,
    quote: />([\S]*)?\n([\s\S]+)\n>/gi,
    // newLine: /--\s*/gi
  }

  function update (e) {

    const value = e?.target?.innerText || editorRef.value?.innerText

    preview.value = value
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

  onMounted(() => update())


</script>

<template>
  <div class="markdown">

    <div ref="editorRef" class="editor" spellcheck="true" contenteditable="true" @input.prevent="update">
      # heading 1 <br><br>
      ## heading 2 <br><br>
      ### heading 3 <br><br>
      #### heading 4 <br><br>
      ##### heading 5 <br><br>
      ###### heading 6 <br><br>

      <br>
      ![dsdsds](https://images.unsplash.com/photo-1669742602422-43d2d8764ee9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80      "dsds"      =300x300)
      <br>


      <br><br>
      <p>My ~~name~~ is _Ahmed_ **Refaat**, Try now :)</p>

      <br><br>
      <br><br>

      <p>[Click Here](https://www.google.com)</p>


      ><br>
      dsdsd
      ddsd __sdsdsdsdsdsds__ dsdsdsdsds\
      dsds

      [Click Here](https://www.google.com)<br>
      >

      <br><br>
      <br><br>

      ```<br>
      const age = 30;<br>
      console.log(age)<br>
      ```

      <br><br>
      <br><br>
    </div>

    <div class="preview" v-html="preview"></div>

  </div>
</template>


<style lang="scss">
.markdown {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;
  //font-family: CairoRgularFont, sans-serif;
  font-family: sans-serif;

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
    //font-size: 20px;
    //line-height: 1.4;

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


    @media (max-width: 767px) {
      width: 100%;
    }

    .line {
      margin: 20px 0;
      height: 8px;
      background-color: #e7e7e7;
    }

    .quote {
      border-left: 5px solid #34495E;
      padding: 16px;
      width: auto;
      display: block;
      margin: 12px 0;
    }

    pre {
      background-color: #ECF0F1;
      border-radius: 4px;
      padding: 12px;
      width: auto;
      display: block;
      margin: 12px 0;
      line-height: .8;
    }

  }
}


</style>
