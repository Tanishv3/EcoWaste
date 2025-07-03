// Seller Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initItemForm();
    loadInventory();
    
    // Example data - will be replaced with real implementation
    const sampleItems = [
        {
            id: 1,
            name: "Smartphone",
            category: "Mobile",
            condition: "Good",
            price: "₹1500",
            description: "Samsung Galaxy S8, minor screen scratches"
        },
        {
            id: 2,
            name: "Laptop",
            category: "Computers",
            condition: "Fair",
            price: "₹5000",
            description: "Dell Inspiron, battery needs replacement"
        }
    ];
    
    // Render inventory items
    function renderItems(items) {
        const container = document.querySelector('.items-container');
        container.innerHTML = '';
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-card';
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Condition:</strong> ${item.condition}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p>${item.description}</p>
                <div class="item-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            container.appendChild(itemElement);
        });
    }
    
    function initItemForm() {
        const formContainer = document.querySelector('#add-item');
        formContainer.innerHTML = `
            <form id="item-form">
                <div class="form-group">
                    <label for="item-name">Item Name</label>
                    <input type="text" id="item-name" required>
                </div>
                <div class="form-group">
                    <label for="item-category">Category</label>
                    <select id="item-category" required>
                        <option value="">Select Category</option>
                        <option value="Mobile">Mobile Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Speaker">Speaker</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="item-condition">Condition</label>
                    <select id="item-condition" required>
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="item-price">Price (₹)</label>
                    <input type="number" id="item-price" required>
                </div>
                <div class="form-group">
                    <label for="item-description">Description</label>
                    <textarea id="item-description" rows="3" required></textarea>
                </div>
                <button type="submit">List Item</button>
            </form>
        `;
        
        document.getElementById('item-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // In real implementation, save to localStorage/backend
            this.reset();
        });
    }
    
    function loadInventory() {
        // In real implementation, load from localStorage/backend
        renderItems(sampleItems);
    }
});
