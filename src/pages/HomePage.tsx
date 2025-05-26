import {useState} from "react";
import {mainNavItems} from "@/data/DummyData.tsx";
import {Sidebar} from "@/components/oktaf/Sidebar.tsx";
import {MainContent} from "@/components/oktaf/MainContent.tsx";
import {BottomPlayer} from "@/components/oktaf/BottomPlayer.tsx";
import NavHeader from "@/components/oktaf/NavHeader.tsx";

export function HomePage() {
    const [activeNav, setActiveNav] = useState(mainNavItems[0].id);

    return (
        <div className="h-screen w-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
            <div className="flex flex-1 min-h-0">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="p-4">
                        <NavHeader
                            activeNav={activeNav}
                            setActiveNav={setActiveNav}
                        />
                    </div>
                    <MainContent activeSection={activeNav} />
                </div>
            </div>
            <BottomPlayer />
        </div>
    )
}
