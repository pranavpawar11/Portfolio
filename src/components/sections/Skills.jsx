import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Skill data organized by categories with enhanced icons and descriptions
const skillsData = {
  "Frontend": [
    { name: "React", level: 90, icon: "https://www.svgrepo.com/show/452092/react.svg", description: "Component-based UI development" },
    { name: "JavaScript", level: 85, icon: "https://www.svgrepo.com/show/353925/javascript.svg", description: "Dynamic web functionality" },
    { name: "HTML5", level: 95, icon: "https://www.svgrepo.com/show/452228/html-5.svg", description: "Semantic markup" },
    { name: "CSS3", level: 90, icon: "https://www.svgrepo.com/show/452185/css-3.svg", description: "Modern styling" },
    { name: "Tailwind CSS", level: 85, icon: "https://www.svgrepo.com/show/354431/tailwindcss-icon.svg", description: "Utility-first styling" },
    { name: "Bootstrap", level: 80, icon: "https://www.svgrepo.com/show/353498/bootstrap.svg", description: "Responsive frameworks" }
  ],
  "Backend": [
    { name: "Node.js", level: 85, icon: "https://www.svgrepo.com/show/452075/node-js.svg", description: "JavaScript runtime" },
    { name: "Express.js", level: 80, icon: "https://www.svgrepo.com/show/378837/node.svg", description: "Web application framework" },
    { name: "PHP", level: 75, icon: "https://www.svgrepo.com/show/452088/php.svg", description: "Server-side scripting" },
    { name: "Python", level: 65, icon: "https://www.svgrepo.com/show/452091/python.svg", description: "Versatile programming" }
  ],
  "Database": [
    { name: "MongoDB", level: 80, icon: "https://www.svgrepo.com/show/331488/mongodb.svg", description: "NoSQL document database" },
    { name: "MySQL", level: 85, icon: "https://www.svgrepo.com/show/303251/mysql-logo.svg", description: "Relational database" },
    { name: "PostgreSQL", level: 70, icon: "https://www.svgrepo.com/show/354200/postgresql.svg", description: "Advanced SQL database" }
  ],
  "Tools & Others": [
    { name: "Git", level: 85, icon: "https://www.svgrepo.com/show/439173/git.svg", description: "Version control" },
    { name: "Postman", level: 80, icon: "https://www.svgrepo.com/show/354202/postman-icon.svg", description: "API testing" },
    { name: "Thunder Client", level: 80, icon: "https://www.svgrepo.com/show/463361/thunder-sign-circle.svg", description: "API client" },
    { name: "Xampp", level: 80, icon: "https://www.svgrepo.com/show/354575/xampp.svg", description: "Local development server" }
  ]
};

// Enhanced Skill Card Component
const SkillCard = ({ skill, index }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-lg dark:shadow-dark-background/50 transition-all duration-300 overflow-hidden border border-light-border dark:border-dark-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mr-4">
            <img 
              src={skill.icon} 
              alt={skill.name} 
              className="w-8 h-8"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/32?text=${skill.name[0]}`;
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-light-text dark:text-dark-text">{skill.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{skill.description}</p>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex justify-between mb-1 items-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Proficiency</span>
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400">{skill.level}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Animated Category Icon
const CategoryIcon = ({ category }) => {
  const icons = {
    "Frontend": (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    "Backend": (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    "Database": (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
      </svg>
    ),
    "Tools & Others": (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  };

  return icons[category] || null;
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("Frontend");
  const [isVisible, setIsVisible] = useState(false);
  const categories = Object.keys(skillsData);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('skills');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  return (
    <section id="skills" className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-dark-background dark:to-dark-background/95 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-200 dark:bg-primary-900/20 filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-secondary-200 dark:bg-secondary-900/20 filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <h2 className="section-title text-center">My Skills</h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          {/* <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-6 inline-block relative">
            Technical Expertise
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
          </h2> */}
          {/* <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            My professional toolkit includes these technologies that I've mastered to create exceptional digital experiences.
          </p> */}
        </motion.div>
        
        {/* Category Tabs - Enhanced */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveTab(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-sm ${
                activeTab === category
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium"
                  : "bg-white dark:bg-dark-card text-light-text dark:text-dark-text hover:bg-primary-50 dark:hover:bg-primary-900/30"
              }`}
            >
              <span className="opacity-80">{CategoryIcon({ category })}</span>
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Skills Grid - Enhanced with animation */}
        <div className="backdrop-blur-glass bg-white/80 dark:bg-dark-card/80 rounded-2xl shadow-glass border border-light-border dark:border-dark-border p-8 transition-all duration-300 hover:shadow-glass-hover">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsData[activeTab].map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Additional Info - Enhanced */}
        {/* <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 max-w-3xl mx-auto border border-primary-100 dark:border-primary-800/30">
            <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-300 mb-3">Always Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              I'm continuously expanding my skill set and exploring new technologies to stay ahead of industry trends. Currently focusing on advanced React patterns, serverless architectures, and modern state management solutions.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200">
                Next.js
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200">
                TypeScript
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200">
                AWS
              </span>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Skills;