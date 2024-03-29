import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c80b75c0 = () => interopDefault(import('../pages/confirmRegister.vue' /* webpackChunkName: "pages/confirmRegister" */))
const _7546d2d8 = () => interopDefault(import('../pages/excel.vue' /* webpackChunkName: "pages/excel" */))
const _21a5a610 = () => interopDefault(import('../pages/galerie.vue' /* webpackChunkName: "pages/galerie" */))
const _11dc7d28 = () => interopDefault(import('../pages/indexOld.vue' /* webpackChunkName: "pages/indexOld" */))
const _1a840ec9 = () => interopDefault(import('../pages/information.vue' /* webpackChunkName: "pages/information" */))
const _2a60f2d1 = () => interopDefault(import('../pages/list.vue' /* webpackChunkName: "pages/list" */))
const _06d98a46 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _839bd580 = () => interopDefault(import('../pages/poster.vue' /* webpackChunkName: "pages/poster" */))
const _4899be54 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _2b9a6b32 = () => interopDefault(import('../pages/resetPassword.vue' /* webpackChunkName: "pages/resetPassword" */))
const _2847e7e7 = () => interopDefault(import('../pages/typotheque.vue' /* webpackChunkName: "pages/typotheque" */))
const _17542502 = () => interopDefault(import('../pages/sauve/galerie.vue' /* webpackChunkName: "pages/sauve/galerie" */))
const _18a0f70d = () => interopDefault(import('../pages/sauve/page_1.vue' /* webpackChunkName: "pages/sauve/page_1" */))
const _b1423b08 = () => interopDefault(import('../pages/sauve/texte.vue' /* webpackChunkName: "pages/sauve/texte" */))
const _3d31e72f = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/confirmRegister",
    component: _c80b75c0,
    name: "confirmRegister"
  }, {
    path: "/excel",
    component: _7546d2d8,
    name: "excel"
  }, {
    path: "/galerie",
    component: _21a5a610,
    name: "galerie"
  }, {
    path: "/indexOld",
    component: _11dc7d28,
    name: "indexOld"
  }, {
    path: "/information",
    component: _1a840ec9,
    name: "information"
  }, {
    path: "/list",
    component: _2a60f2d1,
    name: "list"
  }, {
    path: "/login",
    component: _06d98a46,
    name: "login"
  }, {
    path: "/poster",
    component: _839bd580,
    name: "poster"
  }, {
    path: "/register",
    component: _4899be54,
    name: "register"
  }, {
    path: "/resetPassword",
    component: _2b9a6b32,
    name: "resetPassword"
  }, {
    path: "/typotheque",
    component: _2847e7e7,
    name: "typotheque"
  }, {
    path: "/sauve/galerie",
    component: _17542502,
    name: "sauve-galerie"
  }, {
    path: "/sauve/page_1",
    component: _18a0f70d,
    name: "sauve-page_1"
  }, {
    path: "/sauve/texte",
    component: _b1423b08,
    name: "sauve-texte"
  }, {
    path: "/",
    component: _3d31e72f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
