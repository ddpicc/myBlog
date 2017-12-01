import Vue from 'vue'
import Router from 'vue-router'
import EditView from '../components/EditView.vue'
import Articles from '../components/Articles.vue'
import About from '../components/About.vue'
import AllView from '../components/AllView.vue'
import Login from '../components/Login.vue'
import EditArticle from '../components/EditArticle.vue'
import Article from '../components/Article.vue'
import Collection from '../components/Collection.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/editview',
      name: 'editview',
      component: EditView,
      children: [
        {path: 'articles', name: 'articles', component: Articles},
        {path: 'about', name: 'about', component: About},
        {path: 'editarticle', name: 'editarticle', component: EditArticle},
        {path: 'article', name: 'article', component: Article},
        {path: 'collection', name: 'collection', component: Collection}
      ]
    }, {
      path: '/all',
      name: 'allview',
      component: AllView
    }
  ]
})
