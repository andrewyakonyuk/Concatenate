import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import DocumentNone from './views/DocumentNone.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/docs/new',
      name: 'NewDocument',
      component: () => import(/* webpackChunkName: "editor" */ './views/DocumentEdit.vue'),
    },
    {
      path: '/collections/:collectionId/new',
      name: 'new-collection',
      component: () => import('./views/CollectionPage.vue'),
      props: true,
    },
    {
      path: '/collections/:collectionId',
      component: () => import('./views/CollectionPage.vue'),
      props: true,
      children: [
        {
          path: '',
          component: DocumentNone,
          name: 'collection-page',
        },
        {
          path: 'docs/:documentId',
          name: 'document-page',
          component: () => import('./views/DocumentPage.vue'),
          props: true,
        }],
    },
  ],
});
