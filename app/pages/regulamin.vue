<template>
  <div class="regulamin-wrapper">
    <div class="regulamin-content">
      <NuxtLink to="/">
        <button class="back-button">← Powrót na stronę główną</button>
      </NuxtLink>

      <h1 class="regulamin-title">Regulamin</h1>

      <div class="regulamin-section">
        <h3>
          Będziemy Państwu wdzięczni za przestrzeganie niniejszego regulaminu, który ma służyć zapewnieniu spokoju i
          bezpieczeństwa pobytu naszych Gości.
        </h3>
        <p>1. Pokoje wynajmowane są na doby.</p>
        <p>2. Doba trwa od godziny 14:00 do godziny 11:00 dnia następnego.</p>
        <p>3. Obowiązuje cisza nocna w godz. 22:00 – 6:00.</p>
        <p>
          4. Podczas przekazywania kluczy osoba wprowadzająca udziela instrukcji obsługi urządzeń stanowiących
          wyposażenie kwatery. Moment ten stanowi jednocześnie zapoznanie się Gości ze stanem technicznym i ilościowym
          wyposażenia pokoi.
        </p>
        <p>5. W pokojach przebywa się w obuwiu zmiennym.</p>
        <p>
          6. Każdorazowo opuszczając kwaterę (pokój) należy sprawdzić zamknięcie drzwi, okien dachowych, oświetlenia
          itp.
        </p>
        <p>
          7. Goście wybierając się w góry (na szlaki turystyczne) powinni zostawić wiadomość o celu wędrówki i
          przewidywanym czasie powrotu do kwatery.
        </p>
        <p>
          8. Osoby niezameldowane mogą przebywać na terenie obiektu do godz. 22:00 tylko za zgodą właściciela.
        </p>
        <p>
          9. Ze względu na bezpieczeństwo, zabronione jest używanie grzałek i innych podobnych urządzeń nie
          stanowiących wyposażenia pokoju. Zabrania się samodzielnego rozpalania kominka.
        </p>
        <p>10. W obiekcie obowiązuje zakaz palenia.</p>
        <p>
          11. Goście powinni uregulować należność za pobyt w dniu przyjazdu (lub najpóźniej w ciągu doby od przyjazdu).
        </p>
        <p>
          12. Wcześniejszy wyjazd gościa z przyczyn niezależnych od właściciela, nie uprawnia go do żądania zwrotu
          kwoty za niewykorzystane świadczenie.
        </p>
        <p>
          13. W przypadku anulowania przez Gościa gwarantowanej rezerwacji, co jest równoznaczne z odstąpieniem od
          umowy: – na ponad 30 dni przed rozpoczęciem pobytu – Gościniec zwraca kwotę równorzędną wpłaconemu zadatkowi,
          – poniżej 30 dni przed rozpoczęciem pobytu – wpłacony zadatek nie zostaje zwrócony.
        </p>
        <p>
          14. Goście ponoszą odpowiedzialność materialną za wszelkie uszkodzenia lub zniszczenia przedmiotów,
          wyposażenia i urządzeń kwatery powstałe z jego winy lub osób powierzonych jego opiece.
        </p>
        <p>
          15. W przypadku zastrzeżeń dotyczących jakości świadczonych usług prosimy o jak najszybsze zgłaszanie ich
          właścicielowi, co umożliwi niezwłoczną reakcję.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.regulamin-wrapper {
  background: linear-gradient(to bottom, rgba(139, 90, 43, 0.15), rgba(139, 90, 43, 0.05)),
    url('https://www.dropbox.com/scl/fi/ghymow5b5eu6ilt5zh7ac/udogodnienia_bg.webp?rlkey=8zjg81t5iehlkmocf6wsca94p&st=dpk8ngjh&dl=0&raw=1');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.regulamin-content {
  max-width: 900px;
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  border: 2px solid #D4A574;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(139, 90, 43, 0.2);
  margin-top: 2rem;
}

.regulamin-title {
  color: #5D4E37;
  font-size: 2.5rem;
  font-family: Georgia, serif;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(139, 90, 43, 0.1);
  letter-spacing: 0.3px;
}

.regulamin-section {
  margin-bottom: 2rem;
}

.regulamin-section h3 {
  color: #5D4E37;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(139, 90, 43, 0.08);
  border-left: 4px solid #8B5A2B;
  border-radius: 8px;
  line-height: 1.5;
}

.regulamin-section p {
  color: #5D4E37;
  line-height: 1.8;
  margin-bottom: 1rem;
  font-size: 1.05rem;
  padding-left: 0.5rem;
}

.back-button {
  background: linear-gradient(to bottom, #8B5A2B, #6B4423);
  color: white;
  border: none;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(139, 90, 43, 0.3);
  letter-spacing: 0.5px;
}

.back-button:hover {
  background: linear-gradient(to bottom, #9B6A3B, #7B5433);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(139, 90, 43, 0.4);
}

.back-button:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .regulamin-content {
    padding: 2rem;
    margin-top: 1rem;
  }

  .regulamin-title {
    font-size: 2rem;
  }

  .regulamin-section h3 {
    font-size: 1.1rem;
    padding: 0.8rem;
  }

  .regulamin-section p {
    font-size: 1rem;
  }
}
</style>
