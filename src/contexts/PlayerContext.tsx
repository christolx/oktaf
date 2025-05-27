// PlayerContext.tsx - Updated version
import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import type {ReactNode} from 'react'
import {
    currentTrack as initialTrack,
    initialPlayerState,
    updateTrackInteraction,
    getAlbumTracks,
    albumsForYou,
    AlternativeRockAlbums,
    GothicRockAlbums,
    PopArtAlbums,
    nostalgiaAlbums,
    trendingAlbums,
    type CurrentTrack,
    type PlayerState,
    type Track
} from '@/data/DummyData'

const getAllAlbums = () => [
    ...albumsForYou,
    ...nostalgiaAlbums,
    ...trendingAlbums,
    ...PopArtAlbums,
    ...AlternativeRockAlbums,
    ...GothicRockAlbums
]

const getAlbumData = (albumId: string | null) => {
    if (!albumId) return null
    return getAllAlbums().find(album => album.id === albumId)
}

interface PlayerContextType {
    currentTrack: CurrentTrack | null
    playerState: PlayerState
    isPlaying: boolean
    currentTime: number
    duration: number
    currentAlbum: string | null
    currentPlaylist: Track[] // The original, ordered playlist
    shuffledPlaylist: Track[] // The shuffled playlist

    // Actions
    playTrack: (track: CurrentTrack, albumId?: string) => void
    playAlbum: (albumId: string, startTrackId?: string) => void
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
    const [duration, setDuration] = useState(248) // Default duration, will be updated by currentTrack
    const [currentAlbum, setCurrentAlbum] = useState<string | null>(null)
    const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>([]) // The original, ordered list of tracks for the current album
    const [shuffledPlaylist, setShuffledPlaylist] = useState<Track[]>([]) // The shuffled version of currentPlaylist

    // Helper functions
    const timeToSeconds = (timeString: string): number => {
        const [minutes, seconds] = timeString.split(':').map(Number)
        return minutes * 60 + seconds
    }

    const secondsToTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    // Shuffle array function
    const shuffleArray = (array: Track[]): Track[] => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }

    // Convert Track to CurrentTrack
    const trackToCurrentTrack = (track: Track, albumData?: any): CurrentTrack => {
        return {
            id: track.id,
            title: track.title,
            artist: track.artist,
            album: albumData?.title || '',
            art: albumData?.art || {
                type: 'gradient',
                value: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
                alt: 'Default gradient background'
            },
            duration: track.duration,
            currentTime: '0:00', // Always start at 0:00 when setting a new current track
            isLiked: track.isLiked || false,
            isDisliked: track.isDisliked || false,
            isBookmarked: track.isBookmarked || false,
        }
    }

    // Get current playlist based on shuffle state
    const getCurrentPlaylist = useCallback(() => {
        return playerState.isShuffled ? shuffledPlaylist : currentPlaylist
    }, [playerState.isShuffled, shuffledPlaylist, currentPlaylist])

    // Find current track index in playlist
    // This is crucial for next/previous track logic
    const getCurrentTrackIndex = useCallback(() => {
        const playlist = getCurrentPlaylist()
        return playlist.findIndex(track => track.id === currentTrack?.id)
    }, [currentTrack, getCurrentPlaylist])

    // Initialize current time and duration from track data when currentTrack changes
    useEffect(() => {
        if (currentTrack) {
            setCurrentTime(timeToSeconds(currentTrack.currentTime)) // Use currentTrack.currentTime if available, otherwise 0
            setDuration(timeToSeconds(currentTrack.duration))
        } else {
            setCurrentTime(0)
            setDuration(0)
        }
    }, [currentTrack])

    // Play a specific album
    const playAlbum = useCallback((albumId: string, startTrackId?: string) => {
        const tracks = getAlbumTracks(albumId) // This is the original, ordered list of tracks for the album
        console.log(`🎵 Loading album ${albumId}:`, tracks.length, 'tracks')
        console.log('📋 Original track list:', tracks.map(t => ({ id: t.id, title: t.title, number: t.number })))

        if (tracks.length === 0) {
            console.warn(`Album ${albumId} has no tracks. Cannot play.`)
            setCurrentTrack(null)
            setPlayerState(prev => ({ ...prev, isPlaying: false }))
            setCurrentPlaylist([])
            setShuffledPlaylist([])
            return
        }

        const albumData = getAlbumData(albumId)

        // Determine the track that should start playing. Default to the first track.
        const initialTrackToPlay = startTrackId
            ? tracks.find(t => t.id === startTrackId) || tracks[0]
            : tracks[0]

        // Always set the currentPlaylist to the ordered tracks
        setCurrentPlaylist(tracks)

        let newShuffledPlaylist: Track[]
        // If shuffle is ON when the album starts playing, ensure the starting track is first in the shuffled list
        if (playerState.isShuffled) {
            const otherTracks = tracks.filter(track => track.id !== initialTrackToPlay.id)
            const shuffledOthers = shuffleArray(otherTracks)
            newShuffledPlaylist = [initialTrackToPlay, ...shuffledOthers]
            console.log('🔀 Shuffled playlist (initial, with starting track first):', newShuffledPlaylist.map(t => ({ id: t.id, title: t.title, number: t.number })))
        } else {
            // If shuffle is OFF, create a random shuffled list for future use (if shuffle is toggled on later)
            newShuffledPlaylist = shuffleArray(tracks)
            console.log('🔀 Shuffled playlist (initial, random):', newShuffledPlaylist.map(t => ({ id: t.id, title: t.title, number: t.number })))
        }
        setShuffledPlaylist(newShuffledPlaylist)

        // Set the current album context
        setCurrentAlbum(albumId)

        // Set the current track to the determined initial track
        const currentTrackData = trackToCurrentTrack(initialTrackToPlay, albumData)
        setCurrentTrack(currentTrackData)

        // Start playing
        setPlayerState(prev => ({ ...prev, isPlaying: true }))
        setCurrentTime(0) // Reset current time for new track
        setDuration(timeToSeconds(initialTrackToPlay.duration)) // Set duration for new track
    }, [playerState.isShuffled]) // DEPENDENCY: playerState.isShuffled is crucial here

    // Play a single track (can be part of album context)
    const playTrack = useCallback((track: CurrentTrack, albumId?: string) => {
        // If an albumId is provided and it's different from the currently loaded album,
        // or if no album is currently loaded, load the album first.
        if (albumId && albumId !== currentAlbum) {
            playAlbum(albumId, track.id) // This will handle setting up playlists and current track
        } else {
            // If the album is already loaded, or no albumId is given (e.g., playing a standalone track)
            // just update the current track.
            setCurrentTrack(track)
            setPlayerState(prev => ({ ...prev, isPlaying: true }))
            setCurrentTime(0)
            setDuration(timeToSeconds(track.duration))
        }
    }, [currentAlbum, playAlbum]) // DEPENDENCY: playAlbum is used here

    const togglePlayPause = useCallback(() => {
        setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
    }, [])

    const nextTrack = useCallback(() => {
        const playlist = getCurrentPlaylist()
        const currentIndex = getCurrentTrackIndex()

        console.log('⏭️ Next track called:', {
            playlistLength: playlist.length,
            currentIndex,
            currentTrackId: currentTrack?.id,
            isShuffled: playerState.isShuffled,
            repeatMode: playerState.repeatMode
        })

        if (playlist.length === 0 || currentIndex === -1) {
            console.log('❌ Cannot advance: empty playlist or current track not found in active playlist.')
            setPlayerState(prev => ({ ...prev, isPlaying: false })) // Stop playback if no next track
            return
        }

        const albumData = getAlbumData(currentAlbum)

        let nextIndex: number

        if (playerState.repeatMode === 'one') {
            nextIndex = currentIndex
        } else if (currentIndex === playlist.length - 1) {
            if (playerState.repeatMode === 'all') {
                nextIndex = 0
            } else {
                console.log('🛑 End of playlist reached, stopping playback.')
                setPlayerState(prev => ({ ...prev, isPlaying: false }))
                return
            }
        } else {
            nextIndex = currentIndex + 1
        }

        console.log('📍 Moving to index:', nextIndex+1 , 'of', playlist.length) // 1-based index. (1-playlist.length)

        const nextTrackData = playlist[nextIndex]
        if (nextTrackData) {
            console.log('🎵 Next track:', nextTrackData.title)
            const currentTrackData = trackToCurrentTrack(nextTrackData, albumData)
            setCurrentTrack(currentTrackData)
            setCurrentTime(0)
            setDuration(timeToSeconds(nextTrackData.duration))
        } else {
            console.warn('❌ Next track data is undefined at calculated index:', nextIndex, 'This should not happen if playlist.length > 0.')
            setPlayerState(prev => ({ ...prev, isPlaying: false }))
        }
    }, [getCurrentPlaylist, getCurrentTrackIndex, playerState.repeatMode, currentAlbum, currentTrack, trackToCurrentTrack]) // Added trackToCurrentTrack as dependency

    const previousTrack = useCallback(() => {
        const playlist = getCurrentPlaylist()
        const currentIndex = getCurrentTrackIndex()

        if (playlist.length === 0 || currentIndex === -1) {
            console.log('❌ Cannot go back: empty playlist or current track not found in active playlist.')
            return
        }

        // If current time is past 3 seconds, restart the current track
        if (currentTime > 3) {
            setCurrentTime(0)
            return
        }

        const albumData = getAlbumData(currentAlbum)

        let prevIndex: number

        if (currentIndex === 0) {
            if (playerState.repeatMode === 'all') {
                prevIndex = playlist.length - 1
            } else {
                // If not repeating all and at the start, just restart current track
                // (though the currentTime > 3 check handles this, this is a fallback)
                prevIndex = 0
            }
        } else {
            prevIndex = currentIndex - 1
        }

        const prevTrackData = playlist[prevIndex]
        if (prevTrackData) {
            console.log('⏮️ Previous track:', prevTrackData.title)
            const currentTrackData = trackToCurrentTrack(prevTrackData, albumData)
            setCurrentTrack(currentTrackData)
            setCurrentTime(0)
            setDuration(timeToSeconds(prevTrackData.duration))
        } else {
            console.warn('❌ Previous track data is undefined at calculated index:', prevIndex, 'This should not happen if playlist.length > 0.')
        }
    }, [getCurrentPlaylist, getCurrentTrackIndex, currentTime, playerState.repeatMode, currentAlbum, trackToCurrentTrack]) // Added trackToCurrentTrack as dependency

    const seekTo = useCallback((time: number) => {
        setCurrentTime(time)
        if (currentTrack) {
            setCurrentTrack(prev => prev ? {
                ...prev,
                currentTime: secondsToTime(time)
            } : null)
        }
    }, [currentTrack, secondsToTime]) // Added secondsToTime as dependency

    const setVolume = useCallback((volume: number) => {
        setPlayerState(prev => ({ ...prev, volume }))
    }, [])

    const toggleShuffle = useCallback(() => {
        setPlayerState(prev => {
            const newShuffleState = !prev.isShuffled
            console.log(`🔀 Toggling shuffle: ${newShuffleState ? 'ON' : 'OFF'}`)

            // Only re-shuffle if turning ON and there's a current playlist
            if (newShuffleState && currentPlaylist.length > 0) {
                const currentTrackId = currentTrack?.id;
                let newShuffledPlaylist: Track[];

                if (currentTrackId) {
                    // Filter out the current track, shuffle the rest, and put current track at the beginning
                    const otherTracks = currentPlaylist.filter(track => track.id !== currentTrackId);
                    const shuffledOthers = shuffleArray(otherTracks);
                    const trackToPrepend = currentPlaylist.find(track => track.id === currentTrackId);

                    if (trackToPrepend) {
                        newShuffledPlaylist = [trackToPrepend, ...shuffledOthers];
                    } else {
                        // Fallback if current track not found (shouldn't happen if currentPlaylist is set correctly)
                        console.warn('Current track not found in currentPlaylist during shuffle toggle. Shuffling all tracks randomly.')
                        newShuffledPlaylist = shuffleArray(currentPlaylist);
                    }
                } else {
                    // If no current track, just shuffle the whole playlist randomly
                    console.log('No current track when toggling shuffle ON. Shuffling entire playlist randomly.')
                    newShuffledPlaylist = shuffleArray(currentPlaylist);
                }
                setShuffledPlaylist(newShuffledPlaylist);
                console.log('🔀 New shuffled playlist after toggle:', newShuffledPlaylist.map(t => ({ id: t.id, title: t.title, number: t.number })));
            } else if (!newShuffleState) {
                // If turning shuffle OFF, the next/previous logic will just use currentPlaylist,
                // so no need to alter shuffledPlaylist.
                console.log('Shuffle turned OFF. Will use original playlist for navigation.')
            }

            return { ...prev, isShuffled: newShuffleState }
        })
    }, [currentPlaylist, currentTrack, shuffleArray]) // Added shuffleArray as dependency

    const toggleRepeat = useCallback(() => {
        setPlayerState(prev => {
            const modes: PlayerState['repeatMode'][] = ['off', 'all', 'one']
            const currentIndex = modes.indexOf(prev.repeatMode)
            const nextMode = modes[(currentIndex + 1) % modes.length]
            console.log(`🔁 Toggling repeat: ${prev.repeatMode} -> ${nextMode}`)
            return { ...prev, repeatMode: nextMode }
        })
    }, [])

    const toggleLike = useCallback(() => {
        if (currentTrack) {
            const newLikedState = !currentTrack.isLiked;
            setCurrentTrack(prev => prev ? {
                ...prev,
                isLiked: newLikedState,
                isDisliked: newLikedState ? false : prev.isDisliked
            } : null);

            updateTrackInteraction(currentTrack.id, 'like', newLikedState);
            console.log(`❤️ Track ${currentTrack.title} liked: ${newLikedState}`)
        }
    }, [currentTrack]);

    const toggleDislike = useCallback(() => {
        if (currentTrack) {
            const newDislikedState = !currentTrack.isDisliked;
            setCurrentTrack(prev => prev ? {
                ...prev,
                isDisliked: newDislikedState,
                isLiked: newDislikedState ? false : prev.isLiked
            } : null);

            updateTrackInteraction(currentTrack.id, 'dislike', newDislikedState);
            console.log(`👎 Track ${currentTrack.title} disliked: ${newDislikedState}`)
        }
    }, [currentTrack]);

    const toggleBookmark = useCallback(() => {
        if (currentTrack) {
            const newBookmarkedState = !currentTrack.isBookmarked;
            setCurrentTrack(prev => prev ? {
                ...prev,
                isBookmarked: newBookmarkedState
            } : null);

            updateTrackInteraction(currentTrack.id, 'bookmark', newBookmarkedState);
            console.log(`🔖 Track ${currentTrack.title} bookmarked: ${newBookmarkedState}`)
        }
    }, [currentTrack]);

    // Calculate progress percentage
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0

    // Simulate time progression when playing
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (playerState.isPlaying && currentTime < duration) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            intervalRef.current = setInterval(() => {
                setCurrentTime(prev => {
                    const newTime = prev + 1

                    // Update currentTrack's currentTime string representation
                    if (currentTrack) {
                        setCurrentTrack(track => track ? {
                            ...track,
                            currentTime: secondsToTime(newTime)
                        } : null)
                    }

                    // Auto-advance to next track when current track ends
                    if (newTime >= duration) {
                        console.log('Track ended, advancing to next track.')
                        setTimeout(() => nextTrack(), 100) // Small delay to ensure state updates
                        return duration // Cap time at duration
                    }

                    return newTime
                })
            }, 1000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        // Cleanup on unmount or when dependencies change
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [playerState.isPlaying, currentTime, duration, nextTrack, currentTrack, secondsToTime]) // Added currentTrack and secondsToTime as dependencies for completeness

    const value: PlayerContextType = {
        currentTrack,
        playerState: { ...playerState, progress },
        isPlaying: playerState.isPlaying,
        currentTime,
        duration,
        currentAlbum,
        currentPlaylist,
        shuffledPlaylist,

        playTrack,
        playAlbum,
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
