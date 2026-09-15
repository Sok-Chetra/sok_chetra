export type ContactFormPayload = {
    name: string;
    email: string;
    message: string;
    captcha: string;
};

/**
 * Posts the contact form and normalises failures into a thrown Error, so the
 * caller only has to handle one failure shape.
 */
export async function sendContactForm(payload: ContactFormPayload): Promise<void> {
    const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
        throw new Error(data?.error ?? "Failed to send message. Please try again.");
    }
}
