const DSA = window.EshaanSharmaDesignSystem_4751b7;
const ESA = window.ES_DATA;

function AboutScreen({ go }) {
  const I = ESA.identity, A = ESA.aboutMe;
  return (
    <>
      <header className="page page-head">
        <span className="t-label emerge">About</span>
        <h1 className="t-h1 emerge" style={{ '--i': 1, maxWidth: '18ch' }}>{A.title}</h1>
      </header>
      <section className="page about-intro">
        <div className="emerge" style={{ '--i': 2 }}>
          <div className="t-read">{A.intro.map((p, i) => <p key={i} style={{ marginBottom: '1em' }}>{p}</p>)}</div>
          <dl className="about-facts">
            <div><dt>Based in</dt><dd>{I.location}</dd></div>
            <div><dt>Time zone</dt><dd>UTC+05:30, flexible</dd></div>
            <div><dt>Focus</dt><dd>{I.role}</dd></div>
            <div><dt>Engagements</dt><dd>Contract · full-time</dd></div>
          </dl>
          <div style={{ display: 'flex', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
            <DSA.Button variant="primary" iconTrail="arrow-right" onClick={() => go('Contact')}>Get in touch</DSA.Button>
            <DSA.Button icon="download">Résumé</DSA.Button>
          </div>
        </div>
        <div className="portrait emerge" style={{ '--i': 3 }}>Portrait — add an image</div>
      </section>
      <section className="page section">
        <DSA.SectionHeader index="01 — How I work" title="Three rules I keep" />
        <div className="principles">{A.principles.map((p, i) => <div className="principle" key={p.title}><span>{String(i + 1).padStart(2, '0')}</span><h3>{p.title}</h3><p>{p.note}</p></div>)}</div>
      </section>
      <section className="page section">
        <DSA.SectionHeader index="02 — Outside work" title="Hobbies and interests" />
        <div className="lab-grid">{A.interests.map((l) => <DSA.LabTile key={l.title} {...l} />)}</div>
      </section>
      <section className="page section two-col">
        <div><DSA.SectionHeader index="03 — So far" title="A short timeline" /></div>
        <div className="timeline">{A.timeline.map((t) => <div className="timeline__row" key={t.year}><time>{t.year}</time><div><h4>{t.title}</h4><p>{t.note}</p></div></div>)}</div>
      </section>
    </>
  );
}

function ContactScreen() {
  const I = ESA.identity;
  const [sent, setSent] = React.useState(false);
  const [kind, setKind] = React.useState('Contract');
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);
  const local = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  const channels = [
    { icon: 'mail', label: 'Email', value: I.email, href: 'mailto:' + I.email },
    { icon: 'linkedin', label: 'LinkedIn', value: 'in/eshaansharma2510', href: I.linkedin, ext: true },
    { icon: 'github', label: 'GitHub', value: 'Yokai-2510', href: I.github, ext: true },
    { icon: 'download', label: 'Résumé', value: 'PDF', href: '#' },
  ];
  return (
    <>
      <header className="page page-head">
        <span className="t-label emerge">Contact</span>
        <h1 className="t-h1 emerge" style={{ '--i': 1, maxWidth: '16ch' }}>Start a conversation.</h1>
        <p className="t-lede emerge" style={{ '--i': 2 }}>Available for contract and full-time engagements. Tell me what you are building and what the latency budget is.</p>
      </header>
      <section className="page contact-grid">
        <div className="emerge" style={{ '--i': 3 }}>
          <div className="channels">{channels.map((c) => <a key={c.label} className="channel" href={c.href} target={c.ext ? '_blank' : undefined} rel={c.ext ? 'noreferrer' : undefined}><span className="channel__icon"><DSA.Icon name={c.icon} size={17} /></span><span><b>{c.label}</b><small>{c.value}</small></span><DSA.Icon name="arrow-up-right" size={16} className="channel__go" /></a>)}</div>
          <div className="availability">
            <div><i></i>Taking new work · replies within a day</div>
            <span className="t-label">{I.location} · {local} IST · UTC+05:30</span>
          </div>
        </div>
        <div className="emerge" style={{ '--i': 4 }}>
          <form className="contact" data-node onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {sent ? (
              <div className="contact__sent"><DSA.Tag tone="positive" dot>Sent</DSA.Tag><p className="t-h3">Thanks — I will reply within a day.</p><DSA.Button variant="ghost" size="sm" onClick={() => setSent(false)}>Send another</DSA.Button></div>
            ) : (
              <>
                <div className="contact__row"><DSA.TextField label="Name" placeholder="Your name" /><DSA.TextField label="Email" type="email" placeholder="you@company.com" /></div>
                <DSA.TextField label="Company" optional placeholder="Desk, fund or team" />
                <div><span className="field-label">Engagement</span><div className="contact__chips">{['Contract', 'Full-time', 'Something else'].map((k) => <DSA.Chip key={k} selected={kind === k} onClick={() => setKind(k)}>{k}</DSA.Chip>)}</div></div>
                <DSA.TextField label="What are you building?" multiline rows={5} placeholder="Markets, latency budget, timeline…" />
                <div><DSA.Button variant="primary" type="submit" iconTrail="arrow-right">Send message</DSA.Button></div>
              </>
            )}
            <span className="node" data-node-dot aria-hidden="true"></span>
          </form>
        </div>
      </section>
    </>
  );
}
Object.assign(window, { AboutScreen, ContactScreen });
