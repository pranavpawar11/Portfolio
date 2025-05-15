import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ExperienceCard = ({
  role,
  company,
  duration,
  description,
  technologies,
  index,
  expanded,
  onToggle,
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  };

  const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={index}
      variants={cardVariants}
      className={`bg-light-card dark:bg-dark-card rounded-2xl shadow-md hover:shadow-xl 
                 transition-all duration-300 border border-light-border dark:border-dark-border 
                 transform hover:-translate-y-1
                 ${expanded ? "ring-2 ring-primary-500 dark:ring-primary-400" : ""}`}
    >
      <div
        className="p-6 cursor-pointer transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-t-2xl"
        onClick={() => onToggle(index)}
      >
        <div className="flex flex-col">
          {/* Duration badge */}
          <div className="flex justify-between items-center mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 rounded-full">
              {duration}
            </span>
            
            <motion.button 
              className="text-primary-600 dark:text-primary-400 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-300 ${
                  expanded ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          </div>

          <h3 className="font-bold text-xl text-light-text dark:text-dark-text mb-1">
            {role}
          </h3>

          <h4 className="text-gray-600 dark:text-gray-300 font-medium mb-4">
            {company}
          </h4>

          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, expanded ? technologies.length : 3).map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-2 py-1 text-xs font-medium bg-secondary-100 dark:bg-secondary-900/60 text-secondary-800 dark:text-secondary-200 rounded-md"
              >
                {tech}
              </motion.span>
            ))}
            {!expanded && technologies.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md">
                +{technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <motion.div
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
        variants={contentVariants}
        className="px-6 pb-6 overflow-hidden"
      >
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('experience');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const experienceData = [
    {
      role: "Full Stack Developer Intern",
      company: "Intellicuria",
      duration: "Sep 2024 - Feb 2024",
      description:
        "Developed a web app for doctors to manage patients, appointments, and research. Worked on front-end (React with Redux) and back-end API development. Created secure and scalable APIs for data management. Built responsive UIs for enhanced user experience.",
      technologies: [
        "React",
        "Redux",
        "Node.js",
        "Express.js",
        "MongoDB",
        "API Development",
      ],
    },
    {
      role: "Intern",
      company: "SGMS Infotech Akurdi",
      duration: "Jun 2022 - Aug 2022",
      description:
        "Gained hands-on experience in Web Development during this 3-month internship. Assisted in writing clean and efficient code for various software projects. Participated in daily code reviews and debugging sessions, developing problem-solving skills.",
      technologies: ["PHP", "HTML", "CSS", "JavaScript", "Web Development"],
    },
  ];

  // Animation variants for section elements
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="experience"
      className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-dark-background dark:to-dark-background/95 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-200 dark:bg-primary-900/20 filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-secondary-200 dark:bg-secondary-900/20 filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title text-center">Work Experience</h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          {/* <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-1 bg-primary-500 rounded-full mr-3"></div>
            <p className="text-light-text dark:text-dark-text font-medium">
              Professional Journey
            </p>
            <div className="w-12 h-1 bg-primary-500 rounded-full ml-3"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-4 font-fira">
            Work{" "}
            <span className="text-primary-600 dark:text-primary-400">
              Experience
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-inter">
            My professional experience has helped me develop practical skills in
            web development, database management, and collaborative
            problem-solving in real-world scenarios.
          </p> */}
        </motion.div>


          <div className="space-y-6">
            {experienceData.map((exp, index) => (
              <ExperienceCard
                key={index}
                role={exp.role}
                company={exp.company}
                duration={exp.duration}
                description={exp.description}
                technologies={exp.technologies}
                index={index}
                expanded={expandedIndex === index}
                onToggle={toggleExpand}
              />
            ))}
          </div>
        </div>
    </section>
  );
};

export default Experience;