// ========================
// DASHBOARD INTERACTIONS
// ========================

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll animations on load
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.stat-card, .project-card, .template-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease-out';
            observer.observe(el);
        });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            console.log('Searching for:', query);
            // TODO: Implement search functionality
        });
    }
    
    // Quick action buttons
    const quickButtons = document.querySelectorAll('.quick-btn');
    quickButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const buttonText = btn.querySelector('span').textContent;
            console.log('Quick action clicked:', buttonText);
            
            // Add click effect
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
            
            // TODO: Navigate to appropriate page
            if (buttonText.includes('IA')) {
                // Navigate to AI generator
            } else if (buttonText.includes('Diseño')) {
                // Navigate to design editor
            } else if (buttonText.includes('Plantillas')) {
                // Navigate to templates
            }
        });
    });
    
    // Notification button
    const notificationBtn = document.querySelector('.icon-btn.notification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            console.log('Notifications clicked');
            // TODO: Show notifications panel
        });
    }
    
    // Project cards interactions
    const projectCards = document.querySelectorAll('.project-card:not(.new-project)');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectName = card.querySelector('h3').textContent;
            console.log('Opening project:', projectName);
            // TODO: Navigate to project editor
        });
    });
    
    // New project button
    const newProjectCard = document.querySelector('.new-project');
    if (newProjectCard) {
        newProjectCard.addEventListener('click', () => {
            console.log('Creating new project');
            // TODO: Show new project modal or navigate to editor
        });
    }
    
    // Template cards
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            const templateName = card.querySelector('strong').textContent;
            console.log('Template selected:', templateName);
            // TODO: Open template in editor
        });
    });
    
    // Sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active to clicked
            item.classList.add('active');
            
            const navText = item.querySelector('span').textContent;
            console.log('Navigation clicked:', navText);
            
            // TODO: Navigate to appropriate section
        });
    });
    
    // Upgrade button
    const upgradeBtn = document.querySelector('.upgrade-btn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', () => {
            console.log('Upgrade clicked');
            // TODO: Navigate to pricing page
            window.location.href = 'index.html#pricing';
        });
    }
    
    // Stats card hover effects
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--color-purple)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--color-border)';
        });
    });
    
    // View all links
    const viewAllLinks = document.querySelectorAll('.view-all');
    viewAllLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.closest('section');
            const sectionTitle = section.querySelector('h2').textContent;
            console.log('View all clicked for:', sectionTitle);
            // TODO: Navigate to full section view
        });
    });
    
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple to all buttons
    const allButtons = document.querySelectorAll('button, .nav-item');
    allButtons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
    
    // Greeting based on time
    const updateGreeting = () => {
        const hour = new Date().getHours();
        const welcomeH1 = document.querySelector('.welcome-text h1');
        
        if (welcomeH1) {
            let greeting = '¡Bienvenido de vuelta';
            
            if (hour < 12) {
                greeting = '¡Buenos días';
            } else if (hour < 18) {
                greeting = '¡Buenas tardes';
            } else {
                greeting = '¡Buenas noches';
            }
            
            welcomeH1.textContent = `${greeting}, Eros! ✨`;
        }
    };
    
    updateGreeting();
    
    // Check auth status (integrate with Supabase later)
    const checkAuth = async () => {
        // TODO: Check if user is logged in
        // If not, redirect to login
        // const session = await window.authFunctions?.getCurrentSession();
        // if (!session) {
        //     window.location.href = 'login.html';
        // }
    };
    
    checkAuth();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);