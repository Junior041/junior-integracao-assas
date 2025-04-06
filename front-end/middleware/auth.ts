export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return

  if (to.path === '/login') return

  const token = localStorage.getItem('auth_token')

  if (!token) {
    return navigateTo('/login')
  }
})
