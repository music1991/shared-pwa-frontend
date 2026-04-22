import { Outlet } from 'react-router-dom';
import Sidebar from '../../features/dashboard/components/Sidebar';
import DashboardHeader from '../../features/dashboard/components/DashboardHeader';
import BottomNav from '../../features/dashboard/components/BottomNav';

export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Sidebar />
      </aside>

      <div className="dashboard-main">
        <DashboardHeader />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}