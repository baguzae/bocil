document.getElementById("open-invitation").addEventListener("click", function () {
  const audio = document.getElementById("background-music");
  
  // Pastikan audio tidak dalam keadaan muted
  audio.muted = false;

  // Mulai audio
  audio.play()
      .then(() => {
          console.log("Audio playing successfully.");
      })
      .catch(error => {
          console.error("Audio play failed:", error);
      });

  // Berpindah halaman
  setTimeout(() => {
      window.location.href = "halaman-undangan.html";
  }, 500); // Delay untuk efek perpindahan
});