# Day 3 CI/CD: Build / Test / Deploy Pipeline

## Repository
`cashmemo` — Cash management application (React + Vite)

## Pipeline Overview
GitHub Actions CI/CD for React + Vite frontend application.

### Trigger
- Push/Pull Request to `main`
- Manual workflow dispatch

### Stages

#### 1. Lint & Format
- ESLint + Prettier
- TypeScript typecheck (if applicable)

#### 2. Test
- Unit tests (Vitest + React Testing Library)
- Component tests
- Snapshot tests

#### 3. Build
- `npm run build` (Vite production build)
- Output to `dist/`

#### 4. Security Scan
- `npm audit`
- Secret detection (no API keys, no secrets)
- LocalStorage data exposure check

#### 5. Deploy (on merge to `main`)
- Deploy static files to Vercel/Netlify/GitHub Pages
- CDN invalidation
- Health check: `GET /`

### Quality Gates
- All tests pass
- Build succeeds
- No secrets committed
- Linting clean

### Artifacts
- Static build (`dist/`)
- Test reports
- Coverage reports
- Deployment URL

## Day 3 Outcome
CI/CD pipeline documented. No code changes. 0 PRs. Ready for Day 4 (project restructuring).