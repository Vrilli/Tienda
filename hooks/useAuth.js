import { useState, useEffect } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar usuario del localStorage
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    window.location.href = '/auth/signin'
  }

  return { user, loading, logout }
}
