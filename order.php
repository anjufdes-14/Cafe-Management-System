<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_SESSION["user_id"])) {
        echo "User not logged in.";
        exit;
    }

    $user_id = $_SESSION["user_id"];
    $items = $_POST["items"];
    $quantities = $_POST["quantities"];
    $address = htmlspecialchars($_POST["address"]);

    $prices = [
        "espresso" => 150,
        "cappuccino" => 200,
        "mocha" => 180,
        "americano" => 140,
        "croissant" => 100,
        "chocolate brownie" => 120,
        "blueberry muffin" => 130,
        "grilled cheese sandwich" => 180
    ];

    if (count($items) !== count($quantities)) {
        echo "Mismatched items and quantities.";
        exit;
    }

    $conn = new mysqli("localhost", "root", "", "cafe_db");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO orders (user_id, item_name, quantity, total_price, address) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("isiss", $user_id, $item, $quantity, $total_price, $address);

    for ($i = 0; $i < count($items); $i++) {
        $item = htmlspecialchars($items[$i]);
        $quantity = (int)$quantities[$i];

        if (!isset($prices[$item])) {
            continue; // skip invalid items
        }

        $total_price = $quantity * $prices[$item];
        $stmt->execute();
    }

    $stmt->close();
    $conn->close();

    echo "<h2>✅ Your order has been placed!</h2><a href='order.html'>Place another order</a>";
}
?>
