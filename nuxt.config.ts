import vuetify from 'vite-plugin-vuetify';
//import { pwa } from './config/pwa';
//import Unocss from 'unocss/vite';


const title = "Игры на корпоратив";
const shortTitle = "Игры на корпоратив в Санкт-Петербурге";
const description = "Игры на корпоратив, настольные игры спб,!";
const keywords = "игры,лото,карты на бочку,коктельное казино,азбука вкусов,подарок на 23 февраля,подарочная продукция";

const image = "/favicon.ico";
const url = "https://ink.obrend.ru/";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
  ssr:true,
  typescript: {
      strict: true
    },
    nitro: {
      compressPublicAssets: true,
      esbuild: {
        options: {
          target: 'esnext',
        },
      },
      prerender: {
        crawlLinks: false,
        routes: ['/','/azbuka-chisel','/cazino-vkusov','/karty-na-bochku','/video'],
      },
    },

    build: {
        transpile: ['vuetify'],
    },
    css: ["vuetify/styles","@/assets/main.scss"],
    /*vite: {
      plugins: [
        // https://github.com/antfu/unocss
        // see unocss.config.ts for config
        // see nuxt.config.ts "css" for css loading
        Unocss(),
      ],
    },*/
    modules: [
      "@kevinmarrec/nuxt-pwa",
    /* Treeshaking: https://next.vuetifyjs.com/en/features/treeshaking/ */
    async (options, nuxt) => {
        nuxt.hooks.hook('vite:extendConfig', (config) => {
          config?.plugins?.push(vuetify());
       });
    },

    '@nuxt/image',
    "nuxt-icon",
    //'@vite-pwa/nuxt',
     //'@vueuse/nuxt',
     //'@unocss/nuxt',

    [
      '@averjs/nuxt-compression',

        {
            algorithm: 'brotliCompress',
            filter: /\.(js|mjs|json|css|html)$/i
          }
      ],
 
  ],
  app: {
    head: {
      title: title,
      shortTitle: shortTitle,
      description: description,
      keywords: keywords,
      
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },  
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "preload", type: "style", href: "https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap" },
        { rel: "icon", type: "image/x-icon", href: image },
        { rel: "canonical", href: url },
        {
          rel: "preload",
          type: "image/webp",
          sizes: "1920x1200",
          href: "/ink.webp",
        },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest"},

        {
          rel: "preload",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
      ],

      meta: [
        { charset: 'utf-8' },

        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'cache-control', content: 'max-age=604800' },
        { 'http-equiv': 'cache-control', content: 'public' },

        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: keywords,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },
        //Twitter
        { name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: image,
        },
      ],
    },
  },
  //pwa,
  pwa: {
    meta: {
      name: shortTitle,
      author: "anonymous",
      theme_color: "#4f46e5",
      description: description,
    },
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      theme_color: "#4f46e5",
      description: description,
    },
  },
  
});
