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

    // Handle URL section parameter on component mount and when searchParams change
    useEffect(() => {
        const sectionParam = searchParams.get('section');
        if (sectionParam && mainNavItems.some(item => item.id === sectionParam)) {
            setActiveNav(sectionParam);
        }
    }, [searchParams]);

    // Update URL when activeNav changes (keeps URL in sync)
    const handleSetActiveNav = (navId: string) => {
        setActiveNav(navId);
        // Update URL to reflect current section
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('section', navId);
        setSearchParams(newSearchParams, { replace: true });
    };

    return (
        <div className="h-screen w-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
            <div className="flex flex-1 min-h-0">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="p-4">
                        <NavHeader
                            activeNav={activeNav}
                            setActiveNav={handleSetActiveNav}
                        />
                    </div>
                    <MainContent activeSection={activeNav} />
                </div>
            </div>
            <BottomPlayer />
        </div>
    );
}
