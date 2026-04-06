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
        <header className="relative z-10 flex w-full flex-col gap-3 rounded-2xl bg-gradient-to-t from-black/70 via-black/55 to-black/40 px-3 py-3 text-white shadow-2xl shadow-black/20 backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/10 before:to-transparent sm:px-4 md:flex-row md:items-center md:justify-between md:gap-4 md:py-2">
            <div className="relative z-20 flex w-full min-w-0 items-center gap-2 md:max-w-md md:flex-1">
                <div className="relative flex-1 md:max-w-sm lg:max-w-md">
                    <Search className="absolute left-2.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-zinc-300" />
                    <Input
                        type="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-10 w-full rounded-xl border border-white/20 bg-zinc/90 pl-9 pr-3 text-sm text-zinc-100 shadow-inner backdrop-blur-sm transition-all duration-300 placeholder:text-zinc-400 focus-visible:border-green-500 focus-visible:bg-zinc/0 focus-visible:ring-1 focus-visible:ring-green-500 focus-visible:ring-offset-0 md:h-[34px]"
                    />
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    {[Bell, Users, Settings].map((IconComponent, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className={cn(
                                'h-10 w-10 rounded-full p-0 text-zinc-300 transition-all duration-300 hover:border hover:border-white/20 hover:bg-white/15 hover:text-white hover:backdrop-blur-sm hover:shadow-lg md:h-8 md:w-8',
                                index > 0 ? 'hidden sm:inline-flex' : ''
                            )}
                        >
                            <IconComponent size={18} strokeWidth={1.5} />
                        </Button>
                    ))}
                    <Avatar className="h-10 w-10 ring-1 ring-white/20 transition-all duration-300 hover:ring-white/40 md:h-8 md:w-8">
                        <AvatarImage src="" alt="User Avatar" />
                        <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-xs text-white border-0">
                            U
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="relative z-20 -mx-1 flex w-full items-center gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:w-auto md:flex-1 md:justify-center md:overflow-visible md:px-0 md:pb-0">
                {mainNavItems.map((item) => (
                    <Button
                        key={item.id}
                        variant="ghost"
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                            "relative h-10 shrink-0 overflow-hidden rounded-xl px-4 py-1 text-sm font-medium transition-all duration-300 cursor-pointer md:h-[30px] md:rounded-lg md:px-3.5",
                            "border border-transparent hover:border-white/20",
                            activeNav === item.id
                                ? "bg-white/20 text-white/80 shadow-lg backdrop-blur-sm border-white/30"
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
        </header>
    );
}

export default NavHeader;
