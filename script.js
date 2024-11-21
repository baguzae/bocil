// document.addEventListener("DOMContentLoaded", function () {
//   const audio = document.getElementById("background-audio");

//   // Pastikan audio autoplay
//   audio.play().catch(error => {
//       console.warn("Autoplay diblokir: ", error);
//   });

//   // Opsional: Tambahkan tombol untuk memulai jika autoplay diblokir
//   const unmuteButton = document.createElement("button");
//   unmuteButton.textContent = "Putar Audio";
//   unmuteButton.style.display = "block";
//   unmuteButton.style.margin = "20px auto";
//   document.body.appendChild(unmuteButton);

//   unmuteButton.addEventListener("click", function () {
//       audio.muted = false;
//       audio.play().then(() => {
//           unmuteButton.style.display = "none"; // Sembunyikan tombol setelah audio mulai
//       });
//   });
// });