import { motion } from 'framer-motion';

export default function About() {
  const features = [
    {
      title: "Wide Selection",
      description: "Explore our vast collection of products from top brands and local artisans.",
      icon: "🛍️",
    },
    {
      title: "Quality Assured",
      description: "Every product is carefully selected and quality checked before shipping.",
      icon: "✨",
    },
    {
      title: "Fast Delivery",
      description: "Get your orders delivered quickly and safely to your doorstep.",
      icon: "🚚",
    },
    {
      title: "24/7 Support",
      description: "Our customer service team is always here to help you.",
      icon: "💬",
    },
  ];

  const team = [
    {
      name: "Muhammad Khattak",
      role: "Founder & CEO",
      image: "https://ui-avatars.com/api/?name=Muhammad+Khattak&background=random",
    },
    {
      name: "Sarah Ahmed",
      role: "Head of Operations",
      image: "https://ui-avatars.com/api/?name=Sarah+Ahmed&background=random",
    },
    {
      name: "Ali Hassan",
      role: "Lead Designer",
      image: "https://ui-avatars.com/api/?name=Ali+Hassan&background=random",
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
          About Khattak Store
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We're passionate about bringing you the best shopping experience with quality products,
          exceptional service, and innovative solutions.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-50 py-16 mb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founded in 2024, Khattak Store has grown from a small local shop to a leading
              online marketplace. Our journey is driven by our commitment to excellence and
              customer satisfaction.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The passionate individuals behind Khattak Store who work tirelessly to bring you
            the best shopping experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 