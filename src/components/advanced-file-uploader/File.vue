

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

  function deleteFile () {
    emit('delete-file', props.file.id)
  }

</script>

<template>
  <div class="file">
    <img :src="fileType" width="40" :alt="file.name">
    <div class="details">
      <div class="content">
        <a :href="file.url" target="_blank" class="information">
          <span class="name">{{ file.name }}</span>
          <span class="size">{{ fileSize }} MB</span>
        </a>
        <div class="delete-btn">
          <DeleteIcon v-on:click="deleteFile" />
        </div>
      </div>
<!--      <p class="line"></p>-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file {
  display: grid;
  grid-template-columns: 45px 1fr;
  align-items: center;
  gap: 2px;
  width: 100%;
  padding: 20px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(#95afc0, .4);
  }

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
        outline: none;

        .name {
          font-family: MediumFont, sans-serif;
          font-size: .9rem;
        }

        .size {
          font-family: MediumFont, sans-serif;
          font-size: .7rem;
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
          width: 25px;
          height: 25px;
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
</style>
