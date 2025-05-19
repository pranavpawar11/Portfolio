import React from "react";
import { motion } from "framer-motion";
import resume from "../../assets/files/resume.pdf";
import profile_image from "../../assets/images/profile.jpg";

const StatCard = ({ icon, count, label }) => (
  <motion.div
    className="p-6 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-md bg-opacity-80"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="text-5xl text-blue-600 dark:text-blue-400 mb-3">{icon}</div>
    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
      {count}
    </div>
    <p className="text-center text-gray-600 dark:text-gray-300">{label}</p>
  </motion.div>
);

const About = () => {
  const stats = [
    { icon: "🚀", count: "6+", label: "Projects Completed" },
    { icon: "🔧", count: "5+", label: "Technologies Mastered" },
    { icon: "⭐", count: "2+", label: "Years of Experience" },
  ];

  return (
    <section
      id="about"
      className="relative p-5 py-5 md:py-5 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      {/* Decorative background blur circles */}
      <div className="absolute top-10 -left-32 w-80 h-80 bg-blue-400 opacity-30 rounded-full filter blur-3xl mix-blend-multiply dark:bg-blue-900"></div>
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-purple-400 opacity-20 rounded-full filter blur-3xl mix-blend-multiply dark:bg-purple-900"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 z-10 relative">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            About{" "}
            <span className="text-primary-600 dark:text-primary-400"> Me</span>{" "}
            
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            I'm a passionate IT student and full-stack developer focused on
            building elegant and efficient web applications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 z-10 relative">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
              <img
                src={profile_image}
                alt="Pranav Pawar"
                className="w-full object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/600x800?text=About+Me")
                }
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-30 dark:opacity-40"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
              Hi, I’m Pranav Pawar 👋
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              With a focus on MERN stack and PHP-based solutions, I craft
              responsive and user-centric applications. I’m driven by curiosity
              and a desire to continuously improve.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              I love tackling real-world problems and enjoy building projects
              that make an impact. I'm currently open for full-time roles or
              exciting freelance gigs!
            </p>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <strong className="text-gray-900 dark:text-white">Name:</strong>{" "}
                Pranav Pawar
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Email:
                </strong>{" "}
                pranavpawar745@gmail.com
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Location:
                </strong>{" "}
                Pune, Maharashtra
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Availability:
                </strong>{" "}
                Open for Opportunities
              </p>
            </div>

            {/* Resume Download */}
            <motion.a
              href={resume}
              download="Pranav_Pawar_Resume.pdf"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
