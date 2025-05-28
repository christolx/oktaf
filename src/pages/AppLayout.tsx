// components/oktaf/AppLayout.tsx
import type { ReactNode } from 'react'
import { Sidebar } from '@/components/oktaf/Sidebar.tsx'
import { BottomPlayer } from '@/components/oktaf/BottomPlayer.tsx'
import NavHeader from '@/components/oktaf/NavHeader.tsx'

interface AppLayoutProps {
    children: ReactNode
    activeNav: string
    setActiveNav: (navId: string) => void
    className?: string
    contentClassName?: string
}

export function AppLayout({
                              children,
                              activeNav,
                              setActiveNav,
                              className = "",
                              contentClassName = ""
                          }: AppLayoutProps) {
    return (
        <div className={`h-screen w-screen bg-[#1a1a1a] text-white flex flex-col overflow-hidden ${className}`}>
            <div className="flex flex-1 min-h-0 relative">
                {/* Sidebar with proper z-index */}
                <div className="relative z-40">
                    <Sidebar />
                </div>

                {/* Main Content Area - Full Height */}
                <div className="flex-1 relative min-w-0">
                    {/* Always show NavHeader for easy homepage section navigation */}
                    <div className="absolute top-0 left-0 right-0 z-50 p-4">
                        <NavHeader
                            activeNav={activeNav}
                            setActiveNav={setActiveNav}
                        />
                    </div>

                    {/* Main Content - Extends Full Height with top padding for NavHeader */}
                    <div className={`h-full ${contentClassName}`}>
                        {children}
                    </div>
                </div>
            </div>
            <BottomPlayer />
        </div>
    )
}
