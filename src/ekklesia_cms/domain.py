from __future__ import annotations

from dataclasses import dataclass
from datetime import date


@dataclass(frozen=True, slots=True)
class Tenant:
    tenant_id: str
    name: str

    def __post_init__(self) -> None:
        if not self.tenant_id.strip():
            raise ValueError("tenant_id is required")
        if not self.name.strip():
            raise ValueError("tenant name is required")


@dataclass(frozen=True, slots=True)
class Member:
    member_id: str
    tenant_id: str
    first_name: str
    last_name: str
    email: str

    def __post_init__(self) -> None:
        if not self.member_id.strip():
            raise ValueError("member_id is required")
        if not self.tenant_id.strip():
            raise ValueError("tenant_id is required")
        if not self.first_name.strip() or not self.last_name.strip():
            raise ValueError("member name is required")
        if "@" not in self.email:
            raise ValueError("valid email is required")


@dataclass(frozen=True, slots=True)
class Event:
    event_id: str
    tenant_id: str
    title: str
    scheduled_for: date

    def __post_init__(self) -> None:
        if not self.event_id.strip():
            raise ValueError("event_id is required")
        if not self.tenant_id.strip():
            raise ValueError("tenant_id is required")
        if not self.title.strip():
            raise ValueError("event title is required")
