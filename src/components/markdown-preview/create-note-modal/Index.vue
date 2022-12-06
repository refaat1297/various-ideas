<script setup>
  const props = defineProps({
    isOpened: {
      type: Boolean,
      required: false,
      default: false
    }
  })

  const emit = defineEmits(['close'])

  function close () {
    emit('close')
  }
</script>

<template>
  <div class="modal" :class="[isOpened ? 'opened' : 'closed']">
    <div class="overlay" @click.self="close"></div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>



<style lang="scss" scoped>
.modal {
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    transform: scale(1, 1);
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: rgba(#000, .5);
    opacity: 0;
    visibility: hidden;
    transition: all .4s ease-in-out;
  }

  &.opened {
    .overlay {
      opacity: 1;
      visibility: visible;
      animation: background-in 1s both;
    }

    .content {
      opacity: 1;
      visibility: visible;
      animation: modal-in 1s both;
    }
  }

  &.closed {
    .content {
      opacity: 0;
      visibility: hidden;
      transform: translate(-50%, -50%);
    }
  }

  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 400px;
    width: auto;
    padding: 26px 20px;
    border-radius: 12px;
    background-color: #37353b;
    color: #f9f9f9;
    opacity: 0;
    visibility: hidden;
    transition: .4s ease-in-out;
    font-family: -apple-system, sans-serif;
  }
}


@keyframes background-in {
  0% { transform: scale(0, 0.005) }
  33% { transform: scale(1, 0.005) }
  66%, 100% { transform: scale(1, 1) }
}

@keyframes modal-in {
  0%, 66% {
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -30%)
  }

  100% {
    opacity: 1;
    visibility: visible;
  }
}

</style>
