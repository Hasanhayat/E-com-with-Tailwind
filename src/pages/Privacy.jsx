import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { storeInfo } from '../config/storeConfig';

const Privacy = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = "July 15, 2023";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-sm text-gray-500 mb-6">Last Updated: {lastUpdated}</p>
          
          <p className="text-gray-700 mb-6">
            At {storeInfo.name}, we value your privacy and are committed to protecting your personal information. 
            This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you 
            visit our website or make a purchase.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
              <p className="text-gray-700 mb-3">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Create an account</li>
                <li>Place an order</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-gray-700 mt-3">
                The personal information we collect may include your name, email address, postal address, phone number, 
                and payment information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Respond to your inquiries</li>
                <li>Improve our website and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Information Sharing</h2>
              <p className="text-gray-700 mb-3">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Payment processors to complete transactions</li>
                <li>Shipping companies to deliver your orders</li>
                <li>Service providers who assist with our operations</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="text-gray-700 mt-3">
                We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-3">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Personalize your shopping experience</li>
                <li>Analyze website performance</li>
              </ul>
              <p className="text-gray-700 mt-3">
                You can modify your browser settings to decline cookies, but this may affect certain features of our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information from unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Rights</h2>
              <p className="text-gray-700 mb-3">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Restrict or object to certain processing activities</li>
                <li>Receive your data in a portable format</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700 mt-3">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not directed to individuals under the age of 13. We do not knowingly collect personal 
                information from children. If you believe we have inadvertently collected information from a child, 
                please contact us immediately.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other 
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
                updated policy on our website with a revised "Last Updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <div className="mt-3">
                <p className="text-gray-700"><strong>{storeInfo.name}</strong></p>
                <p className="text-gray-700">Email: {storeInfo.email}</p>
                <p className="text-gray-700">Phone: {storeInfo.phone}</p>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy; 