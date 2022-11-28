import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import AdvancedFileUploader from '@/components/advanced-file-uploader/Index.vue'

// const MessageComponent = {
//   template: '<p>{{ msg }}</p>',
//   props: ['msg']
// }

describe("Image Uploader", () => {
  it("sanity test", () => {

    const wrapper = mount(AdvancedFileUploader)
    console.log('wrapper', wrapper)

    expect(wrapper.text()).toContain('hello')
    expect(wrapper.text()).toBe('hello')
  });
})

