
import { useState } from 'react';

const SHOP_ADDRESS = 'Mpasaaso Number One, opposite the hospital, Ghana';

export default function LocationSection({ onLocationChange }) {
  const [location, setLocation] = useState('');
  const [mapsLink, setMapsLink] = useState('');
  const [status, setStatus] = useState('');

  const mapUrl =
    `https://maps.google.com/maps?q=${encodeURIComponent(SHOP_ADDRESS)}&output=embed`;

  const directionsUrl =
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SHOP_ADDRESS)}`;

  function updateLocation(newLocation, newMapsLink = '') {
    setLocation(newLocation);
    setMapsLink(newMapsLink);
    onLocationChange?.({
      location: newLocation,
      mapsLink: newMapsLink,
    });
  }

  function useMyLocation() {
    setStatus('');

    if (!navigator.geolocation) {
      setStatus('Your browser does not support location sharing.');
      return;
    }

    setStatus('Finding your location...');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const link =
          `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;

        updateLocation(
          `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`,
          link
        );

        setStatus('Your location has been added to the booking.');
      },
      (error) => {
        setStatus(
          error.code === 1
            ? 'Location permission was denied. Enter your area below instead.'
            : 'Unable to find your location. Please enter it manually.'
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }

  return (
    <section className="location-section" id="location">
      <div className="location-heading">
        <p className="location-eyebrow">VISIT OUR BARBERSHOP</p>
        <h2>Find <span>Our Location</span></h2>
        <p>{SHOP_ADDRESS}</p>
      </div>

      <div className="location-layout">
        <div className="location-map">
          <iframe
            title="DARLING DE BARBER location map"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 350 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="location-details">
          <div className="location-pin">📍</div>
          <h3>DARLING DE BARBER</h3>
          <p>{SHOP_ADDRESS}</p>

          <a
            className="location-button"
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Get Directions ↗
          </a>

          <div className="customer-location">
            <h3>Share Your Location</h3>
            <p>
              You can share your current location or enter your area manually.
            </p>

            <button
              type="button"
              className="location-button"
              onClick={useMyLocation}
            >
              Use My Current Location
            </button>

            <label htmlFor="customer-location">
              Your area or address
            </label>
            <input
              id="customer-location"
              value={location}
              onChange={(event) => updateLocation(event.target.value, '')}
              placeholder="e.g. Mpasaaso Number One"
            />

            <label htmlFor="customer-maps-link">
              Google Maps link (optional)
            </label>
            <input
              id="customer-maps-link"
              type="url"
              value={mapsLink}
              onChange={(event) => {
                const value = event.target.value;
                setMapsLink(value);
                onLocationChange?.({ location, mapsLink: value });
              }}
              placeholder="Paste your Google Maps link"
            />

            {status && (
              <p className="location-status" role="status">{status}</p>
            )}

            <p className="location-privacy">
              Sharing is optional. Your browser will ask permission before
              using your current location.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
