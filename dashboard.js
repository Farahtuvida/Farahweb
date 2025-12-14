// ========================
// ENHANCED DASHBOARD INTERACTIONS
// ========================

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================
    // THEME TOGGLE
    // ========================
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle?.querySelector('.sun-icon');
    const moonIcon = themeToggle?.querySelector('.moon-icon');
    
    // Check saved theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
    
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        sunIcon.style.display = isLight ? 'none' : 'block';
        moonIcon.style.display = isLight ? 'block' : 'none';
        
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    
    // ========================
    // USER DROPDOWN MENU
    // ========================
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    userProfileBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        userProfileBtn.classList.toggle('active');
        userDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        userProfileBtn?.classList.remove('active');
        userDropdown?.classList.remove('active');
    });
    
    // Logout functionality
    document.getElementById('logoutBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            // If using Supabase
            if (window.authFunctions) {
                await window.authFunctions.signOut();
            } else {
                // Redirect to login
                window.location.href = 'login.html';
            }
        }
    });
    
    // ========================
    // NOTIFICATIONS PANEL
    // ========================
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationsPanel = document.getElementById('notificationsPanel');
    
    notificationBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsPanel.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!notificationsPanel?.contains(e.target) && !notificationBtn?.contains(e.target)) {
            notificationsPanel?.classList.remove('active');
        }
    });
    
    // Mark all as read
    document.querySelector('.mark-read-btn')?.addEventListener('click', () => {
        document.querySelectorAll('.notification-item').forEach(item => {
            item.classList.remove('unread');
        });
    });
    
    // ========================
    // MOBILE HAMBURGER MENU
    // ========================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const hamburgerIcon = mobileMenuBtn?.querySelector('.hamburger-icon');
    const closeIcon = mobileMenuBtn?.querySelector('.close-icon');
    
    mobileMenuBtn?.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-active');
        const isActive = sidebar.classList.contains('mobile-active');
        
        hamburgerIcon.style.display = isActive ? 'none' : 'block';
        closeIcon.style.display = isActive ? 'block' : 'none';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            sidebar?.classList.remove('mobile-active');
            hamburgerIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
    
    // ========================
    // VIEW MODE TOGGLE
    // ========================
    const viewButtons = document.querySelectorAll('.view-btn');
    const projectsContainer = document.getElementById('projectsContainer');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (view === 'list') {
                projectsContainer?.classList.add('list-view');
            } else {
                projectsContainer?.classList.remove('list-view');
            }
        });
    });
    
    // ========================
    // FILTERS & SORTING
    // ========================
    const projectFilter = document.getElementById('projectFilter');
    const projectSort = document.getElementById('projectSort');
    
    projectFilter?.addEventListener('change', (e) => {
        console.log('Filter by:', e.target.value);
        // TODO: Implement filtering logic
        filterProjects(e.target.value);
    });
    
    projectSort?.addEventListener('change', (e) => {
        console.log('Sort by:', e.target.value);
        // TODO: Implement sorting logic
        sortProjects(e.target.value);
    });
    
    function filterProjects(filter) {
        // Placeholder for filter logic
        const projects = document.querySelectorAll('.project-card:not(.new-project)');
        projects.forEach(project => {
            // Show/hide based on filter
            project.style.display = 'block';
        });
    }
    
    function sortProjects(sortBy) {
        // Placeholder for sort logic
        console.log('Sorting projects by:', sortBy);
    }
    
    // ========================
    // NEW PROJECT MODAL
    // ========================
    const newProjectModal = document.getElementById('newProjectModal');
    const newProjectCards = document.querySelectorAll('.new-project, .create-btn, .create-icon');
    const closeModal = document.getElementById('closeModal');
    
    newProjectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            newProjectModal.classList.add('active');
        });
    });
    
    closeModal?.addEventListener('click', () => {
        newProjectModal.classList.remove('active');
    });
    
    newProjectModal?.addEventListener('click', (e) => {
        if (e.target === newProjectModal) {
            newProjectModal.classList.remove('active');
        }
    });
    
    // Project type selection
    document.querySelectorAll('.project-type-card').forEach(card => {
        card.addEventListener('click', () => {
            const type = card.querySelector('h3').textContent;
            console.log('Creating project type:', type);
            // TODO: Navigate to editor with selected type
        });
    });
    
    // Size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.textContent.split('\n')[0];
            console.log('Creating project with size:', size);
            // TODO: Navigate to editor with selected size
        });
    });
    
    // ========================
    // SEARCH FUNCTIONALITY
    // ========================
    const searchInput = document.querySelector('.search-bar input');
    let searchTimeout;
    
    searchInput?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase();
            console.log('Searching for:', query);
            performSearch(query);
        }, 300);
    });
    
    function performSearch(query) {
        if (!query) return;
        
        // Search in projects
        const projects = document.querySelectorAll('.project-card h3');
        projects.forEach(project => {
            const card = project.closest('.project-card');
            const matches = project.textContent.toLowerCase().includes(query);
            card.style.display = matches ? 'block' : 'none';
        });
        
        // Search in templates
        const templates = document.querySelectorAll('.template-card strong');
        templates.forEach(template => {
            const card = template.closest('.template-card');
            const matches = template.textContent.toLowerCase().includes(query);
            card.style.display = matches ? 'block' : 'none';
        });
    }
    
    // ========================
    // QUICK ACTION BUTTONS
    // ========================
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.querySelector('span').textContent;
            console.log('Quick action:', text);
            
            if (text.includes('IA')) {
                // TODO: Open AI generator
                console.log('Opening AI generator');
            } else if (text.includes('Diseño')) {
                newProjectModal?.classList.add('active');
            } else if (text.includes('Plantillas')) {
                // TODO: Navigate to templates
                console.log('Navigating to templates');
            }
            
            // Click effect
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = '', 150);
        });
    });
    
    // ========================
    // PROJECT CARDS
    // ========================
    document.querySelectorAll('.project-card:not(.new-project)').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('h3')?.textContent;
            console.log('Opening project:', name);
            // TODO: Navigate to editor
        });
    });
    
    // ========================
    // TEMPLATE CARDS
    // ========================
    document.querySelectorAll('.template-card, .trending-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('strong')?.textContent;
            console.log('Using template:', name);
            // TODO: Open template in editor
        });
    });
    
    // ========================
    // ACHIEVEMENTS
    // ========================
    document.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('click', () => {
            const achievement = card.querySelector('h4')?.textContent;
            const isLocked = card.classList.contains('locked');
            
            if (isLocked) {
                console.log('Achievement locked:', achievement);
                // TODO: Show progress modal
            } else {
                console.log('Achievement unlocked:', achievement);
                // TODO: Show achievement details
            }
        });
    });
    
    // ========================
    // NAVIGATION
    // ========================
    document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!item.classList.contains('create-btn')) {
                e.preventDefault();
                
                // Update active state
                const container = item.closest('.sidebar-nav, .bottom-nav');
                container?.querySelectorAll('.nav-item, .bottom-nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                item.classList.add('active');
                
                const navText = item.querySelector('span')?.textContent;
                console.log('Navigation:', navText);
                // TODO: Load appropriate section
            }
        });
    });
    
    // ========================
    // UPGRADE BUTTON
    // ========================
    document.querySelector('.upgrade-btn')?.addEventListener('click', () => {
        console.log('Upgrade clicked');
        window.location.href = 'index.html#pricing';
    });
    
    // ========================
    // ANIMATIONS ON SCROLL
    // ========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.stat-card, .project-card, .template-card, .trending-card, .achievement-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // ========================
    // DYNAMIC GREETING
    // ========================
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
    
    // ========================
    // RIPPLE EFFECT
    // ========================
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
        
        const oldRipple = button.querySelector('.ripple');
        if (oldRipple) oldRipple.remove();
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Add ripple to buttons
    document.querySelectorAll('button, .nav-item, .bottom-nav-item').forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.addEventListener('click', createRipple);
    });
    
    // ========================
    // LOAD PROJECTS DATA
    // ========================
    function loadProjects() {
        const projectsData = [
            { name: 'Brand Identity Design', time: 'hace 2 horas', type: 'designs', preview: 'preview-1' },
            { name: 'Instagram Stories Pack', time: 'ayer', type: 'designs', preview: 'preview-2' },
            { name: 'YouTube Thumbnail', time: 'hace 3 días', type: 'videos', preview: 'preview-3' }
        ];
        
        const container = document.getElementById('projectsContainer');
        if (!container) return;
        
        container.innerHTML = projectsData.map(project => `
            <div class="project-card" data-type="${project.type}">
                <div class="project-preview ${project.preview}">
                    <div class="project-overlay">
                        <button class="preview-btn">Ver Proyecto</button>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>Editado ${project.time}</p>
                </div>
            </div>
        `).join('') + `
            <div class="project-card new-project">
                <div class="project-preview new-preview">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M24 12V36M12 24H36" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                    <span>Nuevo Proyecto</span>
                </div>
            </div>
        `;
        
        // Re-attach event listeners
        container.querySelectorAll('.project-card:not(.new-project)').forEach(card => {
            card.addEventListener('click', () => {
                const name = card.querySelector('h3')?.textContent;
                console.log('Opening project:', name);
            });
        });
        
        container.querySelector('.new-project')?.addEventListener('click', () => {
            newProjectModal?.classList.add('active');
        });
    }
    
    loadProjects();
    
    // ========================
    // KEYBOARD SHORTCUTS
    // ========================
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput?.focus();
        }
        
        // Ctrl/Cmd + N for new project
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            newProjectModal?.classList.add('active');
        }
        
        // ESC to close modals
        if (e.key === 'Escape') {
            newProjectModal?.classList.remove('active');
            notificationsPanel?.classList.remove('active');
            userDropdown?.classList.remove('active');
        }
    });
    
    // ========================
    // CHECK AUTH (If using Supabase)
    // ========================
    const checkAuth = async () => {
        if (window.authFunctions) {
            const session = await window.authFunctions.getCurrentSession();
            if (!session) {
                window.location.href = 'login.html';
            }
        }
    };
    
    // Uncomment when Supabase is ready
    // checkAuth();
    
    console.log('✨ Dashboard loaded successfully!');
});

// Add ripple CSS
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

// ========================
// FASE 1: NUEVAS FUNCIONALIDADES
// ========================

// Collaborative Projects
document.querySelectorAll('.collab-card:not(.new-collab)').forEach(card => {
    card.addEventListener('click', () => {
        const projectName = card.querySelector('h3')?.textContent;
        console.log('Opening collaborative project:', projectName);
        // TODO: Open collaboration view
    });
});

document.querySelector('.new-collab')?.addEventListener('click', () => {
    console.log('Creating new collaboration');
    // TODO: Show invite collaboration modal
});

// Collections
document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => {
        const collectionName = card.querySelector('h3')?.textContent;
        console.log('Opening collection:', collectionName);
        // TODO: Open collection board
    });
});

document.querySelector('.create-collection-btn')?.addEventListener('click', () => {
    console.log('Creating new collection');
    // TODO: Show create collection modal
});

// Activity Feed Filters
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.textContent;
        console.log('Filter activity by:', filter);
        // TODO: Filter activity feed
    });
});

// Activity Items
document.querySelectorAll('.activity-item').forEach(item => {
    item.addEventListener('click', () => {
        console.log('Activity clicked');
        // TODO: Navigate to project/profile
    });
});

document.querySelectorAll('.follow-back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.textContent = 'Siguiendo';
        btn.style.background = 'rgba(255, 255, 255, 0.1)';
        console.log('Following user');
    });
});

document.querySelector('.load-more-btn')?.addEventListener('click', () => {
    console.log('Loading more activity');
    // TODO: Load more activity items
});

// AI Recommendations
document.querySelector('.refresh-recommendations')?.addEventListener('click', function() {
    this.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        this.style.transform = '';
    }, 600);
    console.log('Refreshing recommendations');
    // TODO: Load new recommendations
});

document.querySelectorAll('.recommendation-card').forEach(card => {
    card.addEventListener('click', () => {
        const templateName = card.querySelector('h4')?.textContent;
        console.log('Viewing recommendation:', templateName);
    });
});

document.querySelectorAll('.use-template-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const templateName = btn.closest('.recommendation-card').querySelector('h4')?.textContent;
        console.log('Using template:', templateName);
        // TODO: Open template in editor
    });
});

// Analytics
document.querySelector('.time-filter')?.addEventListener('change', (e) => {
    console.log('Analytics timeframe:', e.target.value);
    // TODO: Update analytics data
});

document.querySelectorAll('.analytics-card').forEach(card => {
    card.addEventListener('click', () => {
        const metric = card.querySelector('h4')?.textContent;
        console.log('View detailed analytics for:', metric);
        // TODO: Show detailed analytics modal
    });
});

// Mood Board - Drag and Drop
let draggedElement = null;

document.querySelectorAll('.mood-item').forEach(item => {
    item.addEventListener('dragstart', function(e) {
        draggedElement = this;
        this.style.opacity = '0.5';
    });
    
    item.addEventListener('dragend', function(e) {
        this.style.opacity = '';
    });
    
    item.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    item.addEventListener('drop', function(e) {
        e.preventDefault();
        if (draggedElement !== this) {
            // Swap positions
            const temp = this.style.cssText;
            this.style.cssText = draggedElement.style.cssText;
            draggedElement.style.cssText = temp;
        }
    });
});

// Mood Board Actions
document.querySelectorAll('.mood-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.textContent;
        console.log('Mood board action:', action);
        
        if (action === '❤️') {
            btn.textContent = '💙';
            setTimeout(() => btn.textContent = '❤️', 1000);
        }
    });
});

document.querySelectorAll('.moodboard-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        if (action.includes('Agregar')) {
            console.log('Add to mood board');
            // TODO: Show file picker
        } else {
            console.log('Toggle mood board view');
            // TODO: Toggle grid/masonry view
        }
    });
});

console.log('✨ Fase 1 features loaded!');