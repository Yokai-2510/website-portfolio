const DSA = window.EshaanSharmaDesignSystem_4751b7;
const ESA = window.ES_DATA;

// The recruiter page: summary, facts, résumé, experience, skills, education, certifications.
function AboutScreen() {
  const A = ESA.about;
  const cred = (c) => (
    <div className="cred panel" key={c.title}>
      <h3>{c.title}</h3><time>{c.year}</time>
      <p>{c.issuer}{c.note && <span className="cred__note">{c.note}</span>}</p>
    </div>
  );
  return (
    <>
      <header className="page page-head">
        <h1 className="t-h1 emerge">About</h1>
      </header>
      <section className="page about-intro">
        <div className="emerge" style={{ '--i': 1 }}>
          <div className="t-read about-read">{A.intro.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
        <aside className="about-side emerge" style={{ '--i': 2 }}>
          <dl className="facts panel">{A.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
          <DSA.Button variant="primary" icon="download" full>Résumé</DSA.Button>
        </aside>
      </section>
      <section className="page section" id="experience">
        <DSA.SectionHeader title="Experience" />
        <div className="xp">{A.experience.map((x) => (
          <div className="xp__item panel" key={x.title}>
            <div className="xp__head"><h3>{x.title}</h3><span className="xp__period">{x.period}</span></div>
            <p className="xp__org">{x.org}</p>
            <ul className="dash-list">{x.points.map((p, k) => <li key={k}>{p}</li>)}</ul>
          </div>
        ))}</div>
      </section>
      <section className="page section" id="skills">
        <DSA.SectionHeader title="Skills" />
        <div className="skills">{ESA.skills.map((g) => <div className="skill panel" key={g.group}><h3>{g.group}</h3><ul>{g.items.map((s) => <li key={s}><DSA.Tag>{s}</DSA.Tag></li>)}</ul></div>)}</div>
      </section>
      <section className="page section two-col" id="credentials">
        <div><DSA.SectionHeader title="Education" /><div className="creds">{A.education.map(cred)}</div></div>
        <div><DSA.SectionHeader title="Certifications" /><div className="creds">{A.certifications.map(cred)}</div></div>
      </section>
    </>
  );
}
window.AboutScreen = AboutScreen;
