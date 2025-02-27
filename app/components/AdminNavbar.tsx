import Link from 'next/link';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          href="/admin/fest" 
          className="text-xl font-bold hover:text-gray-300"
        >
          Admin Dashboard
        </Link>
        <div className="flex space-x-4">
          <Link href="/admin/fest" className="hover:text-gray-300">Fests</Link>
          <Link href="/admin/pack" className="hover:text-gray-300">Packs</Link>
          <Link href="/admin/item" className="hover:text-gray-300">Items</Link>
          <Link href="/admin/order" className="hover:text-gray-300">Orders</Link>
          <Link href="/admin/distributor" className="hover:text-gray-300">Distributors</Link>
          <span className="text-red-400">Admin Access</span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;