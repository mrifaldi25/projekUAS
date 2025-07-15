<?php
// ==== CORS ====
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// ==== DB ====
include_once("../../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['user_id']) && !empty($data['isi'])) {
    $stmt = $conn->prepare("INSERT INTO kritik (user_id, isi, tanggal) VALUES (?, ?, CURDATE())");
    $stmt->bind_param("is", $data['user_id'], $data['isi']);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Kritik berhasil ditambahkan"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal menambahkan kritik"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap"]);
}
?>
