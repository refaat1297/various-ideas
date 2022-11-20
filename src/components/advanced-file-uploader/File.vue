

<script setup>
  import jpg from '@/assets/images/advanced-image-uploader/jpg.png'
  import mp3 from '@/assets/images/advanced-image-uploader/mp3.png'
  import pdf from '@/assets/images/advanced-image-uploader/pdf.png'
  import png from '@/assets/images/advanced-image-uploader/png.png'
  import zip from '@/assets/images/advanced-image-uploader/zip.png'
  import DeleteIcon from "@/components/shared/icons/DeleteIcon.vue";
  import {computed, ref} from "vue";

  const props = defineProps({
    file: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['delete-file'])

  const imagesTypes = ref({
    png,
    jpg,
    'jpeg': jpg,
    zip,
    pdf,
    'audio': mp3
  })

  const fileSize = computed(() => {
    return +(props.file.size * 0.000001).toFixed(3)
  })


  const fileType = computed(() => {
    const type = Object.keys(imagesTypes.value).find(el => props.file.type.includes(el))
    return imagesTypes.value[type]
  })


  const fileName = computed(() => {
    const extension = props.file.name.split('.').at(-1)
    return props.file.name.length > 20 && `${props.file.name.slice(0, 20)}.${extension}`
  })


  function deleteFile () {
    emit('delete-file', props.file.id)
  }

</script>

<template>
  <div class="file d-grid align-items-center w-100">
    <img :src="fileType" width="40" :alt="file.name">
    <div class="details">
      <div class="content d-grid align-items-center">
        <a :href="file.url"
           target="_blank"
           class="information d-flex justify-content-start align-items-start flex-column text-decoration-none outline-none">
          <span class="name medium-font">{{ fileName }}</span>
          <span class="size medium-font font-weight-bold">{{ fileSize }} MB</span>
        </a>
        <div class="delete-btn d-grid place-items-center">
          <DeleteIcon v-on:click="deleteFile" class="cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file {
  grid-template-columns: 45px 1fr;
  gap: 2px;
  padding: 20px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(#95afc0, .4);
  }

  .details {
    .content {
      grid-template-columns: 1fr 30px;

      .information {
        color: #000;

        .name {
          font-size: .9rem;
        }

        .size {
          font-size: .7rem;
          color: #95afc0;
        }
      }

      .delete-btn {
        svg {
          fill: #3a6591;
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
</style>
