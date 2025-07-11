<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sell Your Device - EcoWaste</title>
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
                <h1 class="page-title">Sell Your Device</h1>
                <p class="page-subtitle">Turn your unused electronics into cash while helping the environment</p>
                <nav class="breadcrumb">
                    <a href="index.html">Home</a>
                    <span>/</span>
                    <span>Sell Device</span>
                </nav>
            </div>
        </div>
    </section>

    <!-- Sell Device Section -->
    <section class="sell-section">
        <div class="container">
            <div class="sell-content">
                <div class="sell-info">
                    <h2 class="section-title">How It Works</h2>
                    <div class="sell-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h3>List Your Device</h3>
                                <p>Provide details about your electronic device and its condition</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h3>Receive Bids</h3>
                                <p>Buyers will place bids on your device based on its specifications</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h3>Complete Sale</h3>
                                <p>Accept the best offer and arrange pickup or delivery</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="sell-benefits">
                        <h3>Why Sell With Us?</h3>
                        <ul>
                            <li><i class="fas fa-check-circle"></i> Get the best price for your device</li>
                            <li><i class="fas fa-check-circle"></i> Help reduce electronic waste</li>
                            <li><i class="fas fa-check-circle"></i> Safe and secure transactions</li>
                            <li><i class="fas fa-check-circle"></i> Free listing and easy process</li>
                        </ul>
                    </div>
                </div>
                
                <div class="sell-form-container">
                    <div class="form-progress-bar">
                        <div class="progress-step active" data-step="1">
                            <div class="step-icon">1</div>
                            <div class="step-label">Details</div>
                        </div>
                        <div class="progress-step" data-step="2">
                            <div class="step-icon">2</div>
                            <div class="step-label">Condition</div>
                        </div>
                        <div class="progress-step" data-step="3">
                            <div class="step-icon">3</div>
                            <div class="step-label">Photos & Price</div>
                        </div>
                    </div>

                    <form class="sell-form" id="sellForm" action="backend/sell_prod.php" method="post" enctype="multipart/form-data">

                        <!-- Step 1: Device Details -->
                        <div class="form-step active" data-step="1">
                            <h3 class="step-title">Tell us about your device</h3>
                            <div class="form-group">
                                <label for="deviceType">Device Type</label>
                                <select id="deviceType" name="deviceType" required>
                                    <option value="">Select device type</option>
                                    <option value="mobile">Mobile Phone</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="tablet">Tablet</option>
                                    <option value="smartwatch">Smartwatch</option>
                                    <option value="headphones">Headphones</option>
                                    <option value="gaming">Gaming Console</option>
                                    <option value="camera">Camera</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="deviceBrand">Brand</label>
                                <input type="text" id="deviceBrand" name="deviceBrand" placeholder="e.g., Apple, Samsung, Sony" required>
                            </div>
                            <div class="form-group">
                                <label for="deviceModel">Model</label>
                                <input type="text" id="deviceModel" name="deviceModel" placeholder="e.g., iPhone 13, Galaxy S21" required>
                            </div>
                        </div>

                        <!-- Step 2: Condition & Description -->
                        <div class="form-step" data-step="2">
                            <h3 class="step-title">Describe its condition</h3>
                            <div class="form-group">
                                <label for="deviceCondition">Condition</label>
                                <select id="deviceCondition" name="deviceCondition" required>
                                    <option value="">Select condition</option>
                                    <option value="excellent">Excellent - Like new</option>
                                    <option value="good">Good - Minor wear</option>
                                    <option value="fair">Fair - Some issues</option>
                                    <option value="poor">Poor - Major issues</option>
                                    <option value="broken">Broken - Not working</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="deviceDescription">Description</label>
                                <textarea id="deviceDescription" name="deviceDescription" placeholder="Describe the device condition, any defects, included accessories..." rows="4" required></textarea>
                            </div>
                        </div>

                        <!-- Step 3: Photos & Price -->
                        <div class="form-step" data-step="3">
                            <h3 class="step-title">Upload Photos & Set Price</h3>
                            <div class="form-group">
                                <label for="deviceImages">Upload Images</label>
                                <div class="file-upload-area" id="fileUploadArea">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Click to upload or drag and drop</p>
                                    <p class="file-types">PNG, JPG, JPEG up to 10MB</p>
                                    <input type="file" id="deviceImages" name="deviceImages[]" multiple accept="image/*" hidden>
                                </div>
                                <div class="uploaded-images" id="uploadedImages"></div>
                            </div>
                            <div class="form-group">
                                <label for="askingPrice">Asking Price (₹)</label>
                                <input type="number" id="askingPrice" name="askingPrice" placeholder="Enter your expected price" min="0" required>
                            </div>
                        </div>

                        <div class="form-navigation">
                            <button type="button" class="btn btn-secondary" id="prevBtn" style="display: none;">Previous</button>
                            <button type="button" class="btn btn-primary" id="nextBtn">Next</button>
                            <button type="submit" class="btn btn-primary" id="submitBtn" style="display: none;">List Device</button>
                        </div>
                    </form>
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
    <script src="js/sell.js"></script>
</body>
</html>
