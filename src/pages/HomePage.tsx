import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { mainNavItems } from "@/data/DummyData.tsx";
import { Sidebar } from "@/components/oktaf/Sidebar.tsx";
import { MainContent } from "@/components/oktaf/MainContent.tsx";
import { BottomPlayer } from "@/components/oktaf/BottomPlayer.tsx";
import NavHeader from "@/components/oktaf/NavHeader.tsx";

export function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeNav, setActiveNav] = useState(mainNavItems[0].id);

    useEffect(() => {
        const sectionParam = searchParams.get('section');
        if (sectionParam && mainNavItems.some(item => item.id === sectionParam)) {
            setActiveNav(sectionParam);
        }
    }, [searchParams]);

    const handleSetActiveNav = (navId: string) => {
        setActiveNav(navId);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('section', navId);
        setSearchParams(newSearchParams, { replace: true });
    };

    return (
        <div className="h-screen w-screen bg-[#1a1a1a] text-white flex flex-col overflow-hidden relative">
            {/* Main content area - proper scroll container */}
            <div className="flex flex-1 min-h-0">
                {/* Sidebar - fixed positioning */}
                <div className="flex-shrink-0 z-10">
                    <Sidebar />
                </div>

                {/* Main content area - scrollable */}
                <div className="flex-1 flex flex-col min-w-0 relative">
                    {/* Header - fixed at top */}
                    <div className="flex-shrink-0 p-4 bg-[#0a0a0a] z-20 relative">
                        <NavHeader
                            activeNav={activeNav}
                            setActiveNav={handleSetActiveNav}
                        />
                    </div>

                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden pb-24">
                        <MainContent activeSection={activeNav} />
                    </div>
                </div>
            </div>

            {/* Bottom player overlays everything */}
            <BottomPlayer />
        </div>
    );
}