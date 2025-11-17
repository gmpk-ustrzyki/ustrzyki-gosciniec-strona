<template>
  <div id="kontakt" class="kontakt-wrapper">
    <!-- Dolna część - ciemno brązowa z wszystkimi danymi kontaktowymi -->
    <div class="bottom-section">
      <div class="contact-container">
        <!-- Lewa strona - Nasze lokalizacje -->
        <div class="contact-group left-group">
          <div class="locations-wrapper">
            <div class="location-block">
              <p class="location-name-dark">Gościniec pod Małym Królem</p>
              <p class="location-detail">Strwiążyk 35A, 38-700 Ustrzyki Dolne</p>
            </div>
            <div class="location-block">
              <p class="location-name-dark">Ogród Bieszczadzki</p>
              <p class="location-detail">Moczary 39, 38-700 Ustrzyki Dolne</p>
            </div>
          </div>
        </div>

        <!-- Środek - Email -->
        <div class="contact-group center-group">
          <p class="contact-label">DANE KONTAKTOWE</p>
          <div class="contact-items">
            <a href="mailto:gpmk@wp.pl" class="contact-item email-item">gpmk@wp.pl</a>
          </div>
        </div>

        <!-- Prawa strona - Numery telefonu -->
        <div class="contact-group right-group">
          <p class="contact-label">ZAREZERWUJ POBYT</p>
          <div class="contact-items">
            <a href="tel:+48693960519" class="contact-item">693 960 519</a>
            <a href="tel:+48603131190" class="contact-item">603 131 190</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Boczne okienko z Ogrodem Bieszczadzkim -->
    <div class="garden-container">
      <a
        href="http://www.bieszczadzkiogrod.pl/"
        target="_blank"
        rel="noopener noreferrer"
        class="garden-logo"
      >
        <div class="garden-text">Ogród Bieszczadzki</div>
        <div>
          <p>Odwiedź nasz Ogród Bieszczadzki</p>
          <img
            src="https://www.dropbox.com/scl/fi/a6hqpzo79g0uqf8h9qaa8/ogrod.webp?rlkey=yvx6x7jfl7cyx0anl6d53z6m1&st=67vmufqd&dl=0&dl=0&raw=1"
            alt="Bieszczadzki Ogród"
          />
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.kontakt-wrapper {
  width: 100vw;
  position: relative;
  overflow: hidden;
}

/* Sekcja - ciemno brązowa z telefonami, emailem i lokalizacjami */
.bottom-section {
  background: linear-gradient(to bottom, #3D2817, #2A1810);
  padding: 2rem 2rem;
  width: 100%;
}

.contact-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.contact-group {
  display: flex;
  flex-direction: column;
}

.left-group {
  text-align: left;
}

.center-group {
  text-align: center;
}

.right-group {
  text-align: right;
}

.contact-label {
  font-family: Georgia, serif;
  font-size: 0.75rem;
  color: #D4A574;
  margin: 0 0 0.8rem 0;
  letter-spacing: 0.1rem;
  font-weight: 600;
  text-transform: uppercase;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.contact-item {
  font-family: Georgia, serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #E8D4B8;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.05rem;
}

.contact-item:hover {
  color: #F5E6D3;
  transform: translateX(5px);
}

.locations-wrapper {
  display: flex;
  gap: 2rem;
  align-items: start;
}

.location-block {
  flex: 1;
}

.location-name-dark {
  font-family: Georgia, serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #E8D4B8;
  margin: 0 0 0.2rem 0;
  letter-spacing: 0.02rem;
}

.location-detail {
  font-family: Georgia, serif;
  font-size: 0.75rem;
  color: #D4A574;
  margin: 0.1rem 0;
  line-height: 1.4;
}

.email-item {
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .bottom-section {
    padding: 1.5rem 1rem;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .left-group,
  .center-group,
  .right-group {
    text-align: center;
  }

  .locations-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .contact-label {
    font-size: 0.7rem;
  }

  .contact-item {
    font-size: 1.2rem;
  }

  .email-item {
    font-size: 0.9rem;
  }

  .location-name-dark {
    font-size: 0.8rem;
  }

  .location-detail {
    font-size: 0.7rem;
  }
}

.garden-container {
  position: relative;
}

.garden-text {
  position: fixed;
  right: 120px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  z-index: 1001;
  background: linear-gradient(
    135deg,
    rgba(244, 240, 212, 0.98) 0%,
    rgba(255, 255, 255, 0.98) 100%
  );
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: Georgia, serif;
  font-size: 0.9rem;
  color: #af4c1e;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  opacity: 1;
  transition: all 0.4s ease;
  box-shadow: -3px 0 8px rgba(175, 76, 30, 0.15);
  border: 1px solid rgba(175, 76, 30, 0.2);
  letter-spacing: 0.3px;
}

@media (max-width: 768px) {
  .garden-text {
    right: 110px;
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}

.garden-logo {
  position: fixed;
  right: -200px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  transition: all 0.5s ease;
  text-decoration: none;
  width: 220px;
  border: 1px solid rgba(175, 76, 30, 0.15);
  border-right: none;
}

.garden-logo:hover {
  right: 0;
  background: white;
  box-shadow: -6px 0 20px rgba(175, 76, 30, 0.3);
  transform: translateY(-50%) scale(1.02);
}

.garden-logo:hover p {
  opacity: 1;
  transform: translateY(0);
}

.garden-logo:hover .garden-text {
  opacity: 0;
  transform: translateY(-50%) rotate(-90deg) translateX(-15px);
}

.garden-logo div {
  text-align: center;
}

.garden-logo p {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  color: #af4c1e;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease 0.2s;
}

.garden-logo img {
  width: 70px;
  height: auto;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.garden-logo img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .garden-logo {
    right: -180px;
    width: 200px;
    padding: 0.6rem;
  }

  .garden-logo p {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }

  .garden-logo img {
    width: 60px;
  }
}
</style>
