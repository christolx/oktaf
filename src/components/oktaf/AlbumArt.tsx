// components/ui/AlbumArt.tsx
import type { AlbumArt as AlbumArtType } from '@/data/DummyData.tsx';
import { cn } from '@/lib/utils.ts';
import { motion } from 'framer-motion';

interface AlbumArtProps {
    art: AlbumArtType;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
};

export function AlbumArt({ art, className, size = 'md' }: AlbumArtProps) {
    const baseClasses = cn(
        'rounded-lg flex-shrink-0 overflow-hidden',
        sizeClasses[size],
        className
    );

    if (art.type === 'image') {
        return (
            <motion.img
                src={art.value}
                alt={art.alt || 'Album artwork'}
                className={cn(baseClasses, 'object-cover')}
                loading="lazy"
                initial={{ filter: 'blur(4px)' }}
                animate={{ filter: 'blur(0px)' }}
                transition={{ duration: 0.3, delay: 0.1 }}
            />
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
