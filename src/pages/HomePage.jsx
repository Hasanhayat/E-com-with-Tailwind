import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.from(heroRef.current.querySelectorAll('.gsap-hero-anim'), {
      duration: 1,
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: "power4.out"
    });

    gsap.from(servicesRef.current.querySelectorAll('.service-card'), {
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top center+=100",
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out"
    });

    gsap.from(statsRef.current.querySelectorAll('.stat-number'), {
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top center+=100",
      },
      duration: 2,
      textContent: 0,
      snap: { textContent: 1 },
      stagger: 0.2,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#FF4500] to-[#00308F] text-white overflow-hidden">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none blur-fix">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#01411C]/20 rounded-full"
            animate={{
              x: ["0vw", `${Math.random() * 100}vw`],
              y: ["0vh", `${Math.random() * 100}vh`],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div style={{ scale }}>
            <h1 className="text-6xl font-bold mb-6 gsap-hero-anim bg-clip-text text-transparent bg-gradient-to-r from-white to-[#01411C]">
              TawjeehQidfa
            </h1>
            <p className="text-2xl mb-4 text-[#01411C] font-semibold gsap-hero-anim">
              Your Trusted Partner for UAE Government Services
            </p>
            <p className="text-xl mb-8 text-gray-100 gsap-hero-anim">
              Comprehensive solutions for all your documentation and government service needs in the UAE
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gsap-hero-anim bg-[#01411C] hover:bg-[#015f29] px-8 py-4 rounded-full font-semibold transition-all"
            >
              Get Started
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7 }}
            className="relative blur-fix"
          >
            <div className="w-full h-96 bg-gradient-to-tr from-[#01411C] to-[#00308F] rounded-2xl shadow-2xl transform hover:rotate-6 transition-transform duration-500"></div>
            <div className="absolute inset-0 w-full h-96 bg-gradient-to-tr from-[#01411C] to-[#00308F] rounded-2xl shadow-2xl -z-10 opacity-50"></div>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#01411C]">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Human Resources Services",
              description: "Complete HR and Emiratisation solutions",
              icon: "👥"
            },
            {
              title: "Medical Services",
              description: "Medical examination and health services",
              icon: "🏥"
            },
            {
              title: "Vehicle Services",
              description: "Complete vehicle registration and renewal",
              icon: "🚗"
            },
            {
              title: "Document Services",
              description: "Document clearance and attestation",
              icon: "📄"
            },
            {
              title: "Trade License",
              description: "Business setup and licensing services",
              icon: "💼"
            },
            {
              title: "Government Services",
              description: "Tawjeeh, Tadbeer, and Tasheel services",
              icon: "🏛️"
            },
            {
              title: "Insurance Services",
              description: "Comprehensive insurance solutions",
              icon: "🛡️"
            },
            {
              title: "Pakistani Services",
              description: "NADRA, ID, and Passport services",
              icon: "🇵🇰"
            },
            {
              title: "Training Services",
              description: "Tawjeeh classes and certifications",
              icon: "📚"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="service-card glass p-8 rounded-xl hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-[#01411C]">{service.title}</h3>
              <p className="text-gray-100">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="container mx-auto px-4 py-20">
        <div className="glass rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#01411C]">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: 5000, label: "Happy Clients" },
              { number: 10000, label: "Services Completed" },
              { number: 98, label: "Success Rate" },
              { number: 15, label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <h3 className="text-5xl font-bold mb-4 text-[#01411C]">
                  <span className="stat-number">{stat.number}</span>
                  {stat.number === 98 && "%"}
                </h3>
                <p className="text-gray-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="glass rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-8 text-[#01411C]">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Visit us today to experience our professional and efficient services.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#01411C] hover:bg-[#015f29] text-white px-8 py-4 rounded-full font-semibold transition-all"
          >
            Contact Us Now
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 