import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { storeInfo } from '../config/storeConfig';

const Terms = () => {
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-sm text-gray-500 mb-6">Last Updated: {lastUpdated}</p>
          
          <p className="text-gray-700 mb-6">
            Welcome to {storeInfo.name}. By accessing or using our website, you agree to be bound by these Terms of Service. 
            Please read these terms carefully before using our services.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing or using {storeInfo.name}, you agree to be bound by these Terms of Service and all applicable 
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing 
                this site. The materials contained in this website are protected by applicable copyright and trademark law.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Use License</h2>
              <p className="text-gray-700 mb-3">
                Permission is granted to temporarily download one copy of the materials on {storeInfo.name}'s website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this 
                license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              <p className="text-gray-700 mt-3">
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by 
                {storeInfo.name} at any time. Upon terminating your viewing of these materials or upon the termination of this 
                license, you must destroy any downloaded materials in your possession.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Accounts</h2>
              <p className="text-gray-700 mb-3">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible 
                for safeguarding the password and for all activities that occur under your account. You agree to notify us immediately 
                of any unauthorized use of your account.
              </p>
              <p className="text-gray-700">
                We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we 
                believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Product Information and Pricing</h2>
              <p className="text-gray-700 mb-3">
                We strive to provide accurate product descriptions and pricing information. However, we do not warrant that product 
                descriptions, pricing, or other content on the website is accurate, complete, reliable, current, or error-free.
              </p>
              <p className="text-gray-700">
                All prices are displayed in PKR and are exclusive of taxes unless otherwise stated. We reserve the right to modify 
                prices at any time without prior notice.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Orders and Payments</h2>
              <p className="text-gray-700 mb-3">
                By placing an order, you make an offer to purchase products at the prices listed. We reserve the right to accept or 
                reject your order for any reason, including unavailability of product, errors in pricing or product information, or 
                problems with your payment.
              </p>
              <p className="text-gray-700">
                Payment must be received before your order is accepted. We accept various payment methods as indicated on our website. 
                By providing payment information, you represent and warrant that you have the legal right to use the payment method 
                and that the information you provide is accurate.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Shipping and Delivery</h2>
              <p className="text-gray-700 mb-3">
                We aim to deliver products within the estimated delivery times indicated on our website. However, delivery times are 
                not guaranteed and may vary based on factors outside of our control.
              </p>
              <p className="text-gray-700">
                Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. You are responsible 
                for filing any claims with carriers for damaged and/or lost shipments.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Returns and Refunds</h2>
              <p className="text-gray-700">
                Our return and refund policy is as follows:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                <li>Returns are accepted within {storeInfo.returnPolicy.daysToReturn} days of delivery</li>
                <li>Products must be in original condition with all tags and packaging</li>
                <li>Refunds will be issued using the original payment method</li>
                <li>Shipping costs are non-refundable</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Please refer to our detailed Return Policy for more information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Disclaimers</h2>
              <p className="text-gray-700 mb-3">
                THE MATERIALS ON {storeInfo.name.toUpperCase()}'s WEBSITE ARE PROVIDED ON AN 'AS IS' BASIS. {storeInfo.name.toUpperCase()} 
                MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS AND NEGATES ALL OTHER WARRANTIES INCLUDING, WITHOUT 
                LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT 
                OF INTELLECTUAL PROPERTY OR OTHER VIOLATION OF RIGHTS.
              </p>
              <p className="text-gray-700">
                FURTHER, {storeInfo.name.toUpperCase()} DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS CONCERNING THE ACCURACY, LIKELY 
                RESULTS, OR RELIABILITY OF THE USE OF THE MATERIALS ON ITS WEBSITE OR OTHERWISE RELATING TO SUCH MATERIALS OR ON ANY 
                SITES LINKED TO THIS SITE.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Limitations</h2>
              <p className="text-gray-700">
                IN NO EVENT SHALL {storeInfo.name.toUpperCase()} OR ITS SUPPLIERS BE LIABLE FOR ANY DAMAGES (INCLUDING, WITHOUT LIMITATION, 
                DAMAGES FOR LOSS OF DATA OR PROFIT, OR DUE TO BUSINESS INTERRUPTION) ARISING OUT OF THE USE OR INABILITY TO USE THE 
                MATERIALS ON {storeInfo.name.toUpperCase()}'S WEBSITE, EVEN IF {storeInfo.name.toUpperCase()} OR A {storeInfo.name.toUpperCase()} 
                AUTHORIZED REPRESENTATIVE HAS BEEN NOTIFIED ORALLY OR IN WRITING OF THE POSSIBILITY OF SUCH DAMAGE.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Governing Law</h2>
              <p className="text-gray-700">
                These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and you irrevocably 
                submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Changes to Terms</h2>
              <p className="text-gray-700">
                {storeInfo.name} reserves the right to revise these Terms of Service at any time without notice. By using this website, 
                you are agreeing to be bound by the current version of these Terms of Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">12. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at:
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

export default Terms; 