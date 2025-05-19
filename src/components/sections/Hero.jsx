

import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Link as ScrollLink } from 'react-scroll';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Tilt } from 'react-tilt';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import gsap from 'gsap';
import profile_image from "../../assets/images/New Image.jpg"; 

// Social Links Component
const SocialLink = ({ href, icon, delay }) => {
  const icons = {
    github: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    email: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
      aria-label={`${icon} link`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      whileHover={{ scale: 1.2 }}
    >
      {icons[icon.toLowerCase()]}
    </motion.a>
  );
};

// Animated skill icon component
const SkillIcon = ({ icon, name, x, y, size = 40 }) => {
  return (
    <motion.div
      className="absolute glass-card p-2 rounded-lg shadow-lg bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm z-20"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        x: [x - 10, x + 10, x],
        y: [y - 10, y + 10, y],
      }}
      transition={{ 
        opacity: { delay: Math.random() * 0.5, duration: 0.5 },
        x: { repeat: Infinity, repeatType: "reverse", duration: 5 + Math.random() * 3 },
        y: { repeat: Infinity, repeatType: "reverse", duration: 5 + Math.random() * 2 }
      }}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="flex flex-col items-center justify-center">
        {icon}
        <span className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">{name}</span>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const controls = useAnimation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const tiltOptions = {
    max: 25,
    scale: 1.05,
    speed: 1000,
    glare: true,
    "max-glare": 0.5
  };

  // Mouse position effect for gradient
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      gsap.to(heroRef.current, {
        '--x': `${x * 100}%`,
        '--y': `${y * 100}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ 
        background: "radial-gradient(circle at var(--x, 10%) var(--y, 20%), rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(99, 102, 241, 0.02) 80%)"
      }}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: { value: "transparent" },
          },
          fpsLimit: 60,
          particles: {
            color: { value: "#8b5cf6" },
            links: {
              color: "#8b5cf6",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      
      {/* Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"
      ></motion.div>
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"
      ></motion.div>
      
      <div className="hidden lg:flex">

      
      {/* Floating skill icons */}
      <SkillIcon 
        icon={<svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>}
        name="JavaScript"
        x={50}
        y={15}
      />
      <SkillIcon 
        icon={<svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm-.97 14.95c.167.26.266.597.27 1.007.12.882-.602 1.138-1.078 1.138-.265 0-.456-.078-.623-.26-.167-.18-.266-.44-.276-.778v-.036c.01-.32.096-.63.27-.932.175-.3.408-.54.697-.713l.102-.053c.19-.1.366-.18.513-.246.145-.065.27-.125.368-.18.082.12.154.287.217.502.064.216.094.432.094.652v.036a2.02 2.02 0 01-.039.18 1.09 1.09 0 01-.515.78zm5.703-.966c0 .47-.57.94-.16 1.418-.11.465-.275.923-.466 1.374-.19.45-.42.873-.683 1.272-.262.398-.55.735-.856 1.012-.305.276-.625.49-.957.65-.33.16-.663.24-1 .24-.337 0-.672-.08-1.007-.233-.32-.152-.605-.374-.873-.663-.27-.29-.5-.644-.727-1.055-.224-.41-.396-.876-.525-1.404-.13-.512-.16-1.036-.16-1.563 0-.53.034-1.047.16-1.563.143-.522.317-.992.524-1.403.223-.417.464-.77.733-1.06.27-.29.563-.513.887-.666.325-.154.663-.23 1.016-.23.346 0 .677.08 1 .24.33.16.65.374.956.65.307.276.595.614.856 1.013.262.398.492.823.683 1.274.19.45.356.91.465 1.375.11.465.16.936.16 1.412z"/></svg>}
        name="React"
        x={38}
        y={60}
      />
      <SkillIcon 
        icon={<svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg>}
        name="Node.js"
        x={53}
        y={60}
      />
      <SkillIcon 
        icon={<svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>}
        name="TypeScript"
        x={45}
        y={40}
      />
      <SkillIcon 
        icon={<svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M16.633 16.504c.869-.075 1.543-.84 1.499-1.754-.046-.914-.795-1.648-1.708-1.648h-.061c-.943.031-1.678.824-1.648 1.769.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.004 4.795-1.603.838-3.296 1.154-4.944.929-1.378-.194-2.456-.81-3.116-1.798-.988-1.499-1.078-3.116-.255-4.734.601-1.169 1.499-2.023 2.099-2.443-.15-.389-.33-1.048-.42-1.542-4.436 3.177-3.985 7.521-2.637 9.574 1.004 1.498 3.057 2.456 5.304 2.456.599 0 1.229-.044 1.843-.194 3.896-.749 6.847-3.086 8.54-6.532l.014-.031zM21.981 12.758c-2.321-2.727-5.738-4.225-9.634-4.225h-.51c-.253-.554-.837-.899-1.497-.899h-.045c-.943 0-1.678.81-1.647 1.753.03.898.794 1.648 1.708 1.648h.074c.675-.03 1.259-.45 1.498-1.049h.555c2.309 0 4.495.674 6.488 1.992 1.527 1.004 2.622 2.322 3.236 3.896.538 1.288.509 2.547-.045 3.597-.854 1.647-2.293 2.517-4.195 2.517-1.199 0-2.367-.375-2.967-.644-.359.298-.959.793-1.394 1.093 1.318.598 2.652.943 3.94.943 2.922 0 5.093-1.647 5.918-3.236.898-1.798.824-4.824-1.469-7.416l-.014.03zM6.49 17.042c.029.899.793 1.648 1.708 1.648h.06c.959-.03 1.693-.823 1.648-1.768 0-.899-.779-1.647-1.693-1.647h-.061c-.06 0-.149 0-.225.029-1.243-2.098-1.768-4.346-1.572-6.771.119-1.828.719-3.417 1.797-4.735.899-1.124 2.592-1.679 3.746-1.708 3.236-.061 4.585 3.971 4.689 5.574l1.498.449c-.345-4.914-3.4-7.492-6.322-7.492-2.742 0-5.273 1.993-6.293 4.915-1.393 3.896-.479 7.641 1.229 10.638-.149.195-.239.539-.209.868z"/></svg>}
        name="Redux"
        x={35}
        y={30}
      />
      </div>
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Content - Text */}
        <div className="z-10" ref={ref}>
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="flex items-center mb-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="w-10 h-1 bg-primary-500 mr-3"></div>
              <p className="text-light-text dark:text-dark-text font-medium">Welcome to my portfolio</p>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-light-text dark:text-dark-text"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              Hi, I'm <motion.span 
                className="text-primary-600 dark:text-primary-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >Pranav Pawar</motion.span>
            </motion.h1>
            
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 text-light-text dark:text-dark-text h-12"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer', 
                  2000,
                  'MERN Stack Expert', 
                  2000,
                  'PHP Developer',
                  2000,
                  'IT Student',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg text-lg"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              Building scalable, user-centric applications with expertise in MERN stack, PHP, and database management.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ScrollLink                  to="contact"
                  smooth={true}
                  duration={500}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-300 cursor-pointer"
                >
                  Contact Me
                </ScrollLink>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ScrollLink
                  to="projects"
                  smooth={true}
                  duration={500}
                  className="px-6 py-3 border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-300 cursor-pointer"
                >
                  View Projects
                </ScrollLink>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex gap-4 mt-8"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <SocialLink 
                href="https://github.com/pranavpawar11" 
                icon="github" 
                delay={0.6}
              />
              <SocialLink 
                href="https://www.linkedin.com/in/pranav-pawar-4a37092b7/" 
                icon="linkedin" 
                delay={0.7}
              />
              <SocialLink 
                href="mailto:pranavpawar745@gmail.com" 
                icon="email" 
                delay={0.8}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Right Content - Image */}
        <motion.div 
          className="hidden lg:flex relative z-10 justify-center lg:justify-end"

          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ y: textY }}
        >
          <Tilt options={tiltOptions} className="max-w-xs sm:max-w-sm">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-full h-full rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
              >
                <img 
                  src={profile_image} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* <motion.div 
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-primary-500 bg-opacity-10 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              >
                <div className="w-24 h-24 rounded-full bg-primary-500 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-2xl font-bold text-white">5+</div>
                </div>
              </motion.div> */}
            </div>
          </Tilt>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      {/* <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ opacity }}
      >
        <ScrollLink to="about" smooth={true} duration={500}>
          <div className="w-8 h-14 border-2 border-gray-400 dark:border-gray-300 rounded-full flex justify-center items-start p-1 cursor-pointer">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full"
            />
          </div>
        </ScrollLink>
      </motion.div> */}
    </section>
  );
};

export default Hero;