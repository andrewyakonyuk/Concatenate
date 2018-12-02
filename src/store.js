import Vue from 'vue';
import Vuex from 'vuex';
import { generateId } from '@/util';
import router from '@/router';
import _ from 'underscore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collections: [{
      id: generateId() + 1,
      title: 'Team Settings',
    }, {
      id: generateId() + 2,
      title: 'Manage Your Team',
    }, {
      id: generateId() + 3,
      title: 'Invitations',
    }, {
      id: generateId() + 4,
      title: 'Cloud Storage Environment Settings',
    }, {
      id: generateId() + 5,
      title: 'Authentication',
    }],
  },
  getters: {
    collectionById: state => id => _.find(state.collections, item => item.id === id),
  },
  mutations: {
    addNewCollection(state, payload) {
      state.collections.push({
        id: payload.id,
        title: payload.title || 'new collection',
      });
    },
    setCollectionTitle(state, payload) {
      const collection = _.find(state.collections, item => item.id === payload.id);
      if (collection) {
        collection.title = payload.title;
      }
    },
  },
  actions: {
    addNewCollection({ commit }) {
      const newId = generateId();
      commit('addNewCollection', { id: newId });
      router.push({ name: 'new-collection', params: { collectionId: newId } });
    },
  },
});
