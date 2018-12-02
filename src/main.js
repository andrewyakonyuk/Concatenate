import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import ProgressBar from './components/ProgressBar.vue';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// global progress bar
const progressBar = Vue.prototype.$progressBar = new Vue(ProgressBar).$mount();
document.body.appendChild(progressBar.$el);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// Add router hook for handling asyncData.
// Doing it after initial route is resolved so that we don't double-fetch
// the data that we already have. Using router.beforeResolve() so that all
// async components are resolved.
router.beforeResolve((to, from, next) => {
  const matched = router.getMatchedComponents(to);
  const prevMatched = router.getMatchedComponents(from);
  let diffed = false;
  const activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)));
  const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
  if (!asyncDataHooks.length) {
    return next();
  }

  progressBar.start();
  return Promise.all(asyncDataHooks.map(hook => hook({ store, route: to, progressBar })))
    .then(() => {
      progressBar.finish();
      next();
    })
    .catch(next);
});
