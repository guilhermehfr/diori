<div align="center">

# 📖 Diori

[![Vercel Status](https://therealsujitk-vercel-badge.vercel.app/?app=diori-blog)](https://diori-blog.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 _[Read in English](README.md)_

Uma plataforma de blog moderna dedicada a **bem-estar, saúde e estilo de vida** construída com **Next.js**, **TypeScript** e **Drizzle ORM**.
Projetada para compartilhar conhecimento sobre bem-estar com um painel administrativo intuitivo para gerenciamento de conteúdo, autenticação segura e renderização de markdown elegante.

<img width="700" height="400" alt="image" src="https://github.com/user-attachments/assets/0acd1056-56d6-479f-b4ea-1dafb6be7a14" />

**[Demo ao Vivo →](https://diori-blog.vercel.app)**

</div>

---

## ✨ Características

- **Painel Administrativo** - Gerenciamento seguro de conteúdo com autenticação baseada em JWT.
- **Editor Markdown Rico** - Escreva posts usando um editor markdown intuitivo com pré-visualização ao vivo.
- **Gerenciamento de Imagens** - Upload e gerenciamento de imagens de capa para posts usando armazenamento Vercel Blob.
- **Otimizado para SEO** - Renderização no servidor para melhor visibilidade nos mecanismos de busca e desempenho.
- **Gerenciamento de Posts** - Criar, editar e deletar artigos sobre bem-estar com controle total.
- **Blog Público** - Listagem bonita de posts e páginas individuais de posts para leitores.
- **Design Responsivo** - Design mobile-first usando Tailwind CSS para todos os tamanhos de dispositivo.
- **Persistência de Dados** - PostgreSQL com Drizzle ORM para armazenamento confiável de dados.
- **Limpeza Automática** - Trabalhos cron agendados para limpar dados não utilizados.

<br/>

## 🛠 Stack Tecnológico

| Tecnologia                                                       | Propósito                     |
| ---------------------------------------------------------------- | ----------------------------- |
| [Next.js 16](https://nextjs.org/)                                | Framework React & SSR         |
| [TypeScript 5.9](https://www.typescriptlang.org/)                | Tipagem estática e segurança  |
| [React 19](https://react.dev/)                                   | Biblioteca UI                 |
| [Drizzle ORM](https://orm.drizzle.team/)                         | ORM type-safe para banco      |
| [PostgreSQL](https://www.postgresql.org/)                        | Banco de dados                |
| [Tailwind CSS 4](https://tailwindcss.com/)                       | Framework CSS utility-first   |
| [React Markdown](https://github.com/remarkjs/react-markdown)     | Renderização de Markdown      |
| [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)       | Armazenamento de imagens      |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | Qualidade de código           |

<br/>

## 🧠 Destaques Técnicos

**Camada de Banco Segura** - Utiliza Drizzle ORM com TypeScript para segurança de tipo em tempo de compilação em toda a camada de banco, reduzindo erros em tempo de execução.

**Autenticação Segura** - Implementa autenticação baseada em JWT com hash de senha bcrypt para acesso administrativo seguro.

**Server Actions** - Aproveita Next.js Server Actions para comunicação perfeita cliente-servidor com validação integrada usando Zod.

**Armazenamento de Imagens Otimizado** - Integra-se com Vercel Blob para armazenamento de imagem confiável e apoiado por CDN com configuração mínima.

**Segurança em Markdown** - Usa sanitize-html e rehype-sanitize para renderizar com segurança conteúdo markdown gerado pelo usuário.

**Estratégia de Cache** - Implementa cache do Next.js com cache tags para revalidação inteligente de dados.

<br/>

## 📁 Estrutura do Projeto

```
├── public/
│   └── images/
│
├── src/
│   ├── actions/
│   │   ├── login/
│   │   ├── post/
│   │   └── upload/
│   │
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   └── post/
│   │   ├── api/
│   │   ├── post/
│   │   │   └── [slug]/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Button/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── MarkdownEditor/
│   │   ├── PostsList/
│   │   ├── SafeMarkdown/
│   │   └── admin/
│   │
│   ├── db/
│   │   ├── drizzle/
│   │   │   ├── migrations/
│   │   │   ├── schemas.ts
│   │   │   └── seed.ts
│   │   └── seed/
│   │
│   ├── dto/
│   ├── lib/
│   │   ├── post/
│   │   └── login/
│   ├── models/
│   ├── repositories/
│   ├── types/
│   ├── utils/
│   │
│   └── proxy.ts
│
├── README.md
├── package.json
└── pnpm-lock.yaml
```

---

<br/>

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [pnpm](https://pnpm.io/) gerenciador de pacotes
- Banco de dados [PostgreSQL](https://www.postgresql.org/)
- Conta [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (opcional, para uploads de imagens)

### Instalação

```sh
git clone https://github.com/guilhermehfr/diori.git
cd diori
pnpm install
```

### Configuração de Ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/diori
ADMIN_PASSWORD=sua-senha-segura
BLOB_READ_WRITE_TOKEN=seu-token-vercel-blob
```

### Configuração do Banco de Dados

```sh
# Gerar migrações do banco de dados
pnpm run db:generate

# Executar migrações
pnpm run db:migrate

# Semear dados iniciais (opcional)
pnpm run db:seed:local
```

### Desenvolvimento

```sh
pnpm dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

Painel administrativo: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Build para Produção

```sh
pnpm build
pnpm start
```

### Qualidade de Código

```sh
pnpm lint
pnpm format
```

<br/>

## 🚢 Deploy

O projeto inclui configuração [`vercel.json`](vercel.json) para deploy na Vercel. Para fazer deploy:

1. Conecte o repositório a um projeto Vercel
2. Configure as variáveis de ambiente no painel Vercel
3. Configure a conexão do banco de dados PostgreSQL
4. Faça deploy sem configuração adicional

---

## 👋🏻 Contato

Para dúvidas ou sugestões:

- Email: guihenrique.bra@email.com
- LinkedIn: [linkedin.com/in/guilhermehe](https://linkedin.com/in/guilhermehe)
- GitHub: [github.com/guilhermehfr](https://github.com/guilhermehfr)
