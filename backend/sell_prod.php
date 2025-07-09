<?php
session_start();
include('../db/conn.php'); // Ensure this path is correct

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // User must be logged in
    if (!isset($_SESSION['user'])) {
        die("You must be logged in to list a product.");
    }

    // Collect form data
    $userId             = $_SESSION['user']['id'];
    $deviceType         = trim($_POST['deviceType'] ?? '');
    $deviceBrand        = trim($_POST['deviceBrand'] ?? '');
    $deviceModel        = trim($_POST['deviceModel'] ?? '');
    $deviceCondition    = trim($_POST['deviceCondition'] ?? '');
    $deviceDescription  = trim($_POST['deviceDescription'] ?? '');
    $askingPrice        = floatval($_POST['askingPrice'] ?? 0);

    // Validate required fields
    if (!$deviceType || !$deviceBrand || !$deviceModel || !$deviceCondition || !$deviceDescription || $askingPrice <= 0) {
        die("All fields are required and price must be valid.");
    }

    // Upload image files
    $uploadedImages = [];
    if (!empty($_FILES['deviceImages']['name'][0])) {
        $uploadDir = '../uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        foreach ($_FILES['deviceImages']['tmp_name'] as $key => $tmpName) {
            $fileName = basename($_FILES['deviceImages']['name'][$key]);
            $fileTmp = $_FILES['deviceImages']['tmp_name'][$key];
            $fileError = $_FILES['deviceImages']['error'][$key];
            $fileSize = $_FILES['deviceImages']['size'][$key];

            // Check for upload errors
            if ($fileError === UPLOAD_ERR_OK) {
                // Optional: limit to 10MB per file
                if ($fileSize > 10 * 1024 * 1024) {
                    echo "File too large: $fileName (max 10MB)<br>";
                    continue;
                }

                $uniqueName = time() . '_' . preg_replace("/[^a-zA-Z0-9.]/", "_", $fileName);
                $targetPath = $uploadDir . $uniqueName;

                if (move_uploaded_file($fileTmp, $targetPath)) {
                    $uploadedImages[] = $targetPath;
                } else {
                    echo "Failed to move file: $fileName<br>";
                }
            } else {
                echo "Upload error for $fileName (Error code: $fileError)<br>";
            }
        }
    }

    $imagesJson = json_encode($uploadedImages);

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO listings (user_id, device_type, brand, model, device_condition, description, images, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("issssssd", $userId, $deviceType, $deviceBrand, $deviceModel, $deviceCondition, $deviceDescription, $imagesJson, $askingPrice);

    if ($stmt->execute()) {
        header("Location: ../index.php?success=1");
        exit;
    } else {
        echo "Error inserting data: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
