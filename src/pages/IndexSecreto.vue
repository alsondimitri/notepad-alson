<script>
/* eslint-disable */
import Container from 'src/components/Container.vue'
import NoteCard from 'src/components/NoteCard.vue'
import { useLocalNotes } from 'src/helper'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'



export default defineComponent({
  components: { NoteCard, Container },
  name: 'PageIndexSecreto',
  setup() {
    const notesecret = useLocalNotes()
    const router = useRouter()
    return { router, notesecret }
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
        v-for="({ title, description }, idx) in notesecret"
        :key="idx"
        :title="title"
        :description="description"
        @click="router.push(`/notesecret/${idx}`)"


      />
    </div>

    <div>
      <NoteCard
        v-for="({ title, description }, idx) in notesecret"
        :key="idx"
        :title="title"
        :description="description"
        @click="router.push(`/notesecret/${idx}`)"
        color="black"

      />
    </div>
      <div v-if="notesecret.length === 0">Você ainda não criou nenhuma nota</div>

    </Container>
  </q-page>
</template>
