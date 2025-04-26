/**
 * Professional Profile Website JavaScript
 * Implements interactivity for the profile website
 */

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollAnimations();
    initSmoothScrolling();
    initSkillsAnimation();
    initContactFormValidation();
});

/**
 * Mobile Menu Functionality
 * Toggles mobile menu visibility and handles hamburger icon animation
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Check if elements exist to prevent errors
    if (!hamburger || !navMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/**
 * Scroll Animations
 * Reveals elements with fade/slide animations as they come into view
 */
function initScrollAnimations() {
    // Select all elements with reveal classes
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-bottom');

    // Add reveal class to sections for animation
    document.querySelectorAll('section').forEach(section => {
        if (!section.classList.contains('hero')) {
            section.classList.add('reveal');
        }
    });

    // Function to check if elements are in viewport and animate them
    function checkReveals() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    // Initial check for elements in view
    checkReveals();
    
    // Check for new elements to reveal on scroll
    window.addEventListener('scroll', checkReveals);
}

/**
 * Smooth Scrolling
 * Implements smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Use native smooth scroll if supported
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Skills Bar Animation
 * Animates skill bars when they come into view
 */
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        const windowHeight = window.innerHeight;
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            
            if (barTop < windowHeight - 100) {
                // Get width from inline style or data attribute
                const width = bar.style.width;
                
                // Ensure it has no width initially (for animation)
                bar.style.width = '0';
                
                // Trigger animation after a small delay
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

/**
 * Contact Form Validation
 * Validates form input before submission
 */
function initContactFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form inputs
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        
        // Validation flags
        let isValid = true;
        
        // Validate name (required)
        if (nameInput && !nameInput.value.trim()) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        } else if (nameInput) {
            removeError(nameInput);
        }
        
        // Validate email (required and format)
        if (emailInput) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(emailInput);
            }
        }
        
        // Validate message (required)
        if (messageInput && !messageInput.value.trim()) {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        } else if (messageInput) {
            removeError(messageInput);
        }
        
        // If form is valid, you would normally submit it
        if (isValid) {
            showSuccessMessage(contactForm);
            contactForm.reset();
            
            // In a real application, you would submit the form or use AJAX
            // contactForm.submit();
        }
    });
    
    // Helper function to show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        
        // Remove any existing error message first
        if (existingError) {
            existingError.remove();
        }
        
        // Create and add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
        
        // Add red border to input
        input.style.borderColor = '#dc3545';
        
        // Add error message after input
        formGroup.appendChild(errorElement);
    }
    
    // Helper function to remove error message
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        // Reset input style
        input.style.borderColor = '';
    }
    
    // Helper function to show success message
    function showSuccessMessage(form) {
        // Remove any existing success message
        const existingSuccess = form.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Create success message
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = 'Your message has been sent successfully!';
        successElement.style.backgroundColor = '#d4edda';
        successElement.style.color = '#155724';
        successElement.style.padding = '10px';
        successElement.style.borderRadius = '5px';
        successElement.style.marginTop = '15px';
        
        // Add success message to form
        form.appendChild(successElement);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }
}

/**
 * Header Scroll Effect
 * Changes header appearance on scroll
 */
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.height = '4.5rem';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.height = '5rem';
        }
    }
});

/**
 * Theme Toggle (for future implementation)
 * Can be used to toggle between light and dark mode
 */
function initThemeToggle() {
    // This function can be implemented in the future
    // to add a theme toggle button to switch between
    // light and dark modes manually
    
    // Example implementation:
    // const themeToggle = document.querySelector('.theme-toggle');
    // if (themeToggle) {
    //     themeToggle.addEventListener('click', () => {
    //         document.body.classList.toggle('dark-theme');
    //     });
    // }
}

