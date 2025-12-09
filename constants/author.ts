import { Author } from "../types/blog";

export const AUTHOR: Author & { social: any, location: string, joined: string } = {
    name: 'Dr. André Financeiro',
    role: 'Especialista em Finanças Pessoais & Investimentos',
    bio: 'Doutor em Economia pela USP, com mais de 15 anos de experiência no mercado financeiro. André é apaixonado por ajudar brasileiros a conquistarem sua independência financeira através de educação simplificada e ferramentas práticas. É autor de 3 livros best-sellers e consultor de grandes empresas.',
    avatar_url: '/author.webp',
    linkedin_url: 'https://linkedin.com',
    location: 'São Paulo, SP',
    joined: 'Membro desde 2023',
    social: {
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        email: 'mailto:contato@finzap.com.br'
    }
};
