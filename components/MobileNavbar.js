import { useState } from 'react';
import Link from 'next/link';
import SignOutButton from './signoutBtn';

export default function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-sidebar py-5 px-6 sm:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
          Admin
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white text-3xl focus:outline-none"
        >
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>

      <nav className={`flex flex-col pt-4 ${isOpen ? 'flex' : 'hidden'}`}>
        <Link href="/#" className="flex items-center active-nav-link text-white py-2 pl-4 nav-item">
          <i className="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </Link>
        <Link href="/tasks" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
          <i className="fas fa-sticky-note mr-3"></i>
          Tasks
        </Link>
        <Link href="/users" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
          <i className="fas fa-table mr-3"></i>
          User
        </Link>
        <Link href="/account" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
          <i className="fas fa-user mr-3"></i>
          My Account
        </Link>
        
        <SignOutButton />
      </nav>
    </header>
  );
}
