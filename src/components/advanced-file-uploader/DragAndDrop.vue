<script setup>
  import {ref} from "vue";
  import image from './assets/image.png'


  const files = ref([])
  const hasError = ref(false)
  const errMsg = ref('')
  let isDragged = ref(false)

  const emit = defineEmits(['upload-files'])

  function upload (event) {
    isDragged.value = false
    hasError.value = false
    errMsg.value = ''

    files.value = [...(event?.dataTransfer?.files || event?.target?.files)]


    if (files.value.length > 4) {
      hasError.value = true
      errMsg.value = 'Max selected files is 4 :('
      return
    }


    files.value.forEach(file => {
      const size = +(file.size * 0.000001).toFixed(3)
      if (size > 4) {
        hasError.value = true
        errMsg.value = 'Please select a file less than 4 MB :('
        return
      }
      hasError.value = false
      errMsg.value = ''
    })

    if (!hasError.value) {
      emit('upload-files', files.value)
    }
  }


</script>

<template>
  <p v-if="errMsg" class="error-msg">{{ errMsg }}</p>

  <div
    class="drag-drop"
    :class="{'is-dragged': isDragged, 'has-error': hasError}"
    @dragenter.prevent.stop="isDragged = true"
    @dragover.prevent.stop="isDragged = true"
    @dragend.prevent.stop="isDragged = false"
    @dragleave.prevent.stop="isDragged = false"
    @drop.prevent.stop="upload"
  >
    <img :src="image" width="120" alt="">
    <div class="drag-here">
      <p>
        Drag your images here, or
        <label for="upload-file">
          <span>browse</span>
          <input type="file" id="upload-file" hidden @change="upload" multiple />
        </label>
      </p>
    </div>
    <p class="supported-files">Supports: JPG, PNG</p>
  </div>


</template>

<style lang="scss" scoped>
.error-msg {
  color: #eb4d4b;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 10px;
}
.drag-drop {
  height: 300px;
  border: 3px dashed #95a5a654;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all .3s ease-in-out;
  user-select: none;

    &.is-dragged {
      border-color: #0652DD;
      background-color: #E9F3FE;
    }

  &.has-error {
    border-color: #eb4d4b;
    background-color: #eb4d4b0d;

    &:hover {
      background-color: #eb4d4b0d;
    }
  }

  &:hover {
    background-color: #E9F3FE;
  }

  img {

  }

  .drag-here {
    font-family: BoldFont, sans-serif;
    font-weight: bold;
    margin: 20px 0 10px;
    p {
      font-size: 1.3rem;
      color: #3a6591;

      span {
        color: #0652DD;
        cursor: pointer;
      }
    }
  }

  .supported-files {
    font-size: 1rem;
    color: #95afc0;
  }
}
</style>
