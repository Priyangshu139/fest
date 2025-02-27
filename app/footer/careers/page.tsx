"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiCode, FiServer, FiGitBranch, FiDatabase } from 'react-icons/fi';

interface JobPosition {
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  icon: React.ComponentType<{ className: string }>;
}

const positions: JobPosition[] = [
  {
    title: "Full Stack Developer",
    type: "Full-time / Contract",
    location: "Remote",
    description: "We're looking for a Full Stack Developer with experience in Next.js and authentication systems. Currently facing challenges with Appwrite authentication and Vercel deployment - your expertise would be invaluable!",
    requirements: [
      "Experience with Next.js and React",
      "Familiar with Appwrite or similar authentication systems",
      "Understanding of Vercel deployment processes",
      "Knowledge of TypeScript and TailwindCSS",
      "Good problem-solving skills"
    ],
    icon: FiCode
  },
  {
    title: "Backend Developer",
    type: "Full-time / Contract",
    location: "Remote",
    description: "Seeking a Backend Developer with strong authentication expertise to help resolve our Appwrite integration challenges and improve our backend architecture.",
    requirements: [
      "Strong experience with Appwrite or similar BaaS platforms",
      "Knowledge of authentication flows and security best practices",
      "Experience with Node.js and API development",
      "Familiarity with cloud deployment platforms",
    ],
    icon: FiServer
  }
];

const CareersPage = () => {
  const handleApply = (position: string) => {
    window.location.href = `mailto:careers@example.com?subject=Application for ${position} Position`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Join Our Team!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're actively seeking developers who can help us overcome technical challenges,
              particularly with Appwrite authentication and Vercel deployment.
            </p>
          </div>

          {/* Urgent Notice */}
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
            <p className="text-blue-700">
              <strong>Immediate Opening:</strong> We're especially looking for developers with 
              Appwrite authentication experience to help resolve our current technical challenges.
            </p>
          </div>

          {/* Job Listings */}
          <div className="grid md:grid-cols-2 gap-6">
            {positions.map((position, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <position.icon className="w-8 h-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800">{position.title}</h2>
                </div>

                <div className="mb-4 space-y-2">
                  <p className="text-blue-600">{position.type}</p>
                  <p className="text-gray-600">{position.location}</p>
                </div>

                <p className="text-gray-600 mb-4">{position.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {position.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleApply(position.title)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Don't see a perfect fit?</h2>
            <p className="text-gray-600 mb-6">
              We're always looking for talented developers. Send us your resume anyway!
            </p>
            <a
              href="mailto:careers@example.com"
              className="inline-block bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;