const DSP = window.EshaanSharmaDesignSystem_4751b7;
const ESP = window.ES_DATA;

function ProductsScreen() {
  return (
    <>
      <header className="page page-head">
        <span className="t-label emerge">Products — {String(ESP.products.length).padStart(2, '0')}</span>
        <h1 className="t-h1 emerge" style={{ '--i': 1 }}>Software with people using it.</h1>
        <p className="t-lede emerge" style={{ '--i': 2 }}>Things I build, ship and keep running for my own users. Client systems live under Work.</p>
      </header>
      <section className="page">
        <div className="product-list">{ESP.products.map((p, i) => <div key={p.name} className="emerge" style={{ '--i': i }}><DSP.ProductCard {...p} size="lg" /></div>)}</div>
      </section>
    </>
  );
}

function CraftScreen() {
  const C = ESP.craft;
  return (
    <>
      <header className="page page-head">
        <span className="t-label emerge">Craft</span>
        <h1 className="t-h1 emerge" style={{ '--i': 1 }}>What I work with, and how.</h1>
        <p className="t-lede emerge" style={{ '--i': 2 }}>Where I spend my time, what I have shipped with, what I am certified in, and the experiments that keep it sharp.</p>
      </header>
      <section className="page section">
        <DSP.SectionHeader index="01 — Focus" title="Where I spend my time" />
        <div className="focus">{C.focus.map((x, i) => <div className="focus__item" key={x.title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{x.title}</h3><p>{x.note}</p></div>)}</div>
      </section>
      <section className="page section">
        <DSP.SectionHeader index="02 — Capabilities" title="Shipped with, not watched a tutorial on" />
        <div className="caps">{ESP.skills.map((g) => <div className="caps__row" key={g.group}><h4>{g.group}</h4><ul>{g.items.map((s) => <li key={s}><DSP.Tag>{s}</DSP.Tag></li>)}</ul></div>)}</div>
      </section>
      <section className="page section two-col">
        <div><DSP.SectionHeader index="03 — Credentials" title="Certifications and qualifications" /></div>
        <div className="timeline">{C.credentials.map((c, i) => <div className="timeline__row" key={i}><time>{c.year}</time><div className="cred"><div><h4>{c.title}</h4><p>{c.issuer}</p></div>{c.placeholder && <DSP.Tag outline>placeholder</DSP.Tag>}</div></div>)}</div>
      </section>
      <section className="page section">
        <DSP.SectionHeader index="04 — Lab" title="Experiments" description="Things that aren’t client work. Tiles take an image, or fall back to their own constellation." />
        <div className="lab-grid">{C.experiments.map((l) => <DSP.LabTile key={l.title} {...l} />)}</div>
      </section>
    </>
  );
}
Object.assign(window, { ProductsScreen, CraftScreen });
