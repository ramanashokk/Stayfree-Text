const button = document.getElementById("mic");
const output = document.getElementById("output");

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  button.addEventListener("click", () => {
    recognition.start();
    button.textContent = "Listening...";
  });

  recognition.onresult = (event) => {
    output.textContent =
      event.results[0][0].transcript;
    button.textContent = "🎤 Record";
  };

  recognition.onerror = () => {
    button.textContent = "🎤 Record";
  };
}
