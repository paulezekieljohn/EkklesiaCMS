from datetime import date
import unittest

from src.ekklesia_cms.service import InMemoryChurchService


class InMemoryChurchServiceTests(unittest.TestCase):
    def setUp(self) -> None:
        self.service = InMemoryChurchService()

    def test_tenant_member_and_event_workflow(self) -> None:
        self.service.create_tenant("tenant-1", "Grace Fellowship")

        member = self.service.add_member(
            tenant_id="tenant-1",
            member_id="mem-1",
            first_name="Ava",
            last_name="Williams",
            email="ava@example.com",
        )

        event = self.service.schedule_event(
            tenant_id="tenant-1",
            event_id="evt-1",
            title="Sunday Service",
            scheduled_for=date(2026, 1, 4),
        )

        self.assertEqual(member.tenant_id, "tenant-1")
        self.assertEqual(event.title, "Sunday Service")
        self.assertEqual(len(self.service.list_members("tenant-1")), 1)
        self.assertEqual(len(self.service.list_events("tenant-1")), 1)

    def test_duplicate_tenant_fails(self) -> None:
        self.service.create_tenant("tenant-1", "Grace Fellowship")
        with self.assertRaises(ValueError):
            self.service.create_tenant("tenant-1", "Another Name")

    def test_unknown_tenant_fails(self) -> None:
        with self.assertRaises(ValueError):
            self.service.list_members("missing")


if __name__ == "__main__":
    unittest.main()
