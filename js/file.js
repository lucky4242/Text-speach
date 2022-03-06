//Dom Element
let textForm = document.querySelector("form");
let textInput = document.querySelector("#text-input");
let vioceSelect = document.querySelector("#voice-select");
let rate = document.querySelector("#rate");
let rateValue = document.querySelector("#rate-value");
let pitch = document.querySelector("#pitch");
let pitchValue = document.querySelector("#pitch-value");
// let speak = document.querySelector("#speak");

let synth = window.speechSynthesis;

//init the voices array
let voices = synth.getVoices();
if (voices.length !== 0) {
  console.log(voices);
} else {
  synth.addEventListener("voiceschanged", function () {
    voices = synth.getVoices();
    console.log(voices);
    //lets loop through voice and create an option for each one
    voices.forEach((voice) => {
      //lets create option element
      let option = document.createElement("option");
      //lets fill option with voice and language
      option.textContent = voice.name + "(" + voice.lang + ")";
      //lets set needed option atributes
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      vioceSelect.appendChild(option);
    });
  });
}
//speak
let speak = () => {
  if (textInput.value !== "") {
    // get speak text
    speakText = new SpeechSynthesisUtterance(textInput.value);
    //speak end
    speakText.onend = (e) => {
      console.log("done speaking");
    };
    //speak error
    speakText.error = (e) => {
      console.log("an Error occur");
    };
    //selected voice
    const selectedVoice =
      vioceSelect.selectedOptions[0].getAttribute("data-name");
    //lets loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    synth.speak(speakText);
  }
};
//textform submit
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});
rate.addEventListener("change", (e) => {
  rateValue.textContent = rate.value;
});
pitch.addEventListener("change", (e) => {
  pitchValue.textContent = pitch.value;
});
vioceSelect.addEventListener("change", (e) => {
  speak();
});
