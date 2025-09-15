// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

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
    // FAQ Category switching
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqContents = document.querySelectorAll('.faq-category-content');
    
    faqCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories and contents
            faqCategories.forEach(cat => cat.classList.remove('active'));
            faqContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked category
            category.classList.add('active');
            
            // Show corresponding content
            const targetCategory = category.getAttribute('data-category');
            const targetContent = document.querySelector(`[data-category="${targetCategory}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // FAQ Item accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items in the same category
            const currentCategory = item.closest('.faq-category-content');
            const otherItems = currentCategory.querySelectorAll('.faq-item');
            
            otherItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
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

console.log('HAMKOR Landing Page loaded successfully! 🚀');
