import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Dr. Rafael Almeida" },
      {
        name: "description",
        content:
          "Como os dados informados neste site são tratados: uso exclusivo para retorno de contato, sem compartilhamento com terceiros, conforme a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade | Dr. Rafael Almeida" },
      {
        property: "og:description",
        content:
          "Informações sobre coleta, finalidade e tratamento de dados pessoais neste site, conforme a Lei nº 13.709/2018 (LGPD).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacidade,
});

const BLOCOS = [
  {
    t: "1. Dados coletados",
    p: "São coletados apenas os dados informados voluntariamente no formulário de contato: nome, e-mail, telefone (opcional) e a descrição breve enviada pelo interessado.",
  },
  {
    t: "2. Finalidade do tratamento",
    p: "Os dados são utilizados exclusivamente para retorno de contato e para compreender preliminarmente a solicitação apresentada. Não são usados para envio de comunicações promocionais.",
  },
  {
    t: "3. Compartilhamento",
    p: "Os dados não são vendidos, cedidos ou compartilhados com terceiros, ressalvadas as hipóteses de cumprimento de obrigação legal ou determinação judicial.",
  },
  {
    t: "4. Armazenamento e sigilo",
    p: "As informações são mantidas pelo tempo necessário ao atendimento da solicitação e observam o dever de sigilo profissional previsto no Estatuto da Advocacia.",
  },
  {
    t: "5. Direitos do titular",
    p: "Nos termos da Lei nº 13.709/2018 (LGPD), o titular pode solicitar a confirmação, o acesso, a correção ou a eliminação de seus dados, bastando encaminhar o pedido pelo e-mail de contato indicado no site.",
  },
  {
    t: "6. Contato",
    p: "Dúvidas sobre esta política podem ser encaminhadas para contato@rafaelalmeida.adv.br.",
  },
];

function Privacidade() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-graphite py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link
            to="/"
            className="text-[11px] tracking-[0.28em] text-terracotta-soft transition-colors hover:text-white"
          >
            ← VOLTAR AO SITE
          </Link>
          <h1 className="mt-8 font-display text-4xl leading-tight text-white lg:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-6 leading-relaxed text-white/60">
            Este documento descreve, de forma objetiva, como são tratados os dados pessoais
            informados por meio deste site.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-10 px-6 lg:px-10">
          {BLOCOS.map((b) => (
            <div key={b.t}>
              <h2 className="font-display text-2xl text-foreground">{b.t}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{b.p}</p>
            </div>
          ))}
          <p className="border-t border-border pt-8 text-xs text-muted-foreground">
            Site demonstrativo — informações fictícias.
          </p>
        </div>
      </section>
    </div>
  );
}
