document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("background-music");
  const musicButton = document.getElementById("music-control");
  const musicIcon = document.getElementById("music-icon");

  // Deteksi apakah browser adalah Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isSafari) {
      // Safari: Tampilkan tombol musik dan set audio manual
      audio.autoplay = false;
      audio.muted = false;
      musicButton.style.display = "flex";

      musicButton.addEventListener("click", function () {
          if (audio.paused) {
              audio.play();
              musicIcon.classList.remove("fa-music");
              musicIcon.classList.add("fa-pause");
          } else {
              audio.pause();
              musicIcon.classList.remove("fa-pause");
              musicIcon.classList.add("fa-music");
          }
      });
  } else {
      // Browser lain: Auto-play
      audio.muted = false;
      audio.play().catch((error) => {
          console.error("Autoplay gagal:", error);
      });
  }
});
