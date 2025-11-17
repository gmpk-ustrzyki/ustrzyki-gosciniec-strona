<template>
  <div id="kontakt" class="kontakt-wrapper">

    <FallingLeaves :count="15" color="#8b6f47" />

    <div class="contact-section">
      <div class="contact-container">
        
        
        <div class="info-item">
          <p class="info-label">Email</p>
          <a href="mailto:gpmk@wp.pl" class="info-value">gpmk@wp.pl</a>
        </div>

        
        <div class="info-item locations-item">
          <p class="info-label">Nasze lokalizacje</p>
          <div class="locations">
            <div class="location">
              <p class="location-name">Gościniec pod Małym Królem</p>
              <p class="location-address">Strwiążyk 35A, 38-700 Ustrzyki Dolne</p>
            </div>
            <div class="location">
              <p class="location-name">Ogród Bieszczadzki</p>
              <p class="location-address">Moczary 39, 38-700 Ustrzyki Dolne</p>
            </div>
          </div>
        </div>

        
        <div class="info-item phones-item">
          <p class="info-label">Zarezerwuj pobyt</p>
          <div class="phone-numbers">
            <a href="tel:+48693960519" class="phone-number">693 960 519</a>
            <a href="tel:+48603131190" class="phone-number">603 131 190</a>
          </div>
        </div>

      </div>
    </div>

    
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


.contact-section {
  background: linear-gradient(135deg, #3D2817, #2A1810);
  padding: 1.5rem 2rem;
  width: 100%;
}

.contact-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2.5rem;
}


.info-item {
  flex: 1;
}

.info-label {
  font-family: Georgia, serif;
  font-size: 0.75rem;
  color: #D4A574;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.info-value {
  font-family: Georgia, serif;
  font-size: 0.85rem;
  color: #E8D4B8;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
}

.info-value:hover {
  color: #F5E6D3;
}


.locations-item {
  flex: 2;
}

.locations {
  display: flex;
  gap: 2rem;
}

.location {
  flex: 1;
}

.location-name {
  font-family: Georgia, serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #D4A574;
  margin: 0 0 0.25rem 0;
}

.location-address {
  font-size: 0.75rem;
  color: #E8D4B8;
  margin: 0;
  line-height: 1.3;
}


.phones-item {
  text-align: right;
}

.phone-numbers {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: flex-end;
}

.phone-number {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #E8D4B8;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  line-height: 1.2;
  white-space: nowrap;
}

.phone-number:hover {
  color: #F5E6D3;
  transform: scale(1.03);
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


@media (max-width: 1200px) {
  .contact-container {
    flex-wrap: wrap;
    gap: 2rem;
  }

  .locations {
    flex-direction: column;
    gap: 1rem;
  }

  .phones-item {
    flex: 0 0 100%;
    text-align: center;
  }

  .phone-numbers {
    align-items: center;
  }

  .phone-number {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 1.5rem 1rem;
  }

  .contact-container {
    flex-direction: column;
    gap: 1.5rem;
  }

  .info-item {
    text-align: center;
  }

  .locations {
    flex-direction: column;
    gap: 1rem;
  }

  .phones-item {
    text-align: center;
  }

  .phone-numbers {
    align-items: center;
  }

  .phone-number {
    font-size: 1rem;
  }

  .garden-text {
    right: 110px;
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

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