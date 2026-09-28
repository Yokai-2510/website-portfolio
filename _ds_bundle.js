/* @ds-bundle: {"format":4,"namespace":"EshaanSharmaDesignSystem_4751b7","components":[{"name":"Field","sourcePath":"components/brand/Field.jsx"},{"name":"Lockup","sourcePath":"components/brand/Lockup.jsx"},{"name":"Mark","sourcePath":"components/brand/Mark.jsx"},{"name":"Sigil","sourcePath":"components/brand/Sigil.jsx"},{"name":"ThemeSwitch","sourcePath":"components/brand/ThemeSwitch.jsx"},{"name":"MARK","sourcePath":"components/brand/fieldEngine.js"},{"name":"INK_STYLES","sourcePath":"components/brand/fieldEngine.js"},{"name":"EntryRow","sourcePath":"components/content/EntryRow.jsx"},{"name":"LabTile","sourcePath":"components/content/LabTile.jsx"},{"name":"Metric","sourcePath":"components/content/Metric.jsx"},{"name":"SectionHeader","sourcePath":"components/content/SectionHeader.jsx"},{"name":"WorkCard","sourcePath":"components/content/WorkCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"ICON_NAMES","sourcePath":"components/icons/Icon.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NAV","sourcePath":"components/navigation/TopBar.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"},{"name":"ProductCard","sourcePath":"components/showcase/ProductCard.jsx"},{"name":"ProjectRow","sourcePath":"components/showcase/ProjectRow.jsx"}],"sourceHashes":{"components/brand/Field.jsx":"f900aaa75c22","components/brand/Lockup.jsx":"e9ff8f228fa0","components/brand/Mark.jsx":"db1e91564d4b","components/brand/Sigil.jsx":"1a8f79be03cc","components/brand/ThemeSwitch.jsx":"0580e35e3d33","components/brand/fieldEngine.js":"61b7e0f1dd22","components/brand/fieldFluid.js":"0e2c94fbad98","components/content/EntryRow.jsx":"4b28eb9d55c5","components/content/LabTile.jsx":"a389b17281f6","components/content/Metric.jsx":"5d6259b9e29a","components/content/SectionHeader.jsx":"2df2b1d06792","components/content/WorkCard.jsx":"3820a863006f","components/core/Button.jsx":"5bf51220d5b5","components/core/Chip.jsx":"a750e417387e","components/core/IconButton.jsx":"b185302aeb96","components/core/SegmentedControl.jsx":"d7650404c392","components/core/Tag.jsx":"c40fc0fd1763","components/forms/TextField.jsx":"528d6a5f46de","components/icons/Icon.jsx":"654723adecd8","components/navigation/Footer.jsx":"7a3a22257fde","components/navigation/TopBar.jsx":"f95ad23a44cf","components/showcase/ProductCard.jsx":"1952f4b8ff8f","components/showcase/ProjectRow.jsx":"10d4f07691ac","source/layout.js":"a72303896a76","ui_kits/portfolio/About.jsx":"107a4b276600","ui_kits/portfolio/Home.jsx":"2beccc192545","ui_kits/portfolio/Products.jsx":"b08f04f9d5eb","ui_kits/portfolio/Work.jsx":"71a6e2c3d4ea","ui_kits/portfolio/Writing.jsx":"2bbaa385a032","ui_kits/portfolio/data.js":"8df3c8140b57","ui_kits/portfolio/tweaks-panel.jsx":"d259e3a86f73"},"inlinedExternals":[],"unexposedExports":[{"name":"createField","sourcePath":"components/brand/fieldEngine.js"},{"name":"makeFluid","sourcePath":"components/brand/fieldFluid.js"},{"name":"requestTheme","sourcePath":"components/brand/ThemeSwitch.jsx"},{"name":"useTheme","sourcePath":"components/brand/ThemeSwitch.jsx"}]} */

(() => {

const __ds_ns = (window.EshaanSharmaDesignSystem_4751b7 = window.EshaanSharmaDesignSystem_4751b7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Sigil.jsx
try { (() => {
const {
  useMemo
} = React;
function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed) {
  let a = seed;
  return () => {
    a = a + 0x6d2b79f5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Every piece of work gets its own constellation — deterministic from its seed.
function Sigil({
  seed = 'field',
  nodes = 8,
  width = 320,
  height = 180,
  className,
  style
}) {
  const g = useMemo(() => {
    const r = rng(hash(String(seed))),
      pts = [],
      min = Math.min(width, height) * 0.2;
    for (let tries = 0; pts.length < nodes && tries < 600; tries++) {
      const x = 18 + r() * (width - 36),
        y = 16 + r() * (height - 32);
      if (pts.every(p => Math.hypot(p[0] - x, p[1] - y) > min)) pts.push([x, y, 1 + r() * 1.3]);
    }
    const N = pts.length,
      inT = [true],
      best = pts.map(p => Math.hypot(p[0] - pts[0][0], p[1] - pts[0][1])),
      from = new Array(N).fill(0),
      edges = [],
      deg = new Array(N).fill(0);
    for (let i = 1; i < N; i++) inT[i] = false;
    for (let it = 1; it < N; it++) {
      let bi = -1,
        bd = Infinity;
      for (let i = 0; i < N; i++) if (!inT[i] && best[i] < bd) {
        bd = best[i];
        bi = i;
      }
      inT[bi] = true;
      edges.push([from[bi], bi]);
      deg[bi]++;
      deg[from[bi]]++;
      for (let i = 0; i < N; i++) if (!inT[i]) {
        const d = Math.hypot(pts[i][0] - pts[bi][0], pts[i][1] - pts[bi][1]);
        if (d < best[i]) {
          best[i] = d;
          from[i] = bi;
        }
      }
    }
    if (N > 4) {
      const a = Math.floor(r() * N),
        b = (a + 2 + Math.floor(r() * (N - 3))) % N;
      if (!edges.some(([x, y]) => x === a && y === b || x === b && y === a)) edges.push([a, b]);
    }
    const core = deg.indexOf(Math.max(...deg));
    return {
      pts,
      edges,
      core
    };
  }, [seed, nodes, width, height]);
  const c = g.pts[g.core] || [width / 2, height / 2];
  return /*#__PURE__*/React.createElement("svg", {
    className: 'sigil' + (className ? ' ' + className : ''),
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "xMidYMid meet",
    style: style,
    "aria-hidden": "true"
  }, g.edges.map(([a, b], i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    pathLength: "1",
    style: {
      '--i': i
    },
    x1: g.pts[a][0],
    y1: g.pts[a][1],
    x2: g.pts[b][0],
    y2: g.pts[b][1]
  })), g.pts.map(([x, y, rr], i) => i === g.core ? null : /*#__PURE__*/React.createElement("circle", {
    key: i,
    className: "sigil__node",
    cx: x,
    cy: y,
    r: rr
  })), /*#__PURE__*/React.createElement("circle", {
    className: "sigil__halo",
    cx: c[0],
    cy: c[1],
    r: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "sigil__core",
    cx: c[0],
    cy: c[1],
    r: "3.2"
  }));
}
Object.assign(__ds_scope, { Sigil });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Sigil.jsx", error: String((e && e.message) || e) }); }

// components/brand/ThemeSwitch.jsx
try { (() => {
const {
  useCallback,
  useEffect,
  useRef,
  useState
} = React;
const read = () => document.documentElement.dataset.theme === 'ink' ? 'ink' : 'night';

// Request a change of state. A mounted page Field performs the transformation and swaps
// html[data-theme] at the midpoint (when the light crosses); otherwise the swap is direct.
function requestTheme(to, fromEl) {
  const r = fromEl ? fromEl.getBoundingClientRect() : null;
  const sx = r ? r.left + r.width / 2 : innerWidth / 2,
    sy = r ? r.top + r.height / 2 : innerHeight / 2;
  if (window.__esField > 0) window.dispatchEvent(new CustomEvent('field:theme', {
    detail: {
      theme: to,
      sx,
      sy
    }
  }));else {
    document.documentElement.dataset.theme = to;
    try {
      localStorage.setItem('es-theme', to);
    } catch (_) {}
  }
}
function useTheme() {
  const [theme, setTheme] = useState(read);
  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(read()));
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => mo.disconnect();
  }, []);
  const set = useCallback((to, el) => requestTheme(to, el), []);
  return [theme, set];
}

// Night: a point of light held in a thin orbit. Ink: the orbit is written — an open ring of ink, the light gone.
function ThemeSwitch({
  showLabel = false
}) {
  const [theme] = useTheme();
  const [target, setTarget] = useState(theme);
  const ref = useRef(null);
  useEffect(() => setTarget(theme), [theme]);
  const next = target === 'ink' ? 'night' : 'ink';
  return /*#__PURE__*/React.createElement("button", {
    ref: ref,
    type: "button",
    className: 'theme-switch' + (showLabel ? '' : ' theme-switch--icon') + (target === 'ink' ? ' is-ink' : ''),
    "aria-label": `Switch to ${next === 'ink' ? 'Ink (light)' : 'Night (dark)'} theme`,
    "aria-pressed": target === 'ink',
    title: next === 'ink' ? 'Ink' : 'Night',
    onClick: () => {
      setTarget(next);
      requestTheme(next, ref.current);
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 20 20",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "ts-orbit",
    cx: "10",
    cy: "10",
    r: "7"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "ts-arc",
    cx: "10",
    cy: "10",
    r: "6.6",
    pathLength: "100"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "ts-glow",
    cx: "10",
    cy: "10",
    r: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "ts-star",
    cx: "10",
    cy: "10",
    r: "1.9"
  })), showLabel && /*#__PURE__*/React.createElement("span", {
    className: "theme-switch__label"
  }, target === 'ink' ? 'Ink' : 'Night'));
}
Object.assign(__ds_scope, { requestTheme, useTheme, ThemeSwitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ThemeSwitch.jsx", error: String((e && e.message) || e) }); }

// components/brand/fieldFluid.js
try { (() => {
// Ink as a fluid (stable fluids on a coarse grid). Cell i covers x ∈ [(i-1)·cs, i·cs); one border cell sits
// outside the view on each side. Only the bounding box of live cells is simulated, so an idle field costs nothing.
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
function makeFluid(out) {
  const F = {
    nx: 0,
    ny: 0,
    cs: 6,
    on: false,
    i0: 1,
    i1: 0,
    j0: 1,
    j1: 0
  };
  let u,
    v,
    u2,
    v2,
    d,
    d2,
    p,
    dv,
    w,
    mask,
    img,
    octx,
    drawn = null;
  F.resize = (Wd, Ht) => {
    F.cs = clamp(Math.round(Wd / 360), 3, 5);
    F.nx = Math.ceil(Wd / F.cs) + 2;
    F.ny = Math.ceil(Ht / F.cs) + 2;
    const n = F.nx * F.ny;
    u = new Float32Array(n);
    v = new Float32Array(n);
    u2 = new Float32Array(n);
    v2 = new Float32Array(n);
    d = new Float32Array(n);
    d2 = new Float32Array(n);
    p = new Float32Array(n);
    dv = new Float32Array(n);
    w = new Float32Array(n);
    mask = new Uint8Array(n);
    out.width = F.nx;
    out.height = F.ny;
    octx = out.getContext('2d');
    img = octx.createImageData(F.nx, F.ny);
    F.on = false;
    drawn = null;
  };
  const cellOf = (x, y) => {
    const i = Math.floor(x / F.cs) + 1,
      j = Math.floor(y / F.cs) + 1;
    return i < 0 || j < 0 || i >= F.nx || j >= F.ny ? -1 : i + j * F.nx;
  };
  F.blocked = (x, y) => {
    if (!mask) return false;
    const k = cellOf(x, y);
    return k >= 0 && mask[k] === 1;
  };
  F.setMask = rects => {
    if (!mask) return;
    mask.fill(0);
    const cs = F.cs,
      nx = F.nx,
      ny = F.ny;
    for (const r of rects) {
      const a = Math.max(0, Math.floor(r.x / cs) + 1),
        b = Math.min(nx - 1, Math.floor((r.x + r.w) / cs) + 1);
      const c = Math.max(0, Math.floor(r.y / cs) + 1),
        e = Math.min(ny - 1, Math.floor((r.y + r.h) / cs) + 1);
      if (a > b || c > e) continue;
      for (let j = c; j <= e; j++) mask.fill(1, a + j * nx, b + 1 + j * nx);
    }
  };
  function extend(a, b, c, e) {
    a = Math.max(1, a);
    b = Math.min(F.nx - 2, b);
    c = Math.max(1, c);
    e = Math.min(F.ny - 2, e);
    if (a > b || c > e) return;
    if (!F.on) {
      F.i0 = a;
      F.i1 = b;
      F.j0 = c;
      F.j1 = e;
      F.on = true;
    } else {
      if (a < F.i0) F.i0 = a;
      if (b > F.i1) F.i1 = b;
      if (c < F.j0) F.j0 = c;
      if (e > F.j1) F.j1 = e;
    }
  }
  // Gaussian splat. relax > 0 steers velocity toward the target instead of adding to it (continuous sources).
  // radial / tang (px/frame) replace (vx, vy) with an outward or turning field around the point.
  F.splat = (x, y, vx, vy, dye, r, relax, radial, tang) => {
    if (!u) return;
    const cs = F.cs,
      nx = F.nx,
      gx = x / cs + 0.5,
      gy = y / cs + 0.5,
      rr = Math.max(0.7, r / cs),
      R = Math.ceil(rr * 2.2);
    const ci = Math.round(gx),
      cj = Math.round(gy);
    const a = Math.max(1, ci - R),
      b = Math.min(nx - 2, ci + R),
      c = Math.max(1, cj - R),
      e = Math.min(F.ny - 2, cj + R);
    if (a > b || c > e) return;
    const inv = 1 / (rr * rr),
      ivx = vx / cs,
      ivy = vy / cs,
      rel = relax || 0,
      rad = (radial || 0) / cs,
      tn = (tang || 0) / cs,
      vec = rad !== 0 || tn !== 0;
    for (let j = c; j <= e; j++) for (let i = a; i <= b; i++) {
      const dx = i - gx,
        dy = j - gy,
        q = (dx * dx + dy * dy) * inv;
      if (q > 4.8) continue;
      const g = Math.exp(-q),
        k = i + j * nx;
      let tx = ivx,
        ty = ivy;
      if (vec) {
        const Ld = Math.sqrt(dx * dx + dy * dy) + 1e-3,
          ex = dx / Ld,
          ey = dy / Ld;
        tx = ex * rad - ey * tn;
        ty = ey * rad + ex * tn;
      }
      if (rel) {
        const s = rel * g;
        u[k] += (tx - u[k]) * s;
        v[k] += (ty - v[k]) * s;
      } else if (tx || ty) {
        u[k] += tx * g;
        v[k] += ty * g;
      }
      if (dye > 0) {
        const nd = d[k] + dye * g;
        d[k] = nd > 3 ? 3 : nd;
      }
    }
    extend(a - 3, b + 3, c - 3, e + 3);
  };
  F.sink = (x, y, r, keep) => {
    if (!F.on) return;
    const cs = F.cs,
      nx = F.nx,
      gx = x / cs + 0.5,
      gy = y / cs + 0.5,
      rr = Math.max(0.7, r / cs),
      R = Math.ceil(rr * 2);
    const inv = 1 / (rr * rr),
      a = Math.max(1, Math.round(gx) - R),
      b = Math.min(nx - 2, Math.round(gx) + R),
      c = Math.max(1, Math.round(gy) - R),
      e = Math.min(F.ny - 2, Math.round(gy) + R);
    for (let j = c; j <= e; j++) for (let i = a; i <= b; i++) {
      const dx = i - gx,
        dy = j - gy,
        g = Math.exp(-(dx * dx + dy * dy) * inv);
      d[i + j * nx] *= 1 - (1 - keep) * g;
    }
  };
  // att: attention — ink (not the fluid) is drawn toward the cursor and settles into a lobed, turning ring around it.
  F.step = (dt, keepD, keepV, eps, t, att) => {
    if (!F.on) return;
    const nx = F.nx,
      ny = F.ny,
      cs = F.cs,
      i0 = F.i0,
      i1 = F.i1,
      j0 = F.j0,
      j1 = F.j1;
    let i, j, k;
    // vorticity confinement keeps the smoke curling; a slow current keeps it alive
    for (j = j0; j <= j1; j++) for (i = i0, k = i0 + j * nx; i <= i1; i++, k++) w[k] = 0.5 * (v[k + 1] - v[k - 1] - u[k + nx] + u[k - nx]);
    for (j = j0 + 1; j < j1; j++) for (i = i0 + 1, k = i0 + 1 + j * nx; i < i1; i++, k++) {
      const gx = Math.abs(w[k + 1]) - Math.abs(w[k - 1]),
        gy = Math.abs(w[k + nx]) - Math.abs(w[k - nx]);
      const f = eps * w[k] * dt / (Math.sqrt(gx * gx + gy * gy) + 1e-5);
      u[k] += gy * f;
      v[k] -= gx * f;
      if (d[k] > 0.03) {
        const X = i * cs * 0.0045,
          Y = j * cs * 0.0045;
        u[k] += (Math.sin(Y * 1.7 + t * 0.21) + 0.6 * Math.cos(X * 1.3 - Y * 0.8 - t * 0.17)) * 0.0012 * dt;
        v[k] += (Math.cos(X * 1.9 - t * 0.19) + 0.6 * Math.sin(X * 0.7 + Y * 1.4 + t * 0.13) - 0.35) * 0.0012 * dt;
      }
    }
    // projection (Gauss–Seidel, warm-started)
    for (j = j0; j <= j1; j++) for (i = i0, k = i0 + j * nx; i <= i1; i++, k++) {
      dv[k] = -0.5 * (u[k + 1] - u[k - 1] + v[k + nx] - v[k - nx]);
      p[k] *= 0.7;
    }
    for (let it = 0; it < 12; it++) for (j = j0; j <= j1; j++) for (i = i0, k = i0 + j * nx; i <= i1; i++, k++) p[k] = (dv[k] + p[k - 1] + p[k + 1] + p[k - nx] + p[k + nx]) * 0.25;
    for (j = j0; j <= j1; j++) for (i = i0, k = i0 + j * nx; i <= i1; i++, k++) {
      u[k] -= 0.5 * (p[k + 1] - p[k - 1]);
      v[k] -= 0.5 * (p[k + nx] - p[k - nx]);
    }
    // semi-Lagrangian advection; content cells are solid and clear any ink that reaches them
    const sx = nx - 1.501,
      sy = ny - 1.501;
    let a0 = 1e9,
      a1 = -1,
      b0 = 1e9,
      b1 = -1,
      acx = 0,
      acy = 0,
      aR = 0,
      aS = 0,
      aR0 = 1,
      aO = 0;
    if (att) {
      acx = att.x / cs + 0.5;
      acy = att.y / cs + 0.5;
      aR = att.r / cs;
      aS = att.s / cs;
      aR0 = att.ring / cs;
      aO = att.orbit;
    }
    for (j = j0; j <= j1; j++) for (i = i0, k = i0 + j * nx; i <= i1; i++, k++) {
      const uk = u[k],
        vk = v[k];
      let x = i - dt * uk,
        y = j - dt * vk;
      x = x < 0.5 ? 0.5 : x > sx ? sx : x;
      y = y < 0.5 ? 0.5 : y > sy ? sy : y;
      let x0 = x | 0,
        y0 = y | 0,
        fx = x - x0,
        fy = y - y0,
        q = x0 + y0 * nx;
      let w00 = (1 - fx) * (1 - fy),
        w10 = fx * (1 - fy),
        w01 = (1 - fx) * fy,
        w11 = fx * fy;
      let nu = (u[q] * w00 + u[q + 1] * w10 + u[q + nx] * w01 + u[q + nx + 1] * w11) * keepV;
      let nv = (v[q] * w00 + v[q + 1] * w10 + v[q + nx] * w01 + v[q + nx + 1] * w11) * keepV;
      if (aS > 0) {
        const dx = acx - i,
          dy = acy - j,
          dist = Math.sqrt(dx * dx + dy * dy) + 1e-3;
        if (dist < aR) {
          const ex = dx / dist,
            ey = dy / dist,
            rq = (dist - aR0) / aR0,
            ang = Math.atan2(ey, ex);
          // lobed and wavering, so the streams break into smoke and the ring never closes into a circle
          const lobe = 1 + 0.4 * Math.sin(3 * ang + t * 1.3) + 0.2 * Math.sin(5 * ang - t * 0.9);
          const vr = aS * Math.tanh(rq * 1.25) * Math.sqrt(1 - dist / aR) * lobe;
          const vt = aS * (aO * Math.exp(-rq * rq) + 0.28 * Math.sin(dist * 0.42 - t * 2.1 + ang * 2));
          let xd = i - dt * (uk + ex * vr - ey * vt),
            yd = j - dt * (vk + ey * vr + ex * vt);
          xd = xd < 0.5 ? 0.5 : xd > sx ? sx : xd;
          yd = yd < 0.5 ? 0.5 : yd > sy ? sy : yd;
          x0 = xd | 0;
          y0 = yd | 0;
          fx = xd - x0;
          fy = yd - y0;
          q = x0 + y0 * nx;
          w00 = (1 - fx) * (1 - fy);
          w10 = fx * (1 - fy);
          w01 = (1 - fx) * fy;
          w11 = fx * fy;
        }
      }
      let nd = (d[q] * w00 + d[q + 1] * w10 + d[q + nx] * w01 + d[q + nx + 1] * w11) * keepD;
      if (mask[k]) {
        nu = 0;
        nv = 0;
        nd *= 0.86;
      }
      u2[k] = nu;
      v2[k] = nv;
      d2[k] = nd;
      if (nd > 0.006 || (nu < 0 ? -nu : nu) + (nv < 0 ? -nv : nv) > 0.004) {
        if (i < a0) a0 = i;
        if (i > a1) a1 = i;
        if (j < b0) b0 = j;
        if (j > b1) b1 = j;
      }
    }
    for (j = j0; j <= j1; j++) {
      const s = i0 + j * nx,
        e = i1 + 1 + j * nx;
      u.set(u2.subarray(s, e), s);
      v.set(v2.subarray(s, e), s);
      d.set(d2.subarray(s, e), s);
    }
    if (a1 < 0) {
      for (j = j0; j <= j1; j++) {
        const s = i0 + j * nx,
          e = i1 + 1 + j * nx;
        u.fill(0, s, e);
        v.fill(0, s, e);
        d.fill(0, s, e);
        p.fill(0, s, e);
      }
      F.on = false;
      return;
    }
    const n0 = Math.max(1, a0 - 3),
      n1 = Math.min(nx - 2, a1 + 3),
      m0 = Math.max(1, b0 - 3),
      m1 = Math.min(ny - 2, b1 + 3);
    if (n0 > i0 || n1 < i1 || m0 > j0 || m1 < j1) for (j = j0; j <= j1; j++) for (i = i0, k = i0 + j * nx; i <= i1; i++, k++) if (i < n0 || i > n1 || j < m0 || j > m1) {
      u[k] = 0;
      v[k] = 0;
      d[k] = 0;
      p[k] = 0;
    }
    F.i0 = n0;
    F.i1 = n1;
    F.j0 = m0;
    F.j1 = m1;
  };
  // Density → ink: thin ink leans cold violet-grey, dense ink is near black; fronts read a little darker.
  F.render = () => {
    if (!img) return false;
    const nx = F.nx,
      data = img.data,
      cur = F.on ? [F.i0, F.i1, F.j0, F.j1] : null,
      old = drawn;
    if (!cur && !old) return false;
    if (old) for (let j = old[2]; j <= old[3]; j++) {
      let o = (old[0] + j * nx) * 4 + 3;
      for (let i = old[0]; i <= old[1]; i++, o += 4) data[o] = 0;
    }
    if (cur) for (let j = cur[2]; j <= cur[3]; j++) for (let i = cur[0], k = cur[0] + j * nx; i <= cur[1]; i++, k++) {
      const dd = (d[k] * 4 + d[k + 1] + d[k - 1] + d[k + nx] + d[k - nx]) * 0.125,
        o = k * 4;
      if (dd < 0.004) {
        data[o + 3] = 0;
        continue;
      }
      const gx = d[k + 1] - d[k - 1],
        gy = d[k + nx] - d[k - nx],
        e = Math.sqrt(gx * gx + gy * gy);
      let a = 1 - Math.exp(-1.8 * dd);
      a = Math.min(1, a * 0.9 + Math.min(0.16, e * 0.3) * (1 - a * 0.6));
      data[o] = 46 - 38 * a;
      data[o + 1] = 49 - 40 * a;
      data[o + 2] = 76 - 62 * a;
      data[o + 3] = a * 246;
    }
    const x0 = Math.min(old ? old[0] : 1e9, cur ? cur[0] : 1e9),
      x1 = Math.max(old ? old[1] : -1, cur ? cur[1] : -1);
    const y0 = Math.min(old ? old[2] : 1e9, cur ? cur[2] : 1e9),
      y1 = Math.max(old ? old[3] : -1, cur ? cur[3] : -1);
    octx.putImageData(img, 0, 0, x0, y0, x1 - x0 + 1, y1 - y0 + 1);
    drawn = cur;
    return !!cur;
  };
  F.any = () => F.on || !!drawn;
  F.reset = () => {
    if (!u) return;
    for (const a of [u, v, d, p]) a.fill(0);
    F.on = false;
    if (img) {
      img.data.fill(0);
      octx.putImageData(img, 0, 0);
    }
    drawn = null;
  };
  return F;
}
Object.assign(__ds_scope, { makeFluid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/fieldFluid.js", error: String((e && e.message) || e) }); }

// components/brand/fieldEngine.js
try { (() => {
// The Field — one presence, two states of matter.
// Night: the original constellation, lit like white LEDs over a near-invisible violet aether.
// Ink:   cold fog behind glass; the same points hang as ink specks. They are the focus points. Two behaviours:
//          smoke    — a real fluid: the specks near you stream smoke toward the cursor and it turns around you.
//          release  — like an octopus: move toward a speck and it jets ink along your trail, in pulses; it rolls and billows.
//        Rest and the ink writes a ring. Ink never sits under words.
// The switch is a change of state, everywhere at once: stillness → light rises → the stars become ink.

const MARK = (() => {
  const step = Math.PI * 2 / 7,
    up = -Math.PI / 2,
    len = [20, 14, 18, 15];
  const rays = [{
    a: up,
    len: len[0],
    lit: false
  }];
  for (let k = 1; k <= 3; k++) rays.push({
    a: up + step * k,
    len: len[k],
    lit: k === 3
  }, {
    a: up - step * k,
    len: len[k],
    lit: false
  });
  return {
    view: 48,
    core: [24, 27],
    rays,
    faint: [{
      a: up + step / 2,
      len: 8
    }, {
      a: up - step / 2,
      len: 8
    }]
  };
})();
const INK_STYLES = ['smoke', 'release'];
const TAU = Math.PI * 2;
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const INK = '12,14,22';
const INK_DRIFT = 0.45;
const REACH = 250;
const TRIG = 175,
  MAX_FOLLOW = 4;
const CONTENT = 'h1,h2,h3,h4,h5,h6,p,li,dt,dd,blockquote,pre,figure,img,input,textarea,select,button,.btn,.chip,.tag,.seg,.t-label,.lockup,[data-node],[data-solid],.topbar,.footer';

// Divergence-free flow: slow, smooth, never repeating in a way you can see.
function flow(x, y, t) {
  const u = x * 0.0046,
    v = y * 0.0046;
  const a = u * 1.3 + t * 0.09,
    b = v * 1.1 - t * 0.08,
    c = (u - v) * 0.9 + t * 0.05,
    d = u * 2.3 + v * 1.7 - t * 0.13;
  const du = 1.3 * Math.cos(a) * Math.cos(b) + 0.54 * Math.cos(c) - 0.805 * Math.sin(d);
  const dv = -1.1 * Math.sin(a) * Math.sin(b) - 0.54 * Math.cos(c) - 0.595 * Math.sin(d);
  return [dv, -du];
}
function valueNoise(seed) {
  let s = seed >>> 0 || 1;
  const g = new Float32Array(4096);
  for (let i = 0; i < 4096; i++) {
    s = Math.imul(s, 1664525) + 1013904223 >>> 0;
    g[i] = s / 4294967296;
  }
  const at = (x, y) => g[(y & 63) << 6 | x & 63];
  return (x, y) => {
    const xi = Math.floor(x),
      yi = Math.floor(y),
      xf = x - xi,
      yf = y - yi,
      u = xf * xf * (3 - 2 * xf),
      v = yf * yf * (3 - 2 * yf);
    const a = at(xi, yi),
      b = at(xi + 1, yi),
      c = at(xi, yi + 1),
      d = at(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
}
// A smoke sprite: irregular silhouette, wispy interior — the soft bleed around each speck.
function sprite(seed, w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const x = c.getContext('2d'),
    img = x.createImageData(w, h),
    n = valueNoise(Math.imul(seed, 2654435761));
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const u = (i + 0.5) / w * 2 - 1,
      v = (j + 0.5) / h * 2 - 1,
      r = Math.sqrt(u * u + v * v);
    if (r >= 1) continue;
    const px = i / w * 3.2,
      py = j / h * 3.2;
    const lo = n(px * 0.9 + 11, py * 0.9 + 7);
    const hi = n(px * 2 + 3, py * 2) * 0.55 + n(px * 4.1, py * 4.1 + 5) * 0.3 + n(px * 8.3 + 1, py * 8.3) * 0.15;
    const base = clamp(1 - r / (0.62 + 0.38 * lo), 0, 1);
    const a = smooth(0.03, 0.8, Math.pow(base, 1.35) * (0.35 + 0.65 * hi));
    const k = (j * w + i) * 4;
    img.data[k] = 12;
    img.data[k + 1] = 14;
    img.data[k + 2] = 22;
    img.data[k + 3] = a * 255;
  }
  x.putImageData(img, 0, 0);
  return c;
}
function grain(alpha) {
  const g = document.createElement('canvas');
  g.width = g.height = 128;
  const x = g.getContext('2d'),
    id = x.createImageData(128, 128);
  for (let i = 0; i < id.data.length; i += 4) {
    const v = Math.random() * 255;
    id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
    id.data[i + 3] = alpha;
  }
  x.putImageData(id, 0, 0);
  return g;
}
const NC = [[112, 88, 255], [48, 76, 200], [132, 96, 255], [60, 92, 210], [96, 80, 230]];
const IC = [[255, 255, 255], [196, 184, 255], [176, 226, 240], [255, 255, 255], [206, 196, 255]];
function createField(canvas, opts = {}) {
  const contained = !!opts.contained,
    demo = !!opts.demo;
  const mq = q => typeof matchMedia !== 'undefined' && matchMedia(q).matches;
  const reduced = opts.reduced ?? mq('(prefers-reduced-motion: reduce)');
  const touch = mq('(hover: none) and (pointer: coarse)');
  const onSwap = opts.onSwap || (() => {});
  const ctx = canvas.getContext('2d');
  const mk = () => document.createElement('canvas');
  const bgN = mk(),
    bgI = mk(),
    pl = mk(),
    rip = mk(),
    inkC = mk(),
    inkH = mk(),
    inkB = mk();
  const plx = pl.getContext('2d'),
    rpx = rip.getContext('2d'),
    bx = inkB.getContext('2d');
  const smoke = [1, 2, 3, 4, 5].map(s => sprite(s, 72, 72));
  const gN = ctx.createPattern(grain(7), 'repeat'),
    gI = ctx.createPattern(grain(9), 'repeat');
  const fluid = __ds_scope.makeFluid(inkC);
  let W = 1,
    H = 1,
    DPR = 1,
    raf = 0,
    alive = true,
    last = performance.now(),
    time = Math.random() * 100,
    fn = 0;
  let pts = [];
  let theme = opts.theme === 'ink' ? 'ink' : 'night';
  let style = INK_STYLES.includes(opts.inkStyle) ? opts.inkStyle : 'smoke';
  let L = theme === 'ink' ? 1 : 0,
    drift = theme === 'ink' ? INK_DRIFT : 1,
    lineK = theme === 'ink' ? 0 : 1,
    inkK = 1,
    tr = null;
  const mouse = {
    x: -1e4,
    y: -1e4,
    tx: -1e4,
    ty: -1e4,
    inside: false,
    moved: 0
  };
  const real = {
      inside: false
    },
    vcur = {
      s: Math.random() * 40,
      clock: Math.random() * 3
    };
  const par = {
    x: 0,
    y: 0,
    tx: 0,
    ty: 0
  };
  let dolly = 0,
    dollyT = 0;
  const opaque = new WeakMap(),
    spilled = new WeakMap(),
    spills = new Map(),
    hov = {
      el: null,
      on: false,
      s: 0
    };
  const ink = {
    px: -1e4,
    py: -1e4,
    sp: 0,
    still: 0,
    armed: true,
    lastBloom: -1e9,
    dir: Math.random() < 0.5 ? -1 : 1,
    queue: [],
    maskFn: -1e9,
    dirty: true,
    ax: 0,
    ay: 0,
    as: 0,
    crumb: 0
  };
  const jets = [],
    trail = [],
    mgrid = {
      cs: 8,
      nx: 0,
      ny: 0,
      hard: null,
      soft: null,
      tmp: null
    };
  let gazeT = null,
    nextGaze = performance.now() + (150 + Math.random() * 150) * 1000,
    nextWisp = performance.now() + 9000 + Math.random() * 9000;
  const blobs = Array.from({
    length: 5
  }, (_, i) => ({
    i,
    px: Math.random() * TAU,
    py: Math.random() * TAU,
    fx: 0.05 + Math.random() * 0.05,
    fy: 0.04 + Math.random() * 0.05,
    r: 0.34 + Math.random() * 0.28,
    e: 0.55 + Math.random() * 0.6,
    rot: Math.random() * TAU
  }));
  function radial(c, x, y, r, stops) {
    const g = c.createRadialGradient(x, y, 0, x, y, r);
    for (const [o, col] of stops) g.addColorStop(o, col);
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);
  }
  function paintBg() {
    const M = Math.max(W, H);
    let c = bgN.getContext('2d');
    c.setTransform(DPR, 0, 0, DPR, 0, 0);
    c.fillStyle = '#07080d';
    c.fillRect(0, 0, W, H);
    radial(c, W * 0.5, H * 0.4, M * 0.85, [[0, 'rgba(24,30,56,0.5)'], [1, 'rgba(24,30,56,0)']]);
    radial(c, W * 0.5, H * 0.5, M * 0.9, [[0.45, 'rgba(2,3,6,0)'], [1, 'rgba(2,3,6,0.65)']]);
    c = bgI.getContext('2d');
    c.setTransform(DPR, 0, 0, DPR, 0, 0);
    c.fillStyle = '#dfe3e7';
    c.fillRect(0, 0, W, H);
    radial(c, W * 0.5, H * 0.42, M * 0.78, [[0, 'rgba(247,248,250,1)'], [0.5, 'rgba(238,241,244,0.6)'], [1, 'rgba(238,241,244,0)']]);
    radial(c, W * 0.5, H * 0.5, M * 0.92, [[0.5, 'rgba(160,170,184,0)'], [1, 'rgba(160,170,184,0.32)']]);
  }
  function size() {
    const r = contained ? canvas.parentElement.getBoundingClientRect() : {
      width: innerWidth,
      height: innerHeight
    };
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    const small = W <= 720;
    DPR = Math.min(devicePixelRatio || 1, small ? 1.5 : 2);
    for (const c of [canvas, bgN, bgI]) {
      c.width = Math.round(W * DPR);
      c.height = Math.round(H * DPR);
    }
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    pl.width = Math.max(8, Math.ceil(W / 10));
    pl.height = Math.max(8, Math.ceil(H / 10));
    rip.width = Math.ceil(W / 2);
    rip.height = Math.ceil(H / 2);
    inkB.width = Math.max(1, Math.ceil(W / 3));
    inkB.height = Math.max(1, Math.ceil(H / 3));
    paintBg();
    fluid.resize(W, H);
    inkH.width = Math.max(1, fluid.nx >> 1);
    inkH.height = Math.max(1, fluid.ny >> 1);
    mgrid.nx = Math.ceil(W / mgrid.cs) + 1;
    mgrid.ny = Math.ceil(H / mgrid.cs) + 1;
    const mn = mgrid.nx * mgrid.ny;
    mgrid.hard = new Uint8Array(mn);
    mgrid.soft = new Float32Array(mn);
    mgrid.tmp = new Float32Array(mn);
    ink.dirty = true;
    ink.queue.length = 0;
    spills.clear();
    jets.length = 0;
    trail.length = 0;
    const n = Math.max(10, Math.min(small ? 50 : 90, Math.floor(W * H / (small ? 32000 : 22000))));
    const cx = W / 2,
      cy = H / 2,
      md = Math.hypot(cx, cy);
    pts = [];
    for (let i = 0; i < n; i++) {
      const x = Math.random() * W,
        y = Math.random() * H,
        thr = 0.4 + 0.18 * (Math.hypot(x - cx, y - cy) / md) + Math.random() * 0.04;
      pts.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.2 + 0.4,
        tw: Math.random() < 0.35,
        ph: Math.random() * TAU,
        sp: 0.005 + Math.random() * 0.012,
        thr,
        side: L > thr ? 1 : 0,
        fl: 0,
        near: 0,
        dx: x,
        dy: y,
        s: i % 5,
        charge: 1,
        act: false,
        cd: 0,
        cool: 0,
        pulse: 0,
        gl: 0
      });
    }
  }
  const local = r => {
    const o = contained ? canvas.getBoundingClientRect() : {
      left: 0,
      top: 0
    };
    return {
      x: r.left - o.left,
      y: r.top - o.top,
      w: r.width,
      h: r.height
    };
  };
  function dotOf(el) {
    const d = el.querySelector('[data-node-dot]'),
      r = local((d || el).getBoundingClientRect());
    return d ? {
      x: r.x + r.w / 2,
      y: r.y + r.h / 2
    } : {
      x: r.x + r.w - 16,
      y: r.y + 16
    };
  }
  function stepPoints(dt, gz) {
    const e = Math.min(1, 0.08 * dt),
      pe = Math.min(1, 0.05 * dt);
    mouse.x += (mouse.tx - mouse.x) * e;
    mouse.y += (mouse.ty - mouse.y) * e;
    par.x += (par.tx - par.x) * pe;
    par.y += (par.ty - par.y) * pe;
    dolly += (dollyT - dolly) * Math.min(1, 0.025 * dt);
    const sway = 5 * L;
    for (const p of pts) {
      p.x += p.vx * drift * dt;
      p.y += p.vy * drift * dt;
      if (p.x < 0 || p.x > W) {
        p.vx *= -1;
        p.x = clamp(p.x, 0, W);
      }
      if (p.y < 0 || p.y > H) {
        p.vy *= -1;
        p.y = clamp(p.y, 0, H);
      }
      let x = p.x,
        y = p.y;
      if (sway > 0.05) {
        const f = flow(p.x, p.y, time);
        x += f[0] * sway;
        y += f[1] * sway;
      }
      if (dolly) y = ((y - dolly) % H + H) % H;
      x += par.x;
      y += par.y;
      const dx = x - mouse.x,
        dy = y - mouse.y,
        d = Math.sqrt(dx * dx + dy * dy) || 1;
      p.near = 0;
      if (d < 180) {
        const pr = 1 - d / 180,
          f = pr * lerp(12, 7, L);
        p.near = pr;
        x += dx / d * f;
        y += dy / d * f;
      }
      if (gz > 0 && d < 440) {
        const pull = gz * 7 * (1 - d / 440);
        x -= dx / d * pull;
        y -= dy / d * pull;
      }
      p.dx = x;
      p.dy = y;
    }
  }
  function drawLinks(k, gz) {
    const n = pts.length,
      B = [[], [], [], [], [], []],
      LD = 140,
      a0 = 0.18 * k * (1 - 0.35 * gz);
    for (let i = 0; i < n; i++) {
      const a = pts[i];
      for (let j = i + 1; j < n; j++) {
        const b = pts[j],
          dx = a.dx - b.dx,
          dy = a.dy - b.dy;
        if (dx > LD || dx < -LD || dy > LD || dy < -LD) continue;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LD) B[Math.min(5, (1 - d / LD) * 6 | 0)].push(a.dx, a.dy, b.dx, b.dy);
      }
    }
    ctx.lineWidth = 0.6;
    for (let q = 0; q < 6; q++) {
      const S = B[q];
      if (!S.length) continue;
      ctx.strokeStyle = `rgba(206,218,255,${(q + 0.5) / 6 * a0})`;
      ctx.beginPath();
      for (let m = 0; m < S.length; m += 4) {
        ctx.moveTo(S[m], S[m + 1]);
        ctx.lineTo(S[m + 2], S[m + 3]);
      }
      ctx.stroke();
    }
    ctx.lineWidth = 0.7;
    for (const p of pts) {
      if (p.near <= 0) continue;
      ctx.strokeStyle = `rgba(236,242,255,${p.near * 0.5 * k})`;
      ctx.beginPath();
      ctx.moveTo(p.dx, p.dy);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
      if (p.near > 0.3) {
        ctx.fillStyle = `rgba(214,226,255,${p.near * 0.22 * k})`;
        ctx.beginPath();
        ctx.arc(p.dx, p.dy, p.r * 4 * p.near, 0, TAU);
        ctx.fill();
      }
    }
  }
  function drawPoints(dt) {
    for (const p of pts) {
      let a = 0.5,
        r = p.r,
        t = 0;
      if (p.tw) {
        p.ph += p.sp * dt;
        t = (Math.sin(p.ph) + 1) / 2;
        a = 0.25 + t * 0.55;
        r = p.r * (0.85 + t * 0.5);
      }
      const side = L > p.thr ? 1 : 0;
      if (side !== p.side) {
        p.side = side;
        if (tr) {
          if (side) inkBleed(p);else p.fl = 1;
        }
      }
      const em = 1 - smooth(p.thr - 0.16, p.thr, L),
        ab = smooth(p.thr, p.thr + 0.2, L);
      if (em > 0.01) {
        // near hovered work the stars quicken: brief, uneven sparkles — nothing drawn toward the card
        const g = p.gl > 0.01 ? p.gl * Math.pow(0.5 + 0.5 * Math.sin(time * (2 + p.s * 0.7) + p.ph * 5), 3) : 0,
          rg = r * (1 + 0.4 * g);
        if (p.tw && t > 0.6 || g > 0.2) {
          ctx.fillStyle = `rgba(200,214,255,${(Math.max(0, t - 0.6) * 0.18 + g * 0.12) * em})`;
          ctx.beginPath();
          ctx.arc(p.dx, p.dy, rg * 3.5, 0, TAU);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(240,244,255,${Math.min(1, a + p.fl * 0.5 + g * 0.45) * em})`;
        ctx.beginPath();
        ctx.arc(p.dx, p.dy, rg, 0, TAU);
        ctx.fill();
      }
      if (p.fl > 0.02) {
        ctx.fillStyle = `rgba(226,234,255,${p.fl * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.dx, p.dy, r * 6, 0, TAU);
        ctx.fill();
      }
      if (ab > 0.01) {
        // a speck that has given its ink shrinks a little and refills while you are elsewhere; it swells as it releases
        const hr = r * 5.5,
          full = 0.68 + 0.32 * p.charge,
          pu = p.pulse;
        ctx.globalAlpha = (0.07 + 0.05 * t + 0.06 * pu) * ab * (0.55 + 0.45 * p.charge);
        ctx.drawImage(smoke[p.s], p.dx - hr, p.dy - hr, hr * 2, hr * 2);
        ctx.globalAlpha = 1;
        ctx.fillStyle = `rgba(${INK},${Math.min(1, (0.32 + 0.4 * a) * ab + 0.22 * pu)})`;
        ctx.beginPath();
        ctx.arc(p.dx, p.dy, r * 1.1 * full * (1 + 0.5 * pu), 0, TAU);
        ctx.fill();
      }
      p.fl *= Math.pow(0.955, dt);
      p.pulse *= Math.pow(0.95, dt);
    }
  }

  // Night, hovering work: the stars around its edges twinkle, very slightly. That is all.
  function glintNear() {
    const on = hov.s > 0.01 && hov.el && hov.el.isConnected && L < 0.6,
      R = on ? local(hov.el.getBoundingClientRect()) : null;
    for (const p of pts) {
      if (!R) {
        p.gl = 0;
        continue;
      }
      const dx = Math.max(R.x - p.dx, 0, p.dx - (R.x + R.w)),
        dy = Math.max(R.y - p.dy, 0, p.dy - (R.y + R.h));
      p.gl = (1 - smooth(0, 160, Math.hypot(dx, dy))) * hov.s;
    }
  }

  // ---------- Words are sacred ----------
  // Smoke treats every piece of content as a solid obstacle. Tendrils fade out ~16px before any text or control;
  // opaque surfaces (cards) hide ink on their own, so tendrils may pass behind them.
  const maskAt = (x, y) => {
    const g = mgrid;
    if (!g.soft || x < 0 || y < 0) return 0;
    const i = x / g.cs | 0,
      j = y / g.cs | 0;
    return i >= g.nx || j >= g.ny ? 0 : g.soft[i + j * g.nx];
  };
  function isOpaque(el) {
    if (opaque.has(el)) return opaque.get(el);
    const m = (getComputedStyle(el).backgroundColor.match(/[\d.]+/g) || []).map(Number);
    const v = m.length >= 3 && (m.length === 3 || m[3] > 0.5);
    opaque.set(el, v);
    return v;
  }
  function updateMask() {
    ink.maskFn = fn;
    ink.dirty = false;
    const root = contained ? canvas.parentElement : document.body,
      g = mgrid;
    if (!root || !g.hard) return;
    const o = contained ? canvas.getBoundingClientRect() : {
        left: 0,
        top: 0
      },
      rects = [];
    const {
      cs,
      nx,
      ny,
      hard,
      soft,
      tmp
    } = g;
    hard.fill(0);
    for (const el of root.querySelectorAll(CONTENT)) {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const x = r.left - o.left,
        y = r.top - o.top;
      if (x > W || y > H || x + r.width < 0 || y + r.height < 0) continue;
      rects.push({
        x: x - 5,
        y: y - 5,
        w: r.width + 10,
        h: r.height + 10
      });
      if (isOpaque(el)) continue;
      const a = Math.max(0, Math.floor((x - 4) / cs)),
        b = Math.min(nx - 1, Math.floor((x + r.width + 4) / cs));
      const c = Math.max(0, Math.floor((y - 4) / cs)),
        e = Math.min(ny - 1, Math.floor((y + r.height + 4) / cs));
      if (a > b || c > e) continue;
      for (let j = c; j <= e; j++) hard.fill(1, a + j * nx, b + 1 + j * nx);
    }
    fluid.setMask(rects);
    for (let k = 0; k < hard.length; k++) soft[k] = hard[k];
    for (let pass = 0; pass < 2; pass++) {
      for (let j = 0; j < ny; j++) for (let i = 0, k = j * nx; i < nx; i++, k++) tmp[k] = (soft[k] * 2 + soft[i > 0 ? k - 1 : k] + soft[i < nx - 1 ? k + 1 : k]) * 0.25;
      for (let j = 0; j < ny; j++) for (let i = 0, k = j * nx; i < nx; i++, k++) soft[k] = (tmp[k] * 2 + tmp[j > 0 ? k - nx : k] + tmp[j < ny - 1 ? k + nx : k]) * 0.25;
    }
    for (let k = 0; k < hard.length; k++) if (hard[k]) soft[k] = 1;
  }

  // ---------- Ink: smoke ----------
  // The specks around you are the focus points. Each releases ink toward you, routed through the next speck
  // closer to the cursor, so the streams branch and converge like roots; where they meet, the ink turns.
  function smokeHover(dt, now) {
    for (const p of pts) {
      if (!p.act) p.charge = Math.min(1, p.charge + 0.004 * dt);
      p.act = false;
    }
    if (!mouse.inside || mouse.tx < -1e3) {
      ink.px = -1e4;
      ink.still = 0;
      ink.sp *= 0.9;
      ink.as *= Math.pow(0.92, dt);
      return;
    }
    const cx = mouse.tx,
      cy = mouse.ty,
      overContent = fluid.blocked(cx, cy);
    ink.ax = cx;
    ink.ay = cy;
    ink.as += ((overContent ? 0 : 1) - ink.as) * Math.min(1, 0.08 * dt);
    let mvx = 0,
      mvy = 0,
      sp = 0;
    if (ink.px > -1e3) {
      mvx = (cx - ink.px) / Math.max(0.5, dt);
      mvy = (cy - ink.py) / Math.max(0.5, dt);
      sp = Math.hypot(mvx, mvy);
    }
    ink.px = cx;
    ink.py = cy;
    ink.sp += (Math.min(sp, 40) - ink.sp) * Math.min(1, 0.12 * dt);
    if (sp > 0.4 && sp < 600) {
      const c = Math.min(1, 12 / sp);
      if (!overContent) fluid.splat(cx, cy, mvx * 0.55 * c, mvy * 0.55 * c, 0, 26, 0.3);
      ink.still = 0;
      if (sp > 3) ink.armed = true;
    } else if (!overContent) {
      if (!ink.still) ink.still = now;
      if (now - ink.still > 1150 && ink.armed && now - ink.lastBloom > 5000) {
        smokeBloom(cx, cy, 1, now);
        ink.lastBloom = now;
        ink.armed = false;
        ink.dir = -ink.dir;
      }
    }
    const act = [];
    for (const p of pts) {
      const d = Math.hypot(p.dx - cx, p.dy - cy);
      if (d < REACH && d > 16 && !fluid.blocked(p.dx, p.dy)) {
        p.cd = d;
        act.push(p);
      }
    }
    if (!act.length) return;
    act.sort((a, b) => a.cd - b.cd);
    const move = 0.55 + 0.45 * smooth(0.5, 8, ink.sp),
      k = Math.min(dt, 2);
    for (let i = 0; i < act.length; i++) {
      const p = act[i];
      p.act = true;
      let tx = cx,
        ty = cy,
        best = p.cd * 0.85;
      for (let j = 0; j < i; j++) {
        const q = act[j],
          dd = Math.hypot(q.dx - p.dx, q.dy - p.dy);
        if (dd < 130 && dd < best) {
          best = dd;
          tx = q.dx;
          ty = q.dy;
        }
      }
      const pr = 1 - p.cd / REACH,
        ex = tx - p.dx,
        ey = ty - p.dy,
        el = Math.hypot(ex, ey) || 1,
        ux = ex / el,
        uy = ey / el;
      const vel = (0.7 + 1.1 * pr) * (0.8 + 0.2 * move),
        beat = 0.5 + 0.5 * Math.sin(time * 4.3 + p.s * 1.7 + p.thr * 40);
      const dye = 0.95 * Math.pow(pr, 1.3) * (0.35 + 0.65 * p.charge) * move * (0.45 + 0.55 * beat) * k;
      fluid.splat(p.dx + ux * 3, p.dy + uy * 3, ux * vel, uy * vel, dye, 3.5 + p.r * 1.5, 0.28);
      p.charge = Math.max(0, p.charge - dye * 0.02);
    }
    if (!overContent) {
      fluid.splat(cx, cy, 0, 0, 0, 34, 0.06, 0, 1.1 * ink.dir);
      fluid.sink(cx, cy, 16, Math.pow(0.92, k));
    }
  }
  // A pause in open space: the gathered ink opens into a logogram — an uneven ring with a gap and a few tendrils.
  function smokeBloom(x, y, s, now) {
    const R = (26 + Math.random() * 14) * s,
      K = 15,
      rot = Math.random() * TAU,
      dir = Math.random() < 0.5 ? -1 : 1;
    const l1 = Math.random() * TAU,
      l2 = Math.random() * TAU,
      gap = Math.random() * K | 0,
      gapN = 2 + (Math.random() * 2 | 0);
    fluid.splat(x, y, 0, 0, 0, R * 0.9, 0, 0.8 * s, 0);
    for (let i = 0; i < K; i++) {
      if ((i - gap + K) % K < gapN) continue;
      const th = rot + dir * (i / K) * TAU,
        rr = R * (1 + 0.24 * Math.sin(2 * th + l1) + 0.12 * Math.sin(3 * th + l2));
      const out = (0.4 + Math.random() * 0.45) * s,
        tan = 0.3 * dir * s,
        c = Math.cos(th),
        sn = Math.sin(th),
        dye = 0.9 + Math.random() * 0.6,
        r = (6 + Math.random() * 4) * s;
      ink.queue.push({
        at: now + i * 40,
        fn: () => fluid.splat(x + c * rr, y + sn * rr, c * out - sn * tan, sn * out + c * tan, dye, r)
      });
    }
    for (let q = 0; q < 3; q++) {
      const th = rot + Math.random() * TAU,
        c = Math.cos(th),
        sn = Math.sin(th);
      ink.queue.push({
        at: now + 230 + q * 130,
        fn: () => fluid.splat(x + c * R, y + sn * R, c * 1.9 * s, sn * 1.9 * s, 0.5, 4 * s)
      });
    }
  }
  function rim(R, t) {
    let dd = t * 2 * (R.w + R.h),
      x,
      y,
      nx = 0,
      ny = 0;
    if (dd < R.w) {
      x = R.x + dd;
      y = R.y;
      ny = -1;
    } else if ((dd -= R.w) < R.h) {
      x = R.x + R.w;
      y = R.y + dd;
      nx = 1;
    } else if ((dd -= R.h) < R.w) {
      x = R.x + R.w - dd;
      y = R.y + R.h;
      ny = 1;
    } else {
      dd -= R.w;
      x = R.x;
      y = R.y + R.h - dd;
      nx = -1;
    }
    return {
      x,
      y,
      nx,
      ny
    };
  }
  // Hovering a piece of work (smoke): ink seeps from behind it, creeping along its edge and out into the open.
  function smokeSpillStart(el, now) {
    let st = spills.get(el);
    if (!st) {
      st = {
        el,
        on: false,
        t0: 0,
        end: -1e9,
        src: [],
        power: 1
      };
      spills.set(el, st);
    }
    if (st.on) return;
    st.on = true;
    st.t0 = now;
    st.power = now - st.end > 2400 ? 1 : 0.4;
    st.src = [];
    const R = local(el.getBoundingClientRect());
    if (!isOpaque(el) && el.querySelector('[data-node-dot]')) {
      const c = dotOf(el);
      if (!fluid.blocked(c.x - 12, c.y)) st.src.push({
        fixed: true,
        rx: c.x - 12 - R.x,
        ry: c.y - R.y,
        nx: -1,
        ny: 0,
        w: 1.3,
        ph: Math.random() * TAU
      });
    }
    if (!st.src.length) {
      const n = 3 + (Math.random() * 2 | 0),
        t0 = Math.random();
      for (let i = 0; i < n; i++) st.src.push({
        fixed: false,
        t: (t0 + i / n + (Math.random() - 0.5) * 0.1 + 1) % 1,
        du: (Math.random() < 0.5 ? -1 : 1) * (0.0006 + Math.random() * 0.0009),
        w: 0.7 + Math.random() * 0.5,
        ph: Math.random() * TAU
      });
    }
  }
  function spill(st, dt, now) {
    if (!st.el.isConnected) {
      st.on = false;
      return;
    }
    const s = (now - st.t0) / 1000,
      rate = st.power * smooth(0, 0.2, s) * (1 - 0.75 * smooth(1.2, 2.6, s));
    if (rate < 0.01) return;
    const R = local(st.el.getBoundingClientRect()),
      k = Math.min(dt, 2);
    for (const q of st.src) {
      let x, y, nx, ny;
      if (q.fixed) {
        x = R.x + q.rx;
        y = R.y + q.ry;
        nx = q.nx;
        ny = q.ny;
      } else {
        q.t = (q.t + q.du * dt + 1) % 1;
        const m = rim(R, q.t);
        nx = m.nx;
        ny = m.ny;
        x = m.x + nx * 9;
        y = m.y + ny * 9;
      }
      const beat = 0.55 + 0.45 * Math.sin(time * 5.1 + q.ph),
        tg = Math.sin(time * 2.3 + q.ph) * 0.9,
        v = 0.9 + 0.7 * beat;
      fluid.splat(x + (Math.random() - 0.5) * 6, y + (Math.random() - 0.5) * 6, nx * v - ny * tg, ny * v + nx * tg, 0.2 * rate * q.w * beat * k, 5 + Math.random() * 3, 0.22);
      if (Math.random() < 0.05 * k) fluid.splat(x, y, nx * 2.6 - ny * tg * 1.5, ny * 2.6 + nx * tg * 1.5, 0.12 * rate, 4);
    }
  }

  // ---------- Ink: release (octopus) ----------
  // Move toward a speck and it answers like an octopus: a jet of ink leaves it, finds the path your cursor took and
  // follows it — so far and no further — in pulses, shedding curls on alternate sides. Nothing is drawn but the fluid,
  // so the ink rolls, billows and dissolves on its own.
  function emit(p, now) {
    let tid = -1,
      bd = 1e9;
    for (let i = trail.length - 1; i >= 0 && now - trail[i].t < 1800; i--) {
      const cr = trail[i],
        d = Math.hypot(cr.x - p.dx, cr.y - p.dy);
      if (d < bd) {
        bd = d;
        tid = cr.id;
      }
    }
    if (tid < 0) tid = ink.crumb;
    const ang = Math.atan2(mouse.ty - p.dy, mouse.tx - p.dx) + (Math.random() - 0.5) * 1.1;
    jets.push({
      x: p.dx,
      y: p.dy,
      ang,
      sp: 1.3,
      vmax: 3 + Math.random() * 0.9,
      len: 0,
      max: 150 + Math.random() * 150,
      tid,
      born: now,
      side: Math.random() < 0.5 ? -1 : 1,
      next: 8,
      orbit: ink.dir * (0.9 + Math.random() * 0.5),
      seed: Math.random() * 100,
      pw: 0.8 + p.r * 0.2
    });
    fluid.splat(p.dx, p.dy, Math.cos(ang) * 1.5, Math.sin(ang) * 1.5, 1.4 + p.r * 0.3, 3.4 + p.r * 0.8);
    p.cool = 2600 + Math.random() * 2600;
    p.charge = Math.max(0, p.charge - 0.55);
    p.pulse = 1;
  }
  function stepJets(dt, now) {
    const k = Math.min(dt, 2),
      live = mouse.inside && mouse.tx > -1e3,
      i0 = trail.length ? trail[0].id : ink.crumb;
    for (let n = jets.length - 1; n >= 0; n--) {
      const J = jets[n];
      let tx = null,
        ty = 0,
        atCursor = false,
        slow = 1,
        ta = J.ang;
      if (J.tid < i0) J.tid = i0;
      while (J.tid - i0 < trail.length) {
        const cr = trail[J.tid - i0];
        if (Math.hypot(cr.x - J.x, cr.y - J.y) > 18) {
          tx = cr.x;
          ty = cr.y;
          break;
        }
        J.tid++;
      }
      if (tx === null && live) {
        tx = mouse.tx;
        ty = mouse.ty;
        atCursor = true;
      }
      if (tx !== null) {
        const d = Math.hypot(tx - J.x, ty - J.y);
        ta = Math.atan2(ty - J.y, tx - J.x);
        // caught up: curl around the cursor instead of touching it
        if (atCursor) {
          ta += J.orbit * (1 - smooth(18, 90, d)) * 1.3;
          slow = 0.5 + 0.5 * smooth(14, 70, d);
        }
      }
      ta += Math.sin(now * 0.004 + J.seed * 7) * 0.12;
      const da = Math.atan2(Math.sin(ta - J.ang), Math.cos(ta - J.ang)),
        mt = 0.08 * k;
      J.ang += da < -mt ? -mt : da > mt ? mt : da;
      J.sp = clamp(J.sp + 0.08 * k, 0.35, J.vmax);
      const endK = 1 - smooth(0.55, 1, J.len / J.max),
        v = J.sp * slow * (0.35 + 0.65 * endK),
        step = v * k,
        co = Math.cos(J.ang),
        si = Math.sin(J.ang);
      J.x += co * step;
      J.y += si * step;
      J.len += step;
      // pulses: the ink leaves in squirts, not a steady line
      const beat = 0.35 + 0.65 * Math.pow(0.5 + 0.5 * Math.sin(now * 0.0105 + J.seed), 2);
      if (!fluid.blocked(J.x, J.y)) fluid.splat(J.x, J.y, co * v * 0.85, si * v * 0.85, 0.42 * J.pw * beat * endK * k, 2.1, 0.35);
      J.next -= step;
      if (J.next <= 0) {
        // shed a curl on alternate sides, so the plume rolls instead of stiffening into a vein
        J.next = 9 + Math.random() * 9;
        J.side = -J.side;
        const nx = -si * J.side,
          ny = co * J.side,
          px = J.x + nx * 5,
          py = J.y + ny * 5;
        if (!fluid.blocked(px, py)) fluid.splat(px, py, nx * 1.7 - co * 0.4, ny * 1.7 - si * 0.4, 0.12 * J.pw * endK, 5);
      }
      if (J.len >= J.max || now - J.born > 5000 || J.x < -40 || J.y < -40 || J.x > W + 40 || J.y > H + 40) {
        // the last of it blooms and lets go
        if (!fluid.blocked(J.x, J.y)) fluid.splat(J.x, J.y, co * 0.6, si * 0.6, 0.85 * J.pw, 5, 0, 0.4, 0.35 * J.side);
        jets[n] = jets[jets.length - 1];
        jets.pop();
      }
    }
  }
  function releaseHover(dt, now) {
    for (const p of pts) {
      p.charge = Math.min(1, p.charge + 0.0035 * dt);
      if (p.cool > 0) p.cool -= dt * 16.667;
    }
    while (trail.length && now - trail[0].t > 3200) trail.shift();
    if (!mouse.inside || mouse.tx < -1e3) {
      ink.still = 0;
      return;
    }
    const cx = mouse.tx,
      cy = mouse.ty,
      lc = trail[trail.length - 1];
    if (!lc || Math.hypot(cx - lc.x, cy - lc.y) > 7) {
      trail.push({
        x: cx,
        y: cy,
        t: now,
        id: ink.crumb++
      });
      if (trail.length > 260) trail.shift();
      ink.still = 0;
      ink.armed = true;
    } else if (!fluid.blocked(cx, cy)) {
      if (!ink.still) ink.still = now;
      if (now - ink.still > 1200 && ink.armed && now - ink.lastBloom > 6000) {
        smokeBloom(cx, cy, 1, now);
        ink.lastBloom = now;
        ink.armed = false;
        ink.dir = -ink.dir;
      }
    }
    if (now - mouse.moved > 700 || jets.length >= MAX_FOLLOW) return;
    let live = jets.length;
    const back = trail.length > 4 ? trail[trail.length - 5] : null,
      mvx = back ? cx - back.x : 0,
      mvy = back ? cy - back.y : 0,
      ml = Math.hypot(mvx, mvy) || 1;
    for (const p of pts) {
      if (p.cool > 0 || p.charge < 0.5 || p.side !== 1) continue;
      const dx = p.dx - cx,
        dy = p.dy - cy,
        d = Math.hypot(dx, dy);
      if (d > TRIG || fluid.blocked(p.dx, p.dy)) continue;
      const toward = (dx * mvx + dy * mvy) / (d * ml + 1e-3);
      if (Math.random() < Math.pow(1 - d / TRIG, 1.6) * 0.1 * dt * (1 + 0.9 * Math.max(0, toward))) {
        emit(p, now);
        if (++live >= MAX_FOLLOW) break;
      }
    }
  }

  // ---------- Ink: shared ----------
  function enter(el) {
    hov.el = el;
    hov.on = true;
    if (theme !== 'ink' || tr || reduced) return;
    smokeSpillStart(el, performance.now());
  }
  function leave(el) {
    if (hov.el === el) hov.on = false;
    const st = spills.get(el);
    if (st && st.on) {
      st.on = false;
      st.end = performance.now();
    }
  }
  function ambient(now) {
    if (now < nextWisp || !pts.length) return;
    nextWisp = now + 9000 + Math.random() * 12000;
    const p = pts[Math.random() * pts.length | 0];
    if (!fluid.blocked(p.dx, p.dy)) {
      fluid.splat(p.dx, p.dy, (Math.random() - 0.5) * 0.6, -0.2 - Math.random() * 0.25, 0.4, 5);
      p.pulse = 0.5;
    }
  }
  // While the state changes, each star that turns bleeds a little ink.
  function inkBleed(p) {
    fluid.splat(p.dx, p.dy, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, 0.2 + p.r * 0.14, 3.5 + p.r * 2.2);
  }
  function inkBloom(x, y, s, now) {
    smokeBloom(x, y, s || 1, now || performance.now());
  }
  function drawSmoke(vis) {
    if (!fluid.render() || vis < 0.01) return;
    const cs = fluid.cs,
      w = fluid.nx * cs,
      h = fluid.ny * cs,
      hx = inkH.getContext('2d');
    hx.clearRect(0, 0, inkH.width, inkH.height);
    hx.drawImage(inkC, 0, 0, inkH.width, inkH.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.globalAlpha = 0.22 * vis;
    ctx.drawImage(inkH, -cs, -cs, w, h);
    ctx.globalAlpha = vis;
    ctx.drawImage(inkC, -cs, -cs, w, h);
    ctx.globalAlpha = 1;
  }
  function clearInk() {
    jets.length = 0;
    trail.length = 0;
    ink.queue.length = 0;
    spills.clear();
    fluid.reset();
  }

  // ---------- The aether, the glass ----------
  function paintPlasma() {
    const w = pl.width,
      h = pl.height,
      M = Math.max(w, h);
    plx.setTransform(1, 0, 0, 1, 0, 0);
    plx.globalCompositeOperation = 'source-over';
    plx.clearRect(0, 0, w, h);
    plx.globalCompositeOperation = 'lighter';
    for (const b of blobs) {
      const x = w * (0.5 + 0.44 * Math.sin(time * b.fx + b.px)),
        y = h * (0.5 + 0.44 * Math.sin(time * b.fy + b.py));
      const r = M * b.r * (0.92 + 0.08 * Math.sin(time * 0.13 + b.i)),
        rot = b.rot + time * 0.02,
        cs = Math.cos(rot),
        sn = Math.sin(rot);
      const c = [0, 1, 2].map(k => Math.round(lerp(NC[b.i][k], IC[b.i][k], L))).join(',');
      plx.setTransform(cs, sn, -sn * b.e, cs * b.e, x, y);
      const g = plx.createRadialGradient(0, 0, 0, 0, 0, r);
      g.addColorStop(0, `rgba(${c},0.85)`);
      g.addColorStop(0.5, `rgba(${c},0.32)`);
      g.addColorStop(1, `rgba(${c},0)`);
      plx.fillStyle = g;
      plx.fillRect(-r, -r, r * 2, r * 2);
    }
  }
  function drawPlasma(boost) {
    const an = 0.06 * (1 - L) * boost,
      ai = 0.1 * L * Math.min(1.4, boost);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (an > 0.002) {
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = an;
      ctx.drawImage(pl, 0, 0, W, H);
    }
    if (ai > 0.002) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = ai;
      ctx.drawImage(pl, 0, 0, W, H);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
  function drawBg() {
    if (L < 0.999) ctx.drawImage(bgN, 0, 0, W, H);
    if (L > 0.001) {
      ctx.globalAlpha = L;
      ctx.drawImage(bgI, 0, 0, W, H);
      ctx.globalAlpha = 1;
    }
    if (L > 0.001 && L < 0.999) radial(ctx, W / 2, H / 2, Math.max(W, H) * (0.3 + 0.7 * L), [[0, `rgba(238,242,247,${Math.sin(Math.PI * L) * 0.3})`], [1, 'rgba(238,242,247,0)']]);
  }
  function lens() {
    const a = 0.1 * L;
    if (a < 0.005 || mouse.x < -1e3) return;
    const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
    g.addColorStop(0, `rgba(255,255,255,${a})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(mouse.x - 260, mouse.y - 260, 520, 520);
  }
  function vignette(g) {
    const M = Math.max(W, H),
      gr = ctx.createRadialGradient(W / 2, H / 2, M * 0.25, W / 2, H / 2, M * 0.8),
      inkish = L > 0.5;
    gr.addColorStop(0, inkish ? 'rgba(120,128,142,0)' : 'rgba(0,0,0,0)');
    gr.addColorStop(1, inkish ? `rgba(120,128,142,${0.09 * g})` : `rgba(0,0,0,${0.18 * g})`);
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, W, H);
  }
  // One faint lens-ripple crossing the glass while the state changes.
  function drawRipple(k) {
    const s = (k - 0.34) / 0.46;
    if (s <= 0 || s >= 1) return;
    const cx = W / 2,
      cy = H / 2,
      R = easeOut(s) * Math.hypot(cx, cy) * 1.08,
      band = 26 + 50 * s,
      fade = Math.sin(Math.PI * s),
      z = 1 + 0.014 * fade,
      sx = rip.width / W;
    rpx.globalCompositeOperation = 'source-over';
    rpx.setTransform(1, 0, 0, 1, 0, 0);
    rpx.clearRect(0, 0, rip.width, rip.height);
    rpx.setTransform(sx * z, 0, 0, sx * z, sx * cx * (1 - z), sx * cy * (1 - z));
    rpx.drawImage(canvas, 0, 0, W, H);
    rpx.setTransform(sx, 0, 0, sx, 0, 0);
    rpx.globalCompositeOperation = 'destination-in';
    let g = rpx.createRadialGradient(cx, cy, Math.max(0, R - band), cx, cy, R + band);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(0.5, `rgba(0,0,0,${fade})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    rpx.fillStyle = g;
    rpx.fillRect(0, 0, W, H);
    rpx.globalCompositeOperation = 'source-over';
    ctx.drawImage(rip, 0, 0, W, H);
    g = ctx.createRadialGradient(cx, cy, Math.max(0, R - band), cx, cy, R + band);
    g.addColorStop(0, 'rgba(230,236,255,0)');
    g.addColorStop(0.55, `rgba(230,236,255,${0.05 * fade})`);
    g.addColorStop(1, 'rgba(230,236,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  // ---------- Change of state ----------
  function settle(to) {
    theme = to;
    L = to === 'ink' ? 1 : 0;
    drift = to === 'ink' ? INK_DRIFT : 1;
    lineK = to === 'ink' ? 0 : 1;
    inkK = 1;
    for (const p of pts) p.side = L > p.thr ? 1 : 0;
    ink.px = -1e4;
    ink.still = 0;
    if (to === 'night') clearInk();
  }
  function begin(to, dur) {
    tr = {
      to,
      t0: performance.now(),
      dur: dur || 2600,
      swapped: false,
      next: null,
      boost: 1
    };
  }
  function stepTransition(now) {
    const T = tr,
      k = clamp((now - T.t0) / T.dur, 0, 1),
      toInk = T.to === 'ink';
    if (toInk) {
      L = easeInOut(clamp((k - 0.3) / 0.5, 0, 1));
      drift = k < 0.3 ? 1 - smooth(0, 0.26, k) : INK_DRIFT * smooth(0.72, 1, k);
      lineK = 1 - smooth(0.02, 0.28, k);
      inkK = 1;
    } else {
      L = 1 - easeInOut(clamp((k - 0.18) / 0.52, 0, 1));
      drift = k < 0.3 ? INK_DRIFT * (1 - smooth(0, 0.22, k)) : smooth(0.7, 1, k);
      lineK = smooth(0.66, 0.98, k);
      inkK = 1 - smooth(0, 0.35, k);
    }
    T.boost = 1 + 0.8 * Math.exp(-Math.pow((k - 0.28) / 0.08, 2));
    if (!T.swapped && (toInk ? L >= 0.5 : L <= 0.5)) {
      T.swapped = true;
      onSwap(T.to);
    }
    if (k >= 1) {
      const nx = T.next;
      tr = null;
      settle(T.to);
      if (!T.swapped) onSwap(T.to);
      if (nx && nx !== theme) begin(nx);
    }
    return k;
  }
  // The gaze: every few minutes, for three seconds, the field dims slightly and every point leans toward you.
  function gazeAt(now) {
    if (!gazeT) {
      if (!tr && !reduced && now > nextGaze && mouse.inside && now - mouse.moved < 8000) gazeT = now;else return 0;
    }
    const k = (now - gazeT) / 3400;
    if (k >= 1) {
      gazeT = null;
      nextGaze = now + (160 + Math.random() * 200) * 1000;
      return 0;
    }
    const s = Math.sin(Math.PI * k);
    return s * s;
  }
  function render(dt, k, gz, now) {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    drawBg();
    drawPlasma((tr ? tr.boost : 1) * (1 + 0.6 * gz));
    if (L > 0.01) lens();
    if (lineK > 0.01) drawLinks(lineK, gz);
    const iv = inkK * Math.min(1, L * 1.5);
    if (fluid.any()) drawSmoke(iv);
    drawPoints(dt);
    ctx.fillStyle = L > 0.5 ? gI : gN;
    ctx.fillRect(0, 0, W, H);
    if (gz > 0.001) vignette(gz);
    if (tr) drawRipple(k);
  }
  // Demo: a virtual cursor wanders (and now and then rests) while no real pointer is inside — for cards and previews.
  function demoCursor(dt, now) {
    vcur.clock += dt / 60;
    const moving = vcur.clock % 9.5 < 7.4;
    if (moving) vcur.s += dt / 60 * 0.85;
    const t = vcur.s,
      x = W * (0.5 + 0.36 * Math.sin(t * 0.61) * Math.cos(t * 0.23 + 0.7)),
      y = H * (0.5 + 0.3 * Math.sin(t * 0.43 + 1.3));
    mouse.inside = true;
    mouse.tx = x;
    mouse.ty = y;
    if (moving) mouse.moved = now;
    if (mouse.x < -1e3) {
      mouse.x = x;
      mouse.y = y;
    }
  }
  function frame(now) {
    if (!alive) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(3, (now - last) / 16.667);
    last = now;
    time += dt / 60;
    fn++;
    if (demo && !real.inside) demoCursor(dt, now);
    const k = tr ? stepTransition(now) : 0,
      gz = gazeAt(now);
    hov.s += ((hov.on ? 1 : 0) - hov.s) * Math.min(1, 0.05 * dt);
    stepPoints(dt, gz);
    glintNear();
    if (L > 0.05 && fn - ink.maskFn > (ink.dirty ? 3 : 18)) updateMask();
    if (theme === 'ink' && !tr && !reduced) {
      if (style === 'smoke') smokeHover(dt, now);else releaseHover(dt, now);
      for (const st of spills.values()) if (st.on) spill(st, dt, now);
      ambient(now);
    } else for (const p of pts) p.charge = Math.min(1, p.charge + 0.004 * dt);
    const q = ink.queue;
    for (let i = q.length - 1; i >= 0; i--) if (q[i].at <= now) {
      const f = q[i].fn;
      q.splice(i, 1);
      f();
    }
    if (jets.length) stepJets(dt, now);
    if (fluid.on) {
      const att = style === 'smoke' && ink.as > 0.02 && theme === 'ink' && !tr ? {
        x: ink.ax,
        y: ink.ay,
        r: REACH + 50,
        s: 1.9 * ink.as,
        ring: 30,
        orbit: 0.8 * ink.dir
      } : null;
      fluid.step(Math.min(dt, 2), Math.pow(tr && tr.to === 'night' ? 0.93 : style === 'release' ? 0.9965 : 0.9925, dt), Math.pow(0.985, dt), style === 'release' ? 0.5 : 0.32, time, att);
    }
    if (fn % 2 === 0 || tr) paintPlasma();
    render(dt, k, gz, now);
  }
  function still() {
    stepPoints(0, 0);
    paintPlasma();
    render(0, 0, 0, performance.now());
  }
  const toLocal = e => {
    if (!contained) return [e.clientX, e.clientY];
    const r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  function onMove(e) {
    const [x, y] = toLocal(e),
      inside = !contained || x >= 0 && y >= 0 && x <= W && y <= H;
    real.inside = inside;
    mouse.inside = inside;
    mouse.moved = performance.now();
    if (inside) {
      mouse.tx = x;
      mouse.ty = y;
      if (mouse.x < -1e3) {
        mouse.x = x;
        mouse.y = y;
      }
    } else {
      mouse.tx = mouse.ty = -1e4;
    }
    if (!touch) {
      par.tx = (e.clientX / innerWidth - 0.5) * 14;
      par.ty = (e.clientY / innerHeight - 0.5) * 14;
    }
  }
  const onExit = () => {
    real.inside = false;
    mouse.inside = false;
    mouse.tx = mouse.ty = -1e4;
  };
  const onUp = e => {
    if (e.pointerType === 'touch') onExit();
  };
  function onDown(e) {
    if (theme !== 'ink' || tr || reduced) return;
    if (e.target.closest && e.target.closest('a,button,input,textarea,select,label,[role=button],[data-node],[data-no-bloom]')) return;
    const [x, y] = toLocal(e);
    if (contained && (x < 0 || y < 0 || x > W || y > H)) return;
    const now = performance.now();
    if (fluid.blocked(x, y) || maskAt(x, y) > 0.2 || now - ink.lastBloom < 1200) return;
    inkBloom(x, y, 1, now);
    ink.lastBloom = now;
    ink.armed = false;
  }
  function onOver(e) {
    const el = e.target.closest && e.target.closest('[data-node]');
    if (!el || contained && !canvas.parentElement.contains(el)) return;
    if (hov.el && hov.el !== el) leave(hov.el);
    enter(el);
  }
  function onOut(e) {
    const el = e.target.closest && e.target.closest('[data-node]');
    if (!el || e.relatedTarget && el.contains(e.relatedTarget)) return;
    leave(el);
  }
  function onScroll() {
    ink.dirty = true;
    ink.still = 0;
    if (reduced) still();
  }
  let rt;
  const onResize = () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      size();
      if (reduced) still();
    }, 150);
  };
  size();
  addEventListener('pointermove', onMove, {
    passive: true
  });
  document.documentElement.addEventListener('mouseleave', onExit);
  addEventListener('pointerup', onUp);
  addEventListener('pointerdown', onDown);
  document.addEventListener('pointerover', onOver);
  document.addEventListener('pointerout', onOut);
  addEventListener('scroll', onScroll, {
    passive: true
  });
  addEventListener('resize', onResize);
  let ro;
  if (contained && typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(onResize);
    ro.observe(canvas.parentElement);
  }
  if (reduced) still();else raf = requestAnimationFrame(frame);
  return {
    get theme() {
      return tr ? tr.to : theme;
    },
    get inkStyle() {
      return style;
    },
    setInkStyle(s) {
      if (!INK_STYLES.includes(s) || s === style) return;
      style = s;
      clearInk();
    },
    setTheme(to, o = {}) {
      to = to === 'ink' ? 'ink' : 'night';
      if (tr) {
        tr.next = to === tr.to ? null : to;
        return;
      }
      if (to === theme) return;
      if (reduced || o.instant) {
        settle(to);
        clearInk();
        onSwap(to);
        if (reduced) still();
        return;
      }
      begin(to, o.duration);
    },
    navigate() {
      dollyT += 40;
    },
    gaze() {
      gazeT = performance.now();
    },
    bloom(x, y, s) {
      if (!reduced) inkBloom(x ?? W / 2, y ?? H / 2, s ?? 1);
    },
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      ro && ro.disconnect();
      removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onExit);
      removeEventListener('pointerup', onUp);
      removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
    }
  };
}
Object.assign(__ds_scope, { MARK, INK_STYLES, createField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/fieldEngine.js", error: String((e && e.message) || e) }); }

// components/brand/Field.jsx
try { (() => {
const {
  useEffect,
  useRef
} = React;
// Global field: mount once per page. It owns the change of state and writes html[data-theme] at the midpoint.
// Contained field: fills its positioned parent (cards, previews); follows `theme` prop or html[data-theme].
function Field({
  contained = false,
  theme,
  inkStyle,
  demo = false,
  className,
  style,
  onReady
}) {
  const ref = useRef(null);
  const eng = useRef(null);
  useEffect(() => {
    const root = document.documentElement;
    const owns = !contained && theme == null;
    const e = __ds_scope.createField(ref.current, {
      contained,
      demo,
      inkStyle: inkStyle || root.dataset.ink || 'smoke',
      theme: theme || root.dataset.theme || 'night',
      onSwap: to => {
        if (!owns) return;
        root.dataset.theme = to;
        try {
          localStorage.setItem('es-theme', to);
        } catch (_) {}
        window.dispatchEvent(new CustomEvent('field:themechange', {
          detail: {
            theme: to
          }
        }));
      }
    });
    eng.current = e;
    if (onReady) onReady(e);
    const onReq = ev => e.setTheme(ev.detail.theme, ev.detail);
    const onNav = () => e.navigate();
    let mo;
    if (owns) {
      window.__esField = (window.__esField || 0) + 1;
      window.addEventListener('field:theme', onReq);
    } else if (theme == null) {
      mo = new MutationObserver(() => e.setTheme(root.dataset.theme || 'night'));
      mo.observe(root, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }
    window.addEventListener('field:navigate', onNav);
    return () => {
      e.destroy();
      window.removeEventListener('field:navigate', onNav);
      if (owns) {
        window.__esField -= 1;
        window.removeEventListener('field:theme', onReq);
      }
      mo && mo.disconnect();
    };
  }, [contained, demo]);
  useEffect(() => {
    if (theme != null && eng.current) eng.current.setTheme(theme);
  }, [theme]);
  useEffect(() => {
    if (inkStyle && eng.current) eng.current.setInkStyle(inkStyle);
  }, [inkStyle]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    className: 'field-canvas' + (contained ? ' field-canvas--contained' : '') + (className ? ' ' + className : ''),
    style: style,
    "aria-hidden": "true"
  });
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Field.jsx", error: String((e && e.message) || e) }); }

// components/brand/Mark.jsx
try { (() => {
const {
  useEffect,
  useRef,
  useState,
  useId
} = React;
const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const readTheme = () => typeof document !== 'undefined' && document.documentElement.dataset.theme === 'ink' ? 1 : 0;
const STEP = Math.PI * 2 / 7,
  UP = -Math.PI / 2;
const group = a => Math.round(Math.abs(Math.atan2(Math.sin(a - UP), Math.cos(a - UP))) / STEP);
function useMedium(medium) {
  const [t, setT] = useState(() => medium != null ? medium === 'ink' ? 1 : 0 : readTheme());
  const cur = useRef(t),
    raf = useRef(0);
  useEffect(() => {
    const go = to => {
      cancelAnimationFrame(raf.current);
      const from = cur.current,
        t0 = performance.now();
      if (from === to) return;
      const step = now => {
        const k = Math.min(1, (now - t0) / 1200);
        cur.current = from + (to - from) * easeInOut(k);
        setT(cur.current);
        if (k < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    };
    if (medium != null) {
      go(medium === 'ink' ? 1 : 0);
      return () => cancelAnimationFrame(raf.current);
    }
    const mo = new MutationObserver(() => go(readTheme()));
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [medium]);
  return t;
}

// The mark: a symmetric figure of seven limbs on 360/7 spacing, one faint pair of antennae,
// and a single lit limb — the only thing that breaks the symmetry.
// Alive: it emerges on mount (core, then the limbs in symmetric pairs, the light last), breathes at rest,
// sends a slow pulse down the lit limb every few seconds, and reaches out a little when you hover it.
function Mark({
  size = 28,
  medium,
  t: tProp,
  weight,
  title = 'Eshaan Sharma',
  animate = true,
  className,
  style
}) {
  const tA = useMedium(medium);
  const t = tProp != null ? tProp : tA;
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [still] = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const live = animate && !still;
  const sw = (weight || (size < 40 ? 1.5 : size < 96 ? 1.1 : 0.8)) * (1 + 0.35 * t);
  const [cx, cy] = __ds_scope.MARK.core;
  const tip = r => [cx + Math.cos(r.a) * r.len, cy + Math.sin(r.a) * r.len];
  const lit = __ds_scope.MARK.rays.find(r => r.lit),
    [lx, ly] = tip(lit);
  const organic = size >= 64 && t > 0.02;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 48 48",
    width: size,
    height: size,
    className: 'mark' + (live ? ' mark--live' : '') + (className ? ' ' + className : ''),
    style: style,
    role: "img",
    "aria-label": title || undefined,
    "aria-hidden": title ? undefined : true
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: 'gl' + id,
    x: "-50%",
    y: "-50%",
    width: "200%",
    height: "200%"
  }, /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "0.9"
  })), organic && /*#__PURE__*/React.createElement("filter", {
    id: 'ik' + id,
    x: "-10%",
    y: "-10%",
    width: "120%",
    height: "120%"
  }, /*#__PURE__*/React.createElement("feTurbulence", {
    type: "fractalNoise",
    baseFrequency: "0.85",
    numOctaves: "2",
    seed: "7"
  }), /*#__PURE__*/React.createElement("feDisplacementMap", {
    in: "SourceGraphic",
    scale: 0.9 * t
  }))), /*#__PURE__*/React.createElement("g", {
    strokeLinecap: "round",
    filter: organic ? `url(#ik${id})` : undefined
  }, /*#__PURE__*/React.createElement("g", {
    className: "mark__limbs"
  }, __ds_scope.MARK.faint.map((r, i) => {
    const [x, y] = tip(r);
    return /*#__PURE__*/React.createElement("line", {
      key: 'f' + i,
      className: "mark__ray",
      pathLength: "1",
      style: {
        '--g': 4
      },
      x1: cx,
      y1: cy,
      x2: x,
      y2: y,
      stroke: "currentColor",
      strokeWidth: sw * 0.9,
      opacity: "0.34"
    });
  }), __ds_scope.MARK.rays.filter(r => !r.lit).map((r, i) => {
    const [x, y] = tip(r);
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      className: "mark__ray",
      pathLength: "1",
      style: {
        '--g': group(r.a)
      },
      x1: cx,
      y1: cy,
      x2: x,
      y2: y,
      stroke: "currentColor",
      strokeWidth: sw,
      opacity: 0.72 + 0.2 * t
    });
  }), t < 0.98 && /*#__PURE__*/React.createElement("line", {
    className: "mark__ray",
    pathLength: "1",
    style: {
      '--g': 5
    },
    x1: cx,
    y1: cy,
    x2: lx,
    y2: ly,
    stroke: "var(--mark-lit)",
    strokeWidth: sw * 2.8,
    opacity: 0.55 * (1 - t),
    filter: `url(#gl${id})`
  }), /*#__PURE__*/React.createElement("line", {
    className: "mark__ray",
    pathLength: "1",
    style: {
      '--g': 5
    },
    x1: cx,
    y1: cy,
    x2: lx,
    y2: ly,
    stroke: "var(--mark-lit)",
    strokeWidth: sw * (1.1 + 0.3 * t)
  })), /*#__PURE__*/React.createElement("circle", {
    className: "mark__halo",
    cx: cx,
    cy: cy,
    r: "5.4",
    fill: "var(--mark-halo)"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "mark__core",
    cx: cx,
    cy: cy,
    r: 2.5 + 0.5 * t,
    fill: "var(--mark-lit)"
  }), live && size >= 20 && /*#__PURE__*/React.createElement("circle", {
    r: sw * 0.95,
    fill: "var(--mark-lit)",
    opacity: "0"
  }, /*#__PURE__*/React.createElement("animateMotion", {
    dur: "9s",
    begin: "2.2s",
    repeatCount: "indefinite",
    calcMode: "linear",
    keyPoints: "0;0;1;1",
    keyTimes: "0;0.8;0.9;1",
    path: `M${cx} ${cy}L${lx} ${ly}`
  }), /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    dur: "9s",
    begin: "2.2s",
    repeatCount: "indefinite",
    values: "0;0;0.95;0;0",
    keyTimes: "0;0.8;0.84;0.9;1"
  }))));
}
Object.assign(__ds_scope, { Mark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Mark.jsx", error: String((e && e.message) || e) }); }

// components/brand/Lockup.jsx
try { (() => {
function Lockup({
  name = 'Eshaan Sharma',
  sub,
  size = 26,
  href,
  onClick,
  medium
}) {
  const Tag = href || onClick ? 'a' : 'span';
  return /*#__PURE__*/React.createElement(Tag, {
    className: "lockup",
    href: href,
    onClick: onClick,
    "aria-label": href || onClick ? name + ' — home' : undefined
  }, /*#__PURE__*/React.createElement(__ds_scope.Mark, {
    size: size,
    medium: medium,
    title: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "lockup__name"
  }, name), sub && /*#__PURE__*/React.createElement("span", {
    className: "lockup__sub"
  }, sub));
}
Object.assign(__ds_scope, { Lockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Lockup.jsx", error: String((e && e.message) || e) }); }

// components/content/EntryRow.jsx
try { (() => {
function EntryRow({
  date,
  title,
  excerpt,
  kind,
  reading,
  href = '#',
  onOpen
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "entry",
    "data-node": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "entry__date"
  }, /*#__PURE__*/React.createElement("span", {
    className: "entry__dot",
    "data-node-dot": true,
    "aria-hidden": "true"
  }), date), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "entry__title"
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: e => {
      if (onOpen) {
        e.preventDefault();
        onOpen();
      }
    }
  }, title)), excerpt && /*#__PURE__*/React.createElement("p", {
    className: "entry__excerpt"
  }, excerpt)), /*#__PURE__*/React.createElement("div", {
    className: "entry__meta"
  }, kind && /*#__PURE__*/React.createElement("span", null, kind), reading && /*#__PURE__*/React.createElement("span", null, reading)));
}
Object.assign(__ds_scope, { EntryRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/EntryRow.jsx", error: String((e && e.message) || e) }); }

// components/content/LabTile.jsx
try { (() => {
function LabTile({
  title,
  kind,
  note,
  image,
  seed,
  empty,
  href = '#',
  onOpen
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "lab-tile",
    "data-node": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "lab-tile__media",
    "data-node-rim": true
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: ""
  }) : empty ? /*#__PURE__*/React.createElement("div", {
    className: "lab-tile__empty"
  }, empty) : /*#__PURE__*/React.createElement(__ds_scope.Sigil, {
    seed: seed || title,
    nodes: 7,
    width: 240,
    height: 180
  }), /*#__PURE__*/React.createElement("span", {
    className: "node",
    "data-node-dot": true,
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "lab-tile__row"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "lab-tile__title"
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: e => {
      if (onOpen) {
        e.preventDefault();
        onOpen();
      }
    }
  }, title)), kind && /*#__PURE__*/React.createElement("span", {
    className: "lab-tile__kind"
  }, kind)), note && /*#__PURE__*/React.createElement("p", {
    className: "lab-tile__note"
  }, note));
}
Object.assign(__ds_scope, { LabTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/LabTile.jsx", error: String((e && e.message) || e) }); }

// components/content/Metric.jsx
try { (() => {
function Metric({
  value,
  unit,
  label,
  note
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric__value"
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    className: "metric__unit"
  }, unit)), /*#__PURE__*/React.createElement("div", {
    className: "metric__label"
  }, label), note && /*#__PURE__*/React.createElement("div", {
    className: "metric__note"
  }, note));
}
Object.assign(__ds_scope, { Metric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Metric.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeader.jsx
try { (() => {
function SectionHeader({
  index,
  title,
  description,
  action
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "section-head"
  }, index && /*#__PURE__*/React.createElement("div", {
    className: "section-head__index"
  }, index), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "section-head__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "section-head__desc"
  }, description)), action && /*#__PURE__*/React.createElement("div", null, action));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function Chip({
  children,
  selected = false,
  count,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "chip",
    "aria-pressed": selected,
    onClick: onClick
  }, children, count != null && /*#__PURE__*/React.createElement("span", {
    className: "chip__count"
  }, count));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
const {
  useLayoutEffect,
  useRef,
  useState
} = React;
function SegmentedControl({
  options = [],
  value,
  onChange,
  label = 'Filter'
}) {
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const ref = useRef(null);
  const [thumb, setThumb] = useState({
    x: 0,
    w: 0
  });
  useLayoutEffect(() => {
    const el = ref.current && ref.current.querySelector('[aria-selected="true"]');
    if (el) setThumb({
      x: el.offsetLeft,
      w: el.offsetWidth
    });
  }, [value, options.length]);
  return /*#__PURE__*/React.createElement("div", {
    className: "seg",
    role: "tablist",
    "aria-label": label,
    ref: ref
  }, /*#__PURE__*/React.createElement("span", {
    className: "seg__thumb",
    style: {
      transform: 'translateX(' + thumb.x + 'px)',
      width: thumb.w
    },
    "aria-hidden": "true"
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "tab",
    className: "seg__item",
    "aria-selected": o.value === value,
    onClick: () => onChange && onChange(o.value)
  }, o.label, o.count != null && /*#__PURE__*/React.createElement("span", {
    className: "seg__count"
  }, o.count))));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  tone = 'neutral',
  dot = false,
  outline = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'tag' + (tone !== 'neutral' ? ' tag--' + tone : '') + (outline ? ' tag--outline' : '')
  }, dot && /*#__PURE__*/React.createElement("span", {
    className: "tag__dot"
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/WorkCard.jsx
try { (() => {
function WorkCard({
  title,
  summary,
  domain,
  year,
  stack = [],
  seed,
  image,
  metric,
  feature = false,
  href = '#',
  onOpen
}) {
  const open = e => {
    if (onOpen) {
      e.preventDefault();
      onOpen();
    }
  };
  return /*#__PURE__*/React.createElement("article", {
    className: 'work-card' + (feature ? ' work-card--feature' : ''),
    "data-node": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-card__media"
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: ""
  }) : /*#__PURE__*/React.createElement(__ds_scope.Sigil, {
    seed: seed || title,
    nodes: feature ? 10 : 8
  })), /*#__PURE__*/React.createElement("div", {
    className: "work-card__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-card__meta"
  }, domain && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: domain === 'Trading' ? 'accent' : 'neutral',
    dot: true
  }, domain), /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, year)), /*#__PURE__*/React.createElement("h3", {
    className: "work-card__title"
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: open
  }, title)), summary && /*#__PURE__*/React.createElement("p", {
    className: "work-card__summary"
  }, summary), /*#__PURE__*/React.createElement("div", {
    className: "work-card__foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "work-card__stack"
  }, stack.slice(0, feature ? 6 : 4).join(' · ')), metric && /*#__PURE__*/React.createElement("div", {
    className: "work-card__metric"
  }, /*#__PURE__*/React.createElement("b", null, metric.value), /*#__PURE__*/React.createElement("span", null, metric.label)))), /*#__PURE__*/React.createElement("span", {
    className: "node",
    "data-node-dot": true,
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { WorkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/WorkCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
const {
  useId
} = React;
function TextField({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  multiline = false,
  rows = 5,
  hint,
  error,
  optional,
  disabled,
  name
}) {
  const id = useId();
  const C = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("div", {
    className: 'input' + (error ? ' is-error' : '') + (disabled ? ' is-disabled' : '')
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "input__label",
    htmlFor: id
  }, label, optional && /*#__PURE__*/React.createElement("em", null, "Optional")), /*#__PURE__*/React.createElement(C, {
    id: id,
    name: name,
    className: "input__control",
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    type: multiline ? undefined : type,
    rows: multiline ? rows : undefined,
    disabled: disabled,
    "aria-invalid": !!error || undefined,
    "aria-describedby": hint || error ? id + '-h' : undefined
  }), (error || hint) && /*#__PURE__*/React.createElement("div", {
    className: "input__hint",
    id: id + '-h'
  }, error || hint));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
// Lucide (ISC) path data, inlined. 24px grid, 1.5 stroke — matches the hairline system.
const P = {
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  'external-link': '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  menu: '<line x1="4" x2="20" y1="7" y2="7"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="17" y2="17"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'
};
const ICON_NAMES = Object.keys(P);
function Icon({
  name,
  size = 18,
  stroke = 1.5,
  className,
  style,
  title
}) {
  const d = P[name];
  if (!d) return null;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: style,
    "aria-hidden": title ? undefined : true,
    role: title ? 'img' : undefined,
    dangerouslySetInnerHTML: {
      __html: (title ? `<title>${title}</title>` : '') + d
    }
  });
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  iconTrail,
  href,
  onClick,
  disabled,
  type = 'button',
  full,
  target,
  className
}) {
  const cls = 'btn btn--' + variant + (size !== 'md' ? ' btn--' + size : '') + (full ? ' btn--full' : '') + (disabled ? ' is-disabled' : '') + (className ? ' ' + className : '');
  const Tag = href ? 'a' : 'button';
  const trailUp = iconTrail === 'arrow-up-right' || iconTrail === 'external-link';
  return /*#__PURE__*/React.createElement(Tag, {
    className: cls,
    href: href,
    onClick: onClick,
    target: target,
    rel: target ? 'noreferrer' : undefined,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    "aria-disabled": disabled || undefined
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon
  }), children != null && /*#__PURE__*/React.createElement("span", null, children), iconTrail && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconTrail,
    className: 'btn__trail' + (trailUp ? ' btn__trail--up' : '')
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  href,
  onClick,
  size = 'md',
  variant = 'outline',
  target
}) {
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    className: 'icon-btn' + (size === 'sm' ? ' icon-btn--sm' : '') + (variant === 'ghost' ? ' icon-btn--ghost' : ''),
    "aria-label": label,
    title: label,
    href: href,
    onClick: onClick,
    target: target,
    rel: target ? 'noreferrer' : undefined,
    type: href ? undefined : 'button'
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
const {
  useEffect,
  useState
} = React;
function Footer({
  onNavigate,
  email = 'ethanarkham@gmail.com',
  github = 'https://github.com/Yokai-2510',
  linkedin = 'https://linkedin.com/in/eshaansharma2510',
  location = 'Gurgaon, India',
  timeZone = 'Asia/Kolkata',
  line = 'Available for contract and full-time engagements. Time-zone flexible.',
  index = ['Work', 'Products', 'Writing', 'Craft', 'About', 'Contact']
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(i);
  }, []);
  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone
  });
  const nav = p => e => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(p);
    }
  };
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer__lead"
  }, /*#__PURE__*/React.createElement("p", null, line), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    iconTrail: "arrow-right",
    href: onNavigate ? '#' : 'mailto:' + email,
    onClick: onNavigate ? nav('Contact') : undefined
  }, "Start a conversation")), /*#__PURE__*/React.createElement("div", {
    className: "footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Index"), index.map(p => /*#__PURE__*/React.createElement("a", {
    key: p,
    href: "#",
    onClick: nav(p)
  }, p))), /*#__PURE__*/React.createElement("div", {
    className: "footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Elsewhere"), /*#__PURE__*/React.createElement("a", {
    href: github,
    target: "_blank",
    rel: "noreferrer"
  }, "GitHub ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    href: linkedin,
    target: "_blank",
    rel: "noreferrer"
  }, "LinkedIn ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + email
  }, "Email ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "footer__base"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", now.getFullYear(), " Eshaan Sharma"), /*#__PURE__*/React.createElement("span", null, location, " \xB7 ", time, " IST"))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
const {
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} = React;
const NAV = ['Work', 'Products', 'Writing', 'Craft', 'About'];

// The current page is marked by a short bar of light (Night) or ink (Ink) — never a dot: dots belong to the Field.
// Hover another item and the bar reaches a little toward it.
function TopBar({
  items = NAV,
  active,
  onNavigate,
  cta = 'Contact',
  onCta,
  fixed = true,
  scrolled: forced
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(false);
  const [cx, setCx] = useState({});
  const [ready, setReady] = useState(false);
  const nav = useRef(null);
  useEffect(() => {
    if (!fixed) return;
    const f = () => setScrolled(window.scrollY > 12);
    f();
    addEventListener('scroll', f, {
      passive: true
    });
    return () => removeEventListener('scroll', f);
  }, [fixed]);
  useLayoutEffect(() => {
    const el = nav.current;
    if (!el) return;
    const m = () => {
      const o = {};
      el.querySelectorAll('[data-item]').forEach(a => {
        o[a.dataset.item] = a.offsetLeft + a.offsetWidth / 2;
      });
      setCx(o);
    };
    m();
    const ro = new ResizeObserver(m);
    ro.observe(el);
    const r = requestAnimationFrame(() => setReady(true));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(r);
    };
  }, [items.join()]);
  const go = p => {
    setOpen(false);
    onNavigate && onNavigate(p);
  };
  const ac = cx[active],
    hc = cx[hover];
  let bar;
  if (ac != null) {
    let x = ac - 8,
      w = 16;
    if (hc != null && hover !== active) {
      const reach = (hc - ac) * 0.22;
      if (reach > 0) w += reach;else {
        x += reach;
        w -= reach;
      }
    }
    bar = {
      transform: `translateX(${x}px)`,
      width: w
    };
  }
  return /*#__PURE__*/React.createElement("header", {
    className: 'topbar' + (forced ?? scrolled ? ' is-scrolled' : '') + (fixed ? '' : ' topbar--static')
  }, /*#__PURE__*/React.createElement("div", {
    className: "page topbar__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar__brand"
  }, /*#__PURE__*/React.createElement(__ds_scope.Lockup, {
    onClick: e => {
      e.preventDefault();
      go('Home');
    },
    href: "#"
  })), /*#__PURE__*/React.createElement("nav", {
    className: 'topbar__nav' + (ready ? ' is-ready' : ''),
    ref: nav,
    "aria-label": "Primary",
    onMouseLeave: () => setHover(null)
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    "data-item": it,
    className: "topbar__link",
    "aria-current": it === active ? 'page' : undefined,
    onMouseEnter: () => setHover(it),
    onClick: e => {
      e.preventDefault();
      go(it);
    }
  }, it)), /*#__PURE__*/React.createElement("span", {
    className: 'topbar__bar' + (bar ? ' is-on' : ''),
    style: bar,
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "topbar__actions"
  }, /*#__PURE__*/React.createElement(__ds_scope.ThemeSwitch, null), cta && /*#__PURE__*/React.createElement("span", {
    className: "topbar__cta"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "secondary",
    className: active === cta ? 'is-current' : undefined,
    onClick: () => onCta ? onCta() : go(cta)
  }, cta)), /*#__PURE__*/React.createElement("span", {
    className: "topbar__menu"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "menu",
    label: "Open menu",
    onClick: () => setOpen(true)
  })))), open && /*#__PURE__*/React.createElement("div", {
    className: "sheet",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet__top"
  }, /*#__PURE__*/React.createElement(__ds_scope.Lockup, null), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close menu",
    onClick: () => setOpen(false)
  })), /*#__PURE__*/React.createElement("nav", {
    className: "sheet__nav"
  }, ['Home', ...items, ...(cta ? [cta] : [])].map((it, i) => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    className: "sheet__link emerge",
    style: {
      '--i': i
    },
    "aria-current": it === active ? 'page' : undefined,
    onClick: e => {
      e.preventDefault();
      go(it);
    }
  }, /*#__PURE__*/React.createElement("span", null, String(i).padStart(2, '0')), it)))));
}
Object.assign(__ds_scope, { NAV, TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/showcase/ProductCard.jsx
try { (() => {
// A product with people using it: mark, name + status, one line, platform, and the user count as its proof.
function ProductCard({
  name,
  tagline,
  status = 'Live',
  users,
  usersLabel = 'users',
  metric,
  since,
  platform = [],
  href,
  seed,
  image,
  size = 'md',
  description,
  features = [],
  placeholder = false,
  onOpen,
  className
}) {
  const proof = users != null ? {
    value: users,
    label: usersLabel
  } : metric || {
    value: '—',
    label: usersLabel
  };
  const on = status === 'Live' || status === 'In use';
  return /*#__PURE__*/React.createElement("article", {
    className: 'product product--' + size + (className ? ' ' + className : ''),
    "data-node": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "product__mark"
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: ""
  }) : /*#__PURE__*/React.createElement(__ds_scope.Sigil, {
    seed: seed || name,
    nodes: 6,
    width: 120,
    height: 120
  })), /*#__PURE__*/React.createElement("div", {
    className: "product__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "product__head"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "product__name"
  }, name), /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: on ? 'positive' : 'neutral',
    dot: true
  }, status), placeholder && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    outline: true
  }, "placeholder")), tagline && /*#__PURE__*/React.createElement("p", {
    className: "product__tagline"
  }, tagline), size === 'lg' && description && /*#__PURE__*/React.createElement("p", {
    className: "product__desc"
  }, description), size === 'lg' && features.length > 0 && /*#__PURE__*/React.createElement("ul", {
    className: "product__features"
  }, features.map(f => /*#__PURE__*/React.createElement("li", {
    key: f
  }, f))), /*#__PURE__*/React.createElement("div", {
    className: "product__meta"
  }, platform.length > 0 && /*#__PURE__*/React.createElement("span", null, platform.join(' · ').toLowerCase()), since && /*#__PURE__*/React.createElement("span", null, "since ", since))), /*#__PURE__*/React.createElement("div", {
    className: "product__side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "product__users"
  }, /*#__PURE__*/React.createElement("b", null, proof.value), /*#__PURE__*/React.createElement("span", null, proof.label)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "secondary",
    iconTrail: "arrow-up-right",
    href: href,
    target: href ? '_blank' : undefined,
    onClick: href ? undefined : onOpen
  }, "Visit")), /*#__PURE__*/React.createElement("span", {
    className: "node",
    "data-node-dot": true,
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/showcase/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/showcase/ProjectRow.jsx
try { (() => {
// A project, stacked. Its weight decides how much of the screen it earns:
// lg — a chapter (text, points, three proofs, a large visual); md — a card with one visual; sm — a hairline row.
function ProjectRow({
  index,
  title,
  summary,
  domain,
  year,
  status,
  stack = [],
  metrics = [],
  metric,
  points = [],
  seed,
  image,
  weight = 'md',
  flip = false,
  href = '#',
  onOpen,
  className
}) {
  const open = e => {
    if (onOpen) {
      e.preventDefault();
      onOpen();
    }
  };
  const n = index != null ? String(index).padStart(2, '0') : null;
  if (weight === 'sm') {
    return /*#__PURE__*/React.createElement("article", {
      className: 'project project--sm' + (className ? ' ' + className : ''),
      "data-node": true
    }, /*#__PURE__*/React.createElement("span", {
      className: "project__index",
      "data-node-dot": true
    }, n), /*#__PURE__*/React.createElement("div", {
      className: "project__main"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "project__title"
    }, /*#__PURE__*/React.createElement("a", {
      href: href,
      onClick: open
    }, title)), summary && /*#__PURE__*/React.createElement("p", {
      className: "project__summary"
    }, summary)), /*#__PURE__*/React.createElement("div", {
      className: "project__aside"
    }, domain && /*#__PURE__*/React.createElement("span", null, domain.toLowerCase()), year && /*#__PURE__*/React.createElement("span", null, year)), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "arrow-up-right",
      size: 16,
      className: "project__go"
    }));
  }
  const ms = metrics.length ? metrics : metric ? [metric] : [];
  return /*#__PURE__*/React.createElement("article", {
    className: 'project project--' + weight + (flip ? ' project--flip' : '') + (className ? ' ' + className : ''),
    "data-node": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "project__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "project__text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "project__meta"
  }, n && /*#__PURE__*/React.createElement("span", {
    className: "project__index"
  }, n), domain && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: domain === 'Trading' ? 'accent' : 'neutral',
    dot: true
  }, domain), status && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: status === 'Live' ? 'positive' : 'neutral'
  }, status), year && /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, year)), /*#__PURE__*/React.createElement("h3", {
    className: "project__title"
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: open
  }, title)), summary && /*#__PURE__*/React.createElement("p", {
    className: "project__summary"
  }, summary), weight === 'lg' && points.length > 0 && /*#__PURE__*/React.createElement("ul", {
    className: "project__points"
  }, points.slice(0, 3).map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, p))), ms.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "project__metrics"
  }, ms.slice(0, weight === 'lg' ? 3 : 2).map(m => /*#__PURE__*/React.createElement("div", {
    key: m.label
  }, /*#__PURE__*/React.createElement("b", null, m.value, m.unit && /*#__PURE__*/React.createElement("small", null, m.unit)), /*#__PURE__*/React.createElement("span", null, m.label)))), /*#__PURE__*/React.createElement("div", {
    className: "project__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "project__stack"
  }, stack.slice(0, weight === 'lg' ? 6 : 4).join(' · ')), /*#__PURE__*/React.createElement("span", {
    className: "project__cta"
  }, "Case study ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    className: "project__media"
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: ""
  }) : /*#__PURE__*/React.createElement(__ds_scope.Sigil, {
    seed: seed || title,
    nodes: weight === 'lg' ? 11 : 8,
    width: 420,
    height: 320
  }))), /*#__PURE__*/React.createElement("span", {
    className: "node",
    "data-node-dot": true,
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { ProjectRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/showcase/ProjectRow.jsx", error: String((e && e.message) || e) }); }

// source/layout.js
try { (() => {
// Shared layout — header, footer, constellation, scroll reveals
(function () {
  const D = window.PORTFOLIO;
  const path = location.pathname.split('/').pop() || 'index.html';
  const navItems = [{
    href: 'index.html',
    label: 'Home',
    match: ['', 'index.html']
  }, {
    href: 'projects.html',
    label: 'Projects',
    match: ['projects.html']
  }, {
    href: 'skills.html',
    label: 'Skills',
    match: ['skills.html']
  }, {
    href: 'writing.html',
    label: 'Writing',
    match: ['writing.html']
  }, {
    href: 'about.html',
    label: 'About',
    match: ['about.html']
  }];

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
  let W,
    H,
    points = [],
    mouse = {
      x: -9999,
      y: -9999,
      tx: -9999,
      ty: -9999
    };
  function resize() {
    W = canvas.width = window.innerWidth * DPR;
    H = canvas.height = window.innerHeight * DPR;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    // Fewer points on small screens — preserves the look, halves the O(n²) work
    const density = isSmall ? 32000 : 22000;
    const cap = isSmall ? 50 : 90;
    const count = Math.min(cap, Math.floor(window.innerWidth * window.innerHeight / density));
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
        twinkleSpeed: 0.005 + Math.random() * 0.012
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
  window.addEventListener('mousemove', e => {
    mouse.tx = e.clientX * DPR;
    mouse.ty = e.clientY * DPR;
  });
  // Touch: track finger so the cursor-reactive lines still appear when
  // dragging. Tap-and-leave clears the field via touchend.
  window.addEventListener('touchmove', e => {
    if (!e.touches[0]) return;
    mouse.tx = e.touches[0].clientX * DPR;
    mouse.ty = e.touches[0].clientY * DPR;
  }, {
    passive: true
  });
  window.addEventListener('touchend', () => {
    mouse.tx = -9999;
    mouse.ty = -9999;
  }, {
    passive: true
  });
  let parallaxX = 0,
    parallaxY = 0,
    tParX = 0,
    tParY = 0;
  // Reduce parallax magnitude on mobile — it's pointless without a real
  // mouse and the touch-driven version feels twitchy.
  const parallaxMag = isTouch ? 0 : 14;
  window.addEventListener('mousemove', e => {
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
      const dx = p.x - mouse.x,
        dy = p.y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      let drawX = p.x + parallaxX * DPR;
      let drawY = p.y + parallaxY * DPR;
      if (d < mouseDist) {
        const force = (1 - d / mouseDist) * 12 * DPR;
        drawX += dx / d * force;
        drawY += dy / d * force;
      }
      p._dx = drawX;
      p._dy = drawY;
    }

    // lines
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i],
          b = points[j];
        const dx = a._dx - b._dx,
          dy = a._dy - b._dy;
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
      const dx = p._dx - mouse.x,
        dy = p._dy - mouse.y;
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
    if (window.scrollY > 30) header.classList.add('is-scrolled');else header.classList.remove('is-scrolled');
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
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });
  window.__revealIO = io;
  window.observeReveal = root => {
    (root || document).querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el));
  };
  window.observeReveal();

  // ===== Skill icons =====
  window.skillIcon = function (key) {
    const icons = {
      python: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.91 2c-2.42 0-4.12.95-4.12 3.16v2.66h4.18v.6H6.27c-2.21 0-4.16 1.34-4.16 4.07s1.66 3.86 4.06 3.86h1.62v-2.92c0-2.36 2.04-4.36 4.36-4.36h4.06c2.13 0 3.86-1.79 3.86-3.93V5.16c0-2.13-1.93-3.16-4.06-3.16zm-2.16 1.86a.91.91 0 0 1 .91.91.91.91 0 0 1-.91.91.91.91 0 0 1-.91-.91.91.91 0 0 1 .91-.91zM18.06 8.42v2.83c0 2.46-2.07 4.46-4.36 4.46H9.64c-2.08 0-3.86 1.84-3.86 3.93v2.66c0 2.13 1.85 3.39 3.96 3.39 2.66 0 4.16-1.59 4.16-3.39v-2.66h4.16v-.61h4.07c2.41 0 3.31-1.71 4.16-3.86.85-2.21-.04-3.86-3.86-3.86h-1.74v-3.16zm-2.51 11.23a.91.91 0 0 1 .91.91.91.91 0 0 1-.91.91.91.91 0 0 1-.91-.91.91.91 0 0 1 .91-.91z"/></svg>`,
      redis: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.4 13.6c-.4 1.6-3.2 3.6-7.2 3.6s-6.8-2-7.2-3.6c-.4-1.6 0-2 4-3.6 0 0-2.8-.8-3.6-2.4 0 0-2 .4-2.4 1.2 0 0-1.2.4-1.2 1.6v6.4c0 1.6 4.4 4 9.6 4s9.6-2.4 9.6-4v-6.4c0-.8-.4-1.6-1.6-2 0 0-.4 1.2-.8 1.6 0 0 .8 2.4-.8 3.6zm-7.6-7.2c-3.2 0-6 1.6-6 2.8s2.8 2.8 6 2.8 6-1.6 6-2.8-2.8-2.8-6-2.8z"/></svg>`,
      postgres: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 2.4c-1.6-.4-3.2-.4-4.8 0-1.6 0-3.2.8-4.4 1.6-.8.8-1.2 2-1.2 3.2 0 1.2.4 2.4.8 3.6.4 1.6.4 3.2 0 4.8-.4 1.6 0 3.2.8 4.4.8 1.2 2 2 3.2 2.4 1.2.4 2.4.4 3.6 0 1.6-.4 2.8-1.2 3.6-2.4 1.2-1.6 1.6-3.6 1.6-5.6V8c-.4-2.4-1.6-4.8-3.2-5.6zm-2.4 14.4c-1.2 0-2-.8-2-2s.8-2 2-2 2 .8 2 2-.8 2-2 2z"/></svg>`,
      fastapi: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm-1.2 19.2v-6h-3.6L13.2 4.8v6h3.6L10.8 19.2z"/></svg>`,
      aws: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.8 9.4c0 .4 0 .8.2 1.2.2.4.4.6.4.8 0 .2-.2.4-.4.6l-.8.6h-.4c-.2 0-.4 0-.6-.2-.4-.2-.6-.6-.8-.8-.2-.4-.4-.8-.6-1.2-.6 1.4-1.6 2.2-3 2.2-1 0-1.8-.4-2.4-1-.6-.6-.8-1.4-.8-2.4 0-1.2.4-2 1.2-2.8.8-.6 1.8-1 3.2-1 .4 0 .8 0 1.4.2.4 0 .8.2 1.4.4v-.6c0-1-.2-1.6-.6-2-.4-.4-1-.6-2-.6-.4 0-.8 0-1.4.2-.4.2-1 .4-1.4.4-.2 0-.4.2-.4.2-.2 0-.2-.2-.2-.4v-.4c0-.2 0-.4.2-.4 0-.2.2-.2.4-.4.4-.2 1-.4 1.6-.6.6-.2 1.4-.2 2-.2 1.6 0 2.6.4 3.4 1 .8.8 1.2 1.8 1.2 3.4l-.2 4.4z"/></svg>`,
      linux: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.077 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.6.058.399.116.764.04 1.023-.255.79-.286 1.337-.083 1.737.203.402.602.582 1.062.681.918.196 2.165.115 3.156.65.66.336 1.342.55 1.886.55.358 0 .646-.118.832-.353.13-.165.183-.385.182-.602 0-.117 0-.235-.024-.336.073-.034.144-.058.215-.07h.01l.024-.007a.5.5 0 0 0 .124-.018c.4 0 .9-.107 1.408-.282.27-.08.527-.176.768-.282.241-.106.466-.226.679-.367.426-.282.8-.617 1.13-1.013.331-.396.617-.851.866-1.366a.7.7 0 0 0 .07-.32c0-.118-.029-.235-.096-.336-.067-.1-.166-.183-.282-.235a.704.704 0 0 0-.43-.07.74.74 0 0 0-.4.176c-.13.1-.218.235-.272.4-.054.165-.07.353-.046.518.025.165.083.32.173.448.09.13.21.235.353.282.143.047.305.046.476-.005.17-.05.353-.155.518-.282.165-.13.32-.282.448-.4.13-.13.235-.235.32-.282l.024-.024c.07.117.118.235.165.353.046.118.07.235.094.353.024.118.03.235.024.353-.006.118-.029.235-.07.353a1.05 1.05 0 0 1-.118.282 1.13 1.13 0 0 1-.165.235c-.13.13-.282.235-.448.282-.165.046-.353.07-.518.046-.165-.024-.32-.094-.448-.187-.13-.094-.235-.21-.32-.353a3.36 3.36 0 0 1-.46-1.15c-.13-.518-.21-1.13-.21-1.766 0-.518.094-1.013.235-1.483.14-.47.353-.917.612-1.34a4.7 4.7 0 0 1 .87-1.105c.327-.32.682-.589 1.083-.797.4-.21.847-.353 1.342-.4.353-.024.73-.024 1.082.046.353.07.682.21.94.4.26.187.448.4.564.612.118.235.165.4.165.612 0 .118-.024.235-.07.353-.047.118-.118.21-.21.282-.094.07-.21.118-.353.118a.91.91 0 0 1-.353-.07.94.94 0 0 1-.282-.21.94.94 0 0 1-.21-.282c-.046-.118-.07-.235-.07-.353-.024-.118-.046-.21-.07-.282-.025-.07-.05-.117-.094-.165-.05-.046-.094-.094-.165-.118-.07-.024-.165-.046-.282-.046-.235.024-.4.094-.518.235-.118.118-.187.235-.235.4-.046.165-.07.353-.07.518 0 .353.118.7.282 1.013.187.32.4.612.682.87.282.26.612.494.94.7.353.21.7.4 1.082.518a4.16 4.16 0 0 0 1.176.187c.4 0 .8-.046 1.176-.165.4-.118.776-.282 1.105-.518.353-.235.612-.518.84-.847.21-.353.353-.73.4-1.13.046-.4.024-.823-.07-1.222-.07-.4-.21-.776-.4-1.105-.187-.353-.4-.682-.682-.94-.282-.282-.612-.518-.94-.7-.353-.21-.7-.353-1.082-.448-.4-.094-.776-.165-1.176-.165-.4-.024-.823.024-1.222.094-.4.07-.776.21-1.105.353-.353.165-.682.353-.97.612-.282.235-.518.518-.7.823-.21.282-.353.612-.448.97-.118.353-.165.7-.165 1.082v.046c0 .024 0 .046.024.07h-.046c0-.118 0-.235-.024-.353a3.43 3.43 0 0 0-.07-.353c-.046-.118-.094-.235-.165-.353-.07-.118-.165-.21-.282-.282-.118-.07-.282-.094-.448-.094-.235 0-.448.094-.612.235-.165.165-.282.353-.353.518-.07.21-.118.4-.118.612 0 .353.094.682.235.97.165.282.353.518.612.7.235.187.518.282.823.282.235 0 .448-.046.66-.165.21-.118.4-.282.518-.448.118-.187.21-.4.235-.612.046-.235.046-.448 0-.66z"/></svg>`,
      stock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-5 4 3 5-7 4 5"/><circle cx="8" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="15" r="1.2" fill="currentColor"/><circle cx="17" cy="8" r="1.2" fill="currentColor"/><path d="M3 21h18" opacity="0.4"/></svg>`,
      react: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(120 12 12)"/></svg>`
    };
    return icons[key] || '';
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "source/layout.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/About.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DSA = window.EshaanSharmaDesignSystem_4751b7;
const ESA = window.ES_DATA;
function AboutScreen({
  go
}) {
  const I = ESA.identity,
    A = ESA.aboutMe;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "page page-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label emerge"
  }, "About"), /*#__PURE__*/React.createElement("h1", {
    className: "t-h1 emerge",
    style: {
      '--i': 1,
      maxWidth: '18ch'
    }
  }, A.title)), /*#__PURE__*/React.createElement("section", {
    className: "page about-intro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "emerge",
    style: {
      '--i': 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-read"
  }, A.intro.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      marginBottom: '1em'
    }
  }, p))), /*#__PURE__*/React.createElement("dl", {
    className: "about-facts"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Based in"), /*#__PURE__*/React.createElement("dd", null, I.location)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Time zone"), /*#__PURE__*/React.createElement("dd", null, "UTC+05:30, flexible")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Focus"), /*#__PURE__*/React.createElement("dd", null, I.role)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Engagements"), /*#__PURE__*/React.createElement("dd", null, "Contract \xB7 full-time"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 28,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(DSA.Button, {
    variant: "primary",
    iconTrail: "arrow-right",
    onClick: () => go('Contact')
  }, "Get in touch"), /*#__PURE__*/React.createElement(DSA.Button, {
    icon: "download"
  }, "R\xE9sum\xE9"))), /*#__PURE__*/React.createElement("div", {
    className: "portrait emerge",
    style: {
      '--i': 3
    }
  }, "Portrait \u2014 add an image")), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement(DSA.SectionHeader, {
    index: "01 \u2014 How I work",
    title: "Three rules I keep"
  }), /*#__PURE__*/React.createElement("div", {
    className: "principles"
  }, A.principles.map((p, i) => /*#__PURE__*/React.createElement("div", {
    className: "principle",
    key: p.title
  }, /*#__PURE__*/React.createElement("span", null, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.note))))), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement(DSA.SectionHeader, {
    index: "02 \u2014 Outside work",
    title: "Hobbies and interests"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lab-grid"
  }, A.interests.map(l => /*#__PURE__*/React.createElement(DSA.LabTile, _extends({
    key: l.title
  }, l))))), /*#__PURE__*/React.createElement("section", {
    className: "page section two-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DSA.SectionHeader, {
    index: "03 \u2014 So far",
    title: "A short timeline"
  })), /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, A.timeline.map(t => /*#__PURE__*/React.createElement("div", {
    className: "timeline__row",
    key: t.year
  }, /*#__PURE__*/React.createElement("time", null, t.year), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, t.title), /*#__PURE__*/React.createElement("p", null, t.note)))))));
}
function ContactScreen() {
  const I = ESA.identity;
  const [sent, setSent] = React.useState(false);
  const [kind, setKind] = React.useState('Contract');
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const local = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  });
  const channels = [{
    icon: 'mail',
    label: 'Email',
    value: I.email,
    href: 'mailto:' + I.email
  }, {
    icon: 'linkedin',
    label: 'LinkedIn',
    value: 'in/eshaansharma2510',
    href: I.linkedin,
    ext: true
  }, {
    icon: 'github',
    label: 'GitHub',
    value: 'Yokai-2510',
    href: I.github,
    ext: true
  }, {
    icon: 'download',
    label: 'Résumé',
    value: 'PDF',
    href: '#'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "page page-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label emerge"
  }, "Contact"), /*#__PURE__*/React.createElement("h1", {
    className: "t-h1 emerge",
    style: {
      '--i': 1,
      maxWidth: '16ch'
    }
  }, "Start a conversation."), /*#__PURE__*/React.createElement("p", {
    className: "t-lede emerge",
    style: {
      '--i': 2
    }
  }, "Available for contract and full-time engagements. Tell me what you are building and what the latency budget is.")), /*#__PURE__*/React.createElement("section", {
    className: "page contact-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "emerge",
    style: {
      '--i': 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "channels"
  }, channels.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.label,
    className: "channel",
    href: c.href,
    target: c.ext ? '_blank' : undefined,
    rel: c.ext ? 'noreferrer' : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "channel__icon"
  }, /*#__PURE__*/React.createElement(DSA.Icon, {
    name: c.icon,
    size: 17
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, c.label), /*#__PURE__*/React.createElement("small", null, c.value)), /*#__PURE__*/React.createElement(DSA.Icon, {
    name: "arrow-up-right",
    size: 16,
    className: "channel__go"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "availability"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("i", null), "Taking new work \xB7 replies within a day"), /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, I.location, " \xB7 ", local, " IST \xB7 UTC+05:30"))), /*#__PURE__*/React.createElement("div", {
    className: "emerge",
    style: {
      '--i': 4
    }
  }, /*#__PURE__*/React.createElement("form", {
    className: "contact",
    "data-node": true,
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    className: "contact__sent"
  }, /*#__PURE__*/React.createElement(DSA.Tag, {
    tone: "positive",
    dot: true
  }, "Sent"), /*#__PURE__*/React.createElement("p", {
    className: "t-h3"
  }, "Thanks \u2014 I will reply within a day."), /*#__PURE__*/React.createElement(DSA.Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setSent(false)
  }, "Send another")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "contact__row"
  }, /*#__PURE__*/React.createElement(DSA.TextField, {
    label: "Name",
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(DSA.TextField, {
    label: "Email",
    type: "email",
    placeholder: "you@company.com"
  })), /*#__PURE__*/React.createElement(DSA.TextField, {
    label: "Company",
    optional: true,
    placeholder: "Desk, fund or team"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Engagement"), /*#__PURE__*/React.createElement("div", {
    className: "contact__chips"
  }, ['Contract', 'Full-time', 'Something else'].map(k => /*#__PURE__*/React.createElement(DSA.Chip, {
    key: k,
    selected: kind === k,
    onClick: () => setKind(k)
  }, k)))), /*#__PURE__*/React.createElement(DSA.TextField, {
    label: "What are you building?",
    multiline: true,
    rows: 5,
    placeholder: "Markets, latency budget, timeline\u2026"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DSA.Button, {
    variant: "primary",
    type: "submit",
    iconTrail: "arrow-right"
  }, "Send message"))), /*#__PURE__*/React.createElement("span", {
    className: "node",
    "data-node-dot": true,
    "aria-hidden": "true"
  })))));
}
Object.assign(window, {
  AboutScreen,
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DSH = window.EshaanSharmaDesignSystem_4751b7;
const ESH = window.ES_DATA;
function HomeScreen({
  go
}) {
  const [lead, ...rest] = ESH.work;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "page hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__status t-label emerge",
    style: {
      '--i': 0
    }
  }, /*#__PURE__*/React.createElement("i", null), ESH.hero.status), /*#__PURE__*/React.createElement("h1", {
    className: "t-display hero__title emerge",
    style: {
      '--i': 1
    }
  }, ESH.hero.title), /*#__PURE__*/React.createElement("p", {
    className: "t-lede hero__lede emerge",
    style: {
      '--i': 2
    }
  }, ESH.hero.lede), /*#__PURE__*/React.createElement("div", {
    className: "hero__actions emerge",
    style: {
      '--i': 3
    }
  }, /*#__PURE__*/React.createElement(DSH.Button, {
    variant: "primary",
    size: "lg",
    iconTrail: "arrow-right",
    onClick: () => go('Work')
  }, "See the work"), /*#__PURE__*/React.createElement(DSH.Button, {
    size: "lg",
    onClick: () => go('Contact')
  }, "Get in touch")), /*#__PURE__*/React.createElement("div", {
    className: "hero__hint t-label emerge",
    style: {
      '--i': 5
    }
  }, /*#__PURE__*/React.createElement("span", null, "Move slowly \u2014 the field notices"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("kbd", null, "T"), " change state"))), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement(DSH.SectionHeader, {
    index: "01 \u2014 Proof",
    title: "Numbers from production"
  }), /*#__PURE__*/React.createElement("div", {
    className: "proof"
  }, ESH.proof.map(m => /*#__PURE__*/React.createElement(DSH.Metric, _extends({
    key: m.label
  }, m))))), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement(DSH.SectionHeader, {
    index: "02 \u2014 Selected work",
    title: "Systems with real money behind them",
    action: /*#__PURE__*/React.createElement(DSH.Button, {
      size: "sm",
      variant: "ghost",
      iconTrail: "arrow-right",
      onClick: () => go('Work')
    }, "All work")
  }), /*#__PURE__*/React.createElement("div", {
    className: "stack-list"
  }, /*#__PURE__*/React.createElement(DSH.ProjectRow, _extends({}, lead, {
    index: 1,
    weight: "lg",
    seed: lead.slug,
    onOpen: () => go('Case', lead.slug)
  })), /*#__PURE__*/React.createElement("div", null, rest.slice(0, 3).map((w, i) => /*#__PURE__*/React.createElement(DSH.ProjectRow, _extends({
    key: w.slug
  }, w, {
    index: i + 2,
    weight: "sm",
    onOpen: () => go('Case', w.slug)
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement(DSH.SectionHeader, {
    index: "03 \u2014 Products",
    title: "Software with people using it",
    action: /*#__PURE__*/React.createElement(DSH.Button, {
      size: "sm",
      variant: "ghost",
      iconTrail: "arrow-right",
      onClick: () => go('Products')
    }, "All products")
  }), /*#__PURE__*/React.createElement("div", {
    className: "product-grid"
  }, ESH.products.slice(0, 2).map(p => /*#__PURE__*/React.createElement(DSH.ProductCard, _extends({
    key: p.name
  }, p, {
    onOpen: () => go('Products')
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "page section two-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DSH.SectionHeader, {
    index: "04 \u2014 Writing",
    title: "Notes on the work",
    description: "Short pieces on system design, latency, and the small operational decisions that turn out to matter."
  })), /*#__PURE__*/React.createElement("div", null, ESH.writing.slice(0, 3).map(n => /*#__PURE__*/React.createElement(DSH.EntryRow, _extends({
    key: n.slug
  }, n, {
    onOpen: () => go('Article', n.slug)
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "band"
  }, /*#__PURE__*/React.createElement("p", null, ESH.homeAbout), /*#__PURE__*/React.createElement("div", {
    className: "band__actions"
  }, /*#__PURE__*/React.createElement(DSH.Button, {
    onClick: () => go('About')
  }, "About me"), /*#__PURE__*/React.createElement(DSH.Button, {
    variant: "primary",
    iconTrail: "arrow-right",
    onClick: () => go('Contact')
  }, "Contact")))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Products.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DSP = window.EshaanSharmaDesignSystem_4751b7;
const ESP = window.ES_DATA;
function ProductsScreen() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "page page-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label emerge"
  }, "Products \u2014 ", String(ESP.products.length).padStart(2, '0')), /*#__PURE__*/React.createElement("h1", {
    className: "t-h1 emerge",
    style: {
      '--i': 1
    }
  }, "Software with people using it."), /*#__PURE__*/React.createElement("p", {
    className: "t-lede emerge",
    style: {
      '--i': 2
    }
  }, "Things I build, ship and keep running for my own users. Client systems live under Work.")), /*#__PURE__*/React.createElement("section", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "product-list"
  }, ESP.products.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    className: "emerge",
    style: {
      '--i': i
    }
  }, /*#__PURE__*/React.createElement(DSP.ProductCard, _extends({}, p, {
    size: "lg"
  })))))));
}
function CraftScreen() {
  const C = ESP.craft;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "page page-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label emerge"
  }, "Craft"), /*#__PURE__*/React.createElement("h1", {
    className: "t-h1 emerge",
    style: {
      '--i': 1
    }
  }, "What I work with, and how."), /*#__PURE__*/React.createElement("p", {
    className: "t-lede emerge",
    style: {
      '--i': 2
    }
  }, "Where I spend my time, what I have shipped with, what I am certified in, and the experiments that keep it sharp.")), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement(DSP.SectionHeader, {
    index: "01 \u2014 Focus",
    title: "Where I spend my time"
  }), /*#__PURE__*/React.createElement("div", {
    className: "focus"
  }, C.focus.map((x, i) => /*#__PURE__*/React.createElement("div", {
    className: "focus__item",
    key: x.title
  }, /*#__PURE__*/React.createElement("span", null, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", null, x.title), /*#__PURE__*/React.createElement("p", null, x.note))))), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement(DSP.SectionHeader, {
    index: "02 \u2014 Capabilities",
    title: "Shipped with, not watched a tutorial on"
  }), /*#__PURE__*/React.createElement("div", {
    className: "caps"
  }, ESP.skills.map(g => /*#__PURE__*/React.createElement("div", {
    className: "caps__row",
    key: g.group
  }, /*#__PURE__*/React.createElement("h4", null, g.group), /*#__PURE__*/React.createElement("ul", null, g.items.map(s => /*#__PURE__*/React.createElement("li", {
    key: s
  }, /*#__PURE__*/React.createElement(DSP.Tag, null, s)))))))), /*#__PURE__*/React.createElement("section", {
    className: "page section two-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DSP.SectionHeader, {
    index: "03 \u2014 Credentials",
    title: "Certifications and qualifications"
  })), /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, C.credentials.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "timeline__row",
    key: i
  }, /*#__PURE__*/React.createElement("time", null, c.year), /*#__PURE__*/React.createElement("div", {
    className: "cred"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, c.title), /*#__PURE__*/React.createElement("p", null, c.issuer)), c.placeholder && /*#__PURE__*/React.createElement(DSP.Tag, {
    outline: true
  }, "placeholder")))))), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement(DSP.SectionHeader, {
    index: "04 \u2014 Lab",
    title: "Experiments",
    description: "Things that aren\u2019t client work. Tiles take an image, or fall back to their own constellation."
  }), /*#__PURE__*/React.createElement("div", {
    className: "lab-grid"
  }, C.experiments.map(l => /*#__PURE__*/React.createElement(DSP.LabTile, _extends({
    key: l.title
  }, l))))));
}
Object.assign(window, {
  ProductsScreen,
  CraftScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Products.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Work.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DSW = window.EshaanSharmaDesignSystem_4751b7;
const ESW = window.ES_DATA;

// Every project gets its own place on the screen; its weight decides how much.
function WorkScreen({
  go
}) {
  const [f, setF] = React.useState('All');
  const domains = ['All', 'Trading', 'Engineering', 'Tools'];
  const opts = domains.map(d => ({
    value: d,
    label: d,
    count: d === 'All' ? ESW.work.length : ESW.work.filter(w => w.domain === d).length
  }));
  const list = ESW.work.filter(w => f === 'All' || w.domain === f);
  const major = list.filter(w => w.weight !== 'sm'),
    minor = list.filter(w => w.weight === 'sm');
  const num = w => ESW.work.indexOf(w) + 1;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "page page-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label emerge"
  }, "Work \u2014 ", String(ESW.work.length).padStart(2, '0'), " projects"), /*#__PURE__*/React.createElement("div", {
    className: "page-head__row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "t-h1 emerge",
    style: {
      '--i': 1
    }
  }, "Things I have built and shipped."), /*#__PURE__*/React.createElement("p", {
    className: "t-lede emerge",
    style: {
      '--i': 2
    }
  }, "Trading infrastructure, browser-automation tools and small analytics jobs. Most have been live in production with real money behind them.")), /*#__PURE__*/React.createElement("div", {
    className: "emerge",
    style: {
      '--i': 3
    }
  }, /*#__PURE__*/React.createElement(DSW.SegmentedControl, {
    options: opts,
    value: f,
    onChange: setF,
    label: "Domain"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "page",
    key: f
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack-list"
  }, major.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: w.slug,
    className: "emerge",
    style: {
      '--i': i
    }
  }, /*#__PURE__*/React.createElement(DSW.ProjectRow, _extends({}, w, {
    index: num(w),
    seed: w.slug,
    flip: i % 2 === 1,
    onOpen: () => go('Case', w.slug)
  }))))), minor.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "stack-more"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, major.length ? 'Smaller jobs' : 'Projects'), /*#__PURE__*/React.createElement("div", null, minor.map(w => /*#__PURE__*/React.createElement(DSW.ProjectRow, _extends({
    key: w.slug
  }, w, {
    index: num(w),
    onOpen: () => go('Case', w.slug)
  })))))));
}
function CaseScreen({
  go,
  param
}) {
  const i = Math.max(0, ESW.work.findIndex(w => w.slug === param));
  const w = ESW.work[i],
    next = ESW.work[(i + 1) % ESW.work.length];
  return /*#__PURE__*/React.createElement("article", {
    className: "page",
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "case-back",
    onClick: e => {
      e.preventDefault();
      go('Work');
    }
  }, /*#__PURE__*/React.createElement(DSW.Icon, {
    name: "arrow-left",
    size: 16
  }), "All work"), /*#__PURE__*/React.createElement("div", {
    className: "emerge",
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(DSW.Tag, {
    tone: w.domain === 'Trading' ? 'accent' : 'neutral',
    dot: true
  }, w.domain), /*#__PURE__*/React.createElement(DSW.Tag, {
    tone: w.status === 'Live' ? 'positive' : 'neutral'
  }, w.status)), /*#__PURE__*/React.createElement("h1", {
    className: "t-h1 emerge",
    style: {
      '--i': 1,
      maxWidth: '20ch'
    }
  }, w.title), /*#__PURE__*/React.createElement("p", {
    className: "t-lede emerge",
    style: {
      '--i': 2,
      marginTop: 20,
      maxWidth: '56ch'
    }
  }, w.summary), /*#__PURE__*/React.createElement("dl", {
    className: "case-meta emerge",
    style: {
      '--i': 3
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Year"), /*#__PURE__*/React.createElement("dd", null, w.year)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Role"), /*#__PURE__*/React.createElement("dd", null, w.role)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Domain"), /*#__PURE__*/React.createElement("dd", null, w.domain)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Stack"), /*#__PURE__*/React.createElement("dd", null, w.stack.slice(0, 4).join(', ')))), /*#__PURE__*/React.createElement("figure", {
    className: "case-figure emerge",
    style: {
      '--i': 4
    },
    "data-node": true
  }, /*#__PURE__*/React.createElement(DSW.Sigil, {
    seed: w.slug,
    nodes: 12,
    width: 840,
    height: 320
  }), /*#__PURE__*/React.createElement("figcaption", {
    className: "t-label"
  }, "System sketch \u2014 replace with an architecture diagram or screenshot"), /*#__PURE__*/React.createElement("span", {
    className: "node",
    "data-node-dot": true,
    "aria-hidden": "true"
  })), w.metrics.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "proof",
    style: {
      marginTop: 56,
      gridTemplateColumns: `repeat(${w.metrics.length}, minmax(0,1fr))`
    }
  }, w.metrics.map(m => /*#__PURE__*/React.createElement(DSW.Metric, _extends({
    key: m.label
  }, m)))), /*#__PURE__*/React.createElement("div", {
    className: "case-body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "t-label"
  }, "Architecture")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "t-read"
  }, w.body), /*#__PURE__*/React.createElement("ol", {
    className: "case-points"
  }, w.points.map((p, k) => /*#__PURE__*/React.createElement("li", {
    key: k
  }, /*#__PURE__*/React.createElement("span", null, String(k + 1).padStart(2, '0')), p))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, w.stack.map(s => /*#__PURE__*/React.createElement(DSW.Tag, {
    key: s,
    outline: true
  }, s))))), /*#__PURE__*/React.createElement("div", {
    className: "case-next"
  }, /*#__PURE__*/React.createElement(DSW.SectionHeader, {
    index: "Next project",
    title: ""
  }), /*#__PURE__*/React.createElement(DSW.ProjectRow, _extends({}, next, {
    weight: "md",
    index: ESW.work.indexOf(next) + 1,
    seed: next.slug,
    onOpen: () => go('Case', next.slug)
  }))));
}
Object.assign(window, {
  WorkScreen,
  CaseScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Work.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Writing.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DSR = window.EshaanSharmaDesignSystem_4751b7;
const ESR = window.ES_DATA;
function WritingScreen({
  go
}) {
  const kinds = ['all', ...Array.from(new Set(ESR.writing.map(n => n.kind)))];
  const [k, setK] = React.useState('all');
  const list = ESR.writing.filter(n => k === 'all' || n.kind === k);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "page page-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-label emerge"
  }, "Writing \u2014 ", String(ESR.writing.length).padStart(2, '0'), " notes"), /*#__PURE__*/React.createElement("h1", {
    className: "t-h1 emerge",
    style: {
      '--i': 1
    }
  }, "Writing on the work."), /*#__PURE__*/React.createElement("p", {
    className: "t-lede emerge",
    style: {
      '--i': 2
    }
  }, "Short pieces on system design, latency, and the small operational decisions that turn out to matter."), /*#__PURE__*/React.createElement("div", {
    className: "emerge",
    style: {
      '--i': 3,
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 32
    }
  }, kinds.map(x => /*#__PURE__*/React.createElement(DSR.Chip, {
    key: x,
    selected: k === x,
    count: x === 'all' ? ESR.writing.length : ESR.writing.filter(n => n.kind === x).length,
    onClick: () => setK(x)
  }, x[0].toUpperCase() + x.slice(1))))), /*#__PURE__*/React.createElement("section", {
    className: "page",
    key: k
  }, list.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n.slug,
    className: "emerge",
    style: {
      '--i': i
    }
  }, /*#__PURE__*/React.createElement(DSR.EntryRow, _extends({}, n, {
    onOpen: () => go('Article', n.slug)
  }))))));
}
function ArticleScreen({
  go,
  param
}) {
  const n = ESR.writing.find(x => x.slug === param) || ESR.writing[0];
  return /*#__PURE__*/React.createElement("article", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "article"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "case-back",
    onClick: e => {
      e.preventDefault();
      go('Writing');
    }
  }, /*#__PURE__*/React.createElement(DSR.Icon, {
    name: "arrow-left",
    size: 16
  }), "Writing"), /*#__PURE__*/React.createElement("header", {
    className: "article__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "article__meta t-label emerge"
  }, /*#__PURE__*/React.createElement("span", null, n.date), /*#__PURE__*/React.createElement("span", null, n.kind), /*#__PURE__*/React.createElement("span", null, n.reading)), /*#__PURE__*/React.createElement("h1", {
    className: "t-h1 emerge",
    style: {
      '--i': 1
    }
  }, n.title), /*#__PURE__*/React.createElement("p", {
    className: "t-lede emerge",
    style: {
      '--i': 2,
      marginTop: 20
    }
  }, n.excerpt)), /*#__PURE__*/React.createElement("div", {
    className: "t-read prose emerge",
    style: {
      '--i': 3
    }
  }, /*#__PURE__*/React.createElement("p", null, "Sample body \u2014 the article text lives in the CMS; this shows the reading typography. Long-form uses Newsreader at 20/34 on a 66-character measure, so a page of prose reads like a page, not a feed."), /*#__PURE__*/React.createElement("p", null, "Code and data drop into Martian Mono, set slightly condensed so tables and snippets hold their columns without shouting:"), /*#__PURE__*/React.createElement("pre", null, 'XADD ticks * sym NIFTY ltp 24812.35\nXREADGROUP GROUP engines rank COUNT 64 STREAMS ticks >'), /*#__PURE__*/React.createElement("blockquote", {
    className: "t-quote"
  }, "A clever algorithm you can\u2019t audit is worse than a boring one you can."), /*#__PURE__*/React.createElement("p", null, "Inline links look like ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "this"), " \u2014 underlined, because in prose a link must be findable without hovering."))));
}
Object.assign(window, {
  WritingScreen,
  ArticleScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Writing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/data.js
try { (() => {
// Content for the portfolio UI kit — facts from the source repo (Yokai-2510/website-portfolio data.js), restructured.
window.ES_DATA = {
  identity: {
    name: 'Eshaan Sharma',
    role: 'Algorithmic trading & low-latency systems',
    location: 'Gurgaon, India',
    email: 'ethanarkham@gmail.com',
    github: 'https://github.com/Yokai-2510',
    linkedin: 'https://linkedin.com/in/eshaansharma2510'
  },
  hero: {
    status: 'Available for contract work · 2026',
    title: 'I build low-latency systems for real-time markets.',
    lede: 'Freelance algorithmic-trading developer. Event-driven order pipelines, market-data infrastructure, and the deterministic state machines that sit between signal and execution.'
  },
  proof: [{
    value: '<10',
    unit: 'ms',
    label: 'Internal hop latency, end to end',
    note: 'rank-displacement'
  }, {
    value: '8',
    label: 'Independent engines over Redis Streams',
    note: 'rank-displacement'
  }, {
    value: '<5',
    unit: 's',
    label: 'To flatten every broker position',
    note: 'kill switch'
  }, {
    value: '3',
    unit: 'yrs',
    label: 'Production trading infrastructure',
    note: 'since 2023'
  }],
  work: [{
    slug: 'rank-displacement',
    weight: 'lg',
    title: 'Rank-Displacement Options Trading System',
    domain: 'Trading',
    year: '2025',
    role: 'Architecture, build, live operations',
    status: 'Live',
    summary: 'Real-time options platform built around a 50ms leaderboard cycle across all Nifty 50 constituents.',
    body: 'Multi-process, event-driven architecture with eight independent engines coordinating exclusively over Redis Streams. Single source of truth for state, a deterministic order-execution flowchart, and a full 24×7 lifecycle with self-healing.',
    points: ['Eight engines, one transport: Redis Streams for fan-out, replay and consumer groups', 'Single-writer ownership of every key — state has exactly one author', 'Order execution modelled as an auditable flowchart, not an algorithm', 'Self-healing 24×7 lifecycle on AWS EC2 under systemd'],
    stack: ['Python 3.12', 'FastAPI', 'Redis Streams', 'PostgreSQL', 'TimescaleDB', 'Tauri', 'React', 'AWS EC2'],
    metric: {
      value: '50ms',
      label: 'leaderboard cycle'
    },
    metrics: [{
      value: '50',
      unit: 'ms',
      label: 'Leaderboard cycle'
    }, {
      value: '8',
      label: 'Engines'
    }, {
      value: '<10',
      unit: 'ms',
      label: 'Internal hop latency'
    }]
  }, {
    slug: 'strategy-builder',
    weight: 'lg',
    title: 'Strategy Builder & Live Execution Platform',
    domain: 'Trading',
    year: '2024',
    role: 'Architecture, build',
    status: 'Delivered',
    summary: 'Management API, live engine and on-demand backtester — with bit-for-bit live/backtest parity.',
    body: 'Multi-process Python platform supporting parallel strategy evaluation across stocks and options sets. Hybrid storage: Mongo as source of truth for definitions and history, Redis as the high-speed state machine. Eleven indicators shared between live and backtest.',
    points: ['Three domains: management API, live trading engine, backtester', 'Mongo for definitions and history; Redis as the hot state machine', 'One indicator library shared by live and backtest — no drift'],
    stack: ['Python', 'FastAPI', 'Next.js', 'Redis', 'MongoDB Atlas', 'Multiprocessing'],
    metric: {
      value: '11',
      label: 'shared indicators'
    },
    metrics: [{
      value: '3',
      label: 'Domains'
    }, {
      value: '11',
      label: 'Shared indicators'
    }, {
      value: '1:1',
      label: 'Live / backtest parity'
    }]
  }, {
    slug: 'option-chain',
    weight: 'md',
    title: 'Option Chain WebSocket Pipeline',
    domain: 'Engineering',
    year: '2023',
    role: 'Build',
    status: 'Delivered',
    summary: 'Reactive WebSocket pipeline with Protobuf decoding and dynamic strike subscription from live spot.',
    body: 'Live option-chain ingestion that subscribes and unsubscribes dynamically to hold ATM±N strikes, decoded via Protobuf and surfaced to Google Sheets in real time.',
    points: ['Dynamic subscribe/unsubscribe keeps ATM±N strikes in view', 'Protobuf decoding on the hot path', 'Real-time surface in Google Sheets'],
    stack: ['Python', 'Protobuf', 'WebSockets', 'Google Sheets API'],
    metric: {
      value: 'ATM±N',
      label: 'live strikes'
    },
    metrics: []
  }, {
    slug: 'kill-switch',
    weight: 'md',
    title: 'Kotak Neo Automated Kill Switch',
    domain: 'Tools',
    year: '2024',
    role: 'Build',
    status: 'Delivered',
    summary: 'Desktop risk manager that auto-flattens broker positions in under five seconds.',
    body: 'Single-binary desktop tool where traders compose click-step sequences for their broker portal without touching code. Listens to Gmail for tripwires, then drives the portal via Playwright to flatten everything.',
    points: ['Traders compose portal click-sequences without code', 'Gmail tripwires trigger the flatten', 'Ships as a single PyInstaller binary'],
    stack: ['Python', 'CustomTkinter', 'Playwright', 'Gmail API', 'PyInstaller', 'SQLite'],
    metric: {
      value: '<5s',
      label: 'to flat'
    },
    metrics: []
  }, {
    slug: 'signal-engine',
    weight: 'sm',
    title: 'Nifty 500 / F&O Signal Engine',
    domain: 'Trading',
    year: '2024',
    role: 'Build',
    status: 'Delivered',
    summary: 'Ten-point composite technical scanner across the Nifty 500 and F&O universe, with delivery-percentage logic.',
    body: 'Composite scoring across moving averages, momentum, volume and Bhavcopy delivery percentage. Nightly ingestion pipeline; a morning surface for actionable signals.',
    points: ['Ten-point composite score', 'Nightly Bhavcopy ingestion', 'Morning surface of actionable signals'],
    stack: ['Python', 'CustomTkinter', 'pandas-ta'],
    metric: {
      value: '10',
      label: 'point composite'
    },
    metrics: []
  }, {
    slug: 'delivery-screener',
    weight: 'sm',
    title: 'NSE Delivery Analytics Screener',
    domain: 'Tools',
    year: '2023',
    role: 'Build',
    status: 'Delivered',
    summary: 'Fetches NSE delivery data on a schedule and surfaces rolling delivery statistics with live charts.',
    body: 'Pulls NSE delivery data on a schedule, computes rolling average, min and max delivery percentages, and pushes a live screener with charts to Google Sheets.',
    points: ['Scheduled NSE delivery ingestion', 'Rolling avg / min / max delivery %', 'Live charts in Google Sheets'],
    stack: ['Python', 'Google Sheets API', 'pandas'],
    metric: null,
    metrics: []
  }],
  writing: [{
    slug: 'single-writer',
    title: 'Single-writer ownership in Redis',
    kind: 'architecture',
    date: '2026.03',
    reading: '4 min',
    excerpt: 'If two processes can write to the same key, you’ve already lost. The discipline I use to keep ownership obvious across an eight-engine system.'
  }, {
    slug: 'redis-streams',
    title: 'Redis Streams as a transport, not a queue',
    kind: 'architecture',
    date: '2026.02',
    reading: '6 min',
    excerpt: 'Streams give you fan-out, replay, and consumer groups in one primitive. Stop reaching for Kafka by reflex.'
  }, {
    slug: 'ten-ms-budget',
    title: 'Spending a 10ms latency budget',
    kind: 'post-mortem',
    date: '2025.11',
    reading: '8 min',
    excerpt: 'A line-by-line walk through where the milliseconds actually go between tick and order submit.'
  }, {
    slug: 'broker-ws',
    title: 'Stop polling broker portfolios',
    kind: 'field note',
    date: '2025.09',
    reading: '3 min',
    excerpt: 'If the broker exposes a portfolio WebSocket, the polling loop in your code is just bandwidth waste.'
  }, {
    slug: 'deterministic-orders',
    title: 'Why order execution should be a flowchart',
    kind: 'architecture',
    date: '2025.07',
    reading: '5 min',
    excerpt: 'Replayable, testable, debuggable. A clever algorithm you can’t audit is worse than a boring one you can.'
  }],
  lab: [{
    title: 'The Field',
    kind: 'experiment',
    note: 'The canvas behind this site — one system, two media.',
    seed: 'field'
  }, {
    title: 'Ink studies',
    kind: 'experiment',
    note: 'Sketches for the Ink medium: diffusion, filaments, logograms.',
    seed: 'ink-studies'
  }, {
    title: 'Hobby',
    kind: 'placeholder',
    empty: 'Drop an image',
    note: 'Space for interests outside the work.'
  }, {
    title: 'Interest',
    kind: 'placeholder',
    empty: 'Drop an image',
    note: 'Reading, making, collecting — whatever belongs here.'
  }],
  // Products: the systems people use day to day. User counts are illustrative — replace with real ones.
  products: [{
    name: 'Rank-Displacement Options System',
    tagline: 'Real-time options platform built around a 50ms leaderboard cycle across all Nifty 50 constituents.',
    status: 'Live',
    users: '14',
    usersLabel: 'trading desks',
    metric: {
      value: '50ms',
      label: 'leaderboard cycle'
    },
    since: '2025',
    platform: ['Desktop', 'AWS'],
    seed: 'rank-displacement',
    description: 'Eight independent engines coordinating over Redis Streams, a deterministic order-execution flowchart, and a self-healing 24×7 lifecycle.',
    features: ['Eight engines, one transport', 'Single-writer state', 'Self-healing 24×7', 'Tauri desk app']
  }, {
    name: 'Strategy Builder',
    tagline: 'Build strategies, run them live, and backtest on demand — with bit-for-bit live/backtest parity.',
    status: 'In use',
    users: '230+',
    usersLabel: 'active users',
    metric: {
      value: '1:1',
      label: 'live / backtest parity'
    },
    since: '2024',
    platform: ['Web', 'API'],
    seed: 'strategy-builder',
    description: 'A management API, a live trading engine and an on-demand backtester sharing one indicator library, so what you test is what runs.',
    features: ['Eleven shared indicators', 'Parallel evaluation', 'Mongo + Redis state']
  }, {
    name: 'Kill Switch for Kotak Neo',
    tagline: 'Desktop risk manager that flattens every broker position in under five seconds.',
    status: 'In use',
    users: '1,100+',
    usersLabel: 'installs',
    metric: {
      value: '<5s',
      label: 'to flat'
    },
    since: '2024',
    platform: ['Desktop'],
    seed: 'kill-switch',
    description: 'Traders compose click-step sequences for their broker portal without code; Gmail tripwires trigger the flatten. Ships as a single binary.',
    features: ['No-code sequences', 'Gmail tripwires', 'Single binary']
  }],
  craft: {
    focus: [{
      title: 'Market-data ingestion',
      note: 'WebSocket and Protobuf pipelines that keep only what matters in view.'
    }, {
      title: 'Signal computation',
      note: 'Composite scanners and one indicator library shared by live and backtest.'
    }, {
      title: 'Deterministic order routing',
      note: 'Order execution as an auditable flowchart: replayable, testable, boring.'
    }, {
      title: 'Observability',
      note: 'Prometheus, Grafana and OpenTelemetry on systems that run 24×7.'
    }],
    credentials: [{
      year: '2022–25',
      title: 'Bachelor of Computer Applications (BCA)',
      issuer: 'IGNOU · distance programme, completed while freelancing full-time on production trading systems'
    }, {
      year: '2024',
      title: 'Google Cloud Computing Foundations',
      issuer: 'Google Cloud Skills Boost'
    }, {
      year: '2024',
      title: 'Problem Solving (Advanced)',
      issuer: 'HackerRank · data structures and algorithms'
    }, {
      year: '2023',
      title: 'Scientific Computing with Python',
      issuer: 'freeCodeCamp'
    }],
    experiments: [{
      title: 'The Field',
      kind: 'experiment',
      note: 'The canvas behind this site — one system, two media.',
      seed: 'field'
    }, {
      title: 'Ink studies',
      kind: 'experiment',
      note: 'Smoke and release: two ways for ink to answer.',
      seed: 'ink-studies'
    }]
  },
  aboutMe: {
    title: 'Who I am, beyond the systems.',
    intro: ['Freelance algorithmic trading and low-latency software developer. Three years of experience building production trading infrastructure for independent operators and small prop desks — architecture, deployment, and live operations.', 'Comfortable owning systems end to end, from low-level networking to dashboards.', 'Outside markets I explore everything — design, UI and UX, films, video games — and I believe it makes the engineering better. I am drawn to dystopias and cyberpunk, to Scandinavian culture, and to the mystique of the cosmos and the edges of what we can know. It shapes how I build: quiet on the surface, a great deal happening underneath.'],
    principles: [{
      title: 'One writer per piece of state.',
      note: 'If two processes can write the same key, you have already lost. Ownership stays obvious.'
    }, {
      title: 'Boring and auditable beats clever.',
      note: 'Replayable, testable, debuggable. I would rather ship a flowchart than a mystery.'
    }, {
      title: 'Own it end to end.',
      note: 'Architecture, deployment and live operations — the pager included.'
    }],
    interests: [{
      title: 'Design, UI & UX',
      kind: 'exploring',
      note: 'How things look, feel and behave — it makes the engineering better.',
      seed: 'design'
    }, {
      title: 'Films & video games',
      kind: 'exploring',
      note: 'Dystopias and cyberpunk: worlds that ask what technology does to people.',
      seed: 'cyberpunk'
    }, {
      title: 'The mystique',
      kind: 'reading',
      note: 'The cosmos, consciousness, and what we cannot yet measure.',
      seed: 'mystique'
    }, {
      title: 'Scandinavian culture',
      kind: 'interest',
      note: 'Its myths, its restraint, its landscapes.',
      seed: 'nordic'
    }, {
      title: 'Trekking',
      kind: 'hobby',
      note: 'Long walks up high, far from a screen.',
      seed: 'trekking'
    }, {
      title: 'Cooking',
      kind: 'hobby',
      note: 'Another place where process and taste meet.',
      seed: 'cooking'
    }],
    timeline: [{
      year: '2023',
      title: 'First production systems',
      note: 'Option-chain WebSocket pipeline and an NSE delivery screener.'
    }, {
      year: '2024',
      title: 'Platforms and tools',
      note: 'Strategy builder with live/backtest parity, the Kotak Neo kill switch, the Nifty 500 signal engine.'
    }, {
      year: '2025',
      title: 'Rank-displacement system',
      note: 'Eight engines over Redis Streams, live 24×7.'
    }, {
      year: '2026',
      title: 'Writing, and taking new work',
      note: 'Available for contract and full-time engagements.'
    }]
  },
  homeAbout: 'Based in Gurgaon, working anywhere. I own systems end to end — from low-level networking to dashboards.',
  about: ['Freelance algorithmic trading and low-latency software developer. Three years of experience building production trading infrastructure for independent operators and small prop desks — architecture, deployment, and live operations.', 'Focus areas: market-data ingestion, signal computation, deterministic order routing, and observability. Comfortable owning systems end-to-end, from low-level networking to dashboards.', 'Available for contract and full-time engagements. Time-zone flexible.'],
  skills: [{
    group: 'Languages',
    items: ['Python', 'TypeScript', 'SQL', 'Rust (familiar)']
  }, {
    group: 'Markets',
    items: ['NSE/BSE equities', 'Options (F&O)', 'Order books', 'Market microstructure']
  }, {
    group: 'Backend',
    items: ['FastAPI', 'asyncio', 'uvloop', 'WebSockets', 'Protobuf']
  }, {
    group: 'Data',
    items: ['Redis Streams', 'PostgreSQL', 'TimescaleDB', 'MongoDB']
  }, {
    group: 'Ops',
    items: ['AWS EC2', 'systemd', 'Prometheus', 'Grafana', 'OpenTelemetry']
  }, {
    group: 'Frontend',
    items: ['React', 'Next.js', 'Tauri']
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/data.js", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Lockup = __ds_scope.Lockup;

__ds_ns.Mark = __ds_scope.Mark;

__ds_ns.Sigil = __ds_scope.Sigil;

__ds_ns.ThemeSwitch = __ds_scope.ThemeSwitch;

__ds_ns.MARK = __ds_scope.MARK;

__ds_ns.INK_STYLES = __ds_scope.INK_STYLES;

__ds_ns.EntryRow = __ds_scope.EntryRow;

__ds_ns.LabTile = __ds_scope.LabTile;

__ds_ns.Metric = __ds_scope.Metric;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.WorkCard = __ds_scope.WorkCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NAV = __ds_scope.NAV;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.ProjectRow = __ds_scope.ProjectRow;

})();
