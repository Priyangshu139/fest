import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: February 28, 2025</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              <p className="text-gray-600">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                <li>Name and contact information</li>
                <li>Delivery address and preferences</li>
                <li>Payment information</li>
                <li>Order history and preferences</li>
                <li>actually nothing is collected as our Auth is not set up🥲</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600">We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Provide customer support</li>
                <li>Improve our services and products</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about our Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@example.com" className="text-blue-600 hover:text-blue-700">
                  pratik@example.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;