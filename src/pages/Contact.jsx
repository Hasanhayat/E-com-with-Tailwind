import React from 'react';

export default function Contact() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">We'd love to hear from you! Please fill out the form below to get in touch with us.</p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="Your Name" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="Your Email" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500" rows="4" placeholder="Your Message" required></textarea>
        </div>
        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
          Send Message
        </button>
      </form>
    </div>
  );
} 