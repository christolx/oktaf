// hooks/useNavigation.ts
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router'
import { mainNavItems } from '@/data/DummyData'

export function useNavigation() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [activeNav, setActiveNav] = useState(mainNavItems[0].id)

    // Check if we're currently on the homepage
    const isHomePage = location.pathname === '/'

    // Handle URL section parameter on component mount and when searchParams change
    useEffect(() => {
        if (isHomePage) {
            const sectionParam = searchParams.get('section')
            if (sectionParam && mainNavItems.some(item => item.id === sectionParam)) {
                setActiveNav(sectionParam)
            }
        }
    }, [searchParams, isHomePage])

    // Update URL when activeNav changes (only for homepage)
    const handleSetActiveNav = (navId: string) => {
        setActiveNav(navId)

        if (isHomePage) {
            // If we're on homepage, update the search params
            const newSearchParams = new URLSearchParams(searchParams)
            newSearchParams.set('section', navId)
            setSearchParams(newSearchParams, { replace: true })
        } else {
            // If we're on any other page, navigate to homepage with the section
            navigate(`/?section=${navId}`)
        }
    }

    // Always navigate to homepage with section (used by non-homepage components)
    const navigateToHomeSection = (navId: string) => {
        setActiveNav(navId)
        navigate(`/?section=${navId}`)
    }

    return {
        activeNav,
        setActiveNav: handleSetActiveNav,
        navigateToHomeSection,
        isHomePage
    }
}
