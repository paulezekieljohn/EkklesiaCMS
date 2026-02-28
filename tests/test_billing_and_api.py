from datetime import date
import unittest

from src.ekklesia_cms.access import Actor, Role
from src.ekklesia_cms.api import EkklesiaAPI
from src.ekklesia_cms.billing import Plan, SubscriptionStatus
from src.ekklesia_cms.service import InMemoryChurchService, SubscriptionError


class BillingAndApiTests(unittest.TestCase):
    def setUp(self) -> None:
        self.service = InMemoryChurchService()
        self.api = EkklesiaAPI(self.service)
        self.api.create_tenant("tenant-1", "Grace Fellowship", plan=Plan.FREE)

    def test_api_create_tenant_and_subscription_update(self) -> None:
        created = self.api.create_tenant("tenant-2", "Cornerstone", plan=Plan.GROWTH)
        self.assertEqual(created.status_code, 201)
        self.assertEqual(created.payload["plan"], "growth")

        updated = self.api.update_subscription(
            tenant_id="tenant-2",
            plan=Plan.ENTERPRISE,
            status=SubscriptionStatus.ACTIVE,
        )
        self.assertEqual(updated.status_code, 200)
        self.assertEqual(updated.payload["status"], "active")

    def test_delinquent_subscription_blocks_writes(self) -> None:
        self.service.update_subscription(
            tenant_id="tenant-1",
            plan=Plan.FREE,
            status=SubscriptionStatus.DELINQUENT,
        )
        actor = Actor(actor_id="u-1", role=Role.TENANT_ADMIN, tenant_id="tenant-1")

        with self.assertRaises(SubscriptionError):
            self.api.add_member(
                actor=actor,
                tenant_id="tenant-1",
                member_id="mem-1",
                first_name="Ava",
                last_name="Williams",
                email="ava@example.com",
            )

    def test_audit_log_captures_sensitive_writes(self) -> None:
        actor = Actor(actor_id="u-2", role=Role.TENANT_ADMIN, tenant_id="tenant-1")
        self.api.add_member(
            actor=actor,
            tenant_id="tenant-1",
            member_id="mem-1",
            first_name="Ava",
            last_name="Williams",
            email="ava@example.com",
        )
        self.api.schedule_event(
            actor=actor,
            tenant_id="tenant-1",
            event_id="evt-1",
            title="Sunday Service",
            scheduled_for=date(2026, 1, 4),
        )

        entries = self.service.list_audit_entries()
        self.assertEqual(len(entries), 2)
        self.assertEqual(entries[0].action, "member.created")
        self.assertEqual(entries[1].action, "event.created")

    def test_free_plan_member_limit_enforced(self) -> None:
        actor = Actor(actor_id="u-3", role=Role.TENANT_ADMIN, tenant_id="tenant-1")
        for i in range(100):
            self.api.add_member(
                actor=actor,
                tenant_id="tenant-1",
                member_id=f"mem-{i}",
                first_name="Member",
                last_name=str(i),
                email=f"member{i}@example.com",
            )

        with self.assertRaises(SubscriptionError):
            self.api.add_member(
                actor=actor,
                tenant_id="tenant-1",
                member_id="mem-overflow",
                first_name="Over",
                last_name="Flow",
                email="overflow@example.com",
            )


if __name__ == "__main__":
    unittest.main()
