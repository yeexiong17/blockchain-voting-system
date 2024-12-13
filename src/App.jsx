import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import BookingDetails from './page/BookingDetails'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking-details" element={<BookingDetails />} />
    </Routes>
  )
}

export default App
