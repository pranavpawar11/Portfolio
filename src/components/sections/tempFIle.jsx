import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, Calendar, Tag, FileCode } from 'lucide-react';

const categoryFilters = ["All", "Frontend", "Backend", "Database", "Mobile"];

// Enhanced projects data with images and links
const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio built with React and Tailwind CSS, featuring a responsive design and dark mode support.",
    longDescription: "This portfolio website showcases my skills and projects using modern web technologies. It features a responsive design that works across all devices, dark mode support, smooth animations, and accessible UI components.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://portfolio-example.com",
    githubUrl: "https://github.com/username/portfolio",
    tags: ["Frontend"],
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    date: "January 2024"
  },
  {
    id: 2,
    title: "RESTful API with Node.js",
    description: "A secure and scalable backend API for a web application with JWT authentication.",
    longDescription: "This backend API provides a robust foundation for web applications. It includes JWT authentication, role-based access control, input validation, comprehensive error handling, and is designed with scalability in mind.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://api-docs-example.com",
    githubUrl: "https://github.com/username/rest-api",
    tags: ["Backend"],
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    date: "March 2024"
  },
  {
    id: 3,
    title: "E-commerce Database",
    description: "Designed a relational database schema for an online store with optimization for high traffic.",
    longDescription: "This database design provides a comprehensive solution for e-commerce platforms. It includes schemas for products, categories, user accounts, orders, payments, reviews, and inventory management, all optimized for high-volume transactions.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://dbdiagram.io/example",
    githubUrl: "https://github.com/username/ecommerce-db",
    tags: ["Database"],
    tech: ["PostgreSQL", "SQL", "Database Design", "Normalization"],
    date: "April 2024"
  },
  {
    id: 4,
    title: "Mobile Expense Tracker",
    description: "React Native app to track daily expenses with charts and budget planning features.",
    longDescription: "This cross-platform mobile application helps users manage their finances effectively. It features expense categorization, budget setting, visual reports, recurring expense tracking, and data export capabilities.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://expo.dev/@username/expense-tracker",
    githubUrl: "https://github.com/username/expense-tracker",
    tags: ["Mobile"],
    tech: ["React Native", "Expo", "Firebase", "Victory Charts"],
    date: "June 2024"
  },
];

// Enhanced Project Card Component
const ProjectCard = ({ project, setOpenModal }) => {
  const cardVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="overflow-hidden rounded-xl bg-white dark:bg-dark-card shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Project Image with overlay gradient */}
      <div className="relative overflow-hidden" onClick={() => setOpenModal(project)}>
        <div className="h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <span className="text-white p-4 font-medium">View Details</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-2 text-light-text dark:text-dark-text">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex-1">{project.description}</p>
        
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-100 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setOpenModal(project)}
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
          >
            <Code size={16} /> Details
          </button>
          
          <div className="flex gap-2">
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="GitHub Repository"
              >
                <FileCode size={18} className="text-gray-700 dark:text-gray-300" />
              </a>
            )}
            
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink size={18} className="text-gray-700 dark:text-gray-300" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-dark-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Project image */}
        <div className="w-full h-64 md:h-80 relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-primary-500/80 text-white rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Project details */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About this project</h3>
            <p className="text-gray-700 dark:text-gray-300">{project.longDescription}</p>
          </div>

          {/* Tech stack */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Technologies used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary-600 dark:text-primary-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{project.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-primary-600 dark:text-primary-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{project.tags.join(', ')}</span>
            </div>
          </div>

          {/* Video section - optional */}
          {project.videoUrl && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Demo Video</h3>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <iframe 
                  src={project.videoUrl} 
                  title={`${project.title} demo video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
              >
                <FileCode size={18} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openModal, setOpenModal] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Filter projects based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projectsData);
    } else {
      const filtered = projectsData.filter(project => 
        project.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
      setFilteredProjects(filtered);
    }
  }, [selectedCategory]);
  
  // Handle modal close
  const closeModal = () => {
    setOpenModal(null);
  };

  // Animation variants for staggered list
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section id="projects" className="py-16 bg-light-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">My Projects</h2>
        
        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categoryFilters.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-light-text dark:text-dark-text hover:bg-primary-100 dark:hover:bg-primary-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard 
                  project={project}
                  setOpenModal={setOpenModal}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </motion.div>
        
        {/* Project Modal */}
        <AnimatePresence>
          {openModal && (
            <ProjectModal 
              project={openModal}
              isOpen={Boolean(openModal)}
              onClose={closeModal}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;