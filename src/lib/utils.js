// src/lib/utils.js

/**
 * Smooth scroll to a specific section with improved behavior
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {Object} options - Optional configuration
 * @param {number} options.offset - Offset from the top in pixels (default: 0)
 * @param {string} options.behavior - Scroll behavior (default: 'smooth')
 */
export const scrollToSection = (sectionId, options = {}) => {
  const { offset = 0, behavior = 'smooth' } = options
  
  // Add a small delay to ensure DOM is ready
  setTimeout(() => {
    const element = document.getElementById(sectionId)
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior
      })
    }
  }, 10)
}

/**
 * Format date to a readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format style ('short', 'medium', 'long')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const options = {
    short: { month: 'short', year: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' }
  }
  
  return dateObj.toLocaleDateString('en-US', options[format] || options.medium)
}

/**
 * Detect if device is touch-enabled
 * @returns {boolean} True if device has touch capabilities
 */
export const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0))
}

/**
 * Cleanly truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}