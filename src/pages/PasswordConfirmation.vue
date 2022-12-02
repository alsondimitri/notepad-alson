<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleConfirmation">
      <div class="align-center">
    <p class="text-body1 text-center" >
      Por favor, confirme a sua senha
    </p>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">

      <q-input
      label="Senha"

      outlined
      rounded
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Senha é obrigatório']"
      />
      </div>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
      <!-- <q-btn
      label="Entrar"
      color="black"
      class="full-width"
      unelevated
      rounded
      type="submit"
      /> -->

      <q-btn
      label="Entrar"
      color="black"
      class="full-width"
      unelevated
      rounded
      to="/index-secreto"
      />

    </div>
    <div class="row justify-center">
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
    <q-btn

      label="voltar"
      color="black"
      class="full-width"
      flat
      to="/index"
      />
    </div>
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
  name: 'PasswordConfirmationPage',

  setup () {
    const router = useRouter()

    const { confirmation, isLoggedIn } = useAuthUser()

    const { notifyError, notifySucess } = useNotify()

    const form = ref({
      password: ''
    })

    // onMounted(() => {
    //   if (isLoggedIn) {
    //     router.push({ name: 'index-secreto' })
    //   }
    // })

    const handleConfirmation = async () => {
      try {
        await confirmation(form.value)
        notifySucess('Sucesso')
        router.push({ name: 'index-secreto' })
      } catch (error) {
        notifyError(error.message)


      }
    }

    return {
      form,
      handleConfirmation
    }
  }
})
</script>
