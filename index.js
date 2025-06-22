function caesarCipher(text, shift) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      let code = char.charCodeAt(0);
      let base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    }
    return char;
  }).join('');
}

function monoCipher(text, decrypt) {
  const a = 'abcdefghijklmnopqrstuvwxyz';
  return text.toLowerCase().split('').map(char => {
    if (/[a-z]/.test(char)) {
      return decrypt ? a[key.indexOf(char)] : key[a.indexOf(char)];
    }
    return char;
  }).join('');
}

function railFenceEncrypt(text, rails = 3) {
  let rail = Array.from({ length: rails }, () => []);
  let dir = 1, row = 0;

  for (let char of text) {
    rail[row].push(char);
    row += dir;
    if (row === 0 || row === rails - 1) dir *= -1;
  }

  return rail.flat().join('');
}

function railFenceDecrypt(cipher, rails = 3) {
  const len = cipher.length;
  const rail = Array.from({ length: rails }, () => Array(len).fill(null));

  // Step 1: Mark the zigzag pattern with placeholders
  let dir = 1, row = 0;
  for (let col = 0; col < len; col++) {
    rail[row][col] = '*';
    row += dir;
    if (row === 0 || row === rails - 1) dir *= -1;
  }

  // Step 2: Fill the placeholders with cipher characters
  let index = 0;
  for (let r = 0; r < rails; r++) {
    for (let c = 0; c < len; c++) {
      if (rail[r][c] === '*' && index < len) {
        rail[r][c] = cipher[index++];
      }
    }
  }

  // Step 3: Read the zigzag pattern to reconstruct the message
  let result = '';
  dir = 1;
  row = 0;
  for (let col = 0; col < len; col++) {
    result += rail[row][col];
    row += dir;
    if (row === 0 || row === rails - 1) dir *= -1;
  }

  return result;
}

function columnarEncrypt(text, key) {
  const cols = key.length;
  const rows = Math.ceil(text.length / cols);
  let matrix = Array.from({ length: rows }, (_, i) =>
    text.slice(i * cols, (i + 1) * cols).padEnd(cols)
  );

  const keyOrder = [...key].map((ch, i) => [ch, i])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([_, i]) => i);

  return keyOrder.map(i => matrix.map(row => row[i]).join('')).join('');
}

function columnarDecrypt(cipher, key) {
  const cols = key.length;
  const rows = Math.ceil(cipher.length / cols);
  const totalLength = rows * cols;

  // Step 1: Determine column order from key
  const keyOrder = [...key].map((ch, i) => [ch, i])
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([_, i]) => i);

  // Step 2: Calculate column lengths
  const colLengths = Array(cols).fill(Math.floor(totalLength / cols));
  let extra = totalLength % cols;
  for (let i = 0; i < extra; i++) {
    colLengths[keyOrder[i]]++;
  }

  // Step 3: Fill columns with ciphertext
  let index = 0;
  const columns = Array(cols).fill('');
  for (let i = 0; i < cols; i++) {
    const colIndex = keyOrder[i];
    columns[colIndex] = cipher.slice(index, index + colLengths[colIndex]);
    index += colLengths[colIndex];
  }

  // Step 4: Reconstruct original message row by row
  let result = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result += columns[c][r] || '';
    }
  }

  return result.trim();
}


let id = "Caesar";
let text;
let key;
let i = document.getElementById("icon");

document.getElementById("Caesar").onclick = function () {
    id = "Caesar";
    let input = document.getElementById("chiper_key");
    input.type = "number";
    document.getElementById("123").textContent = "Caesar Cipher";
    i.classList = "ri-bank-fill";
    document.getElementById("chiper_key").value = "3";
    document.getElementById("description").textContent = "For Caesar cipher, enter a number (shift value)";
}

document.getElementById("Monoalphabetic").onclick = function () {
    id = "Monoalphabetic";
    let input = document.getElementById("chiper_key");
    input.type = "text";
    document.getElementById("123").textContent = "Monoalphabetic Cipher";
    i.classList = "ri-puzzle-2-line";
    document.getElementById("chiper_key").value = "phqgiumeaylnofdxjkrcvstzwb";
    key == monoCipherkey;
    document.getElementById("description").textContent = "For Monoalphabetic Cipher, enter a 26-letter alphabet permutation";
}

document.getElementById("Rail").onclick = function () {
    id = "Rail";
    let input = document.getElementById("chiper_key");
    input.type = "number";
    document.getElementById("123").textContent = "Rail Fence Cipher";
    i.classList = "ri-barricade-line";
    document.getElementById("chiper_key").value = "3";
    document.getElementById("description").textContent = "For";
}

document.getElementById("Columnar").onclick = function () {
    id = "Columnar";
    let input = document.getElementById("chiper_key");
    input.type = "text";
    document.getElementById("123").textContent = "Columnar Transposition";
    i.classList = "ri-numbers-line";
    document.getElementById("chiper_key").value = "ZEBRAS";
    document.getElementById("description").textContent = "For";
}

document.getElementById("Encrypt").onclick = function() {
    text = document.getElementById("input_box").value;
    if (id == "Caesar") {
        key = Number(document.getElementById("chiper_key").value);
        document.getElementById("output_box").textContent = caesarCipher(text, key);
    }
    if (id == "Monoalphabetic") {
        key = document.getElementById("chiper_key").value;
        document.getElementById("output_box").textContent = monoCipher(text, false);
    }
    if (id == "Rail") {
        key = document.getElementById("chiper_key").value;
        document.getElementById("output_box").textContent = railFenceEncrypt(text, key);
    }
    if (id == "Columnar") {
        key = document.getElementById("chiper_key").value;
        document.getElementById("output_box").textContent = columnarEncrypt(text, key);
    }
}

document.getElementById("decrypt").onclick = function() {
    text = document.getElementById("input_box").value;
    if (id == "Caesar") {
        key = Number(document.getElementById("chiper_key").value);
        document.getElementById("output_box").textContent = caesarCipher(text, -key);
    }
    if (id == "Monoalphabetic") {
        key = document.getElementById("chiper_key").value;
        document.getElementById("output_box").textContent = monoCipher(text, true);
    }
    if (id == "Rail") {
        key = Number(document.getElementById("chiper_key").value);
        document.getElementById("output_box").textContent = railFenceDecrypt(text, key);
    }
    if (id == "Columnar") {
        key = document.getElementById("chiper_key").value;
        document.getElementById("output_box").textContent = columnarDecrypt(text, key);
    }
}