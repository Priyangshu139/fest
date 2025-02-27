import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: February 28, 2025</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using our services, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of Services</h2>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                <li>You must be at least 18 years old to use our services</li>
                <li>You agree to provide accurate and complete information</li>
                <li>You are responsible for maintaining your account security</li>
                <li>You agree not to misuse our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Orders and Payments</h2>
              <p className="text-gray-600">
                All orders are subject to availability and acceptance. Prices are subject to change 
                without notice. Payment must be made in full before order processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Delivery Policy</h2>
              <p className="text-gray-600">
                We aim to deliver all orders within the specified timeframe. However, delays may occur 
                due to unforeseen circumstances. We are not liable for any delays beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contact Information</h2>
              <p className="text-gray-600">
                For any questions regarding these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@example.com" className="text-blue-600 hover:text-blue-700">
                  Pratik@example.com
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

export default TermsOfServicePage;