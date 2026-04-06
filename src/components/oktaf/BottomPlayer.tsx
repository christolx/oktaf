import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/oktaf/AlbumArt.tsx'
import { usePlayer } from '@/contexts/PlayerContext'
import { playerIcons } from '@/data/DummyData.tsx'
import { useEffect, useRef, useState } from 'react'

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

    const [isDraggingProgress, setIsDraggingProgress] = useState(false)
    const [isDraggingVolume, setIsDraggingVolume] = useState(false)
    const [tempProgress, setTempProgress] = useState(0)
    const [tempVolume, setTempVolume] = useState(playerState.volume)
    const [previousVolume, setPreviousVolume] = useState(playerState.volume)
    const [showVolumeSlider, setShowVolumeSlider] = useState(false)

    const progressRef = useRef<HTMLDivElement>(null)
    const volumeRef = useRef<HTMLDivElement>(null)

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const displayProgress = isDraggingProgress ? tempProgress : (duration > 0 ? (currentTime / duration) * 100 : 0)

    const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressRef.current) return
        setIsDraggingProgress(true)
        updateProgress(e)
    }

    const updateProgress = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
        if (!progressRef.current) return
        const rect = progressRef.current.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
        setTempProgress(percentage)
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressRef.current || isDraggingProgress) return
        const rect = progressRef.current.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = clickX / rect.width
        const newTime = percentage * duration
        seekTo(newTime)
    }

    const handleVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!volumeRef.current) return
        setIsDraggingVolume(true)
        updateVolume(e)
    }

    const updateVolume = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
        if (!volumeRef.current) return
        const rect = volumeRef.current.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
        setTempVolume(percentage)
    }

    const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!volumeRef.current || isDraggingVolume) return
        const rect = volumeRef.current.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
        setVolume(percentage)
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingProgress && progressRef.current) {
                updateProgress(e)
            }
            if (isDraggingVolume && volumeRef.current) {
                updateVolume(e)
            }
        }

        const handleMouseUp = () => {
            if (isDraggingProgress) {
                const newTime = (tempProgress / 100) * duration
                seekTo(newTime)
                setIsDraggingProgress(false)
            }
            if (isDraggingVolume) {
                setVolume(tempVolume)
                setIsDraggingVolume(false)
            }
        }

        if (isDraggingProgress || isDraggingVolume) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDraggingProgress, isDraggingVolume, tempProgress, tempVolume, duration, seekTo, setVolume])

    const getVolumeIcon = () => {
        const volume = isDraggingVolume ? tempVolume : playerState.volume
        if (volume === 0) return VolumeX
        if (volume < 30) return Volume1
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

    const baseShell = 'absolute inset-0 border border-white/20 bg-gradient-to-r from-black/70 via-black/60 to-black/70 shadow-2xl'
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
                <div className="fixed inset-x-0 bottom-0 z-50 hidden h-20 md:block">
                    <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-t from-black/50 via-black/30 to-black/20 border-t border-white/20 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                    </div>
                    <div className="relative flex h-full items-center justify-center backdrop-saturate-150">
                        <div className="text-white/60 text-sm">No track selected</div>
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
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-white/5 to-white/5" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent" />
                    <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    <div className="relative space-y-3 px-4 py-3 backdrop-saturate-150">
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
                                value={displayProgress}
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

            <div className="fixed bottom-0 left-0 right-0 z-50 hidden justify-center items-end pb-4 md:flex">
                <div className="w-[97%] h-24 relative">
                    <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-black/70 via-black/60 to-black/70 rounded-xl shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/5 to-white/5 rounded-xl" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl" />
                        <div className="absolute inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    </div>

                    <div className="relative flex items-center h-full px-6 backdrop-saturate-150 rounded-xl">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 w-fit max-w-[360px] z-10">
                            <div className="relative group flex-shrink-0">
                                <AlbumArt art={currentTrack.art} size="md" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-white hover:text-white hover:bg-white/20 rounded-full"
                                    >
                                        <Monitor className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-white text-sm font-medium truncate hover:text-green-400 cursor-pointer !transition-colors drop-shadow-sm">
                                    {currentTrack.title}
                                </div>
                                <div className="text-white/70 text-xs truncate hover:text-white cursor-pointer !transition-colors drop-shadow-sm">
                                    {currentTrack.artist}
                                </div>
                            </div>
                            <div className="flex items-center flex-shrink-0">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleBookmark}
                                    className={`h-8 w-8 !transition-all duration-200 hover:bg-transparent backdrop-blur-sm rounded-full ${
                                        currentTrack.isBookmarked
                                            ? 'text-green-500 hover:text-green-400 scale-110 drop-shadow-md'
                                            : 'text-white/60 hover:text-green-400 hover:scale-110'
                                    }`}
                                >
                                    <Bookmark className={`w-4 h-4 ${currentTrack.isBookmarked ? 'fill-current' : ''}`} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleLike}
                                    className={`h-8 w-8 !transition-all duration-200 hover:bg-transparent backdrop-blur-sm rounded-full ${
                                        currentTrack.isLiked
                                            ? 'text-green-500 hover:text-green-400 scale-110 drop-shadow-md'
                                            : 'text-white/60 hover:text-green-400 hover:scale-110'
                                    }`}
                                >
                                    <Heart className={`w-4 h-4 ${currentTrack.isLiked ? 'fill-current' : ''}`} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleDislike}
                                    className={`h-8 w-8 !transition-all duration-200 hover:bg-transparent hover:scale-110 backdrop-blur-sm rounded-full ${
                                        currentTrack.isDisliked
                                            ? 'text-red-500 hover:text-red-400 drop-shadow-md'
                                            : 'text-white/60 hover:text-green-400'
                                    }`}
                                    title="Dislike"
                                >
                                    <ThumbsDown className={`w-4 h-4 ${currentTrack.isDisliked ? 'fill-current' : ''}`} />
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center w-[500px] flex-shrink-0 mx-auto">
                            <div className="flex items-center gap-3 mb-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleShuffle}
                                    className={`h-8 w-8 !transition-all duration-200 hover:bg-transparent hover:scale-110 backdrop-blur-sm rounded-full ${
                                        playerState.isShuffled
                                            ? 'text-green-500 hover:text-green-400 drop-shadow-md'
                                            : 'text-white/60 hover:text-green-400'
                                    }`}
                                    title="Toggle Shuffle"
                                >
                                    <Shuffle className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={previousTrack}
                                    className="text-white/50 hover:scale-120 hover:bg-transparent hover:text-white !transition-all duration-200 h-10 w-10"
                                    title="Previous Track"
                                >
                                    <SkipBack className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={togglePlayPause}
                                    className="text-white hover:scale-120 hover:bg-transparent hover:text-white !transition-all duration-200 h-10 w-10"
                                    title={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? (
                                        <Pause className="w-5 h-5 fill-current" />
                                    ) : (
                                        <Play className="w-5 h-5 fill-current ml-0.5" />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextTrack}
                                    className="text-white/50 hover:scale-120 hover:bg-transparent hover:text-white !transition-all duration-200 h-10 w-10"
                                    title="Next Track"
                                >
                                    <SkipForward className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleRepeat}
                                    className={`h-8 w-8 transition-all duration-200 hover:bg-transparent hover:scale-110 relative backdrop-blur-sm rounded-full ${
                                        playerState.repeatMode !== 'off'
                                            ? 'text-green-500 hover:text-green-400 drop-shadow-md'
                                            : 'text-white/60 hover:text-green-400'
                                    }`}
                                    title={`Repeat: ${playerState.repeatMode}`}
                                >
                                    <Repeat className="w-4 h-4" />
                                    {playerState.repeatMode === 'one' && (
                                        <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-green-500 text-white rounded-full w-3 h-3 flex items-center justify-center shadow-lg">
                                            1
                                        </span>
                                    )}
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 w-full max-w-[450px]">
                                <span className="text-white/70 text-xs w-10 text-right font-league-spartan flex-shrink-0 drop-shadow-sm">
                                    {formatTime(currentTime)}
                                </span>
                                <div
                                    ref={progressRef}
                                    className="flex-1 bg-white/20 h-1 rounded-full relative group cursor-pointer backdrop-blur-sm shadow-inner"
                                    onClick={handleProgressClick}
                                    onMouseDown={handleProgressMouseDown}
                                >
                                    <div
                                        className="bg-white/90 hover:bg-green-500 active:bg-green-500 h-1 rounded-full relative !transition-all duration-100 shadow-sm"
                                        style={{ width: `${displayProgress}%` }}
                                    >
                                        <div
                                            className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white/90 active:bg-green-500 rounded-full transition-opacity shadow-lg backdrop-blur-sm ${
                                                isDraggingProgress || progressRef.current?.matches(':hover')
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            }`}
                                        />
                                    </div>
                                </div>
                                <span className="text-white/70 text-xs w-10 font-league-spartan flex-shrink-0 drop-shadow-sm">
                                    {formatTime(duration)}
                                </span>
                            </div>
                        </div>

                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 w-[280px] min-w-[200px] justify-end z-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/60 hover:text-white hover:bg-transparent hover:scale-110 !transition-all duration-200 h-8 w-8 backdrop-blur-sm rounded-full"
                                title="Queue"
                            >
                                <List className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/60 hover:text-white hover:bg-transparent hover:scale-110 !transition-all duration-200 h-8 w-8 backdrop-blur-sm rounded-full"
                                title="Connect to device"
                            >
                                <Monitor className="w-4 h-4" />
                            </Button>
                            <div
                                className="flex items-center gap-2 relative"
                                onMouseEnter={() => setShowVolumeSlider(true)}
                                onMouseLeave={() => setShowVolumeSlider(false)}
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleMute}
                                    className="text-white/60 hover:bg-transparent hover:text-green-500 hover:scale-110 !transition-all duration-200 h-8 w-8 backdrop-blur-sm rounded-full"
                                    title={`Volume: ${Math.round(playerState.volume)}%`}
                                >
                                    <VolumeIcon className="w-4 h-4" />
                                </Button>
                                <div
                                    ref={volumeRef}
                                    className={`w-20 bg-white/20 h-1 rounded-full cursor-pointer group !transition-all duration-200 backdrop-blur-sm shadow-inner ${
                                        showVolumeSlider ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                                    }`}
                                    onClick={handleVolumeClick}
                                    onMouseDown={handleVolumeMouseDown}
                                >
                                    <div
                                        className="bg-white/90 hover:bg-green-500 active:bg-green-500 h-1 rounded-full relative transition-all duration-100 shadow-sm"
                                        style={{ width: `${isDraggingVolume ? tempVolume : playerState.volume}%` }}
                                    >
                                        <div
                                            className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white active:bg-green-500 rounded-full transition-opacity shadow-lg backdrop-blur-sm ${
                                                isDraggingVolume || showVolumeSlider
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/60 hover:text-white hover:bg-transparent hover:scale-110 !transition-all duration-200 h-8 w-8 backdrop-blur-sm rounded-full"
                                title="More options"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
