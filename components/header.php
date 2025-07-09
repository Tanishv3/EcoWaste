<?php
session_start();
$isLoggedIn = isset($_SESSION['user']);
?>
<style>
    #signOutBtn {
    display: block;
    padding: 10px 16px;
    margin-top: 10px;
    background-color: #e63946;  /* red color */
    color: white;
    text-align: center;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.3s;
    font-weight: 500;
}

#signOutBtn:hover {
    background-color: #c62828;
    color: #fff;
}

</style>
<!-- Header Component -->
<header class="header">
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <i class="fas fa-recycle logo-icon"></i>
                <span class="logo-text">EcoWaste</span>
            </div>
            <ul class="nav-menu">
                <li class="nav-item"><a href="index.php" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="marketplace.php" class="nav-link">Marketplace</a></li>
                <li class="nav-item"><a href="sell.php" class="nav-link">Sell Device</a></li>
                <li class="nav-item"><a href="about.php" class="nav-link">About</a></li>
                <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
            </ul>
            <div class="nav-actions">
 
    </button>
    <?php if (!$isLoggedIn): ?>
        <!-- Show Sign In / Up -->
        <button class="btn btn-primary" id="signInUpBtn">Sign In / Up</button>
    <?php else: ?>
       <a href="../backend/logout.php" id="signOutBtn"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
    <?php endif; ?>
</div>

            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>
</header>

<!-- Auth Modal embedded for global availability -->
<div id="auth-modal" class="modal">
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <!-- <div class="auth-tabs">
            <button class="tab-btn active" data-tab="signin">Sign In</button>
            <button class="tab-btn" data-tab="signup">Sign Up</button>
        </div> -->
        <!-- Role Selection -->
        
        <!-- Sign In Tab -->
        <div id="signin-tab" class="tab-content">
            <h2>Welcome Back</h2>
            <form id="signin-form" action="../backend/login.php" method="post">
                <div class="form-group">
                    <label for="signin-email">Email</label>
                    <input type="email" name="email" id="signin-email" required>
                </div>
                <div class="form-group">
                    <label for="signin-password">Password</label>
                    <input type="password" name="password" id="signin-password" required>
                </div>
                <p>Don't have an account? <a class="tab-btn active" data-tab="signup">Sign Up</a></p>
                <button type="submit" class="btn btn-primary">Sign In</button>
            </form>
        </div>
        <!-- Sign Up Tab -->
        <div id="signup-tab" class="tab-content" style="display:none;">
            <h2>Join EcoWaste</h2>
            <form id="signup-form" action="../backend/signup.php" method="post">
                <div class="form-group">
                    <label for="signup-name">Full Name</label>
                    <input type="text" id="signup-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="signup-email">Email</label>
                    <input type="email" id="signup-email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="signup-password">Password</label>
                    <input type="password" id="signup-password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="signup-confirm-password">Confirm Password</label>
                    <input type="password" id="signup-confirm-password" name="confirmPassword" required>
                </div>
                <div class="role-selection">
                    <div class="role-options">
                        <label>What Are You Looking For?</label><br>
                        <label>
                            <input type="radio" name="role" value="buyer" checked>
                            Buyer
                        </label>
                        <label>
                            <input type="radio" name="role" value="seller">
                            Seller
                        </label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
                <p>Already have an account? <a class="tab-btn" data-tab="signin">Log In</a></p>
            </form>

        </div>
    </div>
</div>
