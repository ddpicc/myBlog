export default {
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_ARTICLES: (state, articles) => {
    state.articles = articles;
  },
  SET_LINKS: (state, links) => {
    state.links = links;
  },
  SET_FAVOR: (state, index) => {
    state.articles[index].favor = !state.articles[index].favor;
  },
  SET_LOADING: (state) => {
    state.isLoading = !state.isLoading;
  },
  SET_TOAST: (state, payload) => {
    state.toast.content = payload.content;
    state.toast.isCancel = payload.isCancel;
    state.toast.promise = new Promise((res, rej)=> {
      state.toast.resolve = res;
      state.toast.reject = rej;
    })
  },
  TOGGLE_TOAST: (state) => {
    state.isToast = !state.isToast;
  },
  ADD_LINK(state, link) {
    state.links.push(link);
  },
  UPDATE_LINKNAME(state, {name, index}) {
    console.log(index, name);
    state.links[index].name = name;
  },
  UPDATE_LINKADDR(state, {addr, index}) {
    state.links[index].addr = addr;
  },
  DELETE_LINK(state, index) {
    state.links.splice(index, 1);
  },
  DELETE_ARTICLE(state, index) {
    state.articles.splice(index, 1);
  }
}
