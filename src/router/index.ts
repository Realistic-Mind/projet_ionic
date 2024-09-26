import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import PageUn  from '../views/PageUn.vue'
import PageDeux from '../views/PageDeux.vue'
import PageTrois from '../views/PageTrois.vue'
import PageQuatre from '@/views/PageQuatre.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Geolocation from '@/views/Geolocation.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',  // Redirect root path to login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/geolocation',
    name: 'Geolocation',
    component: Geolocation,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
