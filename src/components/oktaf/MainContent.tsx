// components/oktaf/MainContent.tsx
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { AlbumArt } from '@/components/ui/AlbumArt'
import { usePlayer } from '@/contexts/PlayerContext'
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
    type Album,
    type Playlist
} from '@/data/DummyData.tsx'

const { ChevronLeft, ChevronRight, MoreHorizontal, Play } = navigationIcons;

interface AlbumCardProps {
    album: Album;
}

interface PlaylistCardProps {
    playlist: Playlist;
}

interface MainContentProps {
    activeSection: string;
}

function AlbumCard({ album }: AlbumCardProps) {
    const navigate = useNavigate()
    const { playTrack } = usePlayer()

    const handleAlbumClick = () => {
        navigate(`/album/${album.id}`)
    }

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        // Create a track from album data
        const track = {
            id: album.id,
            title: album.title,
            artist: album.artist,
            album: album.title,
            duration: album.duration || "3:45",
            currentTime: "0:00",
            art: album.art,
            isLiked: false,
            isBookmarked: false,
        }
        playTrack(track)
    }

    return (
        <div className="group cursor-pointer" onClick={handleAlbumClick}>
            <div className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <AlbumArt
                    art={album.art}
                    className="w-full h-full group-hover:brightness-110 transition-all duration-200"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePlayClick}
                        className="text-white bg-white/20 hover:bg-white/30 h-12 w-12 rounded-full backdrop-blur-sm"
                    >
                        <Play className="w-6 h-6 fill-current" />
                    </Button>
                </div>
            </div>
            <div className="space-y-1">
                <h4 className="text-white text-sm font-medium truncate">{album.title}</h4>
                <p className="text-white/60 text-xs truncate">{album.artist}</p>
                {album.year && (
                    <p className="text-white/40 text-xs">{album.year}</p>
                )}
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

function TrackCard({ album }: AlbumCardProps) {
    return (
        <div className="group cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
                <AlbumArt
                    art={album.art}
                    size="sm"
                    className="group-hover:brightness-110 transition-all duration-200"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{album.title}</h4>
                    <p className="text-white/60 text-xs truncate">{album.artist}</p>
                </div>
                <div className="text-white/40 text-xs">
                    {album.duration || '3:45'}
                </div>
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

function TracksView() {
    const allTracks = [...albumsForYou, ...nostalgiaAlbums, ...trendingAlbums];

    return (
        <div className="space-y-8">
            <section>
                <SectionHeader title="All Tracks" />
                <div className="space-y-1">
                    {allTracks.map((album) => (
                        <TrackCard key={`track-${album.id}`} album={album} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export function MainContent({ activeSection }: MainContentProps) {
    const renderContent = () => {
        switch (activeSection) {
            case 'albums':
                return <AlbumsView />;
            case 'playlists':
                return <PlaylistsView />;
            case 'tracks':
                return <TracksView />;
            default:
                return <AlbumsView />;
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
            <div className="p-6">
                {renderContent()}
            </div>
        </div>
    )
}
