import { Facebook, Instagram } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.6a2.9 2.9 0 1 1-2-2.7V9.4a6.3 6.3 0 1 0 5.4 6.2V8.7a8.2 8.2 0 0 0 3.8 1V6.7Z" />
    </svg>
  );
}

export function SocialLinks({ variant = "light" }: { variant?: "light" | "dark" }) {
  const cls = cn(
    "grid h-10 w-10 place-items-center rounded-full transition-colors",
    variant === "dark" ? "bg-ink-foreground/10 hover:bg-primary" : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground",
  );
  return (
    <div className="flex gap-2">
      <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={cls}><Facebook className="h-4 w-4" /></a>
      <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={cls}><Instagram className="h-4 w-4" /></a>
      <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={cls}><TikTokIcon className="h-4 w-4" /></a>
    </div>
  );
}
