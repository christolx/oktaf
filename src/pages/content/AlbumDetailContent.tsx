// components/oktaf/AlbumDetailContent.tsx
import { Button } from '@/components/ui/button.tsx'
import { AlbumArt } from '@/components/oktaf/AlbumArt.tsx'
import { usePlayer } from '@/contexts/PlayerContext.tsx'
import { useAlbumColors } from '@/hooks/useAlbumColors.ts'
import {
    navigationIcons,
    getAlbumTracks,
    calculateAlbumDuration,
    formatPlayCount,
    type Album,
    type CurrentTrack,
    type Track
} from '@/data/DummyData.tsx'

const {
    Play,
    Heart,
    MoreHorizontal,
    Shuffle,
    ThumbsDown,
    Download
} = navigationIcons

type AlbumDetailContentProps = {
    album: Album
    albumId: string
}

export function AlbumDetailContent({ album, albumId }: AlbumDetailContentProps) {
    const {
        playTrack,
        playAlbum,
        currentTrack,
        isPlaying,
        playerState,
        toggleShuffle,
        currentAlbum
    } = usePlayer()

    const albumArtUrl = typeof album?.art === 'string' ? album.art : album?.art?.value || ''
    const { dominant, vibrant, muted, isLoading: colorsLoading } = useAlbumColors(albumArtUrl)

    const tracks = getAlbumTracks(album.id)
    const albumDuration = tracks.length > 0 ? calculateAlbumDuration(tracks) : '0m'
    const isCurrentAlbum = currentAlbum === albumId

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
        if (!playerState.isShuffled) {
            toggleShuffle()
        }
        setTimeout(() => {
            playAlbum(albumId)
        }, 50)
    }

    return (
        <>
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
                <div className="relative z-20 p-4 pt-28 sm:p-6 sm:pt-28 lg:p-8 lg:pt-24">
                    {/* Album info section */}
                    <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end lg:gap-8">
                        <AlbumArt
                            art={album.art}
                            size="xl"
                            className="h-40 w-40 flex-shrink-0 rounded-lg shadow-2xl sm:h-48 sm:w-48 lg:h-56 lg:w-56"
                            priority
                        />

                        <div className="flex-1 sm:pb-4">
                            <div className="text-sm text-white/70 mb-2 font-medium">Album</div>
                            <h1 className="mb-4 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:mb-6 lg:text-6xl">
                                {album.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-white/90 sm:text-base">
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
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
                        <Button
                            size="icon"
                            className="h-12 w-12 rounded-full bg-green-500 text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-400 sm:h-14 sm:w-14"
                            onClick={handlePlayAlbum}
                            title="Play album"
                        >
                            <Play className="ml-0.5 h-5 w-5 fill-current sm:ml-1 sm:h-6 sm:w-6" />
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
                className="px-4 pb-40 sm:px-6 md:pb-32 lg:px-8"
                style={{
                    background: colorsLoading
                        ? 'linear-gradient(to bottom, rgba(0,0,0,0.9), #0a0a0a)'
                        : `linear-gradient(to bottom, ${dominant}15, #0a0a0a)`
                }}
            >
                {tracks.length > 0 ? (
                    <>
                        {/* Table header */}
                        <div className="mb-2 hidden grid-cols-12 gap-4 border-b border-white/10 px-4 py-4 text-sm font-medium text-white/100 md:grid">
                            <div className="col-span-1 text-center">#</div>
                            <div className="col-span-5">Title</div>
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
                                        className={`grid grid-cols-[auto,minmax(0,1fr),auto] items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 group cursor-pointer md:grid-cols-12 md:gap-4 md:px-4 ${
                                            isCurrentTrack
                                                ? 'bg-white/10 text-green-400'
                                                : 'hover:bg-white/5 text-white'
                                        }`}
                                        onClick={() => handleTrackPlay(track)}
                                    >
                                        <div className="flex items-center justify-center text-sm text-center md:col-span-1">
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
                                        <div className="min-w-0 md:col-span-5">
                                            <div className={`text-sm font-medium ${isCurrentTrack ? 'text-green-400' : 'text-white'}`}>
                                                {track.title}
                                            </div>
                                            <div className="text-white/60 text-xs mt-1">{track.artist}</div>
                                        </div>
                                        <div className="hidden items-center justify-end text-right text-sm text-white/60 md:flex md:col-span-3">
                                            {formatPlayCount(track.plays)}
                                        </div>
                                        <div className="flex items-center justify-end text-right text-sm text-white/60 md:col-span-3">
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
        </>
    )
}
