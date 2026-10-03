"use client";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ElementType,
    type ReactNode,
} from "react";

/**
 * Scroll-triggered reveal, animated in CSS.
 *
 * This used to be Framer Motion `whileInView`, whose variants move `y` and
 * `scale` from JavaScript on every frame. On a throttled phone those per-frame
 * main-thread updates kept missing the frame deadline: 22% of frames dropped
 * while scrolling /about-me and 33% on /portfolio, and nearly every dropped
 * frame had a main-thread animation running. Now the only script is an
 * IntersectionObserver that marks the element once; the movement itself is a
 * CSS animation of opacity and transform, which the compositor runs off the
 * main thread. The looks are unchanged — see the reveal-* block in globals.css.
 *
 * Wrapping just the animated boundary in this component lets the surrounding
 * section stay a server component, so the content itself ships as plain HTML.
 */

/** The four looks the old Framer presets had, plus a container that only staggers. */
export type RevealVariant = "fade-up" | "item" | "pop" | "heading" | "none";

type RevealTag = "div" | "section" | "article" | "ul" | "li" | "p" | "h1" | "h2";

/** Children with an `order` start at `delayMs + order * stepMs`. */
type Stagger = { delayMs: number; stepMs: number };

/*
 * How an "inherit" child learns that its section has been revealed, and how
 * every Reveal inside a section learns its `touch` setting. Context reaches
 * them even though the section passes them in as server-rendered children,
 * which is what lets those sections stay server components.
 */
const RevealContext = createContext<{
    shown: boolean;
    stagger?: Stagger;
    touch?: "none";
} | null>(null);

type RevealProps = {
    /** Optional: a Reveal can be a purely decorative element such as a rule. */
    children?: ReactNode;
    /** Element to render. Defaults to a plain div. */
    as?: RevealTag;
    className?: string;
    variant?: RevealVariant;
    /**
     * "scroll" reveals when scrolled into view. "inherit" has no trigger of its
     * own and reveals with the nearest Reveal above it — how list items join a
     * section's stagger.
     */
    trigger?: "scroll" | "inherit";
    /**
     * For "scroll": "once" waits until the element is 100px inside the view,
     * "partial" starts as soon as a fifth of it shows — for wide grids.
     */
    viewport?: "once" | "partial";
    /** On a container: how its "inherit" children are spaced out. */
    stagger?: Stagger;
    /** On an "inherit" child: its position in the parent's stagger. */
    order?: number;
    /**
     * "none" leaves this in place on a phone or tablet, where nothing below
     * the hero moves — see the end of globals.css. Every Reveal inside it
     * follows suit.
     */
    touch?: "none";
    /** Landmark and labelling attributes only. */
    id?: string;
    role?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
};

export default function Reveal({
    children,
    as = "div",
    className,
    variant = "fade-up",
    trigger = "scroll",
    viewport = "once",
    stagger,
    order,
    touch,
    ...rest
}: RevealProps) {
    const Tag = as as ElementType;
    const parent = useContext(RevealContext);
    const ref = useRef<HTMLElement>(null);
    const [seen, setSeen] = useState(false);

    const inherits = trigger === "inherit";
    const shown = inherits ? (parent?.shown ?? false) : seen;
    const touchMode = touch ?? parent?.touch;

    useEffect(() => {
        const element = ref.current;
        if (inherits || !element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                setSeen(true);
                observer.disconnect();
            },
            viewport === "partial" ? { threshold: 0.2 } : { rootMargin: "0px 0px -100px 0px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [inherits, viewport]);

    const delayMs =
        order !== undefined && parent?.stagger
            ? parent.stagger.delayMs + order * parent.stagger.stepMs
            : undefined;

    return (
        <RevealContext.Provider value={{ shown, stagger, touch: touchMode }}>
            <Tag
                ref={ref}
                className={[
                    variant !== "none" && `reveal-${variant}`,
                    touchMode && `reveal-touch-${touchMode}`,
                    className,
                ]
                    .filter(Boolean)
                    .join(" ")}
                data-shown={shown ? "" : undefined}
                style={
                    delayMs === undefined
                        ? undefined
                        : ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties)
                }
                {...rest}
            >
                {children}
            </Tag>
        </RevealContext.Provider>
    );
}
