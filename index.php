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

// Ambil pesan dari database
$sql = "SELECT * FROM messages ORDER BY created_at DESC";
$result = $conn->query($sql);

// Menampilkan pesan
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<div class='message-item'>";
        echo "<p class='sender'>" . $row["name"] . "</p>";
        echo "<p>" . $row["message"] . "</p>";
        echo "<p><small>Pesan dikirim pada: " . $row["created_at"] . "</small></p>";
        echo "</div>";
    }
} else {
    echo "Tidak ada pesan yang terkirim.";
}

// Tutup koneksi
$conn->close();
?>