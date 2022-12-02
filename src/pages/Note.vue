<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocalNotes } from 'src/helper'
import Container from 'src/components/Container.vue'
import { useQuasar } from 'quasar'

export default {
  components: { Container },
  setup() {
    const notes = useLocalNotes()
    const route = useRoute()
    const noteId = computed(() => parseInt(route.params.id))
    const note = computed(() => notes.value[noteId.value])
    const $q = useQuasar()

    const router = useRouter()
    const remove = () => {
      notes.value.splice(noteId.value, 1)
      router.push('/')
    }

    const editing = ref(false)

    function show (grid) {
      $q.bottomSheet({
        message: 'Mais opções',
        grid,
        actions: [
          {
            label: 'Drive',
            img: 'https://cdn.quasar.dev/img/logo_drive_128px.png',
            id: 'drive'
          },
          {
            label: 'Keep',
            img: 'https://cdn.quasar.dev/img/logo_keep_128px.png',
            id: 'keep'
          },
          {
            label: 'Google Hangouts',
            img: 'https://cdn.quasar.dev/img/logo_hangouts_128px.png',
            id: 'calendar'
          },
          {
            label: 'Calendar',
            img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
            id: 'calendar'
          },
          {},
          {
            label: 'Share',
            icon: 'share',
            id: 'share'
          },
          {
            label: 'Upload',
            icon: 'cloud_upload',
            color: 'primary',
            id: 'upload'
          },
          {},
          {
            label: 'Alson Dimitri',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
            id: 'john'
          }
        ]
      }).onOk(action => {
        // console.log('Action chosen:', action.id)
      }).onCancel(() => {
        // console.log('Dismissed')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }

    return { note, editing, remove, show }
  }
}
</script>

<template>
  <q-page padding>
    <Container>
      <div v-if="editing">
        <form @submit="editing = false">
          <q-input v-model="note.title" label="Título" filled />
          <q-input
            v-model="note.description"
            label="Descrição"
            filled
            class="q-mt-sm"
            dense
          />

          <q-card flat bordered class="q-mt-sm" color="grey">
            <q-editor
      v-model="note.content"
      min-height="15rem"
      flat
      content-class="bg-amber-3"
      toolbar-text-color="white"
      toolbar-toggle-color="yellow-8"
      toolbar-bg="primary"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [{
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
        }]
      ]"
    />
          </q-card>

          <div class="q-mt-md">
            <q-btn class="q-ml-sm" color="grey" to="/index"> Cancelar </q-btn>
            <q-btn class="q-ml-sm" color="primary" type="submit"> Concluir </q-btn>
          </div>
        </form>
      </div>

      <div v-else>
        <div class="row items-center justify-between">
          <h3 class="q-mb-md q-mt-md">{{ note.title }}</h3>
          <div>
            <q-btn
              round
              color="primary"
              icon="mdi-square-edit-outline"
              @click="editing = true"
            />
            <q-btn
              class="q-ml-sm"
              round
              color="negative"
              icon="mdi-trash-can-outline"
              @click="remove"
            />
            <q-btn
            class="q-ml-sm"
            round
            color="positive"
            icon="mdi-dots-horizontal"
            @click="show()" />
          </div>

        </div>
        <div>{{ note.description }}</div>
        <div class="q-mt-md" v-html="note.content" />
      </div>
      <q-page-sticky row justify-center position="center" :offset="[-50, -50]">

      </q-page-sticky>



    </Container>

    <!-- <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
      <q-btn
      label="Voltar"
      color="black"
      class="full-width"
      unelevated
      rounded
      to="/index"
      />
    </div> -->

  </q-page>
</template>


