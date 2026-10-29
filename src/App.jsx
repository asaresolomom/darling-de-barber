
import { useEffect, useState } from 'react';
import './App.css';
import LocationSection from './LocationSection';
import BusinessExtras from './BusinessExtras';
import originalHaircutFiles from './haircuts-manifest.json';

const originalHaircuts = originalHaircutFiles.map((filename, index) => ({
  id: index + 1,
  name: `Style ${String(index + 1).padStart(3, '0')}`,
  image: `/haircuts/${encodeURIComponent(filename)}`,
  filename,
}));

const photo = (file) =>
  `https://crossroadclippers.com/assets/images/${file}`;

const haircuts = [
  { name: 'Low Fade', price: 50, category: 'Fades', image: photo('newimage3.jpeg'), description: 'A clean low fade with a sharp finish.' },
  { name: 'Mid Fade & Beard', price: 60, category: 'Fades', image: photo('newimage4.jpeg'), description: 'A balanced fade with a defined beard.' },
  { name: 'High Skin Fade', price: 70, category: 'Fades', image: photo('crossroad1.jpeg'), description: 'A bold skin fade with a crisp outline.' },
  { name: 'Taper Fade', price: 60, category: 'Fades', image: photo('crossroad2.jpeg'), description: 'A neat taper around the temples and neckline.' },
  { name: 'Afro Shape-up', price: 50, category: 'Afro & Natural', image: photo('newimage2.jpeg'), description: 'Natural texture shaped with a clean outline.' },
  { name: 'Natural Textured Cut', price: 60, category: 'Afro & Natural', image: photo('newimage1.jpeg'), description: 'A textured natural cut with a tidy finish.' },
  { name: 'Short Buzz Cut', price: 40, category: 'Classic Cuts', image: photo('newimage3.jpeg'), description: 'A simple, low-maintenance short cut.' },
  { name: 'Classic Executive Cut', price: 60, category: 'Classic Cuts', image: photo('newimage4%20%282%29.jpeg'), description: 'A polished everyday gentleman’s cut.' },
  { name: 'Burst Fade / Mohawk', price: 70, category: 'Trendy Cuts', image: photo('newimage2.jpeg'), description: 'A bold textured style.' },
  { name: 'Braids & Beard Style', price: 90, category: 'Locs & Braids', image: photo('newimage.jpeg'), description: 'Braided styling with a groomed beard.' },
  { name: 'Haircut & Beard', price: 90, category: 'Beard & Grooming', image: photo('newimage5.jpeg'), description: 'A full haircut and beard refresh.' },
  { name: 'Beard Trim & Line-up', price: 35, category: 'Beard & Grooming', image: photo('crossroad1.jpeg'), description: 'Detailed beard shaping and sharp edges.' },
  {
    name: 'Classic Buzz Cut & Beard',
    price: 45,
    category: 'Our Real Work',
    image: '/haircuts/ob.jpeg',
    description: 'A clean short haircut with a shaped full beard.',
  },
  {
    name: 'Ladies Natural Taper Cut',
    price: 50,
    category: 'Our Real Work',
    image: '/haircuts/ty.jpeg',
    description: 'A beautiful natural short haircut with a clean hairline.',
  },
  {
    name: 'Burgundy Textured Cut & Design',
    price: 70,
    category: 'Our Real Work',
    image: '/haircuts/bv.jpeg',
    description: 'A burgundy textured haircut with a stylish side design.',
  },
];

const categories = [
  'All Styles',
  'Our Real Work',
  'Fades',
  'Afro & Natural',
  'Classic Cuts',
  'Trendy Cuts',
  'Locs & Braids',
  'Beard & Grooming',
];

const WHATSAPP_NUMBER = '233532107834';

function OriginalHaircutGallery() {
  const [activePhoto, setActivePhoto] = useState(null);

  function requestStyle(style) {
    const message = [
      'Hello DARLING DE BARBER!',
      '',
      'I saw a hairstyle in your original work gallery.',
      '',
      `Selected hairstyle: ${style.name}`,
      `Photo reference: ${style.filename}`,
      '',
      'Please confirm the price and availability for this style.',
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  useEffect(() => {
    if (!activePhoto) return;

    function closeOnEscape(event) {
      if (event.key === 'Escape') setActivePhoto(null);
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activePhoto]);

  return (
    <section className="original-gallery section" id="original-work">
      <div className="section-heading">
        <p className="eyebrow">✦ AUTHENTIC DARLING DE BARBER HAIRSTYLES</p>
        <h2>OUR <em>REAL WORK.</em></h2>
        <p>
          Explore our original haircut collection. Choose your favourite
          style and send its reference number directly to our barber.
        </p>
      </div>

      <div className="gallery-count">
        {originalHaircuts.length} ORIGINAL STYLES
      </div>

      {originalHaircuts.length === 0 ? (
        <p className="gallery-empty">
          No photos found. Add your images to public/haircuts.
        </p>
      ) : (
        <div className="original-gallery-grid">
          {originalHaircuts.map((style) => (
            <article className="original-gallery-card" key={style.filename}>
              <div className="original-gallery-image">
                <img
                  src={style.image}
                  alt={`${style.name} haircut by Darling De Barber`}
                  loading="lazy"
                />
                <span className="original-gallery-number">{style.name}</span>
              </div>

              <div className="original-gallery-info">
                <h3>{style.name}</h3>
                <p>Original Darling De Barber hairstyle</p>

                <div className="original-gallery-actions">
                  <button
                    type="button"
                    className="gallery-view-button"
                    onClick={() => setActivePhoto(style)}
                  >
                    VIEW PHOTO
                  </button>
                  <button
                    type="button"
                    className="gallery-book-button"
                    onClick={() => requestStyle(style)}
                  >
                    REQUEST STYLE ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {activePhoto && (
        <div
          className="gallery-modal"
          role="presentation"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="gallery-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-modal-close"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo"
            >
              ✕
            </button>

            <img src={activePhoto.image} alt={activePhoto.name} />

            <div className="gallery-modal-bottom">
              <h3>{activePhoto.name}</h3>
              <button
                type="button"
                className="gallery-book-button"
                onClick={() => requestStyle(activePhoto)}
              >
                REQUEST THIS STYLE ↗
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('All Styles');
  const [selectedStyle, setSelectedStyle] = useState('Low Fade');

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('darling-barber-theme') === 'light'
        ? 'light'
        : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [customerLocation, setCustomerLocation] = useState({
    location: '',
    mapsLink: '',
  });

  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: 'Low Fade',
    date: '',
    time: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('darling-barber-theme', theme);
    } catch {
      // The website still works if local storage is unavailable.
    }
  }, [theme]);

  const selectedCut =
    haircuts.find((cut) => cut.name === form.service) || haircuts[0];

  const visibleCuts =
    category === 'All Styles'
      ? haircuts
      : haircuts.filter((cut) => cut.category === category);

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  function updateForm(event) {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function chooseCut(cut) {
    setSelectedStyle(cut.name);
    setForm((previous) => ({ ...previous, service: cut.name }));

    document.getElementById('booking')?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  function submitBooking(event) {
    event.preventDefault();

    const message = [
      'Hello DARLING DE BARBER!',
      '',
      'I would like to request an appointment.',
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Preferred haircut: ${form.service}`,
      `Estimated price: GH₵${selectedCut.price}`,
      `Preferred date: ${form.date}`,
      `Preferred time: ${form.time.trim()}`,
      '',
      'CUSTOMER LOCATION',
      `Area or address: ${customerLocation.location || 'Not provided'}`,
      `Google Maps link: ${customerLocation.mapsLink || 'Not provided'}`,
      '',
      'Please confirm availability for my appointment.',
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className={`site theme-${theme}`}>
      <div className="topbar animate-on-load">
        PREMIUM GROOMING · CONFIDENCE IN EVERY CUT
      </div>

      <header className="header">
        <a className="brand" href="#home">
          <span className="brand-mark">D</span>
          <span>DARLING DE <b>BARBER</b></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav
          className={menuOpen ? 'nav nav-open' : 'nav'}
          onClick={() => setMenuOpen(false)}
        >
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#haircuts">Haircut Styles</a>
          <a href="#original-work">Our Real Work</a>
          <a href="#location">Location</a>
          <a href="#opening-hours">Opening Hours</a>
          <a href="#booking">Booking</a>
          <a className="nav-cta" href="#haircuts">Choose Your Cut ↗</a>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode'}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-shade" />

          <div className="hero-content">
            <p className="eyebrow animate-on-load delay-1">
              ✦ THE ART OF LOOKING SHARP
            </p>

            <h1 className="animate-on-load delay-2">
              YOUR STYLE.
              <br />
              <em>YOUR STATEMENT.</em>
            </h1>

            <p className="hero-description animate-on-load delay-3">
              Discover your next haircut. From clean fades and sharp
              Ghanaian-style line-ups to classic cuts, find a look that
              fits your confidence.
            </p>

            <div className="hero-actions animate-on-load delay-4">
              <a href="#haircuts" className="button button-gold">
                FIND YOUR HAIRCUT ↗
              </a>
              <a href="#about" className="button button-outline">
                ABOUT THE SHOP
              </a>
            </div>

            <div className="hero-note animate-on-load delay-5">
              ✦ PRECISION CUTS. PREMIUM SERVICE. YOUR BEST LOOK.
            </div>
          </div>

          <div className="hero-caption animate-on-load delay-5">
            DARLING DE BARBER — YOUR STYLE, PERFECTED
          </div>
        </section>

        <div className="trust-strip">
          <div>✦ PRECISION GROOMING</div>
          <div>✦ PROFESSIONAL BARBERS</div>
          <div>✦ FIND YOUR SIGNATURE STYLE</div>
        </div>

        <section className="about section" id="about">
          <div className="about-image">
            <img
              src={photo('crossroad2.jpeg')}
              alt="Barbershop haircut reference"
              loading="lazy"
            />
            <div className="image-label">
              <span>THE</span>
              <b>DETAIL</b>
              <span>MAKES THE DIFFERENCE.</span>
            </div>
          </div>

          <div className="about-copy">
            <p className="eyebrow">WELCOME TO DARLING DE BARBER</p>
            <h2>
              GOOD HAIR.
              <br />
              <em>GREAT PRESENCE.</em>
            </h2>

            <p>
              Your haircut says a lot about you. Explore popular styles,
              choose the look you love, and request an appointment with
              your preferred style already selected.
            </p>
            <p>
              From everyday clean cuts to bold fades and beard grooming,
              your next look starts here.
            </p>

            <a className="text-link" href="#haircuts">
              EXPLORE THE HAIRCUT COLLECTION →
            </a>
          </div>
        </section>

        <section className="haircuts-section section" id="haircuts">
          <div className="section-heading">
            <p className="eyebrow">YOUR LOOK. YOUR CHOICE.</p>
            <h2>CHOOSE YOUR <em>HAIRCUT</em></h2>
            <p>
              Browse the photos, read the style names, and select your
              favourite to start your appointment request.
            </p>
          </div>

          <div className="haircut-filters" aria-label="Filter haircut styles">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? 'haircut-filter active' : 'haircut-filter'}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="haircut-grid">
            {visibleCuts.map((cut) => (
              <article
                className={selectedStyle === cut.name ? 'haircut-card selected' : 'haircut-card'}
                key={cut.name}
              >
                <div className="haircut-photo">
                  <img
                    src={cut.image}
                    alt={`${cut.name} haircut reference`}
                    loading="lazy"
                    onError={(event) => {
                      if (!event.currentTarget.dataset.fallback) {
                        event.currentTarget.dataset.fallback = 'true';
                        event.currentTarget.src = photo('newimage3.jpeg');
                      }
                    }}
                  />
                  <span className="haircut-category">{cut.category}</span>
                </div>

                <div className="haircut-info">
                  <h3>{cut.name}</h3>
                  <p>{cut.description}</p>

                  <div className="haircut-bottom">
                    <span className="haircut-price">GH₵{cut.price}</span>
                    <button
                      type="button"
                      className="book-style-button"
                      onClick={() => chooseCut(cut)}
                    >
                      {selectedStyle === cut.name ? 'SELECTED ✓' : 'BOOK THIS STYLE ↗'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="price-note">
            Prices are examples and should be confirmed by the shop owner.
            Make sure you have permission to use any third-party haircut photos.
          </p>
        </section>

        <OriginalHaircutGallery />

        <LocationSection onLocationChange={setCustomerLocation} />

        <BusinessExtras />

        <section className="booking section" id="booking">
          <div className="booking-copy">
            <p className="eyebrow">YOUR NEXT LOOK STARTS HERE</p>
            <h2>
              READY FOR A
              <br />
              <em>FRESH CUT?</em>
            </h2>
            <p>
              Your chosen haircut appears in the form. Enter your preferred
              date and time to prepare a WhatsApp appointment request.
            </p>

            <div className="selected-cut-summary">
              <span>YOUR CHOSEN STYLE</span>
              <h3>{selectedCut.name}</h3>
              <strong>GH₵{selectedCut.price}</strong>
            </div>
          </div>

          <form className="booking-form" onSubmit={submitBooking}>
            <h3>REQUEST AN APPOINTMENT</h3>
            <p className="form-intro">
              Complete your details to continue to WhatsApp.
              The barber must confirm your appointment.
            </p>

            <label>
              Your full name
              <input
                name="name"
                value={form.name}
                onChange={updateForm}
                placeholder="Enter your name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              Phone number
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={updateForm}
                placeholder="e.g. 024 000 0000"
                autoComplete="tel"
                required
              />
            </label>

            <label>
              Your preferred haircut
              <select
                name="service"
                value={form.service}
                onChange={(event) => {
                  updateForm(event);
                  setSelectedStyle(event.target.value);
                }}
              >
                {haircuts.map((cut) => (
                  <option key={cut.name} value={cut.name}>
                    {cut.name} — GH₵{cut.price}
                  </option>
                ))}
              </select>
            </label>

            <div className="chosen-price">
              Estimated price: <strong>GH₵{selectedCut.price}</strong>
            </div>

            <div className="form-row">
              <label>
                Preferred date
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={updateForm}
                  min={minDate}
                  required
                />
              </label>

              <label>
                Preferred time
                <input
                  type="text"
                  name="time"
                  value={form.time}
                  onChange={updateForm}
                  placeholder="e.g. 2:30 PM"
                  autoComplete="off"
                  required
                />
              </label>
            </div>

            <p className="form-intro">
              Please include AM or PM in your preferred time.
            </p>

            <p className="form-intro">
              Location selected above: {customerLocation.location || 'Not provided'}
            </p>

            <button type="submit" className="button button-gold submit-button">
              CONTINUE TO WHATSAPP ↗
            </button>

            <p className="form-disclaimer">
              This is a booking request, not a confirmed appointment.
            </p>
          </form>
        </section>

        <section className="closing">
          <p className="eyebrow">YOUR CHAIR IS WAITING</p>
          <h2>STAY SHARP. <em>STAY DARLING.</em></h2>
          <a href="#haircuts" className="button button-gold">
            FIND YOUR NEXT CUT ↗
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-mark">D</span>
          <span>DARLING DE <b>BARBER</b></span>
        </a>

        <p>Crafted for confidence. Built around your style.</p>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DARLING DE BARBER</span>
          <span>LOOK SHARP. FEEL CONFIDENT.</span>
        </div>
      </footer>
    </div>
  );
}
