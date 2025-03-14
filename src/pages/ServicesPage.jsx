import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ServicesPage() {
  const servicesRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    gsap.from(servicesRef.current.querySelectorAll('.service-card'), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top center+=100",
      }
    });

    gsap.from(processRef.current.querySelectorAll('.process-step'), {
      opacity: 0,
      x: -50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: processRef.current,
        start: "top center+=100",
      }
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-orange-950 to-blue-950 text-white min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-blue-400"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-center text-gray-300 max-w-3xl mx-auto"
        >
          We offer comprehensive solutions to help your business thrive in the digital age.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div ref={servicesRef} className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Web Development",
              description: "Custom websites and web applications built with the latest technologies.",
              icon: "🌐",
              features: ["Responsive Design", "SEO Optimization", "Performance Tuning"]
            },
            {
              title: "Mobile Apps",
              description: "Native and cross-platform mobile applications for iOS and Android.",
              icon: "📱",
              features: ["User-friendly UI", "Offline Support", "Push Notifications"]
            },
            {
              title: "UI/UX Design",
              description: "Beautiful and intuitive user interfaces that enhance user experience.",
              icon: "🎨",
              features: ["User Research", "Wireframing", "Prototyping"]
            },
            {
              title: "Cloud Solutions",
              description: "Scalable cloud infrastructure and deployment solutions.",
              icon: "☁️",
              features: ["AWS/Azure", "Auto Scaling", "Security"]
            },
            {
              title: "Digital Marketing",
              description: "Comprehensive digital marketing strategies to grow your business.",
              icon: "📈",
              features: ["SEO/SEM", "Social Media", "Content Marketing"]
            },
            {
              title: "Consulting",
              description: "Expert guidance on technology and digital transformation.",
              icon: "💡",
              features: ["Strategy Planning", "Tech Advisory", "Training"]
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="service-card bg-gradient-to-br from-orange-900/50 to-blue-900/50 backdrop-blur-lg p-8 rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-orange-400">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-blue-300">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div ref={processRef} className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-orange-400">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: 1, title: "Discovery", description: "Understanding your needs and goals" },
            { step: 2, title: "Planning", description: "Creating a detailed project roadmap" },
            { step: 3, title: "Execution", description: "Bringing your vision to life" },
            { step: 4, title: "Support", description: "Ongoing maintenance and updates" }
          ].map((phase, index) => (
            <motion.div
              key={index}
              className="process-step relative"
            >
              <div className="bg-gradient-to-br from-orange-900/30 to-blue-900/30 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-orange-400 mb-4">Step {phase.step}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-300">{phase.title}</h3>
                <p className="text-gray-300">{phase.description}</p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-orange-500"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-orange-900 via-blue-900 to-orange-900 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-8 text-orange-400">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your business goals with our comprehensive services.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-blue-600 transition-all"
          >
            Get Free Consultation
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;