import React, { useEffect } from "react";
import { motion } from "framer-motion";
import resume from "../../assets/files/resume.pdf"; // adjust path based on your file location
import profile_image from "../../assets/images/profile.jpg"; 
// Stats card component
const StatCard = ({ icon, count, label }) => (
  <motion.div
    className="p-4 md:p-6 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.03 }}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    <div className="text-4xl md:text-5xl text-blue-600 dark:text-blue-400 mb-2">
      {icon}
    </div>
    <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-1">
      {count}
    </div>
    <div className="text-gray-600 dark:text-gray-300 text-center">{label}</div>
  </motion.div>
);

const About = () => {
  // Stats data
  const stats = [
    {
      icon: "🚀",
      count: "10+",
      label: "Projects Completed",
    },
    {
      icon: "🔧",
      count: "5+",
      label: "Technologies Mastered",
    },
    {
      icon: "⭐",
      count: "3+",
      label: "Years of Experience",
    },
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="about"
      className="relative py-5 md:py-5 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10"></div>
      <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/4 after:right-1/4 after:h-1 after:bg-blue-500">
            About Me
          </h2>
          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm a passionate IT student and full-stack developer with expertise
            in building modern web applications. Here's a little bit about my
            journey and what drives me.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl w-full max-w-md border-4 border-white dark:border-gray-700">
                <img
                  // src="https://img.freepik.com/free-vector/hacker-operating-laptop-cartoon-icon-illustration-technology-icon-concept-isolated-flat-cartoon-style_138676-2387.jpg?ga=GA1.1.1177604058.1745749661&semt=ais_hybrid&w=740"
                  src={profile_image}
                  alt="Pranav working"
                  className="w-full"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x800?text=About+Me";
                  }}
                />
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center shadow-lg z-20"
                animate={{ rotate: [6, 8, 6] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                <div className="text-blue-600 dark:text-blue-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center shadow-lg z-20"
                animate={{ rotate: [-6, -8, -6] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <div className="text-purple-600 dark:text-purple-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4"
            >
              I'm an Information Technology Student & Full-Stack Developer
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              With a passion for creating efficient, scalable, and user-friendly
              web applications, I've been working with various technologies in
              the MERN stack, PHP ecosystem, and more. I'm constantly learning
              and exploring new technologies to stay at the forefront of web
              development.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              My journey in tech started when I was in college, where I
              discovered my passion for coding and problem-solving. Since then,
              I've worked on numerous projects, ranging from simple websites to
              complex web applications, always focusing on writing clean,
              maintainable code and delivering exceptional user experiences.
            </motion.p>

            {/* Personal Info Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    Name:
                  </span>{" "}
                  Pranav Pawar
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    Email:
                  </span>{" "}
                  pranavpawar745@gmail.com
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    Location:
                  </span>{" "}
                  Pune, Maharastra
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    Availability:
                  </span>{" "}
                  Open for opportunities
                </p>
              </div>
            </motion.div>

            {/* Download Resume Button */}
            <motion.a
              variants={itemVariants}
              href={resume}
              download="Pranav_Pawar_Resume.pdf" // Optional: this sets the filename
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full inline-flex items-center transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Download Resume</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
