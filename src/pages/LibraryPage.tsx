// pages/LibraryPage.tsx
import { AppLayout } from '@/pages/AppLayout'
import { useLocation } from 'react-router'
import { LibraryContent } from './content/LibraryContent'
import { libraryItems } from '@/data/DummyData.tsx'
import { useNavigation } from '@/hooks/useNavigation'

export function LibraryPage() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const section = params.get('section') || (libraryItems[0]?.id ?? 'albums')

    const { navigateToHomeSection } = useNavigation()

    return (
        <AppLayout
            activeNav={''}
            setActiveNav={navigateToHomeSection}
            contentClassName="overflow-y-auto overflow-x-hidden pb-24"
        >
            <div className="p-6 pt-24">
                <LibraryContent activeSection={section} />
            </div>
        </AppLayout>
    )
}
