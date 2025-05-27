// components/oktaf/HomeContent.tsx
import {useNavigate} from 'react-router'
import {Button} from '@/components/ui/button.tsx'
import {AlbumArt} from '@/components/ui/AlbumArt.tsx'
import {motion, AnimatePresence} from 'framer-motion'
import {containerVariants, cardVariants, sectionVariants} from '@/lib/animations.ts'

import {
    albumsForYou,
    nostalgiaAlbums,
    trendingAlbums,
    PopArtAlbums,
    AlternativeRockAlbums,
    GothicRockAlbums,
    userPlaylists,
    musicSections,
    navigationIcons,
    albumTracks, // <-- Import albumTracks
    type Album,
    type Playlist,
    type Track // <-- Import Track type
} from '@/data/DummyData.tsx'

const {ChevronLeft, ChevronRight, MoreHorizontal} = navigationIcons;

interface AlbumCardProps {
    album: Album;
}

interface PlaylistCardProps {
    playlist: Playlist;
}

interface MainContentProps {
    activeSection: string;
}

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
    // Create a mutable copy to avoid modifying the original array if it's needed elsewhere
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function AlbumCard({album}: AlbumCardProps) {
    const navigate = useNavigate()

    const handleAlbumClick = () => {
        navigate(`/album/${album.id}`)
    }

    return (
        <motion.div
            className="group cursor-pointer"
            onClick={handleAlbumClick}
            variants={cardVariants}
            whileHover={{
                scale: 1.02,
                transition: {duration: 0.2}
            }}
            whileTap={{scale: 0.98}}
        >
            <div
                className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <AlbumArt
                    art={album.art}
                    className="w-full h-full group-hover:brightness-110 transition-all duration-200"
                />
            </div>
            <div className="space-y-1">
                <h4 className="text-white text-sm font-medium truncate">{album.title}</h4>
                <p className="text-white/60 text-xs truncate">{album.artist}</p>
            </div>
        </motion.div>
    )
}

function PlaylistCard({playlist}: PlaylistCardProps) {
    const navigate = useNavigate()

    const handlePlaylistClick = () => {
        navigate(`/playlist/${playlist.id}`)
    }

    return (
        <div className="group cursor-pointer" onClick={handlePlaylistClick}>
            <div
                className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <AlbumArt
                    art={playlist.art}
                    className="w-full h-full group-hover:brightness-110 transition-all duration-200"
                />
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                    {playlist.name[0]}
                </div>
            </div>
            <div className="space-y-1">
                <h4 className="text-white text-sm font-medium truncate">{playlist.name}</h4>
                <p className="text-white/60 text-xs truncate">
                    {playlist.trackCount} tracks
                </p>
                {playlist.duration && (
                    <p className="text-white/40 text-xs">{playlist.duration}</p>
                )}
            </div>
        </div>
    )
}

// --- TrackCard Component ---
interface TrackCardProps {
    track: Track; // The track data
    album: Album; // The associated album data for art, etc.
}

// Updated TrackCard with animation
function TrackCard({track, album}: TrackCardProps) {
    const handleTrackClick = () => {
        console.log(`Clicked track: ${track.title} by ${track.artist} from album ${album.title}`);
    };

    return (
        <motion.div
            className="group cursor-pointer"
            onClick={handleTrackClick}
            variants={cardVariants}
            whileHover={{
                scale: 1.02,
                transition: {duration: 0.2}
            }}
            whileTap={{scale: 0.98}}
        >
            <div
                className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <AlbumArt
                    art={album.art}
                    className="w-full h-full group-hover:brightness-110 transition-all duration-200"
                    size="lg"
                />
                <div
                    className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {/* Play button placeholder */}
                </div>
            </div>
            <div className="space-y-1">
                <h4 className="text-white text-sm font-medium truncate">{track.title}</h4>
                <p className="text-white/60 text-xs truncate">{track.artist}</p>
            </div>
        </motion.div>
    )
}

function SectionHeader({title}: { title: string }) {
    return (
        <motion.div
            className="flex items-center justify-between mb-6"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5, ease: "easeOut"}}
        >
            <h2 className="text-white text-xl font-semibold">{title}</h2>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <ChevronLeft className="w-4 h-4"/>
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <ChevronRight className="w-4 h-4"/>
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
            </div>
        </motion.div>
    )
}

function AlbumsView() {
    return (
        <motion.div
            className="space-y-12"
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.2
                    }
                }
            }}
        >
            {/* Albums for You */}
            <motion.section variants={sectionVariants}>
                <SectionHeader title={musicSections.albumsForYou.title}/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {albumsForYou.map((album) => (
                        <AlbumCard key={album.id} album={album}/>
                    ))}
                </motion.div>
            </motion.section>

            {/* Alternative Rock Albums */}
            <motion.section variants={sectionVariants}>
                <SectionHeader title={musicSections.alternativeRock.title}/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {AlternativeRockAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album}/>
                    ))}
                </motion.div>
            </motion.section>

            {/* Gothic Rock Albums */}
            <motion.section variants={sectionVariants}>
                <SectionHeader title={musicSections.gothicRock.title}/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {GothicRockAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album}/>
                    ))}
                </motion.div>
            </motion.section>

            {/* Pop Art Albums */}
            <motion.section variants={sectionVariants}>
                <SectionHeader title={musicSections.popArt.title}/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {PopArtAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album}/>
                    ))}
                </motion.div>
            </motion.section>

            {/* Best Albums of 00s & 10s */}
            <motion.section variants={sectionVariants}>
                <SectionHeader title={musicSections.nostalgiaHits.title}/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {nostalgiaAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album}/>
                    ))}
                </motion.div>
            </motion.section>

            {/* Trending Albums Now */}
            <motion.section variants={sectionVariants}>
                <SectionHeader title={musicSections.trendingNow.title}/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {trendingAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album}/>
                    ))}
                </motion.div>
            </motion.section>
        </motion.div>
    )
}

function PlaylistsView() {
    return (
        <div className="space-y-12">
            <section>
                <SectionHeader title="Your Playlists"/>
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {userPlaylists.map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist}/>
                    ))}
                </div>
            </section>

            <section>
                <SectionHeader title="Recommended Playlists"/>
                <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {userPlaylists.slice(0, 4).map((playlist) => (
                        <PlaylistCard key={`rec-${playlist.id}`} playlist={playlist}/>
                    ))}
                </div>
            </section>
        </div>
    )
}

// --- Updated TracksView Component with Random Shuffle ---
function TracksView() {
    const allAlbums: Album[] = [
        ...albumsForYou,
        ...nostalgiaAlbums,
        ...trendingAlbums,
        ...PopArtAlbums,
        ...AlternativeRockAlbums,
        ...GothicRockAlbums,
    ];

    const oneTrackPerAlbum = allAlbums.map(album => {
        const tracks = albumTracks[album.id];
        if (tracks && tracks.length > 0) {
            return {track: tracks[0], album};
        }
        console.warn(`No tracks found for album ID ${album.id} (${album.title}). Skipping.`);
        return null;
    }).filter(Boolean) as { track: Track, album: Album }[];

    const shuffledTracks = shuffleArray(oneTrackPerAlbum);

    return (
        <motion.div
            className="space-y-12"
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.2
                    }
                }
            }}
        >
            <motion.section variants={sectionVariants}>
                <SectionHeader title="Featured Tracks"/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={{
                        hidden: {opacity: 0},
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.06,
                                delayChildren: 0.1
                            }
                        }
                    }}
                >
                    {shuffledTracks.map(({track, album}) => (
                        <TrackCard key={track.id} track={track} album={album}/>
                    ))}
                </motion.div>
            </motion.section>
        </motion.div>
    );
}

export function HomeContent({activeSection}: MainContentProps) {
    const renderContent = () => {
        switch (activeSection) {
            case 'albums':
                return <AlbumsView/>;
            case 'playlists':
                return <PlaylistsView/>;
            case 'tracks': // <-- Render TracksView
                return <TracksView/>;
            default:
                // Fallback
                return <AlbumsView/>;
        }
    };

    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] pb-24">
            <div className="pt-24 p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -20}}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
