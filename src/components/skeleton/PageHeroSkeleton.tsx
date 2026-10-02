import Skeleton from "@/components/ui/Skeleton";

/**
 * Placeholder for <PageHero>, and deliberately a mirror of it: the same
 * `pt-32 md:pt-48` and the same per-element margins, with each bar set to the
 * line box of the type it stands in for — h-10/md:h-12 for the text-4xl/5xl
 * heading, h-7 for the text-xl description, h-12 for the py-3 buttons.
 *
 * The point of matching is CLS. A placeholder of the wrong height moves the
 * page when the real content lands, and a layout shift a visitor caused by
 * navigating still counts against the metric.
 */
export default function PageHeroSkeleton({ actions = 2 }: { actions?: number }) {
    return (
        <section className="px-4 pt-32 pb-20 sm:px-6 md:pt-48 lg:px-8">
            <Skeleton className="mx-auto mb-6 h-10 w-full max-w-md md:h-12" />

            {/* Two bars, because the real description wraps to two lines at
                every width the hero is read at. */}
            <div className="mx-auto mb-8 max-w-3xl space-y-2">
                <Skeleton className="h-7 w-full" />
                <Skeleton className="mx-auto h-7 w-4/5" />
            </div>

            {actions > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {Array.from({ length: actions }, (_, i) => (
                        <Skeleton key={i} className="h-12 w-36 rounded-lg" />
                    ))}
                </div>
            )}

            <Skeleton className="mx-auto mt-8 h-1 w-16" />
        </section>
    );
}
