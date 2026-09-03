import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

function Rule() {
  return <span className="block h-px w-16 bg-[var(--gold)]" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#inicio" className="leading-none">
          <span className="block font-display text-xl tracking-[0.28em] text-white">
            RAFAEL ALMEIDA
          </span>
          <span className="mt-1 block text-[10px] tracking-[0.42em] text-[var(--gold)]">
            ADVOCACIA
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-[13px] tracking-wide text-white/70 transition-colors duration-300 hover:text-[var(--gold)]"
            >
              {i.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="border border-[var(--gold)]/70 px-6 py-3 text-[12px] tracking-[0.18em] text-[var(--gold)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-navy"
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
        className={`overflow-hidden border-t border-white/10 bg-navy transition-[max-height] duration-500 lg:hidden ${open ? "max-h-96" : "max-h-0"}`}
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
            className="mt-4 border border-[var(--gold)]/70 px-6 py-4 text-center text-[12px] tracking-[0.18em] text-[var(--gold)]"
          >
            FALAR COM O ADVOGADO
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy pt-32 lg:pt-40">
      <div className="pointer-events-none absolute -right-40 top-0 h-[42rem] w-[42rem] rounded-full bg-navy-soft/70 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:pb-28">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <Rule />
            <span className="text-[11px] tracking-[0.38em] text-[var(--gold)]">
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
              className="bg-[var(--gold)] px-9 py-4 text-center text-[12px] tracking-[0.2em] text-navy transition-opacity duration-300 hover:opacity-90"
            >
              FALAR COM O ADVOGADO
            </a>
            <a
              href="#atuacao"
              className="border border-white/25 px-9 py-4 text-center text-[12px] tracking-[0.2em] text-white/85 transition-colors duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              CONHEÇA MINHA ATUAÇÃO
            </a>
          </div>

          <p className="mt-10 text-[12px] tracking-[0.22em] text-white/40">
            ATENDIMENTO PERSONALIZADO • ESTRATÉGIA JURÍDICA • COMPROMISSO
          </p>
        </div>

        <div className="relative">
          <div className="absolute -left-5 -top-5 hidden h-32 w-32 border-l border-t border-[var(--gold)]/50 lg:block" />
          <img
            src={heroPhoto}
            alt="Retrato profissional do Dr. Rafael Almeida, advogado"
            width={896}
            height={1216}
            className="relative w-full object-cover shadow-2xl"
          />
          <div className="absolute -bottom-6 left-0 border-l-2 border-[var(--gold)] bg-navy-soft px-7 py-5 shadow-xl sm:left-6">
            <p className="font-display text-lg tracking-[0.14em] text-white">RAFAEL ALMEIDA</p>
            <p className="mt-1 text-[11px] tracking-[0.24em] text-[var(--gold)]">
              ADVOGADO | OAB/BA 00.000
            </p>
          </div>
        </div>
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
        <div className="relative order-2 lg:order-1">
          <img
            src={sobrePhoto}
            alt="Dr. Rafael Almeida em seu escritório de advocacia"
            width={896}
            height={1216}
            loading="lazy"
            className="w-full object-cover"
          />
          <div className="absolute -bottom-5 -right-5 hidden h-32 w-32 border-b border-r border-[var(--gold)]/60 lg:block" />
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-7 flex items-center gap-4">
            <Rule />
            <span className="text-[11px] tracking-[0.38em] text-[var(--gold)]">SOBRE</span>
          </div>
          <h2 className="font-display text-4xl leading-tight text-navy lg:text-5xl">
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
              <div key={d} className="bg-background px-6 py-5 text-sm tracking-wide text-navy">
                <span className="mr-3 text-[var(--gold)]">—</span>
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Atuacao() {
  const areas = [
    {
      n: "01",
      t: "DIREITO EMPRESARIAL",
      d: "Assessoria jurídica para empresas e empreendedores, com foco em segurança e prevenção de riscos.",
    },
    {
      n: "02",
      t: "DIREITO CIVIL",
      d: "Atuação em questões contratuais, obrigações, indenizações e demais relações civis.",
    },
    {
      n: "03",
      t: "CONTRATOS",
      d: "Elaboração, análise e revisão de contratos com atenção aos detalhes e à segurança jurídica.",
    },
  ];
  return (
    <section id="atuacao" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <div className="mb-7 flex items-center gap-4">
            <Rule />
            <span className="text-[11px] tracking-[0.38em] text-[var(--gold)]">ATUAÇÃO</span>
          </div>
          <h2 className="font-display text-4xl leading-tight text-navy lg:text-5xl">
            Áreas de atuação
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Atuação jurídica focada em soluções estratégicas para pessoas e empresas.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
          {areas.map((a) => (
            <article
              key={a.n}
              className="group relative bg-background p-10 transition-colors duration-500 hover:bg-navy lg:p-12"
            >
              <span className="font-display text-3xl text-[var(--gold)]">{a.n}</span>
              <h3 className="mt-8 text-sm tracking-[0.2em] text-navy transition-colors duration-500 group-hover:text-white">
                {a.t}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-white/65">
                {a.d}
              </p>
              <span className="mt-8 block h-px w-10 bg-[var(--gold)] transition-all duration-500 group-hover:w-20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Diferenciais() {
  const blocos = [
    { n: "01", t: "Atendimento próximo", d: "Cada cliente recebe atenção individualizada durante o atendimento." },
    { n: "02", t: "Estratégia", d: "Cada situação é analisada cuidadosamente antes da definição dos próximos passos." },
    { n: "03", t: "Clareza", d: "Informações jurídicas apresentadas de forma objetiva e compreensível." },
    { n: "04", t: "Compromisso", d: "Dedicação e responsabilidade em cada etapa da atuação." },
  ];
  return (
    <section id="diferenciais" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <div className="mb-7 flex items-center gap-4">
              <Rule />
              <span className="text-[11px] tracking-[0.38em] text-[var(--gold)]">DIFERENCIAIS</span>
            </div>
            <h2 className="font-display text-4xl leading-tight text-navy lg:text-5xl">
              Mais do que orientação jurídica.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Um atendimento construído com proximidade, estratégia e clareza.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {blocos.map((b) => (
              <div key={b.n} className="border-t border-border pt-7">
                <span className="text-[11px] tracking-[0.3em] text-[var(--gold)]">{b.n}</span>
                <h3 className="mt-4 font-display text-2xl text-navy">{b.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactoCta() {
  return (
    <section className="bg-navy py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <h2 className="font-display text-4xl leading-tight text-white lg:text-[3.4rem]">
          Seu caso merece atenção individual.
        </h2>
        <p className="mx-auto mt-7 max-w-xl leading-relaxed text-white/60">
          Converse diretamente com o Dr. Rafael Almeida e entenda quais caminhos jurídicos podem ser
          avaliados para sua situação.
        </p>
        <a
          href="#contato"
          className="mt-10 inline-block border border-[var(--gold)] px-10 py-4 text-[12px] tracking-[0.2em] text-[var(--gold)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-navy"
        >
          ENTRAR EM CONTATO
        </a>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const etapas = [
    { n: "01", t: "PRIMEIRO CONTATO", d: "Apresente brevemente sua necessidade." },
    { n: "02", t: "ANÁLISE", d: "As informações são avaliadas cuidadosamente para compreender a situação." },
    { n: "03", t: "ORIENTAÇÃO", d: "Você recebe uma orientação clara sobre os caminhos jurídicos possíveis." },
  ];
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="max-w-xl font-display text-4xl leading-tight text-navy lg:text-5xl">
          Um atendimento simples e transparente
        </h2>
        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-16">
          {etapas.map((e) => (
            <div key={e.n}>
              <div className="flex items-center gap-5">
                <span className="font-display text-4xl text-[var(--gold)]">{e.n}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-6 text-sm tracking-[0.2em] text-navy">{e.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Frase() {
  return (
    <section className="bg-background py-32 lg:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p className="font-display text-3xl leading-[1.35] text-navy sm:text-4xl lg:text-[2.9rem]">
          “Conhecimento jurídico aliado a uma abordagem estratégica e humana.”
        </p>
        <div className="mx-auto mt-10 h-px w-16 bg-[var(--gold)]" />
        <p className="mt-6 text-[11px] tracking-[0.3em] text-muted-foreground">
          DR. RAFAEL ALMEIDA — ADVOGADO
        </p>
      </div>
    </section>
  );
}

function Contato() {
  return (
    <section id="contato" className="bg-navy py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <div>
          <div className="mb-7 flex items-center gap-4">
            <Rule />
            <span className="text-[11px] tracking-[0.38em] text-[var(--gold)]">CONTATO</span>
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
            className="mt-10 inline-block w-full bg-[var(--gold)] px-10 py-5 text-center text-[12px] tracking-[0.2em] text-navy transition-opacity duration-300 hover:opacity-90 sm:w-auto"
          >
            FALAR PELO WHATSAPP
          </a>
        </div>

        <div className="space-y-8 border-t border-white/10 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
          <div>
            <p className="font-display text-2xl text-white">Dr. Rafael Almeida</p>
            <p className="mt-2 text-[11px] tracking-[0.24em] text-[var(--gold)]">
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
              className="mt-2 block text-white/80 transition-colors hover:text-[var(--gold)]"
            >
              contato@rafaelalmeida.adv.br
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[oklch(0.1902_0.0338_254)] py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3 lg:px-10">
        <div>
          <span className="block font-display text-xl tracking-[0.28em] text-white">
            RAFAEL ALMEIDA
          </span>
          <span className="mt-1 block text-[10px] tracking-[0.42em] text-[var(--gold)]">
            ADVOCACIA
          </span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
            Advocacia estratégica com atendimento personalizado.
          </p>
        </div>

        <nav className="flex flex-col gap-3 lg:items-center">
          {NAV.filter((n) => n.label !== "Diferenciais").map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-white/55 transition-colors hover:text-[var(--gold)]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col justify-end gap-3 lg:items-end lg:text-right">
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
        <Sobre />
        <Atuacao />
        <Diferenciais />
        <ImpactoCta />
        <ComoFunciona />
        <Frase />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
