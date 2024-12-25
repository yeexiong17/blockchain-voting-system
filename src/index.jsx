import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'leaflet/dist/leaflet.css'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './Context'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration)
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
  })
}