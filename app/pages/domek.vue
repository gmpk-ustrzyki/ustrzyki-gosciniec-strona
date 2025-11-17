<template>
  <div class="domek-wrapper">
    <div class="domek-content">
      <NuxtLink to="/">
        <button class="back-button">← Powrót na stronę główną</button>
      </NuxtLink>

      <h1 class="domek-title">Dom łemkowski</h1>

      <div class="domek-section">
        <p>
          Zapraszamy do naszego przytulnego domku letniskowego położonego w malowniczej okolicy Ustrzyk Dolnych.
          Idealnie nadaje się na wypoczynek dla rodzin i grup przyjaciół pragnących uciec od zgiełku miasta. Wnętrze urządzone jest w tradycyjnym stylu łemkowskim, co dodaje mu wyjątkowego uroku. Zapewniamy bezpłatne Wi-Fi, a nasz domek jest przyjazny zwierzętom. To idealne miejsce na relaks i aktywny wypoczynek w sercu Bieszczad. Cena wynajmu może być negocjowana w zależności od liczby osób i długości pobytu.
        </p>
      </div>

      <div class="image-gallery">
        <img :src="images[selectedImage].src" :alt="images[selectedImage].alt" class="main-image" />
        <div class="thumbnail-container">
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image.src"
            :alt="image.alt"
            class="thumbnail"
            :class="{ active: selectedImage === index }"
            @click="selectedImage = index"
          />
        </div>
      </div>

      <div class="domek-section">
        <h3>Wyposażenie</h3>
        <div class="feature-list">
          <div class="feature">Bezpłatne Wi-Fi</div>
          <div class="feature">Bezpłatne Miejsce parkingowe</div>
          <div class="feature">3 sypialnie (10 osób)</div>
          <div class="feature">W pełni wyposażona kuchnia</div>
          <div class="feature">2 Łazienki i prysznic</div>
          <div class="feature">Przyjazny zwierzętom</div>
          <div class="feature">Telewizor z kanalami kablowymi</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedImage = ref(0);

const images = [
  {
    src: "https://www.dropbox.com/scl/fi/afd6esapqluindrfe2dd6/domek1.webp?rlkey=unewhp9t5o2j4z83fgiwmsk55&st=5ub74o8e&dl=0&raw=1",
    alt: ""
  },
  {
    src: "https://www.dropbox.com/scl/fi/pukejeulsl2y8ei6f5t74/domhover.jpg?rlkey=4qjicicif7ulrbt635jj7afgd&st=cvk48nrf&dl=0&raw=1",
    alt: ""
  },
  {
    src: "https://www.dropbox.com/scl/fi/e93j8dquyym5b8qmu42jv/domek2.webp?rlkey=ihbdyfln3ltovlzugahovzjkk&st=mfwcpd06&dl=0&raw=1",
    alt: ""
  },
  {
    src: "https://www.dropbox.com/scl/fi/ft0x9mgv0hhqryepowwzs/domek3.webp?rlkey=067amcodaotliehpv2oirtprg&st=aog32nzu&dl=0&raw=1",
    alt: ""
  },
  {
    src: "https://www.dropbox.com/scl/fi/lq2cvnwftut78uf4rhf6i/domek4.webp?rlkey=ee92r6vx7xy51fm2zc4wqt98x&st=cnqv4quz&dl=0&raw=1",
    alt: ""
  },
  {
    src: "https://www.dropbox.com/scl/fi/29rz65gahl4ldtspfhbbb/domek5.webp?rlkey=0ustk6s5fxqzwn0qpvh8qfy0s&st=qaursjo1&dl=0&raw=1",
    alt: ""
  },
  {
    src: "https://www.dropbox.com/scl/fi/9hzhx6hy17fud2j33yzhh/domek6.webp?rlkey=3d5h5jwtvbmc33ex3ft6qzkye&st=yylysuhb&dl=0&raw=1",
    alt: ""
  },
  {
    src: "https://www.dropbox.com/scl/fi/vq1g0mhg3ko6uw10yfetz/domek7.webp?rlkey=k78ba972qnq4dm2uilu1v8xcm&st=oup7p80v&dl=0&raw=1",
    alt: ""
  },
  {
    src: "https://www.dropbox.com/scl/fi/2bslurb4gx4bd290o25gp/domek8.webp?rlkey=r5wo7gpzi1y1xh2qm3n3c81m3&st=6aldqllc&dl=0&raw=1",
    alt: ""
  },
];
</script>

<style scoped>
.domek-wrapper {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%),
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

.domek-content {
  max-width: 900px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.domek-title {
  color: #2c3e50;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.domek-section {
  margin-bottom: 2.5rem;
}

.domek-section h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid #7c704c;
  padding-bottom: 0.5rem;
}

.domek-section p {
  color: #34495e;
  line-height: 1.7;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.back-button {
  background: #7c704c;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.back-button:hover {
  background: #5d5436;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.feature {
  background: rgba(124, 112, 76, 0.1);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #7c704c;
  font-size: 1rem;
  color: #2c3e50;
  transition: transform 0.2s ease;
}

.feature:hover {
  transform: translateX(5px);
  background: rgba(124, 112, 76, 0.15);
}

.image-gallery {
  margin-bottom: 2.5rem;
  width: 100%;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.main-image:hover {
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.thumbnail-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.thumbnail {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.thumbnail.active {
  border-color: #7c704c;
  opacity: 1;
}

.thumbnail:hover {
  opacity: 1;
  transform: scale(1.05);
  border-color: #7c704c;
}
</style>
