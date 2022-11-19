import {ref} from "vue";

export default function useAsyncState (promise, initialState) {
  const state = ref(initialState)
  const isReady = ref(false)
  const isLoading = ref(false)
  const error = ref(undefined)


  async function execute () {
    error.value = undefined
    isReady.value = false
    isLoading.value = true

    try {
      state.value = await promise
      isReady.value = true
    } catch (e) {
      error.value = e
    }

    isLoading.value = false
  }

  execute()


  return {
    state,
    isReady,
    isLoading,
    error
  }
}
