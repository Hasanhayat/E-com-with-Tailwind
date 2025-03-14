import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Products', path: '/shop' },
      { name: 'Men\'s Collection', path: '/shop/mens' },
      { name: 'Women\'s Collection', path: '/shop/womens' },
      { name: 'Kid\'s Collection', path: '/shop/kids' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    support: [
      { name: 'FAQs', path: '/faqs' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Track Order', path: '/track-order' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle newsletter subscription
    alert('Subscribed to newsletter!');
  };

  return (
    <footer className='bg-gray-800 text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-bold mb-4'>Shop</h3>
            <ul>
              {footerLinks.shop.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className='hover:underline'>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Company</h3>
            <ul>
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className='hover:underline'>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Support</h3>
            <ul>
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className='hover:underline'>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='mt-8'>
          <h3 className='text-lg font-bold mb-4'>Subscribe to our newsletter</h3>
          <form onSubmit={handleNewsletterSubmit} className='flex'>
            <input type='email' placeholder='Enter your email' className='p-2 rounded-l-md' required />
            <button type='submit' className='bg-orange-600 p-2 rounded-r-md hover:bg-orange-700'>Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
} 