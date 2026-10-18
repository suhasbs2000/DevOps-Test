"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export default function Home() {
  const [today, setToday] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("2 guests");
  const [bookingMessage, setBookingMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const departureInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const now = new Date();
    setToday(
      new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10),
    );
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;

    if (departure <= arrival) {
      departureInput.current?.setCustomValidity(
        "Choose a departure date after your arrival.",
      );
      departureInput.current?.reportValidity();
      departureInput.current?.setCustomValidity("");
      return;
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    const arrivalLabel = new Date(`${arrival}T12:00:00`).toLocaleDateString(
      undefined,
      dateOptions,
    );
    const departureLabel = new Date(
      `${departure}T12:00:00`,
    ).toLocaleDateString(undefined, dateOptions);
    setBookingMessage(
      `Thanks for thinking of us. We’ll check rooms for ${arrivalLabel}–${departureLabel} and be in touch.`,
    );
  }

  function handleArrivalChange(value: string) {
    setArrival(value);
    if (departure && departure <= value) setDeparture("");
    setBookingMessage("");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Harbor House Hotel home">
          <span className="wordmark-mark" aria-hidden="true">H</span>
          <span>HARBOR HOUSE<small>HOTEL · COASTAL MAINE</small></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span>
        </button>
        <nav
          className={`nav${menuOpen ? " open" : ""}`}
          id="primary-nav"
          aria-label="Main navigation"
        >
          <a href="#stay" onClick={closeMenu}>The stay</a>
          <a href="#rooms" onClick={closeMenu}>Rooms</a>
          <a href="#gather" onClick={closeMenu}>Gather</a>
          <a className="nav-book" href="#booking" onClick={closeMenu}>
            Check availability <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=2200&q=85"
            alt="Quiet shoreline at golden hour with a small wooden boat"
            fetchPriority="high"
          />
          <div className="hero-shade"></div>
          <div className="hero-copy">
            <p className="eyebrow light">A little further from the everyday</p>
            <h1 id="hero-title">Find your<br />way back <em>to calm.</em></h1>
            <p className="hero-intro">A small coastal hotel for long mornings, salt air, and nowhere else you need to be.</p>
            <a className="text-link light-link" href="#stay">Discover Harbor House <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-caption"><span>44° 06′ 18.2″ N</span><span>Rockport, Maine</span></div>
        </section>

        <section className="booking-wrap" id="booking" aria-label="Plan your stay">
          <form className="booking-form" id="booking-form" onSubmit={handleSubmit}>
            <div className="booking-heading">
              <span className="eyebrow">Make room for a getaway</span>
              <h2>Plan your stay</h2>
            </div>
            <label className="field">
              <span>Arrival</span>
              <input
                id="arrival"
                name="arrival"
                type="date"
                required
                min={today}
                value={arrival}
                onChange={(event) => handleArrivalChange(event.target.value)}
              />
            </label>
            <label className="field">
              <span>Departure</span>
              <input
                ref={departureInput}
                id="departure"
                name="departure"
                type="date"
                required
                min={arrival || today}
                value={departure}
                onChange={(event) => {
                  setDeparture(event.target.value);
                  setBookingMessage("");
                }}
              />
            </label>
            <label className="field guests-field">
              <span>Guests</span>
              <select
                name="guests"
                aria-label="Number of guests"
                value={guests}
                onChange={(event) => setGuests(event.target.value)}
              >
                <option>1 guest</option><option>2 guests</option>
                <option>3 guests</option><option>4 guests</option>
              </select>
            </label>
            <button className="button button-dark" type="submit">Find a room <span aria-hidden="true">↗</span></button>
            <p className="booking-message" id="booking-message" role="status" aria-live="polite">{bookingMessage}</p>
          </form>
        </section>

        <section className="intro section-pad" id="stay">
          <div className="section-kicker"><span>01</span><span>The Harbor House feeling</span></div>
          <div className="intro-content">
            <h2>Come for the coast.<br /><em>Stay for the stillness.</em></h2>
            <div className="intro-text">
              <p>Set between a working harbor and a stretch of pine-fringed shore, Harbor House is a place to settle into the unhurried rhythm of the sea.</p>
              <p>Thoughtful rooms, a kitchen led by the seasons, and the kind of welcome that feels like coming back.</p>
              <a className="text-link dark-link" href="#gather">A place to linger <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="intro-image-wrap">
            <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=85" alt="Warm timber cabin tucked among coastal trees" loading="lazy" />
            <span className="image-note">A slower pace, by design</span>
          </div>
        </section>

        <section className="rooms section-pad" id="rooms">
          <div className="rooms-top">
            <div className="section-kicker"><span>02</span><span>Stay a while</span></div>
            <div className="rooms-heading"><h2>Rooms with a<br /><em>view to unwind.</em></h2><p>Quietly considered spaces. Natural textures. A little more room to breathe.</p></div>
          </div>
          <div className="room-grid">
            <article className="room-card">
              <a className="room-image" href="#booking" aria-label="Check availability for The Cove Room">
                <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85" alt="Light-filled guest room with linen bedding" loading="lazy" />
                <span className="room-number">01 / 03</span>
              </a>
              <div className="room-details"><div><h3>The Cove Room</h3><p>Soft morning light · Queen bed</p></div><a href="#booking" aria-label="Book The Cove Room">↗</a></div>
            </article>
            <article className="room-card">
              <a className="room-image" href="#booking" aria-label="Check availability for The Lookout Suite">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85" alt="Calm suite interior with natural wood and soft neutral details" loading="lazy" />
                <span className="room-number">02 / 03</span>
              </a>
              <div className="room-details"><div><h3>The Lookout Suite</h3><p>Harbor views · King bed</p></div><a href="#booking" aria-label="Book The Lookout Suite">↗</a></div>
            </article>
            <article className="room-card">
              <a className="room-image" href="#booking" aria-label="Check availability for The Saltbox Cottage">
                <img src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1000&q=85" alt="Small coastal cottage surrounded by greenery" loading="lazy" />
                <span className="room-number">03 / 03</span>
              </a>
              <div className="room-details"><div><h3>The Saltbox Cottage</h3><p>Private garden · Two bedrooms</p></div><a href="#booking" aria-label="Book The Saltbox Cottage">↗</a></div>
            </article>
          </div>
          <a className="text-link dark-link all-rooms" href="#booking">Explore all rooms <span aria-hidden="true">↗</span></a>
        </section>

        <section className="gather" id="gather">
          <div className="gather-image">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1500&q=85" alt="A welcoming dining room set for an intimate evening" loading="lazy" />
          </div>
          <div className="gather-copy">
            <div className="section-kicker"><span>03</span><span>Good things, gathered</span></div>
            <h2>From the water.<br /><em>From around here.</em></h2>
            <p>Our kitchen follows the catch, the harvest, and the people who bring them to us. Come down for a candlelit supper or just one more cup of coffee.</p>
            <a className="text-link dark-link" href="#contact">Meet us at the table <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="visit section-pad" id="contact">
          <div className="section-kicker"><span>04</span><span>Find your way here</span></div>
          <div className="visit-content">
            <h2>The edge of<br /><em>somewhere lovely.</em></h2>
            <div className="visit-details">
              <p>18 Harbor Lane<br />Rockport, Maine 04856</p>
              <p><a href="tel:+12075550184">+1 207 555 0184</a><br /><a href="mailto:hello@harborhouse.example">hello@harborhouse.example</a></p>
              <a className="text-link dark-link" href="https://maps.google.com/?q=Rockport+Maine" target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-wordmark" href="#top">HARBOR HOUSE<small>HOTEL · COASTAL MAINE</small></a>
        <span>Take the long way home.</span>
        <span>© 2026 Harbor House Hotel</span>
      </footer>
    </>
  );
}