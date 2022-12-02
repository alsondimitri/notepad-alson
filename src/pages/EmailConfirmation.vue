<template>
  <q-page padding>
    <p class="text-body1">
      Obrigado por criar a conta!
    </p>
    <p class="text-body1">
      Por favor confirme o seu email para finalizar o registo: <strong>{{ $route.query. email }}</strong>
    </p>
    <div class="row justify-center">
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
    <q-btn

      label="voltar para Login"
      color="primary"
      class="full-width"
      outline
      rounded
      to="/login"
      />
    </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmationPage'
})
</script>
