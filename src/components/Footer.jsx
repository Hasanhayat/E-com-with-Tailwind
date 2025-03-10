import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#FF4500] to-[#00308F] text-white py-12">
      <div className="glass">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#01411C] flex items-center">
                <span className="text-2xl mr-2">🏛️</span>
                TawjeehQidfa
              </h3>
              <p className="text-gray-100">Your trusted partner for UAE government services since 2009.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#01411C]">Our Services</h4>
              <ul className="space-y-2 text-gray-100">
                <li><Link to="/services" className="hover:text-[#01411C] transition-colors">HR & Emiratisation</Link></li>
                <li><Link to="/services" className="hover:text-[#01411C] transition-colors">Medical Services</Link></li>
                <li><Link to="/services" className="hover:text-[#01411C] transition-colors">Vehicle Services</Link></li>
                <li><Link to="/services" className="hover:text-[#01411C] transition-colors">Document Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#01411C]">Government Services</h4>
              <ul className="space-y-2 text-gray-100">
                <li><Link to="/services" className="hover:text-[#01411C] transition-colors">Tawjeeh Services</Link></li>
                <li><Link to="/services" className="hover:text-[#01411C] transition-colors">Tadbeer Services</Link></li>
                <li><Link to="/services" className="hover:text-[#01411C] transition-colors">Tasheel Services</Link></li>
                <li><Link to="/services" className="hover:text-[#01411C] transition-colors">MOHRE Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#01411C]">Contact Us</h4>
              <ul className="space-y-2 text-gray-100">
                <li>📍 Location: UAE</li>
                <li>📞 Phone: [Your Phone Number]</li>
                <li>✉️ Email: [Your Email]</li>
                <li>⏰ Hours: Sun-Thu 9AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#01411C]/20 mt-12 pt-8 text-center text-gray-100">
            <p>&copy; 2024 TawjeehQidfa. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 