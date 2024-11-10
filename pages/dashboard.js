// pages/dashboard.js
import DashboardLayout from '../components/mainDashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Monthly Reports</h2>
          {/* Replace with chart component */}
          <div className="h-32 bg-gray-200 rounded-md">Chart Placeholder</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Resolved Reports</h2>
          {/* Replace with chart component */}
          <div className="h-32 bg-gray-200 rounded-md">Chart Placeholder</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
