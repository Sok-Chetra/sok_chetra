"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary. Without this, an unhandled render error shows
 * Next's default error screen instead of the site's own styling.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Unhandled route error:", error);
    }, [error]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 px-4 text-center dark:from-gray-800 dark:to-gray-900">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Something went wrong
            </h1>
            <p className="mt-2 max-w-md text-gray-600 dark:text-gray-300">
                An unexpected error occurred. Trying again often resolves it.
            </p>

            <button
                type="button"
                onClick={reset}
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
                Try again
            </button>
        </main>
    );
}
