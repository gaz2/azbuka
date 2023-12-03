import { createVuetify } from 'vuetify';

/* Add all components and directives, for dev & prototyping only. */


/* Add build-in icon used internally in various components */
/* Described in https://next.vuetifyjs.com/en/features/icon-fonts/ */

export default defineNuxtPlugin((nuxtApp) => {



  const vuetify = createVuetify({

  });

  nuxtApp.vueApp.use(vuetify);

});
