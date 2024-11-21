document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("background-audio");
  audio.muted = true; // Ini diperlukan untuk Safari autoplay
  audio.play()
      .then(() => {
          console.log("Audio playing");
      })
      .catch(error => {
          console.warn("Autoplay blocked: ", error);
      });
});

document.getElementById("unmute-audio").addEventListener("click", function () {
  const audio = document.getElementById("background-audio");
  if (audio) {
      audio.muted = false;
      audio.play()
          .then(() => console.log("Audio unmuted and playing"))
          .catch(error => console.error("Error playing audio:", error));
  }
});