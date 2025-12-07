// hooks/useAuth.js
import { useState, useEffect } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar usuario del localStorage
    const loadUser = () => {
      const currentUser = localStorage.getItem('currentUser')
      if (currentUser) {
        try {
          setUser(JSON.parse(currentUser))
        } catch (e) {
          console.error('Error parsing user:', e)
          localStorage.removeItem('currentUser')
        }
      }
      setLoading(false)
    }

    loadUser()

    // Escuchar cambios en localStorage (para sincronizar entre pestañas)
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser') {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue))
          } catch (err) {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    window.location.href = '/auth/signin'
  }

  return { user, loading, logout }
}
