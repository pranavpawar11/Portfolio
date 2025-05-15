/**
 * Animation utility functions for scroll animations
 */

// Initialize intersection observer to detect elements in viewport
export const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // If this element has staggered children, add animated class
          if (entry.target.classList.contains('stagger-children')) {
            entry.target.classList.add('animated');
          }
          
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.2,  // Trigger when 20% of element is visible
      rootMargin: '0px 0px -100px 0px' // Trigger slightly before element enters viewport
    });
    
    // Observe all elements with animation class
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    return observer;
  };
  
  // Parallax effect for background elements
  export const initParallaxEffect = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.2;
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Return cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
  };
  
  // Add a simple fade-in animation to elements
  export const fadeInElement = (element, delay = 0, duration = 500) => {
    if (!element) return;
    
    element.style.opacity = 0;
    element.style.transition = `opacity ${duration}ms ease ${delay}ms`;
    
    setTimeout(() => {
      element.style.opacity = 1;
    }, 50);
  };