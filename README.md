<div align="center">

# 📖 Diori

[![Vercel Status](https://therealsujitk-vercel-badge.vercel.app/?app=diori-blog)](https://diori-blog.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 _[Leia em Português](README-pt-br.md)_

A modern blog platform dedicated to **wellness, health, and lifestyle** built with **Next.js**, **TypeScript**, and **Drizzle ORM**.
Designed to share wellness insights with an intuitive admin panel for content management, secure authentication, and beautiful markdown rendering.

<img width="700" height="400" alt="image" src="https://github.com/user-attachments/assets/0acd1056-56d6-479f-b4ea-1dafb6be7a14" />

**[Live Demo →](https://diori-blog.vercel.app)**

</div>

---

## ✨ Features

- **Admin Dashboard** - Secure content management with JWT-based authentication.
- **Rich Markdown Editor** - Write posts using an intuitive markdown editor with live preview.
- **Image Management** - Upload and manage cover images for posts using Vercel Blob storage.
- **SEO Optimized** - Server-side rendering for better search engine visibility and performance.
- **Post Management** - Create, edit, and delete wellness articles with full control.
- **Public Blog** - Beautiful post listing and individual post pages for readers.
- **Responsive Design** - Mobile-first design using Tailwind CSS for all device sizes.
- **Database Persistence** - PostgreSQL with Drizzle ORM for reliable data storage.
- **Automatic Cleanup** - Scheduled cron jobs to clean up unused data.

<br/>

## 🛠 Tech Stack

| Technology                                                       | Purpose                       |
| ---------------------------------------------------------------- | ----------------------------- |
| [Next.js 16](https://nextjs.org/)                                | React Framework & SSR         |
| [TypeScript 5.9](https://www.typescriptlang.org/)                | Static typing and type safety |
| [React 19](https://react.dev/)                                   | UI Library                    |
| [Drizzle ORM](https://orm.drizzle.team/)                         | Type-safe database ORM        |
| [PostgreSQL](https://www.postgresql.org/)                        | Database                      |
| [Tailwind CSS 4](https://tailwindcss.com/)                       | Utility-first CSS framework   |
| [React Markdown](https://github.com/remarkjs/react-markdown)     | Markdown rendering            |
| [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)       | Image storage                 |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | Code quality and formatting   |

<br/>

## 🧠 Technical Highlights

**Type-Safe Database Layer** - Uses Drizzle ORM with TypeScript for compile-time type safety across the entire database layer, reducing runtime errors.

**Secure Authentication** - Implements JWT-based authentication with bcrypt password hashing for secure admin access.

**Server Actions** - Leverages Next.js Server Actions for seamless client-server communication with built-in validation using Zod.

**Optimized Image Storage** - Integrates with Vercel Blob for reliable, CDN-backed image storage with minimal setup.

**Markdown Security** - Uses sanitize-html and rehype-sanitize to safely render user-generated markdown content.

**Caching Strategy** - Implements Next.js caching with cache tags for intelligent data revalidation.

<br/>

## 📁 Project Structure

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

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) package manager
- [PostgreSQL](https://www.postgresql.org/) database
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) account (optional, for image uploads)

### Installation

```sh
git clone https://github.com/guilhermehfr/diori.git
cd diori
pnpm install
```

### Environment Setup

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/diori
ADMIN_PASSWORD=your-secure-password
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### Database Setup

```sh
# Generate database migrations
pnpm run db:generate

# Run migrations
pnpm run db:migrate

# Seed initial data (optional)
pnpm run db:seed:local
```

### Development

```sh
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Production Build

```sh
pnpm build
pnpm start
```

### Code Quality

```sh
pnpm lint
pnpm format
```

<br/>

## 🚢 Deployment

The project includes a [`vercel.json`](vercel.json) configuration for Vercel deployment. To deploy:

1. Connect the repository to a Vercel project
2. Set environment variables in Vercel dashboard
3. Configure PostgreSQL database connection
4. Deploy with zero additional configuration

---

## 👋🏻 Contact

For questions or suggestions:

- Email: guihenrique.bra@email.com
- LinkedIn: [linkedin.com/in/guilhermehe](https://linkedin.com/in/guilhermehe)
- GitHub: [github.com/guilhermehfr](https://github.com/guilhermehfr)
