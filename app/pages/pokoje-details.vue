<template>
  <div class="room-wrapper">
    <div class="room-content">
      <NuxtLink to="/pokoje">
        <button class="back-button">← Powrót do pokoi</button>
      </NuxtLink>
      <h1 class="room-title">Pokój z łóżkiem typu king-size i balkonem</h1>
      <div class="room-section">
        <p>Luksusowy pokój dla dwóch osób z komfortowym łóżkiem king-size i prywatnym balkonem z widokiem na piękne Bieszczady. Idealny dla par szukających wyjątkowego miejsca na romantyczny wypoczynek. Pokój wyposażony we wszystkie niezbędne udogodnienia zapewniające komfortowy pobyt.</p>
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
          <div class="feature">Łóżko typu king-size</div>
          <div class="feature">Balkon z widokiem</div>
          <div class="feature">Prywatna łazienka</div>
          <div class="feature">Bezpłatne Wi-Fi</div>
          <div class="feature">Telewizor</div>
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
  { src: 'https://www.dropbox.com/scl/fi/6hzutp9l6lqjs0313x4rd/king-size2.webp?rlkey=0w4kntbz1ivyqc4bpcsotlg7g&st=55pevb27&dl=0&raw=1', alt: 'Pokój z łóżkiem king-size' },
  { src: 'https://www.dropbox.com/scl/fi/e4hte9ciiziiqzftd93j3/king-size1.webp?rlkey=uegtcgjaz743uhjwofj7su3k4&st=rmurtbzw&dl=0&raw=1', alt: 'Łóżko typu king-size w pokoju' },
  { src: 'https://www.dropbox.com/scl/fi/4rdwicrswfb630qqwww6n/king-size3.webp?rlkey=v3yagr496zpraov6n48kzka8q&st=solz25t5&dl=0&raw=1', alt: 'łazienka w pokoju z łóżkiem king-size' }
];
</script>
<style scoped>
.room-wrapper { background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url('https://www.dropbox.com/scl/fi/ghymow5b5eu6ilt5zh7ac/udogodnienia_bg.webp?rlkey=8zjg81t5iehlkmocf6wsca94p&st=dpk8ngjh&dl=0&raw=1'); background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed; min-height: 100vh; width: 100vw; display: flex; justify-content: center; padding: 2rem; }
.room-content { max-width: 900px; width: 100%; background: rgba(255, 255, 255, 0.95); border-radius: 20px; padding: 3rem; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); margin-top: 2rem; }
.room-title { color: #2c3e50; font-size: 2.5rem; text-align: center; margin-bottom: 2rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); }
.room-section { margin-bottom: 2.5rem; }
.room-section h3 { color: #2c3e50; font-size: 1.5rem; margin-bottom: 1rem; border-bottom: 3px solid #7c704c; padding-bottom: 0.5rem; }
.room-section p { color: #34495e; line-height: 1.7; margin-bottom: 0.8rem; font-size: 1.1rem; }
.back-button { background: #7c704c; color: white; border: none; padding: 1rem 1.5rem; border-radius: 8px; font-size: 1rem; cursor: pointer; margin-bottom: 2rem; transition: all 0.3s ease; text-decoration: none; display: inline-block; }
.back-button:hover { background: #5d5436; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }
.feature-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem; }
.feature { background: rgba(124, 112, 76, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #7c704c; font-size: 1rem; color: #2c3e50; transition: transform 0.2s ease; }
.feature:hover { transform: translateX(5px); background: rgba(124, 112, 76, 0.15); }
.image-gallery { margin-bottom: 2.5rem; width: 100%; }
.main-image { width: 100%; height: 400px; object-fit: cover; border-radius: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); margin-bottom: 1rem; transition: all 0.3s ease; }
.main-image:hover { box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2); transform: translateY(-2px); }
.thumbnail-container { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.thumbnail { width: 100px; height: 70px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 3px solid transparent; transition: all 0.3s ease; opacity: 0.7; }
.thumbnail.active { border-color: #7c704c; opacity: 1; }
.thumbnail:hover { opacity: 1; transform: scale(1.05); border-color: #7c704c; }
</style>
