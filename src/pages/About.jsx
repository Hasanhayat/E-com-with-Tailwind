import { motion } from 'framer-motion';

export default function About() {
  const features = [
    { title: 'Quality Products', description: 'We offer the best quality products at affordable prices.', icon: '🌟' },
    { title: 'Fast Delivery', description: 'Get your products delivered to your doorstep quickly and safely.', icon: '🚚' },
    { title: 'Customer Support', description: 'Our support team is here to help you 24/7.', icon: '📞' },
    { title: 'Secure Payment', description: 'Your transactions are safe with our secure payment system.', icon: '🔒' },
  ];

  const team = [
    { name: 'John Doe', role: 'Founder & CEO', image: 'https://via.placeholder.com/150' },
    { name: 'Jane Smith', role: 'Chief Marketing Officer', image: 'https://via.placeholder.com/150' },
    { name: 'Emily Johnson', role: 'Head of Customer Support', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1 className='text-3xl font-bold mb-4'>About Khattak Store</h1>
        <p className='mb-8'>Khattak Store is committed to providing the best shopping experience with quality products and excellent customer service.</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {features.map((feature, index) => (
            <div key={index} className='bg-white p-6 rounded-lg shadow-md'>
              <div className='text-4xl mb-4'>{feature.icon}</div>
              <h2 className='text-xl font-semibold mb-2'>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <h2 className='text-2xl font-bold mb-4'>Our Story</h2>
        <p className='mb-8'>Founded in 2020, Khattak Store has grown from a small local shop to a leading online retailer, thanks to our loyal customers and dedicated team.</p>
        <h2 className='text-2xl font-bold mb-4'>Meet Our Team</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {team.map((member, index) => (
            <div key={index} className='text-center'>
              <img src={member.image} alt={member.name} className='w-32 h-32 rounded-full mx-auto mb-4' />
              <h3 className='text-xl font-semibold'>{member.name}</h3>
              <p className='text-gray-600'>{member.role}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 