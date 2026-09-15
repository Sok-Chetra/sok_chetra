/**
 * Renders a JSON-LD block. Server component — the payload ships as markup with
 * no client JavaScript cost.
 */
export default function JsonLd({ schema }: { schema: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            // JSON.stringify output is the trusted, code-defined schema object.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
