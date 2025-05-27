// components/oktaf/MainContent.tsx
import {useNavigate} from 'react-router'
import {Button} from '@/components/ui/button'
import type {AlbumArt as AlbumArtType} from "@/data/DummyData.tsx";
import {AlbumArt} from "@/components/oktaf/AlbumArt.tsx";
import {motion, AnimatePresence} from 'framer-motion'
import {containerVariants, cardVariants, sectionVariants} from '@/lib/animations'

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

const createImageArt = (url: string, alt: string): AlbumArtType => ({
    type: 'image',
    value: url,
    alt
});

// New playlist data for display
const featuredPlaylists: Playlist[] = [
    {
        id: 'featured-1',
        name: 'lebron ai songs',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748356466/1900x1900-000000-80-0-0_jd3qyo.jpg", "Failed to load playlist cover"),
        trackCount: 10,
        duration: '1h 42m',
        creator: 'AI Music Lab'
    },
    {
        id: 'featured-2',
        name: 'Romantical Vibes',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748361007/romance_gjk5f0.webp", "Failed to load playlist cover"),
        trackCount: 35,
        duration: '2h 15m',
        creator: 'ItsLove'
    },
    {
        id: 'featured-3',
        name: 'Lofi study',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748356748/lofi_znxzoy.png", "Failed to load playlist cover"),
        trackCount: 50,
        duration: '3h 20m',
        creator: 'ChillStudy'
    },
    {
        id: 'featured-4',
        name: 'Old nostalgic',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748356809/nostalgia_izvptr.jpg", "Failed to load playlist cover"),
        trackCount: 40,
        duration: '2h 45m',
        creator: 'RetroVibes'
    },
    {
        id: 'featured-5',
        name: 'Best Hip Hop',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748356961/hiphop_e4ef5k.jpg", "Failed to load playlist cover"),
        trackCount: 45,
        duration: '3h 5m',
        creator: 'HipHopCentral'
    },
    {
        id: 'featured-6',
        name: 'Best Pop Playlist Ever',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748357083/pop_pmnbxp.jpg", "Failed to load playlist cover"),
        trackCount: 60,
        duration: '4h 12m',
        creator: 'PopMaster'
    },
    {
        id: 'featured-7',
        name: 'West Side Trio',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748357188/west_side_pfwsmf.jpg", "Failed to load playlist cover"),
        trackCount: 18,
        duration: '1h 15m',
        creator: 'WestCoast'
    },
    {
        id: 'featured-8',
        name: 'GTA 5 Radio',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748357253/gta_5_tejf1j.jpg", "Failed to load playlist cover"),
        trackCount: 55,
        duration: '3h 45m',
        creator: 'GameSounds'
    },
    {
        id: 'featured-9',
        name: 'Leg Day Workout Playlist',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748359574/leg_day_ubhbp8.jpg", "Failed to load playlist cover"),
        trackCount: 28,
        duration: '1h 55m',
        creator: 'LegDayWarrior'
    },
    {
        id: 'featured-10',
        name: 'Favorite Jogging Playlist',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748359656/jogging_tumczb.jpg", "Failed to load playlist cover"),
        trackCount: 42,
        duration: '2h 38m',
        creator: 'RunnerHub'
    },
    {
        id: 'featured-11',
        name: 'The Best Hooping Playlist',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748359751/kd_workout_vz3hjo.jpg", "Failed to load playlist cover"),
        trackCount: 33,
        duration: '2h 12m',
        creator: 'CourtKings'
    },
    {
        id: 'featured-12',
        name: 'Cardio Performance',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748359864/cardio_rvjuvr.jpg", "Failed to load playlist cover"),
        trackCount: 38,
        duration: '2h 25m',
        creator: 'CardioZone'
    },
    {
        id: 'featured-13',
        name: 'UNLOCK YOUR BEAST MODE',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748359967/beast_i8ppyz.jpg", "Failed to load playlist cover"),
        trackCount: 52,
        duration: '3h 18m',
        creator: 'BeastModeMusic'
    },
    {
        id: 'featured-14',
        name: 'Best for Calisthenics',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748360147/kalistenik_xuyxzo.jpg", "Failed to load playlist cover"),
        trackCount: 31,
        duration: '2h 8m',
        creator: 'BodyWeightBeats'
    },
    {
        id: 'featured-15',
        name: 'Best for Crossfit',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748360215/crossfit_ephdbb.jpg", "Failed to load playlist cover"),
        trackCount: 47,
        duration: '2h 58m',
        creator: 'CrossFitVibes'
    },
    {
        id: 'featured-16',
        name: 'Climb Your Energy',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748360268/rockclimbing_zw6i2y.jpg", "Failed to load playlist cover"),
        trackCount: 29,
        duration: '1h 52m',
        creator: 'ClimbBeats'
    },
    {
        id: 'featured-16',
        name: 'Box Your Fear',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748371422/boxing_zvouxi.jpg", "Failed to load playlist cover"),
        trackCount: 19,
        duration: '1h 52m',
        creator: 'FitXFearless'
    },
    {
        id: 'featured-17',
        name: 'Summer Hits',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748370186/summer_guugfh.jpg", "Failed to load playlist cover"),
        trackCount: 65,
        duration: '4h 32m',
        creator: 'SunnyVibes'
    },
    {
        id: 'featured-18',
        name: 'Relaxes Your Day',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748370331/chill_zjqazq.jpg", "Failed to load playlist cover"),
        trackCount: 44,
        duration: '2h 58m',
        creator: 'ZenMoments'
    },
    {
        id: 'featured-19',
        name: 'Daily Hiking Picks',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748370403/hiking_gjn6ev.webp", "Failed to load playlist cover"),
        trackCount: 36,
        duration: '2h 22m',
        creator: 'TrailBlazers'
    },
    {
        id: 'featured-20',
        name: 'Developer Mode',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748370584/dev_begg46.jpg", "Failed to load playlist cover"),
        trackCount: 72,
        duration: '5h 15m',
        creator: 'CodeBeats'
    },
    {
        id: 'featured-21',
        name: 'Enjoy Your Ride',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748370649/riding_clkrz3.jpg", "Failed to load playlist cover"),
        trackCount: 48,
        duration: '3h 8m',
        creator: 'RoadTripVibes'
    },
    {
        id: 'featured-22',
        name: 'Locked In',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748370784/locked_in_qsjjz5.webp", "Failed to load playlist cover"),
        trackCount: 38,
        duration: '2h 35m',
        creator: 'FocusFlow'
    },
    {
        id: 'featured-23',
        name: 'Best of Reggae',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748370852/rege_b2yage.avif", "Failed to load playlist cover"),
        trackCount: 54,
        duration: '3h 42m',
        creator: 'IslandSounds'
    },
    {
        id: 'featured-24',
        name: 'Daily EDM Mix',
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748370910/edm_qud0hu.jpg", "Failed to load playlist cover"),
        trackCount: 61,
        duration: '4h 18m',
        creator: 'ElectroBeats'
    }
];

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
        // Always navigate to the "lebron ai songs" playlist
        navigate(`/album/1`)
    }

    return (
        <motion.div
            className="group cursor-pointer"
            onClick={handlePlaylistClick}
            variants={cardVariants}
            whileHover={{
                scale: 1.02,
                transition: {duration: 0.2}
            }}
            whileTap={{scale: 0.98}}
        >
            <div
                className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200"
            >
                <AlbumArt
                    art={playlist.art}
                    className="w-full h-full group-hover:brightness-110 transition-all duration-200"
                />
            </div>

            {/* Layout dengan flex untuk memisahkan kiri dan kanan */}
            <div className="flex items-start justify-between">
                {/* Bagian kiri: Judul dan Creator */}
                <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-white text-sm font-light truncate">
                        {playlist.name}
                    </h4>
                    {playlist.creator && (
                        <p className="text-white/40 text-xs font-extralight truncate">
                            by {playlist.creator}
                        </p>
                    )}
                </div>

                {/* Bagian kanan: Jumlah tracks dengan warna hijau Spotify */}
                <div className="flex-shrink-0 ml-2">
                    <span className="text-[#1db954] text-xs font-medium">
                        {playlist.trackCount}
                    </span>
                </div>
            </div>
        </motion.div>
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
            {/* Featured Playlists */}
            <motion.section variants={sectionVariants}>
                <SectionHeader title="Featured Playlists"/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {featuredPlaylists.slice(0, 8).map((playlist) => (
                        <PlaylistCard key={`rec-${playlist.id}`} playlist={playlist}/>
                    ))}
                </motion.div>
            </motion.section>

            {/*Workout Playlists*/}
            <motion.section variants={sectionVariants}>
                <SectionHeader title="Workout Playlists"/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {featuredPlaylists.slice(9, 17).map((playlist) => (
                        <PlaylistCard key={`rec-${playlist.id}`} playlist={playlist}/>
                    ))}
                </motion.div>
            </motion.section>

            {/*Hits Playlists*/}
            <motion.section variants={sectionVariants}>
                <SectionHeader title="Today's Hits"/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {featuredPlaylists.slice(17, 25).map((playlist) => (
                        <PlaylistCard key={`rec-${playlist.id}`} playlist={playlist}/>
                    ))}
                </motion.div>
            </motion.section>
        </motion.div>
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
            case 'tracks':
                return <TracksView/>;
            default:
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
