// Mobile Navigation Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Debug: Check if elements exist
    console.log('Hamburger element:', hamburger);
    console.log('Nav menu element:', navMenu);

    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', (e) => {
            console.log('Hamburger clicked!');
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Hamburger or nav menu not found!');
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Also try to initialize after a short delay
setTimeout(initMobileMenu, 100);

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click event listeners to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
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

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.stat-card, .advantage-item, .feature-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Add data attributes and observe counters
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-card h3');
    counters.forEach(counter => {
        const text = counter.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        if (number) {
            counter.setAttribute('data-target', number);
            counter.textContent = '0';
            counterObserver.observe(counter);
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Enhanced Hero Animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize chart animations
    initChartAnimations();
    
    // Initialize floating cards
    initFloatingCards();
});

function initHeroAnimations() {
    // Animate hero elements with stagger
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
}

function initCounterAnimations() {
    const counters = document.querySelectorAll('.hero-stat-value[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target, 2000);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function initChartAnimations() {
    const chartLines = document.querySelectorAll('.chart-line');
    
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chartLines.forEach((line, index) => {
                    const percentage = line.getAttribute('data-percentage');
                    setTimeout(() => {
                        line.style.height = percentage + '%';
                    }, index * 200);
                });
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        chartObserver.observe(chartContainer);
    }
}

function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            card.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.05)';
            card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Enhanced counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Chart animation
function animateChart() {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0%';
        bar.style.transition = 'height 0.8s ease';
        
        setTimeout(() => {
            bar.style.height = height;
        }, index * 200);
    });
}

// Animate chart when investment section comes into view
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateChart();
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const chartSection = document.querySelector('.roi-chart');
if (chartSection) {
    chartObserver.observe(chartSection);
}

// Add hover effects to floating cards
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click tracking for analytics
function trackEvent(eventName, properties = {}) {
    // This would integrate with your analytics service
    console.log('Event tracked:', eventName, properties);
}

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            section: e.target.closest('section')?.id || 'unknown'
        });
    });
});

// Track form interactions
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', () => {
        trackEvent('form_field_focus', {
            field_name: field.name || field.placeholder,
            field_type: field.type
        });
    });
});

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-section');
    revealObserver.observe(section);
});

// Contact cards animation
document.addEventListener('DOMContentLoaded', () => {
    const contactCards = document.querySelectorAll('.contact-card');
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        contactObserver.observe(card);
    });
});

// Add ripple effect to contact buttons
document.addEventListener('DOMContentLoaded', () => {
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(rippleStyle);

// Enhanced scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px) rotateY(${scrolled * 0.01}deg)`;
    }
    
    // Parallax effect for floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.05);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mouse movement effects
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) / 50;
    const moveY = (y - centerY) / 50;
    
    // Move gradient orbs
    const orbs = document.querySelectorAll('.hero-gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.3);
        orb.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
    
    // Move dashboard mockup
    const dashboard = document.querySelector('.dashboard-mockup');
    if (dashboard) {
        dashboard.style.transform = `perspective(1000px) rotateY(${-15 + moveX * 0.5}deg) rotateX(${10 + moveY * 0.5}deg)`;
    }
});

// Add smooth scroll to scroll indicator
document.addEventListener('DOMContentLoaded', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Add typing effect to hero title
function initTypingEffect() {
    const titleElement = document.querySelector('.gradient-text');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    setTimeout(initTypingEffect, 500);
});

// Global animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize card hover effects
    initCardEffects();
    
    // Initialize button effects
    initButtonEffects();
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // Observe cards
    const cards = document.querySelectorAll('.card, .advantage-card, .point');
    cards.forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });
}

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background, .about::before, .investment::before');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function initCardEffects() {
    const cards = document.querySelectorAll('.card, .advantage-card, .point');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .reveal-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .reveal-section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy load images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #6366f1';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Interactive map functionality
document.addEventListener('DOMContentLoaded', () => {
    const cityDots = document.querySelectorAll('.city-dot');
    
    cityDots.forEach(dot => {
        dot.addEventListener('mouseenter', (e) => {
            const city = e.target.getAttribute('data-city');
            showCityTooltip(e, city);
        });
        
        dot.addEventListener('mouseleave', () => {
            hideCityTooltip();
        });
        
        dot.addEventListener('click', (e) => {
            const city = e.target.getAttribute('data-city');
            showCityInfo(city);
        });
    });
});

function showCityTooltip(event, cityName) {
    const tooltip = document.createElement('div');
    tooltip.className = 'city-tooltip';
    tooltip.textContent = cityName;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--text-primary);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 600;
        pointer-events: none;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        transform: translate(-50%, -120%);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top + 'px';
}

function hideCityTooltip() {
    const tooltip = document.querySelector('.city-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function showCityInfo(cityName) {
    const cityInfo = {
        'Ташкент': 'Столица Узбекистана, крупнейший город страны с населением 2.5 млн человек',
        'Самарканд': 'Древний город, один из старейших городов мира, центр туризма',
        'Бухара': 'Исторический город с множеством архитектурных памятников',
        'Наманган': 'Крупный промышленный центр в Ферганской долине',
        'Нукус': 'Столица Каракалпакстана, важный культурный центр'
    };
    
    const info = cityInfo[cityName] || 'Город в Узбекистане';
    
    showNotification(`${cityName}: ${info}`, 'info');
}

// Add CSS for city tooltip
const style = document.createElement('style');
style.textContent = `
    .city-tooltip {
        animation: fadeInUp 0.3s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translate(-50%, -100%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -120%);
        }
    }
`;
document.head.appendChild(style);

// FAQ Functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing FAQ...');
    initFAQ();
});

// Add FAQ to navigation
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !navMenu.querySelector('a[href="#faq"]')) {
        const faqLink = document.createElement('a');
        faqLink.href = '#faq';
        faqLink.className = 'nav-link';
        faqLink.textContent = 'FAQ';
        
        // Insert before the last link (Contact)
        const contactLink = navMenu.querySelector('a[href="#contact"]');
        if (contactLink) {
            navMenu.insertBefore(faqLink, contactLink);
        } else {
            navMenu.appendChild(faqLink);
        }
    }
});

// Pricing Tabs Functionality
document.addEventListener('DOMContentLoaded', () => {
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingContents = document.querySelectorAll('.pricing-content');
    
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            pricingTabs.forEach(t => t.classList.remove('active'));
            pricingContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const targetTab = tab.getAttribute('data-tab');
            const targetContent = document.querySelector(`[data-tab="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Pricing button interactions
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.pricing-card');
            const planName = card.querySelector('h3').textContent;
            
            // Track pricing button click
            trackEvent('pricing_button_click', {
                plan_name: planName,
                button_text: e.target.textContent.trim()
            });
            
            // Show notification or redirect
            if (e.target.textContent.includes('Связаться')) {
                scrollToSection('contact');
            } else {
                showNotification(`Вы выбрали план "${planName}". Мы свяжемся с вами для уточнения деталей.`, 'success');
            }
        });
    });
});

// FAQ Functionality
function initFAQ() {
    console.log('Initializing FAQ...');
    
    // Check if FAQ section exists
    const faqSection = document.querySelector('#faq');
    if (!faqSection) {
        console.log('FAQ section not found, skipping initialization');
        return;
    }
    
    // FAQ Category Switching
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqContents = document.querySelectorAll('.faq-category-content');
    
    console.log('Found FAQ categories:', faqCategories.length);
    console.log('Found FAQ contents:', faqContents.length);
    
    faqCategories.forEach(category => {
        category.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Category clicked:', category.getAttribute('data-category'));
            
            // Remove active class from all categories
            faqCategories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            category.classList.add('active');
            
            // Hide all content
            faqContents.forEach(content => content.classList.remove('active'));
            // Show selected content
            const targetCategory = category.getAttribute('data-category');
            const targetContent = document.querySelector(`.faq-category-content[data-category="${targetCategory}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Showing content for category:', targetCategory);
            } else {
                console.error('Target content not found for category:', targetCategory);
            }
        });
    });
    
    // FAQ Item Toggle - Simplified version
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found FAQ items:', faqItems.length);
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('FAQ item clicked:', index);
                
                // Toggle current item
                item.classList.toggle('active');
                console.log('Item toggled, active:', item.classList.contains('active'));
            });
        } else {
            console.error('Question not found for FAQ item:', index);
        }
    });
}

// Also try to initialize after a short delay in case DOM is not ready
setTimeout(() => {
    console.log('Delayed FAQ initialization...');
    initFAQ();
}, 500);

// Contact functions
function openTelegram() {
    // Track the event
    trackEvent('contact_telegram_click', {
        contact_method: 'telegram',
        username: '@yakubiam'
    });
    
    // Open Telegram
    window.open('https://t.me/yakubiam', '_blank');
    
    // Show notification
    showNotification('Открываю Telegram...', 'info');
}

function openWhatsApp() {
    // Track the event
    trackEvent('contact_whatsapp_click', {
        contact_method: 'whatsapp',
        phone: '+7 996 125 56 76'
    });
    
    // Open WhatsApp
    window.open('https://wa.me/79961255676', '_blank');
    
    // Show notification
    showNotification('Открываю WhatsApp...', 'info');
}

function copyToClipboard(text) {
    // Track the event
    trackEvent('contact_email_copy', {
        contact_method: 'email',
        email: text
    });
    
    // Copy to clipboard
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Email скопирован в буфер обмена!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Email скопирован в буфер обмена!', 'success');
        } else {
            showNotification('Не удалось скопировать email', 'error');
        }
    } catch (err) {
        showNotification('Не удалось скопировать email', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Dashboard sidebar interaction
document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.dashboard-sidebar .sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            sidebarItems.forEach(si => si.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Track interaction
            const itemText = item.querySelector('span').textContent;
            trackEvent('dashboard_sidebar_click', {
                item: itemText
            });
        });
    });
    
    // Dashboard stats animation
    const dashboardStats = document.querySelectorAll('.dashboard-stats .stat-card');
    dashboardStats.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1000 + index * 200);
    });
});

console.log('HAMKOR Landing Page loaded successfully! 🚀');
