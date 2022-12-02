<script>
/* eslint-disable */
import Container from 'src/components/Container.vue'
import NoteCard from 'src/components/NoteCard.vue'
import { useLocalNotes } from 'src/helper'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'



export default defineComponent({
  components: { NoteCard, Container },
  name: 'PageIndex',
  setup() {
    
    const notes = useLocalNotes()
    const router = useRouter()
    return { router, notes }
  }
})
</script>

<template>
  <q-page padding>
    <Container>
      <div class="row items-center justify-between">
        <h4>Minhas notas</h4>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn round color="primary" icon="add" to="/new"></q-btn>
        </q-page-sticky>
      </div>
      <div>
      <NoteCard
        v-for="({ title, description }, idx) in notes"
        :key="idx"
        :title="title"
        :description="description"
        @click="router.push(`/note/${idx}`)"

      />
    </div>
      <div v-if="notes.length === 0">Você ainda não criou nenhuma nota</div>
      <div class=" q-pt-sm">

      <q-btn
      label="Modo Secreto"
      color="black"
      class="full-width"
      unelevated
      rounded
      type="sumbit"
      to="/password-confirmation"
      />
    </div>
    </Container>
  </q-page>
</template>
