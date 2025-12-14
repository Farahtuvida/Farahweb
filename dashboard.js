// ========================
// SIMPLIFIED DASHBOARD - TEMPLATE FEED
// ========================

// Template data generator
const gradients = [
    'linear-gradient(135deg, #FFB4D1 0%, #FFCAB0 100%)',
    'linear-gradient(135deg, #D4BBFF 0%, #C9A9FF 100%)',
    'linear-gradient(135deg, #A8E6FF 0%, #9BDCDC 100%)',
    'linear-gradient(135deg, #FFE89C 0%, #FFCC80 100%)',
    'linear-gradient(135deg, #FFCAB0 0%, #FFB4D1 100%)',
    'linear-gradient(135deg, #C9A9FF 0%, #A8E6FF 100%)',
];

const templateCategories = {
    'Instagram Post': ['Social Media', '1080x1080'],
    'Story Template': ['Instagram', '1080x1920'],
    'YouTube Thumbnail': ['Video', '1280x720'],
    'Presentación': ['Business', '1920x1080'],
    'Logo Design': ['Branding', '500x500'],
    'Flyer Event': ['Print', '2480x3508'],
    'Banner Web': ['Web', '1920x600'],
    'Post Facebook': ['Social Media', '1200x630'],
    'TikTok Video': ['Video', '1080x1920'],
    'Email Header': ['Marketing', '600x200'],
    'Poster': ['Print', '3000x4000'],
    'Business Card': ['Print', '1050x600'],
};

const creators = [
    { name: 'María González', initial: 'M', templates: 124, followers: '2.4K' },
    { name: 'Carlos Ruiz', initial: 'C', templates: 98, followers: '1.8K' },
    { name: 'Ana Martínez', initial: 'A', templates: 156, followers: '3.1K' },
    { name: 'Luis Torres', initial: 'L', templates: 87, followers: '1.5K' },
    { name: 'Sofía Pérez', initial: 'S', templates: 203, followers: '4.2K' },
    { name: 'Diego Morales', initial: 'D', templates: 76, followers: '1.2K' },
];

// Generate template card HTML
function createTemplateCard(template, index) {
    const gradient = gradients[index % gradients.length];
    const [category, size] = templateCategories[template.name];
    const creator = creators[index % creators.length];
    
    return `
        <div class="template-card" data-template-id="${index}">
            <div class="template-preview">
                <div class="template-image" style="background: ${gradient};"></div>
                ${template.badge ? `<div class="template-badge">${template.badge}</div>` : ''}
                <div class="template-actions">
                    <button class="action-btn like-btn" title="Me gusta">
                        ❤️
                    </button>
                    <button class="action-btn save-btn" title="Guardar">
                        📌
                    </button>
                </div>
                <div class="template-overlay">
                    <button class="btn-use-template">Usar Template</button>
                </div>
            </div>
            <div class="template-info">
                <h3>${template.name}</h3>
                <div class="template-meta">
                    <span>👁️ ${template.views}</span>
                    <span>❤️ ${template.likes}</span>
                    <span>${size}</span>
                </div>
                <div class="template-creator">
                    <div class="creator-avatar" style="background: ${gradient};">${creator.initial}</div>
                    <span class="creator-name">${creator.name}</span>
                </div>
            </div>
        </div>
    `;
}

// Generate creator card HTML
function createCreatorCard(creator, index) {
    const gradient = gradients[index % gradients.length];
    
    return `
        <div class="creator-card" data-creator-id="${index}">
            <div class="creator-card-avatar" style="background: ${gradient};">
                ${creator.initial}
            </div>
            <h3>${creator.name}</h3>
            <div class="creator-stats">
                <span>${creator.templates} plantillas</span>
                <span>${creator.followers} seguidores</span>
            </div>
            <button class="follow-btn">Seguir</button>
        </div>
    `;
}

// Generate templates for each category
function generateTemplates(category, count = 12) {
    const templates = [];
    const templateNames = Object.keys(templateCategories);
    
    for (let i = 0; i < count; i++) {
        const name = templateNames[i % templateNames.length];
        const views = `${(Math.random() * 10 + 1).toFixed(1)}K`;
        const likes = `${(Math.random() * 5 + 0.5).toFixed(1)}K`;
        
        let badge = '';
        if (category === 'for-you') badge = 'Para Ti';
        if (category === 'trending' && i < 3) badge = `#${i + 1}`;
        if (category === 'popular') badge = '⭐ Top';
        if (category === 'recent') badge = '🆕 Nuevo';
        
        templates.push({ name, views, likes, badge });
    }
    
    return templates;
}

// Load templates into DOM
function loadTemplates(category) {
    const section = document.querySelector(`[data-category="${category}"]`);
    const container = section.querySelector('.templates-masonry');
    
    if (container) {
        const templates = generateTemplates(category, 12);
        container.innerHTML = templates.map((template, index) => 
            createTemplateCard(template, index)
        ).join('');
        
        // Add event listeners
        attachTemplateEvents(container);
    }
}

// Load creators
function loadCreators() {
    const container = document.querySelector('.creators-grid');
    if (container) {
        container.innerHTML = creators.map((creator, index) => 
            createCreatorCard(creator, index)
        ).join('');
        
        // Add event listeners
        attachCreatorEvents(container);
    }
}

// Attach events to template cards
function attachTemplateEvents(container) {
    // Template card click
    container.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.action-btn') && !e.target.closest('.btn-use-template')) {
                const templateId = card.dataset.templateId;
                console.log('Opening template:', templateId);
                // TODO: Show template detail modal
            }
        });
    });
    
    // Like button
    container.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.textContent = btn.textContent === '❤️' ? '💙' : '❤️';
        });
    });
    
    // Save button
    container.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.textContent = btn.textContent === '📌' ? '✅' : '📌';
        });
    });
    
    // Use template button
    container.querySelectorAll('.btn-use-template').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.template-card');
            const templateId = card.dataset.templateId;
            console.log('Using template:', templateId);
            // TODO: Open in editor
        });
    });
}

// Attach events to creator cards
function attachCreatorEvents(container) {
    container.querySelectorAll('.creator-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.follow-btn')) {
                const creatorId = card.dataset.creatorId;
                console.log('Opening creator profile:', creatorId);
                // TODO: Navigate to creator profile
            }
        });
    });
    
    container.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (btn.textContent === 'Seguir') {
                btn.textContent = 'Siguiendo';
                btn.style.background = 'rgba(255, 255, 255, 0.1)';
            } else {
                btn.textContent = 'Seguir';
                btn.style.background = '';
            }
        });
    });
}

// Category filtering
function showCategory(category) {
    // Hide all categories
    document.querySelectorAll('.templates-category').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected category
    const selectedSection = document.querySelector(`[data-category="${category}"]`);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        
        // Load templates if not already loaded
        const container = selectedSection.querySelector('.templates-masonry, .creators-grid');
        if (container && container.children.length === 0) {
            if (category === 'creators') {
                loadCreators();
            } else {
                loadTemplates(category);
            }
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load initial category (For You)
    loadTemplates('for-you');
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show category
            const category = tab.dataset.category;
            showCategory(category);
        });
    });
    
    // Sort select
    document.querySelector('.sort-select')?.addEventListener('change', (e) => {
        console.log('Sorting by:', e.target.value);
        // TODO: Implement sorting
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle?.querySelector('.sun-icon');
    const moonIcon = themeToggle?.querySelector('.moon-icon');
    
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
    
    // User dropdown
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    userProfileBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        userProfileBtn.classList.toggle('active');
        userDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', () => {
        userProfileBtn?.classList.remove('active');
        userDropdown?.classList.remove('active');
    });
    
    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            window.location.href = 'login.html';
        }
    });
    
    // Mobile menu
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
    
    // Create new button
    document.querySelector('.btn-create-new')?.addEventListener('click', () => {
        console.log('Create new project');
        // TODO: Show create modal
    });
    
    // Search
    const searchInput = document.querySelector('.search-bar input');
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        console.log('Searching:', query);
        // TODO: Implement search
    });
    
    console.log('✨ Dashboard loaded - Template feed ready!');
});