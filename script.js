function caesar(text, shift) {
  shift = ((shift % 26) + 26) % 26;

  return text.replace(/[a-z]/gi, (char) => {
    const base = char >= 'a' && char <= 'z' ? 97 : 65;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + shift) % 26) + base
    );
  });
}

const input = document.getElementById('input');
const output = document.getElementById('output');
const shiftInput = document.getElementById('shift');

function getShift() {
  let shift = parseInt(shiftInput.value, 10);
  if (isNaN(shift) || shift < 1 || shift > 25) {
    shift = 3;
    shiftInput.value = 3;
  }
  return shift;
}

document.getElementById('encryptBtn').addEventListener('click', () => {
  output.value = caesar(input.value, getShift());
});

document.getElementById('decryptBtn').addEventListener('click', () => {
  output.value = caesar(input.value, -getShift());
});

document.getElementById('copyBtn').addEventListener('click', () => {
  if (!output.value) return;
  navigator.clipboard.writeText(output.value);
  const btn = document.getElementById('copyBtn');
  btn.textContent = 'Copied!';
  setTimeout(() => (btn.textContent = 'Copy'), 1200);
});

document.getElementById('clearBtn').addEventListener('click', () => {
  input.value = '';
  output.value = '';
});
