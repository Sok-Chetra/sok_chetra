import Link from "next/link";

import styles from "./not-found.module.css";

/**
 * Deliberately not built with `buildMetadata()`. That helper emits a canonical
 * URL and an Open Graph card, neither of which a 404 should advertise. Next
 * already injects `<meta name="robots" content="noindex">` for any page served
 * with a 404 status, so declaring robots here only duplicates the tag.
 */
export const metadata = {
    title: "Page Not Found",
};

/**
 * Server Component — no "use client", so this page adds zero JavaScript of its
 * own. The animation is CSS-only (see not-found.module.css), which means it is
 * already running during the first paint instead of waiting on hydration.
 */
export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 to-purple-50 px-4 py-16 text-center dark:from-gray-800 dark:to-gray-900">
            {/* The glyphs are decorative; the label is what assistive tech reads. */}
            <div className={styles.stage} role="img" aria-label="404">
                <div className={styles.scene}>
                    <span className={`${styles.digit} ${styles.leanLeft}`}>4</span>

                    {/* The "0" of 404, doing the looking. */}
                    <span className={styles.eye}>
                        <span className={styles.pupil} />
                        <span className={styles.lid} />
                    </span>

                    <span className={`${styles.digit} ${styles.leanRight}`}>4</span>
                </div>

                <span className={styles.shadow} />
            </div>

            <h1
                className={`${styles.enter} mt-10 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white`}
                style={{ animationDelay: "60ms" }}
            >
                Well, this is awkward.
            </h1>

            <p
                className={`${styles.enter} mt-3 max-w-md text-balance text-gray-600 dark:text-gray-300`}
                style={{ animationDelay: "140ms" }}
            >
                I looked everywhere. This page isn&apos;t here — but my actual work definitely is.
            </p>

            <div
                className={`${styles.enter} mt-8 w-full max-w-sm overflow-x-auto rounded-xl border border-gray-200/80 bg-white/70 p-4 text-left font-mono text-xs backdrop-blur-sm sm:text-sm dark:border-gray-700/80 dark:bg-gray-900/50`}
                style={{ animationDelay: "220ms" }}
            >
                <p className={`${styles.type} whitespace-nowrap`} style={{ animationDelay: "320ms" }}>
                    <span aria-hidden className="select-none text-gray-400 dark:text-gray-500">
                        ${" "}
                    </span>
                    <span className="text-gray-700 dark:text-gray-200">
                        find / -name &quot;this-page&quot;
                    </span>
                </p>

                <p
                    className={`${styles.enter} mt-1 whitespace-nowrap text-gray-500 dark:text-gray-400`}
                    style={{ animationDelay: "1500ms" }}
                >
                    find: no matches found
                    <span aria-hidden className={`${styles.caret} ml-1 inline-block`}>
                        ▍
                    </span>
                </p>
            </div>

            <div
                className={`${styles.enter} mt-8 flex flex-col gap-3 sm:flex-row`}
                style={{ animationDelay: "300ms" }}
            >
                <Link
                    href="/"
                    className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                    Back to home
                </Link>

                <Link
                    href="/portfolio"
                    className="rounded-lg border border-gray-300 bg-white/70 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                    See my work
                </Link>
            </div>
        </main>
    );
}
