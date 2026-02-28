from datetime import date
import unittest

from src.ekklesia_cms.access import Actor, AuthorizationError, Role
from src.ekklesia_cms.service import InMemoryChurchService


class AccessPolicyTests(unittest.TestCase):
    def setUp(self) -> None:
        self.service = InMemoryChurchService()
        self.service.create_tenant("tenant-1", "Grace Fellowship")
        self.service.create_tenant("tenant-2", "Cornerstone Chapel")

    def test_tenant_admin_can_manage_within_own_tenant(self) -> None:
        actor = Actor(actor_id="u-1", role=Role.TENANT_ADMIN, tenant_id="tenant-1")
        self.service.add_member_as(
            actor,
            tenant_id="tenant-1",
            member_id="mem-1",
            first_name="Ava",
            last_name="Williams",
            email="ava@example.com",
        )
        self.service.schedule_event_as(
            actor,
            tenant_id="tenant-1",
            event_id="evt-1",
            title="Sunday Service",
            scheduled_for=date(2026, 1, 4),
        )

        self.assertEqual(len(self.service.list_members_as(actor, "tenant-1")), 1)
        self.assertEqual(len(self.service.list_events_as(actor, "tenant-1")), 1)

    def test_viewer_cannot_write(self) -> None:
        actor = Actor(actor_id="u-2", role=Role.VIEWER, tenant_id="tenant-1")
        with self.assertRaises(AuthorizationError):
            self.service.add_member_as(
                actor,
                tenant_id="tenant-1",
                member_id="mem-1",
                first_name="Ava",
                last_name="Williams",
                email="ava@example.com",
            )

    def test_staff_cannot_access_other_tenant(self) -> None:
        actor = Actor(actor_id="u-3", role=Role.STAFF, tenant_id="tenant-1")
        with self.assertRaises(AuthorizationError):
            self.service.list_members_as(actor, "tenant-2")

    def test_platform_admin_has_cross_tenant_access(self) -> None:
        actor = Actor(actor_id="platform-1", role=Role.PLATFORM_ADMIN)
        self.service.add_member_as(
            actor,
            tenant_id="tenant-2",
            member_id="mem-2",
            first_name="Noah",
            last_name="Brown",
            email="noah@example.com",
        )
        self.assertEqual(len(self.service.list_members_as(actor, "tenant-2")), 1)


if __name__ == "__main__":
    unittest.main()
