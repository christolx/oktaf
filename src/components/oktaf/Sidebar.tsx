// components/oktaf/Sidebar.tsx
import { useNavigate, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/ui/AlbumArt'
import { userPlaylists, libraryItems, navigationIcons } from '@/data/DummyData.tsx'

const { Home, Plus } = navigationIcons

export function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    const handleHomeClick = () => {
        navigate('/')
    }

    return (
        <div className="w-60 bg-[#0a0a0a] border-r border-white/10 flex flex-col p-4">
            {/* Navigation */}
            <div className="mb-8">
                {/* Home/Discover Button */}
                <Button
                    variant="ghost"
                    onClick={handleHomeClick}
                    className={`flex items-center gap-2 text-sm mb-8 p-0 h-auto font-normal justify-start w-auto hover:bg-transparent transition-colors duration-200 ${
                        isHomePage
                            ? 'text-white'
                            : 'text-white/70 hover:text-white'
                    }`}
                >
                    <Home className="w-4 h-4" />
                    <span>Home / Discover</span>
                </Button>

                {/* My Library */}
                <div className="mb-8">
                    <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-4">
                        📚 MY LIBRARY
                    </h3>
                    <div className="space-y-3">
                        {libraryItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`cursor-pointer text-sm transition-colors duration-200 ${
                                    index === 0
                                        ? "text-white font-medium"
                                        : "text-white/70 hover:text-white"
                                }`}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* My Playlists */}
                <div className="mb-8">
                    <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-4">
                        📋 MY PLAYLISTS
                    </h3>
                    <div className="space-y-3">
                        {userPlaylists.map((playlist) => (
                            <div key={playlist.id} className="flex items-center gap-3 text-sm group cursor-pointer">
                                <div className="relative">
                                    <AlbumArt art={playlist.art} size="sm" />
                                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                        {playlist.name[0]}
                                    </div>
                                </div>
                                <span className="text-white/70 group-hover:text-white truncate transition-colors duration-200">
                                    {playlist.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* New Playlist Button */}
            <div className="mt-auto">
                <Button variant="ghost" className="w-full justify-start gap-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-200">
                    <Plus className="w-4 h-4" />
                    New Playlist
                </Button>
            </div>
        </div>
    )
}
