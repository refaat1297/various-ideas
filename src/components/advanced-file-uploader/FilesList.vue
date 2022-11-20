

<script setup>
  import File from "@/components/advanced-file-uploader/File.vue";
  import BaseLoader from "@/components/shared/BaseLoader.vue";

  defineProps({
    files: {
      type: Array,
      default: []
    },

    isLoading: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['delete-file'])


  function deleteFile (id) {
    emit('delete-file', id)
  }



</script>

<template>
  <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
    <BaseLoader />
  </div>
  <div v-else class="files-list w-100 h-auto overflow-scroll-y">
    <template v-for="file in files" :key="file.id">
      <File :file="file" @delete-file="deleteFile" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.files-list {
  max-height: 210px;
}
</style>
