import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Custom Timeline Component (to replace react-vertical-timeline-component)
const CustomTimelineElement = ({ 
  title, 
  date, 
  description, 
  icon, 
  iconBackground,
  iconColor, 
  isLeft = true
}) => {
  return (
    <div className="flex flex-col mb-16 relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-light-border dark:bg-dark-border -z-10"></div>
      
      {/* Timeline Content */}
      <div className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
        {/* Icon */}
        <div className="relative">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center z-10 border-4 border-light-background dark:border-dark-background" 
            style={{ backgroundColor: iconBackground, color: iconColor }}
          >
            {icon}
          </div>
        </div>
        
        {/* Content Card */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border">
            <h3 className="font-bold text-xl text-light-text dark:text-dark-text">{title}</h3>
            <div className="text-gray-500 dark:text-gray-400 font-medium mt-1 mb-3">{date}</div>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TechIcon = ({ type }) => {
  const icons = {
    react: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 000-4.278zm-5.992 6.394a1 1 0 01-.707-1.707l.146-.146a1 1 0 111.414 1.414l-.146.146a.997.997 0 01-.707.293zm0-11.788a.999.999 0 01-.707-.293l-.146-.146a1 1 0 111.414-1.414l.146.146a1 1 0 01-.707 1.707zM7.293 12a1 1 0 110-2h.172a1 1 0 110 2h-.172zm9.586 0a1 1 0 110-2h.172a1 1 0 110 2h-.172zM12 5.708a1 1 0 01-1-1v-.17a1 1 0 112 0v.17a1 1 0 01-1 1zm0 12.584a1 1 0 01-1-1v-.17a1 1 0 112 0v.17a1 1 0 01-1 1zM18.987 9.292a.999.999 0 01-.707-.293l-.146-.146a1 1 0 111.414-1.414l.146.146a1 1 0 01-.707 1.707zm0 5.414a.997.997 0 01-.707-.293l-.146-.146a1 1 0 011.414-1.414l.146.146a1 1 0 01-.707 1.707z" />
        <path d="M12 14.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0 1.5C7.998 15.75 4.75 13.757 4.75 12s3.248-3.75 7.25-3.75 7.25 1.993 7.25 3.75-3.248 3.75-7.25 3.75z" />
      </svg>
    ),
    node: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 1.85c-.27 0-.55.07-.78.2L2.78 7.1c-.48.28-.78.8-.78 1.36v7.08c0 .56.3 1.08.78 1.36l8.44 5.05c.23.13.5.2.78.2s.55-.07.78-.2l8.44-5.05c.48-.28.78-.8.78-1.36V8.46c0-.56-.3-1.08-.78-1.36l-8.44-5.05c-.23-.13-.5-.2-.78-.2z" />
      </svg>
    ),
    php: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zm12.027-.004h-.85l-.525 2.696h.743c.7 0 1.205-.129 1.516-.387.31-.258.454-.714.43-1.37-.024-.655-.233-1.088-.628-1.297-.395-.209-.93-.314-1.6-.314z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M5.82 8.637c.69 0 1.247.062 1.666.186.42.124.713.309.88.555.167.247.114.579-.157.994-.274.414-.797.741-1.569.773-.057 0-.174.006-.353.012-.179.006-.402.006-.669 0L4.816 14H3.5l.866-4.498c.116-.602.342-1.104.676-1.506.334-.402.775-.294 1.328-.359h.45zM16.994 8.637c.69 0 1.247.062 1.666.186.42.124.713.309.88.555.167.247.114.579-.157.994-.274.414-.797.741-1.569.773-.057 0-.174.006-.353.012-.179.006-.402.006-.669 0l-.902 2.843h-1.316l.866-4.498c.116-.602.342-1.104.676-1.506.334-.402.775-.294 1.328-.359h.45zM11.013 8.883l1.79 4.152h-1.3l-.267-.622h-1.734l-.267.622h-1.28l1.79-4.152h1.269zM10.9 11.48l-.258-.623c-.081-.19-.144-.343-.189-.458a3.52 3.52 0 01-.093-.3l-.075.301c-.06.17-.123.326-.19.467l-.267.613h1.071z" />
      </svg>
    ),
    database: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    javascript: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z" />
      </svg>
    ),
    html: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M5.08 5.93l.67 7.507h5.753l-.168 1.454-1.882.505-1.897-.52-.101-1.088h-1.78l.227 2.56 3.548.967h.037l3.546-.97.484-5.44H6.094L5.98 8.278h6.747l.228-2.349H5.08z" />
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm2.904 2.25l-.5.563 4.576 5.093L3.28 7.8l.5.564 4.576 5.094-4.576 5.093-.5.563 5.123-5.657 5.124 5.657-.5-.563-4.576-5.093 4.576-5.094-.5-.563-4.577 5.093-4.576-5.093L4.404 2.25z" />
      </svg>
    )
  };

  return icons[type.toLowerCase()] || (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M9.25 13.25a.75.75 0 01.75-.75h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75zm-4.5 0a.75.75 0 01.75-.75h2a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75z" />
      <path fillRule="evenodd" d="M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25H1.75z" />
    </svg>
  );
};

// Custom Timeline Component for Mobile
const MobileTimelineItem = ({ title, date, description, icon, iconBackground, iconColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-light-border dark:border-dark-border relative"
    >
      <div className="flex items-center mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center" 
          style={{ backgroundColor: iconBackground, color: iconColor }}
        >
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="font-bold text-lg text-light-text dark:text-dark-text">{title}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

const TechTimeline = () => {
  // Set CSS variables for light/dark mode
  useEffect(() => {
    const setThemeVars = () => {
      document.documentElement.style.setProperty('--light-card', '#ffffff');
      document.documentElement.style.setProperty('--dark-card', '#1e293b');
      document.documentElement.style.setProperty('--light-text', '#1e293b');
      document.documentElement.style.setProperty('--dark-text', '#f8fafc');
      document.documentElement.style.setProperty('--light-border', '#e2e8f0');
      document.documentElement.style.setProperty('--dark-border', '#334155');
      document.documentElement.style.setProperty('--light-background', '#f8fafc');
      document.documentElement.style.setProperty('--dark-background', '#0f172a');
    };

    setThemeVars();
  }, []);

  const timelineData = [
    {
      title: "Started Learning HTML & CSS",
      date: "2019",
      description: "Began web development journey with HTML5 and CSS3. Created static websites and learned about responsive design principles using media queries and flexbox.",
      icon: <TechIcon type="html" />,
      iconBackground: "#E34F26",
      iconColor: "#fff"
    },
    {
      title: "JavaScript & jQuery",
      date: "2020",
      description: "Expanded skills with JavaScript fundamentals and jQuery library. Started implementing interactive elements and form validations in web projects.",
      icon: <TechIcon type="javascript" />,
      iconBackground: "#F7DF1E",
      iconColor: "#000"
    },
    {
      title: "PHP & MySQL Development",
      date: "2021",
      description: "Learned server-side programming with PHP and database management with MySQL. Built dynamic websites with user authentication systems and CRUD operations.",
      icon: <TechIcon type="php" />,
      iconBackground: "#777BB4",
      iconColor: "#fff"
    },
    {
      title: "React Frontend Development",
      date: "2022",
      description: "Adopted React for frontend development. Mastered component-based architecture, React hooks, and state management. Created SPAs with improved user experiences.",
      icon: <TechIcon type="react" />,
      iconBackground: "#61DAFB",
      iconColor: "#20232A"
    },
    {
      title: "Node.js & Express Backend",
      date: "2023",
      description: "Built RESTful APIs with Node.js and Express. Implemented JWT authentication, middleware functions, and connected to MongoDB for full-stack JavaScript applications.",
      icon: <TechIcon type="node" />,
      iconBackground: "#339933",
      iconColor: "#fff"
    },
    {
      title: "Full MERN Stack Development",
      date: "2024",
      description: "Bringing it all together with MongoDB, Express, React, and Node.js (MERN) stack. Building full-stack applications with modern features like real-time updates using Socket.io.",
      icon: <TechIcon type="database" />,
      iconBackground: "#4DB33D",
      iconColor: "#fff"
    }
  ];

  return (
    <section
      id="tech-timeline"
      className="py-20 bg-light-background dark:bg-dark-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl opacity-5"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl opacity-5"></div>

      <div className="section-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="w-10 h-1 bg-primary-500 mr-3"></div>
            <p className="text-light-text dark:text-dark-text font-medium">Learning Journey</p>
            <div className="w-10 h-1 bg-primary-500 ml-3"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            My <span className="text-primary-600 dark:text-primary-400">Tech Stack</span> Timeline
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            My journey through various technologies and programming languages that have shaped my development skills over time.
          </motion.p>
        </div>

        <div className="relative">
          {/* Custom Timeline for Desktop */}
          <div className="hidden sm:block">
            <div className="relative">
              {timelineData.map((item, index) => (
                <CustomTimelineElement
                  key={index}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                  icon={item.icon}
                  iconBackground={item.iconBackground}
                  iconColor={item.iconColor}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>

          {/* Simplified Timeline for Mobile */}
          <div className="sm:hidden space-y-8">
            {timelineData.map((item, index) => (
              <MobileTimelineItem 
                key={index}
                title={item.title}
                date={item.date}
                description={item.description}
                icon={item.icon}
                iconBackground={item.iconBackground}
                iconColor={item.iconColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechTimeline;