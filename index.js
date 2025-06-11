function caesarCipher(text, shift) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let code = char.charCodeAt(0);
      let base = code >= 65 && code <= 90 ? 65 : 97; // Uppercase or lowercase
      return String.fromCharCode(((code - base + shift) % 26) + base);
    }
    return char;
  }).join('');
}

let text;
let shift;

document.getElementById("Encrypt").onclick = function() {
    text = document.getElementById("input_box").value;
    shift = Number(document.getElementById("chiper_key").value);
    console.log(caesarCipher(text, shift));
    document.getElementById("output_box").textContent = caesarCipher(text, shift);
}

document.getElementById("decrypt").onclick = function() {
    text = document.getElementById("input_box").value;
    shift = Number(document.getElementById("chiper_key").value);
    console.log(caesarCipher(text, shift));
    document.getElementById("output_box").textContent = caesarCipher(text, -shift);
}