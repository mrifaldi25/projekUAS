<?php
// ==== CORS ====
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

// ==== DB ====
include_once("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['id']) && !empty($data['isi'])) {
    $stmt = $conn->prepare("UPDATE kritik SET isi = ? WHERE id = ?");
    $stmt->bind_param("si", $data['isi'], $data['id']);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Kritik berhasil diperbarui"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal memperbarui kritik"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
}
?>
