# Ekklesia CMS

Ekklesia CMS is a multi-tenant SaaS platform for church operations and engagement.

## Current foundation
- Backend domain/service core (tenant, member, event, RBAC, billing gates, audit logs)
- Framework-agnostic backend API façade
- React + Vite + Tailwind frontend SaaS dashboard scaffold

## Frontend (React)
The new UI is located in `frontend/` and includes:
- Modern SaaS layout (top navbar + collapsible sidebar)
- Dashboard with KPI cards, charts, and alerts
- Members, Families, Finance, Certificates, Reports, Settings pages
- Design system aligned with the requested church-friendly palette

### Run frontend locally
```bash
cd frontend
npm install
npm run dev
```

### Build frontend
```bash
cd frontend
npm run build
```

## Backend tests
```bash
python -m unittest discover -s tests -p 'test_*.py'
```

## Next milestones
1. Connect frontend `services/api.js` to real backend endpoints
2. Add authentication flow (login/session/token handling)
3. Mount backend façade behind FastAPI/Django REST transport
4. Add PostgreSQL repositories and migrations
