
import { updateAppConfig } from '#app'
import { defuFn } from '/home/gzdb/WebSitesProjects/azbuka/node_modules/defu/dist/defu.mjs'

const inlineConfig = {
  "nuxt": {
    "buildId": "d8ff422f-c5e5-4204-81ff-d37e58c8bad0"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}



export default /* #__PURE__ */ defuFn(inlineConfig)
