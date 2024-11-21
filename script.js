function playMusicAndRedirect() {
  const audio = document.getElementById('birthday-audio');
  audio.play(); // Mulai memutar musik
  setTimeout(() => {
      window.location.href = "home.html"; // Redirect setelah musik dimulai
  }, 500); // Delay sedikit agar musik mulai sebelum redirect
}