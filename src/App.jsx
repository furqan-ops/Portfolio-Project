import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import AdminPanel from './components/AdminPanel'
import './App.css'

// React Router calls preventDefault on hash links, so the browser never
// scrolls on its own. Keyed on the whole location so re-clicking the section
// you are already on still scrolls back to it.
function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    document.getElementById(location.hash.slice(1))?.scrollIntoView()
  }, [location])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </>
        } />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
