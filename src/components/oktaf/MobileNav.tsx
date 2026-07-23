import { Heart, Home, LibraryBig, Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { cn } from '@/lib/utils'

const items = [
    { id: 'home', label: 'Home', icon: Home, href: '/?section=albums' },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Library', icon: LibraryBig, href: '/library?section=albums' },
    { id: 'liked', label: 'Liked', icon: Heart, href: '/library?section=liked' },
]

export function MobileNav() {
    const location = useLocation()
    const navigate = useNavigate()
    const section = new URLSearchParams(location.search).get('section')

    const isActive = (id: string) => {
        if (id === 'home') return location.pathname === '/' && section !== 'tracks'
        if (id === 'search') return location.pathname === '/' && section === 'tracks'
        if (id === 'library') return location.pathname === '/library' && section !== 'liked'
        return location.pathname === '/library' && section === 'liked'
    }

    return (
        <nav
            aria-label="Primary navigation"
            className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#0b0b0b]/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
        >
            <div className="grid h-16 grid-cols-4">
                {items.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.id)

                    return (
                        <button
                            key={item.id}
                            type="button"
                            disabled={!item.href}
                            onClick={() => item.href && navigate(item.href)}
                            className={cn(
                                'flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl px-2 text-[11px] transition-colors',
                                !item.href && 'cursor-default',
                                active ? 'text-white' : 'text-white/50 hover:text-white/80'
                            )}
                        >
                            <Icon className={cn('size-5', active && item.id === 'liked' && 'fill-current text-green-400')} />
                            <span>{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}
