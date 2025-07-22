// Smooth scroll behavior for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for feature cards and testimonials
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('testimonials-grid')) {
                    const cards = entry.target.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.features-title, .features-grid, .testimonials-title, .testimonials-grid, .feature-card, .testimonial-card');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.floating-card');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Dynamic typing effect for hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        // Start typing effect after a brief delay
        setTimeout(typeWriter, 500);
    }

    // Add loading animation
    document.body.classList.add('loaded');

    // Feature card hover sound effect (optional)
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale animation
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Testimonial card rotation effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
});

// Add CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #ffffff, #cccccc);
        z-index: 9999;
        transition: width 0.25s ease;
    }

    body.loaded {
        animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .nav {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-primary,
    .btn-secondary {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .feature-card,
    .testimonial-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-element,
        .feature-card,
        .testimonial-card,
        .btn-primary,
        .btn-secondary {
            transition: none;
        }
        
        .floating-card {
            animation: none;
        }
    }
`;
document.head.appendChild(style);