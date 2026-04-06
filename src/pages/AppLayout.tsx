// components/oktaf/AppLayout.tsx
import type { ReactNode } from 'react'
import { Sidebar } from '@/components/oktaf/Sidebar.tsx'
import { BottomPlayer } from '@/components/oktaf/BottomPlayer.tsx'
import NavHeader from '@/components/oktaf/NavHeader.tsx'
import { MobileBottomNav } from '@/components/oktaf/MobileBottomNav.tsx'

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
        <div className={`flex h-screen w-screen flex-col overflow-hidden bg-[#1a1a1a] text-white ${className}`}>
            <div className="flex flex-1 min-h-0 relative">
                <div className="relative z-40 hidden md:block">
                    <Sidebar />
                </div>

                <div className="flex-1 relative min-w-0">
                    <div className="absolute left-0 right-0 top-0 z-50 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:p-4 md:pt-4">
                        <NavHeader
                            activeNav={activeNav}
                            setActiveNav={setActiveNav}
                        />
                    </div>

                    <div className={`h-full ${contentClassName}`}>
                        {children}
                    </div>
                </div>
            </div>
            <MobileBottomNav activeNav={activeNav} setActiveNav={setActiveNav} />
            <BottomPlayer />
        </div>
    )
}
