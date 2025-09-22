// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTypewriter();
    initNavigation();
    initTabs();
    initProjectFilter();
    initSeeMorePhotos();
    initScrollEffects();
    initMobileMenu();
});

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const texts = [
        'Programmer • Video Editor • Photographer',
        'AI & Machine Learning Enthusiast',
        'Creative Visual Storyteller',
        'Digital Innovation Architect'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    let deleteSpeed = 50;
    let pauseTime = 2000;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting characters
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = deleteSpeed;
        } else {
            // Typing characters
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = Math.random() * 150 + 50; // Vary typing speed for realism
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of sentence
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before starting new text
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start the typewriter effect
    typeWriter();
}

// Navigation Functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Active navigation highlight
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Tabbed Interface
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
            
            // Add subtle animation effect
            const targetPaneElement = document.getElementById(targetTab);
            if (targetPaneElement) {
                targetPaneElement.style.transform = 'translateY(20px)';
                targetPaneElement.style.opacity = '0';
                
                setTimeout(() => {
                    targetPaneElement.style.transform = 'translateY(0)';
                    targetPaneElement.style.opacity = '1';
                }, 50);
            }
        });
    });
}

// Project Filtering (Updated for Programming Section)
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            const parentSection = this.closest('section');
            const cardsInSection = parentSection.querySelectorAll('.project-card');
            const buttonsInSection = parentSection.querySelectorAll('.filter-btn');
            
            // Remove active class from all filter buttons in this section
            buttonsInSection.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects in this section only
            cardsInSection.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Photography "See More" functionality
function initSeeMorePhotos() {
    const seeMoreBtn = document.querySelector('.see-more-btn');
    
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function() {
            // This would typically open a modal or navigate to a full gallery
            // For now, we'll show an alert
            alert('This would open a full gallery with all photos. You can integrate this with a lightbox library or modal for a better experience.');
            
            // Example of what you might do:
            // - Open a modal with more photos
            // - Navigate to a dedicated gallery page
            // - Load more photos dynamically
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .project-card, .work-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Smooth reveal animations for skills
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-list li');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });
}

// Enhanced hover effects for project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Parallax effect for landing section
function initParallaxEffect() {
    const landing = document.querySelector('.landing');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = scrolled * 0.5;
        
        if (landing) {
            landing.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    });
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
        
        // Arrow keys for tab navigation
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.tab-btn.active');
            const allTabs = Array.from(document.querySelectorAll('.tab-btn'));
            const currentIndex = allTabs.indexOf(activeTab);
            
            let nextIndex;
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
            } else {
                nextIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            if (allTabs[nextIndex]) {
                allTabs[nextIndex].click();
                allTabs[nextIndex].focus();
            }
        }
    });
}

// Performance optimization
function initPerformanceOptimizations() {
    // Lazy loading for images when added
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Debounced scroll handler
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    };
}

// Theme toggle functionality (bonus feature)
function initThemeToggle() {
    // Could be extended to add a light theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSkillAnimations();
    initProjectCardEffects();
    initParallaxEffect();
    initKeyboardNavigation();
    initPerformanceOptimizations();
    initThemeToggle();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential external use
window.portfolioUtils = {
    closeMobileMenu,
    initTypewriter,
    debounce,
    throttle
};