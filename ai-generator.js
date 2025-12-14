// AI Generator - Template Creator

const templateTypes = {
    'instagram-post': { name: 'Post Instagram', icon: '📱', size: '1080x1080' },
    'story': { name: 'Story', icon: '🎬', size: '1080x1920' },
    'presentation': { name: 'Presentación', icon: '📊', size: '1920x1080' },
    'flyer': { name: 'Flyer', icon: '🎨', size: '2480x3508' },
    'banner': { name: 'Banner Web', icon: '🌐', size: '1920x600' },
    'document': { name: 'Documento', icon: '📄', size: 'A4' }
};

const gradients = [
    'linear-gradient(135deg, #FFB4D1 0%, #FFCAB0 100%)',
    'linear-gradient(135deg, #D4BBFF 0%, #C9A9FF 100%)',
    'linear-gradient(135deg, #A8E6FF 0%, #9BDCDC 100%)',
    'linear-gradient(135deg, #FFE89C 0%, #FFCC80 100%)',
    'linear-gradient(135deg, #FFCAB0 0%, #FFB4D1 100%)',
    'linear-gradient(135deg, #C9A9FF 0%, #A8E6FF 100%)',
];

let generatedTemplates = [];

document.addEventListener('DOMContentLoaded', () => {
    
    // Example chips - click to use
    document.querySelectorAll('.example-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.getElementById('promptInput').value = chip.textContent;
        });
    });
    
    // Quick option cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            const type = card.querySelector('span').textContent;
            const promptInput = document.getElementById('promptInput');
            const currentText = promptInput.value;
            
            if (!currentText) {
                promptInput.value = `Crea ${type.toLowerCase()}`;
            }
            
            // Visual feedback
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.transform = '', 150);
        });
    });
    
    // Toggle advanced settings
    document.getElementById('toggleAdvanced')?.addEventListener('click', function() {
        const content = document.getElementById('advancedContent');
        const icon = this.querySelector('svg');
        
        if (content.style.display === 'none') {
            content.style.display = 'flex';
            icon.style.transform = 'rotate(45deg)';
        } else {
            content.style.display = 'none';
            icon.style.transform = '';
        }
    });
    
    // Generate button
    document.getElementById('generateBtn').addEventListener('click', generateTemplates);
    
    // Clear results
    document.getElementById('clearResults')?.addEventListener('click', () => {
        if (confirm('¿Eliminar todas las generaciones?')) {
            const resultsGrid = document.getElementById('resultsGrid');
            resultsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">✨</div>
                    <h3>Aún no has generado nada</h3>
                    <p>Describe qué plantilla o contenido necesitas y la IA lo creará para ti</p>
                </div>
            `;
            
            document.getElementById('historyList').innerHTML = `
                <div class="history-empty">
                    <p>Tus generaciones recientes aparecerán aquí</p>
                </div>
            `;
            
            generatedTemplates = [];
        }
    });
    
    console.log('✨ AI Template Generator ready!');
});

function generateTemplates() {
    const prompt = document.getElementById('promptInput').value;
    
    if (!prompt.trim()) {
        alert('Por favor describe qué plantilla o contenido quieres crear');
        return;
    }
    
    // Show loading
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('active');
    
    // Simulate AI generation
    setTimeout(() => {
        // Detect how many templates to create (parse from prompt)
        const quantity = detectQuantity(prompt);
        
        // Generate templates
        for (let i = 0; i < quantity; i++) {
            const gradient = gradients[i % gradients.length];
            addGeneratedTemplate(prompt, gradient, i + 1, quantity);
        }
        
        loadingOverlay.classList.remove('active');
        
        // Add to history
        addToHistory(prompt, quantity);
    }, 3000);
}

function detectQuantity(prompt) {
    // Simple detection of numbers in prompt
    const numbers = prompt.match(/(\d+)/);
    if (numbers) {
        const num = parseInt(numbers[0]);
        return Math.min(num, 10); // Max 10
    }
    return 1; // Default
}

function addGeneratedTemplate(prompt, gradient, index, total) {
    const resultsGrid = document.getElementById('resultsGrid');
    
    // Remove empty state
    const emptyState = resultsGrid.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    // Detect type from prompt
    const type = detectTemplateType(prompt);
    const typeInfo = templateTypes[type] || templateTypes['instagram-post'];
    
    // Create template card
    const templateCard = document.createElement('div');
    templateCard.className = 'template-card';
    templateCard.innerHTML = `
        <div class="template-preview" style="background: ${gradient};">
            <div class="template-badge">${typeInfo.icon} Variación ${index}/${total}</div>
        </div>
        <div class="template-info">
            <h4>${typeInfo.name}</h4>
            <p class="template-meta">${typeInfo.size} • Generado con IA</p>
            <div class="template-actions">
                <button onclick="editTemplate(this)">✏️ Editar</button>
                <button onclick="downloadTemplate(this)">⬇️ Descargar</button>
            </div>
        </div>
    `;
    
    resultsGrid.prepend(templateCard);
    
    // Store
    generatedTemplates.push({ 
        prompt, 
        gradient, 
        type: typeInfo.name,
        timestamp: new Date() 
    });
}

function detectTemplateType(prompt) {
    const lower = prompt.toLowerCase();
    
    if (lower.includes('post') || lower.includes('publicación')) return 'instagram-post';
    if (lower.includes('story') || lower.includes('historia')) return 'story';
    if (lower.includes('presentación') || lower.includes('slide')) return 'presentation';
    if (lower.includes('flyer') || lower.includes('volante')) return 'flyer';
    if (lower.includes('banner')) return 'banner';
    if (lower.includes('documento') || lower.includes('cv')) return 'document';
    
    return 'instagram-post'; // Default
}

function addToHistory(prompt, quantity) {
    const historyList = document.getElementById('historyList');
    
    // Remove empty state
    const emptyState = historyList.querySelector('.history-empty');
    if (emptyState) {
        emptyState.remove();
    }
    
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">
            ${prompt.substring(0, 60)}${prompt.length > 60 ? '...' : ''}
        </div>
        <div style="font-size: 0.75rem; color: var(--color-text-secondary);">
            ${quantity} plantilla${quantity > 1 ? 's' : ''} • Hace un momento
        </div>
    `;
    
    historyItem.addEventListener('click', () => {
        document.getElementById('promptInput').value = prompt;
    });
    
    historyList.prepend(historyItem);
    
    // Keep only last 10
    while (historyList.children.length > 10) {
        historyList.lastChild.remove();
    }
}

function editTemplate(btn) {
    alert('Abriendo en editor... (función mockup)');
    console.log('Edit template');
}

function downloadTemplate(btn) {
    alert('Descargando plantilla... (función mockup)');
    console.log('Download template');
}