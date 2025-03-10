import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const teamRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    gsap.from(missionRef.current.querySelectorAll('.mission-anim'), {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: missionRef.current,
        start: "top center+=100",
      }
    });

    gsap.from(teamRef.current.querySelectorAll('.team-member'), {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: teamRef.current,
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
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-center text-gray-300 max-w-3xl mx-auto"
        >
          We are a team of passionate individuals dedicated to creating innovative solutions
          for businesses worldwide.
        </motion.p>
      </div>

      {/* Mission Section */}
      <div ref={missionRef} className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 text-orange-400 mission-anim">Our Mission</h2>
            <p className="text-lg text-gray-300 mb-6 mission-anim">
              To empower businesses with cutting-edge technology solutions that drive growth
              and innovation in the digital age.
            </p>
            <p className="text-lg text-gray-300 mb-6 mission-anim">
              We believe in creating lasting partnerships with our clients, understanding
              their unique challenges, and delivering solutions that exceed expectations.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="mission-anim">
                <h3 className="text-2xl font-bold text-orange-400 mb-2">10+</h3>
                <p className="text-gray-300">Years of Experience</p>
              </div>
              <div className="mission-anim">
                <h3 className="text-2xl font-bold text-orange-400 mb-2">500+</h3>
                <p className="text-gray-300">Projects Completed</p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="w-full h-96 bg-gradient-to-tr from-orange-400 to-blue-400 rounded-2xl shadow-2xl"></div>
            <div className="absolute inset-0 w-full h-96 bg-gradient-to-tr from-orange-500 to-blue-500 rounded-2xl shadow-2xl -z-10 blur-lg"></div>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div ref={teamRef} className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-orange-400">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "John Smith",
              role: "CEO & Founder",
              image: "https://via.placeholder.com/150",
              bio: "20+ years of industry experience"
            },
            {
              name: "Sarah Johnson",
              role: "Lead Designer",
              image: "https://via.placeholder.com/150",
              bio: "Award-winning UI/UX designer"
            },
            {
              name: "Michael Brown",
              role: "Tech Lead",
              image: "https://via.placeholder.com/150",
              bio: "Full-stack development expert"
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              className="team-member bg-gradient-to-br from-orange-900/50 to-blue-900/50 backdrop-blur-lg p-8 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2 text-orange-400">{member.name}</h3>
              <p className="text-blue-300 mb-4">{member.role}</p>
              <p className="text-gray-300">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-orange-400">Our Values</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { title: "Innovation", icon: "💡" },
            { title: "Integrity", icon: "🤝" },
            { title: "Excellence", icon: "⭐" },
            { title: "Collaboration", icon: "👥" }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-900/30 to-blue-900/30 p-6 rounded-xl text-center"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-orange-400">{value.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage; 