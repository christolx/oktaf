// components/oktaf/LibraryContent.tsx
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button.tsx'
import { AlbumArt } from '@/components/oktaf/AlbumArt.tsx'
import { motion, AnimatePresence } from 'framer-motion'
import { cardVariants, sectionVariants } from '@/lib/animations.ts'
import { albumTracks } from "@/data/DummyData.tsx"

import {
    albumsForYou,
    nostalgiaAlbums,
    trendingAlbums,
    PopArtAlbums,
    AlternativeRockAlbums,
    GothicRockAlbums,
    navigationIcons,
    type Album,
    savedAlbums,
    type AlbumArt as AlbumArtType,
} from '@/data/DummyData.tsx'
import { Heart, Plus, ArrowUpDown, Filter } from 'lucide-react'

const { MoreHorizontal, List, Grid3x3 } = navigationIcons;

interface LibraryContentProps {
    activeSection: string;
}

interface AlbumCardProps {
    album: Album;
}

interface Artist {
    id: string;
    artistname: string;
    art: AlbumArtType;
}

interface ArtistCardProps {
    artist: Artist;
}

const createImageArt = (url: string, alt: string): AlbumArtType => ({
    type: 'image',
    value: url,
    alt
});

const featuredArtists: Artist[] = [
    {
        id: "car-seat-headrest",
        artistname: "Car Seat Headrest",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-01_ox3wuu.jpg", "Car Seat Headrest")
    },
    {
        id: "daft-punk",
        artistname: "Daft Punk",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-02_gtxd7s.jpg", "Daft Punk")
    },
    {
        id: "linkin-park",
        artistname: "Linkin Park",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-03_exkxkq.jpg", "Linkin Park")
    },
    {
        id: "the-beatles",
        artistname: "The Beatles",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-04_mjogjt.jpg", "The Beatles")
    },
    {
        id: "muse",
        artistname: "Muse",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-05_ra9umc.jpg", "Muse")
    },
    {
        id: "michael-jackson",
        artistname: "Michael Jackson",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-06_nq5e68.jpg", "Michael Jackson")
    },
    {
        id: "joy-division",
        artistname: "Joy Division",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-07_rgbjqo.jpg", "Joy Division")
    },
    {
        id: "drake",
        artistname: "Drake",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/drake_rblsuf.jpg", "Drake")
    },
    {
        id: "the-smashing-pumpkins",
        artistname: "The Smashing Pumpkins",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/replacement-09_jsntea.jpg", "The Smashing Pumpkins")
    },
    {
        id: "radiohead",
        artistname: "Radiohead",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-10_b0qyq9.jpg", "Radiohead")
    },
    {
        id: "nirvana",
        artistname: "Nirvana",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-11_a3vk7x.jpg", "Nirvana")
    },
    {
        id: "pixies",
        artistname: "Pixies",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-12_ogi1wh.jpg", "Pixies")
    },
    {
        id: "jeff-buckley",
        artistname: "Jeff Buckley",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/jeff-buckley_eydfnk.jpg", "Jeff Buckley")
    },
    {
        id: "sonic-youth",
        artistname: "Sonic Youth",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-14_bgtfk0.jpg", "Sonic Youth")
    },
    {
        id: "weezer",
        artistname: "Weezer",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-15_owzd4r.jpg", "Weezer")
    },
    {
        id: "the-cure",
        artistname: "The Cure",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/replacement-16_juibnu.jpg", "The Cure")
    },
    {
        id: "swans",
        artistname: "Swans",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-17_ilwxex.jpg", "Swans")
    },
    {
        id: "david-bowie",
        artistname: "David Bowie",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/replacement-18_xiywhd.jpg", "David Bowie")
    },
    {
        id: "bjork",
        artistname: "Bjork",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-19_eb1mye.jpg", "Björk")
    },
    {
        id: "kate-bush",
        artistname: "Kate Bush",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/replacement-20_pqalwl.jpg", "Kate Bush")
    },
    {
        id: "frank-ocean",
        artistname: "Frank Ocean",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-21_qrh4mw.jpg", "Frank Ocean")
    },
    {
        id: "sufjan-stevens",
        artistname: "Sufjan Stevens",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/replacement-22_jo1xxc.jpg", "Sufjan Stevens")
    },
    {
        id: "rihanna",
        artistname: "Rihanna",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-23_y7rdti.jpg", "Rihanna")
    },
    {
        id: "green-day",
        artistname: "Green Day",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-24_slilej.jpg", "Green Day")
    },
    {
        id: "amy-winehouse",
        artistname: "Amy Winehouse",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-25_ydb4ts.jpg", "Amy Winehouse")
    },
    {
        id: "harry-styles",
        artistname: "Harry Styles",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-26_xzgvv4.jpg", "Harry Styles")
    },
    {
        id: "bruno-mars",
        artistname: "Bruno Mars",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-27_nfawxi.jpg", "Bruno Mars")
    },
    {
        id: "lizzo",
        artistname: "Lizzo",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-28_aolo3q.jpg", "Lizzo")
    },
    {
        id: "kendrick-lamar",
        artistname: "Kendrick Lamar",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-29_ilrjva.jpg", "Kendrick Lamar")
    },
    {
        id: "the-weeknd",
        artistname: "The Weeknd",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-30_z7y7sb.jpg", "The Weeknd")
    },
    {
        id: "taylor-swift",
        artistname: "Taylor Swift",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-31_othnl4.jpg", "Taylor Swift")
    },
    {
        id: "bad-bunny",
        artistname: "Bad Bunny",
        art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/artist-32_v0htk3.jpg", "Bad Bunny")
    }
];

function generateStableLikedTracks() {
    const likedTracks: Array<{
        id: string;
        number: number;
        title: string;
        artist: string;
        duration: string;
        albumTitle: string;
        albumArt: AlbumArtType;
        dateAdded: string;
        isLiked: boolean;
        albumId: string;
    }> = [];

    const allAlbums = [
        ...albumsForYou,
        ...nostalgiaAlbums,
        ...trendingAlbums,
        ...PopArtAlbums,
        ...AlternativeRockAlbums,
        ...GothicRockAlbums,
        ...savedAlbums
    ];

    const albumMap = new Map(allAlbums.map(album => [album.id, album]));

    Object.entries(albumTracks).forEach(([albumId, tracks]) => {
        const album = albumMap.get(albumId);

        if (album) {
            tracks.forEach((track, index) => {
                if (track.isLiked) {
                    likedTracks.push({
                        id: track.id,
                        number: index + 1,
                        title: track.title,
                        artist: track.artist,
                        duration: track.duration,
                        albumTitle: album.title,
                        albumArt: album.art,
                        dateAdded: generateStableDateAdded(track.id), // Use track ID for consistency
                        isLiked: track.isLiked,
                        albumId: albumId
                    });
                }
            });
        }
    });

    return likedTracks;
}

function generateStableDateAdded(trackId: string): string {
    let hash = 0;
    for (let i = 0; i < trackId.length; i++) {
        const char = trackId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    const daysAgo = (Math.abs(hash) % 30) + 1;

    if (daysAgo === 1) return "1 day ago";
    if (daysAgo < 7) return `${daysAgo} days ago`;
    if (daysAgo < 14) return "1 week ago";
    if (daysAgo < 21) return "2 weeks ago";
    if (daysAgo < 28) return "3 weeks ago";
    return "1 month ago";
}

const STABLE_LIKED_TRACKS = generateStableLikedTracks();

function LibraryAlbumCard({ album }: AlbumCardProps) {
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
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <AlbumArt
                    art={album.art}
                    className="w-full h-full group-hover:brightness-110 transition-all duration-200"
                />
            </div>
            <div className="space-y-1">
                <h4 className="text-white text-sm font-medium truncate">{album.title}</h4>
                <p className="text-white/60 text-xs truncate">{album.artist}</p>
                <p className="text-white/40 text-xs">{album.year}</p>
            </div>
        </motion.div>
    )
}

function LibraryArtistCard({ artist }: ArtistCardProps) {
    const navigate = useNavigate()

    const handleArtistClick = () => {
        navigate(`/artist/daftpunk`)
    }

    return (
        <motion.div
            className="group cursor-pointer mb-12"
            onClick={handleArtistClick}
            variants={cardVariants}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="aspect-square mb-3 relative overflow-hidden rounded-full group-hover:scale-105 transition-transform duration-200">
                <AlbumArt
                    art={artist.art}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-200"
                />
            </div>
            <div className="text-center space-y-1">
                <h4 className="text-white text-sm font-medium truncate">{artist.artistname}</h4>
            </div>
        </motion.div>
    )
}

function LibrarySectionHeader({ title, albumCount }: { title: string; albumCount?: number }) {
    return (
        <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div>
                <h2 className="text-white text-2xl font-bold">{title}</h2>
                {albumCount && (
                    <p className="text-white/60 text-sm mt-1">
                        {albumCount} {title.toLowerCase().includes('artist') ? 'artists' : title.toLowerCase().includes('song') ? 'songs' : 'albums'}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-transparent h-8 w-8">
                    <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-transparent h-8 w-8">
                    <List className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-transparent h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    )
}

function AlbumsLibraryView() {
    const squashedAlbums = [...albumsForYou, ...PopArtAlbums, ...AlternativeRockAlbums, ...nostalgiaAlbums, ...trendingAlbums, ...GothicRockAlbums]

    function shuffle(array: Album[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const scrambledAlbums = shuffle([...squashedAlbums]);
    const resultAlbums = [...savedAlbums, ...scrambledAlbums];

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
            {/* Saved Albums */}
            <motion.section variants={sectionVariants}>
                <LibrarySectionHeader title={"Saved Albums"} albumCount={resultAlbums.length}/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={{
                        hidden: {opacity: 0},
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.08,
                                delayChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    {resultAlbums.map((album) => (
                        <LibraryAlbumCard key={album.id} album={album}/>
                    ))}
                </motion.div>
            </motion.section>
        </motion.div>
    )
}

function ArtistsLibraryView() {

    function shuffleArtists(array: Artist[]) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const shuffledArtists = shuffleArtists(featuredArtists);

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
            {/* Featured Artists */}
            <motion.section variants={sectionVariants}>
                <LibrarySectionHeader title={"Featured Artists"} albumCount={shuffledArtists.length}/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={{
                        hidden: {opacity: 0},
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.08,
                                delayChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    {/*Map featuredartists instead of shuffledartists for sake of simplicity.*/}
                    {featuredArtists.map((artist) => (
                        <LibraryArtistCard key={artist.id} artist={artist}/>
                    ))}
                </motion.div>
            </motion.section>
        </motion.div>
    )
}

function LikedSongsView() {
    // Use the stable reference instead of generating new data
    const likedTracks = STABLE_LIKED_TRACKS;

    const sortedLikedTracks = likedTracks.sort((a, b) => {
        const dateOrder = ['1 day ago', '2 days ago', '3 days ago', '4 days ago', '5 days ago', '1 week ago', '2 weeks ago', '3 weeks ago', '1 month ago'];
        return dateOrder.indexOf(a.dateAdded) - dateOrder.indexOf(b.dateAdded);
    });

    return (
        <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            {/* Header */}
            <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h2 className="text-white text-2xl font-bold">Liked Songs</h2>
                    <p className="text-white/60 text-sm mt-1">{sortedLikedTracks.length} songs</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-transparent h-8 w-8">
                        <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-transparent h-8 px-3">
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        Recent
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-transparent h-8 px-3">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter: All
                    </Button>
                </div>
            </motion.div>

            {/* Table Header */}
            <motion.div
                className="grid grid-cols-12 gap-4 px-4 py-2 text-white/60 text-base font-light border-b border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-4">Title</div>
                <div className="col-span-3">Album</div>
                <div className="col-span-2">Date Added</div>
                <div className="col-span-1 text-center">Duration</div>
            </motion.div>

            {/* Track List */}
            <motion.div
                className="space-y-1"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.05,
                            delayChildren: 0.3
                        }
                    }
                }}
                initial="hidden"
                animate="visible"
            >
                {sortedLikedTracks.length > 0 ? (
                    sortedLikedTracks.map((track, index) => (
                        <LikedTrackRow key={track.id} track={track} index={index} />
                    ))
                ) : (
                    <motion.div
                        className="text-center py-12"
                        variants={cardVariants}
                    >
                        <p className="text-white/60 text-lg">No liked songs yet</p>
                        <p className="text-white/40 text-sm mt-2">
                            Songs you like will appear here
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}

// Track row component
interface LikedTrackRowProps {
    track: {
        id: string;
        number: number;
        title: string;
        artist: string;
        duration: string;
        albumTitle: string;
        albumArt: AlbumArtType;
        dateAdded: string;
        isLiked: boolean;
    };
    index: number;
}

function LikedTrackRow({ track, index }: LikedTrackRowProps) {
    return (
        <motion.div
            className="grid grid-cols-12 gap-4 px-4 py-2 rounded-md hover:bg-white/5 group cursor-pointer transition-colors"
            variants={cardVariants}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
            {/* Track Number */}
            <div className="col-span-1 flex items-center justify-center">
                <span className="text-white/60 text-sm group-hover:hidden">
                    {index + 1}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden group-hover:flex h-6 w-6 text-white hover:text-white hover:bg-transparent"
                >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </Button>
            </div>

            {/* Title and Artist */}
            <div className="col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <AlbumArt
                        art={track.albumArt}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="text-white text-sm font-light truncate hover:text-green-500 transition-all duration-500">
                        {track.title}
                    </h4>
                    <p className="text-white/60 text-xs font-extralight truncate">
                        {track.artist}
                    </p>
                </div>
            </div>

            {/* Album */}
            <div className="col-span-3 flex items-center">
                <span className="text-white/60 text-sm truncate hover:text-white hover:underline cursor-pointer">
                    {track.albumTitle}
                </span>
            </div>

            {/* Date Added */}
            <div className="col-span-2 flex items-center">
                <span className="text-white/60 text-sm">
                    {track.dateAdded}
                </span>
            </div>

            {/* Duration and Heart */}
            <div className="relative col-span-1 flex items-start justify-center gap-2">
                <span className="text-white/60 text-sm hover:text-white/60">
                    {track.duration}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-transparent absolute ml-60"
                >
                    <Heart className="w-3 h-3 fill-current" />
                </Button>
                {/*<div className="hidden group-hover:flex items-center gap-2">*/}
                {/*    <span className="text-white/60 text-sm">*/}
                {/*        {track.duration}*/}
                {/*    </span>*/}
                {/*    <Button*/}
                {/*        variant="ghost"*/}
                {/*        size="icon"*/}
                {/*        className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-transparent"*/}
                {/*    >*/}
                {/*        <Heart className="w-3 h-3 fill-current" />*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
        </motion.div>
    );
}

export function LibraryContent({ activeSection }: LibraryContentProps) {
    const renderLibrarySection = () => {
        switch (activeSection) {
            case 'albums':
                return <AlbumsLibraryView />;
            case 'liked':
                return <LikedSongsView />;
            case 'artists':
                return <ArtistsLibraryView />;
            default:
                return <AlbumsLibraryView />;
        }
    };

    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] pb-24">
            <div className="pt-24 p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        {renderLibrarySection()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
