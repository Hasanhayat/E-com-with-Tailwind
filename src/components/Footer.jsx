import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { name: 'All Products', href: '/shop' },
      { name: "Men's Collection", href: '/shop?category=men' },
      { name: "Women's Collection", href: '/shop?category=women' },
      { name: "Kid's Collection", href: '/shop?category=kids' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    Support: [
      { name: 'FAQs', href: '/faqs' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Track Order', href: '/track-order' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              Khattak Store
            </Link>
            <p className="text-gray-600 text-sm">
              Your one-stop destination for quality fashion and accessories.
              We bring you the latest trends at the best prices.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-600"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                {title}
              </h3>
              <ul className="mt-4 space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-base text-gray-600 hover:text-orange-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Get the latest updates, sales and special offers.
              </p>
            </div>
            <form className="mt-4 sm:mt-0">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-l-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-r-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-base text-gray-400">
            © {currentYear} Khattak Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 