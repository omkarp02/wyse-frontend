"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <footer className="bg-[#1e2a5a] text-white py-6 px-4 md:px-8 lg:px-16">
      {/* Desktop Version */}
      <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2">
            <li><Link href="/men" className="hover:underline">Men</Link></li>
            <li><Link href="/women" className="hover:underline">Women</Link></li>
            <li><Link href="/classic-tees" className="hover:underline">Classic Tees</Link></li>
            <li><Link href="/oversized-tees" className="hover:underline">Oversized Tees</Link></li>
            <li><Link href="/travel-jogger" className="hover:underline">Travel Jogger</Link></li>
            <li><Link href="/fashion-joggers" className="hover:underline">Fashion Joggers</Link></li>
            <li><Link href="/hoodies" className="hover:underline">Hoodies</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Need Help</h3>
          <ul className="space-y-2">
            <li><Link href="/track-order" className="hover:underline">Track Your Order</Link></li>
            <li><Link href="/returns" className="hover:underline">Returns & Exchanges</Link></li>
            <li><Link href="/whatsapp" className="hover:underline">Chat on WhatsApp</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Get in touch</h3>
          <div className="flex space-x-4">
            <Link href="https://instagram.com" aria-label="Instagram">
              <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-10 rounded-full hover:bg-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </Link>
            <Link href="https://facebook.com" aria-label="Facebook">
              <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-10 rounded-full hover:bg-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
            </Link>
            <Link href="https://wa.me/yourphonenumber" aria-label="WhatsApp">
              <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-10 rounded-full hover:bg-opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Get in touch</h3>
          <div className="flex space-x-4">
            <Link href="https://instagram.com" aria-label="Instagram">
              <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </Link>
            <Link href="https://facebook.com" aria-label="Facebook">
              <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
            </Link>
            <Link href="https://wa.me/yourphonenumber" aria-label="WhatsApp">
              <div className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Collapsible Sections for Mobile */}
        <div className="border-t border-white border-opacity-20 py-3">
          <div className="flex justify-between items-center" onClick={() => toggleSection('categories')}>
            <h3 className="font-semibold">Categories</h3>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform ${openSection === 'categories' ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {openSection === 'categories' && (
            <ul className="mt-2 space-y-2 pl-2">
              <li><Link href="/men" className="hover:underline">Men</Link></li>
              <li><Link href="/women" className="hover:underline">Women</Link></li>
              <li><Link href="/classic-tees" className="hover:underline">Classic Tees</Link></li>
              <li><Link href="/oversized-tees" className="hover:underline">Oversized Tees</Link></li>
              <li><Link href="/travel-jogger" className="hover:underline">Travel Jogger</Link></li>
              <li><Link href="/fashion-joggers" className="hover:underline">Fashion Joggers</Link></li>
            </ul>
          )}
        </div>

        <div className="border-t border-white border-opacity-20 py-3">
          <div className="flex justify-between items-center" onClick={() => toggleSection('help')}>
            <h3 className="font-semibold">Need Help</h3>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform ${openSection === 'help' ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {openSection === 'help' && (
            <ul className="mt-2 space-y-2 pl-2">
              <li><Link href="/track-order" className="hover:underline">Track Your Order</Link></li>
              <li><Link href="/returns" className="hover:underline">Returns & Exchanges</Link></li>
              <li><Link href="/whatsapp" className="hover:underline">Chat on WhatsApp</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
            </ul>
          )}
        </div>

        <div className="border-t border-white border-opacity-20 py-3">
          <div className="flex justify-between items-center" onClick={() => toggleSection('company')}>
            <h3 className="font-semibold">Company</h3>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform ${openSection === 'company' ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {openSection === 'company' && (
            <ul className="mt-2 space-y-2 pl-2">
              <li><Link href="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            </ul>
          )}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 pt-4 border-t border-white border-opacity-20 text-sm text-center md:text-left">
        © 2024 WYSE. All Rights Reserved by ----.
      </div>
      
      {/* Scroll to top button (Mobile) */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="md:hidden fixed bottom-4 right-4 bg-white text-[#1e2a5a] rounded-full p-2 shadow-lg"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;