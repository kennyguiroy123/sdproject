import Link from 'next/link';
import SignOutButton from './signoutBtn';

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 hidden md:block">
      <h2 className="text-2xl font-semibold mb-6">Admin</h2>
      <ul>
        <li>
          <Link href="/dashboard" className="block py-2 hover:bg-blue-700 rounded-md">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/tasks" className="block py-2 hover:bg-blue-700 rounded-md">
            Tasks
          </Link>
        </li>
        <li className="block py-2 hover:bg-blue-700 rounded-md">
          <SignOutButton />
        </li>
      </ul>
    </div>
  );
}
