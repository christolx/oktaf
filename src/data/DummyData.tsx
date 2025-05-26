import { Heart, SkipBack, Play, Pause, SkipForward, Shuffle, Repeat, Volume2, Monitor, List, MoreHorizontal, ThumbsDown, Bookmark, Bell, Users, Settings, Home, Plus, ChevronLeft, ChevronRight, Search, VolumeX,  Volume1, PictureInPicture2} from 'lucide-react'

// Types
export interface AlbumArt {
    type: 'gradient' | 'image';
    value: string; // gradient classes for 'gradient' type, image URL for 'image' type
    alt?: string; // alt text for images
}

export interface Track {
    id: string;
    number: number;
    title: string;
    artist: string;
    duration: string;
    plays: number;
    albumId: string;
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

export interface CurrentTrack {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    currentTime: string;
    art: AlbumArt;
    isLiked?: boolean;
    isDisliked?: boolean;
    isBookmarked?: boolean;
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

export const AlternativeRockAlbums: Album[] = [
    { id: "38", title: "Siamese Dream", artist: "The Smashing Pumpkins", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248605/siamese_dream_bs7otx.jpg", "Failed to load album cover."), year: 1993 },
    { id: "39", title: "Mellon Collie and the Infinite Sadness", artist: "The Smashing Pumpkins", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248603/melon_collie_b1i9jh.jpg", "Failed to load album cover."), year: 1995 },
    { id: "33", title: "OK Computer", artist: "Radiohead", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248615/Ok_Comp_hmvu0v.jpg", "Failed to load album cover."), year: 1997 },
    { id: "34", title: "Nevermind", artist: "Nirvana", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248613/nirvana_nevermind_uf3jcv.jpg", "Failed to load album cover."), year: 1991 },
    { id: "35", title: "Doolittle", artist: "Pixies", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248611/Doolittle_kzey3l.jpg", "Failed to load album cover."), year: 1989 },
    { id: "36", title: "Grace", artist: "Jeff Buckley", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248609/Grace_xx5klu.jpg", "Failed to load album cover."), year: 1994 },
    { id: "37", title: "Daydream Nation", artist: "Sonic Youth", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248607/Daydream_nation_thtfnc.jpg", "Failed to load album cover."), year: 1988 },
    { id: "40", title: "Pinkerton", artist: "Weezer", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248602/Pinkerton_tikknk.jpg", "Failed to load album cover."), year: 1996 },
];

export const GothicRockAlbums: Album[] = [
    { id: "41", title: "Disintegration", artist: "The Cure", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248600/Disintegration_vhzerq.jpg", "Failed to load album cover."), year: 1989 },
    { id: "42", title: "Deathconsciousness", artist: "Have a Nice Life", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248598/Deathconsciousness_dwihzq.jpg", "Failed to load album cover."), year: 2008 },
    { id: "43", title: "Closer", artist: "Joy Division", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248597/Joy_Division_Closer_qlwct8.jpg", "Failed to load album cover."), year: 1980 },
    { id: "44", title: "Songs of a Lost World", artist: "The Cure", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248595/Songs_of_a_Lost_World_brfsai.jpg", "Failed to load album cover."), year: 2024 },
    { id: "45", title: "Pornography", artist: "The Cure", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248593/The_Cure_Pornography_usos3r.jpg", "Failed to load album cover."), year: 1982 },
    { id: "46", title: "Juju", artist: "Siouxsie and the Banshees", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248591/Juju_Banshees_qbssc4.jpg", "Failed to load album cover."), year: 1981 },
    { id: "47", title: "The Great Annihilator", artist: "Swans", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248589/Great_Annihilator_bzk6go.jpg", "Failed to load album cover."), year: 1995 },
    { id: "48", title: "Faith", artist: "The Cure", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248588/The_cure_Faith_xbvnai.jpg", "Failed to load album cover."), year: 1981 },
];

export const PopArtAlbums: Album[] = [
    { id: "25", title: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars", artist: "David Bowie", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248586/Ziggy_Stardust_kmxajv.jpg", "Failed to load album cover."), year: 1972 },
    { id: "26", title: "Revolver", artist: "The Beatles", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248584/Revolver_Beatles_etpbap.jpg", "Failed to load album cover."), year: 1966 },
    { id: "27", title: "Post", artist: "Björk", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748253457/Post_bjork_nxiihx.jpg", "Failed to load album cover."), year: 1995 },
    { id: "28", title: "The Queen Is Dead", artist: "The Smiths", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248581/Queen_is_Dead_obxbtk.jpg", "Failed to load album cover."), year: 1986 },
    { id: "29", title: "Blonde", artist: "Frank Ocean", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248580/Frank_Ocean_Blonde_yjquwt.jpg", "Failed to load album cover."), year: 2016 },
    { id: "30", title: "Hounds of Love", artist: "Kate Bush", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748253444/Hounds_of_Love_ks222x.jpg", "Failed to load album cover."), year: 1985 },
    { id: "31", title: "Illinois", artist: "Sufjan Stevens", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748253444/Illinoise_xdugsh.jpg", "Failed to load album cover."), year: 2005 },
    { id: "32", title: "A Moon Shaped Pool", artist: "Radiohead", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748248583/MoonShapedPool_azcy35.jpg", "Failed to load album cover."), year: 2016 },
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
    { id: "24", title: "Special", artist: "Lizzo", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748224183/Special_fxc13u.jpg", "Failed to load album cover."), year: 2022 },
];

// Track Data
export const albumTracks: Record<string, Track[]> = {
    "1": [ // Random Access Memories
        {
            id: "track-1-1",
            number: 1,
            title: "Give Life Back to Music",
            artist: "Daft Punk",
            duration: "4:37",
            plays: 134694315,
            albumId: "1"
        },
        {
            id: "track-1-2",
            number: 2,
            title: "The Game of Love",
            artist: "Daft Punk",
            duration: "2:33",
            plays: 136473918,
            albumId: "1"
        },
        {
            id: "track-1-3",
            number: 3,
            title: "Giorgio by Moroder",
            artist: "Daft Punk",
            duration: "3:01",
            plays: 28534656,
            albumId: "1"
        },
        {
            id: "track-1-4",
            number: 4,
            title: "Within",
            artist: "Daft Punk",
            duration: "2:30",
            plays: 8901657,
            albumId: "1"
        },
        {
            id: "track-1-5",
            number: 5,
            title: "Instant Crush (feat. Julian Casablancas)",
            artist: "Daft Punk, Julian Casablancas",
            duration: "3:00",
            plays: 7981019,
            albumId: "1"
        },
        {
            id: "track-1-6",
            number: 6,
            title: "Lose Yourself to Dance",
            artist: "Daft Punk",
            duration: "3:01",
            plays: 56934125,
            albumId: "1"
        },
        {
            id: "track-1-7",
            number: 7,
            title: "Touch (feat. Paul Williams)",
            artist: "Daft Punk, Paul Williams",
            duration: "8:18",
            plays: 45123789,
            albumId: "1"
        },
        {
            id: "track-1-8",
            number: 8,
            title: "Get Lucky (feat. Pharrell Williams)",
            artist: "Daft Punk, Pharrell Williams",
            duration: "4:08",
            plays: 892456123,
            albumId: "1"
        }
    ]
    // Future albums can be added here with their respective track listings
};

// Player Data
export const currentTrack: CurrentTrack = {
    id: "track-1",
    title: "Get Lucky",
    artist: "Daft Punk",
    album: "Random Access Memories",
    duration: "4:08",
    currentTime: "0:00",
    art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748218460/Random_Access_ndsnbg.jpg", "Failed to load album cover."),
    isLiked: true,
    isDisliked: false,
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
    popArt: {
        id : "pop-art",
        title: "Pop Art",
        type: "albums" as const,
    },
    alternativeRock: {
        id: "alternative-rock",
        title: "Alternative Rock",
        type: "albums" as const,
    },
    gothicRock: {
        id: "gothic-rock",
        title: "Gothic Rock",
        type: "albums" as const,
    }
} as const;

export const formatPlayCount = (plays: number): string => {
    return plays.toLocaleString("en-US")
};

// Helper function to get tracks for an album
export const getAlbumTracks = (albumId: string): Track[] => {
    return albumTracks[albumId] || [];
};

// Helper function to calculate total album duration
export const calculateAlbumDuration = (tracks: Track[]): string => {
    let totalMinutes = 0;
    tracks.forEach(track => {
        const [minutes, seconds] = track.duration.split(':').map(Number);
        totalMinutes += minutes + (seconds / 60);
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
};

// Icon Collections (for easier imports)
export const playerIcons = {
    Heart,
    SkipBack,
    Play,
    Pause,
    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    Monitor,
    List,
    MoreHorizontal,
    ThumbsDown,
    Bookmark,
    VolumeX,
    Volume1,
    PictureInPicture2
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
    MoreHorizontal,
    Play,
    Pause,
    Heart,
    Shuffle,
    List,
    Volume2,
    Monitor,
    ThumbsDown,
    Bookmark,
    Repeat,
    SkipBack,
    SkipForward,
};
