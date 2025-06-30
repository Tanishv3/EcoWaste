document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');

    if (mapContainer) {
        // Coordinates for New Delhi, India
        const mapCoordinates = [28.6139, 77.2090];
        
        // Initialize the map
        const map = L.map('map-container').setView(mapCoordinates, 13);

        // Add the tile layer (map background)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker
        const marker = L.marker(mapCoordinates).addTo(map);
        marker.bindPopup("<b>EcoWaste HQ</b><br>123 Green Street<br>Eco City, India").openPopup();
    }
}); 