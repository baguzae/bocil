<?php
// Koneksi ke database
$servername = "localhost"; // Server database
$username = "root";        // Username database
$password = "";            // Password database
$database = "database_undangan"; // Nama database

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $database);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil semua pesan dari database
$sql = "SELECT name, text, created_at FROM messages ORDER BY created_at ASC";
$result = $conn->query($sql);

// Siapkan array untuk menyimpan pesan
$messages = [];

if ($result->num_rows > 0) {
    // Tambahkan setiap baris ke array pesan
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

// Kembalikan data dalam format JSON
header('Content-Type: application/json');
echo json_encode($messages);

$conn->close();
?>