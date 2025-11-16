import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import BlogDetail from './pages/BlogDetail'
import EditBlog from './pages/EditBlog'
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

            {/* Edit Blog */}
            <Route path="/edit/:id" element={<EditBlog />} />

          

          </Routes>

        </main>

      </div>
    </Router>
  )
}

export default App
