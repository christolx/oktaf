// pages/HomePage.tsx
import { AppLayout } from '@/pages/AppLayout.tsx'
import { HomeContent } from '@/pages/content/HomeContent.tsx'
import { useNavigation } from '@/hooks/useNavigation'

export function HomePage() {
    const { activeNav, setActiveNav } = useNavigation()

    return (
        <AppLayout
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            contentClassName="overflow-hidden"
        >
            <HomeContent activeSection={activeNav} />
        </AppLayout>
    )
}
