<?php
header("Content-Type: application/json");
include_once("../../config/db.php");

$data = json_decode(file_get_contents("php://input"));

$id = $data->id ?? null;
$name = $data->name ?? '';
$email = $data->email ?? '';
$role = $data->role ?? '';

if (!$id || !$name || !$email || !$role) {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
    exit();
}

$stmt = $conn->prepare("UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?");
$stmt->bind_param("sssi", $name, $email, $role, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User berhasil diperbarui"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal memperbarui user"]);
}
