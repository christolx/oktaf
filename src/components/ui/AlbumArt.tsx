import type { AlbumArt as AlbumArtType } from '@/data/DummyData.tsx';
import { cn } from '@/lib/utils';

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
            <img
                src={art.value}
                alt={art.alt || 'Album artwork'}
                className={cn(baseClasses, 'object-cover')}
                loading="lazy"
            />
        );
    }

    // Gradient fallback
    return (
        <div className={cn(baseClasses, `bg-gradient-to-br ${art.value}`)}>
            <div className="w-full h-full bg-black/20"></div>
        </div>
    );
}
