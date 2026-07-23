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
            <div className="relative min-h-[500px] overflow-hidden">
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
                <div className="relative z-20 px-4 pb-6 pt-32 sm:px-6 lg:p-8 lg:pt-24">
                    {/* Album info section */}
                    <div className="mb-6 flex flex-col items-center gap-5 sm:items-start md:flex-row md:items-end md:gap-8 lg:mb-8">
                        <AlbumArt
                            art={album.art}
                            size="xl"
                            className="size-44 flex-shrink-0 rounded-lg shadow-2xl sm:size-52 lg:size-56"
                            priority
                        />

                        <div className="min-w-0 flex-1 text-center sm:text-left md:pb-4">
                            <div className="mb-2 text-sm font-medium text-white/70">Album</div>
                            <h1 className="mb-3 break-words text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl lg:mb-6 lg:text-6xl">
                                {album.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/90 sm:justify-start">
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
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-4 lg:gap-6">
                        <Button
                            size="icon"
                            className="size-14 rounded-full bg-green-500 text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-400"
                            onClick={handlePlayAlbum}
                            title="Play album"
                        >
                            <Play className="w-6 h-6 fill-current ml-1" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleShufflePlay}
                            className={`size-11 transition-all duration-200 hover:scale-110 ${
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
                            className="size-11 text-white/70 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:text-white"
                            title="Like album"
                        >
                            <Heart className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-11 text-white/70 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:text-white"
                            title="Dislike album"
                        >
                            <ThumbsDown className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-11 text-white/70 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:text-white"
                            title="Download album"
                        >
                            <Download className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-11 text-white/70 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:text-white"
                            title="More options"
                        >
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Track listing with dynamic background continuation */}
            <div
                className="px-3 pb-40 sm:px-6 lg:px-8 lg:pb-28"
                style={{
                    background: colorsLoading
                        ? 'linear-gradient(to bottom, rgba(0,0,0,0.9), #0a0a0a)'
                        : `linear-gradient(to bottom, ${dominant}15, #0a0a0a)`
                }}
            >
                {tracks.length > 0 ? (
                    <>
                        {/* Table header */}
                        <div className="mb-2 grid grid-cols-12 gap-2 border-b border-white/10 px-2 py-4 text-sm font-medium text-white sm:gap-4 sm:px-4">
                            <div className="col-span-1 text-center">#</div>
                            <div className="col-span-8 md:col-span-5">Title</div>
                            <div className="col-span-3 hidden text-right md:block">Plays</div>
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
                                        className={`group grid min-h-16 cursor-pointer grid-cols-12 gap-2 rounded-lg px-2 py-3 transition-all duration-200 sm:gap-4 sm:px-4 ${
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
                                        <div className="col-span-8 min-w-0 md:col-span-5">
                                            <div className={`truncate text-sm font-medium ${isCurrentTrack ? 'text-green-400' : 'text-white'}`}>
                                                {track.title}
                                            </div>
                                            <div className="mt-1 truncate text-xs text-white/60">{track.artist}</div>
                                        </div>
                                        <div className="col-span-3 hidden items-center justify-end text-right text-sm text-white/60 md:flex">
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
        </>
    )
}
