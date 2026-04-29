// Shared layout — header, footer, constellation, scroll reveals
(function() {
  const D = window.PORTFOLIO;
  const path = location.pathname.split('/').pop() || 'index.html';

  const navItems = [
    { href: 'index.html', label: 'Home', match: ['', 'index.html'] },
    { href: 'projects.html', label: 'Projects', match: ['projects.html'] },
    { href: 'skills.html', label: 'Skills', match: ['skills.html'] },
    { href: 'writing.html', label: 'Writing', match: ['writing.html'] },
    { href: 'about.html', label: 'About', match: ['about.html'] },
  ];

  // ===== Constellation canvas =====
  // Detect mobile / touch / low-power once so we can scale the simulation
  // without changing the visual character.
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const isSmall = window.innerWidth <= 720;
  // Cap DPR on phones — retina × full DPR is overkill for a background field
  // and causes real frame drops on mid-tier Android.
  const DPR = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2);

  const canvas = document.createElement('canvas');
  canvas.className = 'constellation';
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d');
  let W, H, points = [], mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  function resize() {
    W = canvas.width = window.innerWidth * DPR;
    H = canvas.height = window.innerHeight * DPR;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    // Fewer points on small screens — preserves the look, halves the O(n²) work
    const density = isSmall ? 32000 : 22000;
    const cap = isSmall ? 50 : 90;
    const count = Math.min(cap, Math.floor((window.innerWidth * window.innerHeight) / density));
    points = [];
    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.15 * DPR,
        vy: (Math.random() - 0.5) * 0.15 * DPR,
        r: (Math.random() * 1.2 + 0.4) * DPR,
        // twinkle: subset of points pulse subtly, others stay constant
        twinkle: Math.random() < 0.35,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.012,
      });
    }
  }
  resize();
  // Debounced resize — phones fire this on every scroll due to URL bar
  // collapse/expand, which is expensive (regenerates all points).
  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(resize, 150);
  });
  window.addEventListener('mousemove', (e) => {
    mouse.tx = e.clientX * DPR;
    mouse.ty = e.clientY * DPR;
  });
  // Touch: track finger so the cursor-reactive lines still appear when
  // dragging. Tap-and-leave clears the field via touchend.
  window.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    mouse.tx = e.touches[0].clientX * DPR;
    mouse.ty = e.touches[0].clientY * DPR;
  }, { passive: true });
  window.addEventListener('touchend', () => {
    mouse.tx = -9999; mouse.ty = -9999;
  }, { passive: true });
  let parallaxX = 0, parallaxY = 0, tParX = 0, tParY = 0;
  // Reduce parallax magnitude on mobile — it's pointless without a real
  // mouse and the touch-driven version feels twitchy.
  const parallaxMag = isTouch ? 0 : 14;
  window.addEventListener('mousemove', (e) => {
    tParX = (e.clientX / window.innerWidth - 0.5) * parallaxMag;
    tParY = (e.clientY / window.innerHeight - 0.5) * parallaxMag;
  });

  function tick() {
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;
    parallaxX += (tParX - parallaxX) * 0.05;
    parallaxY += (tParY - parallaxY) * 0.05;

    ctx.clearRect(0, 0, W, H);
    const linkDist = 140 * DPR;
    const mouseDist = 180 * DPR;

    for (let p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // mouse repulsion (subtle)
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      let drawX = p.x + parallaxX * DPR;
      let drawY = p.y + parallaxY * DPR;
      if (d < mouseDist) {
        const force = (1 - d / mouseDist) * 12 * DPR;
        drawX += (dx / d) * force;
        drawY += (dy / d) * force;
      }
      p._dx = drawX; p._dy = drawY;
    }

    // lines
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const dx = a._dx - b._dx, dy = a._dy - b._dy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < linkDist) {
          const opacity = (1 - d / linkDist) * 0.18;
          ctx.strokeStyle = `rgba(168, 156, 240, ${opacity})`;
          ctx.lineWidth = 0.6 * DPR;
          ctx.beginPath();
          ctx.moveTo(a._dx, a._dy);
          ctx.lineTo(b._dx, b._dy);
          ctx.stroke();
        }
      }
    }
    // mouse-to-points lines (cursor reactive highlight)
    for (let p of points) {
      const dx = p._dx - mouse.x, dy = p._dy - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < mouseDist) {
        const proximity = 1 - d / mouseDist;
        const opacity = proximity * 0.55;
        ctx.strokeStyle = `rgba(212, 168, 232, ${opacity})`;
        ctx.lineWidth = 0.7 * DPR;
        ctx.beginPath();
        ctx.moveTo(p._dx, p._dy);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        // glow halo around hovered point
        if (proximity > 0.3) {
          ctx.fillStyle = `rgba(212, 168, 232, ${proximity * 0.25})`;
          ctx.beginPath();
          ctx.arc(p._dx, p._dy, p.r * 4 * proximity, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    // points
    for (let p of points) {
      let alpha = 0.5;
      let r = p.r;
      if (p.twinkle) {
        p.twinklePhase += p.twinkleSpeed;
        const t = (Math.sin(p.twinklePhase) + 1) / 2; // 0..1
        alpha = 0.25 + t * 0.55;
        r = p.r * (0.85 + t * 0.5);
        // soft halo
        if (t > 0.6) {
          ctx.fillStyle = `rgba(168, 156, 240, ${(t - 0.6) * 0.18})`;
          ctx.beginPath();
          ctx.arc(p._dx, p._dy, r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = `rgba(232, 230, 224, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p._dx, p._dy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();

  // ===== Header =====
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
    <div class="header__inner">
    <a class="header__brand" href="index.html" aria-label="Home">
      <svg class="brand-mark" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <line class="brand-mark__line bm-w" x1="17" y1="22" x2="17" y2="3" style="animation-delay:0.30s"/>
        <line class="brand-mark__line bm-w" x1="17" y1="22" x2="36" y2="6" style="animation-delay:0.36s"/>
        <line class="brand-mark__line bm-w brand-mark__line--short" x1="17" y1="22" x2="32" y2="20" style="animation-delay:0.42s"/>
        <line class="brand-mark__line bm-p" x1="17" y1="22" x2="38" y2="36" style="animation-delay:0.48s"/>
        <line class="brand-mark__line bm-w" x1="17" y1="22" x2="20" y2="38" style="animation-delay:0.54s"/>
        <line class="brand-mark__line bm-w brand-mark__line--short" x1="17" y1="22" x2="6" y2="32" style="animation-delay:0.60s"/>
        <line class="brand-mark__line bm-w" x1="17" y1="22" x2="2" y2="14" style="animation-delay:0.66s"/>
        <line class="brand-mark__line bm-w brand-mark__line--short" x1="17" y1="22" x2="9" y2="9" style="animation-delay:0.72s"/>
        <line class="brand-mark__line bm-w brand-mark__line--xshort" x1="17" y1="22" x2="24" y2="14" style="animation-delay:0.80s"/>
        <line class="brand-mark__line bm-w brand-mark__line--xshort" x1="17" y1="22" x2="11" y2="26" style="animation-delay:0.86s"/>
        <circle class="brand-mark__core-glow" cx="17" cy="22" r="5"/>
        <circle class="brand-mark__core" cx="17" cy="22" r="2.6"/>
      </svg>
    </a>
    <nav class="header__nav">
      ${navItems.map(n => `<a href="${n.href}" class="${n.match.includes(path) ? 'is-active' : ''}"><span>${n.label}</span></a>`).join('')}
    </nav>
    <div class="header__social">
      <a class="icon-btn" href="${D.identity.github}" aria-label="GitHub">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.58.67.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
      </a>
      <a class="icon-btn" href="${D.identity.linkedin}" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18V10H5.67v8h2.67zM7 8.83a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.34 18v-4.4c0-2.47-1.32-3.62-3.08-3.62-1.42 0-2.06.78-2.41 1.33V10h-2.67v8h2.67v-4.47c0-.24.02-.48.09-.65.19-.48.63-.98 1.36-.98.96 0 1.34.73 1.34 1.8V18h2.7z"/></svg>
      </a>
      <a class="icon-btn" href="mailto:${D.identity.email}" aria-label="Email">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
      </a>
    </div>
    </div>
  `;
  document.body.appendChild(header);

  // Brand mark: subtle interactive constellation in the corner — reacts to hover by jittering its core
  const brandMark = header.querySelector('.brand-mark');
  if (brandMark) {
    brandMark.addEventListener('mouseenter', () => brandMark.classList.add('is-hot'));
    brandMark.addEventListener('mouseleave', () => brandMark.classList.remove('is-hot'));
  }

  // header scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  });

  // ===== Footer (minimal) =====
  const footer = document.createElement('footer');
  footer.className = 'footer footer--mini';
  footer.innerHTML = `
    <div class="shell">
      <div class="footer__inner">
        <div class="footer__copy">© ${new Date().getFullYear()} ${D.identity.name} · ${D.identity.location}</div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);

  // ===== Reveal on scroll =====
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  window.__revealIO = io;
  window.observeReveal = (root) => {
    (root || document).querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el));
  };
  window.observeReveal();

  // ===== Skill icons =====
  window.skillIcon = function(key) {
    const icons = {
      python: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.91 2c-2.42 0-4.12.95-4.12 3.16v2.66h4.18v.6H6.27c-2.21 0-4.16 1.34-4.16 4.07s1.66 3.86 4.06 3.86h1.62v-2.92c0-2.36 2.04-4.36 4.36-4.36h4.06c2.13 0 3.86-1.79 3.86-3.93V5.16c0-2.13-1.93-3.16-4.06-3.16zm-2.16 1.86a.91.91 0 0 1 .91.91.91.91 0 0 1-.91.91.91.91 0 0 1-.91-.91.91.91 0 0 1 .91-.91zM18.06 8.42v2.83c0 2.46-2.07 4.46-4.36 4.46H9.64c-2.08 0-3.86 1.84-3.86 3.93v2.66c0 2.13 1.85 3.39 3.96 3.39 2.66 0 4.16-1.59 4.16-3.39v-2.66h4.16v-.61h4.07c2.41 0 3.31-1.71 4.16-3.86.85-2.21-.04-3.86-3.86-3.86h-1.74v-3.16zm-2.51 11.23a.91.91 0 0 1 .91.91.91.91 0 0 1-.91.91.91.91 0 0 1-.91-.91.91.91 0 0 1 .91-.91z"/></svg>`,
      redis: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.4 13.6c-.4 1.6-3.2 3.6-7.2 3.6s-6.8-2-7.2-3.6c-.4-1.6 0-2 4-3.6 0 0-2.8-.8-3.6-2.4 0 0-2 .4-2.4 1.2 0 0-1.2.4-1.2 1.6v6.4c0 1.6 4.4 4 9.6 4s9.6-2.4 9.6-4v-6.4c0-.8-.4-1.6-1.6-2 0 0-.4 1.2-.8 1.6 0 0 .8 2.4-.8 3.6zm-7.6-7.2c-3.2 0-6 1.6-6 2.8s2.8 2.8 6 2.8 6-1.6 6-2.8-2.8-2.8-6-2.8z"/></svg>`,
      postgres: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 2.4c-1.6-.4-3.2-.4-4.8 0-1.6 0-3.2.8-4.4 1.6-.8.8-1.2 2-1.2 3.2 0 1.2.4 2.4.8 3.6.4 1.6.4 3.2 0 4.8-.4 1.6 0 3.2.8 4.4.8 1.2 2 2 3.2 2.4 1.2.4 2.4.4 3.6 0 1.6-.4 2.8-1.2 3.6-2.4 1.2-1.6 1.6-3.6 1.6-5.6V8c-.4-2.4-1.6-4.8-3.2-5.6zm-2.4 14.4c-1.2 0-2-.8-2-2s.8-2 2-2 2 .8 2 2-.8 2-2 2z"/></svg>`,
      fastapi: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm-1.2 19.2v-6h-3.6L13.2 4.8v6h3.6L10.8 19.2z"/></svg>`,
      aws: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.8 9.4c0 .4 0 .8.2 1.2.2.4.4.6.4.8 0 .2-.2.4-.4.6l-.8.6h-.4c-.2 0-.4 0-.6-.2-.4-.2-.6-.6-.8-.8-.2-.4-.4-.8-.6-1.2-.6 1.4-1.6 2.2-3 2.2-1 0-1.8-.4-2.4-1-.6-.6-.8-1.4-.8-2.4 0-1.2.4-2 1.2-2.8.8-.6 1.8-1 3.2-1 .4 0 .8 0 1.4.2.4 0 .8.2 1.4.4v-.6c0-1-.2-1.6-.6-2-.4-.4-1-.6-2-.6-.4 0-.8 0-1.4.2-.4.2-1 .4-1.4.4-.2 0-.4.2-.4.2-.2 0-.2-.2-.2-.4v-.4c0-.2 0-.4.2-.4 0-.2.2-.2.4-.4.4-.2 1-.4 1.6-.6.6-.2 1.4-.2 2-.2 1.6 0 2.6.4 3.4 1 .8.8 1.2 1.8 1.2 3.4l-.2 4.4z"/></svg>`,
      linux: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.077 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.6.058.399.116.764.04 1.023-.255.79-.286 1.337-.083 1.737.203.402.602.582 1.062.681.918.196 2.165.115 3.156.65.66.336 1.342.55 1.886.55.358 0 .646-.118.832-.353.13-.165.183-.385.182-.602 0-.117 0-.235-.024-.336.073-.034.144-.058.215-.07h.01l.024-.007a.5.5 0 0 0 .124-.018c.4 0 .9-.107 1.408-.282.27-.08.527-.176.768-.282.241-.106.466-.226.679-.367.426-.282.8-.617 1.13-1.013.331-.396.617-.851.866-1.366a.7.7 0 0 0 .07-.32c0-.118-.029-.235-.096-.336-.067-.1-.166-.183-.282-.235a.704.704 0 0 0-.43-.07.74.74 0 0 0-.4.176c-.13.1-.218.235-.272.4-.054.165-.07.353-.046.518.025.165.083.32.173.448.09.13.21.235.353.282.143.047.305.046.476-.005.17-.05.353-.155.518-.282.165-.13.32-.282.448-.4.13-.13.235-.235.32-.282l.024-.024c.07.117.118.235.165.353.046.118.07.235.094.353.024.118.03.235.024.353-.006.118-.029.235-.07.353a1.05 1.05 0 0 1-.118.282 1.13 1.13 0 0 1-.165.235c-.13.13-.282.235-.448.282-.165.046-.353.07-.518.046-.165-.024-.32-.094-.448-.187-.13-.094-.235-.21-.32-.353a3.36 3.36 0 0 1-.46-1.15c-.13-.518-.21-1.13-.21-1.766 0-.518.094-1.013.235-1.483.14-.47.353-.917.612-1.34a4.7 4.7 0 0 1 .87-1.105c.327-.32.682-.589 1.083-.797.4-.21.847-.353 1.342-.4.353-.024.73-.024 1.082.046.353.07.682.21.94.4.26.187.448.4.564.612.118.235.165.4.165.612 0 .118-.024.235-.07.353-.047.118-.118.21-.21.282-.094.07-.21.118-.353.118a.91.91 0 0 1-.353-.07.94.94 0 0 1-.282-.21.94.94 0 0 1-.21-.282c-.046-.118-.07-.235-.07-.353-.024-.118-.046-.21-.07-.282-.025-.07-.05-.117-.094-.165-.05-.046-.094-.094-.165-.118-.07-.024-.165-.046-.282-.046-.235.024-.4.094-.518.235-.118.118-.187.235-.235.4-.046.165-.07.353-.07.518 0 .353.118.7.282 1.013.187.32.4.612.682.87.282.26.612.494.94.7.353.21.7.4 1.082.518a4.16 4.16 0 0 0 1.176.187c.4 0 .8-.046 1.176-.165.4-.118.776-.282 1.105-.518.353-.235.612-.518.84-.847.21-.353.353-.73.4-1.13.046-.4.024-.823-.07-1.222-.07-.4-.21-.776-.4-1.105-.187-.353-.4-.682-.682-.94-.282-.282-.612-.518-.94-.7-.353-.21-.7-.353-1.082-.448-.4-.094-.776-.165-1.176-.165-.4-.024-.823.024-1.222.094-.4.07-.776.21-1.105.353-.353.165-.682.353-.97.612-.282.235-.518.518-.7.823-.21.282-.353.612-.448.97-.118.353-.165.7-.165 1.082v.046c0 .024 0 .046.024.07h-.046c0-.118 0-.235-.024-.353a3.43 3.43 0 0 0-.07-.353c-.046-.118-.094-.235-.165-.353-.07-.118-.165-.21-.282-.282-.118-.07-.282-.094-.448-.094-.235 0-.448.094-.612.235-.165.165-.282.353-.353.518-.07.21-.118.4-.118.612 0 .353.094.682.235.97.165.282.353.518.612.7.235.187.518.282.823.282.235 0 .448-.046.66-.165.21-.118.4-.282.518-.448.118-.187.21-.4.235-.612.046-.235.046-.448 0-.66z"/></svg>`,
      stock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-5 4 3 5-7 4 5"/><circle cx="8" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="15" r="1.2" fill="currentColor"/><circle cx="17" cy="8" r="1.2" fill="currentColor"/><path d="M3 21h18" opacity="0.4"/></svg>`,
      react: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(120 12 12)"/></svg>`,
    };
    return icons[key] || '';
  };
})();
