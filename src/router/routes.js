const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') }

    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //{ path: '', name: 'indexDefault', component: () => import('pages/Index.vue') },
      { path: 'index', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'new', name: 'new', component: () => import('pages/New.vue') },
      { path: 'note/:id', name: 'note', component: () => import('pages/Note.vue') },
      { path: 'password-confirmation', name: 'password-confirmation', component: () => import('pages/PasswordConfirmation.vue') },
      { path: 'index-secreto', name: 'index-secreto', component: () => import('pages/IndexSecreto.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
