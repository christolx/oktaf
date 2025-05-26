import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import type {ReactNode} from 'react'
import { currentTrack as initialTrack, initialPlayerState, type CurrentTrack, type PlayerState } from '@/data/DummyData'

interface PlayerContextType {
    currentTrack: CurrentTrack | null
    playerState: PlayerState
    isPlaying: boolean
    currentTime: number
    duration: number

    // Actions
    playTrack: (track: CurrentTrack) => void
    togglePlayPause: () => void
    nextTrack: () => void
    previousTrack: () => void
    seekTo: (time: number) => void
    setVolume: (volume: number) => void
    toggleShuffle: () => void
    toggleRepeat: () => void
    toggleLike: () => void
    toggleDislike: () => void
    toggleBookmark: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function usePlayer() {
    const context = useContext(PlayerContext)
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider')
    }
    return context
}

interface PlayerProviderProps {
    children: ReactNode
}

export function PlayerProvider({ children }: PlayerProviderProps) {
    const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(initialTrack)
    const [playerState, setPlayerState] = useState<PlayerState>(initialPlayerState)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(248) // 4:08 in seconds

    // Convert time to seconds for easier calculation
    const timeToSeconds = (timeString: string): number => {
        const [minutes, seconds] = timeString.split(':').map(Number)
        return minutes * 60 + seconds
    }

    // Convert seconds to time string
    const secondsToTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    // Initialize current time from track data
    useState(() => {
        if (currentTrack?.currentTime) {
            setCurrentTime(timeToSeconds(currentTrack.currentTime))
        }
        if (currentTrack?.duration) {
            setDuration(timeToSeconds(currentTrack.duration))
        }
    })

    const playTrack = useCallback((track: CurrentTrack) => {
        setCurrentTrack(track)
        setPlayerState(prev => ({ ...prev, isPlaying: true }))
        setCurrentTime(0)
        setDuration(timeToSeconds(track.duration))
    }, [])

    const togglePlayPause = useCallback(() => {
        setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
    }, [])

    const nextTrack = useCallback(() => {
        // TODO: Implement next track logic based on current playlist/album
        console.log('Next track')
    }, [])

    const previousTrack = useCallback(() => {
        // TODO: Implement previous track logic
        console.log('Previous track')
    }, [])

    const seekTo = useCallback((time: number) => {
        setCurrentTime(time)
        // Update current track's currentTime display
        if (currentTrack) {
            setCurrentTrack(prev => prev ? {
                ...prev,
                currentTime: secondsToTime(time)
            } : null)
        }
    }, [currentTrack])

    const setVolume = useCallback((volume: number) => {
        setPlayerState(prev => ({ ...prev, volume }))
    }, [])

    const toggleShuffle = useCallback(() => {
        setPlayerState(prev => ({ ...prev, isShuffled: !prev.isShuffled }))
    }, [])

    const toggleRepeat = useCallback(() => {
        setPlayerState(prev => {
            const modes: PlayerState['repeatMode'][] = ['off', 'all', 'one']
            const currentIndex = modes.indexOf(prev.repeatMode)
            const nextMode = modes[(currentIndex + 1) % modes.length]
            return { ...prev, repeatMode: nextMode }
        })
    }, [])

    const toggleLike = useCallback(() => {
        if (currentTrack) {
            setCurrentTrack(prev => prev ? { ...prev, isLiked: !prev.isLiked } : null)
        }
    }, [currentTrack])

    const toggleDislike = useCallback(() => {
        if (currentTrack) {
            setCurrentTrack(prev => prev ? { ...prev, isDisliked: !prev.isDisliked } : null)
        }
    }, [currentTrack])

    const toggleBookmark = useCallback(() => {
        if (currentTrack) {
            setCurrentTrack(prev => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null)
        }
    }, [currentTrack])

    // Calculate progress percentage
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0

    // Update player state progress
    useState(() => {
        setPlayerState(prev => ({ ...prev, progress }))
    })

    // Simulate time progression when playing
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (playerState.isPlaying && currentTime < duration) {
            intervalRef.current = setInterval(() => {
                setCurrentTime(prev => {
                    const newTime = prev + 1
                    if (currentTrack) {
                        setCurrentTrack(track => track ? {
                            ...track,
                            currentTime: secondsToTime(newTime)
                        } : null)
                    }
                    return newTime >= duration ? duration : newTime
                })
            }, 1000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [playerState.isPlaying, currentTime, duration])

    const value: PlayerContextType = {
        currentTrack,
        playerState: { ...playerState, progress },
        isPlaying: playerState.isPlaying,
        currentTime,
        duration,

        playTrack,
        togglePlayPause,
        nextTrack,
        previousTrack,
        seekTo,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        toggleLike,
        toggleDislike,
        toggleBookmark,
    }

    return (
        <PlayerContext.Provider value={value}>
            {children}
        </PlayerContext.Provider>
    )
}
