
# Fullstack Project - Final (RBAC + Inline Editing)

This monorepo contains:
- Backend: NestJS-style app with RBAC enforcement (RolesGuard), JWT auth in HTTP-only cookies.
- Frontend: Next.js 14 App Router + Tailwind CSS; dashboard with inline cell editing by role.
- Docker Compose with MongoDB.
- Seeders: one user per role (password: password).
- Exports (CSV/XLSX), share token generation, cursor pagination, soft deletes.

Download and run as documented in apps/ folders. Change secrets in .env before production.
