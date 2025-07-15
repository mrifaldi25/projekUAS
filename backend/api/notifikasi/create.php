<?php
header("Content-Type: application/json");
include_once("../../config/db.php");

$data = json_decode(file_get_contents("php://input"));

$isi = $data->isi ?? '';

if (!$isi) {
    echo json_encode(["success" => false, "message" => "Isi notifikasi wajib diisi"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO notifikasi (isi) VALUES (?)");
$stmt->bind_param("s", $isi);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Notifikasi berhasil ditambahkan"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menambahkan notifikasi"]);
}
