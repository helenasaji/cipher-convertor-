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
  const original = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => (btn.textContent = original), 1200);
});


document.getElementById('clearBtn').addEventListener('click', () => {
  input.value = '';
  output.value = '';
  input.focus();
});


const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

const THEME_SHIFT = 3;

// "Light" and "Dark" shifted by 3 → shows encoded word on the button
const THEME_LABELS = {
  light: {
    cipher: caesar('Light', THEME_SHIFT), // "Oljkw"
    icon: '☀️',
  },
  dark: {
    cipher: caesar('Dark', THEME_SHIFT),  // "Dqun"
    icon: '🌙',
  },
};

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);

  const info = THEME_LABELS[theme];
  themeIcon.textContent = info.icon;
  themeLabel.textContent = info.cipher;
  themeToggle.title = `Switch to ${isDark ? 'light' : 'dark'} (Caesar shift ${THEME_SHIFT})`;
}

function getCurrentTheme() {
  return document.body.classList.contains('dark') ? 'dark' : 'light';
}

themeToggle.addEventListener('click', () => {
  const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

/* ---------- Load saved theme on startup ---------- */

const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
