# Ekklesia CMS

Ekklesia CMS is a multi-tenant SaaS platform for church operations and engagement.

## Current focus
This repository currently includes a backend foundation for:
- Tenant onboarding
- Member records
- Event scheduling
- Role-based access policy primitives
- Subscription plan/status gating
- Audit log capture for sensitive writes
- Framework-agnostic API façade for transport integration

The goal is to establish a robust service core before adding a production web transport and persistence layer.

## Quick start
```bash
python -m unittest discover -s tests -p 'test_*.py'
```

## Project structure
- `docs/`: roadmap, architecture notes, and execution phases
- `src/ekklesia_cms/`: domain models, access policy, billing, API façade, and in-memory services
- `tests/`: unit tests validating business rules, authorization, and subscription behavior

## Next milestones
1. Mount `EkklesiaAPI` behind FastAPI endpoints + JWT middleware
2. Add PostgreSQL repositories and migrations
3. Add tenant-scoped audit search endpoints
4. Add billing provider integration and webhook handling
