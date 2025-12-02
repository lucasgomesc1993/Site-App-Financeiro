
import { NavItem, Testimonial, Module, FAQItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Como Funciona', href: '#solucao' },
  { label: 'Recursos', href: '#modulos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Planos', href: '#investimento' },
  { label: 'Calculadoras', href: '/calculadoras' },
  { label: 'Ferramentas', href: '/ferramentas' },
  { label: 'FAQ', href: '#faq' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Mendes",
    handle: "@carlos_dev",
    text: "Eu nunca conseguia manter uma planilha atualizada. Com o FinZap, eu só mando um áudio 'Gastei 50 no almoço' e pronto. O dashboard se atualiza sozinho. Mágico!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Fernanda Lima",
    handle: "@nanda_arq",
    text: "A IA entende até quando eu falo gírias ou divido a conta. 'Rachei o Uber com a Julia', ele já categoriza transporte e ajusta o valor. Melhor assinatura que tenho.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Roberto Campos",
    handle: "@beto_invest",
    text: "O dashboard é lindo e me dá uma visão clara de onde estou gastando muito. A meta de economia automática mudou meu jogo financeiro.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Juliana Paes",
    handle: "@ju_marketing",
    text: "Parei de usar 3 apps diferentes. Tudo agora é no WhatsApp. A notificação de 'Você excedeu o orçamento de Ifood' me salvou esse mês.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Lucas Silva",
    handle: "@lucas_tech",
    text: "Segurança era minha preocupação, mas ver que não precisa conectar conta bancária direta e funciona só com o que eu envio me deixou tranquilo.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    name: "Marina Costa",
    handle: "@mari_design",
    text: "Finalmente entendi para onde vai meu dinheiro. O relatório semanal no Zap é a única coisa que eu leio sobre finanças.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    name: "Pedro Alcantara",
    handle: "@pedro_mkt",
    text: "Simplesmente funciona. Mando foto da nota fiscal do restaurante e ele lê os itens. Surreal a tecnologia.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    name: "Sofia R.",
    handle: "@sofia_med",
    text: "Não tenho tempo pra organizar finanças. O FinZap faz o trabalho sujo enquanto eu trabalho. Vale cada centavo.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 9,
    name: "Thiago V.",
    handle: "@thiago_vendas",
    text: "Uso para separar gastos da empresa e pessoais. A funcionalidade de #tags na mensagem é genial.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60"
  },
  {
    id: 10,
    name: "Beatriz M.",
    handle: "@bea_arq",
    text: "A interface web é muito clean. Consigo ver gráficos de evolução patrimonial que nenhum banco me mostra.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
  }
];

export const MODULES: Module[] = [
  {
    id: 1,
    title: "Lançamento via WhatsApp",
    description: "Envie áudios, textos ou fotos de notas fiscais. Nossa IA processa em segundos.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 2,
    title: "Categorização com IA",
    description: "Não perca tempo escolhendo categorias. A IA entende que 'Méqui' é Alimentação e 'Uber' é Transporte.",
    image: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 3,
    title: "Dashboard em Tempo Real",
    description: "Visualize para onde seu dinheiro vai com gráficos interativos e bonitos, direto no navegador ou celular.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 4,
    title: "Metas Inteligentes",
    description: "Defina quanto quer gastar por categoria. O FinZap te avisa no WhatsApp se você estiver perto do limite.",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 5,
    title: "Relatórios Semanais",
    description: "Receba um resumo da sua semana toda sexta-feira direto no seu WhatsApp.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=70&w=600&auto=format&fit=crop",
    cols: 1
  },
  {
    id: 6,
    title: "Segurança Total",
    description: "Seus dados são criptografados. Não pedimos senha de banco. Você tem o controle.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=70&w=600&auto=format&fit=crop",
    cols: 1
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Preciso conectar minha conta bancária?",
    answer: "Não! O FinZap funciona com base no que você envia pelo WhatsApp. Isso garante total segurança e privacidade, pois não precisamos de acesso direto ao seu banco."
  },
  {
    question: "A IA entende áudios longos?",
    answer: "Sim! Você pode mandar um áudio de 1 minuto listando vários gastos do dia. A IA vai separar item por item, identificar valores e categorizar tudo automaticamente."
  },
  {
    question: "Posso testar antes de pagar?",
    answer: "Com certeza. Oferecemos 7 dias de teste grátis com acesso a todas as funcionalidades, sem compromisso."
  },
  {
    question: "Funciona para PJ e gastos pessoais?",
    answer: "Sim. Você pode criar 'tags' como #empresa ou #casa na mensagem, e a IA separa os contextos dentro do mesmo dashboard."
  },
  {
    question: "É seguro usar no WhatsApp?",
    answer: "Utilizamos a API oficial do WhatsApp Business (Meta), garantindo criptografia de ponta a ponta. Seus dados financeiros são armazenados em servidores seguros."
  },
  {
    question: "Consigo exportar os dados?",
    answer: "Sim, você pode exportar todo o seu histórico para Excel ou PDF a qualquer momento através do painel web."
  }
];
