<template>
  <div id="kontakt" class="kontakt-wrapper">
    <!-- Tło z obrazem -->
    <div class="background-image"></div>

    <!-- Shadow overlay -->
    <div class="shadow-overlay">
      <div class="contact-content">
        <p class="contact-subtitle animate-subtitle">Zapraszamy do kontaktu</p>

        <div class="contact-info animate-info">
          <!-- Email -->
          <div class="info-item">
            <p class="info-label">Email</p>
            <a href="mailto:gpmk@wp.pl" class="info-value">gpmk@wp.pl</a>
          </div>

          <!-- Lokalizacje -->
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

          <!-- Telefony -->
          <div class="info-item phones-item">
            <p class="info-label">Zarezerwuj pobyt</p>
            <div class="phone-numbers">
              <a href="tel:+48693960519" class="phone-number">693 960 519</a>
              <a href="tel:+48693131190" class="phone-number">603 131 190</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Garden Logo -->
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
/* Główny wrapper - średnia wysokość */
.kontakt-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 60vh;
  width: 100vw;
  overflow: hidden;
  background-color: #1a1a1a;
}

/* Tło z obrazem */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/hero/calyterenhero.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  animation: kenBurnsStay 15s ease-out forwards;
  will-change: transform;
  backface-visibility: hidden;
}

@keyframes kenBurnsStay {
  0% {
    transform: scale(1) translate(0, 0);
  }
  100% {
    transform: scale(1.1) translate(-2%, -1%);
  }
}

/* Shadow overlay */
.shadow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
}

/* Główna zawartość */
.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
  max-width: 1200px;
  width: 100%;
}

/* Subtitle */
.contact-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
  opacity: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.contact-subtitle.animate-subtitle {
  animation: subtitleFadeIn 1.2s ease-out 0.3s forwards;
}

/* Title */
.contact-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 0;
  opacity: 0;
  letter-spacing: 1px;
}

.contact-title.animate-title {
  animation: titleFadeIn 1.5s ease-out 0.6s forwards;
}

/* Contact Info Container */
.contact-info {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;
  width: 100%;
  opacity: 0;
}

.contact-info.animate-info {
  animation: infoFadeIn 1.2s ease-out 0.9s forwards;
}

/* Info items */
.info-item {
  flex: 1;
  max-width: 300px;
}

.info-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 0.6rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 400;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.info-value {
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.info-value:hover {
  transform: translateY(-2px);
  text-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

/* Locations */
.locations-item {
  flex: 2;
  max-width: 600px;
}

.locations {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.location {
  flex: 1;
  text-align: center;
}

.location-name {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 0.4rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
}

.location-address {
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.4;
  font-weight: 300;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

/* Phone numbers */
.phones-item {
  text-align: center;
}

.phone-numbers {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.phone-number {
  font-family: 'Poppins', sans-serif;
  font-size: 1.15rem;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.phone-number:hover {
  transform: translateY(-2px) scale(1.05);
  text-shadow: 0 4px 15px rgba(255, 255, 255, 0.4);
}

/* Garden Logo */
.garden-container {
  position: relative;
}

.garden-text {
  position: fixed;
  right: 120px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  z-index: 1001;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  opacity: 1;
  transition: all 0.4s ease;
  box-shadow: -3px 0 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
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
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-right: none;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.garden-logo:hover {
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  box-shadow: -6px 0 20px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
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
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #ffffff;
  margin-bottom: 0.8rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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

/* Animations */
@keyframes subtitleFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 0.95;
    transform: translateY(0);
  }
}

@keyframes titleFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes infoFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .kontakt-wrapper {
    min-height: 50vh;
  }

  .contact-info {
    flex-wrap: wrap;
    gap: 2rem;
  }

  .locations {
    flex-direction: column;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .kontakt-wrapper {
    min-height: 40vh;
  }

  .shadow-overlay {
    padding: 2.5rem 1.5rem;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.5) 30%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.5) 80%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }

  .contact-content {
    gap: 1.5rem;
  }

  .contact-subtitle {
    font-size: 0.7rem;
    letter-spacing: 2px;
    margin-top: 1rem;
  }

  .contact-info {
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
  }

  .info-item {
    flex: 1;
    max-width: 48%;
    background: rgba(255, 255, 255, 0.08);
    padding: 1rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .info-label {
    font-size: 0.7rem;
    margin-bottom: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  /* Ukryj lokalizacje na mobilce */
  .locations-item {
    display: none;
  }

  .phones-item {
    padding: 1rem;
  }

  .phone-numbers {
    gap: 0.8rem;
  }

  .phone-number {
    font-size: 0.85rem;
    padding: 0.5rem 0.6rem;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    letter-spacing: 0.5px;
  }

  .info-value {
    font-size: 0.85rem;
  }

  .garden-text {
    display: none;
  }

  .garden-logo {
    right: -200px;
    width: 180px;
    padding: 0.8rem;
  }

  .garden-logo:hover {
    right: 0;
  }

  .garden-logo p {
    font-size: 0.7rem;
    margin-bottom: 0.6rem;
    letter-spacing: 1px;
  }

  .garden-logo img {
    width: 55px;
  }
}

@media (max-width: 480px) {
  .kontakt-wrapper {
    min-height: 40vh;
  }

  .shadow-overlay {
    padding: 2.5rem 1.2rem;
  }

  .contact-content {
    gap: 1.5rem;
  }

  .contact-subtitle {
    font-size: 0.7rem;
    letter-spacing: 2px;
    margin-top: 1rem;
  }

  .contact-info {
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
  }

  .info-item {
    flex: 1;
    max-width: 48%;
    padding: 1rem;
  }

  .info-label {
    font-size: 0.7rem;
    margin-bottom: 0.7rem;
  }

  .info-value {
    font-size: 0.8rem;
  }

  /* Ukryj lokalizacje na małych mobilkach */
  .locations-item {
    display: none;
  }

  .phone-number {
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
  }

  .garden-logo {
    right: -160px;
    width: 160px;
    padding: 0.6rem;
  }

  .garden-logo p {
    font-size: 0.65rem;
    margin-bottom: 0.5rem;
  }

  .garden-logo img {
    width: 50px;
  }
}
</style>