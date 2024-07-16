import React from 'react'
import ReactDom from 'react-dom/client';
import App from './app.jsx'

const root = ReactDom.createRoot(rootElement)

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
