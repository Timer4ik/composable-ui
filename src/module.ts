import { defineNuxtModule, addPlugin, createResolver, addComponent, addComponentsDir, addImportsDir } from '@nuxt/kit'

export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'composable-ui',
    configKey: 'composable-ui',
  },
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugin'))
    addImportsDir(resolver.resolve('./runtime/utils'))
    addImportsDir(resolver.resolve('./runtime/composables'))
    addComponentsDir({
      pathPrefix: true,
      prefix: "CuiBase",
      path: resolver.resolve('./runtime/components')
    })
  },
})
