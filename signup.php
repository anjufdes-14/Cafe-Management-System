<?php
$conn = new mysqli("localhost", "root", "", "cafe_db");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Encrypt password

    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        // Show success message and redirect using JavaScript
        echo "<script>
            alert('Signup successful! Please login.');
            window.location.href = 'login.html';
        </script>";
    } else {
        // Show error and stay on the page
        echo "<script>
            alert('Signup failed: Username may already exist.');
            window.history.back();
        </script>";
    }

    $stmt->close();
}
$conn->close();
?>
