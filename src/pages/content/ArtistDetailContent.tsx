// pages/content/ArtistDetailContent.tsx
import { useState } from 'react';
import { Play, Heart, Plus, MoreHorizontal, Search, Bookmark } from 'lucide-react';

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

function HeroSection({ artistData }: HeroSectionProps) {
    return (
        <div
            className="relative h-80 lg:h-96 bg-cover bg-[center_35%]"
            style={{ backgroundImage: `url(${artistData.heroImage})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/80 to-black/60 pointer-events-none" />

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
                        <Play className="w-6 h-6 fill-current" />
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
                        <Bookmark className="w-6 h-6" />
                    </button>

                    <button
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="More options"
                    >
                        <MoreHorizontal className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

interface NavigationTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

function NavigationTabs({ activeTab, setActiveTab }: NavigationTabsProps) {
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
                <Search className="w-5 h-5" />
            </button>
        </div>
    );
}

interface SongSectionProps {
    title: string;
    songs: Song[];
}

function SongSection({ title, songs }: SongSectionProps) {
    return (
        <div className="mb-12">
            <h2 className="text-xl lg:text-2xl font-bold mb-6">{title}</h2>

            <div className="space-y-2">
                {songs.map((song, index) => (
                    <SongRow key={song.id} song={song} index={index + 1} />
                ))}
            </div>
        </div>
    );
}

interface SongRowProps {
    song: Song;
    index: number;
}

function SongRow({ song, index }: SongRowProps) {
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
                    <Heart className="w-4 h-4" />
                </button>

                <button
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Add to playlist"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

interface SidebarProps {
    artistData: ArtistData;
}

function Sidebar({ artistData }: SidebarProps) {
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
            <HeroSection artistData={artistData} />

            {/* Navigation and Content */}
            <div className="px-6 lg:px-8">
                <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        <SongSection
                            title="In Your Library"
                            songs={artistData.inLibrarySongs}
                        />
                        <SongSection
                            title="Popular"
                            songs={artistData.popularSongs}
                        />
                    </div>

                    {/* Sidebar */}
                    <Sidebar artistData={artistData} />
                </div>
            </div>
        </div>
    );
}
