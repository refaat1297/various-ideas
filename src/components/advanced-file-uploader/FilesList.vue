

<script setup>
  import png from '@/assets/images/advanced-image-uploader/png.png'

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

  function getFileSize (size) {
    return +(size * 0.000001).toFixed(3)
  }




</script>

<template>
  <div class="files-list">
    <div v-if="isLoading">
      Loading...
    </div>

    <template v-else v-for="file in files" :key="file.name">
      <div class="file">
        <img :src="png" width="60" :alt="file.name">
        <div class="details">
          <p class="information">
            <span class="name">{{ file.name }}</span>
            <span class="size">{{ getFileSize(file.size) }} MB</span>
          </p>
          <p class="line"></p>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.files-list {
  width: 100%;
  margin-top: 30px;

  .file {
    display: grid;
    grid-template-columns: 60px 1fr;
    align-items: center;
    gap: 10px;
    width: 100%;

    .details {
      .information {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .name {
          font-family: MediumFont, sans-serif;
          font-size: 1.1rem;
        }

        .size {
          font-family: BoldFont, sans-serif;
          font-size: .9rem;
        }
      }

      .line {
        margin-top: 10px;
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background-color: #0652DD;
      }
    }
  }
}
</style>
