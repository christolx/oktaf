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
        <header className="relative z-10 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/55 px-3 py-2 text-white shadow-2xl shadow-black/20 backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent sm:px-4">
            <div className="relative z-20 mb-2 flex h-8 items-center justify-between lg:hidden">
                <span className="text-sm font-bold tracking-[0.18em]">OKTAF</span>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open search"
                        className="size-11 rounded-full text-zinc-200 hover:bg-white/10 hover:text-white"
                    >
                        <Search className="size-5" />
                    </Button>
                    <Avatar className="size-8 ring-1 ring-white/20">
                        <AvatarImage src="" alt="User Avatar" />
                        <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-xs text-white">
                            U
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="relative z-20 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
                {mainNavItems.map((item) => (
                    <Button
                        key={item.id}
                        variant="ghost"
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                            "h-9 flex-1 px-4 py-1 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer relative overflow-hidden",
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

            <div className="relative z-20 hidden h-8 items-center justify-between gap-4 lg:flex">
                <div className="flex items-center gap-2">
                    {mainNavItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            onClick={() => handleNavClick(item.id)}
                            className={cn(
                                "h-[30px] px-3.5 py-1 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer relative overflow-hidden",
                                "border border-transparent hover:border-white/20",
                                activeNav === item.id
                                    ? "bg-white/20 text-white/80 shadow-lg backdrop-blur-sm border-white/30"
                                    : "bg-white/5 text-zinc-300 hover:bg-white/15 hover:text-zinc-100 backdrop-blur-sm"
                            )}
                        >
                            <span className="relative z-10">{item.label}</span>
                        </Button>
                    ))}
                </div>

                <div className="relative z-20 w-full max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 z-10 size-4 -translate-y-1/2 text-zinc-300" />
                    <Input
                        type="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-[30px] w-full rounded-lg
                             bg-zinc/90 backdrop-blur-sm
                             border border-white/20
                             pl-9 pr-3 text-sm text-zinc-100
                             placeholder:text-zinc-400
                             focus-visible:ring-1 focus-visible:ring-green-500
                             focus-visible:ring-offset-0
                             focus-visible:border-green-500
                             focus-visible:bg-zinc/0
                             transition-all duration-300
                             shadow-inner"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {[Bell, Users, Settings].map((IconComponent, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            aria-label={['Notifications', 'Friends', 'Settings'][index]}
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
            </div>
        </header>
    );
}

export default NavHeader;
