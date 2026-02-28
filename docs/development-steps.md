# Ekklesia CMS Development Steps

## Phase 0: Product framing (complete)
- Define SaaS target: church admin + congregational engagement.
- Establish multi-tenant boundary as a first-class concept.
- Lock initial entities: Tenant, Member, Event.

## Phase 1: Domain baseline (complete)
- Implement core domain models and invariants.
- Implement in-memory service as a reference behavior layer.
- Validate core workflows with unit tests.
- Add role-based access primitives and tenant isolation checks.

## Phase 2: SaaS backend application core (in progress)
- Add framework-agnostic API façade (`EkklesiaAPI`) for orchestration.
- Add subscription plan/status model with write gating.
- Add audit logging hooks for sensitive writes.
- Validate billing + audit + access interactions with unit tests.

## Phase 3: Frontend product UX foundation (in progress)
- Build React + Vite + Tailwind scaffold for modern SaaS UI.
- Implement responsive layout (navbar + sidebar).
- Ship first-cut module screens: Dashboard, Members, Families, Finance, Certificates, Reports, Settings.
- Add mock data service layer for API integration readiness.

## Phase 4: Transport + persistence
- Mount API façade through FastAPI/Django REST contracts and auth middleware.
- Migrate from in-memory to PostgreSQL repositories.
- Add schema migrations and repository interfaces.
- Add integration tests for API and data boundaries.

## Phase 5: SaaS operations
- Feature gating by subscription tier in product modules.
- Billing provider webhooks (trial, active, delinquent, canceled).
- Operational dashboards for tenant health and audit observability.

## Immediate backlog (next 1-2 sprints)
1. Connect React pages to real backend API endpoints.
2. Implement auth UX and route guards.
3. Add attendance, giving, and group management modules.
4. Add CI pipeline (test, lint, type checks, build).
