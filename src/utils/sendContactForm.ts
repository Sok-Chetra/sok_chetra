export async function sendContactForm(data: { name: string; email: string; message: string; captcha: string }) {
    const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.error || "Failed to send message");
    return json;
}
