import Skeleton, { SkeletonScreen } from "@/components/ui/Skeleton";

/**
 * The about-me hero is not <PageHero> — it is its own taller, centred block
 * (`min-h-[80svh]`, text-5xl/7xl), so this mirrors that rather than reusing
 * PageHeroSkeleton.
 */
export default function Loading() {
    return (
        <main className="min-h-screen overflow-hidden bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <SkeletonScreen label="Loading about page">
                <section className="relative flex min-h-[80svh] items-center justify-center px-4 py-24">
                    <div className="relative z-10 w-full max-w-3xl">
                        <Skeleton className="mx-auto mb-6 h-12 w-72 md:h-18 md:w-96" />
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="mx-auto h-6 w-5/6" />
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-6xl space-y-20 px-4 pb-20 sm:px-6 lg:px-8">
                    {/* Skills, Work experience and Education share one
                        heading-plus-stacked-cards rhythm, so one shape repeated
                        three times is an honest stand-in rather than a guess. */}
                    {Array.from({ length: 3 }, (_, section) => (
                        <div key={section}>
                            <Skeleton className="mb-8 h-9 w-56" />
                            <div className="space-y-4">
                                {Array.from({ length: 3 }, (_, row) => (
                                    <div
                                        key={row}
                                        className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-700"
                                    >
                                        <Skeleton className="mb-3 h-6 w-1/2" />
                                        <Skeleton className="mb-4 h-5 w-1/3" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-4/5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </SkeletonScreen>
        </main>
    );
}
