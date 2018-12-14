
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
      state.panel.isOpen = typeof payload.to === 'boolean' ? payload.to : !state.panel.isOpen;
    },
  },
};

