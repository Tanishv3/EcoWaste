<?php
include 'db/conn.php';

$sql = "SELECT * FROM listings ORDER BY created_at DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketplace - EcoWaste</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<style>
    .product-image {
    width: 100%;
    aspect-ratio: 4 / 3; /* Maintains consistent ratio */
    overflow: hidden;
    border-radius: 12px;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Crop to fill container */
    border-radius: 12px;
}

</style>
<body>
    <!-- Header Component Placeholder -->
     <?php include 'components/header.php'; ?>

    <section class="page-header">
        <div class="container">
            <div class="page-header-content">
                <h1 class="page-title">Marketplace</h1>
                <p class="page-subtitle">Browse and buy pre-owned electronics sustainably</p>
                <nav class="breadcrumb">
                    <a href="index.html">Home</a>
                    <span>/</span>
                    <span>Marketplace</span>
                </nav>
            </div>
        </div>
    </section>

    <section class="marketplace-section">
        <div class="container">
    <div class="marketplace-grid">
        <?php if ($result->num_rows > 0): ?>
            <?php while($row = $result->fetch_assoc()): 
                $images = json_decode($row['images'], true);
                $firstImage = !empty($images) ? $images[0] : 'assets/img/placeholder.png';
                ?>
                <div class="product-card">
                    <div class="product-image">
                        <img src="<?php echo htmlspecialchars($firstImage); ?>" alt="Product Image">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">
                            <?php echo htmlspecialchars($row['brand'] . ' ' . $row['model']); ?>
                        </h3>
                        <p class="product-description">
                            <?php echo htmlspecialchars($row['description']); ?>
                        </p>
                        <div class="product-meta">
                            <span class="product-price">₹<?php echo number_format($row['price']); ?></span>
                            <span class="product-location">
                                <i class="fas fa-map-marker-alt"></i> 
                                <?php echo htmlspecialchars($row['location'] ?? 'Unknown'); ?>
                            </span>
                        </div>
                        <form action="product.php" method="get">
                            <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                            <button type="submit" class="btn btn-primary">View Details</button>
                        </form>
                    </div>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p>No products listed yet.</p>
        <?php endif; ?>
    </div>
</div>
    </section>

    <!-- Footer Component Placeholder -->
    <div id="footer-placeholder"></div>

    <script src="js/components.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
