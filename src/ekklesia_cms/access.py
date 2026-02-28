from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class Role(str, Enum):
    PLATFORM_ADMIN = "platform_admin"
    TENANT_ADMIN = "tenant_admin"
    STAFF = "staff"
    VIEWER = "viewer"


class Action(str, Enum):
    MANAGE_MEMBERS = "manage_members"
    MANAGE_EVENTS = "manage_events"
    VIEW_MEMBERS = "view_members"
    VIEW_EVENTS = "view_events"


@dataclass(frozen=True, slots=True)
class Actor:
    actor_id: str
    role: Role
    tenant_id: str | None = None

    def __post_init__(self) -> None:
        if not self.actor_id.strip():
            raise ValueError("actor_id is required")
        if self.role != Role.PLATFORM_ADMIN and not (self.tenant_id and self.tenant_id.strip()):
            raise ValueError("tenant_id is required for non-platform actors")


class AuthorizationError(PermissionError):
    pass


class AccessPolicy:
    def assert_allowed(self, actor: Actor, action: Action, tenant_id: str) -> None:
        if actor.role == Role.PLATFORM_ADMIN:
            return

        if actor.tenant_id != tenant_id:
            raise AuthorizationError("actor cannot access another tenant")

        if action in {Action.MANAGE_MEMBERS, Action.MANAGE_EVENTS}:
            if actor.role not in {Role.TENANT_ADMIN, Role.STAFF}:
                raise AuthorizationError("actor lacks write privileges")
            return

        if action in {Action.VIEW_MEMBERS, Action.VIEW_EVENTS}:
            if actor.role not in {Role.TENANT_ADMIN, Role.STAFF, Role.VIEWER}:
                raise AuthorizationError("actor lacks read privileges")
            return

        raise AuthorizationError("unknown action")
