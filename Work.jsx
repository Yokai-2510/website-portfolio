const DSW = window.EshaanSharmaDesignSystem_4751b7;
const ESW = window.ES_DATA;

// Every project gets its own place on the screen; its weight decides how much.
function WorkScreen({ go }) {
  const [f, setF] = React.useState('All');
  const domains = ['All', 'Trading', 'Engineering', 'Tools'];
  const opts = domains.map((d) => ({ value: d, label: d, count: d === 'All' ? ESW.work.length : ESW.work.filter((w) => w.domain === d).length }));
  const list = ESW.work.filter((w) => f === 'All' || w.domain === f);
  const major = list.filter((w) => w.weight !== 'sm'), minor = list.filter((w) => w.weight === 'sm');
  const num = (w) => ESW.work.indexOf(w) + 1;
  return (
    <>
      <header className="page page-head">
        <span className="t-label emerge">Work — {String(ESW.work.length).padStart(2, '0')} projects</span>
        <div className="page-head__row">
          <div><h1 className="t-h1 emerge" style={{ '--i': 1 }}>Things I have built and shipped.</h1>
          <p className="t-lede emerge" style={{ '--i': 2 }}>Trading infrastructure, browser-automation tools and small analytics jobs. Most have been live in production with real money behind them.</p></div>
          <div className="emerge" style={{ '--i': 3 }}><DSW.SegmentedControl options={opts} value={f} onChange={setF} label="Domain" /></div>
        </div>
      </header>
      <section className="page" key={f}>
        <div className="stack-list">
          {major.map((w, i) => <div key={w.slug} className="emerge" style={{ '--i': i }}><DSW.ProjectRow {...w} index={num(w)} seed={w.slug} flip={i % 2 === 1} onOpen={() => go('Case', w.slug)} /></div>)}
        </div>
        {minor.length > 0 && (
          <div className="stack-more">
            <span className="t-label">{major.length ? 'Smaller jobs' : 'Projects'}</span>
            <div>{minor.map((w) => <DSW.ProjectRow key={w.slug} {...w} index={num(w)} onOpen={() => go('Case', w.slug)} />)}</div>
          </div>
        )}
      </section>
    </>
  );
}

function CaseScreen({ go, param }) {
  const i = Math.max(0, ESW.work.findIndex((w) => w.slug === param));
  const w = ESW.work[i], next = ESW.work[(i + 1) % ESW.work.length];
  return (
    <article className="page" style={{ paddingTop: 56 }}>
      <a href="#" className="case-back" onClick={(e) => { e.preventDefault(); go('Work'); }}><DSW.Icon name="arrow-left" size={16} />All work</a>
      <div className="emerge" style={{ display: 'flex', gap: 10, marginBottom: 20 }}><DSW.Tag tone={w.domain === 'Trading' ? 'accent' : 'neutral'} dot>{w.domain}</DSW.Tag><DSW.Tag tone={w.status === 'Live' ? 'positive' : 'neutral'}>{w.status}</DSW.Tag></div>
      <h1 className="t-h1 emerge" style={{ '--i': 1, maxWidth: '20ch' }}>{w.title}</h1>
      <p className="t-lede emerge" style={{ '--i': 2, marginTop: 20, maxWidth: '56ch' }}>{w.summary}</p>
      <dl className="case-meta emerge" style={{ '--i': 3 }}>
        <div><dt>Year</dt><dd>{w.year}</dd></div>
        <div><dt>Role</dt><dd>{w.role}</dd></div>
        <div><dt>Domain</dt><dd>{w.domain}</dd></div>
        <div><dt>Stack</dt><dd>{w.stack.slice(0, 4).join(', ')}</dd></div>
      </dl>
      <figure className="case-figure emerge" style={{ '--i': 4 }} data-node>
        <DSW.Sigil seed={w.slug} nodes={12} width={840} height={320} />
        <figcaption className="t-label">System sketch — replace with an architecture diagram or screenshot</figcaption>
        <span className="node" data-node-dot aria-hidden="true"></span>
      </figure>
      {w.metrics.length > 0 && <div className="proof" style={{ marginTop: 56, gridTemplateColumns: `repeat(${w.metrics.length}, minmax(0,1fr))` }}>{w.metrics.map((m) => <DSW.Metric key={m.label} {...m} />)}</div>}
      <div className="case-body">
        <div><span className="t-label">Architecture</span></div>
        <div>
          <p className="t-read">{w.body}</p>
          <ol className="case-points">{w.points.map((p, k) => <li key={k}><span>{String(k + 1).padStart(2, '0')}</span>{p}</li>)}</ol>
          <div style={{ marginTop: 28, display: 'flex', gap: 6, flexWrap: 'wrap' }}>{w.stack.map((s) => <DSW.Tag key={s} outline>{s}</DSW.Tag>)}</div>
        </div>
      </div>
      <div className="case-next">
        <DSW.SectionHeader index="Next project" title="" />
        <DSW.ProjectRow {...next} weight="md" index={ESW.work.indexOf(next) + 1} seed={next.slug} onOpen={() => go('Case', next.slug)} />
      </div>
    </article>
  );
}
Object.assign(window, { WorkScreen, CaseScreen });
