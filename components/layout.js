import { useRouter } from 'next/router';
import MobileNavBar from './MobileNavbar';
import Sidebar from './sidebar';

export default function Layout({ children }) {
  const router = useRouter();

  const hideSidebarPages = ['/login', '/register'];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!hideSidebarPages.includes(router.pathname) && <Sidebar />}
      <div className="flex-1">
        <MobileNavBar />
        <main>{children}</main>
      </div>
    </div>
  );
}
