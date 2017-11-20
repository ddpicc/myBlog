import Vue from 'vue'

const showToast = function(state, commit, payload) {
  commit('SET_TOAST', payload);
  commit('TOGGLE_TOAST');
  return state.toast.promise;
}

export default {
  getArticles: ({commit}) => {
    commit('SET_LOADING');
    return Vue.http.get('/api/getArticles').then((res) => {
      console.log(res.data);
      commit('SET_LOADING');
      commit('SET_ARTICLES', res.data);
    })
  },
  getLinks: ({commit}) => {
    return Vue.http.get('/api/getLinks').then((res) => {
      console.log(res.data);
      commit('SET_LINKS', res.data);
    })
  },
  saveLinks: ({state, commit}, payload) => {
    return Vue.http.post('/api/saveLinks', payload).then((res) => {
      if(res.data.status == 2) {
        showToast(state, commit, {content: '保存成功!', isCancel: false}).then(()=>{
          commit('TOGGLE_TOAST');
        })
      }
    })
  },
  saveArticle: ({state, commit}, payload) => {
    return Vue.http.post('/api/saveArticle', payload);
  },
  getArticle: ({commit}, id) => {
    return Vue.http.get('/api/getArticle', {params: {id}}).then((res) => {
      return Promise.resolve(res.data);
    })
  },
  deleteArticle: ({state, commit}, payload) => {
    return showToast(state, commit, {content: '确认删除？', isCancel: true}).then(()=>{
      commit('TOGGLE_TOAST');
      return Vue.http.post('/api/deleteArticle', {id: payload.id});
    }).then(()=>{
      commit('DELETE_ARTICLE', payload.index);
    }).catch(()=> {
      commit('TOGGLE_TOAST');
    })
  },
  changeFavor: ({state, commit}, payload) => {
    return Vue.http.post('/api/changeFavor', payload).then((res) => {
      const content = payload.favor == false?'收藏成功！':'取消收藏成功！';
      showToast(state, commit, {content, isCancel: false}).then(()=> {
        commit('TOGGLE_TOAST');
      })
      commit('SET_FAVOR', payload.index);
    })
  },
  setLoading: ({commit}) => {
    commit('SET_LOADING');
  },
  setToast: ({commit}, payload) => {
    commit('SET_TOAST', payload);
  },
  addLink({commit}, payload) {
    commit('ADD_LINK', payload);
  },
  updateLinkName({commit}, payload) {
    commit('UPDATE_LINKNAME', payload);
  },
  updateLinkAddr({commit}, payload) {
    commit('UPDATE_LINKADDR', payload);
  },
  deleteLink ({commit}, payload) {
    commit('DELETE_LINK', payload);
  },
  login ({commit}, payload) {
    return Vue.http.post('/api/login', payload)
          .then((res) => {
            console.log('hi')
            if (res.data.status === 2) {
              commit('SET_USER', payload)
              return Promise.resolve(res.data.msg)
            } else {
              return Promise.reject(res.data.msg)
            }
          })
  }
}
