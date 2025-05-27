import { Heart, SkipBack, Play, Pause, SkipForward, Shuffle, Repeat, Volume2, Monitor, List, MoreHorizontal, ThumbsDown, Bookmark, Bell, Users, Settings, Home, Plus, ChevronLeft, ChevronRight, Search, VolumeX,  Volume1, Download, ListMusic, LibraryBig, CopyPlus, Grid3x3} from 'lucide-react'

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
    // Add interaction states to match CurrentTrack
    isLiked?: boolean;
    isDisliked?: boolean;
    isBookmarked?: boolean;
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
    creator?: string; // Add this line
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

// Helper function to create image art (for future use)
export const createImageArt = (url: string, alt: string): AlbumArt => ({
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
        name: "my first playlist",
        creator: "torbob32",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748363194/list_grid_vh5m8a.jpg", "Failed to load user playlist"),
        trackCount: 47,
        duration: "3h 12m"
    },
    {
        id: "p2",
        name: "Alternative Rock",
        creator: "Echo Roberts",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748363276/alt_rock_jfzxm0.png", "Failed to load user playlist"),
        trackCount: 32,
        duration: "2h 45m"
    },
    {
        id: "p3",
        name: "lofi full study",
        creator: "torbob32",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748363406/lofi_study_kvcauz.webp", "Failed to load user playlist"),
        trackCount: 15,
        duration: "1h 8m"
    },
    {
        id: "p4",
        name: "dj tiktok full",
        creator: "torbob32",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748363697/tiktok_grid_gcchvy.webp", "Failed to load user playlist"),
        trackCount: 28,
        duration: "1h 52m"
    },
    {
        id: "p5",
        name: "lebron ai songs",
        creator: "TalentedBlake",
        art: createImageArt("https://res.cloudinary.com/de3hnd3wg/image/upload/v1748356466/1900x1900-000000-80-0-0_jd3qyo.jpg", "Failed to load user playlist"),
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
    { id: "24", title: "Special", artist: "Lizzo", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748224183/Special_fxc13u.jpg", "Failed to load album cover."), year: 2022 },
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

export const savedAlbums : Album[] = [
    { id: "49", title: "Twin Fantasy", artist: "Car Seat Headrest", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372171/twin_fantasy_rrv7la.jpg", "Failed to load album cover."), year: 2018 },
    { id: "50", title: "American Football", artist: "American Football", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372170/american_football_hzxfwr.jpg", "Failed to load album cover."), year: 1999 },
    { id: "51", title: "White Pony", artist: "Deftones", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372170/deftones_white_pony_gqpgga.jpg", "Failed to load album cover."), year: 2000 },
    { id: "52", title: "You'd Prefer an Astronaut", artist: "Hum", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372170/youd_prefer_an_astronaut_tawabk.jpg", "Failed to load album cover."), year: 1995 },
    { id: "53", title: "Clarity", artist: "Jimmy Eat World", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372170/jimmy_eat_world_clarity_f83hi2.jpg", "Failed to load album cover."), year: 1999 },
    { id: "54", title: "My Beautiful Dark Twisted Fantasy", artist: "Kanye West", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372170/mbdtf_jfxk2v.png", "Failed to load album cover."), year: 2010 },
    { id: "55", title: "Turn On the Bright Lights", artist: "Interpol", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372171/Interpol_totbl_vgal8y.jpg", "Failed to load album cover."), year: 2002 },
    { id: "56", title: "Come In", artist: "Weatherday", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372169/weatherday_comein_bfrerm.jpg", "Failed to load album cover."), year: 2019 },
    { id: "57", title: "Funeral", artist: "Arcade Fire", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372169/arcade_fire_funeral_adllxt.jpg", "Failed to load album cover."), year: 2004 },
    { id: "58", title: "You're Living All Over Me", artist: "Dinosaur Jr.", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372170/living_all_over_me_yftvvr.jpg", "Failed to load album cover."), year: 1987 },
    { id: "59", title: "Inlet", artist: "Hum", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372169/hum_inlet_wfrvep.jpg", "Failed to load album cover."), year: 2020 },
    { id: "60", title: "Graduation", artist: "Kanye West", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372169/kanye_graduation_r4zq4c.jpg", "Failed to load album cover."), year: 2007 },
    { id: "61", title: "The World Is Yours", artist: "Mass of the Fermenting Dregs", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372168/mass_of_fermenting_world_is_yours_uwflh0.jpg", "Failed to load album cover."), year: 2009 },
    { id: "62", title: "Hybrid Theory", artist: "Linkin Park", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372168/hybrid_theory_yl81pd.jpg", "Failed to load album cover."), year: 2000 },
    { id: "63", title: "Oracular Spectacular", artist: "MGMT", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372168/oracular_spectacular_mgmt_zdmrfx.jpg", "Failed to load album cover."), year: 2007 },
    { id: "64", title: "Loveless", artist: "My Bloody Valentine", art: createImageArt("https://res.cloudinary.com/dewgvguem/image/upload/v1748372168/mbv_loveless_kleuty.jpg", "Failed to load album cover."), year: 1991 }
]

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
            albumId: "1",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-1-2",
            number: 2,
            title: "The Game of Love",
            artist: "Daft Punk",
            duration: "2:33",
            plays: 136473918,
            albumId: "1",
            isLiked: true, // Example: this track is liked
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-1-3",
            number: 3,
            title: "Giorgio by Moroder",
            artist: "Daft Punk",
            duration: "3:01",
            plays: 28534656,
            albumId: "1",
            isLiked: false,
            isDisliked: false,
            isBookmarked: true // Example: this track is bookmarked
        },
        {
            id: "track-1-4",
            number: 4,
            title: "Within",
            artist: "Daft Punk",
            duration: "2:30",
            plays: 8901657,
            albumId: "1",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-1-5",
            number: 5,
            title: "Instant Crush (feat. Julian Casablancas)",
            artist: "Daft Punk, Julian Casablancas",
            duration: "3:00",
            plays: 7981019,
            albumId: "1",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-1-6",
            number: 6,
            title: "Lose Yourself to Dance",
            artist: "Daft Punk",
            duration: "3:01",
            plays: 56934125,
            albumId: "1",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-1-7",
            number: 7,
            title: "Touch (feat. Paul Williams)",
            artist: "Daft Punk, Paul Williams",
            duration: "8:18",
            plays: 45123789,
            albumId: "1",
            isLiked: false,
            isDisliked: false,
            isBookmarked: true // bookmarked
        },
        {
            id: "track-1-8",
            number: 8,
            title: "Get Lucky (feat. Pharrell Williams)",
            artist: "Daft Punk, Pharrell Williams",
            duration: "4:08",
            plays: 892456123,
            albumId: "1",
            isLiked: true, // liked
            isDisliked: false,
            isBookmarked: false
        },
    ],
    "2": [ // Meteora - Linkin Park
        {
            id: "track-2-1",
            number: 1,
            title: "Foreword",
            artist: "Linkin Park",
            duration: "0:13",
            plays: 45234567,
            albumId: "2",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-2",
            number: 2,
            title: "Don't Stay",
            artist: "Linkin Park",
            duration: "3:07",
            plays: 67891234,
            albumId: "2",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-3",
            number: 3,
            title: "Somewhere I Belong",
            artist: "Linkin Park",
            duration: "3:33",
            plays: 156789012,
            albumId: "2",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-4",
            number: 4,
            title: "Lying from You",
            artist: "Linkin Park",
            duration: "2:55",
            plays: 89012345,
            albumId: "2",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-5",
            number: 5,
            title: "Hit the Floor",
            artist: "Linkin Park",
            duration: "2:44",
            plays: 78901234,
            albumId: "2",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-6",
            number: 6,
            title: "Easier to Run",
            artist: "Linkin Park",
            duration: "3:24",
            plays: 92345678,
            albumId: "2",
            isLiked: false,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-2-7",
            number: 7,
            title: "Faint",
            artist: "Linkin Park",
            duration: "2:42",
            plays: 234567890,
            albumId: "2",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-8",
            number: 8,
            title: "Figure.09",
            artist: "Linkin Park",
            duration: "3:17",
            plays: 67890123,
            albumId: "2",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-9",
            number: 9,
            title: "Breaking the Habit",
            artist: "Linkin Park",
            duration: "3:16",
            plays: 189012345,
            albumId: "2",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-2-10",
            number: 10,
            title: "From the Inside",
            artist: "Linkin Park",
            duration: "2:53",
            plays: 56789012,
            albumId: "2",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-11",
            number: 11,
            title: "Nobody's Listening",
            artist: "Linkin Park",
            duration: "2:58",
            plays: 45678901,
            albumId: "2",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-12",
            number: 12,
            title: "Session",
            artist: "Linkin Park",
            duration: "2:23",
            plays: 34567890,
            albumId: "2",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-2-13",
            number: 13,
            title: "Numb",
            artist: "Linkin Park",
            duration: "3:07",
            plays: 445678901,
            albumId: "2",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ],
    "38": [ // Siamese Dream - The Smashing Pumpkins
        {
            id: "track-38-1",
            number: 1,
            title: "Cherub Rock",
            artist: "The Smashing Pumpkins",
            duration: "4:58",
            plays: 78901234,
            albumId: "38",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-38-2",
            number: 2,
            title: "Quiet",
            artist: "The Smashing Pumpkins",
            duration: "3:41",
            plays: 45678901,
            albumId: "38",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-38-3",
            number: 3,
            title: "Today",
            artist: "The Smashing Pumpkins",
            duration: "3:16",
            plays: 123456789,
            albumId: "38",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-38-4",
            number: 4,
            title: "Hummer",
            artist: "The Smashing Pumpkins",
            duration: "6:57",
            plays: 34567890,
            albumId: "38",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-38-5",
            number: 5,
            title: "Rocket",
            artist: "The Smashing Pumpkins",
            duration: "4:06",
            plays: 56789012,
            albumId: "38",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-38-6",
            number: 6,
            title: "Disarm",
            artist: "The Smashing Pumpkins",
            duration: "3:17",
            plays: 98765432,
            albumId: "38",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-38-7",
            number: 7,
            title: "Soma",
            artist: "The Smashing Pumpkins",
            duration: "6:40",
            plays: 67890123,
            albumId: "38",
            isLiked: false,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-38-8",
            number: 8,
            title: "Geek U.S.A.",
            artist: "The Smashing Pumpkins",
            duration: "5:13",
            plays: 45678901,
            albumId: "38",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-38-9",
            number: 9,
            title: "Mayonaise",
            artist: "The Smashing Pumpkins",
            duration: "5:49",
            plays: 78901234,
            albumId: "38",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-38-10",
            number: 10,
            title: "Spaceboy",
            artist: "The Smashing Pumpkins",
            duration: "4:28",
            plays: 23456789,
            albumId: "38",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-38-11",
            number: 11,
            title: "Silverfuck",
            artist: "The Smashing Pumpkins",
            duration: "8:43",
            plays: 34567890,
            albumId: "38",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-38-12",
            number: 12,
            title: "Sweet Sweet",
            artist: "The Smashing Pumpkins",
            duration: "1:38",
            plays: 12345678,
            albumId: "38",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-38-13",
            number: 13,
            title: "Luna",
            artist: "The Smashing Pumpkins",
            duration: "3:20",
            plays: 45678901,
            albumId: "38",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "39": [ // Mellon Collie and the Infinite Sadness - The Smashing Pumpkins
        {
            id: "track-39-1",
            number: 1,
            title: "Mellon Collie and the Infinite Sadness",
            artist: "The Smashing Pumpkins",
            duration: "2:52",
            plays: 56789012,
            albumId: "39",
            isLiked: false,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-39-2",
            number: 2,
            title: "Tonight, Tonight",
            artist: "The Smashing Pumpkins",
            duration: "4:14",
            plays: 145678901,
            albumId: "39",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-39-3",
            number: 3,
            title: "Jellybelly",
            artist: "The Smashing Pumpkins",
            duration: "3:01",
            plays: 34567890,
            albumId: "39",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-39-4",
            number: 4,
            title: "Zero",
            artist: "The Smashing Pumpkins",
            duration: "2:41",
            plays: 89012345,
            albumId: "39",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-39-5",
            number: 5,
            title: "Here Is No Why",
            artist: "The Smashing Pumpkins",
            duration: "3:44",
            plays: 23456789,
            albumId: "39",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-39-6",
            number: 6,
            title: "Bullet with Butterfly Wings",
            artist: "The Smashing Pumpkins",
            duration: "4:18",
            plays: 178901234,
            albumId: "39",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-39-7",
            number: 7,
            title: "To Forgive",
            artist: "The Smashing Pumpkins",
            duration: "4:17",
            plays: 12345678,
            albumId: "39",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-39-8",
            number: 8,
            title: "Fuck You (An Ode to No One)",
            artist: "The Smashing Pumpkins",
            duration: "4:51",
            plays: 45678901,
            albumId: "39",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-39-9",
            number: 9,
            title: "Love",
            artist: "The Smashing Pumpkins",
            duration: "4:21",
            plays: 34567890,
            albumId: "39",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-39-10",
            number: 10,
            title: "Cupid de Locke",
            artist: "The Smashing Pumpkins",
            duration: "2:50",
            plays: 23456789,
            albumId: "39",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "3": [ // Abbey Road - The Beatles
        {
            id: "track-3-1",
            number: 1,
            title: "Come Together",
            artist: "The Beatles",
            duration: "4:20",
            plays: 234567890,
            albumId: "3",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-2",
            number: 2,
            title: "Something",
            artist: "The Beatles",
            duration: "3:03",
            plays: 189012345,
            albumId: "3",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-3-3",
            number: 3,
            title: "Maxwell's Silver Hammer",
            artist: "The Beatles",
            duration: "3:27",
            plays: 67890123,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-4",
            number: 4,
            title: "Oh! Darling",
            artist: "The Beatles",
            duration: "3:26",
            plays: 89012345,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-5",
            number: 5,
            title: "Octopus's Garden",
            artist: "The Beatles",
            duration: "2:51",
            plays: 78901234,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-6",
            number: 6,
            title: "I Want You (She's So Heavy)",
            artist: "The Beatles",
            duration: "7:47",
            plays: 123456789,
            albumId: "3",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-3-7",
            number: 7,
            title: "Here Comes the Sun",
            artist: "The Beatles",
            duration: "3:05",
            plays: 345678901,
            albumId: "3",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-3-8",
            number: 8,
            title: "Because",
            artist: "The Beatles",
            duration: "2:45",
            plays: 56789012,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-9",
            number: 9,
            title: "You Never Give Me Your Money",
            artist: "The Beatles",
            duration: "3:55",
            plays: 45678901,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-10",
            number: 10,
            title: "Sun King",
            artist: "The Beatles",
            duration: "2:26",
            plays: 34567890,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-11",
            number: 11,
            title: "Mean Mr. Mustard",
            artist: "The Beatles",
            duration: "1:06",
            plays: 23456789,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-12",
            number: 12,
            title: "Polythene Pam",
            artist: "The Beatles",
            duration: "1:12",
            plays: 34567890,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-13",
            number: 13,
            title: "She Came in Through the Bathroom Window",
            artist: "The Beatles",
            duration: "1:57",
            plays: 45678901,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-14",
            number: 14,
            title: "Golden Slumbers",
            artist: "The Beatles",
            duration: "1:31",
            plays: 67890123,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-3-15",
            number: 15,
            title: "Carry That Weight",
            artist: "The Beatles",
            duration: "1:36",
            plays: 56789012,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-3-16",
            number: 16,
            title: "The End",
            artist: "The Beatles",
            duration: "2:05",
            plays: 89012345,
            albumId: "3",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-3-17",
            number: 17,
            title: "Her Majesty",
            artist: "The Beatles",
            duration: "0:23",
            plays: 12345678,
            albumId: "3",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "33": [ // OK Computer - Radiohead
        {
            id: "track-33-1",
            number: 1,
            title: "Airbag",
            artist: "Radiohead",
            duration: "4:44",
            plays: 89012345,
            albumId: "33",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-33-2",
            number: 2,
            title: "Paranoid Android",
            artist: "Radiohead",
            duration: "6:23",
            plays: 167890123,
            albumId: "33",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-33-3",
            number: 3,
            title: "Subterranean Homesick Alien",
            artist: "Radiohead",
            duration: "4:27",
            plays: 45678901,
            albumId: "33",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-33-4",
            number: 4,
            title: "Exit Music (For a Film)",
            artist: "Radiohead",
            duration: "4:24",
            plays: 123456789,
            albumId: "33",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-33-5",
            number: 5,
            title: "Let Down",
            artist: "Radiohead",
            duration: "4:59",
            plays: 78901234,
            albumId: "33",
            isLiked: false,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-33-6",
            number: 6,
            title: "Karma Police",
            artist: "Radiohead",
            duration: "4:21",
            plays: 234567890,
            albumId: "33",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-33-7",
            number: 7,
            title: "Fitter Happier",
            artist: "Radiohead",
            duration: "1:57",
            plays: 34567890,
            albumId: "33",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-33-8",
            number: 8,
            title: "Electioneering",
            artist: "Radiohead",
            duration: "3:50",
            plays: 56789012,
            albumId: "33",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-33-9",
            number: 9,
            title: "Climbing Up the Walls",
            artist: "Radiohead",
            duration: "4:45",
            plays: 67890123,
            albumId: "33",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-33-10",
            number: 10,
            title: "No Surprises",
            artist: "Radiohead",
            duration: "3:48",
            plays: 145678901,
            albumId: "33",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        },
        {
            id: "track-33-11",
            number: 11,
            title: "Lucky",
            artist: "Radiohead",
            duration: "4:19",
            plays: 89012345,
            albumId: "33",
            isLiked: false,
            isDisliked: false,
            isBookmarked: true
        },
        {
            id: "track-33-12",
            number: 12,
            title: "The Tourist",
            artist: "Radiohead",
            duration: "5:24",
            plays: 78901234,
            albumId: "33",
            isLiked: false,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    // ---- ALBUMS FOR YOU ----
    "4": [ // The Resistance - Muse
        {
            id: "track-4-1",
            number: 1,
            title: "Uprising",
            artist: "Muse",
            duration: "5:04",
            plays: 320000000,
            albumId: "4",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "5": [ // Minecraft - Volume Alpha - C418
        {
            id: "track-5-1",
            number: 1,
            title: "Sweden",
            artist: "C418",
            duration: "3:54",
            plays: 210000000,
            albumId: "5",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "6": [ // Dangerous - Michael Jackson
        {
            id: "track-6-1",
            number: 1,
            title: "Black or White",
            artist: "Michael Jackson",
            duration: "4:16",
            plays: 380000000,
            albumId: "6",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "7": [ // Unknown Pleasures - Joy Division
        {
            id: "track-7-1",
            number: 1,
            title: "Disorder",
            artist: "Joy Division",
            duration: "3:32",
            plays: 65000000,
            albumId: "7",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "8": [ // Take Care - Drake
        {
            id: "track-8-1",
            number: 1,
            title: "Take Care (feat. Rihanna)",
            artist: "Drake, Rihanna",
            duration: "4:37",
            plays: 520000000,
            albumId: "8",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],

    // ---- ALTERNATIVE ROCK ALBUMS ----
    "34": [ // Nevermind - Nirvana
        {
            id: "track-34-1",
            number: 1,
            title: "Smells Like Teen Spirit",
            artist: "Nirvana",
            duration: "5:01",
            plays: 850000000,
            albumId: "34",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ],
    "35": [ // Doolittle - Pixies
        {
            id: "track-35-1",
            number: 1,
            title: "Here Comes Your Man",
            artist: "Pixies",
            duration: "3:21",
            plays: 96000000,
            albumId: "35",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "36": [ // Grace - Jeff Buckley
        {
            id: "track-36-1",
            number: 1,
            title: "Hallelujah",
            artist: "Jeff Buckley",
            duration: "6:53",
            plays: 430000000,
            albumId: "36",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ],
    "37": [ // Daydream Nation - Sonic Youth
        {
            id: "track-37-1",
            number: 1,
            title: "Teen Age Riot",
            artist: "Sonic Youth",
            duration: "6:57",
            plays: 70000000,
            albumId: "37",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "40": [ // Pinkerton - Weezer
        {
            id: "track-40-1",
            number: 1,
            title: "El Scorcho",
            artist: "Weezer",
            duration: "4:03",
            plays: 48000000,
            albumId: "40",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],

    // ---- GOTHIC ROCK ALBUMS ----
    "41": [ // Disintegration - The Cure
        {
            id: "track-41-1",
            number: 1,
            title: "Pictures of You",
            artist: "The Cure",
            duration: "7:28",
            plays: 112000000,
            albumId: "41",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "42": [ // Deathconsciousness - Have a Nice Life
        {
            id: "track-42-1",
            number: 1,
            title: "Bloodhail",
            artist: "Have a Nice Life",
            duration: "5:40",
            plays: 33000000,
            albumId: "42",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "43": [ // Closer - Joy Division
        {
            id: "track-43-1",
            number: 1,
            title: "Isolation",
            artist: "Joy Division",
            duration: "2:52",
            plays: 42000000,
            albumId: "43",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "44": [ // Songs of a Lost World - The Cure
        {
            id: "track-44-1",
            number: 1,
            title: "Endsong",
            artist: "The Cure",
            duration: "7:23",
            plays: 28000000,
            albumId: "44",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "45": [ // Pornography - The Cure
        {
            id: "track-45-1",
            number: 1,
            title: "The Hanging Garden",
            artist: "The Cure",
            duration: "4:21",
            plays: 34000000,
            albumId: "45",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "46": [ // Juju - Siouxsie and the Banshees
        {
            id: "track-46-1",
            number: 1,
            title: "Spellbound",
            artist: "Siouxsie and the Banshees",
            duration: "3:18",
            plays: 25000000,
            albumId: "46",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "47": [ // The Great Annihilator - Swans
        {
            id: "track-47-1",
            number: 1,
            title: "Celebrity Lifestyle",
            artist: "Swans",
            duration: "4:35",
            plays: 12000000,
            albumId: "47",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "48": [ // Faith - The Cure
        {
            id: "track-48-1",
            number: 1,
            title: "Primary",
            artist: "The Cure",
            duration: "3:36",
            plays: 22000000,
            albumId: "48",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],

    // ---- POP ART ALBUMS ----
    "25": [ // Ziggy Stardust - David Bowie
        {
            id: "track-25-1",
            number: 1,
            title: "Starman",
            artist: "David Bowie",
            duration: "4:16",
            plays: 185000000,
            albumId: "25",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "26": [ // Revolver - The Beatles
        {
            id: "track-26-1",
            number: 1,
            title: "Eleanor Rigby",
            artist: "The Beatles",
            duration: "2:08",
            plays: 145000000,
            albumId: "26",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "27": [ // Post - Björk
        {
            id: "track-27-1",
            number: 1,
            title: "It's Oh So Quiet",
            artist: "Björk",
            duration: "3:39",
            plays: 52000000,
            albumId: "27",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "28": [ // The Queen Is Dead - The Smiths
        {
            id: "track-28-1",
            number: 1,
            title: "There Is a Light That Never Goes Out",
            artist: "The Smiths",
            duration: "4:02",
            plays: 107000000,
            albumId: "28",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ],
    "29": [ // Blonde - Frank Ocean
        {
            id: "track-29-1",
            number: 1,
            title: "Nights",
            artist: "Frank Ocean",
            duration: "5:07",
            plays: 260000000,
            albumId: "29",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "30": [ // Hounds of Love - Kate Bush
        {
            id: "track-30-1",
            number: 1,
            title: "Running Up That Hill (A Deal with God)",
            artist: "Kate Bush",
            duration: "5:00",
            plays: 500000000,
            albumId: "30",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ],
    "31": [ // Illinois - Sufjan Stevens
        {
            id: "track-31-1",
            number: 1,
            title: "Chicago",
            artist: "Sufjan Stevens",
            duration: "6:04",
            plays: 87000000,
            albumId: "31",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "32": [ // A Moon Shaped Pool - Radiohead
        {
            id: "track-32-1",
            number: 1,
            title: "Burn the Witch",
            artist: "Radiohead",
            duration: "3:41",
            plays: 91000000,
            albumId: "32",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],

    // ---- NOSTALGIA ALBUMS ----
    "9": [ // The Eminem Show - Eminem
        {
            id: "track-9-1",
            number: 1,
            title: "Without Me",
            artist: "Eminem",
            duration: "4:50",
            plays: 680000000,
            albumId: "9",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "10": [ // American Idiot - Green Day
        {
            id: "track-10-1",
            number: 1,
            title: "Boulevard of Broken Dreams",
            artist: "Green Day",
            duration: "4:20",
            plays: 540000000,
            albumId: "10",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ],
    "11": [ // Back to Black - Amy Winehouse
        {
            id: "track-11-1",
            number: 1,
            title: "Rehab",
            artist: "Amy Winehouse",
            duration: "3:34",
            plays: 380000000,
            albumId: "11",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "12": [ // In Rainbows - Radiohead
        {
            id: "track-12-1",
            number: 1,
            title: "Nude",
            artist: "Radiohead",
            duration: "4:15",
            plays: 75000000,
            albumId: "12",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "13": [ // The Black Parade - My Chemical Romance
        {
            id: "track-13-1",
            number: 1,
            title: "Welcome to the Black Parade",
            artist: "My Chemical Romance",
            duration: "5:11",
            plays: 420000000,
            albumId: "13",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ],
    "14": [ // Stadium Arcadium - Red Hot Chili Peppers
        {
            id: "track-14-1",
            number: 1,
            title: "Dani California",
            artist: "Red Hot Chili Peppers",
            duration: "4:42",
            plays: 380000000,
            albumId: "14",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "15": [ // Whatever People Say I Am - Arctic Monkeys
        {
            id: "track-15-1",
            number: 1,
            title: "I Bet You Look Good on the Dancefloor",
            artist: "Arctic Monkeys",
            duration: "2:53",
            plays: 320000000,
            albumId: "15",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "16": [ // Good Girl Gone Bad - Rihanna
        {
            id: "track-16-1",
            number: 1,
            title: "Umbrella (feat. Jay-Z)",
            artist: "Rihanna, Jay-Z",
            duration: "4:36",
            plays: 670000000,
            albumId: "16",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],

    // ---- TRENDING ALBUMS ----
    "17": [ // Midnights - Taylor Swift
        {
            id: "track-17-1",
            number: 1,
            title: "Anti-Hero",
            artist: "Taylor Swift",
            duration: "3:20",
            plays: 620000000,
            albumId: "17",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "18": [ // Renaissance - Beyoncé
        {
            id: "track-18-1",
            number: 1,
            title: "CUFF IT",
            artist: "Beyoncé",
            duration: "3:45",
            plays: 210000000,
            albumId: "18",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "19": [ // Harry's House - Harry Styles
        {
            id: "track-19-1",
            number: 1,
            title: "As It Was",
            artist: "Harry Styles",
            duration: "2:47",
            plays: 950000000,
            albumId: "19",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ],
    "20": [ // Un Verano Sin Ti - Bad Bunny
        {
            id: "track-20-1",
            number: 1,
            title: "Tití Me Preguntó",
            artist: "Bad Bunny",
            duration: "4:03",
            plays: 800000000,
            albumId: "20",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "21": [ // Dawn FM - The Weeknd
        {
            id: "track-21-1",
            number: 1,
            title: "Save Your Tears",
            artist: "The Weeknd",
            duration: "3:35",
            plays: 850000000,
            albumId: "21",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "22": [ // Honestly, Nevermind - Drake
        {
            id: "track-22-1",
            number: 1,
            title: "Sticky",
            artist: "Drake",
            duration: "4:03",
            plays: 130000000,
            albumId: "22",
            isLiked: true,
            isDisliked: false,
            isBookmarked: false
        }
    ],
    "23": [ // Mr. Morale & The Big Steppers - Kendrick Lamar
        {
            id: "track-23-1",
            number: 1,
            title: "N95",
            artist: "Kendrick Lamar",
            duration: "3:16",
            plays: 120000000,
            albumId: "23",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ],
    "24": [ // Special - Lizzo
        {
            id: "track-24-1",
            number: 1,
            title: "About Damn Time",
            artist: "Lizzo",
            duration: "3:12",
            plays: 300000000,
            albumId: "24",
            isLiked: true,
            isDisliked: false,
            isBookmarked: true
        }
    ]
};

// Player Data - Updated to match track data
export const currentTrack: CurrentTrack = {
    id: "track-1-8",
    title: "Get Lucky (feat. Pharrell Williams)",
    artist: "Daft Punk, Pharrell Williams",
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
    // Add debugging here too
    const tracks = albumTracks[albumId] || []
    return tracks
}

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

// Helper function to convert Track to CurrentTrack
export const trackToCurrentTrack = (track: Track, albumTitle: string, albumArt: AlbumArt): CurrentTrack => {
    return {
        id: track.id,
        title: track.title,
        artist: track.artist,
        album: albumTitle,
        duration: track.duration,
        currentTime: "0:00",
        art: albumArt,
        isLiked: track.isLiked || false,
        isDisliked: track.isDisliked || false,
        isBookmarked: track.isBookmarked || false,
    };
};

// Helper function to find album by track ID
export const findAlbumByTrackId = (trackId: string): Album | null => {
    const allAlbums = [
        ...albumsForYou,
        ...nostalgiaAlbums,
        ...trendingAlbums,
        ...PopArtAlbums,
        ...AlternativeRockAlbums,
        ...GothicRockAlbums
    ];

    for (const album of allAlbums) {
        const tracks = getAlbumTracks(album.id);
        if (tracks.some(track => track.id === trackId)) {
            return album;
        }
    }
    return null;
};

// Helper function to update track interaction states
export const updateTrackInteraction = (
    trackId: string,
    interaction: 'like' | 'dislike' | 'bookmark',
    value: boolean
): void => {
    for (const albumId in albumTracks) {
        const tracks = albumTracks[albumId];
        const trackIndex = tracks.findIndex(track => track.id === trackId);

        if (trackIndex !== -1) {
            switch (interaction) {
                case 'like':
                    albumTracks[albumId][trackIndex].isLiked = value;
                    if (value) albumTracks[albumId][trackIndex].isDisliked = false;
                    break;
                case 'dislike':
                    albumTracks[albumId][trackIndex].isDisliked = value;
                    if (value) albumTracks[albumId][trackIndex].isLiked = false;
                    break;
                case 'bookmark':
                    albumTracks[albumId][trackIndex].isBookmarked = value;
                    break;
            }
            break;
        }
    }
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
    ListMusic,
    LibraryBig,
    CopyPlus
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
    Download,
    Grid3x3
};
