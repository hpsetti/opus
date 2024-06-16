import './assets/main.css'

import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(router)

// app.mount('#app')


import swal from 'sweetalert';
import Notifications from '@kyvg/vue3-notification'
// import Vuelidate from 'vuelidate';
import VueClipboard from 'vue-clipboard2';
import mitt from 'mitt'
import ElementUI from 'element-plus'
import Multiselect from 'vue-multiselect'

// import ElementUI, {
//   DatePicker,
// } from 'element-ui';
// import lang from 'element-ui/lib/locale/lang/en'
// import locale from 'element-ui/lib/locale'
import locale from 'element-plus/dist/locale/en.mjs'
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import router from './router';
import App from './App.vue';
// import store from './store';
import
 apiResponseInterceptor from './utils/apiResponseInterceptor';
import
 apiRequestInterceptor from './utils/apiRequestInterceptor';
import {
 beforeEach,
} from './router/hooks';
import {
  getCookie,
} from './utils/common';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-plus/dist/index.css'
// import 'element-ui/lib/theme-chalk/index.css';
// import 'vue2-datepicker/index.css';
import 'vue-datepicker-next/index.css'
import 'font-awesome/css/font-awesome.min.css';
import './assets/app/style.css';
import './assets/app/ul-styles.css';
import './assets/css/normalize.css';
import './assets/css/activitytracker-grid.css';
import './assets/app/slider.css';
// import '../public/static/app/style.css';
// import '../public/static/app/ul-styles.css';
// import '../public/static/css/normalize.css';
// import '../public/static/css/activitytracker-grid.css';
// import '../public/static/app/slider.css';
import 'vue-multiselect/dist/vue-multiselect.css';
// import vuetify from './plugins/vuetify';
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//   components,
//   directives,
// })

const app = createApp(App)
app.config.globalProperties.window = window;
window.swal = swal;
app.use(ElementUI, {
  locale,
});
// locale.use(lang)
// app.use(ElementUI);
// app.component(DatePicker.name, DatePicker);
// app.use(vuetify);
const emitter = mitt();
app.config.globalProperties.emitter = emitter;
window.emitter= emitter;
// eslint-disable-next-line vue/multi-word-component-names
app.component('Multiselect', Multiselect)

app.config.productionTip = false;
app.use(Notifications);
VueClipboard.config.autoSetContainer = true; // add this line
app.use(VueClipboard);
// app.use(Vuelidate);
// export const stripe = Stripe(`pk_test_iNFq0uxpsck7i7IMaFBo0DvZ`);
// export const elements = stripe.elements();
 
apiResponseInterceptor();
// request interceptor to add authorization token
apiRequestInterceptor();
/**
 * router configuration
 */
app.use(router)
router.beforeEach(beforeEach)

app.config.productionTip = false; 
app.mixin({
  data() {
    return {
      get AuthorizationToken() {
        return {
          Authorization: getCookie('Authorization'),
        };
      },
    };
  },
});

/**
 * Application Insight configuration
 */
 if (import.meta.env.VITE_VUE_APP_APPLICATIONINSIGHTS_KEY) {
  const appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: import.meta.env.VITE_VUE_APP_APPLICATIONINSIGHTS_KEY,
      enableAutoRouteTracking: true
    }
  });
  appInsights.loadAppInsights();
  appInsights.trackPageView(); // Manually call trackPageView to establish the current user/session/pageview
 }

//  app.use(router)

 
app.mount('#app')
