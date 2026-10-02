import Skeleton, { SkeletonScreen } from "@/components/ui/Skeleton";

/**
 * Shown while a project page's payload arrives.
 *
 * This is the one route where the fallback earns its place. The nav links sit
 * in the header and are prefetched long before they are clicked, so those
 * navigations are already instant; a project card's Details link is prefetched
 * only once the card reaches the viewport, which on a slow connection can lose
 * the race against the tap. Without a fallback that tap paints nothing at all,
 * which is both a worse INP reading and a UI that feels broken.
 *
 * Structure follows page.tsx section for section, down to `md:pt-40` and the
 * individual bottom margins, so the real content lands without moving anything.
 */
export default function Loading() {
    return (
        <main className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <SkeletonScreen label="Loading project">
                <div className="mx-auto max-w-4xl px-4 pt-32 pb-20 sm:px-6 md:pt-40 lg:px-8">
                    {/* breadcrumb */}
                    <Skeleton className="mb-8 h-5 w-64" />

                    {/* title */}
                    <Skeleton className="mb-4 h-10 w-3/4 md:h-12" />

                    {/* summary */}
                    <div className="mb-6 space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-5/6" />
                    </div>

                    {/* tags */}
                    <div className="mb-8 flex flex-wrap gap-2">
                        <Skeleton className="h-7 w-20 rounded-full" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                        <Skeleton className="h-7 w-16 rounded-full" />
                        <Skeleton className="h-7 w-20 rounded-full" />
                    </div>

                    {/* hero image — the project thumbnails are all 1050x600, so
                        reserving that ratio holds exactly the right box */}
                    <Skeleton className="mb-10 aspect-[1050/600] w-full rounded-2xl" />

                    {/* My role — keeps the real card's rule and surface */}
                    <div className="mb-10 rounded-2xl border-l-4 border-indigo-500/40 bg-white/70 p-6 dark:bg-gray-800/60">
                        <Skeleton className="mb-2 h-7 w-28" />
                        <Skeleton className="h-6 w-full" />
                    </div>

                    {/* About this project */}
                    <div className="mb-10">
                        <Skeleton className="mb-4 h-8 w-56" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-4/5" />
                        </div>
                    </div>

                    {/* What it does */}
                    <div className="mb-10">
                        <Skeleton className="mb-4 h-8 w-44" />
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-5/6" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-4/5" />
                        </div>
                    </div>

                    {/* See it live */}
                    <div className="mb-12">
                        <Skeleton className="mb-4 h-8 w-40" />
                        <div className="flex flex-wrap gap-3">
                            <Skeleton className="h-11 w-32 rounded-lg" />
                            <Skeleton className="h-11 w-32 rounded-lg" />
                        </div>
                    </div>

                    {/* More projects */}
                    <div className="border-t border-gray-200 pt-8 dark:border-gray-700">
                        <Skeleton className="mb-4 h-7 w-36" />
                        <div className="flex flex-wrap gap-4">
                            <Skeleton className="h-7 w-44" />
                            <Skeleton className="h-7 w-40" />
                            <Skeleton className="h-7 w-28" />
                        </div>
                    </div>
                </div>
            </SkeletonScreen>
        </main>
    );
}
