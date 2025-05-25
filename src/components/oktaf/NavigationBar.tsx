import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Bell, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils'; // Ensure you have this utility from ShadCN setup

const navItems = ['Albums', 'Playlists', 'Tracks'];

export function NavigationBar() {
    const [activeNav, setActiveNav] = useState('Albums');
    const [searchTerm, setSearchTerm] = useState('');

    // Consistent height for buttons and input, ~28-30px from Figma (h-7)
    // py-1 (top/bottom 4px) + text-sm (14px) + line-height adjustment
    const elementHeightClass = 'h-[30px]';
    const buttonPaddingClass = 'px-3.5 py-1';

    return (
        <header
            className={cn(
                "flex w-full items-center justify-between gap-4 px-4 py-2",
                // Figma's specific radial gradient and blur:
                // "bg-[radial-gradient(ellipse_49.14%_718.37%_at_50.00%_0.00%,_rgba(14,14,14,0.42)_0%,_rgba(36,36,36,0.42)_100%)]",
                // Simplified dark translucent background:
                "bg-zinc-900/70 backdrop-blur-xl",
                "rounded-2xl text-white" // Figma: rounded-2xl
            )}
        >
            {/* Left: Navigation Buttons */}
            <div className="flex items-center gap-2">
                {navItems.map((item) => (
                    <Button
                        key={item}
                        variant="ghost" // Base variant, styling handled by className
                        onClick={() => setActiveNav(item)}
                        className={cn(
                            elementHeightClass,
                            buttonPaddingClass,
                            "text-sm font-medium transition-colors",
                            "rounded-lg", // Figma: rounded-lg
                            activeNav === item
                                ? "bg-zinc-500 text-white" // Active state: Lighter gray bg, white text
                                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-zinc-100" // Inactive: Darker gray bg
                        )}
                    >
                        {item}
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
                    className={cn(
                        elementHeightClass,
                        "w-full rounded-lg border-transparent bg-zinc-700 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-400",
                        "focus-visible:ring-1 focus-visible:ring-zinc-500 focus-visible:ring-offset-0 focus-visible:border-transparent"
                    )}
                />
            </div>

            {/* Right: Action Icons & Avatar */}
            <div className="flex items-center gap-2">
                {[Bell, Users, Settings].map((IconComponent, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "h-7 w-7 rounded-full p-0 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                        )}
                        aria-label={IconComponent.displayName || 'Action icon'}
                    >
                        <IconComponent size={18} strokeWidth={1.5} />
                    </Button>
                ))}
                <Avatar className="h-7 w-7">
                    <AvatarImage
                        src="https://placehold.co/28x28/FF5733/FFFFFF?text=U&font=roboto" // Placeholder, adjust as needed
                        alt="User Avatar"
                    />
                    <AvatarFallback className="text-xs bg-zinc-600 text-zinc-200">
                        U
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}

export default NavigationBar;
