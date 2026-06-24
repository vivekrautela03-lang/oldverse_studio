import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function QuoteSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="glass-panel rounded-[2rem] border border-white/10 px-6 py-14 text-center sm:px-10">
            <p className="font-display text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
              “Some stories are watched. Others are felt.”
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
