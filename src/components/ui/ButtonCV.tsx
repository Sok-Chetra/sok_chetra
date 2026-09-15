import { SITE } from "@/lib/content/site";

/**
 * Plain anchor with the `download` attribute. This was previously a client
 * component that built an <a>, clicked it, and removed it — the browser does
 * that natively, and as a link it works without JavaScript and supports
 * middle-click / "save link as".
 */
export default function ButtonCV() {
    return (
        <a
            href={SITE.cvPath}
            download
            className="inline-block rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-all hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
            Download CV
        </a>
    );
}
