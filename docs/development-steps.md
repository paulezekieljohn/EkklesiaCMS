# Ekklesia CMS Development Steps

## Phase 0: Product framing (complete)
- Define SaaS target: church admin + congregational engagement.
- Establish multi-tenant boundary as a first-class concept.
- Lock initial entities: Tenant, Member, Event.

## Phase 1: Domain baseline (in progress)
- Implement core domain models and invariants.
- Implement an in-memory service as a reference behavior layer.
- Validate core workflows with unit tests.

## Phase 2: API and security
- Introduce API contracts for tenant provisioning and CRUD operations.
- Add authN/authZ model (platform admin, tenant admin, staff).
- Add audit logging for sensitive changes.

## Phase 3: Data + reliability
- Migrate from in-memory to PostgreSQL repositories.
- Add migration strategy.
- Add test matrix (unit, integration, API contract).

## Phase 4: SaaS capabilities
- Plan gating based on subscription tier.
- Billing lifecycle hooks (trial, active, delinquent, canceled).
- Operational dashboards for tenant health.

## Immediate backlog (next 1-2 sprints)
1. Add role-based access policy primitives.
2. Add attendance tracking domain.
3. Build API module exposing current member/event workflows.
4. Add CI pipeline for tests and linting.
