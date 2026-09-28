const DSH = window.EshaanSharmaDesignSystem_4751b7;
const ESH = window.ES_DATA;

function HomeScreen({ go }) {
  const [lead, ...rest] = ESH.work;
  return (
    <>
      <section className="page hero">
        <div className="hero__status t-label emerge" style={{ '--i': 0 }}><i></i>{ESH.hero.status}</div>
        <h1 className="t-display hero__title emerge" style={{ '--i': 1 }}>{ESH.hero.title}</h1>
        <p className="t-lede hero__lede emerge" style={{ '--i': 2 }}>{ESH.hero.lede}</p>
        <div className="hero__actions emerge" style={{ '--i': 3 }}>
          <DSH.Button variant="primary" size="lg" iconTrail="arrow-right" onClick={() => go('Work')}>See the work</DSH.Button>
          <DSH.Button size="lg" onClick={() => go('Contact')}>Get in touch</DSH.Button>
        </div>
        <div className="hero__hint t-label emerge" style={{ '--i': 5 }}>
          <span>Move slowly — the field notices</span>
          <span><kbd>T</kbd> change state</span>
        </div>
      </section>

      <section className="page section">
        <DSH.SectionHeader index="01 — Proof" title="Numbers from production" />
        <div className="proof">{ESH.proof.map((m) => <DSH.Metric key={m.label} {...m} />)}</div>
      </section>

      <section className="page section">
        <DSH.SectionHeader index="02 — Selected work" title="Systems with real money behind them" action={<DSH.Button size="sm" variant="ghost" iconTrail="arrow-right" onClick={() => go('Work')}>All work</DSH.Button>} />
        <div className="stack-list">
          <DSH.ProjectRow {...lead} index={1} weight="lg" seed={lead.slug} onOpen={() => go('Case', lead.slug)} />
          <div>{rest.slice(0, 3).map((w, i) => <DSH.ProjectRow key={w.slug} {...w} index={i + 2} weight="sm" onOpen={() => go('Case', w.slug)} />)}</div>
        </div>
      </section>

      <section className="page section">
        <DSH.SectionHeader index="03 — Products" title="Software with people using it" action={<DSH.Button size="sm" variant="ghost" iconTrail="arrow-right" onClick={() => go('Products')}>All products</DSH.Button>} />
        <div className="product-grid">{ESH.products.slice(0, 2).map((p) => <DSH.ProductCard key={p.name} {...p} onOpen={() => go('Products')} />)}</div>
      </section>

      <section className="page section two-col">
        <div><DSH.SectionHeader index="04 — Writing" title="Notes on the work" description="Short pieces on system design, latency, and the small operational decisions that turn out to matter." /></div>
        <div>{ESH.writing.slice(0, 3).map((n) => <DSH.EntryRow key={n.slug} {...n} onOpen={() => go('Article', n.slug)} />)}</div>
      </section>

      <section className="page section">
        <div className="band">
          <p>{ESH.homeAbout}</p>
          <div className="band__actions"><DSH.Button onClick={() => go('About')}>About me</DSH.Button><DSH.Button variant="primary" iconTrail="arrow-right" onClick={() => go('Contact')}>Contact</DSH.Button></div>
        </div>
      </section>
    </>
  );
}
window.HomeScreen = HomeScreen;
