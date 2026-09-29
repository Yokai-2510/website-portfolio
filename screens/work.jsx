const DSW = window.EshaanSharmaDesignSystem_4751b7;
const ESW = window.ES_DATA;

// Products or projects, one at a time. Each opens a case study.
function WorkScreen({ go, param }) {
  const own = ESW.products.map((p) => p.slug);
  const projects = ESW.work.filter((w) => !own.includes(w.slug));
  const [view, setView] = React.useState(param === 'projects' ? 'Projects' : 'Products');
  const opts = [{ value: 'Products', label: 'Products', count: ESW.products.length }, { value: 'Projects', label: 'Projects', count: projects.length }];
  return (
    <>
      <header className="page page-head">
        <h1 className="t-h1 emerge">Work</h1>
        <p className="t-lede emerge" style={{ '--i': 1 }}>Products I build and maintain, and systems delivered as freelance work. Most run in production with real capital.</p>
        <div className="work-toggle emerge" style={{ '--i': 2 }}><DSW.SegmentedControl options={opts} value={view} onChange={setView} label="Show" /></div>
      </header>
      <section className="page work-view" key={view}>
        {view === 'Products' ? (
          <>
            <p className="work-view__desc emerge">Software I build, ship and keep running.</p>
            <div className="product-list">{ESW.products.map((p, i) => <div key={p.slug} className="emerge" style={{ '--i': i + 1 }}><DSW.ProductCard {...p} size="lg" onOpen={() => go('Case', p.slug)} /></div>)}</div>
          </>
        ) : (
          <>
            <p className="work-view__desc emerge">Pipelines, scanners and analytics tools built for clients.</p>
            <div className="card-grid card-grid--3">{projects.map((w, i) => <div key={w.slug} className="emerge" style={{ '--i': i + 1 }}><DSW.WorkCard {...w} seed={w.slug} onOpen={() => go('Case', w.slug)} /></div>)}</div>
          </>
        )}
      </section>
    </>
  );
}

function CaseScreen({ go, param }) {
  const i = Math.max(0, ESW.work.findIndex((w) => w.slug === param));
  const w = ESW.work[i], next = ESW.work[(i + 1) % ESW.work.length];
  return (
    <article className="page case">
      <a href="#" className="case-back" onClick={(e) => { e.preventDefault(); go('Work'); }}><DSW.Icon name="arrow-left" size={16} />Work</a>
      <div className="case-tags emerge"><DSW.Tag tone={w.domain === 'Trading' ? 'accent' : 'neutral'} dot>{w.domain}</DSW.Tag><DSW.Tag tone={w.status === 'Live' ? 'positive' : 'neutral'}>{w.status}</DSW.Tag></div>
      <h1 className="t-h1 case-title emerge" style={{ '--i': 1 }}>{w.title}</h1>
      <p className="t-lede case-lede emerge" style={{ '--i': 2 }}>{w.summary}</p>
      <dl className="case-meta panel emerge" style={{ '--i': 3 }}>
        <div><dt>Year</dt><dd>{w.year}</dd></div>
        <div><dt>Role</dt><dd>{w.role}</dd></div>
        <div><dt>Domain</dt><dd>{w.domain}</dd></div>
        <div><dt>Stack</dt><dd>{w.stack.slice(0, 4).join(', ')}</dd></div>
      </dl>
      <figure className="case-figure emerge" style={{ '--i': 4 }} data-node>
        <DSW.Sigil seed={w.slug} nodes={12} width={840} height={320} />
        <figcaption className="t-label">Placeholder: architecture diagram or screenshot</figcaption>
        <span className="node" data-node-dot aria-hidden="true"></span>
      </figure>
      {w.metrics.length > 0 && <div className="case-metrics" style={{ '--n': w.metrics.length }}>{w.metrics.map((m) => <DSW.Metric key={m.label} {...m} />)}</div>}
      <div className="case-body">
        <h2 className="case-h">Architecture</h2>
        <div>
          <p className="t-read">{w.body}</p>
          <ul className="dash-list">{w.points.map((p, k) => <li key={k}>{p}</li>)}</ul>
          <div className="case-stack">{w.stack.map((s) => <DSW.Tag key={s} outline>{s}</DSW.Tag>)}</div>
        </div>
      </div>
      <a href="#" className="case-next panel" onClick={(e) => { e.preventDefault(); go('Case', next.slug); }}>
        <span className="case-next__label">Next project</span>
        <span className="case-next__title">{next.title}</span>
        <DSW.Icon name="arrow-right" size={16} className="case-next__go" />
      </a>
    </article>
  );
}
Object.assign(window, { WorkScreen, CaseScreen });
