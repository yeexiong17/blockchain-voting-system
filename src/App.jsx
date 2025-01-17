import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { supabase } from './supabase'
import { useAuth } from './Context'

import ProtectedRoute from './components/ProtectedRoute'
import Public from './page/Public'
import Registration from './page/User/Registration'
import Login from './page/User/Login'
import VoterRegistration from './page/User/VoterRegistration'
import Vote from './page/User/Vote'
import ManageAdmin from './page/SuperAdmin/ManageAdmin'
import ManageVoter from './page/Admin/ManageVoter'
import AdminDashboard from './page/Admin/AdminDashboard'
import Result from './page/User/Result'

function App() {
  const [loading, setLoading] = useState(true)
  const { auth, setAuth, setUserData, setIdentificationNumber, setWalletAddress, setHasRegistered } = useAuth()

  useEffect(() => {

    const voterId = localStorage.getItem('id')
    const voterWallet = localStorage.getItem('walletAddress')

    if (voterId && voterWallet) {
      setIdentificationNumber(voterId)
      setWalletAddress(voterWallet)
      setHasRegistered(true)
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log(session.user)
        setAuth(session.user)
        setUserData(session.user)
      } else {
        setAuth(null)
        setUserData(null)
      }
      setLoading(false)
    })
  }, [])

  return (
    <>
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            {!auth ? (
              <>
                <Route path="/" element={<Public />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login />} />
              </>
            ) : auth?.user_metadata?.role === 'superadmin' ? (
              <>
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Navigate to="/manage-admin" replace />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-admin"
                  element={
                    <ProtectedRoute>
                      <ManageAdmin />
                    </ProtectedRoute>
                  }
                />
              </>
            ) : auth?.user_metadata?.role === 'admin' ? (
              <>
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Navigate to="/admin-dashboard" replace />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-voter"
                  element={
                    <ProtectedRoute>
                      <ManageVoter />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </>
            ) : (
              <>
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Navigate to="/voter-registration" replace />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/voter-registration"
                  element={
                    <ProtectedRoute>
                      <VoterRegistration />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vote"
                  element={
                    <ProtectedRoute>
                      <Vote />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/result"
                  element={
                    <ProtectedRoute>
                      <Result />
                    </ProtectedRoute>
                  }
                />
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )
      }
    </>
  )
}

export default App
