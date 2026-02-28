from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class Plan(str, Enum):
    FREE = "free"
    GROWTH = "growth"
    ENTERPRISE = "enterprise"


class SubscriptionStatus(str, Enum):
    TRIAL = "trial"
    ACTIVE = "active"
    DELINQUENT = "delinquent"
    CANCELED = "canceled"


@dataclass(frozen=True, slots=True)
class Subscription:
    tenant_id: str
    plan: Plan
    status: SubscriptionStatus = SubscriptionStatus.TRIAL

    def __post_init__(self) -> None:
        if not self.tenant_id.strip():
            raise ValueError("tenant_id is required")

    @property
    def writes_allowed(self) -> bool:
        return self.status in {SubscriptionStatus.TRIAL, SubscriptionStatus.ACTIVE}

    @property
    def member_limit(self) -> int | None:
        if self.plan == Plan.FREE:
            return 100
        if self.plan == Plan.GROWTH:
            return 1_000
        return None

    @property
    def event_limit(self) -> int | None:
        if self.plan == Plan.FREE:
            return 20
        if self.plan == Plan.GROWTH:
            return 200
        return None
