// components/Footer.tsx
"use client";

import Link from 'next/link';
import { FaDiscord, FaWhatsapp, FaTelegram, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className: string }>;
  hoverColor: string;
}

interface FooterLink {
  name: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Discord',
    href: 'https://discord.com',
    icon: FaDiscord,
    hoverColor: 'hover:text-[#5865F2]'
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919835128149',
    icon: FaWhatsapp,
    hoverColor: 'hover:text-[#25D366]'
  },
  {
    name: 'Telegram',
    href: 'https://t.me/Pratiksingh03',
    icon: FaTelegram,
    hoverColor: 'hover:text-[#0088cc]'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: FaLinkedin,
    hoverColor: 'hover:text-[#0a66c2]'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: FaTwitter,
    hoverColor: 'hover:text-[#1DA1F2]'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: FaInstagram,
    hoverColor: 'hover:text-[#E4405F]'
  }
];

const quickLinks: FooterLink[] = [
  { name: 'About Us', href: '/footer/about' },
  { name: 'Contact', href: '/footer/contact' },
  { name: 'Privacy Policy', href: '/footer/privacy' },
  { name: 'Terms of Service', href: '/footer/terms' }
];

const resourceLinks: FooterLink[] = [
  { name: 'Blog', href: '/footer/blog' },
  { name: 'FAQ', href: '/footer/faq' },
  { name: 'Support', href: '/footer/support' },
  { name: 'Careers', href: '/footer/careers' }
];

const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Company Name</h3>
            <p className="text-gray-600 max-w-xs">
              Creating amazing experiences and memorable moments for our customers since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className={`w-6 h-6 text-gray-600 ${social.hoverColor} transition-colors duration-200`} />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;