import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-[#FF4500] to-[#00308F] text-white py-4 sticky top-0 z-50 blur-fix">
      <div className="glass">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              <Link to="/" className="text-[#01411C] hover:text-[#015f29] transition-colors flex items-center">
                <span className="text-3xl mr-2">🏛️</span>
                TawjeehQidfa
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-x-6"
            >
              <Link to="/" className="hover:text-[#01411C] transition-colors">Home</Link>
              <Link to="/about" className="hover:text-[#01411C] transition-colors">About</Link>
              <Link to="/services" className="hover:text-[#01411C] transition-colors">Services</Link>
              <Link to="/contact" className="hover:text-[#01411C] transition-colors">Contact</Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#01411C] hover:bg-[#015f29] px-4 py-2 rounded-full transition-colors ml-4"
              >
                Get Started
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 