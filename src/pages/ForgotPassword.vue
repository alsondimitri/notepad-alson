<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
    <p class="col-12 text-h5 text-center"> Recuperação de senha </p>
    <div class="col-md-4 col-sm-6 col-xs-10">
      <q-input
      label="Email"
      v-model="email"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Email é obrigatório']"
      type="email"
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
      <q-btn
      label="Voltar"
      color="secundary"
      class="full-width"
      flat
      to="/login"
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

export default defineComponent({
  setup () {
    const { sendPasswordRestEmail } = useAuthUser()

    const { notifyError, notifySucess } = useNotify()

    const email = ref('')

    const handleForgotPassword = async () => {
      try {
        await sendPasswordRestEmail(email.value)
        notifySucess(`Email de recuperação enviado para: ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }

    }

    return {
      email,
      handleForgotPassword
    }
  }
})

</script>
