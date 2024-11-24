<?php
// Koneksi ke database
$servername = "localhost";
$username = "root"; // Default username untuk phpMyAdmin
$password = ""; // Default password untuk phpMyAdmin
$dbname = "undangan_digital"; // Nama database yang sudah dibuat

$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data dari form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $conn->real_escape_string($_POST['name']);
    $message = $conn->real_escape_string($_POST['message']);
    
    // Query untuk menyimpan pesan ke tabel
    $sql = "INSERT INTO messages (name, message) VALUES ('$name', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "Pesan berhasil dikirim";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Tutup koneksi
$conn->close();

// Setelah pengiriman berhasil, redirect ke halaman utama
header("Location: index.php"); // Sesuaikan dengan halaman yang sesuai
exit();
?>