
export default {
  namespaced: true,
  state: {
    drawer: {
      isOpen: false,
    },
    panel: {
      isOpen: false,
    },
  },
  mutations: {
    toggleDrawer(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.drawer.isOpen = typeof payload.to === 'boolean' ? payload.to : !state.drawer.isOpen;
    },
    togglePanel(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.panel.isOpen = typeof payload.to === 'boolean' ? payload.to : !state.panel.isOpen;
    },
  },
  actions: {
    toggleDrawer({ commit, state }, payload) {
      const isOpen = typeof payload.to === 'boolean' ? payload.to : !state.drawer.isOpen;
      if (isOpen === state.drawer.isOpen) return;

      commit({
        type: 'toggleDrawer',
        to: payload.to,
      });
    },
    togglePanel({ commit, state }, payload) {
      const isOpen = typeof payload.to === 'boolean' ? payload.to : !state.panel.isOpen;
      if (isOpen === state.panel.isOpen) return;

      commit({
        type: 'togglePanel',
        to: payload.to,
      });
    },
  },
};
