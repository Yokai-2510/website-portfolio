const DSH = window.EshaanSharmaDesignSystem_4751b7;
const ESH = window.ES_DATA;

function HomeScreen({ go }) {
  const I = ESH.identity;
  const find = (s) => ESH.work.find((w) => w.slug === s);
  const lead = find('rank-displacement'), more = [find('strategy-builder'), find('option-chain')];
  return (
    <>
      <section className="page hero">
        <h1 className="t-display emerge">{I.name}</h1>
        <p className="t-lede hero__lede emerge" style={{ '--i': 1 }}>{ESH.hero.summary}</p>
        <p className="hero__facts emerge" style={{ '--i': 2 }}><span>{I.location}</span><span>{I.availability}</span></p>
        <div className="hero__actions emerge" style={{ '--i': 3 }}>
          <DSH.Button variant="primary" size="lg" iconTrail="arrow-right" onClick={() => go('Work')}>View work</DSH.Button>
        </div>
      </section>
      <section className="page section">
        <DSH.SectionHeader title="Selected work" action={<DSH.Button size="sm" variant="ghost" iconTrail="arrow-right" onClick={() => go('Work')}>All work</DSH.Button>} />
        <div className="stack-list">
          <DSH.ProjectRow {...lead} weight="lg" seed={lead.slug} onOpen={() => go('Case', lead.slug)} />
          <div className="card-grid card-grid--2">{more.map((w) => <DSH.WorkCard key={w.slug} {...w} seed={w.slug} onOpen={() => go('Case', w.slug)} />)}</div>
        </div>
      </section>
    </>
  );
}
window.HomeScreen = HomeScreen;
