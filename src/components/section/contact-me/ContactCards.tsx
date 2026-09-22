import ContactCard from "./ContactCard";
import { CONTACT_CHANNELS } from "@/lib/content/contact";

/** Server component — the cards are data-driven and carry no client state. */
export default function ContactCards() {
    return (
        <section className="px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="contact-channels">
            <div className="mx-auto max-w-7xl">
                <h2 id="contact-channels" className="sr-only">
                    Contact channels
                </h2>

                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {CONTACT_CHANNELS.map((channel, index) => (
                        <ContactCard key={channel.id} channel={channel} index={index} />
                    ))}
                </ul>
            </div>
        </section>
    );
}
