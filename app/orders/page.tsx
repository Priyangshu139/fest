'use client';

const OrdersPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            🛠️ Under Maintenance
          </h1>
          <p className="text-gray-600 mb-6">
            We're currently experiencing issues with our authentication system.
            Our development team is working hard to resolve this.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
            <p className="text-sm text-yellow-700">
              Developer Note: Authentication integration with Appwrite is being fixed.
              Thank you for your patience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;