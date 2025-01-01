import { useEffect } from 'react'
import { Navigate, replace, Route, Routes } from 'react-router-dom'

import { supabase } from './supabase'
import { useAuth } from './Context'

import ProtectedRoute from './components/ProtectedRoute'
import Public from './page/Public'
import Home from './page/Home'
import Registration from './page/User/Registration'

function App() {
  const { auth, setAuth, setUserData } = useAuth()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log("Authenticated")
        setAuth(session?.user)
        setUserData(session?.user)
      } else {
        console.log("Unauthenticated")
        setAuth(null)
        setUserData(null)
      }
    })
  }, [])

  return (
    <Routes>
      {!auth ? (
        <>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<Public />} />
          <Route path="/register" element={<Registration />} />
        </>
      ) : (
        <>
          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <Navigate to="/home" />
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </>
      )}

    </Routes>
  )
}

export default App
