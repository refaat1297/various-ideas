<script setup>
  import {computed, ref} from "vue";

  const markdown = ref('')
  const html = computed(() => {

    return markdown.value
        /**
         * Normal Text
         * 2 groups
         * 1st: select any single character                                 --- (.* *)                       --- $1
         * 2nd: the string finishes with space or word boundary             --- ( *|\b)                      --- $2
         */
        .replace(/\b^(.* *)$( *|\b)/gim, '<p>$1</p>')


        /**
         * Bold Text
         * 4 groups
         * 1st: the whole group                                   --- ((\*\*|__)(.*)(\2))             --- $1
         * 2nd: select the text starts with ** OR __              --- (\*\*|__)                       --- $2
         * 3rd: select any text between matches                   --- (.*?)                           --- $3
         * 4th: use the same selector from second group           --- (\2)                            --- $4
         */
        .replace(/((\*\*|__)(.*?)(\2))/gi, '<b>$3</b>')

        /**
         * Italic Text
         * 4 groups
         * 1st: the whole group                                   --- ((\*|_)(.*)(\2))                --- $1
         * 2nd: select the text starts with * OR _                --- (\*|_)                          --- $2
         * 3rd: select any text between matches                   --- (.*?)                           --- $3
         * 4th: use the same selector from second group           --- (\2)                            --- $4
         */
        .replace(/((\*|_)(.*?)(\2))/gi, '<i>$3</i>')


        /**
         * if the string is # this is heading
         * @param match: # this is heading
         * @param hash: #
         * @param str: his is heading
         *
         * It needs to be tha last one because it breaks the concatenation between `replace` methods
         *
         * 2 groups
         * 1st: select (#) from 1 to 6                --- (#{1,6})
         * 2nd: select any character                  --- (.*$)
         */
        .replace(/^(#{1,6})(.*$)/gim, (match, hash, str) => {
          return '<h' + hash.length + '>' + str + '</h' + hash.length + '>'
        })

  })



</script>



<template>
  <div>

    <div class="instructions regular-font">
      <p>- Normal: normal text displayed as [ &lt;p&gt;text&lt;&frasl;p&gt; ]</p>
      <p>- Headings: from 1 to 6 [ #, ##, ###, ...ect ]</p>
      <p>- Bold: [ **text** OR __text__ ]</p>
      <p>- Italic: [ *text* OR _text_ ]</p>
    </div>

    <textarea class="w-100" v-model="markdown"></textarea>
    <div v-html="html"></div>
    <hr class="">
    <pre>{{ html }}</pre>
  </div>
</template>

<style lang="scss" scoped>
textarea {
  height: 300px;
  padding: 20px;
  font-size: 20px;
  display: block;
  margin-bottom: 40px;
}

.instructions {
  padding: 30px 20px;
}

hr {
  margin: 40px auto;
}
</style>

