import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#00308F] text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            <Link to="/" className="text-white hover:text-gray-200 transition-colors flex items-center">
              <div className="flex items-center space-x-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg" 
                     alt="UAE Flag" 
                     className="w-8 h-6 object-cover rounded shadow" />
                <span className="text-3xl">🏛️</span>
                <span>TawjeehQidfa</span>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-6"
          >
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-gray-200 transition-colors">About</Link>
            <Link to="/services" className="hover:text-gray-200 transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-gray-200 transition-colors">Contact</Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF4500] text-white hover:bg-[#FF5722] px-6 py-2 rounded-lg transition-all shadow-lg flex items-center space-x-2"
            >
              <span>Get Started</span>
              <span className="text-xl">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 