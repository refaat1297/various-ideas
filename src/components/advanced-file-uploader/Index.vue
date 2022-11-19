<script setup>
  import DragAndDrop from "./DragAndDrop.vue";
  import FilesList from "./FilesList.vue";
  import {reactive} from "vue";
  import useFetchUploadedFiles from "@/components/advanced-file-uploader/use/useFetchUploadedFiles.js";
  import useAsyncState from "@/use/useAsyncState";


  const state = reactive({
    uploads: [],
  })

  function uploadFiles (files) {
    console.log('files', files)
  }


  const {state: files, isLoading,error, isReady} = useAsyncState(useFetchUploadedFiles(), [])




</script>

<template>
  <div class="advanced-file-uploader" v-cloak>
    <div class="content">
      <DragAndDrop
        @upload-files="uploadFiles"
      />
      <FilesList
        :is-loading="isLoading"
        :files="files"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "style";
</style>
