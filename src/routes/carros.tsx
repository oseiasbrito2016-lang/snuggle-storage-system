import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Gauge, ShieldCheck, Sparkles, Phone, MapPin, Mail, KeyRound } from "lucide-react";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const HERO = img("1503376780353-7e6692767b70", 2200);

export const Route = createFileRoute("/carros")({
  head: () => ({
    meta: [
      { title: "Maison Auto — Carros de Luxo e Esportivos" },
      { name: "description", content: "Seleção exclusiva de carros de luxo e esportivos, procedência garantida e atendimento personalizado." },
      { property: "og:title", content: "Maison Auto — Carros de Luxo" },
      { property: "og:description", content: "Esportivos e sedãs de luxo selecionados com rigor e entregues com atendimento sob medida." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: HERO },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO },
    ],
  }),
  component: CarrosPage,
});

const cars = [
  { name: "Porsche 911 Carrera", year: 2023, km: "4.200 km", hp: "385 cv", price: "R$ 1.090.000", id: "1580274455191-1c62238fa333" },
  { name: "Mercedes-AMG GT", year: 2022, km: "9.800 km", hp: "530 cv", price: "R$ 1.240.000", id: "1618843479313-40f8afb4b4d8" },
  { name: "BMW M4 Competition", year: 2023, km: "6.100 km", hp: "510 cv", price: "R$ 789.000", id: "1555215695-3004980ad54e" },
  { name: "Lamborghini Huracán", year: 2021, km: "12.400 km", hp: "640 cv", price: "R$ 3.450.000", id: "1544636331-e26879cd4d9b" },
  { name: "Audi R8 V10", year: 2022, km: "7.300 km", hp: "620 cv", price: "R$ 1.690.000", id: "1592198084033-aade902d1aae" },
  { name: "Ford Mustang GT", year: 2023, km: "3.500 km", hp: "488 cv", price: "R$ 529.000", id: "1494976388531-d1058494cdd8" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.dataset.visible = "true";
            io.unobserve(el);
          }
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CarrosPage() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="bg-graphite text-sand">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-graphite/90 py-4 backdrop-blur-md" : "py-7"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#topo" className="font-display text-2xl tracking-[0.3em]">MAISON<span className="text-terracotta">·</span>AUTO</a>
          <nav className="hidden gap-10 text-xs uppercase tracking-[0.25em] text-sand/70 md:flex">
            <a href="#colecao" className="hover:text-terracotta transition-colors">Coleção</a>
            <a href="#experiencia" className="hover:text-terracotta transition-colors">Experiência</a>
            <a href="#contato" className="hover:text-terracotta transition-colors">Contato</a>
          </nav>
        </div>
      </header>

      <section id="topo" className="relative flex h-screen min-h-[640px] items-end overflow-hidden">
        <img src={HERO} alt="Porsche esportivo em ambiente noturno" className="absolute inset-0 h-full w-full scale-110 object-cover animate-[heroZoom_14s_ease-out_forwards]" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-graphite/20" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24">
          <p className="reveal text-xs uppercase tracking-[0.5em] text-terracotta">Desde 2008 · São Paulo</p>
          <h1 className="reveal mt-6 max-w-4xl font-display text-6xl leading-[0.95] md:text-8xl" style={{ transitionDelay: "120ms" }}>
            A arte de <em className="text-terracotta-soft">dirigir</em> o extraordinário.
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-sand/70" style={{ transitionDelay: "240ms" }}>
            Esportivos e sedãs de luxo selecionados um a um, com procedência certificada e atendimento reservado.
          </p>
          <a href="#colecao" className="reveal group mt-10 inline-flex items-center gap-3 border border-terracotta px-8 py-4 text-xs uppercase tracking-[0.3em] transition-all hover:bg-terracotta" style={{ transitionDelay: "360ms" }}>
            Ver coleção <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <section className="border-y border-sand/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[["+1.200", "Veículos entregues"], ["18", "Anos de mercado"], ["42", "Marcas premium"], ["100%", "Laudo cautelar"]].map(([n, l], i) => (
            <div key={l} className="reveal border-sand/10 px-6 py-12 text-center md:border-r last:border-r-0" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="font-display text-5xl text-terracotta">{n}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.25em] text-sand/60">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="colecao" className="mx-auto max-w-7xl px-6 py-32">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-terracotta">Coleção atual</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Em destaque</h2>
          </div>
          <p className="max-w-md text-sand/60">Cada veículo passa por inspeção de 180 pontos antes de chegar ao nosso showroom.</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((c, i) => (
            <article key={c.name} className="reveal group overflow-hidden border border-sand/10 bg-graphite-soft transition-all duration-500 hover:-translate-y-2 hover:border-terracotta/60 hover:shadow-2xl" style={{ transitionDelay: `${(i % 3) * 120}ms` }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={img(c.id, 900)} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <span className="absolute left-4 top-4 bg-graphite/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em] backdrop-blur">{c.year}</span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl">{c.name}</h3>
                <div className="mt-3 flex gap-5 text-xs uppercase tracking-[0.2em] text-sand/50">
                  <span>{c.km}</span><span>{c.hp}</span>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-sand/10 pt-5">
                  <span className="font-display text-xl text-terracotta-soft">{c.price}</span>
                  <a href="#contato" className="text-xs uppercase tracking-[0.25em] text-sand/70 transition-colors group-hover:text-terracotta">Detalhes →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experiencia" className="relative overflow-hidden py-32">
        <img src={img("1617788138017-80ad40651399", 2000)} alt="Interior de carro de luxo" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto max-w-7xl px-6">
          <h2 className="reveal max-w-2xl font-display text-5xl md:text-6xl">Uma experiência à altura do seu próximo carro.</h2>
          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {[
              [ShieldCheck, "Procedência", "Histórico completo e laudo cautelar em todos os veículos."],
              [Gauge, "Test drive", "Agende uma condução exclusiva em horário reservado."],
              [KeyRound, "Consignação", "Vendemos seu carro com discrição e avaliação justa."],
              [Sparkles, "Entrega VIP", "Entrega em domicílio com detalhamento completo."],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof ShieldCheck;
              return (
                <div key={t as string} className="reveal group" style={{ transitionDelay: `${i * 120}ms` }}>
                  <I className="h-9 w-9 text-terracotta transition-transform duration-500 group-hover:scale-110" strokeWidth={1.2} />
                  <h3 className="mt-6 font-display text-2xl">{t as string}</h3>
                  <p className="mt-3 text-sm text-sand/60">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-2">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.5em] text-terracotta">Showroom</p>
          <h2 className="mt-4 font-display text-5xl">Visite-nos.</h2>
          <ul className="mt-10 space-y-5 text-sand/70">
            <li className="flex gap-4"><MapPin className="h-5 w-5 text-terracotta" /> Av. Europa, 1000 — Jardim Europa, São Paulo</li>
            <li className="flex gap-4"><Phone className="h-5 w-5 text-terracotta" /> (11) 4000-0000</li>
            <li className="flex gap-4"><Mail className="h-5 w-5 text-terracotta" /> contato@maisonauto.com.br</li>
          </ul>
        </div>
        <form className="reveal space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Obrigado! Entraremos em contato."); }}>
          {["Nome", "E-mail", "Telefone"].map((p) => (
            <input key={p} required={p !== "Telefone"} placeholder={p} className="w-full border-b border-sand/20 bg-transparent py-4 outline-none transition-colors placeholder:text-sand/40 focus:border-terracotta" />
          ))}
          <textarea placeholder="Qual modelo procura?" rows={3} className="w-full border-b border-sand/20 bg-transparent py-4 outline-none placeholder:text-sand/40 focus:border-terracotta" />
          <button className="cta-pulse mt-4 bg-terracotta px-10 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-terracotta-soft">Agendar visita</button>
        </form>
      </section>

      <footer className="border-t border-sand/10 py-10 text-center text-xs uppercase tracking-[0.3em] text-sand/40">
        © 2026 Maison Auto · Loja fictícia para demonstração
      </footer>
    </div>
  );
}
