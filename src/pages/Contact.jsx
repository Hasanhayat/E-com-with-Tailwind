import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('Thank you for your message. We will get back to you soon!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: ["123 Store Street", "Peshawar, Pakistan"],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["+92 123 4567890", "+92 098 7654321"],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@khattakstore.com", "support@khattakstore.com"],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 10:00 PM", "Sat - Sun: 10:00 AM - 8:00 PM"],
    },
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 text-orange-600">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  ></textarea>
                </div>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </div>
                {submitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center p-4 rounded-md ${
                      submitMessage.includes('error')
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 