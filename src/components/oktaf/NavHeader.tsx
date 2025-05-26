import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
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
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (navId: string) => {
        // Always set the active nav state
        setActiveNav(navId);

        // If we're not on the homepage, navigate to homepage with the section
        if (location.pathname !== '/') {
            navigate(`/?section=${navId}`, { replace: false });
        }
    };

    return (
        <header className="flex w-full items-center justify-between gap-4 bg-zinc-900/70 backdrop-blur-xl rounded-2xl px-4 py-2 text-white">
            {/* Left: Navigation Buttons */}
            <div className="flex items-center gap-2">
                {mainNavItems.map((item) => (
                    <Button
                        key={item.id}
                        variant="ghost"
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                            "h-[30px] px-3.5 py-1 text-sm font-medium transition-colors rounded-lg cursor-pointer",
                            activeNav === item.id
                                ? "bg-zinc-500 text-white"
                                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-zinc-100"
                        )}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>

            {/* Middle: Search Bar */}
            <div className="relative flex-grow max-w-xs sm:max-w-sm md:w-96">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-[30px] w-full rounded-lg border-transparent bg-zinc-700 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:ring-offset-0 focus-visible:border-transparent"
                />
            </div>

            {/* Right: Action Icons & Avatar */}
            <div className="flex items-center gap-2">
                {[Bell, Users, Settings].map((IconComponent, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full p-0 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                    >
                        <IconComponent size={18} strokeWidth={1.5} />
                    </Button>
                ))}
                <Avatar className="h-7 w-7">
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
