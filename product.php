<?php
include 'db/conn.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
    echo "Invalid product ID.";
    exit;
}

$sql = "SELECT * FROM listings WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "Product not found.";
    exit;
}

$product = $result->fetch_assoc();
$images = json_decode($product['images'], true);
$mainImage = !empty($images) ? $images[0] : 'assets/img/placeholder.png';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($product['brand'] . ' ' . $product['model']); ?> - Product Details</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }
        .product-detail-container {
            max-width: 1100px;
            margin: 110px auto 40px auto; /* Top margin added */
            padding: 20px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 6px 16px rgba(0,0,0,0.1);
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
        }


        .product-images {
            flex: 1 1 400px;
        }

        .product-images img#mainPreview {
            width: 100%;
            height: 100%;
            max-height: 400px;
            border-radius: 12px;
            object-fit: cover;
        }

        .extra-images {
            display: flex;
            gap: 12px;
            margin-top: 16px;
        }

        .extra-images img {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 6px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: border 0.2s;
        }

        .extra-images img:hover {
            border-color: #2d8659;
        }

        .product-details {
            flex: 1 1 500px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .product-details h2 {
            margin: 0;
            font-size: 32px;
            color: #222;
        }

        .product-meta {
            margin: 16px 0;
            color: #555;
            font-size: 16px;
        }

        .product-meta span {
            display: block;
            margin-bottom: 6px;
        }

        .product-price {
            font-size: 24px;
            font-weight: bold;
            color: #2d8659;
            margin-top: 8px;
        }

        .product-details p {
            margin-top: 20px;
            line-height: 1.6;
            color: #444;
        }

        .btn-back {
            display: inline-block;
            margin-top: 30px;
            background-color: #2d8659;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.3s;
        }

        .btn-back:hover {
            background-color: #246b4a;
        }

        @media (max-width: 768px) {
            .product-detail-container {
                flex-direction: column;
                padding: 16px;
            }

            .product-images,
            .product-details {
                flex: 1 1 100%;
            }

            .product-details h2 {
                font-size: 26px;
            }

            .product-price {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>

<?php include 'components/header.php'; ?>

<div class="product-detail-container">
    <div class="product-images">
        <img id="mainPreview" src="<?php echo htmlspecialchars($mainImage); ?>" alt="Product">
        <?php if (count($images) > 1): ?>
        <div class="extra-images">
            <?php foreach ($images as $img): ?>
                <img src="<?php echo htmlspecialchars($img); ?>" onclick="document.getElementById('mainPreview').src=this.src;">
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
    <div class="product-details">
        <h2><?php echo htmlspecialchars($product['brand'] . ' ' . $product['model']); ?></h2>
        <div class="product-meta">
            <span><i class="fas fa-wrench"></i> Condition: <?php echo ucfirst($product['device_condition']); ?></span>
            <span><i class="fas fa-tag"></i> Type: <?php echo ucfirst($product['device_type']); ?></span>
            <span class="product-price">₹<?php echo number_format($product['price']); ?></span>
        </div>
        <p><?php echo nl2br(htmlspecialchars($product['description'])); ?></p>
        <a href="index.php" class="btn-back"><i class="fas fa-arrow-left"></i> Back to Listings</a>
    </div>
    
</div>
 <div id="footer-placeholder"></div>

    <script src="js/components.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
