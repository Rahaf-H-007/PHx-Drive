/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null)

  useEffect(() => {
    window.api.getSession().then(async (savedUser) => {
      if (savedUser) setUserState(savedUser)
      await window.api.setWindowMode(savedUser ? 'main' : 'login')
    })
  }, [])

  // wraps the setter so that no changes are needed needed in LoginForm
  function setUser(userData) {
    setUserState(userData)
    if (userData) window.api.setWindowMode('main')
  }

  async function logout() {
    await window.api.logout()
    setUserState(null)
    window.api.setWindowMode('login')
  }

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
