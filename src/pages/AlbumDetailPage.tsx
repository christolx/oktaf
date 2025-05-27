// AlbumDetailPage.tsx - Updated relevant sections
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/ui/AlbumArt'
import { Sidebar } from '@/components/oktaf/Sidebar'
import { BottomPlayer } from '@/components/oktaf/BottomPlayer'
import NavHeader from '@/components/oktaf/NavHeader'
import { usePlayer } from '@/contexts/PlayerContext'
import { useAlbumColors } from '@/hooks/useAlbumColors'
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
    type CurrentTrack,
    type Track
} from '@/data/DummyData'

const {
    Play,
    Heart,
    MoreHorizontal,
    Shuffle,
    ThumbsDown,
    Download
} = navigationIcons

export function AlbumDetailPage() {
    const { albumId } = useParams()
    const navigate = useNavigate()
    const [activeNav, setActiveNav] = useState(mainNavItems[0].id)
    const {
        playTrack,
        playAlbum,
        currentTrack,
        isPlaying,
        playerState,
        toggleShuffle,
        currentAlbum
    } = usePlayer()

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

    // Extract colors from album art
    const albumArtUrl = typeof album?.art === 'string' ? album.art : album?.art?.value || ''
    const { dominant, vibrant, muted, isLoading: colorsLoading } = useAlbumColors(albumArtUrl)

    const tracks = album ? getAlbumTracks(album.id) : []
    const albumDuration = tracks.length > 0 ? calculateAlbumDuration(tracks) : '0m'

    // Check if this album is currently playing
    const isCurrentAlbum = currentAlbum === albumId

    const handleNavClick = (navId: string) => {
        setActiveNav(navId)
        navigate(`/?section=${navId}`)
    }

    const handleTrackPlay = (track: Track) => {
        const trackData: CurrentTrack = {
            id: track.id,
            title: track.title,
            artist: track.artist,
            album: album?.title || '',
            art: album?.art || {
                type: 'gradient',
                value: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
                alt: 'Default gradient background'
            },
            duration: track.duration,
            currentTime: '0:00',
            isLiked: track.isLiked || false,
            isDisliked: track.isDisliked || false,
            isBookmarked: track.isBookmarked || false,
        }
        playTrack(trackData, albumId)
    }

    const handlePlayAlbum = () => {
        if (!albumId || tracks.length === 0) return
        playAlbum(albumId)
    }

    const handleShufflePlay = () => {
        if (!albumId || tracks.length === 0) return

        // If shuffle is not already on, turn it on
        if (!playerState.isShuffled) {
            toggleShuffle()
        }

        // Play the album (it will be shuffled due to the shuffle state)
        setTimeout(() => {
            playAlbum(albumId)
        }, 50) // Small delay to ensure shuffle state is updated
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
            <div className="flex flex-1 min-h-0 pb-20 relative">
                {/* Sidebar */}
                <div className="relative z-40">
                    <Sidebar />
                </div>

                {/* Main Content Area - Full Height */}
                <div className="flex-1 relative min-w-0">
                    {/* Floating NavHeader */}
                    <div className="absolute top-0 left-0 right-0 z-50 p-4">
                        <NavHeader
                            activeNav={activeNav}
                            setActiveNav={handleNavClick}
                        />
                    </div>

                    {/* Main Content - Extends Full Height */}
                    <div className="h-full overflow-y-auto">
                        {/* Header with album info and dynamic background */}
                        <div className="relative min-h-[500px]">
                            {/* Background with album art blur effect */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${albumArtUrl})`,
                                    filter: 'blur(50px) brightness(0.3)',
                                    transform: 'scale(1.1)',
                                }}
                            />

                            {/* Dynamic color overlays */}
                            {colorsLoading ? (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
                                </>
                            ) : (
                                <>
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${dominant}75 0%, ${vibrant}65 50%, ${muted}80 100%)`
                                        }}
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `radial-gradient(ellipse 80% 60% at center top, ${vibrant}55 0%, transparent 70%)`
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/85" />
                                </>
                            )}

                            {/* Header content with top padding for floating nav */}
                            <div className="relative z-20 p-8 pt-24">
                                {/* Album info section */}
                                <div className="flex items-end gap-8 mb-8">
                                    <AlbumArt
                                        art={album.art}
                                        size="xl"
                                        className="w-56 h-56 shadow-2xl rounded-lg flex-shrink-0"
                                    />

                                    <div className="flex-1 pb-4">
                                        <div className="text-sm text-white/70 mb-2 font-medium">Album</div>
                                        <h1 className="text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                                            {album.title}
                                        </h1>
                                        <div className="flex items-center gap-2 text-white/90">
                                            <span className="font-semibold text-white">{album.artist}</span>
                                            <span className="text-white/60">•</span>
                                            <span className="text-white/80">{album.year}</span>
                                            <span className="text-white/60">•</span>
                                            <span className="text-white/80">{tracks.length} songs</span>
                                            <span className="text-white/60">•</span>
                                            <span className="text-white/80">{albumDuration}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center gap-6">
                                    <Button
                                        size="icon"
                                        className="bg-green-500 hover:bg-green-400 text-black w-14 h-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                                        onClick={handlePlayAlbum}
                                        title="Play album"
                                    >
                                        <Play className="w-6 h-6 fill-current ml-1" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handleShufflePlay}
                                        className={`w-10 h-10 transition-all duration-200 hover:scale-110 ${
                                            isCurrentAlbum && playerState.isShuffled
                                                ? 'text-green-500 hover:text-green-400'
                                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                        }`}
                                        title="Shuffle play"
                                    >
                                        <Shuffle className="w-5 h-5" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white/70 hover:text-white hover:bg-white/10 w-10 h-10 transition-all duration-200 hover:scale-110"
                                        title="Like album"
                                    >
                                        <Heart className="w-5 h-5" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white/70 hover:text-white hover:bg-white/10 w-10 h-10 transition-all duration-200 hover:scale-110"
                                        title="Dislike album"
                                    >
                                        <ThumbsDown className="w-5 h-5" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white/70 hover:text-white hover:bg-white/10 w-10 h-10 transition-all duration-200 hover:scale-110"
                                        title="Download album"
                                    >
                                        <Download className="w-5 h-5" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white/70 hover:text-white hover:bg-white/10 w-10 h-10 transition-all duration-200 hover:scale-110"
                                        title="More options"
                                    >
                                        <MoreHorizontal className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Track listing with dynamic background continuation */}
                        <div
                            className="px-8 pb-8"
                            style={{
                                background: colorsLoading
                                    ? 'linear-gradient(to bottom, rgba(0,0,0,0.9), #0a0a0a)'
                                    : `linear-gradient(to bottom, ${dominant}15, #0a0a0a)`
                            }}
                        >
                            {tracks.length > 0 ? (
                                <>
                                    {/* Table header */}
                                    <div className="grid grid-cols-12 gap-4 py-4 px-4 text-white/100 text-sm font-medium border-b border-white/10 mb-2">
                                        <div className="col-span-1 text-center">#</div>
                                        <div className="col-span-3">Title</div>
                                        <div className="col-span-3 text-right">Plays</div>
                                        <div className="col-span-3 text-right">Duration</div>
                                    </div>

                                    {/* Track rows */}
                                    <div className="space-y-1">
                                        {tracks.map((track, index) => {
                                            const isCurrentTrack = currentTrack?.id === track.id
                                            const isCurrentlyPlaying = isCurrentTrack && isPlaying

                                            return (
                                                <div
                                                    key={track.id}
                                                    className={`grid grid-cols-12 gap-4 py-3 px-4 rounded-lg transition-all duration-200 group cursor-pointer ${
                                                        isCurrentTrack
                                                            ? 'bg-white/10 text-green-400'
                                                            : 'hover:bg-white/5 text-white'
                                                    }`}
                                                    onClick={() => handleTrackPlay(track)}
                                                >
                                                    <div className="col-span-1 text-center text-sm flex items-center justify-center">
                                                        {isCurrentlyPlaying ? (
                                                            <div className="flex gap-1 items-center">
                                                                <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                                                <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
                                                                <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse delay-150"></div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span className={`group-hover:hidden ${isCurrentTrack ? 'text-green-400' : 'text-white/60'}`}>
                                                                    {track.number || index + 1}
                                                                </span>
                                                                <Play className="w-4 h-4 hidden group-hover:inline-block fill-current text-white" />
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="col-span-3">
                                                        <div className={`text-sm font-medium ${isCurrentTrack ? 'text-green-400' : 'text-white'}`}>
                                                            {track.title}
                                                        </div>
                                                        <div className="text-white/60 text-xs mt-1">{track.artist}</div>
                                                    </div>

                                                    <div className="col-span-3 text-right text-white/60 text-sm flex items-center justify-end">
                                                        {formatPlayCount(track.plays)}
                                                    </div>

                                                    <div className="col-span-3 text-right text-white/60 text-sm flex items-center justify-end">
                                                        {track.duration}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="text-white/60 text-xl mb-2">No tracks available for this album</div>
                                    <div className="text-white/40 text-sm">Track data will be added soon</div>
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
