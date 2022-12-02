<template>
<q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
    <p class="col-12 text-h5 text-center"> Recuperação de senha </p>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
      <q-input
      label="Nova senha"
      v-model="password"
      lazy-rules
      :rules="[val => (val && val.length >= 8) || 'Senha é obrigatório, com pelo menos 8 caracteres']"
      />
      <div class=" q-pt-sm q-gutter-y-sm">
      <q-btn
      label="Enviar email de recuperação"
      color="primary"
      class="full-width"
      outline
      rounded
      type="submit"
      />

    </div>
    </div>
  </q-form>
  </q-page>

</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'PageResetPassword',
  setup () {
    const  { resetPassword } = useAuthUser()

    const { notifyError, notifySucess } = useNotify()

    const router = useRouter()

    const route = useRoute()

    const token = route.query.token()

    const password = ref('')

    const handlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value)
        notifySucess('Nova senha definida')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }

    }

    return {
      password,
      handlePasswordReset
    }
  }

})

</script>
