<template>
  <div class="caly-teren-wrapper">
    <div class="caly-teren-content">
      <NuxtLink to="/">
        <button class="back-button">Powrót na stronę główną</button>
      </NuxtLink>

      <h1 class="caly-teren-title">Cały Teren z Domkiem i Gościńcem</h1>

      <div class="caly-teren-section">
        <p>
          Wynajmij cały nasz teren wraz z domkiem i gościńcem dla wyjątkowego pobytu w Bieszczadach.
          Idealne rozwiązanie dla większych grup, rodzinnych spotkań lub firm szukających miejsca na integrację.
          Oferujemy kompleksową obsługę i pełną prywatność w malowniczej okolicy Ustrzyk Dolnych.
        </p>
      </div>

      <div class="image-gallery">
        <img v-if="images[selectedImage]" :src="images[selectedImage]?.src" :alt="images[selectedImage]?.alt" class="main-image" />
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

      <div class="caly-teren-section">
        <h3>Udogodnienia</h3>
        <div class="feature-list">
          <div class="feature">Bezpłatne Wi-Fi</div>
          <div class="feature">Całkowita prywatność i przestrzeń</div>
          <div class="feature">Bezpłatny parking</div>
          <div class="feature">Ognisko i grill</div>
          <div class="feature">Zimową porą kuligi z ogniskami</div>
          <div class="feature">Staw i piękne tereny zielone</div>
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
    src: "https://www.dropbox.com/scl/fi/s556uwj8izooyx97x52gz/calyterenopcje.jpg?rlkey=lloxvzk16xwfpdtzi95s2o6my&st=ud66vfn3&dl=0&raw=1",
    alt: "Cały teren - widok ogólny"
  },
  {
    src: "https://www.dropbox.com/scl/fi/do8bgct0luxn9bm7eze33/staw.jpg?rlkey=gqi19ht8zdz0dmhyct2ufiu5i&st=duehwzq6&dl=0&raw=1",
    alt: "Staw na terenie"
  },
  {
    src: "https://www.dropbox.com/scl/fi/ghymow5b5eu6ilt5zh7ac/udogodnienia_bg.webp?rlkey=8zjg81t5iehlkmocf6wsca94p&st=dpk8ngjh&dl=0&raw=1",
    alt: "Widok z terenu"
  }
];
</script>

<style scoped>
.caly-teren-wrapper {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.98) 100%);
  backdrop-filter: blur(20px);
  min-height: 100vh;
  padding: 5rem 1.5rem 8rem;
  font-family: 'Poppins', system-ui, sans-serif;
}

.caly-teren-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.caly-teren-title {
  font-family: 'Poppins', sans-serif;
  font-size: 4.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4rem;
  letter-spacing: 1px;
  text-shadow: none;
}

.caly-teren-section {
  text-align: left;
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(124, 112, 76, 0.1);
  border: 1px solid rgba(124, 112, 76, 0.15);
  backdrop-filter: blur(10px);
}

.caly-teren-section h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #7c704c;
  margin: 0 0 1.5rem;
  text-align: center;
  text-shadow: none;
}

.caly-teren-section p {
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
  .caly-teren-wrapper {
    padding: 4rem 1rem 6rem;
  }

  .caly-teren-title {
    font-size: 3rem;
  }

  .caly-teren-section {
    padding: 2rem 1.5rem;
  }

  .caly-teren-section p {
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
  .caly-teren-title {
    font-size: 2.5rem;
  }

  .back-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }

  .caly-teren-section p {
    font-size: 1rem;
  }
}
</style>
