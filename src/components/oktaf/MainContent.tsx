// components/oktaf/MainContent.tsx
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/ui/AlbumArt'

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

const { ChevronLeft, ChevronRight, MoreHorizontal} = navigationIcons;

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


function AlbumCard({ album }: AlbumCardProps) {
    const navigate = useNavigate()

    const handleAlbumClick = () => {
        navigate(`/album/${album.id}`)
    }

    return (
        <div className="group cursor-pointer" onClick={handleAlbumClick}>
            <div className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <AlbumArt
                    art={album.art}
                    className="w-full h-full group-hover:brightness-110 transition-all duration-200"
                />
            </div>
            <div className="space-y-1">
                <h4 className="text-white text-sm font-medium truncate">{album.title}</h4>
                <p className="text-white/60 text-xs truncate">{album.artist}</p>
            </div>
        </div>
    )
}

function PlaylistCard({ playlist }: PlaylistCardProps) {
    const navigate = useNavigate()

    const handlePlaylistClick = () => {
        navigate(`/playlist/${playlist.id}`)
    }

    return (
        <div className="group cursor-pointer" onClick={handlePlaylistClick}>
            <div className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
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

// --- TrackCard Component (Remains refactored to look like AlbumCard) ---
interface TrackCardProps {
    track: Track; // The track data
    album: Album; // The associated album data for art, etc.
}

function TrackCard({ track, album }: TrackCardProps) {
    const handleTrackClick = () => {
        // Example: navigate to track details page or trigger playback
        console.log(`Clicked track: ${track.title} by ${track.artist} from album ${album.title}`);
        // navigate(`/track/${track.id}`); // Requires a track details route
    };

    return (
        // Outer div structure matches AlbumCard for grid placement
        <div className="group cursor-pointer" onClick={handleTrackClick}>
            {/* Art area matches AlbumCard aspect ratio and hover effects */}
            <div className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                {/* Use album art from the associated album */}
                <AlbumArt
                    art={album.art}
                    className="w-full h-full group-hover:brightness-110 transition-all duration-200"
                    size="lg" // Use a larger size for the square layout
                />
                {/* Optional: Add a play button overlay on hover */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {/* Replace with a proper play button icon */}
                    {/* <PlayIcon className="w-12 h-12 text-white" /> */}
                </div>
            </div>
            {/* Text area matches AlbumCard layout */}
            <div className="space-y-1">
                {/* Display Track Title */}
                <h4 className="text-white text-sm font-medium truncate">{track.title}</h4>
                {/* Display Track Artist */}
                <p className="text-white/60 text-xs truncate">{track.artist}</p>
                {/* Optional: Could display album title here if desired */}
                {/* <p className="text-white/40 text-xs truncate">{album.title}</p> */}
            </div>
        </div>
    )
}

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">{title}</h2>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

function AlbumsView() {
    return (
        <div className="space-y-12">

            {/* Albums for You */}
            <section>
                <SectionHeader title={musicSections.albumsForYou.title} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {albumsForYou.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </section>

            {/* Alternative Rock Albums */}
            <section>
                <SectionHeader title={musicSections.alternativeRock.title} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {AlternativeRockAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </section>

            {/* Gothic Rock Albums */}
            <section>
                <SectionHeader title={musicSections.gothicRock.title} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {GothicRockAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </section>

            {/* Pop Art Albums */}
            <section>
                <SectionHeader title={musicSections.popArt.title} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {PopArtAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </section>

            {/* Best Albums of 00s & 10s */}
            <section>
                <SectionHeader title={musicSections.nostalgiaHits.title} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {nostalgiaAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </section>

            {/* Trending Albums Now */}
            <section>
                <SectionHeader title={musicSections.trendingNow.title} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {trendingAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </section>

        </div>
    )
}

function PlaylistsView() {
    return (
        <div className="space-y-12">
            <section>
                <SectionHeader title="Your Playlists" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {userPlaylists.map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            </section>

            <section>
                <SectionHeader title="Recommended Playlists" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {userPlaylists.slice(0, 4).map((playlist) => (
                        <PlaylistCard key={`rec-${playlist.id}`} playlist={playlist} />
                    ))}
                </div>
            </section>
        </div>
    )
}

// --- Updated TracksView Component with Random Shuffle ---
function TracksView() {
    // Combine all album data into a single array for easy lookup
    const allAlbums: Album[] = [
        ...albumsForYou,
        ...nostalgiaAlbums,
        ...trendingAlbums,
        ...PopArtAlbums,
        ...AlternativeRockAlbums,
        ...GothicRockAlbums,
        // Include any other album lists you might add later
    ];

    // Filter and map to get the first track for each album
    const oneTrackPerAlbum = allAlbums.map(album => {
        const tracks = albumTracks[album.id];
        // Check if the album exists in albumTracks and has at least one track
        if (tracks && tracks.length > 0) {
            return { track: tracks[0], album }; // Return the first track and its album
        }
        // eslint-disable-next-line no-console
        console.warn(`No tracks found for album ID ${album.id} (${album.title}). Skipping.`);
        return null; // Skip albums that have no tracks defined in albumTracks
    }).filter(Boolean) as { track: Track, album: Album }[]; // Filter out the null entries

    // *** SHUFFLE THE TRACKS RANDOMLY ***
    const shuffledTracks = shuffleArray(oneTrackPerAlbum);


    // Section Layout (Same as AlbumsView)
    return (
        <div className="space-y-12">
            <section>
                {/* Changed title to reflect content */}
                <SectionHeader title="Featured Tracks" />
                {/* Use the EXACT same grid classes as AlbumsView */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {/* Render the selected tracks using the Album-like TrackCard, using the shuffled list */}
                    {shuffledTracks.map(({ track, album }) => (
                        <TrackCard key={track.id} track={track} album={album} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export function MainContent({ activeSection }: MainContentProps) {
    const renderContent = () => {
        switch (activeSection) {
            case 'albums':
                return <AlbumsView />;
            case 'playlists':
                return <PlaylistsView />;
            case 'tracks': // <-- Render TracksView
                return <TracksView />;
            default:
                // Fallback
                return <AlbumsView />;
        }
    };

    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] pb-24">
            {/* Add top padding to account for floating NavHeader */}
            <div className="pt-24 p-6">
                {renderContent()}
            </div>
        </div>
    )
}