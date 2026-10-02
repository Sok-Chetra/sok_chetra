/**
 * Renders a JSON-LD block. Server component — the payload ships as markup with
 * no client JavaScript cost.
 */
export default function JsonLd({ schema }: { schema: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            // The schema is code-defined, but JSON.stringify leaves "<" alone,
            // so a string containing "</script>" would still end this tag
            // early and turn the rest into markup. As < it is the same
            // character to a JSON parser and inert to the HTML one.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
    );
}
