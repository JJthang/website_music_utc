import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/styles/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@pinia/nuxt",
    "dayjs-nuxt",
  ],
  nitro: {
    alias: {
      "#build": "./.nuxt",
    },
  },
  app: {
    head: {
      title: "MusicVibe | Nghe nhạc mọi lúc mọi nơi",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "description",
          content:
            "Trang web nghe nhạc trực tuyến miễn phí, cập nhật bài hát mới nhất mỗi ngày.",
        },
        {
          name: "keywords",
          content: "nghe nhạc, music, mp3, playlist, online, streaming",
        },
        { name: "author", content: "MusicVibe Team" },
      ],
    },
  },
  imports: {
    autoImport: true,
    dirs: [
      "composables/**",
      "utils/**",
      "modules/**",
      "components/**",
      "defineStore",
      "storeToRefs",
    ],
  },
  components: [
    {
      path: "~/components",
      extensions: [".vue"],
    },
    {
      path: "~/modules",
      extensions: [".vue"],
    },
  ],

  runtimeConfig: {
    public: {
      BASE_API: process.env.BASE_API || "http://localhost:3000/",
      apiUrl: process.env.API_URL,
      appEnv: process.env.APP_ENV,
    },
    private: {
      secretKey: process.env.SECRET_KEY,
    },
  },
  vite: {
    plugins: [tailwindcss(), svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/styleResource.scss" as *;',
        },
      },
    },
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
});
