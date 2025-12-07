<template>
  <div class="room-wrapper">
    <div class="room-content">
      <NuxtLink to="/pokoje">
        <button class="back-button">Powrót do pokoi</button>
      </NuxtLink>
      <h1 class="room-title">Apartament typu Suite z balkonem</h1>
      <div class="room-section">
        <p>Luksusowy apartament Suite oferujący najwyższy standard wypoczynku. Przestronny apartament z oddzielną sypialnią, salonem oraz prywatnym balkonem z widokiem na Bieszczady. Idealny dla rodzin lub grup wymagających dodatkowej przestrzeni i komfortu.</p>
      </div>
      <div class="image-gallery">
        <img :src="images[selectedImage].src" :alt="images[selectedImage].alt" class="main-image" />
        <div class="thumbnail-container">
          <img v-for="(image, index) in images" :key="index" :src="image.src" :alt="image.alt" class="thumbnail" :class="{ active: selectedImage === index }" @click="selectedImage = index" />
        </div>
      </div>
      <div class="room-section">
        <h3>Wyposażenie</h3>
        <div class="feature-list">
          <div class="feature">Oddzielna sypialnia i salon</div>
          <div class="feature">Balkon z widokiem</div>
          <div class="feature">Prywatna łazienka</div>
          <div class="feature">Bezpłatne Wi-Fi</div>
          <div class="feature">Telewizor LED</div>
          <div class="feature">Aneks kuchenny</div>
          <div class="feature">Bezpłatny parking</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const selectedImage = ref(0);
const images = [
  { src: 'https://www.dropbox.com/scl/fi/i0hqzq27zv2h97u637k5v/apartament.webp?rlkey=2lz9bnmqb5jg8k54edgcxk9j4&st=uv4mdtct&dl=0&raw=1', alt: 'Apartament Suite' },
  { src: 'https://www.dropbox.com/scl/fi/xoycof45yxcrh87fss0yt/apartament1.webp?rlkey=r84kgbz5dhn9eyb92fv5j23sp&st=y5q0jyrq&dl=0&raw=1', alt: '' },
  { src: 'https://www.dropbox.com/scl/fi/skvhk6mmia2bcrq96covi/apartament2.webp?rlkey=joe9ycr28ra3lt8nn24hktadu&st=2ybzm6eg&dl=0&raw=1', alt: '' },
  { src: 'https://www.dropbox.com/scl/fi/v7tq68dpejl8lx6hbt0no/aportament3.webp?rlkey=d0a93ykgo7wip1l3g0lslelfh&st=qdchxy5v&dl=0&raw=1', alt: '' },
  { src: 'https://www.dropbox.com/scl/fi/mz95vgczoaq90jtqqc52v/aportament4.webp?rlkey=ewl0xd6o2cx82rcudqvfzpm5n&st=4c1i26kl&dl=0&raw=1', alt: '' },
  { src: 'https://www.dropbox.com/scl/fi/eaxjj22l9o40ogw91fp6p/aportament5.webp?rlkey=i4w275bqi7i9idcf0rji3rt5d&st=cfk11nz8&dl=0&raw=1', alt: '' }
];
</script>
<style scoped>
.room-wrapper {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.98) 100%);
  backdrop-filter: blur(20px);
  min-height: 100vh;
  padding: 5rem 1.5rem 8rem;
  font-family: 'Poppins', system-ui, sans-serif;
}

.room-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.room-title {
  font-family: 'Poppins', sans-serif;
  font-size: 4.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4rem;
  letter-spacing: 1px;
  text-shadow: none;
}

.room-section {
  text-align: left;
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(124, 112, 76, 0.1);
  border: 1px solid rgba(124, 112, 76, 0.15);
  backdrop-filter: blur(10px);
}

.room-section h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #7c704c;
  margin: 0 0 1.5rem;
  text-align: center;
  text-shadow: none;
}

.room-section p {
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
  .room-wrapper {
    padding: 4rem 1rem 6rem;
  }

  .room-title {
    font-size: 3rem;
  }

  .room-section {
    padding: 2rem 1.5rem;
  }

  .room-section p {
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
  .room-title {
    font-size: 2.5rem;
  }

  .back-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }

  .room-section p {
    font-size: 1rem;
  }
}
</style>
