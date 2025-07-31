import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <Router>
      <div className = "App">

        <main className = "main content">

          {/* Navbar component which appears on all pages*/}
          <Navbar />

          {/* Main content of the application */}
          <Routes>

          {/* Home */}

          

          </Routes>

        </main>

      </div>
    </Router>
  )
}

export default App
