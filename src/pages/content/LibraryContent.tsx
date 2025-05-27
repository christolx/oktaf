// components/oktaf/LibraryContent.tsx
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button.tsx'
import { AlbumArt } from '@/components/oktaf/AlbumArt.tsx'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants, cardVariants, sectionVariants } from '@/lib/animations.ts'

import {
    albumsForYou,
    nostalgiaAlbums,
    trendingAlbums,
    PopArtAlbums,
    AlternativeRockAlbums,
    GothicRockAlbums,
    navigationIcons,
    type Album, savedAlbums,
} from '@/data/DummyData.tsx'

const { MoreHorizontal, List, Grid3x3 } = navigationIcons;

interface LibraryContentProps {
    activeSection: string;
}

interface AlbumCardProps {
    album: Album;
}

// Reusable Album Card Component
function LibraryAlbumCard({ album }: AlbumCardProps) {
    const navigate = useNavigate()

    const handleAlbumClick = () => {
        navigate(`/album/${album.id}`)
    }

    return (
        <motion.div
            className="group cursor-pointer"
            onClick={handleAlbumClick}
            variants={cardVariants}
            whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="aspect-square mb-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <AlbumArt
                    art={album.art}
                    className="w-full h-full group-hover:brightness-110 transition-all duration-200"
                />
            </div>
            <div className="space-y-1">
                <h4 className="text-white text-sm font-medium truncate">{album.title}</h4>
                <p className="text-white/60 text-xs truncate">{album.artist}</p>
                <p className="text-white/40 text-xs">{album.year}</p>
            </div>
        </motion.div>
    )
}

function LibrarySectionHeader({ title, albumCount }: { title: string; albumCount?: number }) {
    return (
        <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div>
                <h2 className="text-white text-2xl font-bold">{title}</h2>
                {albumCount && (
                    <p className="text-white/60 text-sm mt-1">{albumCount} albums</p>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <List className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </div>
        </motion.div>
    )
}

function AlbumsLibraryView() {

    const squashedAlbums = [...albumsForYou, ...PopArtAlbums, ...AlternativeRockAlbums, ...nostalgiaAlbums, ...trendingAlbums, ...GothicRockAlbums]

    function shuffle(array: Album[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const scrambledAlbums = shuffle([...squashedAlbums]);
    const resultAlbums = [...savedAlbums, ...scrambledAlbums];

    return (
        <motion.div
            className="space-y-12"
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.2
                    }
                }
            }}
        >

            {/* Saved Albums */}
            <motion.section variants={sectionVariants}>
                <LibrarySectionHeader title={"Saved Albums"}/>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {resultAlbums.map((album) => (
                        <LibraryAlbumCard key={album.id} album={album}/>
                    ))}
                </motion.div>
            </motion.section>

        </motion.div>
    )
}

export function LibraryContent({ activeSection }: LibraryContentProps) {

    const renderLibrarySection = () => {
        switch (activeSection) {
            case 'albums':
                return <AlbumsLibraryView />;
            case 'liked':
                return (
                    <div className="text-white">
                        <h2 className="text-2xl font-bold mb-4">Liked Songs</h2>
                        <p className="text-white/60">Your liked songs will appear here.</p>
                    </div>
                );
            case 'artists':
                return (
                    <div className="text-white">
                        <h2 className="text-2xl font-bold mb-4">Artists</h2>
                        <p className="text-white/60">Your followed artists will appear here.</p>
                    </div>
                );
            default:
                return <AlbumsLibraryView />;
        }
    };

    return (
        <div className="h-screen overflow-y-auto bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] pb-24">
            <div className="pt-24 p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -20}}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        {renderLibrarySection()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
