// src/pages/AlbumDetailPage.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/ui/AlbumArt'
import { Sidebar } from '@/components/oktaf/Sidebar'
import { BottomPlayer } from '@/components/oktaf/BottomPlayer'
import NavHeader from '@/components/oktaf/NavHeader'
import {
    navigationIcons,
    albumsForYou,
    nostalgiaAlbums,
    trendingAlbums,
    PopArtAlbums,
    AlternativeRockAlbums,
    GothicRockAlbums,
    getAlbumTracks,
    calculateAlbumDuration,
    formatPlayCount,
    mainNavItems,
} from '@/data/DummyData'

const {
    Play,
    Heart,
    MoreHorizontal,
    Shuffle,
    ThumbsDown,
    Bookmark
} = navigationIcons

export function AlbumDetailPage() {
    const { albumId } = useParams()
    const navigate = useNavigate()
    const [activeNav, setActiveNav] = useState(mainNavItems[0].id)

    // Find the album from all available albums
    const allAlbums = [
        ...albumsForYou,
        ...nostalgiaAlbums,
        ...trendingAlbums,
        ...PopArtAlbums,
        ...AlternativeRockAlbums,
        ...GothicRockAlbums
    ]

    const album = allAlbums.find(a => a.id === albumId)
    const tracks = album ? getAlbumTracks(album.id) : []
    const albumDuration = tracks.length > 0 ? calculateAlbumDuration(tracks) : '0m'

    const handleNavClick = (navId: string) => {
        setActiveNav(navId)
        navigate(`/?section=${navId}`)
    }


    if (!album) {
        return (
            <div className="h-screen w-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Album not found</h1>
                    <Button onClick={() => navigate('/')} variant="outline">
                        Go back home
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen w-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
            <div className="flex flex-1 min-h-0">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="p-4">
                        <NavHeader
                            activeNav={activeNav}
                            setActiveNav={handleNavClick}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
                        {/* Header with album info */}
                        <div className="relative">
                            {/* Background gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/30 to-transparent z-10"></div>

                            {/* Header content */}
                            <div className="relative z-20 p-6">

                                {/* Album info section */}
                                <div className="flex items-end gap-6 mb-8">
                                    <AlbumArt
                                        art={album.art}
                                        size="xl"
                                        className="w-64 h-64 shadow-2xl"
                                    />

                                    <div className="flex-1 pb-4">
                                        <div className="text-sm text-white/60 mb-2">Album</div>
                                        <h1 className="text-5xl font-bold mb-4 leading-tight">{album.title}</h1>
                                        <div className="flex items-center gap-2 text-white/80">
                                            <span className="font-medium">{album.artist}</span>
                                            <span>•</span>
                                            <span>{album.year}</span>
                                            <span>•</span>
                                            <span>{tracks.length} songs</span>
                                            <span>•</span>
                                            <span>{albumDuration}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                        <Shuffle className="w-5 h-5" />
                                    </Button>
                                    <Button size="icon" className="bg-white text-black hover:bg-white/90 w-12 h-12">
                                        <Play className="w-6 h-6 fill-current" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                        <Heart className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                        <ThumbsDown className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                        <Bookmark className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Track listing */}
                        <div className="px-6 pb-6">
                            {tracks.length > 0 ? (
                                <>
                                    {/* Table header */}
                                    <div className="grid grid-cols-12 gap-4 py-3 px-4 text-white/50 text-sm border-b border-white/10 mb-2">
                                        <div className="col-span-1 text-center">#</div>
                                        <div className="col-span-6">Title</div>
                                        <div className="col-span-3 text-right">Plays</div>
                                        <div className="col-span-2 text-right">Duration</div>
                                    </div>

                                    {/* Track rows */}
                                    <div className="space-y-1">
                                        {tracks.map((track) => (
                                            <div
                                                key={track.id}
                                                className="grid grid-cols-12 gap-4 py-3 px-4 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
                                            >
                                                <div className="col-span-1 text-center text-white/60 text-sm">
                                                    <span className="group-hover:hidden">{track.number}</span>
                                                    <Play className="w-4 h-4 hidden group-hover:inline-block fill-current text-white" />
                                                </div>
                                                <div className="col-span-6">
                                                    <div className="text-white text-sm font-medium">{track.title}</div>
                                                    <div className="text-white/60 text-xs">{track.artist}</div>
                                                </div>
                                                <div className="col-span-3 text-right text-white/60 text-sm">
                                                    {formatPlayCount(track.plays)}
                                                </div>
                                                <div className="col-span-2 text-right text-white/60 text-sm">
                                                    {track.duration}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-white/60 text-lg">No tracks available for this album</div>
                                    <div className="text-white/40 text-sm mt-2">Track data will be added soon</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <BottomPlayer />
        </div>
    )
}
