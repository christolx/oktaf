import { Heart, SkipBack, Play, SkipForward, Shuffle, Repeat, Volume2, Monitor, List, MoreHorizontal, ThumbsDown, Bookmark, Bell, Users, Settings, Home, Plus, ChevronLeft, ChevronRight, Search } from 'lucide-react'

// Types
export interface AlbumArt {
    type: 'gradient' | 'image';
    value: string; // gradient classes for 'gradient' type, image URL for 'image' type
    alt?: string; // alt text for images
}

export interface Album {
    id: string;
    title: string;
    artist: string;
    art: AlbumArt;
    duration?: string;
    year?: number;
}

export interface Playlist {
    id: string;
    name: string;
    art: AlbumArt;
    trackCount?: number;
    duration?: string;
}

export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    currentTime: string;
    art: AlbumArt;
    isLiked: boolean;
    isBookmarked: boolean;
}

export interface PlayerState {
    isPlaying: boolean;
    isShuffled: boolean;
    repeatMode: 'off' | 'one' | 'all';
    volume: number;
    progress: number;
}

export interface NavItem {
    id: string;
    label: string;
    href?: string;
}

export interface MusicSection {
    id: string;
    title: string;
    type: 'albums' | 'playlists' | 'artists';
}

// Helper function to create gradient art
const createGradientArt = (gradient: string): AlbumArt => ({
    type: 'gradient',
    value: gradient
});

// Helper function to create image art (for future use)
const createImageArt = (url: string, alt: string): AlbumArt => ({
    type: 'image',
    value: url,
    alt
});

// Navigation Data
export const mainNavItems: NavItem[] = [
    { id: "albums", label: "Albums", href: "/albums" },
    { id: "playlists", label: "Playlists", href: "/playlists" },
    { id: "tracks", label: "Tracks", href: "/tracks" },
];

export const libraryItems: NavItem[] = [
    { id: "albums", label: "Albums", href: "/library/albums" },
    { id: "liked", label: "Liked Songs", href: "/library/liked" },
    { id: "artists", label: "Artists", href: "/library/artists" },
];

// Playlist Data
export const userPlaylists: Playlist[] = [
    {
        id: "p1",
        name: "Upbeat & songs",
        art: createGradientArt("from-purple-500 to-pink-500"),
        trackCount: 47,
        duration: "3h 12m"
    },
    {
        id: "p2",
        name: "Alternative Rock",
        art: createGradientArt("from-blue-500 to-purple-500"),
        trackCount: 32,
        duration: "2h 45m"
    },
    {
        id: "p3",
        name: "My first playlist",
        art: createGradientArt("from-green-500 to-teal-500"),
        trackCount: 15,
        duration: "1h 8m"
    },
    {
        id: "p4",
        name: "Icona pop's full",
        art: createGradientArt("from-orange-500 to-red-500"),
        trackCount: 28,
        duration: "1h 52m"
    },
    {
        id: "p5",
        name: "Lana Del Rey",
        art: createGradientArt("from-pink-500 to-purple-500"),
        trackCount: 23,
        duration: "1h 34m"
    }
];

// Album Data
export const albumsForYou: Album[] = [
    { id: "1", title: "Random Access Memories", artist: "Daft Punk", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748218460/Random_Access_ndsnbg.jpg", "Failed to load album cover."), year: 2013 },
    { id: "2", title: "Meteora", artist: "Linkin Park", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748219123/Meteora_tl9xju.jpg", "Failed to load album cover."), year: 2003 },
    { id: "3", title: "Abbey Road", artist: "The Beatles", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748219293/Abbey_Road_yocoal.jpg", "Failed to load album cover."), year: 1969 },
    { id: "4", title: "The Resistance", artist: "Muse", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748219417/The_Resistance_o2eifj.jpg", "Failed to load album cover."), year: 2009 },
    { id: "5", title: "Minecraft - Volume Alpha", artist: "C418", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748219748/Minecraft_obb11e.jpg", "Failed to load album cover."), year: 2011 },
    { id: "6", title: "Dangerous", artist: "Michael Jackson", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748219879/Dangerous_or4egb.jpg", "Failed to load album cover."), year: 1991 },
    { id: "7", title: "Unknown Pleasures", artist: "Joy Division", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220037/Joy_Division_lbheix.jpg", "Failed to load album cover."), year: 1979 },
    { id: "8", title: "Take Care", artist: "Drake", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220129/take_care_xusisq.jpg", "Failed to load album cover."), year: 2011 },
];

export const nostalgiaAlbums: Album[] = [
    { id: "9", title: "The Eminem Show", artist: "Eminem", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220263/Eminem_Show_miw1ht.jpg", "Failed to load album cover."), year: 2002 },
    { id: "10", title: "American Idiot", artist: "Green Day", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220304/American_Idiot_zubvfy.jpg", "Failed to load album cover."), year: 2004 },
    { id: "11", title: "Back to Black", artist: "Amy Winehouse", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220345/back_to_black_yjhog7.jpg", "Failed to load album cover."), year: 2006 },
    { id: "12", title: "In Rainbows", artist: "Radiohead", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220467/In_rainbow_lxwwup.jpg", "Failed to load album cover."), year: 2007 },
    { id: "13", title: "The Black Parade", artist: "My Chemical Romance", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220524/The_black_parade_cpx8wz.jpg", "Failed to load album cover."), year: 2006 },
    { id: "14", title: "Stadium Arcadium", artist: "Red Hot Chili Peppers", art: createImageArt("https://i.scdn.co/image/ab67616d0000b27309fd83d32aee93dceba78517", "Failed to load album cover."), year: 2006 },
    { id: "15", title: "Whatever People Say I Am", artist: "Arctic Monkeys", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220649/arctic_jgqlpd.jpg", "Failed to load album cover."), year: 2006 },
    { id: "16", title: "Good Girl Gone Bad", artist: "Rihanna", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220694/Rihanna_ipp5cf.jpg", "Failed to load album cover."), year: 2007 },
];

export const trendingAlbums: Album[] = [
    { id: "17", title: "Midnights", artist: "Taylor Swift", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748220990/midnights_tlrh6x.jpg", "Failed to load album cover>"), year: 2022 },
    { id: "18", title: "Renaissance", artist: "Beyoncé", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748221499/Renaissance_aaqmjb.jpg", "Failed to load album cover."), year: 2022 },
    { id: "19", title: "Harry's House", artist: "Harry Styles", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748221560/Harry_House_osv6xu.jpg", "Failed to load album cover."), year: 2022 },
    { id: "20", title: "Un Verano Sin Ti", artist: "Bad Bunny", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748221678/Un_Verano_vxsqio.jpg", "Failed to load album cover."), year: 2022 },
    { id: "21", title: "Dawn FM", artist: "The Weeknd", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748222146/Dawn_FM_qaoprx.jpg", "Failed to load album cover."), year: 2022 },
    { id: "22", title: "Honestly, Nevermind", artist: "Drake", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748222202/Honestly_Nevermind_bcihhe.jpg", "Failed to load album cover."), year: 2022 },
    { id: "23", title: "Mr. Morale & The Big Steppers", artist: "Kendrick Lamar", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748224153/Mr_Morale_rdhtww.jpg", "Failed to load album cover."), year: 2022 },
    { id: "24", title: "Special", artist: "Lizzo", art: createGradientArt("from-pink-500 to-purple-500"), year: 2022 },
];

// Player Data
export const currentTrack: Track = {
    id: "track-1",
    title: "Get Lucky",
    artist: "Daft Punk",
    album: "Random Access Memories",
    duration: "4:08",
    currentTime: "2:23",
    art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748218460/Random_Access_ndsnbg.jpg", "Failed to load album cover."),
    isLiked: true,
    isBookmarked: false,
};

export const initialPlayerState: PlayerState = {
    isPlaying: true,
    isShuffled: false,
    repeatMode: 'off',
    volume: 75,
    progress: 33, // percentage
};

// Section Data
export const musicSections = {
    albumsForYou: {
        id: "albums-for-you",
        title: "Albums For You",
        type: "albums" as const,
    },
    nostalgiaHits: {
        id: "nostalgia-hits",
        title: "Best Albums of 2000s & 2010s Era.",
        type: "albums" as const,
    },
    trendingNow: {
        id: "trending-now",
        title: "Trending Albums Now",
        type: "albums" as const,
    },
} as const;

// Icon Collections (for easier imports)
export const playerIcons = {
    Heart,
    SkipBack,
    Play,
    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    Monitor,
    List,
    MoreHorizontal,
    ThumbsDown,
    Bookmark
};

export const navigationIcons = {
    Bell,
    Users,
    Settings,
    Home,
    Plus,
    ChevronLeft,
    ChevronRight,
    Search,
    MoreHorizontal
};

// Future migration helper (example of how you'd update to images later)
export const albumsWithImages: Album[] = [
    // Example of how you'd add real images later:
    // {
    //   id: "1",
    //   title: "Random Access Memories",
    //   artist: "Daft Punk",
    //   art: createImageArt("/images/albums/daft-punk-ram.jpg", "Random Access Memories album cover"),
    //   year: 2013
    // },
];
