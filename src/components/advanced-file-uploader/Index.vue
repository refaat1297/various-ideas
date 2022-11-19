<script setup>
  import DragAndDrop from "./DragAndDrop.vue";
  import FilesList from "./FilesList.vue";
  import {useAdvancedImageUploader} from "@/components/advanced-file-uploader/use/useAdvancedImageUploader.js";
  import {onMounted} from "vue";

  const { filesData, getUploadedFiles, isLoading, uploadFileToStorage, uploads } = useAdvancedImageUploader()

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

      <div>
        <p v-for="(upload, i) in uploads" :key="i">
          {{ upload.name }} - {{ upload.currentProgress }}
        </p>
      </div>

      <FilesList
        :is-loading="isLoading"
        :files="filesData"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "style";
</style>
