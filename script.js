
// Script audio
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

// script input form
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("message-form");
    const nameInput = document.getElementById("name-input");
    const messageInput = document.getElementById("message-input");
    const messagesList = document.getElementById("messages-list");
  
    // Fungsi untuk memuat pesan dari localStorage
    const loadMessages = () => {
      const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
      storedMessages.forEach((message) => {
        const messageItem = document.createElement("div");
        messageItem.classList.add("message-item");
  
        const messageContent = `
          <p class="sender">${message.name}</p>
          <p>${message.text}</p>
        `;
        messageItem.innerHTML = messageContent;
        messagesList.appendChild(messageItem);
      });
  
      // Scroll ke bawah jika ada pesan
      if (storedMessages.length > 0) {
        messagesList.scrollTop = messagesList.scrollHeight;
      }
    };
  
    // Fungsi untuk menyimpan pesan ke localStorage
    const saveMessage = (name, message) => {
      const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
      storedMessages.push({ name, text: message }); // Tambahkan pesan baru
      localStorage.setItem("messages", JSON.stringify(storedMessages)); // Simpan kembali ke localStorage
    };
  
    // Menangani pengiriman form
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Mencegah reload halaman
  
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
  
      if (name && message) {
        const messageItem = document.createElement("div");
        messageItem.classList.add("message-item");
  
        const messageContent = `
          <p class="sender">${name}</p>
          <p>${message}</p>
        `;
        messageItem.innerHTML = messageContent;
  
        // Tambahkan pesan baru ke dalam daftar
        messagesList.appendChild(messageItem);
  
        // Simpan pesan ke localStorage
        saveMessage(name, message);
  
        // Scroll ke bawah setelah pesan baru
        messagesList.scrollTop = messagesList.scrollHeight;
  
        // Kosongkan input setelah pengiriman
        nameInput.value = "";
        messageInput.value = "";
      } else {
        alert("Nama dan pesan tidak boleh kosong!");
      }
    });
  
    // Periksa dukungan localStorage
    if (typeof Storage === "undefined") {
      alert("Browser Anda tidak mendukung penyimpanan lokal (localStorage). Pesan tidak dapat disimpan.");
      return;
    }
  
    // Muat pesan saat halaman dimuat
    loadMessages();
  });
  
