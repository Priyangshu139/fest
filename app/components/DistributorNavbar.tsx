import Link from 'next/link';

const DistributorNavbar = () => {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Distributor Portal</div>
        <div className="flex space-x-4">
          <Link href="/distributor/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link href="/distributor/inventory" className="hover:text-gray-300">Inventory</Link>
          <Link href="/distributor/sales" className="hover:text-gray-300">Sales</Link>
          <Link href="/distributor/profile" className="hover:text-gray-300">Profile</Link>
          <span className="text-yellow-400">Distributor Access</span>
        </div>
      </div>
    </nav>
  );
};

export default DistributorNavbar;