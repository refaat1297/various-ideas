<script setup>
  import {computed, ref} from "vue";
  import image from './assets/image.png'


  const files = ref([])
  const hasError = ref(false)
  const errMsg = ref('')
  let isDragged = ref(false)
  const allowedTypes = ref([
    'application/pdf',
    'application/zip',
    'image/jpg',
    'image/jpeg',
    'image/png',
    'audio/mpeg'
  ])

  const emit = defineEmits(['upload-files'])


  const ifFilesHaveNotAllowedTypes = computed(() => {
    return files.value.some(el => !allowedTypes.value.includes(el.type))
  })




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

    if (ifFilesHaveNotAllowedTypes.value) {
      hasError.value = true
      errMsg.value = 'Please select files we support :('
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
  <p v-if="errMsg" class="error-msg text-center">{{ errMsg }}</p>

  <div
    class="drag-drop d-flex justify-content-center align-items-center flex-column user-select-none"
    :class="{'is-dragged': isDragged, 'has-error': hasError}"
    @dragenter.prevent.stop="isDragged = true"
    @dragover.prevent.stop="isDragged = true"
    @dragend.prevent.stop="isDragged = false"
    @dragleave.prevent.stop="isDragged = false"
    @drop.prevent.stop="upload"
  >
    <div class="images p-relative">
      <img :src="image" class="image-left" width="100" alt="">
      <img :src="image" class="main-image p-relative" width="100" alt="">
      <img :src="image" class="image-right" width="100" alt="">
    </div>
    <div class="drag-here font-weight-bold user-select-none d-flex justify-content-center align-items-center flex-column bold-font">
      <p>
        Drag your images here, or
        <label for="upload-file">
          <span class="cursor-pointer">browse</span>
          <input
            type="file"
            id="upload-file"
            hidden
            accept="image/png, image/jpeg, image/jpeg, application/zip, application/pdf, audio/mpeg"
            @change="upload"
            multiple />
        </label>
      </p>
    </div>
    <p class="supported-files regular-font">Supports: JPG, JPEG, PNG, ZIP, PDF, AUDIO</p>
  </div>


</template>

<style lang="scss" scoped>
.error-msg {
  color: #eb4d4b;
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.drag-drop {
  height: 220px;
  border: 3px dashed #95a5a654;
  border-radius: 10px;
  transition: all .2s ease-in-out;
  margin: 10px 0;

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

  &.is-dragged,
  &:hover {
    background-color: #E9F3FE;

    .images {
      .image-right {
        transform: translateX(-50%) translateY(10px) scale(.7) rotate(30deg);
      }

      .image-left {
        transform: translateX(50%) translateY(10px) scale(.7) rotate(-30deg) rotateY(180deg);
      }
    }
  }

  .images {
    img {
      transition: all .2s ease-in-out;

      &.main-image {
        z-index: 1;
      }

      &.image-left {
        opacity: .6;
        filter: grayscale(.6);
        transform: translateX(100%) translateY(10px) scale(.7) rotate(0deg);
        z-index: 0;
      }

      &.image-right {
        opacity: .6;
        filter: grayscale(.6);
        transform: translateX(-100%) translateY(10px) scale(.7) rotate(0deg) rotateY(180deg);
        z-index: 0;
      }
    }
  }

  .drag-here {
    margin: 10px 0;

    p {
      font-size: 1.3rem;
      color: #3a6591;

      span {
        color: #0652DD;
      }

      @media (max-width: 767px) {
        font-size: 1.1rem;
      }
    }
  }

  .supported-files {
    font-size: 1rem;
    color: #95afc0;

    @media (max-width: 767px) {
      font-size: .8rem;
    }
  }
}
</style>
