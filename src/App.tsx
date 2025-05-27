import {BrowserRouter as Router, Routes, Route} from 'react-router'
import {PlayerProvider} from '@/contexts/PlayerContext'
import {HomePage} from '@/pages/HomePage.tsx'
import {AlbumDetailPage} from '@/pages/AlbumDetailPage'
import {LibraryPage} from '@/pages/LibraryPage'
import {ArtistDetailPage} from "@/pages/ArtistDetailPage.tsx";

function App() {
    return (
        <PlayerProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/album/:albumId" element={<AlbumDetailPage/>}/>
                    <Route path={"/library"} element={<LibraryPage/>}/>
                    <Route path="/artist/daftpunk" element={<ArtistDetailPage />} />
                </Routes>
            </Router>
        </PlayerProvider>
    )
}

export default App
