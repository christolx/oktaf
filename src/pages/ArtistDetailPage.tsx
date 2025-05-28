// pages/ArtistDetailPage.tsx
import { AppLayout } from '@/pages/AppLayout.tsx'
import { useNavigation } from '@/hooks/useNavigation'
import {ArtistDetailContent} from "@/pages/content/ArtistDetailContent.tsx";

export function ArtistDetailPage() {
    const { activeNav, setActiveNav } = useNavigation()

    return (
        <AppLayout
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            contentClassName="overflow-y-auto h-full"
        >
            <ArtistDetailContent />
        </AppLayout>
    )
}
