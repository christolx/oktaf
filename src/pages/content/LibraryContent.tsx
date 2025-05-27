// components/oktaf/LibraryContent.tsx
interface LibraryContentProps {
    activeSection: string;
}

export function LibraryContent({ activeSection }: LibraryContentProps) {



    const renderLibrarySection = () => {
        switch (activeSection) {
            case 'albums' :
                return(
                    <>
                    </>
                )
            case 'likedsongs' :
                return(
                    <>
                    </>
                )
            case 'artists' :
                return(
                    <>
                    </>
                )
        }
    };

    return (
        <div className="h-full w-full bg-[#1a1a1a] overflow-y-auto">
            <div className="p-6">
                {renderLibrarySection()}
            </div>
        </div>
    );
}
