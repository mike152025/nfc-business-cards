// Admin Panel JavaScript
let currentCard = {
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    design: {
        primaryColor: '#000000',
        secondaryColor: '#FFFFFF',
        logo: '',
        backgroundImage: '',
        font: 'Arial'
    },
    frontElements: [],
    backElements: [],
    qrCode: {
        enabled: true,
        position: { x: 20, y: 20 },
        size: 100,
        label: 'Scan Me'
    }
};

let selectedElement = null;
let currentSide = 'front';
let allCards = [];

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        switchSection(section);
    });
});

function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    
    // Load section-specific data
    if (sectionId === 'dashboard') loadDashboard();
    if (sectionId === 'my-cards') loadMyCards();
}

// Dashboard
async function loadDashboard() {
    try {
        const response = await fetch('/api/admin/stats');
        const stats = await response.json();
        
        document.getElementById('totalCards').textContent = stats.totalCards;
        document.getElementById('totalViews').textContent = stats.totalViews;
        
        // Display recent cards
        const recentList = document.getElementById('recentCardsList');
        recentList.innerHTML = '';
        
        stats.topCards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'card-item';
            cardEl.innerHTML = `
                <h4>${card.businessName || 'Unnamed Card'}</h4>
                <p>${card.ownerName || 'No owner'}</p>
                <div class="views">👁️ ${card.views} views</div>
            `;
            recentList.appendChild(cardEl);
        });
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Create Card - Input Fields
document.getElementById('businessName').addEventListener('change', (e) => {
    currentCard.businessName = e.target.value;
    updateCardPreview();
});

document.getElementById('ownerName').addEventListener('change', (e) => {
    currentCard.ownerName = e.target.value;
    updateCardPreview();
});

document.getElementById('email').addEventListener('change', (e) => {
    currentCard.email = e.target.value;
});

document.getElementById('phone').addEventListener('change', (e) => {
    currentCard.phone = e.target.value;
});

document.getElementById('website').addEventListener('change', (e) => {
    currentCard.website = e.target.value;
});

document.getElementById('address').addEventListener('change', (e) => {
    currentCard.address = e.target.value;
});

// Color Picker
document.getElementById('primaryColor').addEventListener('change', (e) => {
    currentCard.design.primaryColor = e.target.value;
    document.getElementById('primaryColorValue').textContent = e.target.value;
    updateCardPreview();
});

document.getElementById('secondaryColor').addEventListener('change', (e) => {
    currentCard.design.secondaryColor = e.target.value;
    document.getElementById('secondaryColorValue').textContent = e.target.value;
    updateCardPreview();
});

document.getElementById('fontFamily').addEventListener('change', (e) => {
    currentCard.design.font = e.target.value;
    updateCardPreview();
});

// Logo Upload
document.getElementById('logoUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            currentCard.design.logo = event.target.result;
            document.getElementById('logoPreview').innerHTML = `<img src="${event.target.result}" alt="Logo">`;
            updateCardPreview();
        };
        reader.readAsDataURL(file);
    }
});

// Background Upload
document.getElementById('backgroundUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            currentCard.design.backgroundImage = event.target.result;
            document.getElementById('backgroundPreview').innerHTML = `<img src="${event.target.result}" alt="Background">`;
            updateCardPreview();
        };
        reader.readAsDataURL(file);
    }
});

// QR Code Settings
document.getElementById('qrEnabled').addEventListener('change', (e) => {
    currentCard.qrCode.enabled = e.target.checked;
    updateCardPreview();
});

document.getElementById('qrLabel').addEventListener('change', (e) => {
    currentCard.qrCode.label = e.target.value;
});

document.getElementById('qrSize').addEventListener('change', (e) => {
    currentCard.qrCode.size = parseInt(e.target.value);
    updateCardPreview();
});

// Card Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentSide = btn.dataset.tab;
        document.getElementById('frontCard').style.display = currentSide === 'front' ? 'block' : 'none';
        document.getElementById('backCard').style.display = currentSide === 'back' ? 'block' : 'none';
    });
});

// Add Text Element
document.getElementById('addTextBtn').addEventListener('click', () => {
    const textElement = {
        id: 'text-' + Date.now(),
        type: 'text',
        content: 'New Text',
        position: { x: 50, y: 50 },
        size: { width: 200, height: 30 },
        style: {
            fontSize: 16,
            fontWeight: 'normal',
            color: '#FFFFFF',
            fontFamily: currentCard.design.font
        }
    };
    
    if (currentSide === 'front') {
        currentCard.frontElements.push(textElement);
    } else {
        currentCard.backElements.push(textElement);
    }
    
    updateCardPreview();
});

// Add QR Code
document.getElementById('addQRBtn').addEventListener('click', () => {
    const qrElement = {
        id: 'qr-' + Date.now(),
        type: 'qrcode',
        content: 'https://example.com',
        position: { x: 20, y: 20 },
        size: { width: 100, height: 100 }
    };
    
    if (currentSide === 'front') {
        currentCard.frontElements.push(qrElement);
    } else {
        currentCard.backElements.push(qrElement);
    }
    
    updateCardPreview();
});

// Delete Element
document.getElementById('deleteElementBtn').addEventListener('click', () => {
    if (selectedElement) {
        const elements = currentSide === 'front' ? currentCard.frontElements : currentCard.backElements;
        const index = elements.findIndex(el => el.id === selectedElement.id);
        if (index > -1) {
            elements.splice(index, 1);
            selectedElement = null;
            updateCardPreview();
            updateElementProperties();
        }
    }
});

// Duplicate Element
document.getElementById('duplicateElementBtn').addEventListener('click', () => {
    if (selectedElement) {
        const elements = currentSide === 'front' ? currentCard.frontElements : currentCard.backElements;
        const element = elements.find(el => el.id === selectedElement.id);
        if (element) {
            const duplicate = JSON.parse(JSON.stringify(element));
            duplicate.id = element.type + '-' + Date.now();
            duplicate.position.x += 20;
            duplicate.position.y += 20;
            elements.push(duplicate);
            updateCardPreview();
        }
    }
});

// Update Card Preview
function updateCardPreview() {
    const frontCard = document.getElementById('frontCard');
    const backCard = document.getElementById('backCard');
    
    frontCard.style.background = currentCard.design.primaryColor;
    backCard.style.background = currentCard.design.secondaryColor;
    
    if (currentCard.design.backgroundImage) {
        frontCard.style.backgroundImage = `url(${currentCard.design.backgroundImage})`;
        frontCard.style.backgroundSize = 'cover';
    }
    
    // Update front elements
    const frontElements = document.getElementById('frontElements');
    frontElements.innerHTML = '';
    currentCard.frontElements.forEach(el => {
        renderElement(el, frontElements);
    });
    
    // Update back elements
    const backElements = document.getElementById('backElements');
    backElements.innerHTML = '';
    currentCard.backElements.forEach(el => {
        renderElement(el, backElements);
    });
    
    // Add default elements if empty
    if (currentCard.frontElements.length === 0 && currentSide === 'front') {
        const defaultText = document.createElement('div');
        defaultText.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: ${currentCard.design.secondaryColor};
            font-family: ${currentCard.design.font};
            font-size: 24px;
            font-weight: bold;
            text-align: center;
        `;
        defaultText.textContent = currentCard.businessName || 'Your Business Name';
        frontCard.appendChild(defaultText);
    }
}

function renderElement(element, container) {
    const div = document.createElement('div');
    div.className = `canvas-element ${element.type}`;
    div.id = element.id;
    div.style.cssText = `
        position: absolute;
        left: ${element.position.x}%;
        top: ${element.position.y}%;
        width: ${element.size.width}px;
        height: ${element.size.height}px;
        cursor: move;
        border: ${selectedElement?.id === element.id ? '2px solid blue' : '2px dashed transparent'};
        padding: 4px;
    `;
    
    if (element.type === 'text') {
        div.style.cssText += `
            font-size: ${element.style.fontSize}px;
            font-weight: ${element.style.fontWeight};
            color: ${element.style.color};
            font-family: ${element.style.fontFamily};
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: wrap;
        `;
        div.textContent = element.content;
    } else if (element.type === 'qrcode') {
        div.innerHTML = '📱 QR Code';
        div.style.cssText += 'display: flex; align-items: center; justify-content: center; background: white; border-radius: 4px;';
    }
    
    div.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedElement = element;
        updateCardPreview();
        updateElementProperties();
    });
    
    // Dragging
    let isDragging = false;
    let startX, startY;
    
    div.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging && selectedElement?.id === element.id) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            element.position.x += dx / 5;
            element.position.y += dy / 5;
            updateCardPreview();
            startX = e.clientX;
            startY = e.clientY;
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    container.appendChild(div);
}

function updateElementProperties() {
    const panel = document.getElementById('elementProperties');
    
    if (!selectedElement) {
        panel.innerHTML = '<p>Click an element to edit</p>';
        panel.classList.add('properties-empty');
        return;
    }
    
    panel.classList.remove('properties-empty');
    let html = `
        <div class="settings-group">
            <h3>Element: ${selectedElement.type.toUpperCase()}</h3>
            <label>Content</label>
            <input type="text" class="input-field" id="elementContent" value="${selectedElement.content}" placeholder="Element content">
            <label>Font Size</label>
            <input type="number" class="input-field" id="elementFontSize" value="${selectedElement.style?.fontSize || 16}" min="8" max="72">
            <label>Color</label>
            <div class="color-picker">
                <input type="color" id="elementColor" value="${selectedElement.style?.color || '#FFFFFF'}">
            </div>
            <label>X Position (%)</label>
            <input type="number" class="input-field" id="elementX" value="${selectedElement.position.x}" min="0" max="100">
            <label>Y Position (%)</label>
            <input type="number" class="input-field" id="elementY" value="${selectedElement.position.y}" min="0" max="100">
        </div>
    `;
    
    panel.innerHTML = html;
    
    // Add event listeners
    document.getElementById('elementContent').addEventListener('change', (e) => {
        selectedElement.content = e.target.value;
        updateCardPreview();
    });
    
    document.getElementById('elementFontSize').addEventListener('change', (e) => {
        if (selectedElement.style) selectedElement.style.fontSize = parseInt(e.target.value);
        updateCardPreview();
    });
    
    document.getElementById('elementColor').addEventListener('change', (e) => {
        if (selectedElement.style) selectedElement.style.color = e.target.value;
        updateCardPreview();
    });
    
    document.getElementById('elementX').addEventListener('change', (e) => {
        selectedElement.position.x = parseFloat(e.target.value);
        updateCardPreview();
    });
    
    document.getElementById('elementY').addEventListener('change', (e) => {
        selectedElement.position.y = parseFloat(e.target.value);
        updateCardPreview();
    });
}

// Save Card
document.getElementById('saveCardBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentCard)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(`✅ Card created!\n\nPermanent Link: ${result.permanentLink}\n\nShare this link with your customers!`);
            // Reset form
            resetCardEditor();
        }
    } catch (error) {
        alert('Error saving card: ' + error.message);
    }
});

function resetCardEditor() {
    currentCard = {
        businessName: '',
        ownerName: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        design: {
            primaryColor: '#000000',
            secondaryColor: '#FFFFFF',
            logo: '',
            backgroundImage: '',
            font: 'Arial'
        },
        frontElements: [],
        backElements: [],
        qrCode: {
            enabled: true,
            position: { x: 20, y: 20 },
            size: 100,
            label: 'Scan Me'
        }
    };
    
    document.getElementById('businessName').value = '';
    document.getElementById('ownerName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('website').value = '';
    document.getElementById('address').value = '';
    
    updateCardPreview();
}

// Load My Cards
async function loadMyCards() {
    try {
        const response = await fetch('/api/admin/cards');
        allCards = await response.json();
        
        const cardsList = document.getElementById('myCardsList');
        cardsList.innerHTML = '';
        
        allCards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card-grid-item';
            cardDiv.innerHTML = `
                <div class="card-thumbnail" style="background: linear-gradient(135deg, ${card.design.primaryColor}, ${card.design.secondaryColor});">
                    <span>${card.businessName || 'Unnamed'}</span>
                    <div class="views">👁️ ${card.views}</div>
                </div>
                <div class="card-details">
                    <h4>${card.businessName}</h4>
                    <p>${card.ownerName || 'No owner'}</p>
                    <div class="card-actions">
                        <button class="edit-btn" onclick="editCard('${card.cardId}')">✏️ Edit</button>
                        <button class="delete-btn" onclick="deleteCard('${card.cardId}')">🗑️ Delete</button>
                    </div>
                </div>
            `;
            cardsList.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Error loading cards:', error);
    }
}

function editCard(cardId) {
    alert(`Editing card: ${cardId}`);
}

function deleteCard(cardId) {
    if (confirm('Are you sure you want to delete this card?')) {
        fetch(`/api/cards/${cardId}`, { method: 'DELETE' })
            .then(() => loadMyCards())
            .catch(err => alert('Error: ' + err));
    }
}

// Initialize
loadDashboard();
updateCardPreview();