import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  ExternalLink,
  Calendar,
  Tag,
  FileCode,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import portfolio1 from "../../assets/images/portfolio-1.png";
import portfolio2 from "../../assets/images/portfolio-2.png";
import portfolio3 from "../../assets/images/portfolio-3.png";
import portfolio4 from "../../assets/images/portfolio-4.png";

import cashflow1 from "../../assets/images/cashflow-1.png";
import cashflow2 from "../../assets/images/cashflow-2.png";
import cashflow3 from "../../assets/images/cashflow-3.png";
import cashflow4 from "../../assets/images/cashflow-4.png";

import storeitem1 from "../../assets/images/storeitem-1.png";
import storeitem2 from "../../assets/images/storeitem-2.png";
import storeitem3 from "../../assets/images/storeitem-3.png";
import storeitem4 from "../../assets/images/storeitem-4.png";

import ipl1 from "../../assets/images/ipl-1.png";
import ipl2 from "../../assets/images/ipl-2.png";
import ipl3 from "../../assets/images/ipl-3.png";
import ipl4 from "../../assets/images/ipl-4.png";

import studentmart1 from "../../assets/images/studentmart-1.png";
import studentmart2 from "../../assets/images/studentmart-2.png";
import studentmart3 from "../../assets/images/studentmart-3.png";
import studentmart4 from "../../assets/images/studentmart-4.png";

import chatapp1 from "../../assets/images/chatapp-1.png";
import chatapp2 from "../../assets/images/chatapp-2.png";
import chatapp3 from "../../assets/images/chatapp-3.png";
import chatapp4 from "../../assets/images/chatapp-4.png";

const categoryFilters = [
  "All",
  "Fullstack",
  "Frontend",
  "Backend",
  "Machine Learning",
  "Real-time",
];

// Enhanced projects data with multiple images
const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A modern personal portfolio built with React and Tailwind CSS, featuring responsive design and dark mode.",
    longDescription:
      "Designed to showcase my skills and projects with a clean, interactive UI. Includes smooth animations, responsive layouts, and customizable themes (light/dark mode). Built with React for dynamic rendering and Tailwind CSS for utility-first styling.",
    thumbnail: portfolio1,
    images: [portfolio1, portfolio2, portfolio3, portfolio4],
    // liveUrl: "#",
    githubUrl: "https://github.com/pranavpawar11/Portfolio", // Add your GitHub URL
    tags: ["Frontend"],
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    date: "2024",
  },
  {
    id: 2,
    title: "CashFlow - Expense Tracker",
    description:
      "Full-stack expense tracker with budget analytics and secure auth (MERN Stack).",
    longDescription:
      "A comprehensive financial management app supporting CRUD operations for transactions, budget tracking, and data visualization. Features JWT authentication, responsive UI, and MongoDB for scalable data storage.",
    thumbnail: cashflow1,
    images: [cashflow1, cashflow2, cashflow3, cashflow4],
    // liveUrl: "#",
    githubUrl: "https://github.com/pranavpawar11/Cashflow", // From your resume
    tags: ["Fullstack", "Backend"],
    tech: ["MERN Stack", "React", "Node.js", "MongoDB"],
    date: "2024",
  },
  {
    id: 3,
    title: "IPL Auction App",
    description:
      "Real-time auction platform for IPL player bidding with role-based access.",
    longDescription:
      "Developed for college events, this app simulates IPL auctions with live bidding, team budgets, and admin controls. Features WebSockets for real-time updates, player statistics, and squad balancing tools.",
    thumbnail: ipl1,
    images: [ipl1, ipl2, ipl3, ipl4],
    // liveUrl: "#",
    githubUrl: "https://github.com/pranavpawar11/AuctionApp", // Add GitHub URL
    tags: ["Frontend", "Real-time"],
    tech: ["React", "Node.js", "Express.js", "WebSockets", "MongoDB"],
    date: "2024",
  },
  {
    id: 4,
    title: "StoreItem - Inventory System",
    description:
      "Inventory management with ML-driven stock predictions (MERN + Python).",
    longDescription:
      "Integrated FastAPI with Python ML models to forecast stock demand. Includes RESTful APIs, pagination, and MongoDB for product/sales data. Designed for scalability and dynamic content delivery.",
    thumbnail: storeitem1,
    images: [storeitem1, storeitem2, storeitem3, storeitem4],
    // liveUrl: "#",
    githubUrl: "https://github.com/pranavpawar11/StoreItem", // From your resume
    tags: ["Fullstack", "Machine Learning"],
    tech: ["MERN", "FastAPI", "Python", "MongoDB"],
    date: "2024",
  },
  {
    id: 5,
    title: "StudentMart - E-commerce Platform",
    description:
      "PHP/MySQL platform for stationery trading with user/seller panels.",
    longDescription:
      "A multi-role web app for buying/selling stationery. Includes product listings, order management, and secure transactions using PHP/MySQL. Designed with mobile-first responsive UI.",
    thumbnail: studentmart1,
    images: [studentmart1, studentmart2, studentmart3, studentmart4],
    // liveUrl: "#",
    githubUrl: "https://github.com/pranavpawar11/StudentMart", // From your resume
    tags: ["Fullstack", "Backend"],
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    date: "2023",
  },
  {
    id: 6,
    title: "ChatApp",
    description:
      "Full-stack MERN ChatApp with real-time messaging, group/1-1 chat, file sharing, and dark mode.",
    longDescription:
      "A modern, responsive chat application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Tailwind CSS and Socket.IO. It supports real-time messaging, typing indicators, group chats, one-to-one private chats, file sharing, and user profile management. Designed with a responsive mobile-first layout and a toggleable dark mode for enhanced user experience.",
    thumbnail: chatapp1,
    images: [chatapp1, chatapp2, chatapp3, chatapp4],
    liveUrl: "https://teal-lily-a2c655.netlify.app/",
    githubUrl: "https://github.com/pranavpawar11/ChatApp",
    tags: ["Fullstack", "Real-Time"],
    tech: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Socket.IO",
      "Tailwind CSS",
    ],
    date: "2025",
  },
];

// Image Slideshow Component for Modal
const ImageSlideshow = ({ images, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNextImage = (e) => {
    e?.stopPropagation();
    setDirection(1);
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const goToPrevImage = (e) => {
    e?.stopPropagation();
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-t-xl">
      {/* Images with animations */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`${project.title} screenshot ${currentImageIndex + 1}`}
          className="absolute w-95 h-95 object-cover z-0 p-2"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        />
      </AnimatePresence>

      {/* Gradient overlay - now below the text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

      {/* Project title and date - now above gradient */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-2"
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          {project.title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 text-white text-sm font-medium"
          style={{
            textShadow: "0 1px 3px rgba(0,0,0,0.8)",
          }}
        >
          <Calendar size={16} />
          <span>{project.date}</span>
        </motion.div>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm z-30 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm z-30 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(index > currentImageIndex ? 1 : -1);
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImageIndex === index
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

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
      className="overflow-hidden rounded-xl bg-white dark:bg-dark-card shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Project Thumbnail with overlay gradient */}
      <div
        className="relative overflow-hidden"
        onClick={() => setOpenModal(project)}
      >
        <div className="h-48 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <span className="text-white p-4 font-medium">View Details</span>
        </div>

        {/* Image count badge */}
        {project.images && project.images.length > 1 && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {project.images.length}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-2 text-light-text dark:text-dark-text">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-100 rounded-full"
            >
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
                <FileCode
                  size={18}
                  className="text-gray-700 dark:text-gray-300"
                />
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
                <ExternalLink
                  size={18}
                  className="text-gray-700 dark:text-gray-300"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Project Modal Component with Image Slideshow
const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-dark-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl my-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-white dark:hover:bg-black/70 shadow-md"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image slideshow with title on top and gradient underneath */}
        <ImageSlideshow
          images={project.images || [project.thumbnail]}
          project={project}
        />

        {/* Project details */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About this project</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {project.longDescription}
            </p>
          </div>

          {/* Tech stack */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Technologies used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-200 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

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
      const filtered = projectsData.filter((project) =>
        project.tags.some((tag) =>
          tag.toLowerCase().includes(selectedCategory.toLowerCase())
        )
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      id="projects"
      className="py-8 bg-light-background dark:bg-dark-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">My Projects</h2>
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Here are some of my recent projects. Click on them to learn more.
          </p>
        </div> */}

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
            filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} setOpenModal={setOpenModal} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">
                No projects found in this category.
              </p>
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
