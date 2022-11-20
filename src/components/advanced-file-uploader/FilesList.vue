

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
  <div v-if="isLoading">
    <BaseLoader />
  </div>
  <div v-else class="files-list">
    <template v-for="file in files" :key="file.id">
      <File :file="file" @delete-file="deleteFile" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.files-list {
  width: 100%;
  height: auto;
  max-height: 210px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(#95afc0, .5);
    border-radius: 2px;
  }
}
</style>
