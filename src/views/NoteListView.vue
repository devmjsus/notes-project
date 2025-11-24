<template>
  <div
    class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default"
  >
    <router-link :to="{ name: 'noteCreate' }" class="text-sm text-indigo-400 hover:text-indigo-300"
      >Create Note</router-link
    >
    <table class="w-full text-sm text-left rtl:text-right text-body" v-if="notes">
      <thead
        class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default"
      >
        <tr>
          <th scope="col" class="px-6 py-3 font-medium">#</th>
          <th scope="col" class="px-6 py-3 font-medium">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-neutral-primary border-b border-default" v-for="note in notes" :key="note.id">
          <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
            {{ note.id }}
          </th>
          <td class="px-6 py-4">{{ note.content }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="p-4 text-center text-gray-500">No notes available.</div>
  </div>
</template>

<script lang="ts" setup>
import { type Ref, ref, onMounted } from 'vue'
import useAuthStore from '@/stores/auth'
import type INote from '@/interfaces/INote'

const store = useAuthStore()
const notes: Ref<Array<INote>> = ref([])

onMounted(async () => {
  notes.value = await store.getNotes()
})
</script>

<style scoped></style>
