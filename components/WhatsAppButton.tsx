import { whatsappLink } from "@/lib/products";

/** Primary "Order on WhatsApp" CTA — opens a chat with `message` pre-typed. */
export default function WhatsAppButton({ message, className = "" }: { message: string; className?: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/b inline-block rounded-full bg-green px-7 py-4 text-base font-bold text-cream shadow-lg shadow-green/25 transition-transform hover:scale-[1.05] active:scale-[0.97] ${className}`}
    >
      Order on WhatsApp
      <span className="ml-2 inline-block transition-transform group-hover/b:translate-x-1">→</span>
    </a>
  );
}
