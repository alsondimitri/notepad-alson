<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">

      <div class="align-center">

    </div>
      <p class="col-12 text-h5 text-center"> LOGIN </p>

    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
      <q-input
      label="Email"
      v-model="form.email"
      outlined
      rounded
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Email é obrigatório']"
      type="email"
      />

      <q-input
      label="Senha"
      v-model="form.password"
      outlined
      rounded
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Senha é obrigatório']"
      />
      <div class=" q-pt-sm">
      <q-btn
      label="Entrar"
      color="primary"
      class="full-width"
      unelevated
      rounded
      type="submit"
      />
    </div>

    <div>
      <q-btn
      label="Criar Conta"
      color="primary"
      class="full-width"
      flat
      to="/Register"
      />
      <q-btn
      label="Esqueceu sua senha?"
      color="primary"
      class="full-width"
      flat
      to="/ForgotPassword"
      />

    </div>
    </div>
  </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const router = useRouter()

    const { login, isLoggedIn } = useAuthUser()

    const { notifyError, notifySucess } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'index' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySucess('Login efectuado com sucesso')
        router.push({ name: 'index' })
      } catch (error) {
        notifyError(error.message)


      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
