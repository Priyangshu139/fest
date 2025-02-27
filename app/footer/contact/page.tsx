"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaWhatsapp, FaTelegram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface ContactMethod {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  value: string;
  link?: string;
  color: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    value: "+91 98351 28149",
    link: "https://wa.me/919835128149",
    color: "text-[#25D366]"
  },
  {
    icon: FaTelegram,
    title: "Telegram",
    value: "@Pratiksingh03",
    link: "https://t.me/Pratiksingh03",
    color: "text-[#0088cc]"
  },
  {
    icon: FaEnvelope,
    title: "Email",
    value: "contact@festpacks.com",
    link: "mailto:contact@festpacks.com",
    color: "text-blue-600"
  },
  {
    icon: FaPhone,
    title: "Phone",
    value: "+91 98351 28149",
    link: "tel:+919835128149",
    color: "text-green-600"
  },
  {
    icon: FaMapMarkerAlt,
    title: "Address",
    value: "near 2 atm,Kumaraswami layout,bangalore, 560078",
    color: "text-red-600"
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:w-2/3 mx-auto">
            We're here to help! Reach out to us through any of these channels.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className={`${method.color} p-3 rounded-full bg-opacity-10 bg-current`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {method.title}
                  </h3>
                  {method.link ? (
                    <a
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${method.color} hover:opacity-80 transition-opacity`}
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-gray-600">{method.value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}