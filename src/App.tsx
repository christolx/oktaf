import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { PlayerProvider } from '@/contexts/PlayerContext'
import { HomePage } from '@/pages/HomePage.tsx'
import { AlbumDetailPage } from '@/pages/AlbumDetailPage'

function App() {
    return (
        <PlayerProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/album/:albumId" element={<AlbumDetailPage />} />
                </Routes>
            </Router>
        </PlayerProvider>
    )
}

export default App
