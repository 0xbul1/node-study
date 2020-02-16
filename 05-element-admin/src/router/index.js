import Vue from 'vue';
import VueRouter from 'vue-router';
import ListArticle from '../views/ListArticle.vue';
import CreateArticle from '../views/CreateArticle.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/articles/index',
  },
  {
    path: '/articles/index',
    name: 'list-article',
    component: ListArticle,
  },
  {
    path: '/articles/create',
    name: 'create-article',
    component: CreateArticle,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
