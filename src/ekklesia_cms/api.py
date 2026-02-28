from __future__ import annotations

from dataclasses import dataclass
from datetime import date

from .access import Actor
from .billing import Plan, SubscriptionStatus
from .service import InMemoryChurchService


@dataclass(frozen=True, slots=True)
class ApiResponse:
    status_code: int
    payload: dict


class EkklesiaAPI:
    """Framework-agnostic API façade for service orchestration.

    This object keeps web concerns out of domain/service code and can be mounted
    by any transport layer (FastAPI, Flask, CLI, workers).
    """

    def __init__(self, service: InMemoryChurchService) -> None:
        self._service = service

    def create_tenant(self, tenant_id: str, name: str, plan: Plan = Plan.FREE) -> ApiResponse:
        tenant = self._service.create_tenant(tenant_id=tenant_id, name=name, plan=plan)
        subscription = self._service.get_subscription(tenant_id)
        return ApiResponse(
            status_code=201,
            payload={
                "tenant_id": tenant.tenant_id,
                "name": tenant.name,
                "plan": subscription.plan.value,
                "status": subscription.status.value,
            },
        )

    def update_subscription(
        self,
        tenant_id: str,
        plan: Plan,
        status: SubscriptionStatus,
    ) -> ApiResponse:
        subscription = self._service.update_subscription(tenant_id, plan, status)
        return ApiResponse(
            status_code=200,
            payload={
                "tenant_id": subscription.tenant_id,
                "plan": subscription.plan.value,
                "status": subscription.status.value,
            },
        )

    def add_member(
        self,
        actor: Actor,
        tenant_id: str,
        member_id: str,
        first_name: str,
        last_name: str,
        email: str,
    ) -> ApiResponse:
        member = self._service.add_member_as(
            actor,
            tenant_id,
            member_id,
            first_name,
            last_name,
            email,
        )
        return ApiResponse(status_code=201, payload={"member_id": member.member_id})

    def schedule_event(
        self,
        actor: Actor,
        tenant_id: str,
        event_id: str,
        title: str,
        scheduled_for: date,
    ) -> ApiResponse:
        event = self._service.schedule_event_as(actor, tenant_id, event_id, title, scheduled_for)
        return ApiResponse(status_code=201, payload={"event_id": event.event_id})
