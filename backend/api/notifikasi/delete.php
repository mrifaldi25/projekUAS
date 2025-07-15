<?php
header("Content-Type: application/json");
include_once("../../config/db.php");

$data = json_decode(file_get_contents("php://input"));
$id = $data->id ?? null;

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID tidak ditemukan"]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM notifikasi WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Notifikasi berhasil dihapus"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menghapus notifikasi"]);
}
