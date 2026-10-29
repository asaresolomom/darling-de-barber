
import { useEffect, useState } from 'react';
import './OriginalHaircutGallery.css';

const galleryFiles = import.meta.glob(
  '/public/haircuts/*',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

const originalHaircuts = Object.keys(galleryFiles)
  .filter((path) => /\.(jpe?g|png|webp|avif|gif)$/i.test(path))
  .sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  )
  .map((path, index) => ({
    id: index + 1,
    name: `Style ${String(index + 1).padStart(3, '0')}`,
    image: `/haircuts/${path.split('/').pop()}`,
    filename: path.split('/').pop(),
  }));

const WHATSAPP_NUMBER = '233532107834';

export default function OriginalHaircutGallery() {
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    if (!selectedStyle) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedStyle(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedStyle]);

  function requestStyle(style) {
    const message = [
      'Hello DARLING DE BARBER!',
      `I am interested in ${style.name}.`,
      `Photo: ${style.filename}`,
      'Please confirm the price and available booking times.',
    ].join('\n');

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  return (
    <section className="original-gallery" id="original-work">
      <header className="original-gallery-heading">
        <span>OUR PORTFOLIO</span>
        <h2>Our Real Work</h2>
        <p>
          Explore our hairstyle collection and choose your next look.
          Contact us on WhatsApp to request your preferred style.
        </p>
        <p className="original-gallery-count">
          {originalHaircuts.length} hairstyle photos
        </p>
      </header>

      {originalHaircuts.length === 0 ? (
        <p className="original-gallery-empty">
          No photos found. Check that your images are inside
          public/haircuts/.
        </p>
      ) : (
        <div className="original-gallery-grid">
          {originalHaircuts.map((style) => (
            <article className="original-gallery-card" key={style.filename}>
              <button
                type="button"
                className="original-gallery-image-button"
                onClick={() => setSelectedStyle(style)}
                aria-label={`View ${style.name}`}
              >
                <img
                  src={style.image}
                  alt={style.name}
                  loading="lazy"
                />
                <span>VIEW PHOTO</span>
              </button>

              <div className="original-gallery-details">
                <div>
                  <h3>{style.name}</h3>
                  <p>{style.filename}</p>
                </div>

                <button
                  type="button"
                  className="original-gallery-book"
                  onClick={() => requestStyle(style)}
                >
                  Request Style
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedStyle && (
        <div
          className="original-gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedStyle.name} preview`}
          onClick={() => setSelectedStyle(null)}
        >
          <div
            className="original-gallery-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="original-gallery-close"
              onClick={() => setSelectedStyle(null)}
              aria-label="Close preview"
            >
              ×
            </button>

            <img
              src={selectedStyle.image}
              alt={selectedStyle.name}
            />

            <h3>{selectedStyle.name}</h3>
            <p>{selectedStyle.filename}</p>

            <button
              type="button"
              className="original-gallery-book"
              onClick={() => requestStyle(selectedStyle)}
            >
              Request This Style on WhatsApp
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
