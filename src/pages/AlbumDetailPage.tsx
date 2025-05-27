// pages/AlbumDetailPage.tsx
import { useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/pages/AppLayout.tsx'
import { useNavigation } from '@/hooks/useNavigation'
import {
    albumsForYou,
    nostalgiaAlbums,
    trendingAlbums,
    PopArtAlbums,
    AlternativeRockAlbums,
    GothicRockAlbums
} from '@/data/DummyData'
import { AlbumDetailContent } from '@/pages/content/AlbumDetailContent' // <--- import here

export function AlbumDetailPage() {
    const { albumId } = useParams()
    const { activeNav, navigateToHomeSection } = useNavigation()

    // Find the album from all available albums
    const allAlbums = [
        ...albumsForYou,
        ...nostalgiaAlbums,
        ...trendingAlbums,
        ...PopArtAlbums,
        ...AlternativeRockAlbums,
        ...GothicRockAlbums
    ]

    const album = allAlbums.find(a => a.id === albumId)

    if (!album) {
        return (
            <AppLayout
                activeNav={activeNav}
                setActiveNav={navigateToHomeSection}
                className="bg-[#0a0a0a]"
                contentClassName="flex items-center justify-center"
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Album not found</h1>
                    <Button onClick={() => navigateToHomeSection(activeNav)} variant="outline">
                        Go back home
                    </Button>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout
            activeNav={activeNav}
            setActiveNav={navigateToHomeSection}
            className="bg-[#0a0a0a]"
            contentClassName="overflow-y-auto overflow-x-hidden pb-24"
        >
            <AlbumDetailContent album={album} albumId={albumId!} />
        </AppLayout>
    )
}
