import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SignIn() {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar si ya está logueado
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      router.push('/')
    }

    // Inicializar usuarios de prueba si no existen
    const users = localStorage.getItem('users')
    if (!users) {
      const defaultUsers = [
        { id: "1", email: "ana@gmail.com", password: "123456", name: "Ana" },
        { id: "2", email: "pedro@gmail.com", password: "123456", name: "Pedro" },
        { id: "3", email: "test@test.com", password: "123456", name: "Test User" }
      ]
      localStorage.setItem('users', JSON.stringify(defaultUsers))
    }
  }, [router])

  function getUsers() {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  }

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const users = getUsers()

      if (isRegister) {
        // Registro
        const existingUser = users.find(u => u.email === email)
        if (existingUser) {
          setError('El usuario ya existe')
          setLoading(false)
          return
        }
        
        if (!name || name.trim() === '') {
          setError('El nombre es requerido')
          setLoading(false)
          return
        }
        
        if (password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres')
          setLoading(false)
          return
        }
        
        const newUser = { 
          id: Date.now().toString(), 
          email, 
          password, 
          name: name.trim()
        }
        users.push(newUser)
        saveUsers(users)
        
        // Guardar sesión
        localStorage.setItem('currentUser', JSON.stringify({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
        }))
        
        // Redirigir con recarga para actualizar el estado
        window.location.href = '/'
      } else {
        // Login
        const user = users.find(u => u.email === email && u.password === password)
        if (!user) {
          setError('Email o contraseña incorrectos')
          setLoading(false)
          return
        }
        
        // Guardar sesión
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name
        }))
        
        // Redirigir con recarga para actualizar el estado
        window.location.href = '/'
      }
    } catch (err) {
      setError('Ocurrió un error. Intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 px-4 py-12">
      
      <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header con icono */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-md">
            <span className="text-3xl">{isRegister ? '⚡' : '🔐'}</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>
          <p className="text-slate-600 text-sm">
            {isRegister ? 'Únete a TechStore' : 'Bienvenido de nuevo'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-slate-400"
                placeholder="Tu nombre"
                required={isRegister}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-slate-400"
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-slate-400"
              placeholder="••••••••"
              required
            />
            {isRegister && (
              <p className="text-xs text-slate-500 mt-1">Mínimo 6 caracteres</p>
            )}
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-300 text-rose-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Procesando...</span>
              </>
            ) : (
              <>
                <span>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
              setName('')
              setEmail('')
              setPassword('')
            }}
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>

        {/* Usuarios de prueba */}
        {!isRegister && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800 font-semibold mb-2">👤 Usuarios de prueba:</p>
            <div className="text-xs text-blue-700 space-y-1">
              <p>📧 ana@gmail.com / 123456</p>
              <p>📧 pedro@gmail.com / 123456</p>
              <p>📧 test@test.com / 123456</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
