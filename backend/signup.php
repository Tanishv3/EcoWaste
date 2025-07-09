<?php
session_start();
include('../db/conn.php'); // make sure this connects properly

// Sanitize and collect inputs
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';
$role = $_POST['role'] ?? 'buyer'; // default to buyer if not set

// Validate fields
if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
    die("All fields are required.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format.");
}

if ($password !== $confirmPassword) {
    die("Passwords do not match.");
}

// Check if user already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    die("Email is already registered.");
}
$stmt->close();

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $hashedPassword, $role);

if ($stmt->execute()) {
    echo "
                <script> 
                    window.alert('Signup successful!');
                    window.location.href = '../index.html';
                </script>";
} else {
    echo "
                <script> 
                    window.alert('Failed!');
                    window.location.href = '../index.html';
                </script>";
}

$stmt->close();
$conn->close();
?>
