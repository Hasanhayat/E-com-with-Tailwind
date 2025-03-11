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
    <div className="bg-[#00308F] min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-[#00308F]/90"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div style={{ scale }} className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center mb-6 space-x-4"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg" 
                     alt="UAE Flag" 
                     className="w-12 h-8 object-cover rounded shadow-lg" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg" 
                     alt="Pakistan Flag" 
                     className="w-12 h-8 object-cover rounded shadow-lg" />
              </motion.div>

              <h1 className="text-6xl font-bold mb-6 gsap-hero-anim">
                TawjeehQidfa
              </h1>
              <p className="text-2xl mb-4 font-semibold gsap-hero-anim">
                Your Trusted Partner for UAE Government Services
              </p>
              <p className="text-xl mb-8 text-gray-200 gsap-hero-anim">
                Comprehensive solutions for all your documentation and government service needs in the UAE
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gsap-hero-anim bg-[#FF4500] text-white hover:bg-[#FF5722] px-8 py-4 rounded-lg font-semibold transition-all shadow-lg"
              >
                Get Started
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="Professional Services"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00308F]/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Human Resources Services",
              description: "Complete HR and Emiratisation solutions",
              icon: "👥",
              image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
              title: "Medical Services",
              description: "Medical examination and health services",
              icon: "🏥",
              image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
              title: "Vehicle Services",
              description: "Complete vehicle registration and renewal",
              icon: "🚗",
              image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
              title: "Document Services",
              description: "Document clearance and attestation",
              icon: "📄",
              image: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
              title: "Trade License",
              description: "Business setup and licensing services",
              icon: "💼",
              image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
              title: "Government Services",
              description: "Tawjeeh, Tadbeer, and Tasheel services",
              icon: "🏛️",
              image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
              title: "Insurance Services",
              description: "Comprehensive insurance solutions",
              icon: "🛡️",
              image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
              title: "Pakistani Services",
              description: "NADRA, ID, and Passport services",
              icon: "🇵🇰",
              image: "https://images.unsplash.com/photo-1600192704857-411f8aa9f7f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            },
            {
              title: "Training Services",
              description: "Tawjeeh classes and certifications",
              icon: "📚",
              image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="service-card group relative overflow-hidden rounded-lg shadow-xl"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-64">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00308F] to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-3">{service.icon}</span>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-gray-200">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="container mx-auto px-4 py-20">
        <div className="bg-white/5 rounded-lg p-12 backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: 5000, label: "Happy Clients", icon: "😊" },
              { number: 10000, label: "Services Completed", icon: "✅" },
              { number: 98, label: "Success Rate", icon: "🎯" },
              { number: 15, label: "Years Experience", icon: "⭐" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <h3 className="text-5xl font-bold mb-4 text-white">
                  <span className="stat-number">{stat.number}</span>
                  {stat.number === 98 && "%"}
                </h3>
                <p className="text-gray-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-lg"
        >
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Dubai Skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#00308F]/90"></div>
          </div>
          
          <div className="relative p-12 text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Visit us today to experience our professional and efficient services.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF4500] text-white hover:bg-[#FF5722] px-8 py-4 rounded-lg font-semibold transition-all shadow-lg"
            >
              Contact Us Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage; 