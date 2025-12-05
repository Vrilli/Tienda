import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Usuarios en memoria (se reinician al reiniciar el servidor)
let usersInMemory = [
  { id: "1", email: "ana@gmail.com", password: "123456", name: "ana" },
  { id: "2", email: "pedro@gmail.com", password: "12345679", name: "pedro" }
]

function getUsers() {
  return usersInMemory
}

function saveUsers(users) {
  usersInMemory = users
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        isRegister: { label: "Register", type: "hidden" }
      },
      async authorize(credentials) {
        const { email, password, name, isRegister } = credentials
        const users = getUsers()

        if (isRegister === 'true') {
          // Registro
          const existingUser = users.find(u => u.email === email)
          if (existingUser) {
            throw new Error('El usuario ya existe')
          }
          
          if (!name || name.trim() === '') {
            throw new Error('El nombre es requerido')
          }
          
          if (password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres')
          }
          
          const newUser = { 
            id: Date.now().toString(), 
            email, 
            password, 
            name: name.trim()
          }
          users.push(newUser)
          saveUsers(users)
          return { id: newUser.id, email: newUser.email, name: newUser.name }
        } else {
          // Login
          const user = users.find(u => u.email === email && u.password === password)
          if (!user) {
            throw new Error('Email o contraseña incorrectos')
          }
          return { id: user.id, email: user.email, name: user.name }
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || 'tu-secreto-super-seguro-cambialo-en-produccion',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
      }
      return session
    }
  }
}

export default NextAuth(authOptions)