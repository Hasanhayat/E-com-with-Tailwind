import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { storeInfo } from '../config/storeConfig';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQs, setOpenFAQs] = useState({});
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // FAQ categories
  const categories = [
    { id: 'all', name: 'All FAQs' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'account', name: 'Account & Payment' },
    { id: 'products', name: 'Products & Stock' },
  ];

  // All FAQs
  const allFAQs = [
    {
      id: 1,
      category: 'orders',
      question: 'How do I place an order?',
      answer: `To place an order, follow these steps:\n\n1. Browse our products and add items to your cart.\n2. Click on the cart icon to review your items.\n3. Proceed to checkout and enter your shipping and payment details.\n4. Review your order and click "Place Order".\n\nYou'll receive an order confirmation email once your order is successfully placed.`
    },
    {
      id: 2,
      category: 'orders',
      question: 'How long does shipping take?',
      answer: `Delivery times vary based on your location and the shipping method selected:\n\n- Standard shipping: ${storeInfo.shipping.deliveryTimeStandard}\n- Express shipping: ${storeInfo.shipping.deliveryTimeExpress}\n- Same-day delivery: ${storeInfo.shipping.deliveryTimeSameDay} (only available in select cities)\n\nYou can track your order through the "My Orders" section in your account.`
    },
    {
      id: 3,
      category: 'orders',
      question: 'How much is the shipping fee?',
      answer: `Our shipping rates are as follows:\n\n- Standard shipping: PKR ${storeInfo.shipping.standardShipping}\n- Express shipping: PKR ${storeInfo.shipping.expressShipping}\n- Same-day delivery: PKR ${storeInfo.shipping.sameDayShipping}\n\nOrders above PKR ${storeInfo.shipping.freeShippingThreshold} qualify for free standard shipping.`
    },
    {
      id: 4,
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer: `You can modify or cancel your order only if it hasn't been processed yet. To request changes or cancellation, please contact our customer service team immediately at ${storeInfo.email} or ${storeInfo.phone}. Please note that once an order has been processed or shipped, it cannot be modified or cancelled.`
    },
    {
      id: 5,
      category: 'orders',
      question: 'Do you offer international shipping?',
      answer: `${storeInfo.shipping.internationalShipping ? `Yes, we offer international shipping to select countries including ${storeInfo.shipping.internationalShippingCountries.join(', ')}. International shipping rates start at PKR ${storeInfo.shipping.internationalShippingCost} and may vary based on destination and package weight.` : 'Currently, we only ship within Pakistan. We\'re working on expanding our shipping options to include international destinations in the near future.'}`
    },
    {
      id: 6,
      category: 'returns',
      question: 'What is your return policy?',
      answer: `We accept returns within ${storeInfo.returnPolicy.daysToReturn} days of delivery. Items must be in original condition with all tags and packaging intact. ${storeInfo.returnPolicy.exchangeAllowed ? 'We offer both refunds and exchanges for returned items.' : 'We only offer refunds for returned items at this time.'}`
    },
    {
      id: 7,
      category: 'returns',
      question: 'How do I return an item?',
      answer: `To return an item, please follow these steps:\n\n1. Log in to your account and go to "My Orders"\n2. Select the order containing the item you wish to return\n3. Click on "Return Item" and follow the instructions\n4. Package the item securely with all original packaging and tags\n5. Ship the item using the provided return label or to the address provided\n\nOnce we receive and inspect the return, we'll process your refund or exchange.`
    },
    {
      id: 8,
      category: 'returns',
      question: 'How long does it take to process a refund?',
      answer: `After we receive and inspect your return, refunds typically take 3-5 business days to process. The time it takes for the refund to appear in your account depends on your payment method and financial institution, usually an additional 2-10 business days.`
    },
    {
      id: 9,
      category: 'returns',
      question: 'Are shipping costs refundable?',
      answer: `Shipping costs are non-refundable unless the return is due to our error (damaged item, wrong item shipped, etc.). If you're returning because of our error, we'll refund the full amount including shipping costs and provide a free return shipping label.`
    },
    {
      id: 10,
      category: 'account',
      question: 'How do I create an account?',
      answer: `To create an account, click on the "Login" button in the top-right corner of our website and then select "Register". You'll need to provide your name, email address, and create a password. Having an account allows you to track orders, save your shipping information, and checkout more quickly for future purchases.`
    },
    {
      id: 11,
      category: 'account',
      question: 'What payment methods do you accept?',
      answer: `We accept the following payment methods:\n\n${storeInfo.paymentMethods.map(method => `- ${method.name}: ${method.description}`).join('\n')}\n\nAll payment information is encrypted and securely processed.`
    },
    {
      id: 12,
      category: 'account',
      question: 'Is my personal information secure?',
      answer: `Yes, we take data security very seriously. We use industry-standard encryption and security protocols to protect your personal and payment information. We never store your full credit card details on our servers. For more information, please review our Privacy Policy.`
    },
    {
      id: 13,
      category: 'account',
      question: 'How do I reset my password?',
      answer: `To reset your password, click on the "Login" button, then select "Forgot Password". Enter the email address associated with your account, and we'll send you a link to reset your password. If you don't receive the email within a few minutes, please check your spam folder or contact customer support.`
    },
    {
      id: 14,
      category: 'products',
      question: 'Are your products authentic?',
      answer: `Yes, all products sold on ${storeInfo.name} are 100% authentic. We source our products directly from manufacturers or authorized distributors. We have a strict zero-tolerance policy against counterfeit items.`
    },
    {
      id: 15,
      category: 'products',
      question: 'How can I check if an item is in stock?',
      answer: `The availability of an item is displayed on the product page. If an item is in stock, you'll see an "Add to Cart" button. If it's out of stock, you'll see an "Out of Stock" notice. You can also sign up for notifications to be alerted when an out-of-stock item becomes available again.`
    },
    {
      id: 16,
      category: 'products',
      question: 'Do you offer size guides for clothing items?',
      answer: `Yes, we provide size guides for all clothing items. You can find the size guide link on the product page, usually below the size selection options. Our size guides include detailed measurements to help you find the perfect fit.`
    },
    {
      id: 17,
      category: 'products',
      question: 'Can I request a product that is not available on your website?',
      answer: `We're always open to suggestions! If you're looking for a specific product that's not currently available on our website, please contact our customer service team with details of the item you're interested in. While we can't guarantee we'll be able to source it, we'll certainly consider adding it to our inventory.`
    },
    {
      id: 18,
      category: 'account',
      question: 'How can I track my order?',
      answer: `You can track your order by logging into your account and going to the "My Orders" section. Click on the specific order to view its current status and tracking information. If you checked out as a guest, you can use the order number and email address provided in your order confirmation to track your package on our website.`
    },
    {
      id: 19,
      category: 'returns',
      question: 'What items cannot be returned?',
      answer: `While most items can be returned within our return window, some products cannot be returned due to hygiene reasons or other restrictions. These typically include:\n\n- Undergarments\n- Swimwear\n- Beauty products that have been opened\n- Personalized or custom-made items\n- Items marked as final sale\n\nPlease check the product description for any specific return restrictions before purchasing.`
    },
    {
      id: 20,
      category: 'orders',
      question: 'Do you offer gift wrapping?',
      answer: `Yes, we offer gift wrapping services for most products. During checkout, you'll have the option to select gift wrapping for an additional fee. You can also include a personalized gift message that will be printed on a card and included with your order.`
    },
  ];

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
    
    // Initialize filtered FAQs
    filterFAQs();
  }, [searchTerm, activeCategory]);

  const filterFAQs = () => {
    let filtered = allFAQs;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(term) || 
        faq.answer.toLowerCase().includes(term)
      );
    }
    
    setFilteredFAQs(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFAQ = (id) => {
    setOpenFAQs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatAnswer = (answer) => {
    return answer.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>
        
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFAQs[faq.id] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {openFAQs[faq.id] && (
                  <div className="p-4 pt-0 bg-gray-50">
                    <p className="text-gray-700">{formatAnswer(faq.answer)}</p>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No FAQs found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="mt-4 text-orange-600 hover:text-orange-700"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-10 bg-orange-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Still have questions?</h2>
          <p className="text-gray-700 mb-4">Our customer support team is here to help you with any questions you might have.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${storeInfo.email}`}
              className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              Contact us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2 border border-orange-600 text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQs; 