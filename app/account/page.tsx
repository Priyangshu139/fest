'use client';

const AccountPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            👨‍💻 Account Access Unavailable
          </h1>
          <p className="text-gray-600 mb-6">
            The account system is temporarily unavailable while we resolve
            authentication issues with our service provider.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
            <p className="text-sm text-yellow-700">
              Technical Note: Working on fixing Appwrite authentication integration.
              Expected to be back soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;