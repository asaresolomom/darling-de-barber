
import { useEffect, useState } from 'react';
import './App.css';
import LocationSection from './LocationSection';
import BusinessExtras from './BusinessExtras';

const WHATSAPP_NUMBER = '233532107834';

const haircuts = [
  {
    name: 'Low Fade',
    category: 'Fades',
    image: '/haircuts/Low fade with sculpted Beard.jpeg',
    description: 'A clean low fade with a sharp, professional finish.',
  },
  {
    name: 'Mid Fade & Beard',
    category: 'Fades',
    image: '/haircuts/Classic low fade with full beard.jpeg',
    description: 'A balanced fade paired with a neatly defined beard.',
  },
  {
    name: 'High Skin Fade',
    category: 'Fades',
    image: '/haircuts/Low skin fade with crisp shape-up.jpeg',
    description: 'A bold skin fade with a crisp outline.',
  },
  {
    name: 'Taper Fade',
    category: 'Fades',
    image: '/haircuts/Low Taper.jpeg',
    description: 'A neat taper around the temples and neckline.',
  },
  {
    name: 'Afro Shape-up',
    category: 'Afro & Natural',
    image: '/haircuts/low textured Afro with Rounded edge.jpeg',
    description: 'Natural texture shaped with a clean hairline.',
  },
  {
    name: 'Natural Textured Cut',
    category: 'Afro & Natural',
    image: '/haircuts/Textured curls with low taper fade.jpeg',
    description: 'A textured natural cut with a tidy finish.',
  },
  {
    name: 'Blonde dyed Buzz Cut',
    category: 'Classic Cuts',
    image: '/haircuts/Blonde dyed buzz cut.jpeg',
    description: 'A simple, low-maintenance haircut with a clean finish.',
  },
  {
    name: 'Classic Executive Cut',
    category: 'Classic Cuts',
    image: '/haircuts/Classic low fade with full beard.jpeg',
    description: 'A polished everyday cut for the modern gentleman.',
  },
  {
    name: 'Burst Fade / Mohawk',
    category: 'Trendy Cuts',
    image: '/haircuts/Freeform loc Mohawk with Fade.jpeg',
    description: 'A stylish, bold cut with a modern shape.',
  },
  {
    name: 'Braids & Beard Style',
    category: 'Locs & Braids',
    image: '/haircuts/Neat cornrow braids with taper fade.jpeg',
    description: 'A distinctive style finished with careful grooming.',
  },
  {
    name: 'Haircut & Beard',
    category: 'Beard & Grooming',
    image: '/haircuts/Low fade with sculpted Beard.jpeg',
    description: 'A complete haircut and beard refresh.',
  },
  {
    name: 'Beard Trim & Line-up',
    category: 'Beard & Grooming',
    image: '/haircuts/Low skin fade with crisp shape-up.jpeg',
    description: 'Detailed beard shaping with clean, sharp edges.',
  },

  {
    name: 'Dread Locs with Mid Fade',
    category: 'Locs & Braids',
    image: '/haircuts/Dread Locs with mid fade.jpeg',
    description: 'A stylish dread locs look with a clean mid fade.',
  },

  {
    name: 'Low Taper Fade',
    category: 'Fades',
    image: '/haircuts/Low Taper.jpeg',
    description: 'A subtle taper fade for a refined appearance.',
  },
 {
  name:"vibrant blonde fade",
  category:"Fades",
image:"/haircuts/vibrant magenta textured crop with taper.jpeg",
  description:"A bold and stylish fade with vibrant blonde highlights."
 },

 {
  name:"Designer heart fade",
  category:"Fades",
  image:"/haircuts/designer heart Fade.jpeg",
  description:"low fade with nice heart design"
 },

  {
  name:"Low taper fade",
  category:"Fades",
  image:"/haircuts/low taper back view.jpeg",
  description:"low taper Back view",
 },

  {
  name:"Low taper fade",
  category:"Fades",
  image:"/haircuts/Short locks with mid Fade.jpeg",
  description:"short locks with mid fade",
 },
];


const categories = [
  'All Styles',
  'Fades',
  'Afro & Natural',
  'Classic Cuts',
  'Trendy Cuts',
  'Locs & Braids',
  'Beard & Grooming',
];

const openingHours = [
  { day: 'Monday', hours: '8:00 AM – 10:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 10:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 10:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 10:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 10:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 10:00 PM' },
  { day: 'Sunday', hours: 'Please contact us' },
];

function readSavedTheme() {
  try {
    return localStorage.getItem('darling-barber-theme') || 'dark';
  } catch {
    return 'dark';
  }
}

function makeWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(readSavedTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Styles');
  const [selectedCut, setSelectedCut] = useState('');
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);

    try {
      localStorage.setItem('darling-barber-theme', theme);
    } catch {
      // The website still works if browser storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const visibleHaircuts =
    activeCategory === 'All Styles'
      ? haircuts
      : haircuts.filter((cut) => cut.category === activeCategory);

  function updateBooking(event) {
    const { name, value } = event.target;

    setBooking((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function chooseHaircut(cutName) {
    setSelectedCut(cutName);
    setBooking((previous) => ({
      ...previous,
      service: cutName,
    }));

    document.getElementById('booking')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function submitBooking(event) {
    event.preventDefault();

    const message = [
      'Hello DARLING DE BARBER! I would like to book an appointment.',
      '',
      `Name: ${booking.name}`,
      `Phone: ${booking.phone}`,
      `Service: ${booking.service}`,
      `Preferred date: ${booking.date}`,
      `Preferred time: ${booking.time}`,
      `Additional details: ${booking.notes || 'None'}`,
      '',
      'Please confirm whether this appointment time is available.',
    ].join('\n');

    window.open(makeWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  }

  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  return (
    <div className={`barber-site theme-${theme}`}>
      <div className="topbar">
        <p>PREMIUM GROOMING · CONFIDENCE IN EVERY CUT</p>
      </div>

      <header className="site-header">
        <a
          href="#home"
          className="brand"
          aria-label="DARLING DE BARBER home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-name">DARLING DE BARBER</span>
          <span className="brand-subtitle">PRECISION · STYLE · CONFIDENCE</span>
        </a>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
          {[
            ['Home', '#home'],
            ['About', '#about'],
            ['Haircuts', '#haircuts'],
            ['Book Now', '#booking'],
            ['Location', '#location'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={label === 'Book Now' ? 'nav-book-button' : ''}
            >
              {label}
            </a>
          ))}

          <button
            type="button"
            className="theme-toggle"
            onClick={() =>
              setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
            }
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <p className="section-eyebrow">WELCOME TO DARLING DE BARBER</p>
            <h1>
              YOUR STYLE.
              <br />
              <span>YOUR STATEMENT.</span>
            </h1>
            <p className="hero-description">
              More than a haircut. Experience precision grooming, fresh fades,
              clean lines and a style that represents you.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#booking">
                Book Your Cut
              </a>
              <a className="secondary-button" href="#haircuts">
                Explore Haircuts
              </a>
            </div>

            <div className="hero-highlights">
              <span>✦ Precision Cuts</span>
              <span>✦ Fresh Fades</span>
              <span>✦ Personal Style</span>
            </div>
          </div>

          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="/haircuts/darlingboy.jpeg"
              alt="DARLING DE BARBER grooming and haircut showcase"
              fetchPriority="high"
            />
          </div>
        </section>

        <section className="about-section section-padding" id="about">
          <div className="about-image-wrap">
            <img
              src="/haircuts/Dread Locs with mid fade.jpeg"
              alt="Barbering style inspiration"
              loading="lazy"
            />
          </div>

          <div className="about-content">
            <p className="section-eyebrow">THE ART OF GROOMING</p>
            <h2>Look Sharp. Feel Confident.</h2>
            <p>
              At DARLING DE BARBER, every detail matters. From clean fades and
              natural cuts to precise beard shaping, our goal is to help you
              leave looking fresh and feeling confident.
            </p>
            <p>
              Choose the style that fits you, then send us your appointment
              request through WhatsApp.
            </p>
            <a href="#haircuts" className="text-link">
              Discover Our Styles →
            </a>
          </div>
        </section>

        <section className="haircuts-section section-padding" id="haircuts">
          <SectionHeading
            eyebrow="THE STYLE COLLECTION"
            title="Find Your Next Look"
            description="Explore our haircut styles and select the look you want to book."
          />

          <div className="category-filters" aria-label="Filter haircut styles">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? 'active' : ''}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="haircuts-grid">
            {visibleHaircuts.map((cut) => (
              <article className="haircut-card" key={cut.name}>
                <div className="haircut-image-wrap">
                  <img
                    src={cut.image}
                    alt={`${cut.name} haircut`}
                    loading="lazy"
                  />
                </div>

                <div className="haircut-card-content">
                  <p className="haircut-category">{cut.category}</p>
                  <h3>{cut.name}</h3>
                  <p>{cut.description}</p>

                  <button
                    type="button"
                    className="haircut-book-button"
                    onClick={() => chooseHaircut(cut.name)}
                  >
                    Book This Style →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="booking-section section-padding" id="booking">
          <div className="booking-intro">
            <p className="section-eyebrow">YOUR NEXT FRESH CUT</p>
            <h2>Book Your Appointment</h2>
            <p>
              Fill in your details and continue to WhatsApp to send your
              appointment request directly to DARLING DE BARBER.
            </p>

            <div className="booking-note">
              <span className="booking-note-icon">✦</span>
              <div>
                <h3>Easy WhatsApp Booking</h3>
                <p>
                  We will receive your requested service, date and preferred
                  time so we can confirm availability with you.
                </p>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={submitBooking}>
            <div className="form-heading">
              <h3>Appointment Details</h3>
              <p>Complete the fields below to get started.</p>
            </div>

            <div className="form-field">
              <label htmlFor="booking-name">Full name *</label>
              <input
                id="booking-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={booking.name}
                onChange={updateBooking}
                autoComplete="name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="booking-phone">Phone number *</label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={booking.phone}
                onChange={updateBooking}
                autoComplete="tel"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="booking-service">Choose your service *</label>
              <select
                id="booking-service"
                name="service"
                value={booking.service}
                onChange={(event) => {
                  updateBooking(event);
                  setSelectedCut(event.target.value);
                }}
                required
              >
                <option value="">Select a haircut or service</option>
                {haircuts.map((cut) => (
                  <option key={cut.name} value={cut.name}>
                    {cut.name}
                  </option>
                ))}
                <option value="Consultation">Style consultation</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="booking-date">Preferred date *</label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  min={localToday}
                  value={booking.date}
                  onChange={updateBooking}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="booking-time">Preferred time *</label>
                <select
                  id="booking-time"
                  name="time"
                  value={booking.time}
                  onChange={updateBooking}
                  required
                >
                  <option value="">Choose a time</option>
                  <option value="8:00 AM">8:00 AM</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="booking-notes">
                Additional details (optional)
              </label>
              <textarea
                id="booking-notes"
                name="notes"
                placeholder="Tell us any special requests..."
                rows="4"
                value={booking.notes}
                onChange={updateBooking}
              />
            </div>

            <button type="submit" className="primary-button booking-submit">
              Continue to WhatsApp ↗
            </button>

            <p className="form-disclaimer">
              Your request will open in WhatsApp. Your appointment is not
              confirmed until the barber replies.
            </p>
          </form>
        </section>

        <section className="hours-section section-padding" id="hours">
          <SectionHeading
            eyebrow="PLAN YOUR VISIT"
            title="Opening Hours"
            description="Contact us to confirm availability before travelling."
          />

          <div className="hours-list">
            {openingHours.map((item) => (
              <div className="hours-row" key={item.day}>
                <span>{item.day}</span>
                <span>{item.hours}</span>
              </div>
            ))}
          </div>
        </section>

        <div id="location">
          <LocationSection />
        </div>

        <BusinessExtras />

        <section className="final-cta section-padding">
          <p className="section-eyebrow">READY FOR A FRESH LOOK?</p>
          <h2>Your Next Cut Starts Here.</h2>
          <p>Choose your style and send us your booking request today.</p>
          <a href="#booking" className="primary-button">
            Book Your Appointment
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#home" className="footer-brand">
          DARLING DE BARBER
        </a>
        <p>PRECISION · STYLE · CONFIDENCE</p>
        <p>
          © {new Date().getFullYear()} DARLING DE BARBER. All rights reserved.
        </p>
        <a
          href={makeWhatsAppLink('Hello DARLING DE BARBER! I would like to enquire about a haircut.')}
          target="_blank"
          rel="noreferrer"
          className="footer-whatsapp"
        >
          Contact us on WhatsApp
        </a>
      </footer>
    </div>
  );
}
