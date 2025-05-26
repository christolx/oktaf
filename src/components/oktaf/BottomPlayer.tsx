import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/ui/AlbumArt'
import { currentTrack, initialPlayerState, playerIcons } from '@/data/DummyData.tsx'

const {
    Heart,
    SkipBack,
    Play,
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
    const track = currentTrack;
    const playerState = initialPlayerState;

    return (
        <div className="h-20 bg-[#0a0a0a] border-t border-white/10 flex items-center px-4">
            {/* Current Track Info */}
            <div className="flex items-center gap-3 w-80">
                <AlbumArt art={track.art} size="md" />
                <div className="min-w-0 flex-1">
                    <div className="text-white text-sm font-medium truncate">{track.title}</div>
                    <div className="text-white/60 text-xs truncate">{track.artist} • {track.album}</div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className={`h-8 w-8 ${track.isBookmarked ? 'text-yellow-500 hover:text-yellow-400' : 'text-white/60 hover:text-white'}`}>
                        <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className={`h-8 w-8 ${track.isLiked ? 'text-green-500 hover:text-green-400' : 'text-white/60 hover:text-white'}`}>
                        <Heart className={`w-4 h-4 ${track.isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                        <ThumbsDown className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Player Controls */}
            <div className="flex-1 flex flex-col items-center px-8">
                <div className="flex items-center gap-4 mb-2">
                    <Button variant="ghost" size="icon" className={`h-8 w-8 ${playerState.isShuffled ? 'text-green-500 hover:text-green-400' : 'text-white/60 hover:text-white'}`}>
                        <Shuffle className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                        <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-black bg-white hover:bg-white/90 h-10 w-10">
                        <Play className="w-5 h-5 fill-current" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                        <SkipForward className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className={`h-8 w-8 ${playerState.repeatMode !== 'off' ? 'text-green-500 hover:text-green-400' : 'text-white/60 hover:text-white'}`}>
                        <Repeat className="w-4 h-4" />
                    </Button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2 w-full max-w-lg">
                    <span className="text-white/60 text-xs w-10 text-right">{track.currentTime}</span>
                    <div className="flex-1 bg-white/20 h-1 rounded-full relative group cursor-pointer">
                        <div className={`bg-white h-1 rounded-full relative`} style={{ width: `${playerState.progress}%` }}>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <span className="text-white/60 text-xs w-10">{track.duration}</span>
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
                    <div className="w-20 bg-white/20 h-1 rounded-full">
                        <div className="bg-white h-1 rounded-full" style={{ width: `${playerState.volume}%` }}></div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <List className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
