<?php
// ==== CORS ====
header("Access-Control-Allow-Origin: http://localhost:3000"); // Atau '*' untuk pengembangan
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS, DELETE"); // Pastikan POST dan OPTIONS ada
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Pastikan Content-Type ada

// Tangani preflight request (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ==== DB ====
include_once("../../config/db.php");

// Pastikan $conn adalah objek koneksi database yang valid
if (!isset($conn)) {
    error_log("Koneksi database tidak tersedia di delete.php");
    echo json_encode(["success" => false, "message" => "Koneksi database tidak tersedia."]);
    exit();
}

// Ambil data dari body request (untuk POST dengan Content-Type: application/json)
$input_data = file_get_contents("php://input");
error_log("Raw input data: " . $input_data); // Log data mentah

$data = json_decode($input_data, true);
error_log("Decoded JSON data: " . print_r($data, true)); // Log data JSON yang sudah di-decode

$id = $data['id'] ?? null; // Ambil ID dari body JSON

// Jika ID tidak ditemukan di body JSON, coba ambil dari GET (untuk Postman jika ingin pakai GET)
if (!$id) {
    $id = $_GET['id'] ?? null;
    error_log("ID from GET: " . $id);
}

error_log("Final ID to delete: " . $id); // Log ID yang akan digunakan

if ($id) {
    $stmt = $conn->prepare("DELETE FROM kritik WHERE id = ?");
    
    // Periksa apakah prepare berhasil
    if ($stmt === false) {
        error_log("Gagal menyiapkan statement: " . $conn->error);
        echo json_encode(["success" => false, "message" => "Gagal menyiapkan statement: " . $conn->error]);
        exit();
    }

    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        // Periksa apakah ada baris yang terpengaruh (berarti data berhasil dihapus)
        if ($stmt->affected_rows > 0) {
            error_log("Kritik dengan ID " . $id . " berhasil dihapus.");
            echo json_encode(["success" => true, "message" => "Kritik berhasil dihapus"]);
        } else {
            error_log("Kritik dengan ID " . $id . " tidak ditemukan di database.");
            echo json_encode(["success" => false, "message" => "Kritik dengan ID tersebut tidak ditemukan."]);
        }
    } else {
        error_log("Gagal menghapus kritik dengan ID " . $id . ": " . $stmt->error);
        echo json_encode(["success" => false, "message" => "Gagal menghapus kritik: " . $stmt->error]);
    }
    $stmt->close();
} else {
    error_log("ID kritik tidak disediakan.");
    echo json_encode(["success" => false, "message" => "ID kritik wajib disediakan."]);
}

$conn->close();
?>
