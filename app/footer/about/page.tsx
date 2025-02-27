"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaBox, FaTruck, FaUsers, FaHeart } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About FestPacks</h1>
          <p className="text-xl md:w-2/3 leading-relaxed">
            We're dedicated to making festival celebrations easier and more convenient
            by providing carefully curated festival packs for all your needs.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 opacity-10">
          <FaBox className="w-64 h-64" />
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 md:w-2/3 mx-auto">
            To simplify festival preparations by delivering high-quality, curated festival
            packs directly to your doorstep, making celebrations more enjoyable and stress-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBox className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Packs</h3>
            <p className="text-gray-600">
              Thoughtfully assembled festival packs containing everything you need for your celebrations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTruck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable delivery to ensure your festival preparations stay on schedule.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
            <p className="text-gray-600">
              Premium quality products sourced from trusted suppliers for the best celebration experience.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "John Doe", role: "Founder & CEO" },
              { name: "Jane Smith", role: "Operations Manager" },
              { name: "Mike Johnson", role: "Product Curator" },
              { name: "Sarah Wilson", role: "Customer Relations" },
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4">
                  <FaUsers className="w-full h-full text-gray-400 p-4" />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg text-gray-600 mb-8">
          Have questions about our festival packs? We'd love to hear from you!
        </p>
        <a
          href="mailto:contact@festpacks.com"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Contact Us
        </a>
      </div>

      <Footer />
    </div>
  );
}