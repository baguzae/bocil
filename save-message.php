<?php
// Koneksi ke database
$servername = "localhost"; // Server database
$username = "root";        // Username database (default: root)
$password = "";            // Password database (default: kosong)
$database = "database_undangan"; // Nama database

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $database);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data dari POST
$name = $_POST['name'] ?? '';
$message = $_POST['message'] ?? '';

// Validasi input
if (!empty($name) && !empty($message)) {
    // Gunakan prepared statement untuk keamanan
    $stmt = $conn->prepare("INSERT INTO messages (name, text) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $message);

    // Eksekusi statement
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Pesan berhasil disimpan!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Gagal menyimpan pesan."]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Nama dan pesan tidak boleh kosong."]);
}

$conn->close();
?>
