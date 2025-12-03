<div align="center">
  <img width="1200" height="475" alt="Junny Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # Junny - Ferramentas e Calculadoras Financeiras
  
  **Sua central completa para cálculos trabalhistas, investimentos e planejamento financeiro.**
</div>

---

## 📋 Sobre o Projeto

O **Junny** é uma aplicação web moderna desenvolvida para oferecer uma ampla gama de calculadoras e ferramentas financeiras gratuitas. O objetivo é simplificar a vida financeira dos usuários, permitindo simulações precisas de rescisão, férias, investimentos, financiamentos e muito mais.

O projeto foi construído com foco em **performance**, **SEO** (Search Engine Optimization) e **experiência do usuário (UX)**, utilizando as mais recentes tecnologias de desenvolvimento web.

## ✨ Funcionalidades Principais

O Junny oferece diversas calculadoras divididas em categorias:

### 🏢 Trabalhista
- **Rescisão CLT:** Calcule o valor exato da sua rescisão.
- **Férias:** Simule o valor das suas férias com 1/3 constitucional.
- **Décimo Terceiro:** Descubra quanto irá receber.
- **Salário Líquido:** Descontos de INSS e IRRF.
- **Horas Extras:** Cálculo preciso com diferentes percentuais.
- **Seguro Desemprego:** Verifique se tem direito e o valor das parcelas.
- **FGTS:** Calcule o saldo e rendimentos.
- **Custo Funcionário:** Para empregadores saberem o custo real.
- **PLR:** Participação nos Lucros e Resultados.
- **Adicional Noturno:** Cálculos para quem trabalha à noite.

### 💰 Investimentos & Planejamento
- **Juros Compostos:** O poder do tempo nos seus investimentos.
- **Primeiro Milhão:** Quanto tempo falta para atingir essa meta?
- **FIRE:** Independência Financeira e Aposentadoria Antecipada.
- **Conversor de Moedas:** Cotações atualizadas.

### 🚗 Dia a Dia
- **Combustível:** Álcool ou Gasolina?
- **Uber vs Carro Próprio:** Qual vale mais a pena?
- **Alugar ou Financiar:** Comparativo imobiliário.
- **Energia Elétrica:** Simule o consumo de aparelhos.

### 🛠️ Ferramentas Extras
- **Gerador de Pix:** Crie QR Codes para pagamentos instantâneos.
- **Blog & Web Stories:** Conteúdo educativo sobre finanças.

## 🚀 Tecnologias Utilizadas

Este projeto utiliza uma stack moderna e performática:

- **Core:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Roteamento:** [React Router v7](https://reactrouter.com/)
- **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async), Sitemap Generator, Prerendering (SSG)
- **Integrações:** [Google GenAI](https://ai.google.dev/) (para recursos de IA), [Supabase](https://supabase.com/)

## 🛠️ Como Executar Localmente

Siga os passos abaixo para rodar o projeto na sua máquina:

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)

### Instalação

1. Clone o repositório (se aplicável) ou baixe os arquivos.
2. Instale as dependências:
   ```bash
   npm install
   ```

### Configuração

1. Crie um arquivo `.env.local` na raiz do projeto baseando-se no `.env` de exemplo.
2. Adicione sua chave da API do Google Gemini (se for utilizar recursos de IA):
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```

### Rodando o Projeto

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```
O projeto estará acessível em `http://localhost:3000`.

## 📦 Build e Deploy

O projeto conta com scripts otimizados para gerar uma versão estática (SSG) para melhor SEO.

Para gerar a versão de produção:
```bash
npm run build
```
Este comando irá:
1. Gerar o Sitemap.
2. Criar as Web Stories.
3. Compilar o servidor e o cliente.
4. Executar o pré-renderizador (`scripts/prerender.js`) para gerar HTML estático das rotas principais.

Para visualizar a versão de produção localmente:
```bash
npm run serve:static
```

## 📂 Estrutura do Projeto

- `/src`: Código fonte da aplicação (Componentes, Páginas, Hooks).
- `/scripts`: Scripts de automação (SEO, Imagens, Prerender).
- `/public`: Arquivos estáticos (Imagens, Ícones).
- `/dist`: Resultado do build de produção.

---

<div align="center">
  Desenvolvido com ❤️ para ajudar nas suas finanças.
</div>