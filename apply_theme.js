const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add CSS for light theme
const lightThemeCSS = `
    /* ═══════════════════════════════════════
   LIGHT THEME (INVERT BASED)
═══════════════════════════════════════ */
    html[data-theme="light"] body {
      background: #fdfdfd;
    }
    html[data-theme="light"] .nav,
    html[data-theme="light"] .hero,
    html[data-theme="light"] .logos-sec,
    html[data-theme="light"] .section,
    html[data-theme="light"] .cta-sec,
    html[data-theme="light"] .footer-outer,
    html[data-theme="light"] .page-divider {
      filter: invert(1) hue-rotate(180deg);
    }
    
    html[data-theme="light"] img:not(.logo-it img),
    html[data-theme="light"] video {
      filter: invert(1) hue-rotate(180deg);
    }

    /* Keep syntax highlighting colors roughly same */
    html[data-theme="light"] .term-cmd,
    html[data-theme="light"] .term-ok,
    html[data-theme="light"] .code-body .cmd {
      filter: invert(1) hue-rotate(180deg) brightness(0.8);
    }

    .nav-theme-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      cursor: pointer;
      transition: all 0.2s;
      margin-right: 8px;
    }
    .nav-theme-toggle:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .nav-theme-toggle svg {
      width: 15px;
      height: 15px;
      transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    .nav-theme-toggle:active svg {
      transform: scale(0.9);
    }
`;

html = html.replace('</style>', lightThemeCSS + '\n  </style>');

// 2. Add Theme Toggle Button to nav
const themeButtonHTML = `
      <button class="nav-theme-toggle" id="themeToggle" aria-label="Toggle theme">
        <svg id="themeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      </button>
`;

html = html.replace('<a href="https://github.com/ibtasaams" target="_blank" class="nav-gh">', themeButtonHTML + '\n      <a href="https://github.com/ibtasaams" target="_blank" class="nav-gh">');

// 3. Add JS script at the end for theme toggle
const themeJS = `
  <script>
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlEl = document.documentElement;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
      setMoonIcon();
    } else {
      setSunIcon();
    }

    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      if (currentTheme === 'light') {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        setSunIcon();
      } else {
        htmlEl.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setMoonIcon();
      }
    });

    function setSunIcon() {
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
    }

    function setMoonIcon() {
      themeIcon.innerHTML = '<path d="M12 3a6 6 1 0 0 9 9 9 9 0 1 1-9-9Z"/>';
    }
  </script>
</body>
`;

html = html.replace('</body>', themeJS);

fs.writeFileSync('index.html', html);
console.log('Modified index.html');
