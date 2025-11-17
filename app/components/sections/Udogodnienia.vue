<template>
  <section id="udogodnienia">
    <div class="udogodnienia-wrapper">
      <div class="udogodnienia-content">
        <h2 class="section-text">Nasza</h2>
        <div class="udogodnienia-list-wrapper">
          <ListImage
            v-for="(image, index) in images"
            :key="index"
            :src="image.src"
            :alt="image.alt"
            :hover-desc="image.hoverDesc"
          />
        </div>
        <h2 class="section-text">Okolica</h2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const images = [
  {
    src: "https://www.dropbox.com/scl/fi/rcxi2pfde4j6abj5xf4h9/stawsize.jpeg?rlkey=hiwcy0naribg093z8r2bx3pmw&st=fjkw90tq&dl=0&raw=1",
    alt: "Staw",
    hoverTitle: "Cudowny Staw",
    hoverDesc: "Na terenie naszego gościńca znajduje się staw z pomostem. To jest idealne miejsce na relaks.",
  },
  {
    src: "https://www.dropbox.com/scl/fi/5tss6p2psgrqmiaecrr6c/placzabawsize.jpeg?rlkey=af4rpg3hy9no1oqyvf285g451&st=6hqtbs2x&dl=0&raw=1",
    alt: "Plac zabaw",
    hoverTitle: "Plac zabaw dla dzieci",
    hoverDesc: "Bezpieczny i kolorowy plac zabaw dla najmłodszych gości. Pod otwartym niebem w zasięgu wzroku rodziców i oddwielny pokoj zabaw w gościńcu.",
  },
  {
    src: "https://www.dropbox.com/scl/fi/38uzlswowadw6a1pilk33/kuchniasize.jpeg?rlkey=z1fn21te2arx1tpbyman4w2sj&st=30nsvkf2&dl=0&raw=1",
    alt: "Kuchnia",
    hoverTitle: "Wyposażona kuchnia",
    hoverDesc: "Wspólna w pełni wyposażona kuchnia do dyspozycji gości gościńca i odzielny aneks kuchenny w domku.",
  },
  {
    src: "https://www.dropbox.com/scl/fi/cvr1f6z50lsmrkkhxogke/baniasize.jpeg?rlkey=sp7te5su4oe48spcjm8wjd9m4&st=n72fwcsa&dl=0&raw=1",
    alt: "Bania",
    hoverTitle: "Bania",
    hoverDesc: "Tradycyjna ruska bania do odpoczynku i regeneracji za dodatkową opłatą",
  },
  {
    src: "https://www.dropbox.com/scl/fi/5a87vrmas1dtt66not2al/altankasize.jpeg?rlkey=60955bc15hy8sokfjd27kof4c&st=ykw2xdw6&dl=0&raw=1",
    alt: "Altanka",
    hoverTitle: "Altanka",
    hoverDesc: "Idealne miejsce na wspólne biesiady - altanka z dużym stołem i ławami.",
  },
  {
    src: "https://www.dropbox.com/scl/fi/3g7mid5sbychowa2hcvx1/saunasize.jpeg?rlkey=6helcegg0e7wtt0rzbetfg2el&st=xdzmzqhz&dl=0&raw=1",
    alt: "Sauna",
    hoverTitle: "Sauna",
    hoverDesc: "Sauna sucha i parowa do relaksu i regeneracji za dodatkową opłatą.",
  },
  {
    src: "https://www.dropbox.com/scl/fi/ci1d5v8aiohmrnwpmf1mp/ogorkisize.jpeg?rlkey=dtvmbbrmqlchp5knn1u8q19et&st=ihow60qu&dl=0&raw=1",
    alt: "Ogorki",
    hoverTitle: "Ogród warzywny",
    hoverDesc: "Świeże warzywa, owoce i domowe przetwory z naszego ogrodu bieszczadzkiego - dostępne dla gości.",
  },
  {
    src: "https://www.dropbox.com/scl/fi/ej6qg4qk0fhdz65kyfzao/grillsize.jpeg?rlkey=af4ggk8iin91t86gj39delxzt&st=hdbnqyyo&dl=0&raw=1",
    alt: "Grill",
    hoverTitle: "Grill",
    hoverDesc: "Miejsce na grilla i ognisko do dyspozycji gości. Drewno zapewniamy my.",
  },
];
</script>

<style scoped>
.udogodnienia-wrapper {
  background-image: url('https://www.dropbox.com/scl/fi/ghymow5b5eu6ilt5zh7ac/udogodnienia_bg.webp?rlkey=8zjg81t5iehlkmocf6wsca94p&st=dpk8ngjh&dl=0&raw=1');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
}

.udogodnienia-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  color: #000000;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}

.section-text {
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  font-family: Georgia, serif;
  letter-spacing: 0.5px;
  color: #f4f0d4;
  text-shadow: 3px 3px 6px #af4c1e, 4px 4px 8px #000000;
  text-align: center;
  margin: 20px 0;
  max-width: 1200px;
  width: 100%;
}

@media (max-width: 768px) {
  .section-text {
    font-size: 1rem;
    margin: 10px 20px;
  }
}

.udogodnienia-list-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .udogodnienia-wrapper {
    min-height: auto;
    padding: 2rem 0;
  }

  .udogodnienia-list-wrapper {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
    width: 90%;
    gap: 20px;
    padding: 0 20px;
    margin-bottom: 2rem;
  }
}
</style>
