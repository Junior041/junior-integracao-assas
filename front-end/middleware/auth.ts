export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return

  if (to.path === '/login') return

  const authToken = useCookie('auth_token')

  if (!authToken.value) {
    return navigateTo('/login')
  }
})
