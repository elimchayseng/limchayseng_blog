// v2 (revised) — chrome as register marks, not panels
// - Skull + small nav, no chrome top strip
// - Print-style corner marks frame the page
// - Each post row gets a tiny brushed-steel tick on the left
// - Year breaks get a small chrome square + thin gradient rule
// - Footer: chrome gradient hairline + socials as plain mono links
// - Running thoughts rail stays

const POSTS_V2 = [
  { date: '04.19', year: '2023', title: 'Boston Marathon — Race Recap', tag: 'Marathon', note: 'ran it on a torn tendon. somehow the best one.' },
  { date: '03.29', year: '2023', title: 'The Speed Project 2023', tag: 'Ultra · Relay', note: '49 mi from LA to Vegas. limped across the line.' },
  { date: '11.18', year: '2022', title: 'Norcal Festive — The Plan', tag: 'Notes', note: '' },
  { date: '10.30', year: '2022', title: 'Ironman California — Race Recap', tag: 'Triathlon', note: 'first full distance. 140.6 in the rain.' },
  { date: '08.11', year: '2022', title: 'Take the Bridge — Chicago', tag: 'Race', note: '' },
  { date: '07.08', year: '2022', title: 'Ironman 70.3 Steelhead', tag: 'Triathlon', note: '' },
  { date: '05.26', year: '2022', title: 'Trials of Miles × Tracksmith + Strava Detox', tag: 'Essay', note: 'deleted the app for a year. recommend.' },
  { date: '03.30', year: '2022', title: 'The Speed Project 2022', tag: 'Ultra · Relay', note: '' },
  { date: '03.10', year: '2022', title: "What's Next — March 2022", tag: 'Notes', note: '' },
  { date: '02.28', year: '2022', title: '2022 Ventura Marathon — Sub‑3', tag: 'Marathon', note: 'first sub-3. cried at the line.' },
];

const SOCIALS = [
  { k: 'github', h: 'elimchayseng13' },
  { k: 'strava', h: 'limchayseng' },
  { k: 'linkedin', h: 'ethanlim' },
  { k: 'email', h: 'hi@limchayseng.com' },
];

const THOUGHTS = [
  { q: 'I smiled with every single step.', src: 'Boston, 2023' },
  { q: "I didn't save anything for the swim back.", src: 'TSP, 2023' },
  { q: "I'm done being consumed, and I'm ready to execute.", src: 'Ventura, 2022' },
  { q: 'Lower the bar. There is something valuable about the cold.', src: 'Cold in 4 Steps, 2022' },
];

// ─── Atoms ──────────────────────────────────────────────────────
function SkullMark({ size = 26 }) {
  return (
    <img src="assets/skull.png" alt="" width={size} height={size}
      className="skull-mark" style={{ display: 'block' }} />
  );
}

function CornerMarks() {
  return (
    <>
      <div className="corner-mark tl" />
      <div className="corner-mark tr" />
      <div className="corner-mark bl" />
      <div className="corner-mark br" />
    </>
  );
}

function MiniNav({ active }) {
  const items = ['writing', 'about', 'rss'];
  return (
    <nav style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
      {items.map((i) => (
        <a key={i} href="#" className={'nav-link' + (active === i ? ' active' : '')}
           style={{ fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '0.04em' }}>
          {i}
        </a>
      ))}
    </nav>
  );
}

function HeaderRow({ active = 'writing' }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', color: 'inherit' }}>
        <SkullMark size={24} />
        <span style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em' }}>
          limchayseng<span style={{ color: 'var(--ink-mute)', fontWeight: 400 }}>.com</span>
        </span>
      </a>
      <MiniNav active={active} />
    </header>
  );
}

function Footer() {
  return (
    <div style={{ marginTop: 80 }}>
      <hr className="chrome-rule" style={{ margin: 0 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 22, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.04em' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {SOCIALS.map((s, i) => (
            <React.Fragment key={s.k}>
              {i > 0 && <span style={{ color: 'var(--ink-faint)' }}>·</span>}
              <a href="#" style={{ textDecoration: 'none', color: 'var(--ink-soft)', display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
                <span>{s.k}</span>
                <span style={{ color: 'var(--ink-faint)' }}>↗</span>
              </a>
            </React.Fragment>
          ))}
        </div>
        <span style={{ color: 'var(--ink-faint)' }}>© EL · est. 2022 · chicago & sf</span>
      </div>
    </div>
  );
}

// ─── ALT — vertical chrome spine in the left margin ─────────────
function VariantAlt() {
  return (
    <div className="paper" style={{ width: 1280, height: 1600, padding: '56px 96px 56px 130px', boxSizing: 'border-box', fontFamily: 'var(--sans)', position: 'relative' }}>
      <CornerMarks />

      {/* Vertical chrome spine — runs the full page height in the left gutter */}
      <div style={{ position: 'absolute', left: 56, top: 90, bottom: 90, width: 1, background: 'linear-gradient(180deg, transparent 0%, var(--chrome) 4%, var(--chrome) 96%, transparent 100%)', opacity: 0.4 }} />
      {/* tick marks on the spine, like a ruler */}
      {[0.18, 0.36, 0.55, 0.78].map((t, i) => (
        <div key={i} style={{ position: 'absolute', left: 50, top: `calc(90px + (100% - 180px) * ${t})`, width: 12, height: 1, background: 'var(--chrome-dim)', opacity: 0.55 }} />
      ))}

      <HeaderRow active="writing" />

      <section style={{ marginTop: 64 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 52, letterSpacing: '-0.035em', margin: 0, color: 'var(--ink)' }}>Writing</h1>
          <span className="meta-mono">24 entries · 2022 – 2026</span>
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 18, lineHeight: 1.5, color: 'var(--ink-soft)', margin: '14px 0 0', maxWidth: 680 }}>
          Long‑form notes from inside the pain cave, plus the side of me that ships software.
        </p>
      </section>

      <section style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 80 }}>
        <div>
          {POSTS_V2.map((p, idx) => {
            const yearChange = idx === 0 || POSTS_V2[idx - 1].year !== p.year;
            return (
              <React.Fragment key={p.title}>
                {yearChange && (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: idx === 0 ? '4px 0 8px' : '24px 0 8px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--chrome-dim)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>[ {p.year} ]</span>
                  </div>
                )}
                <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '14px 0', borderTop: !yearChange ? '1px solid rgba(239,233,221,0.06)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-mute)', letterSpacing: '0.02em', width: 50, fontVariantNumeric: 'tabular-nums' }}>{p.date}</span>
                    <span style={{ fontFamily: 'var(--sans)', fontWeight: 400, fontSize: 20, color: 'var(--ink)', flex: 1, letterSpacing: '-0.014em' }}>{p.title}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-faint)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{p.tag}</span>
                  </div>
                  {p.note && (
                    <div style={{ paddingLeft: 64, marginTop: 4, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--ink-mute)' }}>
                      <span style={{ color: 'var(--hanko)', marginRight: 8 }}>✱</span>{p.note}
                    </div>
                  )}
                </a>
              </React.Fragment>
            );
          })}
        </div>

        <aside style={{ position: 'relative', paddingLeft: 28 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 3, height: 28, background: 'var(--hanko)' }} />
          <div style={{ position: 'absolute', left: 1, top: 0, bottom: 0, width: 1, background: 'rgba(239,233,221,0.08)' }} />
          <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 15, margin: 0, letterSpacing: '-0.005em' }}>Running thoughts</h3>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-faint)', letterSpacing: '0.06em', margin: '4px 0 22px', textTransform: 'uppercase' }}>excerpts</p>

          <div style={{ display: 'grid', gap: 22 }}>
            {THOUGHTS.map((t, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-soft)', margin: 0 }}>"{t.q}"</p>
                <div className="meta-mono" style={{ marginTop: 6, color: 'var(--ink-faint)', fontSize: 10.5 }}>— {t.src}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  );
}

// ─── Post detail page — same chrome restraint ───────────────────
function PostPageV2() {
  return (
    <div className="paper" style={{ width: 1280, height: 2000, padding: '56px 96px', boxSizing: 'border-box', fontFamily: 'var(--sans)', position: 'relative' }}>
      <CornerMarks />

      <HeaderRow active="writing" />

      <article style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '160px 700px 1fr', gap: 48 }}>
        {/* LEFT GUTTER */}
        <aside style={{ paddingTop: 6 }}>
          <SkullMark size={32} />
          <div className="meta-mono" style={{ marginTop: 22 }}>Filed</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-soft)', marginTop: 4 }}>
            Marathon<br/>Boston<br/>Heartbreak
          </div>

          <div className="meta-mono" style={{ marginTop: 22 }}>Date</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginTop: 4 }}>2023.04.19</div>

          <div className="meta-mono" style={{ marginTop: 22 }}>Read</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', marginTop: 4 }}>~9 min</div>

          <div className="meta-mono" style={{ marginTop: 22 }}>Result</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--hanko)', marginTop: 4 }}>● 3:24:11</div>

          <hr className="chrome-rule" style={{ marginTop: 28, marginBottom: 0, maxWidth: 60 }} />
        </aside>

        {/* CENTER — body */}
        <div>
          <h1 style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 46, lineHeight: 1.08, letterSpacing: '-0.035em', margin: 0, color: 'var(--ink)' }}>
            Boston Marathon — the year I gave up on time and <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink-mute)' }}>won everything else.</span>
          </h1>

          <hr className="chrome-rule" style={{ margin: '36px 0' }} />

          <p style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 22, lineHeight: 1.55, color: 'var(--ink)', margin: '0 0 28px' }}>
            Both qualifying for and running Boston was something I never thought I'd be able to do. A self‑imposed limit — and then, somehow, the year arrived.
          </p>

          <p style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            Three weeks before the race, I tore my peroneal longus on a 49‑mile leg of The Speed Project. I couldn't walk without pain. I went to Boston anyway, because the next chance wouldn't come until 2025, and I'd already waited two years.
          </p>

          <figure style={{ margin: '40px 0' }}>
            <div style={{ width: '100%', height: 380, overflow: 'hidden', background: 'var(--paper-deep)' }}>
              <img src="assets/rain-smile.png" className="paper-img" alt="Smiling in the rain at Boston" />
            </div>
            <figcaption className="meta-mono" style={{ marginTop: 10 }}>Mile 24 · Photo by @kgunaa</figcaption>
          </figure>

          <blockquote style={{ margin: '40px 0', paddingLeft: 24, borderLeft: '2px solid var(--hanko)' }}>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 30, lineHeight: 1.25, color: 'var(--ink)', margin: 0, letterSpacing: '-0.005em' }}>
              I smiled with every single step.
            </p>
          </blockquote>

          <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 26, letterSpacing: '-0.02em', margin: '36px 0 12px', color: 'var(--ink)' }}>Figuring it out</h2>
          <p style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            Around mile one, every negative feeling from the past few weeks dissipated. I could've quit at mile one and still been ecstatic that I got to be out there. The crowds, the course, the energy — all electric.
          </p>
          <p style={{ fontFamily: 'var(--serif)', fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
            Between miles two and three, a guy running next to me said his only goal was to amp up the crowd. He'd already done all six majors. I thought: <em>duh, that's exactly what I should do too — my time is shot anyway.</em>
          </p>
        </div>

        {/* RIGHT GUTTER — margin notes */}
        <aside style={{ paddingTop: 6, fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-mute)', lineHeight: 1.55, letterSpacing: '0.01em' }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ color: 'var(--hanko)' }}>§01</div>
            <div style={{ marginTop: 4 }}>Got the BQ at Ventura in Feb '22 — 2:56. Waited 14 months to actually run this one.</div>
          </div>
          <div style={{ marginBottom: 28 }}>
            <div style={{ color: 'var(--hanko)' }}>§02</div>
            <div style={{ marginTop: 4 }}>Diagnosed mid‑training. Surgery happened the month after this race.</div>
          </div>
          <div style={{ marginBottom: 28 }}>
            <div style={{ color: 'var(--hanko)' }}>§03</div>
            <div style={{ marginTop: 4 }}>Forgot my watch at the hotel. Ran the whole thing on feel. Best decision of the day.</div>
          </div>
          <hr className="chrome-rule" style={{ margin: '24px 0' }} />
          <div className="meta-mono" style={{ marginBottom: 8 }}>Strava</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
            26.2 mi · 3:24:11<br/>
            avg 7:48/mi · 168 bpm<br/>
            elevation 850 ft
          </div>
        </aside>
      </article>

      <Footer />
    </div>
  );
}

// Locked design exports
Object.assign(window, { VariantAlt, PostPageV2, SkullMark });
