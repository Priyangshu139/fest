"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Diwali: The Festival of Lights",
    excerpt: "Explore the significance of Diwali, its customs, and how different regions of India celebrate this magnificent festival of lights with unique traditions.",
    date: "October 15, 2024",
    category: "Hindu Festival",
    imageUrl: "/blog/diwali.jpg",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Eid al-Fitr Celebrations",
    excerpt: "Discover the joyous celebrations of Eid al-Fitr, marking the end of Ramadan, and learn about the traditional customs and festive preparations.",
    date: "September 28, 2024",
    category: "Islamic Festival",
    imageUrl: "/blog/eid.jpg",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Christmas in India",
    excerpt: "Experience the unique blend of Indian culture and Christmas traditions, from midnight mass to regional festive delicacies.",
    date: "September 20, 2024",
    category: "Christian Festival",
    imageUrl: "/blog/christmas.jpg",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Guru Nanak Jayanti",
    excerpt: "Learn about the birth anniversary celebrations of Guru Nanak Dev Ji and the traditional customs observed during this important Sikh festival.",
    date: "September 15, 2024",
    category: "Sikh Festival",
    imageUrl: "/blog/gurupurab.jpg",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "Buddha Purnima",
    excerpt: "Understand the significance of Buddha Purnima and how Buddhist communities across India commemorate the birth of Lord Buddha.",
    date: "September 10, 2024",
    category: "Buddhist Festival",
    imageUrl: "/blog/buddha.jpg",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "Parsi New Year",
    excerpt: "Explore the unique traditions and celebrations of Nowruz, the Parsi New Year, and its significance in Indian culture.",
    date: "September 5, 2024",
    category: "Parsi Festival",
    imageUrl: "/blog/nowruz.jpg",
    readTime: "4 min read"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Festival Stories</h1>
          <p className="text-xl md:w-2/3 mx-auto">
            Discover the rich traditions and celebrations of Indian festivals across religions
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gray-200">
                  {/* Add placeholder image or festival icon */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span className="text-lg">Festival Image</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}