// Content for the portfolio UI kit. Project facts come from the source repo (Yokai-2510/website-portfolio).
// Anything marked "Placeholder" is waiting for real content.
window.ES_DATA = {
  identity: {
    name: 'Eshaan Sharma',
    role: 'Algorithmic trading and low-latency systems developer',
    location: 'Gurgaon, India',
    timezone: 'UTC+05:30',
    email: 'ethanarkham@gmail.com',
    github: 'https://github.com/Yokai-2510',
    linkedin: 'https://linkedin.com/in/eshaansharma2510',
    discord: { handle: 'Placeholder handle', url: '#' },
    youtube: { handle: 'Placeholder channel', url: '#' },
    availability: 'Open to contract and full-time roles',
  },
  hero: {
    summary: 'Algorithmic trading and low-latency systems developer. I build production trading infrastructure: market-data pipelines, signal engines and deterministic order execution.',
  },
  work: [
    { slug: 'rank-displacement', weight: 'lg', title: 'Rank-Displacement Options Trading System', domain: 'Trading', year: '2025', role: 'Architecture, build, live operations', status: 'Live',
      summary: 'Real-time options platform built around a 50ms leaderboard cycle across all Nifty 50 constituents.',
      body: 'Multi-process, event-driven architecture with eight independent engines coordinating exclusively over Redis Streams. Single source of truth for state, a deterministic order-execution flowchart, and a full 24×7 lifecycle with self-healing.',
      points: ['Eight engines, one transport: Redis Streams for fan-out, replay and consumer groups', 'Single-writer ownership of every key — state has exactly one author', 'Order execution modelled as an auditable flowchart, not an algorithm', 'Self-healing 24×7 lifecycle on AWS EC2 under systemd'],
      stack: ['Python 3.12', 'FastAPI', 'Redis Streams', 'PostgreSQL', 'TimescaleDB', 'Tauri', 'React', 'AWS EC2'],
      metric: { value: '50ms', label: 'leaderboard cycle' }, metrics: [{ value: '50', unit: 'ms', label: 'Leaderboard cycle' }, { value: '8', label: 'Engines' }, { value: '<10', unit: 'ms', label: 'Internal hop latency' }] },
    { slug: 'strategy-builder', weight: 'lg', title: 'Strategy Builder & Live Execution Platform', domain: 'Trading', year: '2024', role: 'Architecture, build', status: 'Delivered',
      summary: 'Management API, live engine and on-demand backtester — with bit-for-bit live/backtest parity.',
      body: 'Multi-process Python platform supporting parallel strategy evaluation across stocks and options sets. Hybrid storage: Mongo as source of truth for definitions and history, Redis as the high-speed state machine. Eleven indicators shared between live and backtest.',
      points: ['Three domains: management API, live trading engine, backtester', 'Mongo for definitions and history; Redis as the hot state machine', 'One indicator library shared by live and backtest — no drift'],
      stack: ['Python', 'FastAPI', 'Next.js', 'Redis', 'MongoDB Atlas', 'Multiprocessing'],
      metric: { value: '11', label: 'shared indicators' }, metrics: [{ value: '3', label: 'Domains' }, { value: '11', label: 'Shared indicators' }, { value: '1:1', label: 'Live / backtest parity' }] },
    { slug: 'option-chain', weight: 'md', title: 'Option Chain WebSocket Pipeline', domain: 'Engineering', year: '2023', role: 'Build', status: 'Delivered',
      summary: 'Reactive WebSocket pipeline with Protobuf decoding and dynamic strike subscription from live spot.',
      body: 'Live option-chain ingestion that subscribes and unsubscribes dynamically to hold ATM±N strikes, decoded via Protobuf and surfaced to Google Sheets in real time.',
      points: ['Dynamic subscribe/unsubscribe keeps ATM±N strikes in view', 'Protobuf decoding on the hot path', 'Real-time surface in Google Sheets'],
      stack: ['Python', 'Protobuf', 'WebSockets', 'Google Sheets API'], metric: { value: 'ATM±N', label: 'live strikes' }, metrics: [] },
    { slug: 'kill-switch', weight: 'md', title: 'Kotak Neo Automated Kill Switch', domain: 'Tools', year: '2024', role: 'Build', status: 'Delivered',
      summary: 'Desktop risk manager that auto-flattens broker positions in under five seconds.',
      body: 'Single-binary desktop tool where traders compose click-step sequences for their broker portal without touching code. Listens to Gmail for tripwires, then drives the portal via Playwright to flatten everything.',
      points: ['Traders compose portal click-sequences without code', 'Gmail tripwires trigger the flatten', 'Ships as a single PyInstaller binary'],
      stack: ['Python', 'CustomTkinter', 'Playwright', 'Gmail API', 'PyInstaller', 'SQLite'], metric: { value: '<5s', label: 'to flat' }, metrics: [] },
    { slug: 'signal-engine', weight: 'sm', title: 'Nifty 500 / F&O Signal Engine', domain: 'Trading', year: '2024', role: 'Build', status: 'Delivered',
      summary: 'Ten-point composite technical scanner across the Nifty 500 and F&O universe, with delivery-percentage logic.',
      body: 'Composite scoring across moving averages, momentum, volume and Bhavcopy delivery percentage. Nightly ingestion pipeline; a morning surface for actionable signals.',
      points: ['Ten-point composite score', 'Nightly Bhavcopy ingestion', 'Morning surface of actionable signals'],
      stack: ['Python', 'CustomTkinter', 'pandas-ta'], metric: { value: '10', label: 'point composite' }, metrics: [] },
    { slug: 'delivery-screener', weight: 'sm', title: 'NSE Delivery Analytics Screener', domain: 'Tools', year: '2023', role: 'Build', status: 'Delivered',
      summary: 'Fetches NSE delivery data on a schedule and surfaces rolling delivery statistics with live charts.',
      body: 'Pulls NSE delivery data on a schedule, computes rolling average, min and max delivery percentages, and pushes a live screener with charts to Google Sheets.',
      points: ['Scheduled NSE delivery ingestion', 'Rolling avg / min / max delivery %', 'Live charts in Google Sheets'],
      stack: ['Python', 'Google Sheets API', 'pandas'], metric: null, metrics: [] },
  ],
  // Products: software I build and maintain; each `slug` opens its case study under work. Add real user counts as users + usersLabel.
  products: [
    { name: 'Rank-Displacement Options System', tagline: 'Real-time options platform built around a 50ms leaderboard cycle across all Nifty 50 constituents.', status: 'Live', metric: { value: '50ms', label: 'leaderboard cycle' }, since: '2025', platform: ['Desktop', 'AWS'], slug: 'rank-displacement', seed: 'rank-displacement',
      description: 'Eight independent engines coordinating over Redis Streams, a deterministic order-execution flowchart, and a self-healing 24×7 lifecycle.', features: ['Eight engines, one transport', 'Single-writer state', 'Self-healing 24×7', 'Tauri desk app'] },
    { name: 'Strategy Builder', tagline: 'Build strategies, run them live, and backtest on demand — with bit-for-bit live/backtest parity.', status: 'In use', metric: { value: '1:1', label: 'live / backtest parity' }, since: '2024', platform: ['Web', 'API'], slug: 'strategy-builder', seed: 'strategy-builder',
      description: 'A management API, a live trading engine and an on-demand backtester sharing one indicator library, so what you test is what runs.', features: ['Eleven shared indicators', 'Parallel evaluation', 'Mongo + Redis state'] },
    { name: 'Kill Switch for Kotak Neo', tagline: 'Desktop risk manager that flattens every broker position in under five seconds.', status: 'In use', metric: { value: '<5s', label: 'to flat' }, since: '2024', platform: ['Desktop'], slug: 'kill-switch', seed: 'kill-switch',
      description: 'Traders compose click-step sequences for their broker portal without code; Gmail tripwires trigger the flatten. Ships as a single binary.', features: ['No-code sequences', 'Gmail tripwires', 'Single binary'] },
  ],
  writing: [
    { slug: 'single-writer', interest: 'quant-dev', title: 'Single-writer ownership in Redis', kind: 'architecture', date: '2026.03', reading: '4 min', excerpt: 'If two processes can write to the same key, you’ve already lost. The discipline I use to keep ownership obvious across an eight-engine system.' },
    { slug: 'redis-streams', interest: 'quant-dev', title: 'Redis Streams as a transport, not a queue', kind: 'architecture', date: '2026.02', reading: '6 min', excerpt: 'Streams give you fan-out, replay, and consumer groups in one primitive. Stop reaching for Kafka by reflex.' },
    { slug: 'ten-ms-budget', interest: 'quant-dev', title: 'Spending a 10ms latency budget', kind: 'post-mortem', date: '2025.11', reading: '8 min', excerpt: 'A line-by-line walk through where the milliseconds actually go between tick and order submit.' },
    { slug: 'broker-ws', interest: 'quant-dev', title: 'Stop polling broker portfolios', kind: 'field note', date: '2025.09', reading: '3 min', excerpt: 'If the broker exposes a portfolio WebSocket, the polling loop in your code is just bandwidth waste.' },
    { slug: 'deterministic-orders', interest: 'quant-dev', title: 'Why order execution should be a flowchart', kind: 'architecture', date: '2025.07', reading: '5 min', excerpt: 'Replayable, testable, debuggable. A clever algorithm you can’t audit is worse than a boring one you can.' },
  ],
  about: {
    intro: [
      'Freelance algorithmic trading and low-latency software developer with three years of experience building production trading infrastructure for independent operators and small prop desks, covering architecture, deployment and live operations.',
      'Focus areas: market-data ingestion, signal computation, deterministic order routing and observability. I own systems end to end, from low-level networking to dashboards.',
    ],
    facts: [
      { label: 'Based in', value: 'Gurgaon, India' },
      { label: 'Time zone', value: 'UTC+05:30, flexible' },
      { label: 'Experience', value: '3 years, production trading systems' },
      { label: 'Open to', value: 'Contract and full-time roles' },
    ],
    experience: [
      { period: '2023 – present', title: 'Freelance algorithmic trading developer', org: 'Independent operators and small prop desks', points: [
        'Rank-displacement options platform: eight engines over Redis Streams, live 24×7 on AWS EC2 (2025).',
        'Strategy builder with bit-for-bit live/backtest parity; Kotak Neo kill switch; Nifty 500 signal engine (2024).',
        'Option-chain WebSocket pipeline with Protobuf decoding; NSE delivery analytics screener (2023).',
      ] },
    ],
    education: [
      { year: '2022–25', title: 'Bachelor of Computer Applications (BCA)', issuer: 'IGNOU', note: 'Distance programme, completed while freelancing full-time on production trading systems.' },
    ],
    certifications: [
      { year: '2024', title: 'Google Cloud Computing Foundations', issuer: 'Google Cloud Skills Boost' },
      { year: '2024', title: 'Problem Solving (Advanced)', issuer: 'HackerRank', note: 'Data structures and algorithms.' },
      { year: '2023', title: 'Scientific Computing with Python', issuer: 'freeCodeCamp' },
    ],
  },
  skills: [
    { group: 'Languages', items: ['Python', 'TypeScript', 'SQL', 'Rust (familiar)'] },
    { group: 'Markets', items: ['NSE/BSE equities', 'Options (F&O)', 'Order books', 'Market microstructure'] },
    { group: 'Backend', items: ['FastAPI', 'asyncio', 'uvloop', 'WebSockets', 'Protobuf'] },
    { group: 'Data', items: ['Redis Streams', 'PostgreSQL', 'TimescaleDB', 'MongoDB'] },
    { group: 'Ops', items: ['AWS EC2', 'systemd', 'Prometheus', 'Grafana', 'OpenTelemetry'] },
    { group: 'Frontend', items: ['React', 'Next.js', 'Tauri'] },
  ],
  // Personal: an introduction, then one mini page per interest (writing, images, links, optional projects).
  // Writing entries belong to an interest via `interest`. Add media per interest when you have it:
  //   images: ['images/game-dev-1.jpg', ...]   links: [{ label: 'itch.io', href: 'https://…', note: 'Jam games' }]
  personal: {
    intro: [
      'Outside markets I explore everything: design, UI and UX, films, video games. I believe it makes the engineering better.',
      'I am drawn to dystopias and cyberpunk, to Scandinavian culture, and to the mystique of the cosmos and the edges of what we can know. It shapes how I build: quiet on the surface, a great deal happening underneath.',
    ],
    interests: [
      { id: 'quant-dev', title: 'Quant dev', note: 'Research and tooling outside client work: market structure, backtesting, latency.' },
      { id: 'game-dev', title: 'Game dev', note: 'Placeholder. What you build, with which engine, and why.' },
      { id: 'design', title: 'Design, UI and UX', note: 'How things look, feel and behave. It makes the engineering better.',
        projects: [
          { title: 'The Field', kind: 'experiment', note: 'The canvas behind this site: one system, two media.', seed: 'field' },
          { title: 'Ink studies', kind: 'experiment', note: 'Smoke and release: two ways for ink to answer.', seed: 'ink-studies' },
        ] },
      { id: 'media', title: 'Media', note: 'Dystopian and cyberpunk worlds across video games, films, anime and fiction: stories that ask what technology does to people.' },
      { id: 'elder-scrolls', title: 'The Elder Scrolls', note: 'The fantasy world of Tamriel: its lore, histories, factions and unreliable narrators.' },
      { id: 'music', title: 'Music', note: 'Placeholder. What you listen to, play or make.' },
    ],
  },
};

// Placeholder until real writing exists: one note per interest that has none.
(function (D) {
  D.personal.interests.forEach((x) => {
    if (!D.writing.some((n) => n.interest === x.id)) D.writing.push({ slug: x.id + '-note', interest: x.id, placeholder: true, title: 'Placeholder note on ' + x.title.toLowerCase(), kind: 'note', date: '2026.—', reading: '— min', excerpt: 'Placeholder. Replace with a real piece of writing.' });
  });
})(window.ES_DATA);
