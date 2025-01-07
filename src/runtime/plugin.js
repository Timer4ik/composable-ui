import { defineNuxtPlugin } from '#app'
import { isConsistTarget, isReachedBottom } from './utils'

export default defineNuxtPlugin((_nuxtApp) => {
  _nuxtApp.vueApp.directive('reached-bottom', {
    mounted(el, binding) {

      const handleScroll = (event) => {
        if (isReachedBottom(event)) binding.value(event)
      }

      el._handleScroll = handleScroll

      el.addEventListener('scroll', handleScroll);
    },
    unmounted(el) {
      el.removeEventListener('scroll', el._handleScroll);

      delete el._handleScroll;
    }
  })

  _nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding) {

      const handleClick = (event) => {
        if (binding?.value && !isConsistTarget(el, event.target)) binding?.value?.(event)
      }

      el._handleClick = handleClick

      document.addEventListener('click', handleClick);
    },
    unmounted(el) {
      document.removeEventListener('click', el._handleClick);

      delete el._handleClick;
    }
  })
})
