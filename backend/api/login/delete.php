<?php
header("Content-Type: application/json");
include_once("../../config/db.php");

// Ambil data JSON
$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? null;

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID tidak dikirim"]);
    exit();
}

// Cek apakah user dengan ID itu ada dulu
$cek = $conn->prepare("SELECT id FROM users WHERE id = ?");
$cek->bind_param("i", $id);
$cek->execute();
$cek->store_result();

if ($cek->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User tidak ditemukan"]);
    $cek->close();
    exit();
}
$cek->close();

// Lanjutkan proses DELETE
$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User berhasil dihapus"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menghapus user"]);
}
$stmt->close();
