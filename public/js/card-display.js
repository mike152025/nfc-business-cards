// Card Display JavaScript
let cardData = null;
let isFlipped = false;

// Get card ID from URL
const cardId = window.location.pathname.split('/').pop();

// Load card data
async function loadCard() {
    try {
        const response = await fetch(`/api/cards/${cardId}`);
        cardData = await response.json();
        
        if (!cardData) {
            document.body.innerHTML = '<h1>Card not found</h1>';
            return;
        }
        
        displayCard();
        setupControls();
        displayCardInfo();
    } catch (error) {
        console.error('Error loading card:', error);
        document.body.innerHTML = '<h1>Error loading card</h1>';
    }
}

function displayCard() {
    // Display front card
    const frontContent = document.getElementById('frontCardContent');
    frontContent.innerHTML = '';
    frontContent.style.background = cardData.design.primaryColor;
    
    if (cardData.design.backgroundImage) {
        frontContent.style.backgroundImage = `url(${cardData.design.backgroundImage})`;
        frontContent.style.backgroundSize = 'cover';
    }
    
    // Add front elements
    cardData.frontElements.forEach(el => {
        const element = renderCardElement(el, cardData.design);
        frontContent.appendChild(element);
    });
    
    // Add default content if empty
    if (cardData.frontElements.length === 0) {
        const defaultContent = document.createElement('div');
        defaultContent.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            color: ${cardData.design.secondaryColor};
            text-align: center;
            padding: 20px;
        `;
        
        if (cardData.design.logo) {
            const logo = document.createElement('img');
            logo.src = cardData.design.logo;
            logo.style.cssText = 'width: 80px; height: 80px; margin-bottom: 20px; border-radius: 8px;';
            defaultContent.appendChild(logo);
        }
        
        const name = document.createElement('h2');
        name.textContent = cardData.businessName || 'Business Name';
        name.style.cssText = 'font-size: 24px; margin-bottom: 8px;';
        defaultContent.appendChild(name);
        
        const owner = document.createElement('p');
        owner.textContent = cardData.ownerName || '';
        owner.style.cssText = 'font-size: 14px; opacity: 0.9;';
        defaultContent.appendChild(owner);
        
        frontContent.appendChild(defaultContent);
    }
    
    // Display back card
    const backContent = document.getElementById('backCardContent');
    backContent.innerHTML = '';
    backContent.style.background = cardData.design.secondaryColor;
    
    // Add back elements
    cardData.backElements.forEach(el => {
        const element = renderCardElement(el, cardData.design);
        backContent.appendChild(element);
    });
    
    // Add default back content if empty
    if (cardData.backElements.length === 0) {
        const defaultBack = document.createElement('div');
        defaultBack.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 20px;
            text-align: center;
            color: ${cardData.design.primaryColor};
        `;
        
        const email = document.createElement('p');
        email.textContent = cardData.email || 'email@example.com';
        email.style.cssText = 'font-size: 12px; margin-bottom: 8px;';
        defaultBack.appendChild(email);
        
        const phone = document.createElement('p');
        phone.textContent = cardData.phone || '+1 (555) 000-0000';
        phone.style.cssText = 'font-size: 12px; margin-bottom: 8px;';
        defaultBack.appendChild(phone);
        
        const website = document.createElement('p');
        website.textContent = cardData.website || 'www.example.com';
        website.style.cssText = 'font-size: 12px;';
        defaultBack.appendChild(website);
        
        backContent.appendChild(defaultBack);
    }
}

function renderCardElement(el, design) {
    const div = document.createElement('div');
    div.className = `card-element ${el.type}`;
    
    if (el.type === 'text') {
        div.textContent = el.content;
        div.style.cssText = `
            left: ${el.position.x}%;
            top: ${el.position.y}%;
            font-size: ${el.style?.fontSize || 16}px;
            color: ${el.style?.color || '#FFFFFF'};
            font-family: ${el.style?.fontFamily || 'Arial'};
            font-weight: ${el.style?.fontWeight || 'normal'};
        `;
    } else if (el.type === 'qrcode') {
        div.style.cssText = `
            left: ${el.position.x}%;
            top: ${el.position.y}%;
            width: ${el.size.width}px;
            height: ${el.size.height}px;
        `;
        div.innerHTML = '📱';
    }
    
    return div;
}

function setupControls() {
    document.getElementById('flipBtn').addEventListener('click', () => {
        isFlipped = !isFlipped;
        const front = document.getElementById('cardFront');
        const back = document.getElementById('cardBack');
        
        if (isFlipped) {
            front.style.transform = 'rotateY(180deg)';
            back.style.transform = 'rotateY(0deg)';
        } else {
            front.style.transform = 'rotateY(0deg)';
            back.style.transform = 'rotateY(-180deg)';
        }
    });
    
    document.getElementById('downloadBtn').addEventListener('click', () => {
        alert('📥 Download feature coming soon! This will generate a high-resolution PDF or image.');
    });
    
    document.getElementById('shareBtn').addEventListener('click', () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: cardData.businessName,
                text: `Check out ${cardData.ownerName}'s business card`,
                url: url
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('✅ Link copied to clipboard!');
        }
    });
    
    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });
}

function displayCardInfo() {
    const infoDiv = document.getElementById('cardInfo');
    infoDiv.innerHTML = `
        <div class="info-section">
            <h3>Business Information</h3>
            <p><strong>${cardData.businessName || 'Business Name'}</strong></p>
        </div>
        <div class="info-section">
            <h3>Contact</h3>
            <p>📧 ${cardData.email || 'No email'}</p>
            <p>📱 ${cardData.phone || 'No phone'}</p>
            <p>🌐 <a href="${cardData.website}" class="info-link" target="_blank">${cardData.website || 'No website'}</a></p>
        </div>
        <div class="info-section">
            <h3>Permanent Link</h3>
            <p><a href="${window.location.href}" class="info-link">${window.location.href}</a></p>
            <p style="font-size: 12px; color: #999; margin-top: 8px;">This link will never change - share it forever!</p>
        </div>
        <div class="info-section">
            <h3>Statistics</h3>
            <p>👁️ Views: ${cardData.views}</p>
        </div>
    `;
}

// Load card on page load
window.addEventListener('load', loadCard);