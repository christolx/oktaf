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
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748379848/car_seat_headrest_jcy4px.jpg", "Failed to load artist image")
    },
    {
        id: "daft-punk",
        artistname: "Daft Punk",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748379949/daft_punk_uqvrq9.webp", "Failed to load artist image")
    },
    {
        id: "linkin-park",
        artistname: "Linkin Park",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380045/linkin_park_y8bzn6.jpg", "Failed to load artist image")
    },
    {
        id: "the-beatles",
        artistname: "The Beatles",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380274/The-Beatles-Video_lnb8cu.webp", "Failed to load artist image")
    },
    {
        id: "muse",
        artistname: "Muse",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380312/muse_cv9lxs.webp", "Failed to load artist image")
    },
    {
        id: "michael-jackson",
        artistname: "Michael Jackson",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380364/thriller-album-michaeljackson_hzixyv.jpg", "Failed to load artist image")
    },
    {
        id: "joy-division",
        artistname: "Joy Division",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380437/joy_division_djoebu.avif", "Failed to load artist image")
    },
    {
        id: "drake",
        artistname: "Drake",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380563/drake_jn8fw5.webp", "Failed to load artist image")
    },
    {
        id: "the-smashing-pumpkins",
        artistname: "The Smashing Pumpkins",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380570/pumpkins_ncie1k.webp", "Failed to load artist image")
    },
    {
        id: "radiohead",
        artistname: "Radiohead",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380649/radiohead_slunpa.jpg", "Failed to load artist image")
    },
    {
        id: "nirvana",
        artistname: "Nirvana",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380662/nirvana_btq2dv.webp", "Failed to load artist image")
    },
    {
        id: "pixies",
        artistname: "Pixies",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380707/pixies_ihbqfj.webp", "Failed to load artist image")
    },
    {
        id: "jeff-buckley",
        artistname: "Jeff Buckley",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380724/jeff_buckley_uu0ifb.jpg", "Failed to load artist image")
    },
    {
        id: "sonic-youth",
        artistname: "Sonic Youth",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380830/sonic_youth_d9y2gl.webp", "Failed to load artist image")
    },
    {
        id: "weezer",
        artistname: "Weezer",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380855/weezer_aaiwuo.jpg", "Failed to load artist image")
    },
    {
        id: "the-cure",
        artistname: "The Cure",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380888/the-cure_tpdd9k.jpg", "Failed to load artist image")
    },
    {
        id: "swans",
        artistname: "Swans",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380920/swans_a9fnui.webp", "Failed to load artist image")
    },
    {
        id: "david-bowie",
        artistname: "David Bowie",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748380962/david_bowie_b0z7in.jpg", "Failed to load artist image")
    },
    {
        id: "bjork",
        artistname: "Bjork",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381018/bjork_mekvxo.png", "Failed to load artist image")
    },
    {
        id: "kate-bush",
        artistname: "Kate Bush",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381006/Kate-Bush-GettyImages-98590873_tcjqeh.webp", "Failed to load artist image")
    },
    {
        id: "frank-ocean",
        artistname: "Frank Ocean",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381033/frank_ocean_f7zqut.png", "Failed to load artist image")
    },
    {
        id: "sufjan-stevens",
        artistname: "Sufjan Stevens",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381174/sufjan_stevens_ilrjdh.jpg", "Failed to load artist image")
    },
    {
        id: "rihanna",
        artistname: "Rihanna",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381196/rihanna_mlqov7.webp", "Failed to load artist image")
    },
    {
        id: "green-day",
        artistname: "Green Day",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381264/green_day_xdpsrb.webp", "Failed to load artist image")
    },
    {
        id: "amy-winehouse",
        artistname: "Amy Winehouse",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381305/amy_winehouse_s1dw5l.png", "Failed to load artist image")
    },
    {
        id: "harry-styles",
        artistname: "Harry Styles",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381336/harry_styles_ht4a0w.jpg", "Failed to load artist image")
    },
    {
        id: "bruno-mars",
        artistname: "Bruno Mars",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381380/bruno_mars_ssz2bl.jpg", "Failed to load artist image")
    },
    {
        id: "lizzo",
        artistname: "Lizzo",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381413/lizzo_ircqqe.jpg", "Failed to load artist image")
    },
    {
        id: "kendrick-lamar",
        artistname: "Kendrick Lamar",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381425/kendrick_lamar_w2wigp.jpg", "Failed to load artist image")
    },
    {
        id: "the-weeknd",
        artistname: "The Weeknd",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381550/the_weeknd_suchtt.webp", "Failed to load artist image")
    },
    {
        id: "taylor-swift",
        artistname: "Taylor Swift",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381588/taylor_swift_ucqmjk.jpg", "Failed to load artist image")
    },
    {
        id: "bad-bunny",
        artistname: "Bad Bunny",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748381594/bad_bunny_thgyhq.jpg", "Failed to load artist image")
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
        navigate(`/artist/${artist.id}`)
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
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <List className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
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
                    <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                        <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white h-8 px-3">
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        Recent
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white h-8 px-3">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter: All
                    </Button>
                </div>
            </motion.div>

            {/* Table Header */}
            <motion.div
                className="grid grid-cols-12 gap-4 px-4 py-2 text-white/60 text-sm border-b border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Title</div>
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
            <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <AlbumArt
                        art={track.albumArt}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="text-white text-sm font-medium truncate">
                        {track.title}
                    </h4>
                    <p className="text-white/60 text-xs truncate">
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
            <div className="col-span-1 flex items-center justify-center gap-2">
                <span className="text-white/60 text-sm group-hover:hidden">
                    {track.duration}
                </span>
                <div className="hidden group-hover:flex items-center gap-2">
                    <span className="text-white/60 text-sm">
                        {track.duration}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-transparent"
                    >
                        <Heart className="w-3 h-3 fill-current" />
                    </Button>
                </div>
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
