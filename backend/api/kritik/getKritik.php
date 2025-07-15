<?php
// ==== CORS ====
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

// ==== DB ====
include_once("../../config/db.php");

// Ambil ID jika ada
$id = $_GET['id'] ?? null;

if ($id) {
    $stmt = $conn->prepare("SELECT k.id, k.user_id, u.name, k.isi, k.tanggal 
                            FROM kritik k 
                            JOIN users u ON k.user_id = u.id 
                            WHERE k.id = ?");
    $stmt->bind_param("i", $id);
} else {
    $stmt = $conn->prepare("SELECT k.id, k.user_id, u.name, k.isi, k.tanggal 
                            FROM kritik k 
                            JOIN users u ON k.user_id = u.id");
}

$stmt->execute();
$result = $stmt->get_result();
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
