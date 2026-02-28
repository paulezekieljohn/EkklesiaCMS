# Ekklesia CMS Development Steps

## Phase 0: Product framing (complete)
- Define SaaS target: church admin + congregational engagement.
- Establish multi-tenant boundary as a first-class concept.
- Lock initial entities: Tenant, Member, Event.

## Phase 1: Domain baseline (complete)
- Implement core domain models and invariants.
- Implement an in-memory service as a reference behavior layer.
- Validate core workflows with unit tests.
- Add role-based access primitives and tenant isolation checks.

## Phase 2: API and security (next)
- Introduce FastAPI contracts for tenant provisioning and CRUD operations.
- Add authN/authZ adapters around role model (JWT/session).
- Add audit logging for sensitive changes.

## Phase 3: Data + reliability
- Migrate from in-memory to PostgreSQL repositories.
- Add migration strategy.
- Add test matrix (unit, integration, API contract).

## Phase 4: SaaS capabilities
- Plan feature gating based on subscription tier.
- Billing lifecycle hooks (trial, active, delinquent, canceled).
- Operational dashboards for tenant health.

## Immediate backlog (next 1-2 sprints)
1. Ship FastAPI endpoints that call service + access policy.
2. Add attendance tracking domain.
3. Add persisted repositories with clean interfaces.
4. Add CI pipeline for tests and linting.
