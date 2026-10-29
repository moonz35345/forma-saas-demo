import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  CircleCheck,
  Command,
  Heart,
  Menu,
  Minus,
  Plus,
  Sparkles,
  X,
} from 'lucide-react'
import { Brand } from './components/Brand'
import { Dialog } from './components/Dialog'
import { ProductPreview } from './components/ProductPreview'
import { ThemeToggle } from './components/ThemeToggle'
import { faqs, features, plans, smallFeatures } from './data/content'

type Modal = { type: 'signup'; plan: string } | { type: 'contact' | 'privacy' | 'terms' } | null

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [yearly, setYearly] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [modal, setModal] = useState<Modal>(null)
  const [submitted, setSubmitted] = useState(false)
  const [contactSent, setContactSent] = useState(false)

  useEffect(() => {
    function closeMenu(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeMenu)
    return () => window.removeEventListener('keydown', closeMenu)
  }, [])
  function openModal(next: Modal) {
    setSubmitted(false)
    setModal(next)
    setMenuOpen(false)
  }
  function submitDemo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }
  function scrollToDemo() {
    document.getElementById('product-demo')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
      block: 'center',
    })
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" className="announcement">
        <span className="announcement-new">MEET FORMA</span>A little more clarity. A lot more
        possibility.
        <a href="#product">
          Take a look <ArrowUpRight size={13} />
        </a>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#product">Product</a>
            <a href="#features">Why Forma?</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQs</a>
          </nav>
          <div className="nav-actions">
            <button className="nav-contact" onClick={() => openModal({ type: 'contact' })}>
              Let’s talk <ArrowUpRight size={14} />
            </button>
            <button
              className="button button-dark button-small"
              onClick={() => openModal({ type: 'signup', plan: 'Free' })}
            >
              Get started <ArrowRight size={15} />
            </button>
          </div>
          <div className="appearance-controls">
            <ThemeToggle />
            <button
              className="mobile-menu-toggle icon-button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
            {[
              ['Product', '#product'],
              ['Why Forma?', '#features'],
              ['Pricing', '#pricing'],
              ['FAQs', '#faq'],
            ].map(([name, url]) => (
              <a href={url} key={url} onClick={() => setMenuOpen(false)}>
                {name}
                <ArrowUpRight size={17} />
              </a>
            ))}
            <button onClick={() => openModal({ type: 'contact' })}>
              Let’s talk <ArrowUpRight size={17} />
            </button>
            <button
              className="button button-primary"
              onClick={() => openModal({ type: 'signup', plan: 'Free' })}
            >
              Get started <ArrowRight size={16} />
            </button>
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-pill">
            <span /> A calmer way to work together <ArrowUpRight size={12} />
          </div>
          <div className="hero-heading-wrap">
            <span className="handwritten hero-doodle">
              a little less chaos
              <svg viewBox="0 0 100 64" aria-hidden="true">
                <path d="M2 4Q75 3 82 47M65 39l18 13 12-19" />
              </svg>
            </span>
            <h1 id="hero-title">
              Less busywork.
              <br />
              More <span className="serif-word">good</span> work
              <span className="accent-period">.</span>
            </h1>
            <span className="hero-spark" aria-hidden="true">
              ✳
            </span>
          </div>
          <p className="hero-description">
            Your projects, people, and big ideas. Finally in one place.
            <br className="desktop-break" /> Meet the thoughtfully simple workspace for teams that
            create.
          </p>
          <div className="hero-actions">
            <button
              className="button button-primary"
              onClick={() => openModal({ type: 'signup', plan: 'Team' })}
            >
              Find your flow — it’s free <ArrowUpRight size={17} />
            </button>
            <button className="button button-quiet" onClick={scrollToDemo}>
              <span className="play-icon">▶</span> See Forma in action
            </button>
          </div>
          <div className="hero-fineprint">
            <span>
              <Check size={12} /> No credit card
            </span>
            <span>
              <Check size={12} /> No complicated setup
            </span>
            <span>
              <Check size={12} /> Just good work
            </span>
          </div>
          <div className="product-stage" id="product">
            <div className="stage-note handwritten">
              your work, a little lighter
              <svg viewBox="0 0 90 55" aria-hidden="true">
                <path d="M4 2q2 40 70 35m-9-11 14 11-16 10" />
              </svg>
            </div>
            <ProductPreview />
            <div className="floating-done">
              <span className="done-symbol">
                <CheckCheck size={19} />
              </span>
              <div>
                Big ideas. Small steps.<small>Look at you, making progress.</small>
              </div>
              <span className="done-confetti" aria-hidden="true">
                ✦
              </span>
            </div>
          </div>
          <div className="demo-caption">
            <span className="live-dot" /> A real-feeling workspace. A fully fictional product.
            <span className="caption-separator">/</span>
            <span>Go ahead, give it a click.</span>
          </div>
        </section>

        <section className="manifesto container" aria-label="Our approach">
          <span className="eyebrow">FOR THE WAY GOOD WORK HAPPENS</span>
          <h2>
            Big ideas need a little breathing room.
            <br />
            <span>Not another dozen open tabs.</span>
          </h2>
          <div className="work-types">
            <span>
              <Command size={17} /> Creative studios
            </span>
            <span>
              <LayersIcon /> Small, mighty teams
            </span>
            <span>
              <Sparkles size={17} /> People with big ideas
            </span>
            <span>
              <Heart size={17} /> Teams that care
            </span>
          </div>
        </section>

        <section className="features-section section-pad" id="features">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">LESS FRICTION. MORE FORWARD.</span>
                <h2>
                  Everything you need.
                  <br />
                  <span className="serif-word">Room</span> for what matters.
                </h2>
              </div>
              <p>
                Good work doesn’t need more complexity.
                <br />
                Just the right things, thoughtfully connected.
              </p>
            </div>
            <div className="feature-grid">
              {features.map(({ icon: Icon, name, text, label }, i) => (
                <article className="feature-card" key={name}>
                  <div className={`feature-visual visual-${i}`} aria-hidden="true">
                    {i === 0 ? (
                      <div className="mini-stack">
                        <div className="mini-stack-back" />
                        <div className="mini-project">
                          <span className="mini-icon">
                            <Icon size={19} />
                          </span>
                          <span>
                            Something great
                            <br />
                            <b>is taking shape.</b>
                          </span>
                          <div className="mini-progress">
                            <i />
                          </div>
                          <small>
                            6 of 8 tasks complete <span>↗</span>
                          </small>
                        </div>
                        <span className="floating-mini-check">
                          <Check size={16} />
                        </span>
                      </div>
                    ) : i === 1 ? (
                      <div className="mini-conversation">
                        <div>
                          <span className="avatar peach">AM</span>
                          <p>
                            <strong>
                              Alex Morgan <small>Just now</small>
                            </strong>
                            This is the one. Let’s make it happen.<span>✨ 2</span>
                          </p>
                        </div>
                        <div className="conversation-reply">
                          <span className="avatar lavender">JL</span>
                          <p>
                            On it. A little magic, coming up.
                            <Heart size={12} />
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mini-insights">
                        <div>
                          <span>A little momentum</span>
                          <ArrowUpRight size={15} />
                        </div>
                        <strong>Look how far you’ve come.</strong>
                        <div className="bar-chart">
                          {[32, 46, 38, 63, 54, 79, 93].map((h, j) => (
                            <i key={j} style={{ height: `${h}%` }} />
                          ))}
                        </div>
                        <small>A good week, taking shape.</small>
                      </div>
                    )}
                  </div>
                  <span className="feature-label">{label}</span>
                  <h3>{name}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="small-features">
              {smallFeatures.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={21} strokeWidth={1.5} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="how-section container section-pad">
          <div className="how-intro">
            <span className="eyebrow">FROM “WHERE IS THAT?” TO “WE’VE GOT THIS.”</span>
            <h2>
              Find your rhythm.
              <br />
              Make your <span className="serif-word">mark.</span>
            </h2>
            <p>
              Less managing your tools.
              <br />
              More making things you’re proud of.
            </p>
            <button className="text-link" onClick={scrollToDemo}>
              Take the workspace for a spin <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="how-steps">
            {[
              {
                n: '01',
                title: 'Make a little space.',
                text: 'Give your next project a home. Bring your ideas, your people, and your beautifully messy first drafts.',
              },
              {
                n: '02',
                title: 'Get everyone in the picture.',
                text: 'Turn “who’s doing what?” into a clear next step. Keep the context and the conversation together.',
              },
              {
                n: '03',
                title: 'Let good work happen.',
                text: 'Move things forward, one small win at a time. There’s a little more room to enjoy the process.',
              },
            ].map((item) => (
              <article key={item.n}>
                <span>{item.n}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pricing-section section-pad" id="pricing">
          <div className="container">
            <div className="center-heading">
              <span className="eyebrow">A LITTLE INVESTMENT. A LOT OF POSSIBILITY.</span>
              <h2>
                Good work. <span className="serif-word">Fair price.</span>
              </h2>
              <p>Start small. Make something great. Grow when you’re ready.</p>
            </div>
            <div className="pricing-toggle-wrap">
              <div className="pricing-toggle" role="group" aria-label="Billing interval">
                <button
                  onClick={() => setYearly(false)}
                  aria-pressed={!yearly}
                  className={!yearly ? 'active' : ''}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setYearly(true)}
                  aria-pressed={yearly}
                  className={yearly ? 'active' : ''}
                >
                  Yearly <span>Save up to 25%</span>
                </button>
              </div>
            </div>
            <div className="pricing-grid">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`pricing-card ${plan.popular ? 'pricing-popular' : ''}`}
                >
                  {plan.popular && (
                    <div className="popular-banner">
                      <Sparkles size={13} /> A LITTLE TEAM FAVORITE
                    </div>
                  )}
                  <div className="plan-top">
                    <h3>{plan.name}</h3>
                    <p>{plan.note}</p>
                  </div>
                  <div className="plan-price">
                    <span>$</span>
                    {yearly ? plan.yearly : plan.monthly}
                    <span>/ person / month</span>
                  </div>
                  <p className="billing-description">
                    {plan.monthly === 0
                      ? 'Free to explore. No payment needed.'
                      : yearly
                        ? `$${plan.yearly * 12} per person, billed yearly.`
                        : 'Billed monthly. Room to change.'}
                  </p>
                  <button
                    className={`button ${plan.popular ? 'button-primary' : 'button-outline'}`}
                    onClick={() => openModal({ type: 'signup', plan: plan.name })}
                  >
                    {plan.cta}
                    <ArrowUpRight size={16} />
                  </button>
                  <div className="plan-rule" />
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={15} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="pricing-note">
              <span className="live-dot" /> Illustrative pricing for a fictional product. No
              payments or subscriptions.
            </p>
          </div>
        </section>

        <section className="faq-section container section-pad" id="faq">
          <div className="faq-intro">
            <span className="eyebrow">A LITTLE MORE CLARITY</span>
            <h2>
              Good questions.
              <br />
              Straight <span className="serif-word">answers.</span>
            </h2>
            <p>Something else on your mind?</p>
            <a className="text-link" href="#contact">
              Let’s talk it through <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="faq-list">
            {faqs.map(({ q, a }, i) => (
              <article className={openFaq === i ? 'faq-open' : ''} key={q}>
                <h3>
                  <button
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {q}
                    {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  hidden={openFaq !== i}
                >
                  <p>{a}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section container" id="contact">
          <div className="contact-copy">
            <span className="eyebrow">BIG IDEAS WELCOME HERE</span>
            <h2>
              Have something
              <br />
              <span className="serif-word">in mind?</span>
            </h2>
            <p>Let’s imagine what a little more clarity could look like for your team.</p>
            <span className="contact-demo-label">
              <CircleCheck size={15} /> Demo form · No messages are sent
            </span>
          </div>
          <div className="contact-form-wrap">
            {contactSent ? (
              <div className="success-panel" role="status">
                <span className="success-icon">
                  <Check size={24} />
                </span>
                <h3>Consider the conversation started.</h3>
                <p>
                  That was a demo submission. No message was sent, and your details haven’t been
                  stored.
                </p>
                <button className="text-link" onClick={() => setContactSent(false)}>
                  Try the form again <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form
                className="form-stack"
                onSubmit={(e) => {
                  e.preventDefault()
                  setContactSent(true)
                }}
              >
                <div className="form-row">
                  <label>
                    Your name
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      maxLength={80}
                      placeholder="Alex Morgan"
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={150}
                      placeholder="alex@example.com"
                    />
                  </label>
                </div>
                <label>
                  What are you working on?
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={1500}
                    rows={3}
                    placeholder="A big idea, a small question, or something in between…"
                  />
                </label>
                <button className="button button-dark" type="submit">
                  Send a demo message <ArrowUpRight size={17} />
                </button>
                <small className="form-note">
                  Use sample details. This form simulates a submission in your browser.
                </small>
              </form>
            )}
          </div>
        </section>

        <section className="closing-section">
          <div className="container closing-inner">
            <div>
              <span className="eyebrow">A LITTLE LESS CHAOS STARTS HERE.</span>
              <h2>
                Make room for
                <br />
                <span className="serif-word">your next good thing.</span>
                <span className="closing-asterisk" aria-hidden="true">
                  ✳
                </span>
              </h2>
            </div>
            <div>
              <button
                className="button button-primary"
                onClick={() => openModal({ type: 'signup', plan: 'Team' })}
              >
                Find your flow — it’s free <ArrowUpRight size={17} />
              </button>
              <p>No credit card. Just a little possibility.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand light />
              <p>
                Thoughtfully simple.
                <br />
                Simply better together.
              </p>
            </div>
            <div className="footer-links">
              <div>
                <span>EXPLORE</span>
                <a href="#product">The product</a>
                <a href="#features">Why Forma?</a>
                <a href="#pricing">Our plans</a>
              </div>
              <div>
                <span>A LITTLE HELP</span>
                <a href="#faq">FAQs</a>
                <a href="#contact">Get in touch</a>
                <button onClick={scrollToDemo}>
                  Try the demo <ArrowUpRight size={12} />
                </button>
              </div>
              <div className="footer-note">
                <span>MADE WITH INTENTION</span>
                <p>
                  An original SaaS concept.
                  <br />A web development portfolio demo.
                  <br />
                  No real endorsements. Just possibilities.
                </p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Forma. A fictional brand, thoughtfully made.</span>
            <div>
              <button onClick={() => openModal({ type: 'privacy' })}>Privacy</button>
              <button onClick={() => openModal({ type: 'terms' })}>Demo terms</button>
              <a href="#top">
                Back to top <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </footer>
      {modal && (
        <Dialog
          title={
            submitted
              ? 'A little possibility, unlocked.'
              : modal.type === 'signup'
                ? `Make room with Forma ${modal.plan}.`
                : modal.type === 'contact'
                  ? 'Good things start with hello.'
                  : modal.type === 'privacy'
                    ? 'Your privacy, simply put.'
                    : 'A note about this demo.'
          }
          onClose={() => setModal(null)}
        >
          {modal.type === 'privacy' ? (
            <div className="legal-copy">
              <p>
                This portfolio demo has no backend, analytics, tracking cookies, or account system.
                Form entries are processed only in your browser and are not sent or saved by this
                application.
              </p>
              <p>
                Sample tasks and changes live in memory and reset when the page reloads. If this
                project is deployed, the hosting provider may process standard server logs under its
                own privacy policy.
              </p>
              <p>Use fictional details when exploring the demo.</p>
              <p>
                Your light or dark appearance preference is saved only in your browser’s local
                storage.
              </p>
            </div>
          ) : modal.type === 'terms' ? (
            <div className="legal-copy">
              <p>
                Forma is a fictional brand created to demonstrate website design and development.
                All workspace content, plans, team members, and prices are illustrative.
              </p>
              <p>
                No purchase, free trial, account, subscription, or business relationship is created.
                Product capabilities described on this page are part of the concept. The interactive
                preview runs locally in your browser.
              </p>
            </div>
          ) : submitted ? (
            <div className="success-panel" role="status">
              <span className="success-icon">
                <Check size={24} />
              </span>
              <p>
                {modal.type === 'signup'
                  ? `You’ve explored the Forma ${modal.plan} signup.`
                  : 'You’ve tried the contact experience.'}{' '}
                This was a simulated submission. No details were sent or stored, and no account was
                created.
              </p>
              <button
                className="button button-primary"
                onClick={() => {
                  setModal(null)
                  scrollToDemo()
                }}
              >
                Explore the workspace <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <p className="modal-description">
                {modal.type === 'signup'
                  ? 'A calmer way to work is a few clicks away. Try the signup experience with sample details.'
                  : 'Tell us what’s on your mind. Use sample details to try this contact experience.'}
              </p>
              <div className="demo-form-banner">
                <CircleCheck size={15} /> Portfolio demo · Simulated submission only
              </div>
              <form className="form-stack" onSubmit={submitDemo}>
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={80}
                    placeholder="Alex Morgan"
                    autoFocus
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={150}
                    placeholder="alex@example.com"
                  />
                </label>
                {modal.type === 'contact' && (
                  <label>
                    Your message
                    <textarea
                      name="message"
                      required
                      minLength={10}
                      maxLength={1500}
                      rows={3}
                      placeholder="Tell us a little about your idea…"
                    />
                  </label>
                )}
                <button className="button button-primary" type="submit">
                  {modal.type === 'signup' ? 'Try the demo signup' : 'Send a demo message'}
                  <ArrowUpRight size={17} />
                </button>
                <small className="form-note">
                  No data is sent or stored. No account or subscription is created.
                </small>
              </form>
            </>
          )}
        </Dialog>
      )}
    </>
  )
}

function LayersIcon() {
  return (
    <span className="layers-icon" aria-hidden="true">
      <ChevronDown size={19} />
      <ChevronDown size={19} />
    </span>
  )
}
export default App
