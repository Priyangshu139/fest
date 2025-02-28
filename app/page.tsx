import Link from 'next/link';

export default function Home() {
  const distributors = [
    '67b2836c001ea473cf2e',
    '67b2836200351b6aa59c',
    '67b28354001ac3bab833'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to Festiva</h1>
        
        <div className="space-y-4">
          {/* User Section */}
          <Link 
            href="/fest"
            className="block w-full p-4 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Enter as User
          </Link>

          {/* Admin Section */}
          <Link 
            href="/admin/fest"
            className="block w-full p-4 text-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
                        Enter as Admin(ui ganda hai,baad mei dekhenge)
          </Link>

          {/* Distributor Section */}
          <div className="border-t pt-4 mt-4">
            <h2 className="text-lg font-semibold mb-3 text-center">Distributor Access</h2>
            <div className="space-y-2">
              {distributors.map((id, index) => (
                <Link 
                  key={id}
                  href={`/distributor/${id}`}
                  className="block w-full p-3 text-center bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Distributor {index + 1}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
