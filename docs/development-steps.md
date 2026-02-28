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

## Phase 2: API, billing, and security core (in progress)
- Add framework-agnostic API façade (`EkklesiaAPI`) for application orchestration.
- Add subscription plan/status model with write gating.
- Add audit logging hooks for sensitive writes.
- Validate billing + audit + access interactions with unit tests.

## Phase 3: Transport + persistence
- Mount API façade through FastAPI contracts and auth middleware.
- Migrate from in-memory to PostgreSQL repositories.
- Add schema migrations and repository interfaces.
- Add integration tests for API and data boundaries.

## Phase 4: SaaS operations
- Feature gating by subscription tier in product modules.
- Billing provider webhooks (trial, active, delinquent, canceled).
- Operational dashboards for tenant health and audit observability.

## Immediate backlog (next 1-2 sprints)
1. Implement FastAPI routes and token-based actor resolution.
2. Introduce attendance, giving, and groups modules.
3. Add persisted repository implementations for service interfaces.
4. Add CI pipeline (test, lint, type checks).
