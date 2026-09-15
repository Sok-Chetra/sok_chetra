/**
 * Google's publicly documented reCAPTCHA v2 test pair. They accept any host
 * (so localhost needs no domain registration) and always verify successfully,
 * with the widget showing an "for testing purposes only" banner.
 *
 * https://developers.google.com/recaptcha/docs/faq
 */
export const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
export const TEST_SECRET_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

/**
 * Whether to fall back to the test pair.
 *
 * Deliberately keyed off the build-time NODE_ENV rather than the request host.
 * A `Host` header is supplied by the caller, so trusting it would let anyone
 * send `Host: localhost` and have the server verify against the always-passing
 * test secret — a complete CAPTCHA bypass. NODE_ENV is fixed at build time, so
 * a production build can never take this path.
 */
export const useTestKeys = process.env.NODE_ENV === "development";

/**
 * Site key for the widget. Safe to evaluate on the client.
 *
 * Development always uses the test key rather than preferring a configured
 * one, so local work keeps functioning no matter how the production key is
 * domain-restricted in the Google console. To exercise the real key locally,
 * run a production build (`npm run build && npm run start`) — NODE_ENV is then
 * "production" and the configured key is used.
 */
export function getRecaptchaSiteKey(): string {
    if (useTestKeys) return TEST_SITE_KEY;

    return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
}
