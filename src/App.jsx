import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar      from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Home        from './pages/Home'
import Maps        from './pages/Maps'
import Leaderboard from './pages/Leaderboard'
import Profile     from './pages/Profile'
import Vote        from './pages/Vote'
import Rules       from './pages/Rules'
import Contact     from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/maps"                element={<Maps />} />
        <Route path="/leaderboard"         element={<Leaderboard />} />
        <Route path="/profile/:username"   element={<Profile />} />
        <Route path="/vote"                element={<Vote />} />
        <Route path="/rules"               element={<Rules />} />
        <Route path="/contact"             element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App