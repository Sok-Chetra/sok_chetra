"use client";

import { useEffect } from "react";

import "./globals.css";

/**
 * Last-resort boundary, for an error in the root layout itself — the menu or
 * the theme switch — which `error.tsx` cannot catch, because a segment's error
 * boundary sits inside that segment's layout rather than around it.
 *
 * It replaces the root layout while active, so it brings its own <html> and
 * <body>, and imports the stylesheet itself rather than relying on the layout
 * that just failed to load it. There is no menu or theme here on purpose:
 * those are the parts most likely to be what broke.
 */
export default function GlobalError({
    error,
    retry,
}: {
    error: Error & { digest?: string };
    retry: () => void;
}) {
    useEffect(() => {
        console.error("Unhandled root error:", error);
    }, [error]);

    return (
        <html lang="en">
            <head>
                <title>Something went wrong — Sok Chetra</title>
            </head>
            <body className="bg-gray-50 text-gray-900 antialiased">
                <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 px-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Something went wrong</h1>
                    <p className="mt-2 max-w-md text-gray-600">
                        The site hit an unexpected error. Trying again often resolves it.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => retry()}
                            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Try again
                        </button>
                        {/* A plain anchor, not <Link>: client-side navigation
                            would reuse the root layout that just failed, while a
                            full page load starts it over from the server. */}
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- deliberate full reload, see above */}
                        <a
                            href="/"
                            className="rounded-lg border border-gray-300 bg-white/70 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Back to home
                        </a>
                    </div>
                </main>
            </body>
        </html>
    );
}
