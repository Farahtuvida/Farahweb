// AI Generator JavaScript

const gradients = [
    'linear-gradient(135deg, #FFB4D1 0%, #FFCAB0 100%)',
    'linear-gradient(135deg, #D4BBFF 0%, #C9A9FF 100%)',
    'linear-gradient(135deg, #A8E6FF 0%, #9BDCDC 100%)',
    'linear-gradient(135deg, #FFE89C 0%, #FFCC80 100%)',
];

let generatedImages = [];

document.addEventListener('DOMContentLoaded', () => {
    // Style selection
    document.querySelectorAll('.style-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.style-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
    
    // Suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const promptInput = document.getElementById('promptInput');
            const currentText = promptInput.value;
            const suggestion = chip.textContent.substring(2).trim();
            
            if (currentText) {
                promptInput.value = `${currentText}, ${suggestion}`;
            } else {
                promptInput.value = suggestion;
            }
        });
    });
    
    // Generate button
    document.getElementById('generateBtn').addEventListener('click', generateImage);
    
    console.log('✨ AI Generator ready!');
});

function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    
    if (!prompt.trim()) {
        alert('Por favor describe la imagen que quieres generar');
        return;
    }
    
    // Show loading
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('active');
    
    // Simulate AI generation (2-3 seconds)
    setTimeout(() => {
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        addGeneratedImage(prompt, randomGradient);
        loadingOverlay.classList.remove('active');
    }, 2500);
}

function addGeneratedImage(prompt, gradient) {
    const resultsGrid = document.getElementById('resultsGrid');
    
    // Remove empty state
    const emptyState = resultsGrid.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    // Create result card
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';
    resultCard.innerHTML = `
        <div class="result-image" style="background: ${gradient};"></div>
        <div class="result-actions">
            <button onclick="downloadImage(this)">⬇️ Descargar</button>
            <button onclick="useInEditor(this)">✏️ Editar</button>
        </div>
    `;
    
    resultsGrid.prepend(resultCard);
    
    // Add to history
    addToHistory(prompt, gradient);
    
    // Store
    generatedImages.push({ prompt, gradient, timestamp: new Date() });
}

function addToHistory(prompt, gradient) {
    const historyList = document.getElementById('historyList');
    
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Hace un momento</div>
    `;
    
    historyItem.addEventListener('click', () => {
        document.getElementById('promptInput').value = prompt;
    });
    
    historyList.prepend(historyItem);
    
    // Keep only last 5
    while (historyList.children.length > 5) {
        historyList.lastChild.remove();
    }
}

function downloadImage(btn) {
    alert('Descargando imagen... (función mockup)');
}

function useInEditor(btn) {
    alert('Abriendo en editor... (función mockup)');
}