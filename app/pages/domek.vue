<template>
  <div class="domek-wrapper">
    <div class="domek-content">
      <NuxtLink to="/">
        <button class="back-button">Powrót na stronę główną</button>
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.98) 100%);
  backdrop-filter: blur(20px);
  min-height: 100vh;
  padding: 5rem 1.5rem 8rem;
  font-family: 'Poppins', system-ui, sans-serif;
}

.domek-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.domek-title {
  font-family: 'Poppins', sans-serif;
  font-size: 4.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4rem;
  letter-spacing: 1px;
  text-shadow: none;
}

.domek-section {
  text-align: left;
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(124, 112, 76, 0.1);
  border: 1px solid rgba(124, 112, 76, 0.15);
  backdrop-filter: blur(10px);
}

.domek-section h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #7c704c;
  margin: 0 0 1.5rem;
  text-align: center;
  text-shadow: none;
}

.domek-section p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 0.8rem;
}

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

/* Responsywność dla mobile */
@media (max-width: 768px) {
  .domek-wrapper {
    padding: 4rem 1rem 6rem;
  }

  .domek-title {
    font-size: 3rem;
  }

  .domek-section {
    padding: 2rem 1.5rem;
  }

  .domek-section p {
    font-size: 1.1rem;
  }

  .main-image {
    height: 250px;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .back-button {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }

  .thumbnail {
    width: 80px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .domek-title {
    font-size: 2.5rem;
  }

  .back-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }

  .domek-section p {
    font-size: 1rem;
  }
}
</style>
