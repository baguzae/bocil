
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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("message-form");
  const nameInput = document.getElementById("name-input");
  const messageInput = document.getElementById("message-input");
  const messagesList = document.getElementById("messages-list");

  // Fungsi untuk memuat pesan dari server
  const loadMessages = () => {
      fetch("get_messages.php") // Ganti dengan file PHP untuk mengambil pesan
          .then(response => response.json())
          .then(messages => {
              messagesList.innerHTML = ""; // Kosongkan pesan lama

              messages.forEach((message) => {
                  const messageItem = document.createElement("div");
                  messageItem.classList.add("message-item");

                  const messageContent = `
                    <p class="sender">${message.name}</p>
                    <p>${message.message}</p>
                  `;
                  messageItem.innerHTML = messageContent;
                  messagesList.appendChild(messageItem);
              });

              // Scroll ke bawah setelah pesan baru
              if (messages.length > 0) {
                  messagesList.scrollTop = messagesList.scrollHeight;
              }
          })
          .catch(error => console.error("Error loading messages:", error));
  };

  // Fungsi untuk mengirim pesan ke server
  const sendMessage = (name, message) => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("message", message);

      fetch("submit_message.php", { // Ganti dengan file PHP untuk mengirim pesan
          method: "POST",
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              // Pesan berhasil disimpan, muat pesan lagi
              loadMessages();
          } else {
              alert(data.message);
          }
      })
      .catch(error => console.error("Error sending message:", error));
  };

  // Menangani pengiriman form
  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Mencegah reload halaman

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

      if (name && message) {
          sendMessage(name, message); // Kirim pesan ke server
          nameInput.value = "";
          messageInput.value = "";
      } else {
          alert("Nama dan pesan tidak boleh kosong!");
      }
  });

  // Muat pesan saat halaman dimuat
  loadMessages();
});
