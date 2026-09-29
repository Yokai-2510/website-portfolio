const DSC = window.EshaanSharmaDesignSystem_4751b7;
const ESC = window.ES_DATA;

function ContactScreen() {
  const I = ESC.identity;
  const [sent, setSent] = React.useState(false);
  const [kind, setKind] = React.useState('Contract');
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);
  const local = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  const channels = [
    { icon: 'mail', label: 'Email', value: I.email, href: 'mailto:' + I.email },
    { icon: 'linkedin', label: 'LinkedIn', value: 'in/eshaansharma2510', href: I.linkedin, ext: true },
    { icon: 'github', label: 'GitHub', value: 'Yokai-2510', href: I.github, ext: true },
    { icon: 'message', label: 'Discord', value: I.discord.handle, href: I.discord.url, ext: I.discord.url !== '#' },
    { icon: 'youtube', label: 'YouTube', value: I.youtube.handle, href: I.youtube.url, ext: I.youtube.url !== '#' },
    { icon: 'download', label: 'Résumé', value: 'PDF', href: '#' },
  ];
  return (
    <>
      <header className="page page-head">
        <h1 className="t-h1 emerge">Connect</h1>
        <p className="t-lede emerge" style={{ '--i': 1 }}>Email is the fastest way to reach me. {I.availability}.</p>
      </header>
      <section className="page contact-grid">
        <div className="emerge" style={{ '--i': 2 }}>
          <div className="channel-stack">{channels.map((c) => (
            <a key={c.label} className="channel panel" href={c.href} target={c.ext ? '_blank' : undefined} rel={c.ext ? 'noreferrer' : undefined}>
              <span className="channel__icon"><DSC.Icon name={c.icon} size={17} /></span>
              <span className="channel__text"><b>{c.label}</b><small>{c.value}</small></span>
              <DSC.Icon name="arrow-up-right" size={16} className="channel__go" />
            </a>
          ))}</div>
          <p className="contact-meta">{I.location} · {local} local time · {I.timezone}</p>
        </div>
        <div className="emerge" style={{ '--i': 3 }}>
          <form className="contact panel" data-node onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {sent ? (
              <div className="contact__sent"><DSC.Tag tone="positive" dot>Sent</DSC.Tag><p className="t-h3">Thanks. I will reply within a day.</p><DSC.Button variant="ghost" size="sm" onClick={() => setSent(false)}>Send another</DSC.Button></div>
            ) : (
              <>
                <div className="contact__row"><DSC.TextField label="Name" placeholder="Your name" /><DSC.TextField label="Email" type="email" placeholder="you@company.com" /></div>
                <DSC.TextField label="Company" optional placeholder="Firm, fund or team" />
                <div><span className="field-label">Engagement</span><div className="chip-row">{['Contract', 'Full-time', 'Other'].map((k) => <DSC.Chip key={k} selected={kind === k} onClick={() => setKind(k)}>{k}</DSC.Chip>)}</div></div>
                <DSC.TextField label="Message" multiline rows={5} placeholder="The role or project, and your timeline" />
                <div><DSC.Button variant="primary" type="submit" iconTrail="arrow-right">Send message</DSC.Button></div>
              </>
            )}
            <span className="node" data-node-dot aria-hidden="true"></span>
          </form>
        </div>
      </section>
    </>
  );
}
window.ContactScreen = ContactScreen;
