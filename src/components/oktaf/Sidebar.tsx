// components/oktaf/Sidebar.tsx
import { useNavigate, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/ui/AlbumArt'
import { userPlaylists, libraryItems, navigationIcons, playerIcons } from '@/data/DummyData.tsx'

const { Home } = navigationIcons
const { ListMusic, LibraryBig, CopyPlus } = playerIcons

export function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    const handleHomeClick = () => {
        navigate('/')
    }

    return (
        <div
            className="w-55 h-screen pb-32 border-r border-white/5 flex flex-col bg-[#0a0a0a] relative overflow-hidden"
        >
            {/* Enhanced background with subtle gradient */}
            <div
                className="absolute inset-0 opacity-80"
                style={{
                    background: 'linear-gradient(180deg, #0a0a0a 0%, #1B1B1B 30%, #0a0a0a 100%)'
                }}
            />

            <div className="relative z-10 flex flex-col h-full p-4">
                {/* Navigation */}
                <div className="space-y-6">
                    {/* Home/Discover Button - Fixed alignment */}
                    <div className="pt-2">
                        <div
                            onClick={handleHomeClick}
                            className={`flex items-center gap-3 text-base mb-16 mt-4 bg-transparent hover:bg-transparent hover:text-white/80 cursor-pointer transition-all duration-300 ${
                                isHomePage
                                    ? 'text-white'
                                    : 'text-white/60 hover:text-white/90'
                            }`}
                        >
                            <Home className="w-6 h-6" />
                            <span className="font-medium !font-family-outfit">Home / Discover</span>
                        </div>
                    </div>

                    {/* My Library Section */}
                    <div className="space-y-4 mb-16">
                        <div className="flex items-center gap-3">
                            <LibraryBig className="w-5 h-5 text-white/70" />
                            <h3 className="text-white text-base font-medium !font-family-outfit tracking-wider uppercase">
                                MY LIBRARY
                            </h3>
                        </div>
                        <div className="space-y-3 pl-8">
                            {libraryItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`cursor-pointer text-base transition-all duration-200 hover:translate-x-1 ${
                                        index === 0
                                            ? "text-white font-medium"
                                            : "text-white/60 hover:text-white/90"
                                    }`}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* My Playlists Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ListMusic className="w-5 h-5 text-white/70" />
                            <h3 className="text-white text-base font-medium tracking-wider !font-family-outfit uppercase">
                                MY PLAYLISTS
                            </h3>
                        </div>
                        <div className="space-y-3 pl-8">
                            {userPlaylists.map((playlist, index) => (
                                <div
                                    key={playlist.id}
                                    className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 -ml-2 rounded-lg transition-all duration-200 hover:translate-x-1"
                                >
                                    <div className="relative flex-shrink-0">
                                        <AlbumArt art={playlist.art} size="sm" className="rounded-md" />
                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white bg-black/20 rounded-md">
                                            {playlist.name[0]}
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="text-white/80 text-sm font-light group-hover:text-white truncate transition-colors duration-200">
                                            {playlist.name}
                                        </span>
                                        <span className="text-white/50 text-xs font-extralight group-hover:text-white/70 truncate transition-colors duration-200">
                                            {playlist.creator}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* New Playlist Button */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    <Button
                        variant="ghost"
                        className="w-full justify-center gap-3 text-white hover:text-white/80 bg-transparent hover:bg-transparent transition-all duration-300 rounded-lg py-3 font-medium"
                    >
                        <CopyPlus className="w-5 h-5" />
                        New Playlist
                    </Button>
                </div>
            </div>
        </div>
    )
}