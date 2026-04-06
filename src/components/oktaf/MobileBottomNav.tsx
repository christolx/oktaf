import { Home, Library, Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

interface MobileBottomNavProps {
    activeNav: string
    setActiveNav: (navId: string) => void
}

export function MobileBottomNav({ activeNav, setActiveNav }: MobileBottomNavProps) {
    const navigate = useNavigate()
    const location = useLocation()

    const isLibrary = location.pathname.startsWith('/library')
    const isSearch = location.pathname === '/' && activeNav === 'tracks'

    const items = [
        {
            id: 'home',
            label: 'Home',
            isActive: location.pathname === '/' && !isSearch,
            onClick: () => {
                if (location.pathname === '/') {
                    setActiveNav('albums')
                } else {
                    navigate('/?section=albums')
                }
            },
            icon: Home,
        },
        {
            id: 'search',
            label: 'Search',
            isActive: isSearch,
            onClick: () => {
                if (location.pathname === '/') {
                    setActiveNav('tracks')
                } else {
                    navigate('/?section=tracks')
                }
            },
            icon: Search,
        },
        {
            id: 'library',
            label: 'Library',
            isActive: isLibrary,
            onClick: () => navigate('/library?section=albums'),
            icon: Library,
        },
    ]

    return (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex max-w-md items-center justify-around gap-2">
                {items.map(({ id, label, isActive, onClick, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={onClick}
                        className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition-all active:scale-95 ${
                            isActive
                                ? 'bg-white/10 text-white'
                                : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                        }`}
                        aria-label={label}
                    >
                        <Icon className="h-5 w-5" />
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </nav>
    )
}
