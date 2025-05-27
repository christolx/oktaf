// pages/content/ArtistDetailContent.tsx
import {useState} from 'react';
import {Play, Heart, Plus, MoreHorizontal, Search, Bookmark} from 'lucide-react';
import { motion } from 'framer-motion';
import {useNavigate} from "react-router";
import {cardVariants, containerVariants} from "@/lib/animations.ts";

interface Song {
    id: number;
    title: string;
    album: string;
    duration: string;
    albumArt: string;
}

interface ArtistData {
    name: string;
    monthlyListeners: string;
    heroImage: string;
    avatar1: string;
    avatar2: string;
    bio: string;
    inLibrarySongs: Song[];
    popularSongs: Song[];
}

interface HeroSectionProps {
    artistData: ArtistData;
}

// Add this interface to your existing interfaces
interface ListenerData {
    city: string;
    country: string;
    listeners: string;
    monthlyListeners: string;
}

interface AlbumAppearance {
    id: number;
    title: string;
    artist: string;
    year: string;
    coverArt: string;
    type: 'album' | 'playlist' | 'compilation';
}

function HeroSection({artistData}: HeroSectionProps) {
    return (
        <div
            className="relative h-80 lg:h-96 bg-cover bg-[center_35%]"
            style={{backgroundImage: `url(${artistData.heroImage})`}}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/80 to-black/60 pointer-events-none"/>

            {/* Content */}
            <div className="relative h-full flex items-end px-6 lg:px-8 pb-6">
                <div className="flex-1">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-2">
                        {artistData.name}
                    </h1>
                    <p className="text-gray-300 text-sm lg:text-base">
                        {artistData.monthlyListeners}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        className="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform"
                        aria-label="Play artist"
                    >
                        <Play className="w-6 h-6 fill-current"/>
                    </button>

                    <button
                        className="border border-gray-400 text-white px-6 py-2 rounded-full hover:border-white transition-colors"
                        aria-label="Follow artist"
                    >
                        Follow
                    </button>

                    <button
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Add to library"
                    >
                        <Bookmark className="w-6 h-6"/>
                    </button>

                    <button
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="More options"
                    >
                        <MoreHorizontal className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

function AboutSection() {
    const listenerData: ListenerData[] = [
        {
            city: "Paris",
            country: "FR",
            listeners: "9,868,787",
            monthlyListeners: "monthly listeners"
        },
        {
            city: "Mexico City",
            country: "MX",
            listeners: "22,430,353",
            monthlyListeners: "monthly listeners"
        },
        {
            city: "Santiago",
            country: "CL",
            listeners: "Santiago, CL",
            monthlyListeners: "monthly listeners"
        },
        {
            city: "London",
            country: "GB",
            listeners: "London, GB",
            monthlyListeners: "monthly listeners"
        },
        {
            city: "Bogotá",
            country: "CO",
            listeners: "Bogotá, CO",
            monthlyListeners: "monthly listeners"
        }
    ];

    const albumAppearances: AlbumAppearance[] = [
        {
            id: 1,
            title: "Random Access Memories",
            artist: "Daft Punk",
            year: "2013",
            coverArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748218460/Random_Access_ndsnbg.jpg",
            type: "album"
        },
        {
            id: 2,
            title: "Discovery",
            artist: "Daft Punk",
            year: "2001",
            coverArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748387332/discovery_daft_qh5ljq.jpg",
            type: "album"
        },
        {
            id: 3,
            title: "Homework",
            artist: "Daft Punk",
            year: "1997",
            coverArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748387414/daft_homework_h8f2fo.jpg",
            type: "album"
        },
        {
            id: 4,
            title: "Human After All",
            artist: "Daft Punk",
            year: "2005",
            coverArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748388845/human_after_all_xlb0va.jpg",
            type: "album"
        }
    ];

    return (
        <div className="space-y-12">
            {/* Artist's Largest Listeners */}
            <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-8">Artist's Largest Listeners</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {listenerData.map((location, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                                {location.listeners}
                            </div>
                            <div className="text-gray-400 text-sm">
                                {location.monthlyListeners}
                            </div>
                            <div className="text-gray-300 text-sm mt-1">
                                {location.city}, {location.country}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Who Are They Section */}
            <div>
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold">Who Are They?</h2>

                    {/* Rating Badge */}
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
                        <span className="text-lg font-bold">#292</span>
                        <span className="text-xs">in the world</span>
                    </div>
                </div>

                <div className="text-gray-300 leading-relaxed space-y-4">
                    <p>
                        Daft Punk, the enigmatic French electronic music duo consisting of Guy-Manuel de Homem-Christo
                        and Thomas Bangalter,
                        revolutionized the soundscape of the late 20th and early 21st centuries. Emerging from the
                        vibrant Parisian house scene in
                        the early 1990s, they quickly distinguished themselves with a pioneering fusion of house, funk,
                        disco, and techno. Their
                        early work, particularly the seminal album Homework, cemented their status as innovative
                        producers who pushed the
                        boundaries of electronic music, blending raw energy with meticulous production. Beyond their
                        sonic innovations, Daft Punk
                        became synonymous with their iconic robot personas, complete with elaborate helmets and
                        futuristic attire, a visual identity
                        that fostered an aura of mystique and allowed their music to speak for itself.
                    </p>

                    <p>
                        Continuing to evolve throughout their career, Daft Punk's discography reflects a relentless
                        pursuit of artistic excellence. From the
                        anthemic tracks of Discovery to the orchestral grandeur of Random Access Memories, they
                        consistently challenged conventional
                        notions of electronic music. Their influence extends far beyond the dance floor, inspiring
                        countless artists across genres and
                        leaving an indelible mark on popular culture. Though they announced their split in 2021, their
                        legacy endures as a testament to
                        the power of innovation, creativity, and the transformative potential of electronic music.
                    </p>
                </div>
            </div>

            {/* Appears On Section */}
            <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-8">Appears On</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {albumAppearances.map((album) => (
                        <div key={album.id} className="group cursor-pointer">
                            <div className="relative mb-4">
                                <img
                                    src={album.coverArt}
                                    alt={`${album.title} cover`}
                                    className="w-full aspect-square object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                                />

                                {/* Play button overlay */}
                                <div
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                    <button
                                        className="bg-green-500 text-black rounded-full p-3 hover:scale-105 transition-transform"
                                        aria-label={`Play ${album.title}`}
                                    >
                                        <Play className="w-6 h-6 fill-current"/>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-medium truncate group-hover:underline">
                                    {album.title}
                                </h3>
                                <p className="text-gray-400 text-sm truncate">
                                    {album.year} • {album.artist}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface NavigationTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

function NavigationTabs({activeTab, setActiveTab}: NavigationTabsProps) {
    const tabs = ['Home', 'About', 'Albums'];

    return (
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <nav className="flex gap-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm lg:text-base font-medium transition-colors ${
                            activeTab === tab
                                ? 'text-white border-b-2 border-white pb-4'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            <button
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Search"
            >
                <Search className="w-5 h-5"/>
            </button>
        </div>
    );
}

interface SongSectionProps {
    title: string;
    songs: Song[];
}

function SongSection({title, songs}: SongSectionProps) {
    return (
        <div className="mb-12">
            <h2 className="text-xl lg:text-2xl font-bold mb-6">{title}</h2>

            <div className="space-y-2">
                {songs.map((song, index) => (
                    <SongRow key={song.id} song={song} index={index + 1}/>
                ))}
            </div>
        </div>
    );
}

interface SongRowProps {
    song: Song;
    index: number;
}

function SongRow({song, index}: SongRowProps) {
    return (
        <div className="group flex items-center gap-4 p-2 rounded-lg hover:bg-gray-900 transition-colors">
            {/* Track Number */}
            <span className="text-gray-400 text-sm w-6 text-center">
        {index}
      </span>

            {/* Album Art */}
            <img
                src={song.albumArt}
                alt={`${song.album} cover`}
                className="w-12 h-12 rounded object-cover"
            />

            {/* Song Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{song.title}</h3>
                <p className="text-gray-400 text-sm truncate">{song.album}</p>
            </div>

            {/* Duration */}
            <span className="text-gray-400 text-sm">{song.duration}</span>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Like song"
                >
                    <Heart className="w-4 h-4"/>
                </button>

                <button
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Add to playlist"
                >
                    <Plus className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
}

interface SidebarProps {
    artistData: ArtistData;
}

function Sidebar({artistData}: SidebarProps) {
    const tags = ['Funk', 'Electronic music', 'Robotic', 'Catchy', 'Innovative'];

    return (
        <div className="w-full lg:w-80 space-y-8">
            {/* Artist Avatars */}
            <div className="flex justify-center gap-4">
                <img
                    src={artistData.avatar1}
                    alt="Daft Punk member 1"
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover"
                />
                <img
                    src={artistData.avatar2}
                    alt="Daft Punk member 2"
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover"
                />
            </div>

            {/* Bio */}
            <div>
                <p className="text-gray-300 text-sm leading-relaxed">
                    {artistData.bio}
                </p>
            </div>

            {/* Tags */}
            <div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs hover:bg-gray-700 transition-colors cursor-pointer"
                        >
              {tag}
            </span>
                    ))}
                </div>
            </div>


        </div>
    );
}

// Add these interfaces to your existing interfaces
interface Album {
    id: string;
    title: string;
    artist: string;
    year: string;
    type: 'Album' | 'Single' | 'Compilation' | 'EP';
    art: string;
    trackCount?: number;
}

interface AlbumCardProps {
    album: Album;
}

interface AlbumsSectionProps {
    artistData: ArtistData;
}

// Album Card Component for Artist Detail
function ArtistAlbumCard({ album }: AlbumCardProps) {
    const navigate = useNavigate();

    const handleAlbumClick = () => {
        navigate(`/album/${album.id}`);
    };

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
            <div className="relative mb-4">
                <div className="aspect-square overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-200">
                    <img
                        src={album.art}
                        alt={`${album.title} cover`}
                        className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-200"
                    />
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button
                        className="bg-green-500 text-black rounded-full p-3 hover:scale-105 transition-transform shadow-lg"
                        aria-label={`Play ${album.title}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle play functionality
                        }}
                    >
                        <Play className="w-6 h-6 fill-current" />
                    </button>
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="text-white font-medium truncate group-hover:underline">
                    {album.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>{album.year}</span>
                    <span>•</span>
                    <span>{album.type}</span>
                    {album.trackCount && (
                        <>
                            <span>•</span>
                            <span>{album.trackCount} tracks</span>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// Filter Component
function AlbumFilter({
                         activeFilter,
                         setActiveFilter
                     }: {
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}) {
    const filters = ['All', 'Albums', 'Singles', 'Compilations'];

    return (
        <div className="flex items-center gap-2 mb-8">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeFilter === filter
                            ? 'bg-white text-black'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}

// Main Albums Section Component
function AlbumsSection({ artistData }: AlbumsSectionProps) {
    const [activeFilter, setActiveFilter] = useState('All');

    // Mock album data - replace with actual data
    const albums: Album[] = [
        {
            id: 'random-access-memories',
            title: 'Random Access Memories',
            artist: artistData.name,
            year: '2013',
            type: 'Album',
            art: 'https://res.cloudinary.com/dewgvguem/image/upload/v1748218460/Random_Access_ndsnbg.jpg',
            trackCount: 13
        },
        {
            id: 'discovery',
            title: 'Discovery',
            artist: artistData.name,
            year: '2001',
            type: 'Album',
            art: 'https://res.cloudinary.com/dewgvguem/image/upload/v1748387332/discovery_daft_qh5ljq.jpg',
            trackCount: 14
        },
        {
            id: 'homework',
            title: 'Homework',
            artist: artistData.name,
            year: '1997',
            type: 'Album',
            art: 'https://res.cloudinary.com/dewgvguem/image/upload/v1748387414/daft_homework_h8f2fo.jpg',
            trackCount: 16
        },
        {
            id: 'human-after-all',
            title: 'Human After All',
            artist: artistData.name,
            year: '2005',
            type: 'Album',
            art: 'https://res.cloudinary.com/dewgvguem/image/upload/v1748387414/daft_homework_h8f2fo.jpg', // Replace with actual cover
            trackCount: 10
        },
        {
            id: 'get-lucky',
            title: 'Get Lucky',
            artist: artistData.name,
            year: '2013',
            type: 'Single',
            art: 'https://res.cloudinary.com/dewgvguem/image/upload/v1748218460/Random_Access_ndsnbg.jpg'
        },
        {
            id: 'one-more-time',
            title: 'One More Time',
            artist: artistData.name,
            year: '2000',
            type: 'Single',
            art: 'https://res.cloudinary.com/dewgvguem/image/upload/v1748387332/discovery_daft_qh5ljq.jpg'
        },
        {
            id: 'musique-vol1',
            title: 'Musique Vol. 1 1993-2005',
            artist: artistData.name,
            year: '2006',
            type: 'Compilation',
            art: 'https://res.cloudinary.com/dewgvguem/image/upload/v1748387414/daft_homework_h8f2fo.jpg', // Replace with actual cover
            trackCount: 15
        }
    ];

    // Filter albums based on active filter
    const filteredAlbums = albums.filter(album => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Albums') return album.type === 'Album';
        if (activeFilter === 'Singles') return album.type === 'Single';
        if (activeFilter === 'Compilations') return album.type === 'Compilation';
        return true;
    });


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl lg:text-3xl font-bold">Discography</h2>
                <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                    Show all
                </button>
            </div>

            {/* Filter Tabs */}
            <AlbumFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            {/* Albums Grid */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredAlbums.map((album) => (
                    <motion.div key={album.id} variants={cardVariants}>
                        <ArtistAlbumCard album={album} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredAlbums.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No {activeFilter.toLowerCase()} found</p>
                </div>
            )}

        </div>
    );
}

export function ArtistDetailContent() {
    const [activeTab, setActiveTab] = useState('Home');

    // Mock data
    const artistData: ArtistData = {
        name: "Daft Punk",
        monthlyListeners: "23,719,065 monthly listeners",
        heroImage: "https://res.cloudinary.com/dewgvguem/image/upload/v1748386955/breakup_xmdhj2.jpg",
        avatar1: "https://res.cloudinary.com/dewgvguem/image/upload/v1748386495/bangalter_p2evdd.jpg",
        avatar2: "https://res.cloudinary.com/dewgvguem/image/upload/v1748386494/guy_manuel_dsbipt.jpg",
        bio: "Daft Punk was an electronic music duo formed in Paris, France, in 1993, by Guy-Manuel de Homem-Christo and Thomas Bangalter. The duo gained immense popularity for their innovative fusion between house music with funk, disco, and techno, as well as their iconic visual aesthetics, specifically their robot helmets.",
        inLibrarySongs: [
            {
                id: 1,
                title: "Give Life Back To Music",
                album: "Random Access Memories",
                duration: "4:44",
                albumArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748218460/Random_Access_ndsnbg.jpg"
            },
            {
                id: 2,
                title: "Nightvision",
                album: "Discovery",
                duration: "1:45",
                albumArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748387332/discovery_daft_qh5ljq.jpg"
            },
            {
                id: 3,
                title: "Aerodynamic",
                album: "Discovery",
                duration: "3:33",
                albumArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748387332/discovery_daft_qh5ljq.jpg"
            },
            {
                id: 4,
                title: "Revolution 909",
                album: "Homework",
                duration: "5:35",
                albumArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748387414/daft_homework_h8f2fo.jpg"
            }
        ],
        popularSongs: [
            {
                id: 5,
                title: "Get Lucky",
                album: "Random Access Memories",
                duration: "6:09",
                albumArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748218460/Random_Access_ndsnbg.jpg"
            },
            {
                id: 6,
                title: "One More Time",
                album: "Discovery",
                duration: "5:20",
                albumArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748387332/discovery_daft_qh5ljq.jpg"
            },
            {
                id: 7,
                title: "Instant Crush",
                album: "Random Access Memories",
                duration: "5:37",
                albumArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748218460/Random_Access_ndsnbg.jpg"
            },
            {
                id: 8,
                title: "Around The World",
                album: "Homework",
                duration: "7:09",
                albumArt: "https://res.cloudinary.com/dewgvguem/image/upload/v1748387414/daft_homework_h8f2fo.jpg"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-black text-white pb-24">
            {/* Hero Section */}
            <HeroSection artistData={artistData}/>

            {/* Navigation and Content */}
            <div className="px-6 lg:px-8">
                <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {activeTab === 'Home' && (
                            <>
                                <SongSection
                                    title="In Your Library"
                                    songs={artistData.inLibrarySongs}
                                />
                                <SongSection
                                    title="Popular"
                                    songs={artistData.popularSongs}
                                />
                            </>
                        )}

                        {activeTab === 'About' && (
                            <div className={"pb-16"}>
                                <AboutSection/>
                            </div>
                        )}

                        {activeTab === 'Albums' && (
                            <div className={"pb-16"}>
                            <AlbumsSection artistData={artistData} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar - only show on Home tab */}
                    {activeTab === 'Home' && <Sidebar artistData={artistData}/>}
                </div>
            </div>
        </div>
    );
}
