import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomeScreen } from './components/Home'
import { NowPlayingScreen } from './components/NowPlaying'
import { TopRatedScreen } from './components/TopRated'
import { SearchMultiScreen } from './components/Search'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/now_playing" element={<NowPlayingScreen />} />
      <Route path="/top_rated" element={<TopRatedScreen />} />
      <Route path="/search" element={<SearchMultiScreen />} />
    </Routes>
  )
}

export default App
