import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/ui/AlbumArt'
import { usePlayer } from '@/contexts/PlayerContext'
import { playerIcons } from '@/data/DummyData.tsx'
import { useState, useRef, useEffect } from 'react'

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

    // Helper function to format time
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    // Calculate progress percentage
    const displayProgress = isDraggingProgress ? tempProgress : (duration > 0 ? (currentTime / duration) * 100 : 0)

    // Handle progress bar interactions
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

    // Handle volume bar interactions
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

    // Mouse move and up handlers
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

    // Volume icon logic
    const getVolumeIcon = () => {
        const volume = isDraggingVolume ? tempVolume : playerState.volume
        if (volume === 0) return VolumeX
        if (volume < 30) return Volume1
        return Volume2
    }

    const VolumeIcon = getVolumeIcon()

    // Toggle mute
    const toggleMute = () => {
        if (playerState.volume > 0) {
            setPreviousVolume(playerState.volume)
            setVolume(0)
        } else {
            setVolume(previousVolume > 0 ? previousVolume : 50)
        }
    }

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement) return // Don't trigger when typing in inputs

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

    if (!currentTrack) {
        return (
            <div className="fixed bottom-0 left-0 right-0 h-20 z-50">
                {/* Glassmorphism background */}
                <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-t from-black/50 via-black/30 to-black/20 border-t border-white/20 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                </div>

                {/* Content */}
                <div className="relative flex items-center justify-center h-full backdrop-saturate-150">
                    <div className="text-white/60 text-sm">No track selected</div>
                </div>
            </div>
        )
    }

    // Replace the return statement in your BottomPlayer component with this enhanced version:

    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 z-50 flex justify-center items-end pb-4">
            {/* Floating container with glassmorphism */}
            <div className="w-[97%] h-24 relative">
                {/* Enhanced glassmorphism background with rounded corners */}
                <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-black/70 via-black/60 to-black/70 rounded-xl shadow-2xl">
                    {/* Additional glass layers for enhanced depth */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/5 to-white/5 rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl" />
                    {/* Subtle inner glow */}
                    <div className="absolute inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>

                {/* Main content layer */}
                <div className="relative flex items-center h-full px-6 backdrop-saturate-150 rounded-xl">
                    {/* Left Section - Current Track Info */}
                    <div className="flex items-center gap-3 w-[280px] min-w-[200px] flex-shrink-0">
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
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleBookmark}
                                className={`h-8 w-8 !transition-all duration-200 hover:bg-transparent backdrop-blur-sm rounded-full ${
                                    currentTrack.isBookmarked
                                        ? 'text-green-500 hover:text-green-400 scale-110 drop-shadow-md'
                                        : 'text-white/60 hover:text-white hover:scale-110'
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
                                        : 'text-white/60 hover:text-white hover:scale-110'
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
                                        : 'text-white/60 hover:text-white'
                                }`}
                                title="Dislike"
                            >
                                <ThumbsDown className={`w-4 h-4 ${currentTrack.isDisliked ? 'fill-current' : ''}`} />
                            </Button>
                        </div>
                    </div>

                    {/* Center Section - Player Controls */}
                    <div className="flex-1 flex flex-col items-center justify-center max-w-[500px] mx-auto">
                        {/* Control Buttons */}
                        <div className="flex items-center gap-3 mb-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleShuffle}
                                className={`h-8 w-8 !transition-all duration-200 hover:bg-transparent hover:scale-110 backdrop-blur-sm rounded-full ${
                                    playerState.isShuffled
                                        ? 'text-green-500 hover:text-green-400 drop-shadow-md'
                                        : 'text-white/60 hover:text-white'
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
                                title={isPlaying ? "Pause" : "Play"}
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
                                        : 'text-white/60 hover:text-white'
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

                        {/* Progress Bar */}
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
                                    className="bg-white/90 h-1 rounded-full relative !transition-all duration-100 shadow-sm"
                                    style={{ width: `${displayProgress}%` }}
                                >
                                    <div
                                        className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-opacity shadow-lg backdrop-blur-sm ${
                                            isDraggingProgress || progressRef.current?.matches(':hover')
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }`}
                                    ></div>
                                </div>
                            </div>
                            <span className="text-white/70 text-xs w-10 font-league-spartan flex-shrink-0 drop-shadow-sm">
                            {formatTime(duration)}
                        </span>
                        </div>
                    </div>

                    {/* Right Section - Volume and Additional Controls */}
                    <div className="flex items-center gap-2 w-[280px] min-w-[200px] justify-end flex-shrink-0">
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
                                className="text-white/60 hover:text-white hover:bg-transparent hover:scale-110 !transition-all duration-200 h-8 w-8 backdrop-blur-sm rounded-full"
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
                                    className="bg-white/90 h-1 rounded-full relative transition-all duration-100 shadow-sm"
                                    style={{ width: `${isDraggingVolume ? tempVolume : playerState.volume}%` }}
                                >
                                    <div
                                        className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full transition-opacity shadow-lg backdrop-blur-sm ${
                                            isDraggingVolume || showVolumeSlider
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }`}
                                    ></div>
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
    )
}