import React from 'react';
import { FiMail, FiPhone, FiMessageCircle, FiClock } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SupportPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Need Support?</h1>
            <p className="text-lg text-gray-600">
              We're here to help you with any questions or concerns
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90">
            <p className="text-lg text-gray-700 mb-8 text-center">
              Having trouble or questions about our services? Our dedicated support team is ready to assist you.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Methods</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 rounded-lg hover:bg-blue-50 transition-colors">
                    <FiMail className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-800">Email Support</h3>
                      <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700">
                        support@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center p-4 rounded-lg hover:bg-blue-50 transition-colors">
                    <FiPhone className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-800">Phone Support</h3>
                      <a href="tel:1-800-XXX-XXXX" className="text-blue-600 hover:text-blue-700">
                        1-800-XXX-XXXX
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center p-4 rounded-lg hover:bg-blue-50 transition-colors">
                    <FiMessageCircle className="w-6 h-6 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-800">Live Chat</h3>
                      <p className="text-gray-600">Available in our app</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-6">
                  <FiClock className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800">Support Hours</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h3 className="font-medium text-gray-800">Weekdays</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h3 className="font-medium text-gray-800">Weekends</h3>
                    <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupportPage;