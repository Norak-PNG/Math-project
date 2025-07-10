// Mobile Menu Toggle
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

// Close mobile menu when clicking on a nav link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('mobile-menu-open')) {
            navMenu.classList.remove('mobile-menu-open');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });
});

// Caesar Cipher Functions
function caesarCipher(text, shift) {
    if (!text) return ''; // Return empty string if no input
    
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            const shifted = ((code - base + shift + 26) % 26) + base;
            return String.fromCharCode(shifted);
        }
        return char; // Return non-alphabetic characters as-is
    }).join('');
}

// Encrypt button
document.querySelector('.btn1.encrypt').addEventListener('click', function() {
    const text = document.getElementById('caesarText').value;
    const shift = parseInt(document.getElementById('caesarKey').value) || 0;
    const encrypted = caesarCipher(text, shift);
    document.getElementById('caesarResult').textContent = encrypted;
});

// Decrypt button
document.querySelector('.btn2.decrypt').addEventListener('click', function() {
    const text = document.getElementById('caesarText').value;
    const shift = parseInt(document.getElementById('caesarKey').value) || 0;
    const decrypted = caesarCipher(text, -shift); // Use negative shift for decryption
    document.getElementById('caesarResult').textContent = decrypted;
});

// RSA Encryption Functions
function gcd(a, b) {
    while (b !== 0) [a, b] = [b, a % b];
    return a;
}

function modInverse(e, phi) {
    let [a, b] = [phi, e];
    let [x0, x1] = [0, 1];
    
    while (b !== 0) {
        const q = Math.floor(a / b);
        [a, b] = [b, a % b];
        [x0, x1] = [x1, x0 - q * x1];
    }
    
    return x0 < 0 ? x0 + phi : x0;
}

function modPow(base, exp, mod) {
    if (mod === 1) return 0;
    let result = 1;
    base = base % mod;
    
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    
    return result;
}

let rsa_n, rsa_e, rsa_d;

document.querySelector(".btnG.generate").addEventListener("click", () => {
    const p = parseInt(document.getElementById("rsaP").value);
    const q = parseInt(document.getElementById("rsaQ").value);
    const rsaPublicKey = document.getElementById("rsaPublicKey");
    const rsaPrivateKey = document.getElementById("rsaPrivateKey");

    // Input validation
    if (!p || !q || p === q || p < 2 || q < 2) {
        alert("Please enter two distinct prime numbers greater than 1.");
        return;
    }

    // Check if numbers are prime (basic check)
    function isPrime(num) {
        for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
            if (num % i === 0) return false;
        }
        return num > 1;
    }

    if (!isPrime(p) || !isPrime(q)) {
        alert("Please enter valid prime numbers.");
        return;
    }

    rsa_n = p * q;
    const phi = (p - 1) * (q - 1);
    
    // Find suitable e (public exponent)
    rsa_e = 3;
    while (rsa_e < phi) {
        if (gcd(rsa_e, phi) === 1) break;
        rsa_e++;
    }

    if (rsa_e >= phi) {
        alert("Could not find suitable public exponent. Try different primes.");
        return;
    }

    rsa_d = modInverse(rsa_e, phi);
    
    // Update UI
    rsaPublicKey.innerHTML = `n: ${rsa_n}<br>e: ${rsa_e}`;
    rsaPrivateKey.innerHTML = `d: ${rsa_d}`;
    
    // Clear previous results
    document.getElementById("rsaEncrypted").textContent = "Encrypted output will appear here.";
    document.getElementById("rsaDecrypted").textContent = "Decrypted output will appear here.";
});

document.querySelector(".btnE.encrypt").addEventListener("click", () => {
    const msg = document.getElementById("rsaText").value;
    
    if (!rsa_e || !rsa_n) {
        alert("Please generate keys first!");
        return;
    }
    
    if (!msg) {
        alert("Please enter a message to encrypt!");
        return;
    }
    
    const encrypted = Array.from(msg)
        .map(char => modPow(char.charCodeAt(0), rsa_e, rsa_n))
        .join(",");
    
    document.getElementById("rsaEncrypted").textContent = encrypted;
    document.getElementById("rsaDecrypted").textContent = "Decrypted output will appear here.";
});

document.querySelector(".btnD.decrypt").addEventListener("click", () => {
    const cipherText = document.getElementById("rsaEncrypted").textContent;
    
    if (!rsa_d || !rsa_n) {
        alert("Please generate keys first!");
        return;
    }
    
    if (!cipherText || cipherText === "Encrypted output will appear here.") {
        alert("Please encrypt a message first!");
        return;
    }
    
    try {
        const decrypted = cipherText
            .split(",")
            .map(c => {
                const num = parseInt(c.trim());
                if (isNaN(num)) throw new Error("Invalid ciphertext");
                return String.fromCharCode(modPow(num, rsa_d, rsa_n));
            })
            .join("");
        
        document.getElementById("rsaDecrypted").textContent = decrypted;
    } catch (error) {
        alert("Error decrypting message: " + error.message);
    }
});

// AOS initialization
AOS.init({
    duration: 800,
    offset: 100,
    easing: 'ease-in-out',
    once: true // Animations only happen once
});

// Particle animation for hero section
function createParticles(containerId, count = 30) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles('heroParticles', 40);
    createParticles('footerParticles', 20);
});
