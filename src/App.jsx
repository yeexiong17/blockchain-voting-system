import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import BookingDetails from './page/BookingDetails'
import Public from './page/Public'
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Public />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-details"
        element={
          <ProtectedRoute>
            <BookingDetails />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App
