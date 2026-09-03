import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Briefcase,
  ChevronDown,
  FileSignature,
  MessageCircle,
  Phone,
  ScrollText,
  Scale,
  Search,
  ShieldCheck,
  Compass,
  Handshake,
  Sparkles,
  Instagram,
  Linkedin,
} from "lucide-react";
import heroPhoto from "@/assets/rafael-hero.jpg";
import sobrePhoto from "@/assets/rafael-sobre.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Rafael Almeida | Advocacia Empresarial e Civil" },
      {
        name: "description",
        content:
          "Advocacia estratégica em Direito Empresarial, Civil e Contratos, com atendimento personalizado em Vitória da Conquista — BA.",
      },
      { property: "og:title", content: "Dr. Rafael Almeida | Advocacia Empresarial e Civil" },
      {
        property: "og:description",
        content:
          "Atuação jurídica personalizada, técnica e estratégica para proteger seus interesses em cada etapa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const WHATSAPP = "https://wa.me/5577999999999";

// Placeholders: substituir "#" pelos links reais das redes sociais.
const SOCIAIS = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
];

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

/* ---------------- animation helpers ---------------- */

/**
 * Um único IntersectionObserver compartilhado por toda a página:
 * evita criar dezenas de observers e dispara cada elemento uma só vez.
 */
type RevealCb = () => void;
const revealCallbacks = new WeakMap<Element, RevealCb>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          sharedObserver?.unobserve(e.target);
          const cb = revealCallbacks.get(e.target);
          revealCallbacks.delete(e.target);
          cb?.();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
  }
  return sharedObserver;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    if (!obs) {
      setVisible(true);
      return;
    }
    revealCallbacks.set(el, () => setVisible(true));
    obs.observe(el);
    return () => {
      revealCallbacks.delete(el);
      obs.unobserve(el);
    };
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!visible || done) return;
    const t = window.setTimeout(() => setDone(true), delay + 900);
    return () => window.clearTimeout(t);
  }, [visible, done, delay]);

  return (
    <div
      ref={ref}
      data-visible={visible}
      data-done={done || undefined}
      style={done ? undefined : { transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}


function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, visible } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function Rule() {
  return <span className="block h-px w-16 bg-terracotta" />;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <Rule />
      <span className="text-[11px] tracking-[0.38em] text-terracotta">{children}</span>
    </div>
  );
}

/* ---------------- sections ---------------- */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-graphite/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#inicio" className="leading-none">
          <span className="block font-display text-xl tracking-[0.28em] text-white">
            RAFAEL ALMEIDA
          </span>
          <span className="mt-1 block text-[10px] tracking-[0.42em] text-terracotta-soft">
            ADVOCACIA
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-[13px] tracking-wide text-white/70 transition-colors duration-300 hover:text-terracotta-soft"
            >
              {i.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="bg-terracotta px-6 py-3 text-[12px] tracking-[0.18em] text-white transition-all duration-300 hover:bg-terracotta-soft"
          >
            FALAR COM O ADVOGADO
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <span
            className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`h-px w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-graphite transition-[max-height] duration-500 lg:hidden ${open ? "max-h-[32rem]" : "max-h-0"}`}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {NAV.map((i) => (
            <a
              key={i.href}
              href={i.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm tracking-wide text-white/75"
            >
              {i.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-4 bg-terracotta px-6 py-4 text-center text-[12px] tracking-[0.18em] text-white"
          >
            FALAR COM O ADVOGADO
          </a>
        </nav>
      </div>
    </header>
  );
}

function FloatingWhatsapp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-terracotta px-5 py-4 text-white shadow-xl transition-all duration-300 hover:bg-terracotta-soft hover:shadow-2xl"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-[12px] tracking-[0.18em] sm:inline">WHATSAPP</span>
    </a>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-graphite pt-32 lg:pt-40">
      <div className="pointer-events-none absolute -right-40 top-0 h-[42rem] w-[42rem] rounded-full bg-terracotta/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:pb-28">
        <Reveal>
          <div className="mb-8 flex items-center gap-4">
            <Rule />
            <span className="text-[11px] tracking-[0.38em] text-terracotta-soft">
              VITÓRIA DA CONQUISTA — BA
            </span>
          </div>
          <h1 className="font-display text-[2.6rem] leading-[1.08] text-white sm:text-6xl lg:text-[4.2rem]">
            Advocacia estratégica para decisões que importam.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/65 lg:text-lg">
            Atuação jurídica personalizada, técnica e estratégica para proteger seus interesses e
            oferecer segurança em cada etapa.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="cta-pulse bg-terracotta px-9 py-4 text-center text-[12px] tracking-[0.2em] text-white transition-colors duration-300 hover:bg-terracotta-soft"
            >
              FALAR COM O ADVOGADO
            </a>
            <a
              href="#atuacao"
              className="border border-white/25 px-9 py-4 text-center text-[12px] tracking-[0.2em] text-white/85 transition-colors duration-300 hover:border-terracotta hover:text-terracotta-soft"
            >
              CONHEÇA MINHA ATUAÇÃO
            </a>
          </div>

          <p className="mt-10 text-[12px] tracking-[0.22em] text-white/40">
            ATENDIMENTO PERSONALIZADO • ESTRATÉGIA JURÍDICA • COMPROMISSO
          </p>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="absolute -left-5 -top-5 hidden h-32 w-32 border-l border-t border-terracotta/60 lg:block" />
          <img
            src={heroPhoto}
            alt="Retrato profissional do Dr. Rafael Almeida, advogado"
            width={896}
            height={1216}
            className="relative w-full object-cover shadow-2xl"
          />
          <div className="absolute -bottom-6 left-0 border-l-2 border-terracotta bg-graphite-soft px-7 py-5 shadow-xl sm:left-6">
            <p className="font-display text-lg tracking-[0.14em] text-white">RAFAEL ALMEIDA</p>
            <p className="mt-1 text-[11px] tracking-[0.24em] text-terracotta-soft">
              ADVOGADO | OAB/BA 00.000
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Numeros() {
  const stats = [
    { v: 14, s: "+", t: "ANOS DE ATUAÇÃO" },
    { v: 480, s: "+", t: "CASOS ATENDIDOS" },
    { v: 96, s: "%", t: "SATISFAÇÃO DOS CLIENTES" },
    { v: 24, s: "h", t: "RETORNO MÉDIO DE CONTATO" },
  ];
  return (
    <section className="bg-graphite-soft py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {stats.map((s, i) => (
          <Reveal key={s.t} delay={i * 120}>
            <div className="border-l border-terracotta/50 pl-6">
              <p className="font-display text-5xl text-terracotta-soft lg:text-6xl">
                <Counter to={s.v} suffix={s.s} />
              </p>
              <p className="mt-3 text-[11px] tracking-[0.26em] text-white/55">{s.t}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Sobre() {
  const destaques = [
    "Atendimento personalizado",
    "Análise estratégica",
    "Comunicação clara",
    "Atuação responsável",
  ];
  return (
    <section id="sobre" className="bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <Reveal className="relative order-2 lg:order-1">
          <img
            src={sobrePhoto}
            alt="Dr. Rafael Almeida em seu escritório de advocacia"
            width={896}
            height={1216}
            loading="lazy"
            className="w-full object-cover"
          />
          <div className="absolute -bottom-5 -right-5 hidden h-32 w-32 border-b border-r border-terracotta/60 lg:block" />
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <SectionLabel>SOBRE</SectionLabel>
          <h2 className="font-display text-4xl leading-tight text-graphite lg:text-5xl">
            Conheça o Dr. Rafael Almeida
          </h2>
          <p className="mt-8 leading-relaxed text-muted-foreground">
            Minha atuação é baseada em uma abordagem próxima, estratégica e personalizada. Cada
            situação exige uma análise cuidadosa, levando em consideração não apenas os aspectos
            jurídicos, mas também os objetivos e necessidades de cada cliente.
          </p>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Meu compromisso é oferecer orientação jurídica clara, responsável e fundamentada,
            buscando apresentar os caminhos possíveis para cada situação.
          </p>

          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
            {destaques.map((d) => (
              <div
                key={d}
                className="bg-background px-6 py-5 text-sm tracking-wide text-graphite transition-colors duration-300 hover:bg-sand"
              >
                <span className="mr-3 text-terracotta">—</span>
                {d}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Atuacao() {
  const areas = [
    {
      n: "01",
      icon: Briefcase,
      t: "DIREITO EMPRESARIAL",
      d: "Assessoria jurídica para empresas e empreendedores, com foco em segurança e prevenção de riscos.",
      items: [
        "Constituição e reorganização societária",
        "Conflitos entre sócios",
        "Recuperação de créditos empresariais",
      ],
    },
    {
      n: "02",
      icon: Scale,
      t: "DIREITO CIVIL",
      d: "Atuação em questões contratuais, obrigações, indenizações e demais relações civis.",
      items: [
        "Ações de indenização e danos morais",
        "Questões de responsabilidade civil",
        "Cobranças e inadimplemento",
      ],
    },
    {
      n: "03",
      icon: FileSignature,
      t: "CONTRATOS",
      d: "Elaboração, análise e revisão de contratos com atenção aos detalhes e à segurança jurídica.",
      items: [
        "Contratos de prestação de serviços",
        "Locação comercial e residencial",
        "Revisão de cláusulas de risco",
      ],
    },
  ];
  return (
    <section id="atuacao" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>ATUAÇÃO</SectionLabel>
          <h2 className="font-display text-4xl leading-tight text-graphite lg:text-5xl">
            Áreas de atuação
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Atuação jurídica focada em soluções estratégicas para pessoas e empresas.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal key={a.n} delay={i * 130}>
              <article className="group h-full border border-border bg-background p-10 transition-all duration-500 hover:-translate-y-2 hover:border-terracotta hover:shadow-[0_24px_50px_-24px_color-mix(in_oklab,var(--graphite)_45%,transparent)] lg:p-12">
                <div className="flex items-center justify-between">
                  <a.icon className="h-7 w-7 text-terracotta transition-transform duration-500 group-hover:scale-110" />
                  <span className="font-display text-3xl text-muted-foreground/50">{a.n}</span>
                </div>
                <h3 className="mt-8 text-sm tracking-[0.2em] text-graphite">{a.t}</h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
                <ul className="mt-6 space-y-2">
                  {a.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-px w-3 flex-none bg-terracotta" />
                      {it}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 block h-px w-10 bg-terracotta transition-all duration-500 group-hover:w-24" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaCaso() {
  return (
    <section className="bg-graphite py-20">
      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-[11px] tracking-[0.34em] text-terracotta-soft">SEU CASO É ÚNICO</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-white lg:text-4xl">
              Conte sua situação e receba uma orientação inicial sobre os caminhos possíveis.
            </h2>
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="flex flex-none items-center gap-3 bg-terracotta px-9 py-4 text-[12px] tracking-[0.2em] text-white transition-colors duration-300 hover:bg-terracotta-soft"
          >
            <MessageCircle className="h-4 w-4" />
            FALAR SOBRE MEU CASO
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Diferenciais() {
  const blocos = [
    {
      n: "01",
      icon: Handshake,
      t: "Atendimento próximo",
      d: "Cada cliente recebe atenção individualizada durante o atendimento.",
    },
    {
      n: "02",
      icon: Compass,
      t: "Estratégia",
      d: "Cada situação é analisada cuidadosamente antes da definição dos próximos passos.",
    },
    {
      n: "03",
      icon: Sparkles,
      t: "Clareza",
      d: "Informações jurídicas apresentadas de forma objetiva e compreensível.",
    },
    {
      n: "04",
      icon: ShieldCheck,
      t: "Compromisso",
      d: "Dedicação e responsabilidade em cada etapa da atuação.",
    },
  ];
  return (
    <section id="diferenciais" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <SectionLabel>DIFERENCIAIS</SectionLabel>
            <h2 className="font-display text-4xl leading-tight text-graphite lg:text-5xl">
              Mais do que orientação jurídica.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Um atendimento construído com proximidade, estratégia e clareza.
            </p>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2">
            {blocos.map((b, i) => (
              <Reveal key={b.n} delay={i * 110}>
                <div className="group h-full border-t border-border pt-7 transition-colors duration-500 hover:border-terracotta">
                  <div className="flex items-center gap-4">
                    <b.icon className="h-6 w-6 text-terracotta transition-transform duration-500 group-hover:scale-110" />
                    <span className="text-[11px] tracking-[0.3em] text-muted-foreground">
                      {b.n}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-graphite">{b.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const items = [
    {
      n: "Mariana Duarte",
      c: "Sócia — Duarte Comércio",
      d: "A revisão contratual evitou um problema que poderíamos levar anos para resolver. Explicações claras, sem juridiquês.",
    },
    {
      n: "Carlos Menezes",
      c: "Empresário",
      d: "Senti confiança desde a primeira conversa. Cada etapa foi comunicada com transparência e no tempo certo.",
    },
    {
      n: "Aline Rocha",
      c: "Cliente — Direito Civil",
      d: "Atendimento humano e técnico. Entendi exatamente quais eram minhas opções antes de decidir qualquer coisa.",
    },
  ];
  return (
    <section id="depoimentos" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>DEPOIMENTOS</SectionLabel>
          <h2 className="font-display text-4xl leading-tight text-graphite lg:text-5xl">
            O que dizem os clientes
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.n} delay={i * 130}>
              <figure className="group h-full border border-border bg-background p-10 transition-all duration-500 hover:-translate-y-2 hover:border-terracotta hover:shadow-[0_24px_50px_-24px_color-mix(in_oklab,var(--graphite)_40%,transparent)]">
                <ScrollText className="h-6 w-6 text-terracotta" />
                <blockquote className="mt-6 leading-relaxed text-muted-foreground">
                  “{t.d}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-graphite font-display text-lg text-terracotta-soft">
                    {t.n.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm text-graphite">{t.n}</span>
                    <span className="block text-[11px] tracking-[0.18em] text-muted-foreground">
                      {t.c}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const etapas = [
    {
      n: "01",
      icon: Phone,
      t: "PRIMEIRO CONTATO",
      d: "Apresente brevemente sua necessidade.",
    },
    {
      n: "02",
      icon: Search,
      t: "ANÁLISE",
      d: "As informações são avaliadas cuidadosamente para compreender a situação.",
    },
    {
      n: "03",
      icon: Compass,
      t: "ORIENTAÇÃO",
      d: "Você recebe uma orientação clara sobre os caminhos jurídicos possíveis.",
    },
  ];
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <h2 className="max-w-xl font-display text-4xl leading-tight text-graphite lg:text-5xl">
            Um atendimento simples e transparente
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <span className="absolute left-6 top-0 hidden h-full w-px bg-border sm:block lg:left-0 lg:top-7 lg:h-px lg:w-full" />
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {etapas.map((e, i) => (
              <Reveal key={e.n} delay={i * 150}>
                <div className="relative pl-20 sm:pl-20 lg:pl-0">
                  <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-terracotta bg-background text-terracotta lg:relative lg:mb-8">
                    <e.icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-2xl text-terracotta">{e.n}</span>
                  <h3 className="mt-3 text-sm tracking-[0.2em] text-graphite">{e.t}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const perguntas = [
    {
      q: "Como funciona o primeiro atendimento?",
      a: "O primeiro contato pode ser feito por WhatsApp ou e-mail. Você apresenta brevemente sua situação e, a partir disso, agendamos uma conversa para entender os detalhes.",
    },
    {
      q: "O atendimento pode ser feito à distância?",
      a: "Sim. Grande parte do acompanhamento pode ser realizado de forma remota, por videochamada, telefone ou mensagem, com o mesmo cuidado do atendimento presencial.",
    },
    {
      q: "Quais informações devo levar na primeira conversa?",
      a: "Contratos, notificações, comprovantes e qualquer documento relacionado à situação ajudam a acelerar a análise, mas não são obrigatórios no primeiro contato.",
    },
    {
      q: "Como são definidos os honorários?",
      a: "Os honorários são apresentados de forma transparente após a análise inicial, respeitando os parâmetros da tabela da OAB e a complexidade de cada caso.",
    },
    {
      q: "Em quanto tempo recebo um retorno?",
      a: "Mensagens enviadas em dias úteis costumam ser respondidas em até 24 horas.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10">
        <Reveal>
          <SectionLabel>DÚVIDAS FREQUENTES</SectionLabel>
          <h2 className="font-display text-4xl leading-tight text-graphite lg:text-5xl">
            Perguntas frequentes
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Respostas objetivas às dúvidas mais comuns sobre o atendimento jurídico.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="divide-y divide-border border-y border-border">
            {perguntas.map((p, i) => {
              const isOpen = open === i;
              return (
                <div key={p.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-base text-graphite">{p.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-none text-terracotta transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground">
                        {p.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Frase() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <Reveal>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="font-display text-3xl leading-[1.35] text-graphite sm:text-4xl lg:text-[2.9rem]">
            “Conhecimento jurídico aliado a uma abordagem estratégica e humana.”
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-terracotta" />
          <p className="mt-6 text-[11px] tracking-[0.3em] text-muted-foreground">
            DR. RAFAEL ALMEIDA — ADVOGADO
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function ContatoForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] tracking-[0.28em] text-white/40">NOME</span>
          <input
            required
            name="nome"
            type="text"
            className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-white outline-none transition-colors focus:border-terracotta"
          />
        </label>
        <label className="block">
          <span className="text-[11px] tracking-[0.28em] text-white/40">E-MAIL</span>
          <input
            required
            name="email"
            type="email"
            className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-white outline-none transition-colors focus:border-terracotta"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-[11px] tracking-[0.28em] text-white/40">TELEFONE (OPCIONAL)</span>
        <input
          name="telefone"
          type="tel"
          className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-white outline-none transition-colors focus:border-terracotta"
        />
      </label>
      <label className="block">
        <span className="text-[11px] tracking-[0.28em] text-white/40">
          DESCRIÇÃO BREVE DO CASO
        </span>
        <textarea
          required
          name="mensagem"
          rows={4}
          className="mt-2 w-full resize-none border-b border-white/15 bg-transparent py-3 text-white outline-none transition-colors focus:border-terracotta"
        />
      </label>

      <label className="flex items-start gap-3 pt-1">
        <input
          required
          type="checkbox"
          name="consentimento"
          className="mt-1 h-4 w-4 flex-none accent-[var(--terracotta)]"
        />
        <span className="text-xs leading-relaxed text-white/50">
          Concordo com o tratamento dos meus dados de acordo com a{" "}
          <Link
            to="/politica-de-privacidade"
            className="text-terracotta-soft underline underline-offset-4"
          >
            Política de Privacidade
          </Link>
          , conforme a LGPD.
        </span>
      </label>

      <button
        type="submit"
        className="w-full border border-terracotta px-10 py-4 text-[12px] tracking-[0.2em] text-terracotta-soft transition-colors duration-300 hover:bg-terracotta hover:text-white sm:w-auto"
      >
        ENVIAR MENSAGEM
      </button>

      {sent && (
        <p className="text-xs leading-relaxed text-white/50">
          Mensagem registrada. Este site é demonstrativo; o envio não é encaminhado.
        </p>
      )}
    </form>
  );
}

function Contato() {
  return (
    <section id="contato" className="bg-graphite py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <Reveal>
          <div className="mb-7 flex items-center gap-4">
            <Rule />
            <span className="text-[11px] tracking-[0.38em] text-terracotta-soft">CONTATO</span>
          </div>
          <h2 className="font-display text-4xl leading-tight text-white lg:text-5xl">
            Vamos conversar?
          </h2>
          <p className="mt-7 max-w-md leading-relaxed text-white/60">
            Se você precisa de orientação jurídica, entre em contato para apresentar sua situação.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block w-full bg-terracotta px-10 py-5 text-center text-[12px] tracking-[0.2em] text-white transition-colors duration-300 hover:bg-terracotta-soft sm:w-auto"
          >
            FALAR PELO WHATSAPP
          </a>

          <div className="mt-12">
            <p className="mb-4 text-[11px] tracking-[0.28em] text-white/40">
              OU ENVIE UMA MENSAGEM
            </p>
            <ContatoForm />
          </div>
        </Reveal>

        <Reveal delay={120} className="space-y-8 border-t border-white/10 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
          <div>
            <p className="font-display text-2xl text-white">Dr. Rafael Almeida</p>
            <p className="mt-2 text-[11px] tracking-[0.24em] text-terracotta-soft">
              ADVOGADO | OAB/BA 00.000
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.28em] text-white/40">LOCALIZAÇÃO</p>
            <p className="mt-2 text-white/80">Vitória da Conquista — BA</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.28em] text-white/40">TELEFONE</p>
            <p className="mt-2 text-white/80">(77) 99999-9999</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.28em] text-white/40">E-MAIL</p>
            <a
              href="mailto:contato@rafaelalmeida.adv.br"
              className="mt-2 block text-white/80 transition-colors hover:text-terracotta-soft"
            >
              contato@rafaelalmeida.adv.br
            </a>
          </div>

          <div>
            <p className="mb-4 text-[11px] tracking-[0.28em] text-white/40">REGIÃO DE ATENDIMENTO</p>
            <div className="overflow-hidden border border-white/10">
              <iframe
                title="Mapa de Vitória da Conquista — BA"
                src="https://www.google.com/maps?q=Vit%C3%B3ria%20da%20Conquista%2C%20BA&output=embed"
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, filter: "grayscale(1) contrast(0.9)" }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="bg-graphite-soft">
      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 border-b border-white/10 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <h2 className="max-w-xl font-display text-2xl leading-snug text-white lg:text-3xl">
            Ainda com dúvidas? Um primeiro contato não compromete nada.
          </h2>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="flex flex-none items-center gap-3 border border-terracotta px-8 py-4 text-[12px] tracking-[0.2em] text-terracotta-soft transition-colors duration-300 hover:bg-terracotta hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            INICIAR CONVERSA
          </a>
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-3 lg:px-10">
        <div>
          <span className="block font-display text-xl tracking-[0.28em] text-white">
            RAFAEL ALMEIDA
          </span>
          <span className="mt-1 block text-[10px] tracking-[0.42em] text-terracotta-soft">
            ADVOCACIA
          </span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
            Advocacia estratégica com atendimento personalizado.
          </p>
        </div>

        <nav className="flex flex-col gap-3 lg:items-center">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-white/55 transition-colors hover:text-terracotta-soft"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col justify-end gap-4 lg:items-end lg:text-right">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-white/40">CONTATO</p>
            <p className="mt-2 text-sm text-white/70">(77) 99999-9999</p>
            <a
              href="mailto:contato@rafaelalmeida.adv.br"
              className="block text-sm text-white/70 transition-colors hover:text-terracotta-soft"
            >
              contato@rafaelalmeida.adv.br
            </a>
          </div>

          <div className="flex items-center gap-3 lg:justify-end">
            {SOCIAIS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                title={`${s.label} (link a definir)`}
                className="flex h-10 w-10 items-center justify-center border border-terracotta/60 text-terracotta-soft transition-colors duration-300 hover:bg-terracotta hover:text-white"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <Link
            to="/politica-de-privacidade"
            className="text-xs text-white/45 underline underline-offset-4 transition-colors hover:text-terracotta-soft"
          >
            Política de Privacidade
          </Link>

          <p className="text-xs text-white/40">
            © 2026 Rafael Almeida Advocacia. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-white/25">Site demonstrativo — informações fictícias.</p>
        </div>

      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen scroll-smooth bg-background">
      <Header />
      <main>
        <Hero />
        <Numeros />
        <Sobre />
        <Atuacao />
        <CtaCaso />
        <Diferenciais />
        <Depoimentos />
        <ComoFunciona />
        <Faq />
        <Frase />
        <Contato />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
