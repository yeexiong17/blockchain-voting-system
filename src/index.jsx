import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import './styles/index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import App from './App'
import { AuthProvider } from './Context'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <MantineProvider>
    <Notifications />
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </MantineProvider>
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