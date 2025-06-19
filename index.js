const navMenu = document.getElementById('navMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const menuIcon = document.getElementById('menuIcon');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-menu-open');
            
            // Toggle between bars and xmark icons
            if (navMenu.classList.contains('mobile-menu-open')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });
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
