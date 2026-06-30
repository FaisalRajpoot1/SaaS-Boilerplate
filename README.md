# SaaS Boilerplate Pro

[![CI](https://github.com/FaisalRajpoot1/SaaS-Boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/FaisalRajpoot1/SaaS-Boilerplate/actions/workflows/ci.yml)

A production-grade, commercial-quality SaaS boilerplate — a reusable foundation for
launching new SaaS products in days. Built to be scalable, secure, modular, and fully
documented. Nothing here is application-specific; every module is a reusable building block.

## Repository structure

```
SaaS-Boilerplate/
├── client/   # Frontend  — React + Vite + TypeScript (SPA)
└── server/   # Backend   — Node + Express + TypeScript (REST API)
```

A single Git repository hosts both apps. Each app is self-contained and independently
runnable, while sharing a common toolchain and conventions.

## Stack

| Layer     | Technology                                                                 |
| --------- | -------------------------------------------------------------------------- |
| Frontend  | React (Vite), React Router, TypeScript, Tailwind, Shadcn UI, TanStack Query |
| Backend   | Node.js, Express, TypeScript                                                |
| Database  | PostgreSQL + Prisma                                                         |

## Status

🚧 **M0 — Foundation.** Repository scaffold in progress. Application code not yet added.

## Engineering standards

This project follows the principles documented in [`MASTER_PROJECT_GUIDE.md`](./MASTER_PROJECT_GUIDE.md)
and the full requirements in [`reqs.md`](./reqs.md): SOLID, Clean Architecture, DDD where
appropriate, feature-based structure, TypeScript-only with strict mode, and a security-first mindset.
