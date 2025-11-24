<template>
  <form class="space-y-6" action="#" method="POST">
    <div>
      <label for="notes" class="block text-sm/6 font-medium text-gray-100">Notes</label>
      <div class="mt-2">
        <input
          type="text"
          class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          v-model="note"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        @click.prevent="sendNote"
      >Submit</button>
    </div>
  </form>
  <router-link to="/login" class="text-sm text-indigo-400 hover:text-indigo-300"
        >Login</router-link
      >
  <div v-if="feedback" class="mt-4 text-sm text-red-500">
    {{ feedback }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import router from '@/router'
const store = useAuthStore()
const note = ref('')
const feedback = ref('')
const sendNote = async () => {
  const success = await store.createNote(note.value)
  if (success == false) {
    feedback.value = 'Error creating note'
  } else {
    router.push({ name: 'notesList' })
  }
}

</script>

<style scoped></style>
