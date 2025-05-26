import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { HomePage } from '@/pages/HomePage.tsx'
import { AlbumDetailPage } from '@/pages/AlbumDetailPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/album/:albumId" element={<AlbumDetailPage />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    )
}

export default App
