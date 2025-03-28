import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { store, themeColors } = useTheme();
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
      { name: 'Track Order', path: '/user/orders' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: store.social.facebook },
    { name: 'Instagram', icon: Instagram, href: store.social.instagram },
    { name: 'Twitter', icon: Twitter, href: store.social.twitter },
    { name: 'YouTube', icon: Youtube, href: store.social.youtube },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle newsletter subscription
    alert('Subscribed to newsletter!');
  };

  return (
    <footer 
      className='py-8'
      style={{ 
        backgroundColor: themeColors.secondaryColor,
        color: 'white'
      }}
    >
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-bold mb-4'>Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className='text-gray-300 hover:text-white hover:underline'>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className='text-gray-300 hover:text-white hover:underline'>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className='text-gray-300 hover:text-white hover:underline'>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-4'>Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" style={{ color: themeColors.primaryColor }} />
                <span className="text-gray-300">{store.locations[0].address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" style={{ color: themeColors.primaryColor }} />
                <a 
                  href={`tel:${store.phone}`} 
                  className="text-gray-300 hover:text-white hover:underline"
                >
                  {store.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" style={{ color: themeColors.primaryColor }} />
                <a 
                  href={`mailto:${store.email}`} 
                  className="text-gray-300 hover:text-white hover:underline"
                >
                  {store.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 border-t border-gray-700 pt-8'>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className='text-lg font-bold mb-4'>Subscribe to our newsletter</h3>
              <form onSubmit={handleNewsletterSubmit} className='flex max-w-md'>
                <input 
                  type='email' 
                  placeholder='Enter your email' 
                  className='p-2 rounded-l-md w-full text-gray-800' 
                  required 
                />
                <button 
                  type='submit' 
                  className='p-2 px-4 rounded-r-md hover:bg-opacity-90 transition-colors'
                  style={{ backgroundColor: themeColors.primaryColor, color: 'white' }}
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div>
              <h3 className='text-lg font-bold mb-4 text-center md:text-right'>Follow Us</h3>
              <div className='flex justify-center md:justify-end space-x-4'>
                {socialLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className='text-gray-300 hover:text-white'
                    aria-label={link.name}
                  >
                    <link.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 text-center text-gray-400 text-sm'>
          <p>&copy; {currentYear} {store.name}. All rights reserved.</p>
          <p className="mt-1">
            Established {store.established} | {store.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
} 