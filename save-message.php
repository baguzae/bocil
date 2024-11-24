<?php
// Koneksi ke database
$conn = new mysqli("localhost", "root", "", "undangan_digital");

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Pastikan request adalah POST dan data yang dibutuhkan ada
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['name']) && isset($_POST['message'])) {
    // Ambil data dari request dan sanitasi
    $name = trim($_POST['name']);
    $message = trim($_POST['message']);

    // Pastikan input tidak kosong
    if (empty($name) || empty($message)) {
        echo json_encode(["success" => false, "message" => "Nama dan pesan tidak boleh kosong."]);
        exit;
    }

    // Insert pesan ke database menggunakan prepared statement
    $sql = "INSERT INTO messages (name, message) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $name, $message);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Pesan berhasil disimpan."]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal menyimpan pesan."]);
    }

    // Tutup statement dan koneksi
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Data tidak valid atau metode request tidak sesuai."]);
}

// Tutup koneksi database
$conn->close();
?>