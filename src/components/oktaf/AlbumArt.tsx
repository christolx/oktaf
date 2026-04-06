// components/ui/AlbumArt.tsx
import { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
import type { AlbumArt as AlbumArtType } from '@/data/DummyData.tsx';
import { cn } from '@/lib/utils.ts';
import { motion } from 'framer-motion';

interface AlbumArtProps {
    art: AlbumArtType;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    priority?: boolean;
}

const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
};

function getPlaceholderGradient(seed: string) {
    let hash = 0;

    for (let index = 0; index < seed.length; index += 1) {
        hash = seed.charCodeAt(index) + ((hash << 5) - hash);
    }

    const primaryHue = Math.abs(hash) % 360;
    const secondaryHue = (primaryHue + 38) % 360;
    const tertiaryHue = (primaryHue + 76) % 360;

    return {
        background: `linear-gradient(145deg, hsl(${primaryHue} 64% 34%) 0%, hsl(${secondaryHue} 58% 24%) 48%, hsl(${tertiaryHue} 54% 16%) 100%)`
    };
}

export function AlbumArt({ art, className, size = 'md', priority = false }: AlbumArtProps) {
    const [isLoaded, setIsLoaded] = useState(art.type !== 'image');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (art.type === 'image') {
            setIsLoaded(false);
            setHasError(false);
            return;
        }

        setIsLoaded(true);
        setHasError(false);
    }, [art.type, art.value]);

    const baseClasses = cn(
        'relative isolate rounded-lg flex-shrink-0 overflow-hidden bg-white/5',
        sizeClasses[size],
        className
    );

    const imageClasses = 'absolute inset-0 h-full w-full object-cover';

    const placeholderStyle = useMemo(
        () => getPlaceholderGradient(`${art.type}-${art.value}`),
        [art.type, art.value]
    );

    const handleImageLoad = async (event: SyntheticEvent<HTMLImageElement>) => {
        const image = event.currentTarget;

        try {
            await image.decode();
        } catch {
            // Ignore decode failures and still reveal the asset.
        }

        setIsLoaded(true);
        setHasError(false);
    };

    if (art.type === 'image') {
        return (
            <div className={baseClasses}>
                <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 overflow-hidden"
                    style={placeholderStyle}
                    initial={false}
                    animate={{ opacity: isLoaded && !hasError ? 0 : 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/20" />
                    <div className="absolute inset-0 animate-pulse bg-white/5" />
                    {!isLoaded && !hasError && (
                        <motion.div
                            className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            initial={false}
                            animate={{ x: ['-40%', '220%'] }}
                            transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.15 }}
                        />
                    )}
                </motion.div>

                {hasError ? (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950"
                        role="img"
                        aria-label={art.alt || 'Album artwork unavailable'}
                        initial={false}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="h-full w-full bg-black/20" />
                    </motion.div>
                ) : (
                    <motion.img
                        src={art.value}
                        alt={art.alt || 'Album artwork'}
                        className={imageClasses}
                        loading={priority || size === 'xl' ? 'eager' : 'lazy'}
                        fetchPriority={priority || size === 'xl' ? 'high' : 'auto'}
                        decoding="async"
                        draggable={false}
                        onLoad={handleImageLoad}
                        onError={() => {
                            setHasError(true);
                            setIsLoaded(true);
                        }}
                        initial={false}
                        animate={{
                            opacity: isLoaded ? 1 : 0,
                            scale: isLoaded ? 1 : 1.04,
                            filter: isLoaded ? 'blur(0px)' : 'blur(14px)'
                        }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                )}
            </div>
        );
    }

    // Gradient fallback with animation
    return (
        <motion.div
            className={cn(baseClasses, `bg-gradient-to-br ${art.value}`)}
            initial={{ filter: 'blur(4px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            <div className="w-full h-full bg-black/20"></div>
        </motion.div>
    );
}
