<script setup>
  import DragAndDrop from "./DragAndDrop.vue";
  import FilesList from "./FilesList.vue";
  import {useAdvancedImageUploader} from "@/components/advanced-file-uploader/use/useAdvancedImageUploader.js";
  import {onMounted} from "vue";
  import Uploading from "@/components/advanced-file-uploader/Uploading.vue";

  const { filesData, getUploadedFiles, isLoading, uploadFileToStorage, uploads, deleteFile, cancelUpload, pauseUpload, playUpload } = useAdvancedImageUploader()

  function cancel (id) {
    cancelUpload(id)
  }

  function pause (id) {
    pauseUpload(id)
  }

  function play (id) {
    playUpload(id)
  }

  onMounted(() => {
    getUploadedFiles()
  })
</script>

<template>
  <div class="advanced-file-uploader" v-cloak>
    <div class="content">
      <DragAndDrop
        @upload-files="uploadFileToStorage"
      />

      <Uploading
        :uploads="uploads"
        @pause="pause"
        @play="play"
        @cancel="cancel"
      />

      <FilesList
        :is-loading="isLoading"
        :files="filesData"
        @deleteFile="deleteFile"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advanced-file-uploader {
  background-color: #E9F3FE;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;

  .content {
    width: 50%;
    height: auto;
    max-height: 700px;
    background-color: #fff;
    padding: 30px 30px;
    border-radius: 20px;
    box-shadow: 0 0 34px 22px #0000000a;

    @media (max-width: 767px) {
      width: 85%;
    }
  }
}
</style>
