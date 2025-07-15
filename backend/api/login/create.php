<?php
header("Content-Type: application/json");
include_once("../../config/db.php");

$data = json_decode(file_get_contents("php://input"));

$name = $data->name ?? '';
$email = $data->email ?? '';
$password = $data->password ?? '';
$role = $data->role ?? 'user';

if (!$name || !$email || !$password || !$role) {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
    exit();
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())");
$stmt->bind_param("ssss", $name, $email, $hashedPassword, $role);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User berhasil ditambahkan"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menambahkan user"]);
}
