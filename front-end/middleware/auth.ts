export default defineNuxtRouteMiddleware((_to, _from) => {
    if (!import.meta.client) return;
    const isAuthenticated: boolean = Boolean(localStorage.getItem('auth'));
  
    if (!isAuthenticated) {
      return navigateTo('/login');
    }
  });
  