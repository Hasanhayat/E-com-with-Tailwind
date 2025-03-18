import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { storeInfo } from '../config/storeConfig';
import { RotateCcw, AlertCircle, CheckCircle, HelpCircle, PackageCheck } from 'lucide-react';

const Returns = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Returns & Refunds</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4 flex items-center">
            <RotateCcw className="mr-2 h-6 w-6" /> Return Policy Overview
          </h2>
          
          <p className="text-gray-700 mb-6">
            At {storeInfo.name}, we want you to be completely satisfied with your purchase. If for any reason 
            you're not happy with your order, we offer a simple and hassle-free return process.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-blue-700">
                You have <span className="font-bold">{storeInfo.returnPolicy.daysToReturn} days</span> from the delivery date to return your items.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Return Conditions</h3>
              <p className="text-gray-700 mb-3">
                To be eligible for a return, your item must meet the following conditions:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                {storeInfo.returnPolicy.conditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Items That Cannot Be Returned</h3>
              <p className="text-gray-700 mb-3">
                The following items cannot be returned:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Undergarments and intimate wear</li>
                <li>Swimwear</li>
                <li>Beauty products that have been opened or used</li>
                <li>Custom or personalized items</li>
                <li>Digital products and gift cards</li>
                <li>Items marked as "Final Sale" or "Non-Returnable"</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                If you're unsure if an item is eligible for return, please contact our customer service team before placing your order.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4 flex items-center">
            <PackageCheck className="mr-2 h-6 w-6" /> Return Process
          </h2>
          
          <div className="space-y-6">
            <p className="text-gray-700">
              To initiate a return, please follow these steps:
            </p>
            
            <div className="border-l-4 border-orange-200 pl-4">
              <ol className="space-y-4">
                <li className="text-gray-700">
                  <span className="font-medium text-orange-600">Step 1:</span> Log in to your account and go to "My Orders"
                </li>
                <li className="text-gray-700">
                  <span className="font-medium text-orange-600">Step 2:</span> Select the order that contains the item you wish to return
                </li>
                <li className="text-gray-700">
                  <span className="font-medium text-orange-600">Step 3:</span> Click on "Return Item" and follow the instructions
                </li>
                <li className="text-gray-700">
                  <span className="font-medium text-orange-600">Step 4:</span> Print the return label (if provided) or note the return address
                </li>
                <li className="text-gray-700">
                  <span className="font-medium text-orange-600">Step 5:</span> Package the item securely with all original packaging, tags, and accessories
                </li>
                <li className="text-gray-700">
                  <span className="font-medium text-orange-600">Step 6:</span> Ship the package to the provided return address or drop it at a designated location
                </li>
              </ol>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-yellow-700">
                  If you checked out as a guest, please contact our customer service team at {storeInfo.email} with your order number to initiate a return.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">Refunds and Exchanges</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Refund Process</h3>
              <p className="text-gray-700 mb-3">
                Once we receive and inspect your return, we'll send you an email to notify you that we have received your returned item.
                We'll also notify you of the approval or rejection of your refund.
              </p>
              <p className="text-gray-700">
                If approved, your refund will be processed, and a credit will automatically be applied to your original
                method of payment within {storeInfo.returnPolicy.refundMethods.includes("Original payment method") ? "5-10 business days" : "7-14 business days"}.
                Please note that it may take some time for your bank or credit card company to process and post the refund.
              </p>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-800">Available Refund Methods:</h4>
                <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
                  {storeInfo.returnPolicy.refundMethods.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {storeInfo.returnPolicy.exchangeAllowed && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Exchanges</h3>
                <p className="text-gray-700 mb-3">
                  If you would prefer an exchange instead of a refund, you can request this when initiating your return.
                  Exchanges are subject to product availability. If the replacement item costs more than your original
                  purchase, you will need to pay the difference. If it costs less, we will refund the difference.
                </p>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Late or Missing Refunds</h3>
              <p className="text-gray-700">
                If you haven't received a refund yet, first check your bank account again. Then contact your credit card
                company, it may take some time before your refund is officially posted. Next contact your bank. There is
                often some processing time before a refund is posted. If you've done all of this and you still have not
                received your refund, please contact our customer service team.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4 flex items-center">
            <CheckCircle className="mr-2 h-6 w-6" /> Return Shipping
          </h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              You will be responsible for paying the return shipping costs. The original shipping charges
              are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
            
            <div className="bg-green-50 p-4 rounded-md">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-green-700">
                  <span className="font-medium">Exception:</span> If the return is due to our error (you received a damaged, defective,
                  or incorrect item), we will provide a free return shipping label and refund your original shipping costs.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" /> Need Help?
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about our return policy or need assistance with a return,
            please don't hesitate to contact our customer support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              Contact Us
            </a>
            <a
              href="/faqs"
              className="inline-flex items-center justify-center px-5 py-2 border border-orange-600 text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50"
            >
              View FAQs
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Returns; 