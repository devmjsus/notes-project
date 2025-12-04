import { defineStore } from 'pinia'

// Definición de la tienda (store) 'auth' utilizando Pinia.
// Esta tienda maneja la autenticación del usuario y la gestión de notas.
const useAuthStore = defineStore('auth', {
  // El estado (state) almacena las variables reactivas de la aplicación.
  state: () => {
    return {
      token: null as string | null, // Token de autenticación (JWT) recibido del servidor
      baseURL: 'http://127.0.0.1:8000/api', // URL base de la API del backend
      notes: [] as Array<{ id: number; content: string }>, // Lista de notas del usuario
    }
  },
  actions: {
    // Acción para registrar un nuevo usuario en el sistema.
    // Recibe nombre, email y contraseña, y realiza una petición POST al endpoint de registro.
    async register(name: string, email: string, password: string) {
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
    // Acción para iniciar sesión (login).
    // Envía las credenciales al servidor y, si es exitoso, guarda el token recibido.
    async login(email: string, password: string) {
      const uri = `${this.baseURL}/auth/login`
      const rawResponse = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
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
    // Acción para obtener todas las notas del usuario.
    // Realiza una petición GET enviando el token de autorización en los headers.
    async getNotes() {
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
    // Acción para crear una nueva nota.
    // Envía el contenido de la nota al servidor mediante una petición POST.
    async createNote(content: string) {
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
      if (response.status == false) {
        return false
      } else {
        this.notes.push(response.note)
        return response.note
      }
    },
  },
})

export default useAuthStore
