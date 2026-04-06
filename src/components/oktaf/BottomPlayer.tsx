import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/oktaf/AlbumArt.tsx'
import { usePlayer } from '@/contexts/PlayerContext'
import { playerIcons } from '@/data/DummyData.tsx'
import { useEffect, useState } from 'react'

const {
    Heart,
    SkipBack,
    Play,
    Pause,
    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    Monitor,
    List,
    MoreHorizontal,
    ThumbsDown,
    Bookmark,
    VolumeX,
    Volume1,
} = playerIcons;

export function BottomPlayer() {
    const {
        currentTrack,
        playerState,
        isPlaying,
        currentTime,
        duration,
        togglePlayPause,
        nextTrack,
        previousTrack,
        seekTo,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        toggleLike,
        toggleBookmark,
        toggleDislike,
    } = usePlayer()

    const [previousVolume, setPreviousVolume] = useState(playerState.volume)

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0

    const getVolumeIcon = () => {
        if (playerState.volume === 0) return VolumeX
        if (playerState.volume < 30) return Volume1
        return Volume2
    }

    const VolumeIcon = getVolumeIcon()

    const toggleMute = () => {
        if (playerState.volume > 0) {
            setPreviousVolume(playerState.volume)
            setVolume(0)
        } else {
            setVolume(previousVolume > 0 ? previousVolume : 50)
        }
    }

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement) return

            switch (e.code) {
                case 'Space':
                    e.preventDefault()
                    togglePlayPause()
                    break
                case 'ArrowRight':
                    if (e.shiftKey) {
                        nextTrack()
                    } else {
                        seekTo(Math.min(duration, currentTime + 10))
                    }
                    break
                case 'ArrowLeft':
                    if (e.shiftKey) {
                        previousTrack()
                    } else {
                        seekTo(Math.max(0, currentTime - 10))
                    }
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    setVolume(Math.min(100, playerState.volume + 10))
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    setVolume(Math.max(0, playerState.volume - 10))
                    break
            }
        }

        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [togglePlayPause, nextTrack, previousTrack, seekTo, currentTime, duration, setVolume, playerState.volume])

    const baseShell = 'absolute inset-0 border border-white/10 bg-gradient-to-r from-black/80 via-black/70 to-black/80 shadow-2xl'
    const rangeClassName = 'h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-green-500'

    if (!currentTrack) {
        return (
            <>
                <div className="fixed left-3 right-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-50 md:hidden">
                    <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl">
                        <div className={`${baseShell} rounded-2xl`} />
                        <div className="relative flex h-16 items-center justify-center px-4 text-sm text-white/60">
                            No track selected
                        </div>
                    </div>
                </div>
                <div className="fixed inset-x-0 bottom-0 z-50 hidden h-24 items-end justify-center pb-4 md:flex">
                    <div className="relative h-24 w-[97%] overflow-hidden rounded-xl backdrop-blur-xl">
                        <div className={`${baseShell} rounded-xl`} />
                        <div className="relative flex h-full items-center justify-center px-6 text-sm text-white/60">
                            No track selected
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="fixed left-3 right-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-50 md:hidden">
                <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl">
                    <div className={`${baseShell} rounded-2xl`} />
                    <div className="relative space-y-3 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <AlbumArt art={currentTrack.art} size="sm" className="h-12 w-12 flex-shrink-0 rounded-lg" />
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-medium text-white">{currentTrack.title}</div>
                                <div className="truncate text-xs text-white/70">{currentTrack.artist}</div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={previousTrack}
                                className="h-10 w-10 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                                title="Previous Track"
                            >
                                <SkipBack className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={togglePlayPause}
                                className="h-11 w-11 rounded-full bg-white text-black hover:bg-white/90"
                                title={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={nextTrack}
                                className="h-10 w-10 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                                title="Next Track"
                            >
                                <SkipForward className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={0.1}
                                value={progressValue}
                                onChange={(e) => seekTo((Number(e.target.value) / 100) * duration)}
                                className={rangeClassName}
                                aria-label="Track progress"
                            />
                            <div className="flex items-center justify-between text-[11px] text-white/60">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-50 hidden h-28 items-end justify-center pb-4 md:flex">
                <div className="relative h-24 w-[97%] overflow-hidden rounded-xl backdrop-blur-xl">
                    <div className={`${baseShell} rounded-xl`} />
                    <div className="relative flex h-full items-center gap-6 px-6 backdrop-saturate-150">
                        <div className="flex min-w-0 flex-1 items-center gap-3 lg:max-w-sm">
                            <AlbumArt art={currentTrack.art} size="md" />
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-medium text-white transition-colors hover:text-green-400">
                                    {currentTrack.title}
                                </div>
                                <div className="truncate text-xs text-white/70 transition-colors hover:text-white">
                                    {currentTrack.artist}
                                </div>
                            </div>
                            <div className="hidden items-center lg:flex">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleBookmark}
                                    className={`h-8 w-8 rounded-full !transition-all duration-200 hover:bg-transparent ${
                                        currentTrack.isBookmarked
                                            ? 'scale-110 text-green-500 hover:text-green-400'
                                            : 'text-white/60 hover:text-green-400'
                                    }`}
                                >
                                    <Bookmark className={`h-4 w-4 ${currentTrack.isBookmarked ? 'fill-current' : ''}`} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleLike}
                                    className={`h-8 w-8 rounded-full !transition-all duration-200 hover:bg-transparent ${
                                        currentTrack.isLiked
                                            ? 'scale-110 text-green-500 hover:text-green-400'
                                            : 'text-white/60 hover:text-green-400'
                                    }`}
                                >
                                    <Heart className={`h-4 w-4 ${currentTrack.isLiked ? 'fill-current' : ''}`} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleDislike}
                                    className={`h-8 w-8 rounded-full !transition-all duration-200 hover:bg-transparent ${
                                        currentTrack.isDisliked
                                            ? 'text-red-500 hover:text-red-400'
                                            : 'text-white/60 hover:text-green-400'
                                    }`}
                                    title="Dislike"
                                >
                                    <ThumbsDown className={`h-4 w-4 ${currentTrack.isDisliked ? 'fill-current' : ''}`} />
                                </Button>
                            </div>
                        </div>

                        <div className="flex w-full max-w-xl flex-1 flex-col items-center justify-center">
                            <div className="mb-2 flex items-center gap-2 lg:gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleShuffle}
                                    className={`h-8 w-8 rounded-full transition-all duration-200 hover:bg-transparent ${
                                        playerState.isShuffled
                                            ? 'text-green-500 hover:text-green-400'
                                            : 'text-white/60 hover:text-green-400'
                                    }`}
                                    title="Toggle Shuffle"
                                >
                                    <Shuffle className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={previousTrack}
                                    className="h-10 w-10 text-white/70 transition-all duration-200 hover:bg-transparent hover:text-white"
                                    title="Previous Track"
                                >
                                    <SkipBack className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={togglePlayPause}
                                    className="h-10 w-10 text-white transition-all duration-200 hover:bg-transparent hover:text-white"
                                    title={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? (
                                        <Pause className="h-5 w-5 fill-current" />
                                    ) : (
                                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextTrack}
                                    className="h-10 w-10 text-white/70 transition-all duration-200 hover:bg-transparent hover:text-white"
                                    title="Next Track"
                                >
                                    <SkipForward className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleRepeat}
                                    className={`relative h-8 w-8 rounded-full transition-all duration-200 hover:bg-transparent ${
                                        playerState.repeatMode !== 'off'
                                            ? 'text-green-500 hover:text-green-400'
                                            : 'text-white/60 hover:text-green-400'
                                    }`}
                                    title={`Repeat: ${playerState.repeatMode}`}
                                >
                                    <Repeat className="h-4 w-4" />
                                    {playerState.repeatMode === 'one' && (
                                        <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500 text-[8px] font-bold text-white">
                                            1
                                        </span>
                                    )}
                                </Button>
                            </div>

                            <div className="flex w-full items-center gap-3">
                                <span className="w-10 flex-shrink-0 text-right font-league-spartan text-xs text-white/70">
                                    {formatTime(currentTime)}
                                </span>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={0.1}
                                    value={progressValue}
                                    onChange={(e) => seekTo((Number(e.target.value) / 100) * duration)}
                                    className={rangeClassName}
                                    aria-label="Track progress"
                                />
                                <span className="w-10 flex-shrink-0 font-league-spartan text-xs text-white/70">
                                    {formatTime(duration)}
                                </span>
                            </div>
                        </div>

                        <div className="hidden flex-1 items-center justify-end gap-2 xl:flex">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-white/60 transition-all duration-200 hover:bg-transparent hover:text-white"
                                title="Queue"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-white/60 transition-all duration-200 hover:bg-transparent hover:text-white"
                                title="Connect to device"
                            >
                                <Monitor className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMute}
                                className="h-8 w-8 rounded-full text-white/60 transition-all duration-200 hover:bg-transparent hover:text-green-500"
                                title={`Volume: ${Math.round(playerState.volume)}%`}
                            >
                                <VolumeIcon className="h-4 w-4" />
                            </Button>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                value={playerState.volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="w-24 cursor-pointer accent-green-500"
                                aria-label="Volume"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-white/60 transition-all duration-200 hover:bg-transparent hover:text-white"
                                title="More options"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
