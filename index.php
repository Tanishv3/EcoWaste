<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoWaste - Sustainable E-Waste Solutions</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header Component Placeholder -->
   <?php include 'components/header.php'; ?>
    
    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-background"></div>
        <canvas id="hero-canvas" class="hero-particles"></canvas>
        <div class="hero-content">
            <div class="hero-text">
                <h1 class="hero-title">
                    Turn Your <span class="gradient-text">E-Waste</span> Into
                    <span class="typewriter-text"></span>
                </h1>
                <p class="hero-description">
                    Connect with buyers who see value in your broken or unwanted electronics.
                    Promote sustainability while earning money through our innovative platform.
                </p>
                <div class="hero-buttons">
                    <a href="sell.html" class="btn btn-primary btn-large">
                        <i class="fas fa-plus"></i>
                        Start Selling
                    </a>
                    <a href="sell.html" class="btn btn-outline btn-large">
                        <i class="fas fa-search"></i>
                        Browse Devices
                    </a>
                </div>
            </div>
            <div class="hero-visual">
                <div class="floating-devices">
                    <div class="device-icon phone"><i class="fas fa-mobile-alt"></i></div>
                    <div class="device-icon laptop"><i class="fas fa-laptop"></i></div>
                    <div class="device-icon headphones"><i class="fas fa-headphones"></i></div>
                    <div class="device-icon tablet"><i class="fas fa-tablet-alt"></i></div>
                    <div class="device-icon camera"><i class="fas fa-camera"></i></div>
                </div>
            </div>
        </div>
        <div class="scroll-indicator">
            <div class="scroll-arrow"></div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number" data-target="10000">0</div>
                    <div class="stat-label">Devices Recycled</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-target="500">0</div>
                    <div class="stat-label">Active Buyers</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-target="2500">0</div>
                    <div class="stat-label">Happy Sellers</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-target="50000">0</div>
                    <div class="stat-label">Tons CO₂ Saved</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-target="95">0</div>
                    <div class="stat-label">Success Rate %</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Preview Section -->
    <section class="quick-preview-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">How It Works</h2>
                <p class="section-subtitle">Simple steps to turn your e-waste into value</p>
            </div>
            <div class="preview-grid">
                <div class="preview-card">
                    <div class="preview-icon">
                        <i class="fas fa-plus-circle"></i>
                    </div>
                    <h3>List Your Device</h3>
                    <p>Upload photos and details of your electronic device</p>
                    <a href="sell.html" class="btn btn-outline">Start Selling</a>
                </div>
                <div class="preview-card">
                    <div class="preview-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>Browse Devices</h3>
                    <p>Discover electronics available for purchase or bid</p>
                    <a href="sell.html" class="btn btn-outline">Explore Items</a>
                </div>
                <div class="preview-card">
                    <div class="preview-icon">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <h3>Learn More</h3>
                    <p>Understand our mission and environmental impact</p>
                    <a href="about.html" class="btn btn-outline">About Us</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Buyer Categories Section -->
    <section class="buyer-categories-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Who Buys E-Waste?</h2>
                <p class="section-subtitle">A diverse community of buyers is waiting for your devices</p>
            </div>
            <div class="buyer-categories-grid">
                <div class="buyer-category-card">
                    <div class="buyer-category-icon"><i class="fas fa-tools"></i></div>
                    <h3>Repair Shops</h3>
                    <p>Technicians looking for spare parts to repair other devices.</p>
                </div>
                <div class="buyer-category-card">
                    <div class="buyer-category-icon"><i class="fas fa-paint-brush"></i></div>
                    <h3>Artists & Tinkerers</h3>
                    <p>Creatives who use electronic components for art or new inventions.</p>
                </div>
                <div class="buyer-category-card">
                    <div class="buyer-category-icon"><i class="fas fa-school"></i></div>
                    <h3>Educational Institutions</h3>
                    <p>Schools and colleges that use old electronics for learning purposes.</p>
                </div>
                <div class="buyer-category-card">
                    <div class="buyer-category-icon"><i class="fas fa-recycle"></i></div>
                    <h3>Certified Recyclers</h3>
                    <p>Professionals who safely extract valuable materials and dispose of hazardous components.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer Component Placeholder -->
    <div id="footer-placeholder"></div>

    <!-- Scripts -->
    <script src="js/components.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
