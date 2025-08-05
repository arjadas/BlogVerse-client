import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import BlogDetail from './pages/BlogDetail'
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
            <Route path="/" element={<Home />} />

            {/* Create Blog */}
            <Route path="/create" element={<CreateBlog />} />

            {/* Individual blog post page */}
            <Route path="/blog/:id" element={<BlogDetail />} />

          

          </Routes>

        </main>

      </div>
    </Router>
  )
}

export default App
