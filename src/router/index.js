import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import(/* webpackChunkName: "gallery" */ '../views/GalleryView.vue')
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: () => import(/* webpackChunkName: "reservations" */ '../views/ReservationsView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // Admin Routes
  {
    path: '/admin',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminLogin.vue'),
    meta: { hideNavbar: true, hideFooter: true }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminDashboard.vue'),
    meta: { requiresAuth: true, hideNavbar: true, hideFooter: true },
    beforeEnter: (to, from, next) => {
      // Check auth from sessionStorage
      const authData = sessionStorage.getItem('adminAuth')
      if (authData) {
        try {
          const { isAuthenticated } = JSON.parse(authData)
          if (isAuthenticated) {
            next()
            return
          }
        } catch (e) {
          // Invalid data
        }
      }
      // Check store
      if (store.getters.isAdminAuthenticated) {
        next()
      } else {
        next('/admin')
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
