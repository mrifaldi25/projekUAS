<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once("../../config/db.php");

$id = $_GET['id'] ?? null;

if ($id) {
    // Ambil 1 data berdasarkan ID
    $stmt = $conn->prepare("SELECT * FROM notifikasi WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if ($data) {
        echo json_encode($data);
    } else {
        echo json_encode(["success" => false, "message" => "Kritik tidak ditemukan"]);
    }
} else {
    // Ambil semua data
    $result = $conn->query("SELECT * FROM notifikasi ORDER BY id DESC");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}
