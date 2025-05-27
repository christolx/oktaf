import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { mainNavItems, navigationIcons } from '@/data/DummyData.tsx';

const { Search, Bell, Users, Settings } = navigationIcons;

interface NavHeaderProps {
    activeNav: string;
    setActiveNav: (navId: string) => void;
}

export function NavHeader({ activeNav, setActiveNav }: NavHeaderProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleNavClick = (navId: string) => {
        setActiveNav(navId);
    };

    return (
        <header className="flex w-full items-center justify-between gap-4
                   h-[3rem]
                   absolute inset-0
                   backdrop-blur-xl
                   bg-gradient-to-t from-black/60 via-black/50 to-black/40
                   shadow-2xl shadow-black/20
                   rounded-2xl px-4 py-2 text-white
                   relative z-10
                   before:absolute before:inset-0
                   before:bg-gradient-to-r before:from-white/10 before:to-transparent
                   before:rounded-2xl before:pointer-events-none">

            {/* Left: Navigation Buttons */}
            <div className="flex items-center gap-2 relative z-20">
                {mainNavItems.map((item) => (
                    <Button
                        key={item.id}
                        variant="ghost"
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                            "h-[30px] px-3.5 py-1 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer relative overflow-hidden",
                            "border border-transparent hover:border-white/20",
                            activeNav === item.id
                                ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border-white/30"
                                : "bg-white/5 text-zinc-300 hover:bg-white/15 hover:text-zinc-100 backdrop-blur-sm"
                        )}
                    >
                        <span className="relative z-10">{item.label}</span>
                        {activeNav === item.id && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-lg" />
                        )}
                    </Button>
                ))}
            </div>

            {/* Middle: Search Bar */}
            <div className="relative flex-grow max-w-xs sm:max-w-sm md:w-96 z-20">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300 z-10" />
                <Input
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-[30px] w-full rounded-lg
                             bg-white/10 backdrop-blur-sm
                             border border-white/20
                             pl-9 pr-3 text-sm text-zinc-100
                             placeholder:text-zinc-400
                             focus-visible:ring-1 focus-visible:ring-white/40
                             focus-visible:ring-offset-0
                             focus-visible:border-white/40
                             focus-visible:bg-white/15
                             transition-all duration-300
                             shadow-inner"
                />
            </div>

            {/* Right: Action Icons & Avatar */}
            <div className="flex items-center gap-2 relative z-20">
                {[Bell, Users, Settings].map((IconComponent, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full p-0
                                 text-zinc-300
                                 hover:bg-white/15 hover:text-white
                                 hover:backdrop-blur-sm
                                 hover:border hover:border-white/20
                                 transition-all duration-300
                                 hover:shadow-lg"
                    >
                        <IconComponent size={18} strokeWidth={1.5} />
                    </Button>
                ))}
                <Avatar className="h-7 w-7 ring-1 ring-white/20 hover:ring-white/40 transition-all duration-300">
                    <AvatarImage src="" alt="User Avatar" />
                    <AvatarFallback className="text-xs bg-gradient-to-br from-red-500 to-orange-500 text-white border-0">
                        U
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}

export default NavHeader;
