# Ekklesia CMS

Ekklesia CMS is a multi-tenant SaaS platform for church operations and engagement.

## Current focus
This repository now contains the initial domain foundation for:
- Tenant onboarding
- Member records
- Event scheduling
- Role-based access policy primitives

The goal is to establish a clean domain layer before adding API and UI surfaces.

## Quick start
```bash
python -m unittest discover -s tests -p 'test_*.py'
```

## Project structure
- `docs/`: roadmap, architecture notes, and execution phases
- `src/ekklesia_cms/`: domain models, access policy, and in-memory services
- `tests/`: unit tests validating business rules

## Next milestones
1. Build REST API layer (FastAPI)
2. Add persistence (PostgreSQL)
3. Introduce tenant billing + subscription boundaries
4. Add audit event pipeline for sensitive operations
