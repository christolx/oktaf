// src/pages/AlbumDetailPage.tsx
import { useParams, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { navigationIcons } from '@/data/DummyData'

const { ChevronLeft } = navigationIcons

export function AlbumDetailPage() {
    const { albumId } = useParams()
    const navigate = useNavigate()

    return (
        <div className="h-screen w-screen bg-[#0a0a0a] text-white flex flex-col">
            <div className="p-6">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="text-white/70 hover:text-white mb-6"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold">Album Detail Page</h1>
                <p className="text-white/60">Album ID: {albumId}</p>
            </div>
        </div>
    )
}
