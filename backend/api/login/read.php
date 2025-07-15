<?php
header("Content-Type: application/json");
include_once("../../config/db.php");

$id = $_GET['id'] ?? null;

if ($id) {
    // Ambil 1 user saja
    $stmt = $conn->prepare("SELECT id, name, email, role, created_at FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if ($data) {
        echo json_encode(["success" => true, "data" => $data]);
    } else {
        echo json_encode(["success" => false, "message" => "User tidak ditemukan"]);
    }

    $stmt->close();
} else {
    // Ambil semua user
    $result = $conn->query("SELECT id, name, email, role, created_at FROM users");
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode(["success" => true, "data" => $users]);
}
