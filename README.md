# ChatGPT Clone - Next.js

A modern ChatGPT clone built with the latest web technologies.

## Tech Stack

| Technology                                    | Version    | Purpose                      |
| --------------------------------------------- | ---------- | ---------------------------- |
| [Next.js](https://nextjs.org/)                | 16.2.10    | React framework (App Router) |
| [React](https://react.dev/)                   | 19.2.4     | UI library                   |
| [TypeScript](https://www.typescriptlang.org/) | ^5         | Type safety                  |
| [Tailwind CSS](https://tailwindcss.com/)      | ^4         | Utility-first CSS framework  |
| [Zustand](https://zustand.docs.pmnd.rs/)      | ^5.0.14    | State management             |
| [Zod](https://zod.dev/)                       | ^4.4.3     | Schema validation            |
| [ESLint](https://eslint.org/)                 | ^9         | Code linting                 |
| [Turbopack](https://turbo.build/pack)         | (built-in) | Dev bundler                  |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Build for production                    |
| `npm start`     | Start production server                 |
| `npm run lint`  | Run ESLint                              |

## Project Structure

```
src/
├── app/          # App Router pages & layouts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── ...
```
