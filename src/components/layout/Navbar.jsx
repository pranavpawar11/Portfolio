import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import ThemeToggle from '../ui/ThemeToggle';

const NavItem = ({ to, label, mobile = false, setMobileMenuOpen }) => {
  const handleClick = () => {
    if (mobile && setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <ScrollLink
      to={to}
      spy={true}
      smooth={true}
      offset={-60}
      duration={800}
      onClick={handleClick}
      activeClass="text-primary-600 dark:text-primary-400" // Active link color
      className={`
        group
        ${mobile 
          ? 'block py-3 text-lg border-b border-gray-100 dark:border-gray-800' 
          : 'relative px-3 py-2'
        }
        text-light-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-pointer
      `}
    >
      {label}
      {/* Only for desktop, underline animation on hover */}
      {!mobile && (
        <span className="absolute left-0 bottom-0 h-0.5 bg-primary-600 dark:bg-primary-400 w-0 group-hover:w-full transition-all duration-300 origin-left"></span>
      )}
    </ScrollLink>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const navItems = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'education', label: 'Education' },
    { to: 'skills', label: 'Skills' },
    { to: 'projects', label: 'Projects' },
    { to: 'experience', label: 'Experience' },
    // { to: 'certifications', label: 'Certifications' },
    { to: 'contact', label: 'Contact' },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled 
          ? 'py-3 bg-white/80 dark:bg-dark-background/80 backdrop-blur-md shadow-md' 
          : 'py-5 bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <ScrollLink
          to="home"
          smooth={true}
          duration={800}
          className="text-2xl font-bold text-light-text dark:text-dark-text cursor-pointer flex items-center"
        >
          <span className="text-primary-600 dark:text-primary-400 mr-1">&lt;</span>
          <span>Pranav</span>
          <span className="text-primary-600 dark:text-primary-400 ml-1">/&gt;</span>
        </ScrollLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavItem key={item.to} to={item.to} label={item.label} />
          ))}
          
          {/* Theme Toggle */}
          <div className="ml-6">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle className="mr-4" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-light-text dark:text-dark-text focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden origin-top transform transition-transform duration-300
          ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
          absolute top-full left-0 w-full bg-white dark:bg-dark-card shadow-lg z-40
        `}
      >
        <div className="px-4 py-2">
          {navItems.map((item) => (
            <NavItem 
              key={item.to} 
              to={item.to} 
              label={item.label} 
              mobile={true}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
