<?php
header("Content-Type: application/json");
include_once("../../config/db.php");

// Ambil data dari body request
$data = json_decode(file_get_contents("php://input"));

$id = $data->id ?? '';
$isi = $data->isi ?? '';

// Validasi
if (!$id || !$isi) {
    echo json_encode(["success" => false, "message" => "ID dan isi notifikasi wajib diisi"]);
    exit();
}

// Siapkan dan jalankan query UPDATE
$stmt = $conn->prepare("UPDATE notifikasi SET isi = ? WHERE id = ?");
$stmt->bind_param("si", $isi, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Notifikasi berhasil diupdate"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal mengupdate notifikasi"]);
}
?>
