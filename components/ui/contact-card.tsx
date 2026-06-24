import { Reveal } from "@/components/ui/reveal";

type ContactCardProps = {
  label: string;
  value: string;
  href: string;
  description: string;
};

export function ContactCard({ label, value, href, description }: ContactCardProps) {
  return (
    <Reveal>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="glass-panel block rounded-[1.75rem] border border-white/10 p-6 transition-transform duration-300 hover:-translate-y-1"
      >
        <p className="text-xs uppercase tracking-[0.32em] text-cream/50">{label}</p>
        <p className="mt-4 font-display text-3xl text-cream">{value}</p>
        <p className="mt-4 text-sm leading-7 text-cream/70">{description}</p>
      </a>
    </Reveal>
  );
}
