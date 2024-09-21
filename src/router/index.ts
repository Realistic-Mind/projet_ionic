import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import PageUn  from '../views/PageUn.vue'
import PageDeux from '../views/PageDeux.vue'
import PageTrois from '../views/PageTrois.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
{
  path: '/pageUn',
  name: 'PageUn',
  component: PageUn
},
{
  path: '/pageDeux',
  name: 'PageDeux',
  component: PageDeux
},
{
  path: '/pageTrois',
  name: 'PageTrois',
  component: PageTrois
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
