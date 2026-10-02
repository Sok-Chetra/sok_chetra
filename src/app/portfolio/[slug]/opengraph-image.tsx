import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import sharp from "sharp";

import { PROJECTS } from "@/lib/content/projects";
import { SITE } from "@/lib/content/site";

/**
 * Each project's link-preview image, generated once at build time.
 *
 * These pages used to share the raw screenshot, which was wrong for a preview
 * on three counts: it was WebP, which some services will not display; it was
 * 1050x600 while the tags claimed 1200x630; and it was declared as image/png.
 * This renders a proper 1200x630 card instead — the screenshot beside the
 * project's title and summary — in the colours of the project page itself.
 */

const SIZE = { width: 1200, height: 630 };

/*
 * Satori, which draws the card, reads TTF, OTF and WOFF but not WOFF2, so the
 * files next/font serves cannot be reused. These are the same family, at the
 * two weights the card needs, with their licence alongside (OFL.txt).
 */
const [geistRegular, geistBold] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Geist-Bold.ttf")),
]);

/*
 * One alt text for every card. Per-project alt needs generateImageMetadata,
 * and with that Next only supplies the image's own id as a static param, never
 * the slug — so the cards were drawn on the first request instead of at build.
 */
export const alt = `Project preview — ${SITE.name}, ${SITE.role}`;
export const size = SIZE;
export const contentType = "image/jpeg";

/**
 * Route handlers sit outside the layout tree, so the page's own params do not
 * reach this file; without these the cards would render on first request.
 */
export function generateStaticParams() {
    return PROJECTS.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
    return PROJECTS.find((project) => project.slug === slug);
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = findProject(slug);
    if (!project) notFound();

    /*
     * The same file the page imports. Satori cannot decode WebP, so it is
     * converted here. Slugs and screenshot filenames match by convention; a
     * missing file throws, failing the build instead of shipping a broken card.
     */
    const screenshot = await sharp(
        join(process.cwd(), "public/image/projects", `${project.slug}.webp`)
    )
        .png()
        .toBuffer();

    const card = new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "56px 64px",
                    backgroundImage: "linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%)",
                    fontFamily: "Geist",
                }}
            >
                <div
                    style={{
                        width: 476,
                        height: "100%",
                        paddingRight: 40,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                            style={{
                                fontSize: 22,
                                fontWeight: 700,
                                letterSpacing: 3,
                                color: "#4f46e5",
                            }}
                        >
                            PROJECT
                        </div>
                        <div
                            style={{
                                marginTop: 14,
                                fontSize: 60,
                                fontWeight: 700,
                                lineHeight: 1.05,
                                color: "#111827",
                            }}
                        >
                            {project.title}
                        </div>
                        <div
                            style={{
                                marginTop: 22,
                                fontSize: 25,
                                lineHeight: 1.4,
                                color: "#4b5563",
                                display: "block",
                                lineClamp: 5,
                            }}
                        >
                            {project.summary}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>
                            {SITE.name}
                        </div>
                        <div style={{ marginTop: 4, fontSize: 21, color: "#4b5563" }}>
                            {`${SITE.role} · ${new URL(SITE.url).host}`}
                        </div>
                    </div>
                </div>

                {/* Satori renders plain <img> only; next/image has no meaning here. */}
                <img
                    src={`data:image/png;base64,${screenshot.toString("base64")}`}
                    alt=""
                    width={596}
                    height={341}
                    style={{
                        borderRadius: 20,
                        objectFit: "cover",
                        objectPosition: "top",
                        boxShadow: "0 24px 48px rgba(15, 23, 42, 0.18)",
                    }}
                />
            </div>
        ),
        {
            ...SIZE,
            fonts: [
                { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
                { name: "Geist", data: geistBold, weight: 700, style: "normal" },
            ],
        }
    );

    /*
     * ImageResponse only emits PNG, which with a screenshot in it came to about
     * 270KB — heavy enough that some messaging apps skip the preview. As JPEG
     * the same card is a fraction of that, with no visible loss at this size.
     */
    const jpeg = await sharp(Buffer.from(await card.arrayBuffer()))
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();

    return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": "image/jpeg" } });
}
