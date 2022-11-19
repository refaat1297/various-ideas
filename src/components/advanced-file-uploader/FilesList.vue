

<script setup>
  import png from '@/assets/images/advanced-image-uploader/png.png'
  import DeleteIcon from "@/components/shared/icons/DeleteIcon.vue";

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

  function deleteFile (id) {
    console.log('deleteFile', id)
  }



</script>

<template>
  <div class="files-list">
    <div v-if="isLoading">
      Loading...
    </div>

    <template v-else v-for="file in files" :key="file.id">
      <div  class="file">
        <img :src="png" width="50" :alt="file.name">
        <div class="details">
          <div class="content">
            <a :href="file.url" target="_blank" class="information">
              <span class="name">{{ file.name }}</span>
              <span class="size">{{ getFileSize(file.size) }} MB</span>
            </a>
            <div class="delete-btn">
              <DeleteIcon v-on:click="deleteFile(file.id)" />
            </div>
          </div>
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
    grid-template-columns: 50px 1fr;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 30px;

    .details {
      .content {
        display: grid;
        grid-template-columns: 1fr 30px;
        align-items: center;

        .information {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
          text-decoration: none;
          color: #000;

          .name {
            font-family: MediumFont, sans-serif;
            font-size: 1rem;
          }

          .size {
            font-family: MediumFont, sans-serif;
            font-size: .8rem;
            color: #95afc0;
            font-weight: bold;
          }
        }

        .delete-btn {
          display: grid;
          place-items: center;
          svg {
            fill: #3a6591;
            cursor: pointer;
          }
        }
      }

      .line {
        margin-top: 6px;
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background-color: #0652DD;
      }
    }
  }
}
</style>
