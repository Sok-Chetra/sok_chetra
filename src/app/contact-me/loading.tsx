import PageHeroSkeleton from "@/components/skeleton/PageHeroSkeleton";
import Skeleton, { SkeletonScreen } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <main className="min-h-screen overflow-hidden bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <SkeletonScreen label="Loading contact page">
                <PageHeroSkeleton />

                {/* contact channel cards */}
                <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 5 }, (_, i) => (
                            <li key={i} className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-700">
                                <Skeleton className="mb-4 h-10 w-10 rounded-full" />
                                <Skeleton className="mb-2 h-6 w-24" />
                                <Skeleton className="h-5 w-36" />
                            </li>
                        ))}
                    </ul>
                </section>

                {/* message form */}
                <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-700">
                        <Skeleton className="mb-6 h-8 w-48" />
                        <div className="space-y-5">
                            <Skeleton className="h-12 w-full rounded-lg" />
                            <Skeleton className="h-12 w-full rounded-lg" />
                            <Skeleton className="h-32 w-full rounded-lg" />
                            <Skeleton className="h-12 w-40 rounded-lg" />
                        </div>
                    </div>
                </section>
            </SkeletonScreen>
        </main>
    );
}
