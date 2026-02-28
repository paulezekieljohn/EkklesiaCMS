# Ekklesia CMS

Ekklesia CMS is a multi-tenant SaaS platform for church operations and engagement.

## Current focus
This repository now contains the initial domain foundation for:
- Tenant onboarding
- Member records
- Event scheduling

The goal is to establish a clean domain layer before adding API and UI surfaces.

## Quick start
```bash
python -m unittest discover -s tests -p 'test_*.py'
```

## Project structure
- `docs/`: roadmap, architecture notes, and execution phases
- `src/ekklesia_cms/`: domain models and in-memory services
- `tests/`: unit tests validating business rules

## Next milestones
1. Add authentication + role model
2. Build REST API layer (FastAPI)
3. Add persistence (PostgreSQL)
4. Introduce tenant billing + subscription boundaries
