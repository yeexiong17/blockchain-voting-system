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
import ManageCandidate from './page/Admin/ManageCandidate'
import AdminDashboard from './page/Admin/AdminDashboard'
import Result from './page/User/Result'
import ContractLog from './page/Admin/ContractLog'
import VoteSetting from './page/Admin/VoteSetting'
import { contract, initialization } from './blockchainContract'

const App = () => {
  const [loading, setLoading] = useState(true)
  const { voteState, setVoteState, auth, toggle, setAuth, setUserData, setIdentificationNumber, setWalletAddress, setHasRegistered } = useAuth()

  useEffect(() => {
    const getVoteState = async () => {
      await initialization()
      const voteStateValue = await contract().voteState()
      console.log(voteStateValue)
      if (voteStateValue) setVoteState(voteStateValue)
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        getVoteState()
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
                  path="/manage-candidate"
                  element={
                    <ProtectedRoute>
                      <ManageCandidate />
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
                <Route
                  path="/view-logs"
                  element={
                    <ProtectedRoute>
                      <ContractLog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vote-setting"
                  element={
                    <ProtectedRoute>
                      <VoteSetting />
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
