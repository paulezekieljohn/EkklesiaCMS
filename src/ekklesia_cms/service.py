from __future__ import annotations

from collections import defaultdict
from datetime import date

from .access import AccessPolicy, Action, Actor
from .domain import Event, Member, Tenant


class InMemoryChurchService:
    def __init__(self) -> None:
        self._tenants: dict[str, Tenant] = {}
        self._members_by_tenant: dict[str, dict[str, Member]] = defaultdict(dict)
        self._events_by_tenant: dict[str, dict[str, Event]] = defaultdict(dict)
        self._policy = AccessPolicy()

    def create_tenant(self, tenant_id: str, name: str) -> Tenant:
        if tenant_id in self._tenants:
            raise ValueError("tenant already exists")
        tenant = Tenant(tenant_id=tenant_id, name=name)
        self._tenants[tenant.tenant_id] = tenant
        return tenant

    def add_member(
        self,
        tenant_id: str,
        member_id: str,
        first_name: str,
        last_name: str,
        email: str,
    ) -> Member:
        self._assert_tenant_exists(tenant_id)
        if member_id in self._members_by_tenant[tenant_id]:
            raise ValueError("member already exists")

        member = Member(
            member_id=member_id,
            tenant_id=tenant_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )
        self._members_by_tenant[tenant_id][member.member_id] = member
        return member

    def add_member_as(
        self,
        actor: Actor,
        tenant_id: str,
        member_id: str,
        first_name: str,
        last_name: str,
        email: str,
    ) -> Member:
        self._policy.assert_allowed(actor, Action.MANAGE_MEMBERS, tenant_id)
        return self.add_member(tenant_id, member_id, first_name, last_name, email)

    def schedule_event(
        self,
        tenant_id: str,
        event_id: str,
        title: str,
        scheduled_for: date,
    ) -> Event:
        self._assert_tenant_exists(tenant_id)
        if event_id in self._events_by_tenant[tenant_id]:
            raise ValueError("event already exists")

        event = Event(
            event_id=event_id,
            tenant_id=tenant_id,
            title=title,
            scheduled_for=scheduled_for,
        )
        self._events_by_tenant[tenant_id][event.event_id] = event
        return event

    def schedule_event_as(
        self,
        actor: Actor,
        tenant_id: str,
        event_id: str,
        title: str,
        scheduled_for: date,
    ) -> Event:
        self._policy.assert_allowed(actor, Action.MANAGE_EVENTS, tenant_id)
        return self.schedule_event(tenant_id, event_id, title, scheduled_for)

    def list_members(self, tenant_id: str) -> list[Member]:
        self._assert_tenant_exists(tenant_id)
        return list(self._members_by_tenant[tenant_id].values())

    def list_members_as(self, actor: Actor, tenant_id: str) -> list[Member]:
        self._policy.assert_allowed(actor, Action.VIEW_MEMBERS, tenant_id)
        return self.list_members(tenant_id)

    def list_events(self, tenant_id: str) -> list[Event]:
        self._assert_tenant_exists(tenant_id)
        return list(self._events_by_tenant[tenant_id].values())

    def list_events_as(self, actor: Actor, tenant_id: str) -> list[Event]:
        self._policy.assert_allowed(actor, Action.VIEW_EVENTS, tenant_id)
        return self.list_events(tenant_id)

    def _assert_tenant_exists(self, tenant_id: str) -> None:
        if tenant_id not in self._tenants:
            raise ValueError("unknown tenant")
