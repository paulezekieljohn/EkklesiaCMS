const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getDashboardData() {
  await delay(120)
  return {
    kpis: [
      { title: 'Total Members', value: '1,284', subtitle: 'Across 134 families', trend: '+5.2%' },
      { title: 'Active Members', value: '1,112', subtitle: 'Last 30 days', trend: '+2.1%' },
      { title: 'This Month Income', value: '₹4,82,500', subtitle: 'Tithes + offerings', trend: '+9.8%' },
      { title: 'Pending Subscriptions', value: '96', subtitle: 'Need follow-up', trend: '-3.4%', trendColor: 'text-brand-warning' }
    ],
    collection: [
      { month: 'Jan', amount: 380000 },
      { month: 'Feb', amount: 420000 },
      { month: 'Mar', amount: 455000 },
      { month: 'Apr', amount: 398000 },
      { month: 'May', amount: 482500 }
    ],
    offeringBreakdown: [
      { name: 'Tithe', value: 48 },
      { name: 'Sunday Offering', value: 29 },
      { name: 'Missions', value: 15 },
      { name: 'Special', value: 8 }
    ],
    alerts: {
      birthdays: ['Priya Samuel', 'Joel Raj', 'Reena Paul'],
      anniversaries: ['David & Anne', 'Sam & Lydia'],
      pendingPayments: ['Family #208', 'Family #310', 'Family #144']
    }
  }
}

export async function getMembers() {
  await delay(100)
  return [
    { id: 'M001', name: 'Ava Williams', phone: '+91-98400-12001', family: 'Williams Family', status: 'Active' },
    { id: 'M002', name: 'Noah Brown', phone: '+91-98400-12002', family: 'Brown Family', status: 'Active' },
    { id: 'M003', name: 'Mia Joseph', phone: '+91-98400-12003', family: 'Joseph Family', status: 'Inactive' }
  ]
}
