
import { useEffect, useState } from "react";
import "./BusinessExtras.css";

const WHATSAPP_NUMBER = "233532107834";

// Add the real social media links when available.
const INSTAGRAM_URL = "";
const TIKTOK_URL = "";

// EXAMPLE HOURS — confirm these with the shop owner.
const openingHours = [
  { day: "Sunday", open: null, close: null },
  { day: "Monday", open: "08:00", close: "22:00" },
  { day: "Tuesday", open: "08:00", close: "22:00" },
  { day: "Wednesday", open: "08:00", close: "22:00" },
  { day: "Thursday", open: "08:00", close: "22:00" },
  { day: "Friday", open: "08:00", close: "22:00" },
  { day: "Saturday", open: "08:00", close: "22:00" },
];

function formatTime(time) {
  if (!time) return "Closed";

  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 || 12;

  return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
}

function getShopStatus() {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Accra",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const getPart = (type) =>
    parts.find((part) => part.type === type)?.value;

  const day = getPart("weekday");
  const currentTime = `${getPart("hour")}:${getPart("minute")}`;

  const today = openingHours.find((item) => item.day === day);

  if (!today?.open || !today?.close) return false;

  return currentTime >= today.open && currentTime < today.close;
}

export default function BusinessExtras() {
  const [isOpen, setIsOpen] = useState(getShopStatus);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(getShopStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="business-extras" id="opening-hours">
        <div className="extras-heading">
          <span className="extras-eyebrow">
            VISIT DARLING DE BARBER
          </span>

          <h2>Opening Hours</h2>

          <p>
            Find the perfect time for your next fresh haircut.
          </p>

          <span
            className={`shop-status ${isOpen ? "open" : "closed"}`}
          >
            <span className="status-dot" />
            {isOpen ? "Open Now" : "Currently Closed"}
          </span>
        </div>

        <div className="hours-card">
          {openingHours.map(({ day, open, close }) => (
            <div className="hours-row" key={day}>
              <span>{day}</span>

              <strong>
                {open && close
                  ? `${formatTime(open)} – ${formatTime(close)}`
                  : "Closed"}
              </strong>
            </div>
          ))}
        </div>

        {(INSTAGRAM_URL || TIKTOK_URL) && (
          <div className="social-section">
            <h3>Follow Our Fresh Cuts</h3>

            <p>
              Follow us to discover our latest hairstyles.
            </p>

            <div className="social-buttons">
              {INSTAGRAM_URL && (
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button instagram"
                >
                  Instagram ↗
                </a>
              )}

              {TIKTOK_URL && (
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button tiktok"
                >
                  TikTok ↗
                </a>
              )}
            </div>
          </div>
        )}
      </section>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hello DARLING DE BARBER! I would like to make an enquiry."
        )}`}
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with DARLING DE BARBER on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 .8A15.1 15.1 0 0 0 3 23.5L.9 31l7.7-2A15.2 15.2 0 1 0 16 .8Zm0 27.6a12.4 12.4 0 0 1-6.3-1.7l-.5-.3-4.6 1.2 1.2-4.5-.3-.5A12.5 12.5 0 1 1 16 28.4Zm6.9-9.4c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.4 3.6 5.6 5.5c.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z" />
        </svg>
      </a>
    </>
  );
}
