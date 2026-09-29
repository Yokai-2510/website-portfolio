const DSQ = window.EshaanSharmaDesignSystem_4751b7;
const ESQ = window.ES_DATA;

// An introduction, then one card per interest; each opens its own mini page.
function PersonalScreen({ go }) {
  const P = ESQ.personal;
  return (
    <>
      <header className="page page-head">
        <h1 className="t-h1 emerge">Personal</h1>
      </header>
      <section className="page personal-intro">
        <div className="t-read about-read emerge" style={{ '--i': 1 }}>{P.intro.map((p, i) => <p key={i}>{p}</p>)}</div>
        <div className="portrait emerge" style={{ '--i': 2 }}><image-slot id="personal-portrait" shape="rounded" radius="16" placeholder="Image"></image-slot></div>
      </section>
      <section className="page section">
        <DSQ.SectionHeader title="Interests" />
        <div className="doors">{P.interests.map((x, i) => (
          <a key={x.id} href="#" className="door panel emerge" style={{ '--i': i + 3 }} data-node onClick={(e) => { e.preventDefault(); go('Interest', x.id); }}>
            <div className="door__media"><DSQ.Sigil seed={x.id} nodes={7} width={320} height={180} /></div>
            <div className="door__body">
              <h3 className="door__title">{x.title}</h3>
              <p className="door__note">{x.note}</p>
              <span className="door__cta">Explore {x.title.split(',')[0].toLowerCase()}<DSQ.Icon name="arrow-right" size={15} /></span>
            </div>
            <span className="node" data-node-dot aria-hidden="true"></span>
          </a>
        ))}</div>
      </section>
    </>
  );
}

function InterestScreen({ go, param }) {
  const all = ESQ.personal.interests;
  const x = all.find((it) => it.id === param) || all[0];
  const notes = ESQ.writing.filter((n) => n.interest === x.id);
  return (
    <article className="page case">
      <a href="#" className="case-back" onClick={(e) => { e.preventDefault(); go('Personal'); }}><DSQ.Icon name="arrow-left" size={16} />Personal</a>
      <h1 className="t-h1 emerge">{x.title}</h1>
      <p className="t-lede case-lede emerge" style={{ '--i': 1 }}>{x.note}</p>
      <section className="section">
        <DSQ.SectionHeader title="Writing" />
        <div>{notes.map((n) => <DSQ.EntryRow key={n.slug} {...n} onOpen={() => go('Article', n.slug)} />)}</div>
      </section>
      {x.images && x.images.length > 0 && (
        <div className="gallery interest-block">{x.images.map((src, k) => <div className="gallery__cell" key={k}><img src={src} alt="" /></div>)}</div>
      )}
      {x.projects && (
        <section className="section">
          <DSQ.SectionHeader title="Projects" />
          <div className="lab-grid lab-grid--2">{x.projects.map((l) => <DSQ.LabTile key={l.title} {...l} />)}</div>
        </section>
      )}
      {x.links && x.links.length > 0 && (
        <div className="channels interest-block">{x.links.map((l, k) => (
          <a key={k} className="channel panel" href={l.href} target="_blank" rel="noreferrer">
            <span className="channel__icon"><DSQ.Icon name="globe" size={17} /></span>
            <span className="channel__text"><b>{l.label}</b>{l.note && <small>{l.note}</small>}</span>
            <DSQ.Icon name="arrow-up-right" size={16} className="channel__go" />
          </a>
        ))}</div>
      )}
      <section className="section">
        <DSQ.SectionHeader title="Other interests" />
        <div className="chip-row">{all.filter((it) => it.id !== x.id).map((it) => <DSQ.Chip key={it.id} onClick={() => go('Interest', it.id)}>{it.title}</DSQ.Chip>)}</div>
      </section>
    </article>
  );
}

function ArticleScreen({ go, param }) {
  const n = ESQ.writing.find((w) => w.slug === param) || ESQ.writing[0];
  const x = ESQ.personal.interests.find((it) => it.id === n.interest);
  return (
    <article className="page">
      <div className="article">
        <a href="#" className="case-back" onClick={(e) => { e.preventDefault(); x ? go('Interest', x.id) : go('Personal'); }}><DSQ.Icon name="arrow-left" size={16} />{x ? x.title : 'Personal'}</a>
        <header className="article__head">
          <div className="article__meta t-label emerge"><span>{n.date}</span><span>{n.kind}</span><span>{n.reading}</span></div>
          <h1 className="t-h1 emerge" style={{ '--i': 1 }}>{n.title}</h1>
          <p className="t-lede emerge" style={{ '--i': 2, marginTop: 20 }}>{n.excerpt}</p>
        </header>
        <div className="t-read prose emerge" style={{ '--i': 3 }}>
          <p>Placeholder. The full article goes here.</p>
          {!n.placeholder && <pre>{'XADD ticks * sym NIFTY ltp 24812.35\nXREADGROUP GROUP engines rank COUNT 64 STREAMS ticks >'}</pre>}
          {!n.placeholder && <blockquote className="t-quote">A clever algorithm you can’t audit is worse than a boring one you can.</blockquote>}
        </div>
      </div>
    </article>
  );
}
Object.assign(window, { PersonalScreen, InterestScreen, ArticleScreen });
