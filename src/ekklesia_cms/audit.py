from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone


@dataclass(frozen=True, slots=True)
class AuditEntry:
    actor_id: str
    action: str
    tenant_id: str
    occurred_at: datetime
    details: str = ""


class AuditLog:
    def __init__(self) -> None:
        self._entries: list[AuditEntry] = []

    def record(self, actor_id: str, action: str, tenant_id: str, details: str = "") -> AuditEntry:
        entry = AuditEntry(
            actor_id=actor_id,
            action=action,
            tenant_id=tenant_id,
            occurred_at=datetime.now(timezone.utc),
            details=details,
        )
        self._entries.append(entry)
        return entry

    def list_entries(self) -> list[AuditEntry]:
        return list(self._entries)
