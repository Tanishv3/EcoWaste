<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - EcoWaste</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header Component Placeholder -->
    <?php include 'components/header.php'; ?>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <div class="page-header-content">
                <h1 class="page-title">Driving a Circular Economy</h1>
                <p class="page-subtitle">We believe in a future where e-waste is a resource, not a problem.</p>
                <nav class="breadcrumb">
                    <a href="index.html">Home</a>
                    <span>/</span>
                    <span>About</span>
                </nav>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-story-section">
        <div class="container">
            <div class="about-story-content">
                <div class="about-story-text">
                    <h2 class="section-title">Our Story</h2>
                    <p>EcoWaste started with a simple idea: what if we could see the potential in our old electronics instead of seeing waste? In a world producing millions of tons of e-waste annually, we saw an opportunity to create a platform that connects people who have unused devices with those who can give them a new life. Our mission is to foster a circular economy, reduce our environmental footprint, and empower individuals to make sustainable choices.</p>
                </div>
                <div class="about-story-visual">
                    <img src="https://images.unsplash.com/photo-1581333143997-908427508458?q=80&w=1974&auto=format&fit=crop" alt="Recycling e-waste">
                </div>
            </div>
        </div>
    </section>

    <!-- Timeline Section -->
    <section class="timeline-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Our Journey</h2>
                <p class="section-subtitle">Key milestones in our mission to combat e-waste</p>
            </div>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>2023 - The Idea</h3>
                        <p>The concept of EcoWaste was born out of a passion for sustainability and technology.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>2024 - Platform Launch</h3>
                        <p>Our platform officially launched, connecting the first sellers and buyers.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>10,000+ Devices Recycled</h3>
                        <p>We celebrated the milestone of helping over 10,000 devices find a new purpose.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>Future - Global Expansion</h3>
                        <p>We aim to take our platform global, creating a worldwide network for e-waste reuse.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Team Section -->
    <section class="team-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Meet the Team</h2>
                <p class="section-subtitle">The passionate individuals behind EcoWaste</p>
            </div>
            <div class="team-grid">
                <div class="team-member-card">
                    <div class="team-member-photo">
                        <img src="https://via.placeholder.com/250x250/a3d5ba/2c3e2f?text=Priya" alt="Team Member 1">
                    </div>
                    <div class="team-member-info">
                        <h4>Priya Sharma</h4>
                        <p>Founder & CEO</p>
                    </div>
                </div>
                <div class="team-member-card">
                    <div class="team-member-photo">
                        <img src="https://via.placeholder.com/250x250/a3d5ba/2c3e2f?text=Rohan" alt="Team Member 2">
                    </div>
                    <div class="team-member-info">
                        <h4>Rohan Mehta</h4>
                        <p>Lead Developer</p>
                    </div>
                </div>
                <div class="team-member-card">
                    <div class="team-member-photo">
                        <img src="https://via.placeholder.com/250x250/a3d5ba/2c3e2f?text=Aisha" alt="Team Member 3">
                    </div>
                    <div class="team-member-info">
                        <h4>Aisha Khan</h4>
                        <p>Head of Community</p>
                    </div>
                </div>
                <div class="team-member-card">
                    <div class="team-member-photo">
                        <img src="https://via.placeholder.com/250x250/a3d5ba/2c3e2f?text=Vikram" alt="Team Member 4">
                    </div>
                    <div class="team-member-info">
                        <h4>Vikram Singh</h4>
                        <p>Sustainability Expert</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Ready to Make a Difference?</h2>
                <p>Join thousands of users who are already making an impact through responsible e-waste management.</p>
                <div class="cta-buttons">
                    <a href="sell.html" class="btn btn-primary btn-large">
                        <i class="fas fa-plus"></i>
                        Start Selling
                    </a>
                    <a href="marketplace.html" class="btn btn-outline btn-large">
                        <i class="fas fa-search"></i>
                        Browse Marketplace
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer Component Placeholder -->
    <div id="footer-placeholder"></div>

    <!-- Modals -->
    <!-- Login Modal -->
    <div class="modal" id="loginModal">
        <div class="modal-content">
            <span class="close-btn" data-modal="loginModal">&times;</span>
            <h2>Sign In</h2>
            <form id="loginForm">
                <div class="form-group">
                    <input type="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" required>
                </div>
                <button type="submit" class="btn btn-primary">Sign In</button>
            </form>
            <p class="switch-form">Don't have an account? <a href="#" id="switchToSignup">Sign Up</a></p>
        </div>
    </div>

    <!-- Signup Modal -->
    <div class="modal" id="signupModal">
        <div class="modal-content">
            <span class="close-btn" data-modal="signupModal">&times;</span>
            <h2>Join EcoWaste</h2>
            <form id="signupForm">
                <div class="form-group">
                    <input type="text" placeholder="Full Name" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Confirm Password" required>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
            <p class="switch-form">Already have an account? <a href="#" id="switchToLogin">Sign In</a></p>
        </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast" id="toast">
        <div class="toast-content">
            <span class="toast-message"></span>
            <button class="toast-close">&times;</button>
        </div>
    </div>

    <!-- Scripts -->
    <script src="js/components.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
