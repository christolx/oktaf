// components/oktaf/AppLayout.tsx
import type { ReactNode } from 'react'
import { Sidebar } from '@/components/oktaf/Sidebar.tsx'
import { BottomPlayer } from '@/components/oktaf/BottomPlayer.tsx'
import NavHeader from '@/components/oktaf/NavHeader.tsx'
import { MobileNav } from '@/components/oktaf/MobileNav.tsx'

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
        <div className={`h-dvh w-full bg-[#1a1a1a] text-white flex flex-col overflow-hidden ${className}`}>
            <div className="flex flex-1 min-h-0 relative">
                <div className="relative z-40 hidden lg:block">
                    <Sidebar />
                </div>

                <div className="flex-1 relative min-w-0">
                    <div className="absolute top-0 left-0 right-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 lg:p-4">
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
            <BottomPlayer />
            <MobileNav />
        </div>
    )
}
