import { useState, useEffect } from 'react'
import {Vibrant} from "node-vibrant/browser";

export function useAlbumColors(imageUrl: string) {
    const [colors, setColors] = useState({
        dominant: '#1a1a1a',
        vibrant: '#333333',
        muted: '#2a2a2a',
        isLoading: true
    })

    useEffect(() => {
        if (!imageUrl) return

        Vibrant.from(imageUrl)
            .getPalette()
            .then(palette => {
                // Spotify prioritizes darker, more saturated colors
                const dominantColor =
                    palette.DarkVibrant?.hex ||
                    palette.Vibrant?.hex ||
                    palette.DarkMuted?.hex ||
                    '#1a1a1a'

                setColors({
                    dominant: dominantColor,
                    vibrant: palette.Vibrant?.hex || dominantColor,
                    muted: palette.Muted?.hex || '#2a2a2a',
                    isLoading: false
                })
            })
            .catch(() => {
                setColors(prev => ({ ...prev, isLoading: false }))
            })
    }, [imageUrl])

    return colors
}
