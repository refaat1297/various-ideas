<script setup>
  import PauseIcon from "@/components/shared/icons/PauseIcon.vue";
  import CloseIcon from "@/components/shared/icons/CloseIcon.vue";
  import PlayIcon from "@/components/shared/icons/PlayIcon.vue";
  import {ref} from "vue";
  import ShieldCheckIcon from "@/components/shared/icons/ShieldCheckIcon.vue";

  defineProps({
    uploads: {
      type: Array,
      required: false,
      default: () => ([])
    }
  })

  const isPaused = ref(false)


  const emit = defineEmits(['pause', 'play', 'cancel'])


  function pause (id) {
    emit('pause', id)
  }

  function play (id) {
    emit('play', id)
  }

  function pauseAndPlay (id) {
    isPaused.value ? play(id) : pause(id)
    isPaused.value = !isPaused.value
  }


  function cancel (id) {
    emit('cancel', id)
  }




</script>

<template>
  <div class="uploading overflow-scroll-y h-auto" :class="{'has-items': uploads.length}">
    <template v-for="upload in uploads" :key="`upload-${upload.id}`">
      <div class="upload d-flex justify-content-between align-items-center p-relative overflow-hidden">
        <div class="overlay" :style="{ width: +upload.currentProgress.toFixed(0) + '%' }"></div>
        <div class="details">
          <p class="bold-font">{{ upload.name }} - {{ upload.isUploaded ? 'Uploaded' : 'Uploading...' }}</p>
          <span>{{ +upload.currentProgress.toFixed(0) }}%</span>
        </div>

        <div class="actions d-flex justify-content-end align-items-center">
          <template v-if="upload.isUploaded">
            <div class="btn completed">
              <ShieldCheckIcon />
            </div>
          </template>
          <template v-else>
            <div class="btn cursor-pointer d-grid place-items-center pause" @click="pauseAndPlay(upload.id)">
              <PlayIcon v-if="isPaused" />
              <PauseIcon v-else />
            </div>
            <div class="btn cursor-pointer d-grid place-items-center cancel" @click="cancel(upload.id)">
              <CloseIcon />
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>


<style lang="scss" scoped>
.uploading {
  max-height: 150px;

  &.has-items {
    margin: 16px 0;
  }

  .upload {
    background-color: #fff;
    padding: 10px;
    border: 2px solid rgba(#3a6591, .1);
    border-radius: 8px;

    &:not(:last-child) {
      margin-bottom: 8px;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 0;
      height: 100%;
      transition: all .2s ease-in-out;
      background-color: rgba(#3a6591, .1);
      z-index: 0;
    }

    .details {
      p {
        font-size: 1rem;
        color: #3a6591;
      }

      span {
        font-size: .9rem;
        color: #95afc0;
      }
    }

    .actions {
      gap: 6px;
      z-index: 1;

      .btn {
        width: 25px;
        height: 25px;
        border-radius: 50%;

        &.completed {
          background-color: rgba(#2ecc71, .2);

          svg {
            fill: #2ecc71;
            width: 18px;
            height: 18px;
          }
        }

        &.pause {
          background-color: rgba(#3a6591, .2);

          svg {
            fill: #3a6591;
            width: 18px;
            height: 18px;
          }
        }

        &.cancel {
          background-color: rgba(#eb4d4b, .2);

          svg {
            fill: #eb4d4b;
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
}
</style>
