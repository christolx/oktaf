import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/ui/AlbumArt'
import { usePlayer } from '@/contexts/PlayerContext'
import { playerIcons } from '@/data/DummyData.tsx'

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
    Bookmark
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
    } = usePlayer()

    // Helper function to format time
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    // Handle progress bar click
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = clickX / rect.width
        const newTime = percentage * duration
        seekTo(newTime)
    }

    // Handle volume bar click
    const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = clickX / rect.width
        const newVolume = Math.max(0, Math.min(100, percentage * 100))
        setVolume(newVolume)
    }

    if (!currentTrack) {
        return (
            <div className="h-20 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-center">
                <div className="text-white/60 text-sm">No track selected</div>
            </div>
        )
    }

    return (
        <div className="h-20 bg-[#0a0a0a] border-t border-white/10 flex items-center px-4">
            {/* Current Track Info */}
            <div className="flex items-center gap-3 w-80">
                <AlbumArt art={currentTrack.art} size="md" />
                <div className="min-w-0 flex-1">
                    <div className="text-white text-sm font-medium truncate">{currentTrack.title}</div>
                    <div className="text-white/60 text-xs truncate">{currentTrack.artist} • {currentTrack.album}</div>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleBookmark}
                        className={`h-8 w-8 transition-colors ${currentTrack.isBookmarked ? 'text-yellow-500 hover:text-yellow-400' : 'text-white/60 hover:text-white'}`}
                    >
                        <Bookmark className={`w-4 h-4 ${currentTrack.isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleLike}
                        className={`h-8 w-8 transition-colors ${currentTrack.isLiked ? 'text-green-500 hover:text-green-400' : 'text-white/60 hover:text-white'}`}
                    >
                        <Heart className={`w-4 h-4 ${currentTrack.isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                        <ThumbsDown className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Player Controls */}
            <div className="flex-1 flex flex-col items-center px-8">
                <div className="flex items-center gap-4 mb-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleShuffle}
                        className={`h-8 w-8 transition-colors ${playerState.isShuffled ? 'text-green-500 hover:text-green-400' : 'text-white/60 hover:text-white'}`}
                    >
                        <Shuffle className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={previousTrack}
                        className="text-white/60 hover:text-white h-8 w-8"
                    >
                        <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={togglePlayPause}
                        className="text-black bg-white hover:bg-white/90 h-10 w-10"
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5 fill-current" />
                        ) : (
                            <Play className="w-5 h-5 fill-current" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextTrack}
                        className="text-white/60 hover:text-white h-8 w-8"
                    >
                        <SkipForward className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleRepeat}
                        className={`h-8 w-8 transition-colors ${playerState.repeatMode !== 'off' ? 'text-green-500 hover:text-green-400' : 'text-white/60 hover:text-white'}`}
                    >
                        <Repeat className="w-4 h-4" />
                        {playerState.repeatMode === 'one' && (
                            <span className="absolute top-0 right-0 text-[8px] font-bold">1</span>
                        )}
                    </Button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2 w-full max-w-lg">
                    <span className="text-white/60 text-xs w-10 text-right">{formatTime(currentTime)}</span>
                    <div
                        className="flex-1 bg-white/20 h-1 rounded-full relative group cursor-pointer"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="bg-white h-1 rounded-full relative transition-all duration-100"
                            style={{ width: `${playerState.progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <span className="text-white/60 text-xs w-10">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume and Additional Controls */}
            <div className="flex items-center gap-2 w-80 justify-end">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <Monitor className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                        <Volume2 className="w-4 h-4" />
                    </Button>
                    <div
                        className="w-20 bg-white/20 h-1 rounded-full cursor-pointer group"
                        onClick={handleVolumeClick}
                    >
                        <div
                            className="bg-white h-1 rounded-full relative transition-all duration-100"
                            style={{ width: `${playerState.volume}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <List className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
