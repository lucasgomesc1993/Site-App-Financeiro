-- ==============================================================================
-- 1. CONFIGURAÇÃO INICIAL
-- ==============================================================================
-- Habilita extensão para gerar UUIDs (Boa adição tua)
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 2. TABELAS
-- ==============================================================================

-- Autores (Com validação de autoridade)
create table authors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  avatar_url text,
  role text default 'Especialista Financeiro', -- Importante para dar contexto
  bio text,
  linkedin_url text, -- CRÍTICO PARA SEO (E-E-A-T)
  created_at timestamptz default now() not null
);

-- Categorias (Silos de Conteúdo)
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz default now() not null
);

-- Posts (Completo)
create table posts (
  id uuid default uuid_generate_v4() primary key,
  slug text not null unique,
  
  -- Conteúdo
  title text not null,
  excerpt text,
  content text,
  
  -- Metadados de Publicação
  published boolean default false,
  published_at timestamptz,
  updated_at timestamptz default now(), -- CRÍTICO PARA SEO (Freshness)
  reading_time int, -- Boa adição tua!
  featured boolean default false, -- Para destaques na home
  
  -- SEO e Mídia
  cover_image text,
  cover_image_alt text, -- Obrigatório para Acessibilidade
  meta_title text,
  meta_description text,
  
  -- Relacionamentos
  author_id uuid references authors(id),
  category_id uuid references categories(id),
  
  -- Extras
  faq jsonb default '[]'::jsonb,
  created_at timestamptz default now() not null
);

-- ==============================================================================
-- 3. SEGURANÇA (RLS)
-- ==============================================================================
alter table authors enable row level security;
alter table categories enable row level security;
alter table posts enable row level security;

-- Políticas de Leitura Pública
create policy "Public authors view" on authors for select using (true);
create policy "Public categories view" on categories for select using (true);
create policy "Public posts view" on posts for select using (published = true);

-- Políticas de Escrita (Admin - Autenticado)
-- Isso permite que tu gerencies o blog se decidires criar um painel admin no futuro
create policy "Admin manage all" on posts using (auth.role() = 'authenticated');
create policy "Admin manage authors" on authors using (auth.role() = 'authenticated');
create policy "Admin manage categories" on categories using (auth.role() = 'authenticated');

-- ==============================================================================
-- 4. STORAGE (Imagens) - ISSO FALTOU NO TEU
-- ==============================================================================
-- Cria o bucket público 'blog-images'
insert into storage.buckets (id, name, public) 
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Permite leitura pública das imagens
create policy "Public Access Blog Images"
on storage.objects for select
using ( bucket_id = 'blog-images' );

-- Permite upload apenas para admin
create policy "Admin Upload Blog Images"
on storage.objects for insert
with check ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );

-- ==============================================================================
-- 5. DADOS INICIAIS
-- ==============================================================================
insert into categories (name, slug, description) values
('Finanças Pessoais', 'financas-pessoais', 'Dicas para organizar seu dinheiro'),
('Investimentos', 'investimentos', 'Aprenda a investir melhor'),
('FGTS', 'fgts', 'Tudo sobre Saque-Aniversário e Rescisão');

insert into authors (name, role, bio) values
('Equipe FinZap', 'Redação', 'Especialistas em finanças e tecnologia.');
