const DSR = window.EshaanSharmaDesignSystem_4751b7;
const ESR = window.ES_DATA;

function WritingScreen({ go }) {
  const kinds = ['all', ...Array.from(new Set(ESR.writing.map((n) => n.kind)))];
  const [k, setK] = React.useState('all');
  const list = ESR.writing.filter((n) => k === 'all' || n.kind === k);
  return (
    <>
      <header className="page page-head">
        <span className="t-label emerge">Writing — {String(ESR.writing.length).padStart(2, '0')} notes</span>
        <h1 className="t-h1 emerge" style={{ '--i': 1 }}>Writing on the work.</h1>
        <p className="t-lede emerge" style={{ '--i': 2 }}>Short pieces on system design, latency, and the small operational decisions that turn out to matter.</p>
        <div className="emerge" style={{ '--i': 3, display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 32 }}>
          {kinds.map((x) => <DSR.Chip key={x} selected={k === x} count={x === 'all' ? ESR.writing.length : ESR.writing.filter((n) => n.kind === x).length} onClick={() => setK(x)}>{x[0].toUpperCase() + x.slice(1)}</DSR.Chip>)}
        </div>
      </header>
      <section className="page" key={k}>
        {list.map((n, i) => <div key={n.slug} className="emerge" style={{ '--i': i }}><DSR.EntryRow {...n} onOpen={() => go('Article', n.slug)} /></div>)}
      </section>
    </>
  );
}

function ArticleScreen({ go, param }) {
  const n = ESR.writing.find((x) => x.slug === param) || ESR.writing[0];
  return (
    <article className="page">
      <div className="article">
        <a href="#" className="case-back" onClick={(e) => { e.preventDefault(); go('Writing'); }}><DSR.Icon name="arrow-left" size={16} />Writing</a>
        <header className="article__head">
          <div className="article__meta t-label emerge"><span>{n.date}</span><span>{n.kind}</span><span>{n.reading}</span></div>
          <h1 className="t-h1 emerge" style={{ '--i': 1 }}>{n.title}</h1>
          <p className="t-lede emerge" style={{ '--i': 2, marginTop: 20 }}>{n.excerpt}</p>
        </header>
        <div className="t-read prose emerge" style={{ '--i': 3 }}>
          <p>Sample body — the article text lives in the CMS; this shows the reading typography. Long-form uses Newsreader at 20/34 on a 66-character measure, so a page of prose reads like a page, not a feed.</p>
          <p>Code and data drop into Martian Mono, set slightly condensed so tables and snippets hold their columns without shouting:</p>
          <pre>{'XADD ticks * sym NIFTY ltp 24812.35\nXREADGROUP GROUP engines rank COUNT 64 STREAMS ticks >'}</pre>
          <blockquote className="t-quote">A clever algorithm you can’t audit is worse than a boring one you can.</blockquote>
          <p>Inline links look like <a href="#">this</a> — underlined, because in prose a link must be findable without hovering.</p>
        </div>
      </div>
    </article>
  );
}
Object.assign(window, { WritingScreen, ArticleScreen });
