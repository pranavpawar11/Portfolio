/**
 * Theme utility functions for dark/light mode
 */

// Get current theme from localStorage or system preference
export const getInitialTheme = () => {
    // Check if theme is stored in localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      
      // Check if user has dark mode preference
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (userPrefersDark) {
        return 'dark';
      }
    }
    
    // Default to light theme
    return 'light';
  };
  
  // Set theme in localStorage and apply classes to HTML element
  export const setTheme = (theme) => {
    const root = window.document.documentElement;
    
    // Remove previous theme class and add new one
    const removeTheme = theme === 'dark' ? 'light' : 'dark';
    root.classList.remove(removeTheme);
    root.classList.add(theme);
    
    // Store theme preference
    localStorage.setItem('theme', theme);
  };
  
  // Toggle between light and dark themes
  export const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    return newTheme;
  };