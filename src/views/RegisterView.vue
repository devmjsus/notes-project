<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
        Register to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-100">Name</label>
          <div class="mt-2">
            <input
              type="name"
              name="name"
              id="name"
              autocomplete="name"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              v-model="name"
            />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-100">Email address</label>
          <div class="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              v-model="email"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              v-model="password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            @click.prevent="createUser"
          >
            Sign in
          </button>
        </div>
      </form>
      <router-link to="/login" class="text-sm text-indigo-400 hover:text-indigo-300"
        >Login</router-link
      >
    </div>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <p class="text-sm text-gray-100" :class="feedbackColor">{{ feedback }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import router from '@/router'

const name = ref('')
const email = ref('')
const password = ref('')
const feedback = ref('')
const feedbackColor = ref('')
const authStore = useAuthStore()

const createUser = async () => {
  feedback.value = 'Sending data...'
  const response = await authStore.register(name.value, email.value, password.value)
  if (response == false) {
    feedback.value = 'Registration failed'
    feedbackColor.value = 'text-red-500'
  } else {
    router.push({ name: 'notesList' })
    feedback.value = 'Registration successful'
    feedbackColor.value = 'text-green-500'
  }
}
</script>

<style scoped></style>
