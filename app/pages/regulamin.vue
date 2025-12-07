```vue
<template>
  <div class="regulamin-wrapper">
    <!-- Christmas Lights - Top -->
    <div class="christmas-lights-top">
      <span v-for="i in 50" :key="`top-${i}`" class="light" :style="{ left: `${(i - 1) * 2}%`, animationDelay: `${Math.random() * 2}s` }"></span>
    </div>

    <!-- Christmas Lights - Bottom -->
    <div class="christmas-lights-bottom">
      <span v-for="i in 50" :key="`bottom-${i}`" class="light" :style="{ left: `${(i - 1) * 2}%`, animationDelay: `${Math.random() * 2}s` }"></span>
    </div>

    <div class="regulamin-content">

      <!-- Przycisk powrotu – identyczny jak w hero -->
      <NuxtLink to="/">
        <button class="back-button">
          Powrót na stronę główną
        </button>
      </NuxtLink>

      <!-- Główny tytuł -->
      <h1 class="regulamin-title">Regulamin Gościńca pod Małym Królem</h1>

      <div class="sections">

        <section class="section">
          <p class="intro-text">
            Będziemy Państwu wdzięczni za przestrzeganie niniejszego regulaminu, który ma służyć zapewnieniu spokoju i bezpieczeństwa pobytu wszystkich naszych Gości.
          </p>

          <ol class="rules-list">
            <li>Pokoje wynajmowane są na doby.</li>
            <li>Doba hotelowa: <strong>14:00 – 11:00</strong> dnia następnego.</li>
            <li>Cisza nocna obowiązuje w godzinach <strong>22:00 – 6:00</strong>.</li>
            <li>Przy przekazaniu kluczy Gość otrzymuje instruktaż urządzeń w pokoju – jest to jednocześnie akceptacja stanu technicznego wyposażenia.</li>
            <li>W pokojach obowiązuje obuwie zmienne.</li>
            <li>Opuszczając pokój prosimy o zamknięcie okien, wyłączenie światła i sprawdzenie zamknięcia drzwi.</li>
            <li>Wybierając się w góry, prosimy zostawić informację o trasie i przewidywanym powrocie.</li>
            <li>Osoby niezameldowane mogą przebywać w obiekcie do godz. 22:00 wyłącznie za zgodą właściciela.</li>
            <li>Zabrania się używania własnych grzałek, czajników, farelek itp. oraz samodzielnego rozpalania kominka.</li>
            <li>W całym obiekcie obowiązuje <strong>całkowity zakaz palenia tytoniu</strong>.</li>
            <li>Płatność za pobyt pobierana jest w dniu przyjazdu.</li>
            <li>Wcześniejszy wyjazd nie uprawnia do zwrotu opłaty za niewykorzystane doby.</li>
            <li>
              <strong>Anulacja rezerwacji:</strong><br>
              • powyżej 30 dni przed przyjazdem – zwrot pełnego zadatku<br>
              • poniżej 30 dni – zadatek przepada
            </li>
            <li>Gość odpowiada materialnie za szkody powstałe z jego winy lub osób mu towarzyszących.</li>
            <li>Zastrzeżenia prosimy zgłaszać niezwłocznie – umożliwi to szybką reakcję.</li>
          </ol>
        </section>

        <section class="section">
          <h2>Zakwaterowanie dzieci</h2>
          <p>• Dzieci w każdym wieku są mile widziane.</p>
          <p>• Dodatkowe łóżko dla dziecka 0–3 lata – <strong>30 zł/noc</strong> (na życzenie).</p>
          <p>• Łóżeczka dziecięce nie są dostępne.</p>
        </section>

        <section class="section">
          <h2>Zwierzęta</h2>
          <p>Akceptujemy zwierzęta domowe po wcześniejszym zgłoszeniu. Mogą obowiązywać dodatkowe opłaty.</p>
        </section>

        <section class="section">
          <h2>Imprezy i płatności</h2>
          <p>Organizacja imprez i przyjęć jest zabroniona.</p>
          <p>Przy rezerwacji przez Booking.com płatność może być pobrana przez platformę.</p>
        </section>

        <!-- WAŻNA SEKCJA O KANALIZACJI -->
        <section class="section important-section">
          <h2>Ważne: Zasady korzystania z toalet i kanalizacji</h2>
          <div class="warning-box">
            <p>
              <strong>Do toalety wolno wrzucać wyłącznie papier toaletowy i ludzkie nieczystości.</strong>
            </p>
            <p>Wszystko inne powoduje zatory i poważne awarie!</p>

            <div class="prohibited-items">
              <p><strong>ZAKAZANE:</strong></p>
              <ul>
                <li>podpaski, tampony, sznurki</li>
                <li>nawilżane chusteczki (nawet „spłukiwalne”)</li>
                <li>waciki, patyczki do uszu</li>
                <li>pieluchy, plastry, bandaże</li>
                <li>ręczniki papierowe, włosy, resztki jedzenia</li>
                <li>tłuszcze, oleje, chemikalia</li>
              </ul>
            </div>

            <p class="final-warning">
              Koszty naprawy instalacji kanalizacyjnej powstałe z winy Gościa pokrywa Gość w całości.
            </p>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
// Brak skryptu – strona statyczna
</script>

<style scoped>
/* Christmas Lights */
.christmas-lights-top,
.christmas-lights-bottom {
  position: fixed;
  left: 0;
  width: 100%;
  height: 10px;
  pointer-events: none;
  z-index: 1000;
}

.christmas-lights-top {
  top: 0;
}

.christmas-lights-bottom {
  bottom: 0;
}

.light {
  position: absolute;
  top: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: twinkle 2s infinite;
}

.light:nth-child(4n+1) {
  background: radial-gradient(circle, #ff0000, #cc0000);
  box-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
}

.light:nth-child(4n+2) {
  background: radial-gradient(circle, #00ff00, #00cc00);
  box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
}

.light:nth-child(4n+3) {
  background: radial-gradient(circle, #0080ff, #0066cc);
  box-shadow: 0 0 10px #0080ff, 0 0 20px #0080ff;
}

.light:nth-child(4n) {
  background: radial-gradient(circle, #ffff00, #cccc00);
  box-shadow: 0 0 10px #ffff00, 0 0 20px #ffff00;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}

.regulamin-wrapper {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.98) 100%);
  backdrop-filter: blur(20px);
  min-height: 100vh;
  padding: 6rem 1.5rem 10rem;
  font-family: 'Poppins', system-ui, sans-serif;
  position: relative;
}

.regulamin-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 10;
}

/* Przycisk - prosty i profesjonalny */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 3rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(124, 112, 76, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  margin-bottom: 4rem;
  box-shadow: 0 4px 20px rgba(124, 112, 76, 0.15);
  text-decoration: none;
}

.back-button:hover {
  background: #7c704c;
  color: #ffffff;
  border-color: #7c704c;
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(124, 112, 76, 0.3);
}

.regulamin-title {
  font-family: 'Poppins', sans-serif;
  font-size: 4.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4rem;
  letter-spacing: 1px;
  text-shadow: none;
}

@media (max-width: 768px) {
  .regulamin-title { font-size: 3rem; }
}
@media (max-width: 480px) {
  .regulamin-title { font-size: 2.5rem; }
  .back-button { padding: 0.9rem 2rem; font-size: 1rem; }
}

.section {
  text-align: left;
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(124, 112, 76, 0.1);
  border: 1px solid rgba(124, 112, 76, 0.15);
  backdrop-filter: blur(10px);
}

.section h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #7c704c;
  margin: 0 0 1.5rem;
  text-align: center;
  text-shadow: none;
}

.intro-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: none;
}

.rules-list {
  counter-reset: item;
  padding-left: 1.2rem;
  line-height: 2;
  color: #555;
  font-size: 1.1rem;
}

.rules-list li {
  position: relative;
  margin-bottom: 1rem;
  padding-left: 1.2rem;
}

.rules-list li::before {
  content: counter(item) ".";
  counter-increment: item;
  position: absolute;
  left: -1.2rem;
  font-weight: 600;
  color: #7c704c;
}

/* Ważna sekcja – wyróżniona */
.important-section {
  background: rgba(124, 112, 76, 0.08);
  border: 2px solid rgba(124, 112, 76, 0.25);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(15px);
}

.warning-box {
  background: rgba(220, 38, 38, 0.08);
  border-left: 5px solid #ef4444;
  padding: 2rem;
  border-radius: 0 16px 16px 0;
  margin: 1.5rem 0;
  backdrop-filter: blur(10px);
}

.warning-box p {
  margin: 1rem 0;
  font-size: 1.15rem;
  color: #555;
}

.final-warning {
  background: rgba(220, 38, 38, 0.12);
  color: #dc2626;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  margin-top: 1.5rem;
  border: 1px solid rgba(220, 38, 38, 0.3);
  backdrop-filter: blur(10px);
  text-shadow: none;
}

.prohibited-items ul {
  list-style: none;
  padding-left: 0;
}

.prohibited-items ul li {
  padding: 0.6rem 0 0.6rem 2rem;
  position: relative;
  color: #555;
}

.prohibited-items ul li::before {
  content: "✕";
  color: #ef4444;
  font-weight: bold;
  position: absolute;
  left: 0;
  font-size: 1.4rem;
  text-shadow: none;
}

.prohibited-items p {
  color: #555;
  font-weight: 600;
}

.section p {
  color: #555;
  line-height: 1.8;
}

.section p strong {
  color: #7c704c;
  font-weight: 600;
}
</style>