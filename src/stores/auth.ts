import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: null as string | null,
      baseURL: 'http://127.0.0.1:8000/api',
      notes: [] as Array<{ id: number; content: string }>,
    }
  },
  actions: {
    async register(name: string, email: string, password: string) {
      // Registration logic here
      const uri = `${this.baseURL}/auth/register`
      const rawResponse = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
      const response = await rawResponse.json()
      // Assuming the response contains a token on successful registration
      if (response.status == false) {
        return false
      } else {
        this.token = response.token
        return true
      }
    },
    async login(email: string, password: string) {
      // Login logic here
      const uri = `${this.baseURL}/auth/login`
      const rawResponse = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          'email': email,
          'password': password,
        }),
      })
      const response = await rawResponse.json()
      // Assuming the response contains a token on successful login
      if (response.status == false) {
        this.token = null
        return false
      } else {
        this.token = response.token
        return true
      }
    },
    async getNotes() {
      // Fetch notes logic here
      const uri = `${this.baseURL}/notes`
      const rawResponse = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      })
      const response = await rawResponse.json()
      this.notes = response.notes
      return this.notes
    },
    async createNote(content: string) {
      // Create note logic here
      const uri = `${this.baseURL}/notes`
      const rawResponse = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          content: content,
        }),
      })
      const response = await rawResponse.json()
      if(response.status == false){
        return false
      } else {
        this.notes.push(response.note)
        return response.note
      }
    },
  },
})

export default useAuthStore
