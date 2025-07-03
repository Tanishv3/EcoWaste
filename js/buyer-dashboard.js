// Buyer Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    loadMarketplace();
    
    // Example marketplace data
    const marketplaceItems = [
        {
            id: 101,
            name: "Wireless Headphones",
            category: "Audio",
            condition: "Good",
            price: "₹800",
            description: "Sony wireless headphones, fully functional",
            seller: "Raj Sharma"
        },
        {
            id: 102,
            name: "Tablet",
            category: "Tablet",
            condition: "Fair",
            price: "₹2500",
            description: "iPad Mini 2, charging port needs repair",
            seller: "Priya Patel"
        }
    ];
    
    // Render marketplace items
    function renderMarketplace(items) {
        const container = document.querySelector('#marketplace .items-container');
        container.innerHTML = '';
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-card';
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Seller:</strong> ${item.seller}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Condition:</strong> ${item.condition}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p>${item.description}</p>
                <div class="item-actions">
                    <button class="make-offer-btn">Make Offer</button>
                    <button class="save-btn">Save</button>
                </div>
            `;
            container.appendChild(itemElement);
        });
    }
    
    function loadMarketplace() {
        // In real implementation, load from localStorage/backend
        renderMarketplace(marketplaceItems);
    }
});
