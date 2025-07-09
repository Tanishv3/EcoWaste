<?php
session_start();
include('../db/conn.php'); // DB connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo "<script>
        alert('Please fill all fields.');
         window.location.href = '../login.html';
         </script>";
        exit;
    }


    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Query Error: " . $conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    


    // DEBUG: check rows
    if ($result->num_rows === 0) {
        echo "<script>
        alert('User not found!'); 
        window.location.href = '../login.php';
        </script>";
    } else {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            echo "<script>
            alert('Login successful!'); 
            window.location.href = '../index.php';
            </script>";
              $_SESSION['user'] = [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ];
        } else {
            echo "<script>
            alert('Invalid password!'); 
            window.location.href = '../login.php';
            </script>";
        }
    }

    $stmt->close();
    $conn->close();
}
?>
