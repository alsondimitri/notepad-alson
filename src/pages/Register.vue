<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
    <p class="col-12 text-h5 text-center"> Criar Conta </p>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
      <q-input
      label="Nome"
      v-model="form.name"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Nome é obrigatório']"
      />

      <q-input
      label="Email"
      v-model="form.email"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Email é obrigatório']"
      type="email"
      />

      <q-input
      label="Senha"
      v-model="form.password"
      lazy-rules
      :rules="[val => (val && val.length >= 8) || 'Senha é obrigatório, com pelo menos 8 caracteres']"
      />
      <div class=" q-pt-sm q-gutter-y-sm">
      <q-btn
      label="Criar Conta"
      color="primary"
      class="full-width"
      outline
      rounded
      type="submit"
      />
      <q-btn
      label="voltar"
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterPage',

  setup () {
    const router = useRouter()
    const { register } = useAuthUser()

    const { notifyError, notifySucess } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySucess('Registo efectuado com sucesso')
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
