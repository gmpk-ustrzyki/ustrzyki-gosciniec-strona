<template>
  <div class="hero-wrapper">
    <FallingLeaves :count="30" color="#D4A574" />

    <!-- Preload pierwszego obrazu z najwyższym priorytetem -->
    <NuxtImg
      preload
      src="/images/hero/gosciniechero.jpeg"
      alt=""
      class="preload-first"
      fetchpriority="high"
      @load="onImageLoad(0)"
    />

    <!-- Preload pozostałych obrazów -->
    <div class="preload-container">
      <NuxtImg
        v-for="(image, index) in images.slice(1)"
        :key="`preload-${index + 1}`"
        :src="image"
        :alt="''"
        fetchpriority="low"
        @load="onImageLoad(index + 1)"
      />
    </div>

    <div class="slide-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide"
        :class="{
          'active': index === current,
          'previous': index === previous,
          'ken-burns': index === current
        }"
        :style="slideStyle(index)"
      />
    </div>
    <div class="shadow-overlay">
      <h1 class="hero-title animate-title">
        Gościniec pod Małym <span class="crown">K</span>rólem
      </h1>
      <div class="hero-action-wrapper">
        <button class="hero-action">
          <a href="#pokoje">
            <NuxtImg
              src="/images/lupa.png"
              alt="Lupa"
              width="20"
              height="20"
            />
            Zobacz
          </a>
        </button>
        <button class="hero-action">
          <a href="tel:693960519">
            <img
              src="/images/halo.png"
              alt="Halo"
              width="20"
              height="20"
            />
            Zadzwoń
          </a>
          <div class="phone-tooltip">693 960 519</div>
        </button>
      </div>
      
      <!-- Indicators -->
      <div class="slide-indicators">
        <button
          v-for="(image, index) in images"
          :key="`indicator-${index}`"
          class="indicator"
          :class="{ active: index === current }"
          @click="goToSlide(index)"
          :aria-label="`Przejdź do zdjęcia ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const images = [
  '/images/hero/gosciniechero.jpeg',
  '/images/hero/calyterenhero.jpeg',
  '/images/hero/domhero.jpeg',
];

const current = ref(0);
const previous = ref(-1);
const imagesLoaded = ref<boolean[]>(new Array(images.length).fill(false));
const allImagesLoaded = ref(false);

let interval: ReturnType<typeof setInterval> | null = null;

// Preload pierwszego obrazu dla szybszego ładowania
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: images[0],
      fetchpriority: 'high'
    }
  ]
});

const onImageLoad = (index: number) => {
  imagesLoaded.value[index] = true;
  
  // Check if all images are loaded
  if (imagesLoaded.value.every(loaded => loaded)) {
    allImagesLoaded.value = true;
  }
};

onMounted(() => {
  // Start slideshow immediately
  interval = setInterval(() => {
    nextSlide();
  }, 10000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});

const nextSlide = () => {
  previous.value = current.value;
  current.value = (current.value + 1) % images.length;
};

const goToSlide = (index: number) => {
  if (index !== current.value) {
    previous.value = current.value;
    current.value = index;
    
    // Reset interval
    if (interval) {
      clearInterval(interval);
      interval = setInterval(() => {
        nextSlide();
      }, 10000);
    }
  }
};

const slideStyle = (index: number) => {
  return {
    backgroundImage: `url("${images[index]}")`,
  };
};
</script>

<style scoped>
/* Preload container - ukryte obrazy do szybkiego ładowania */
.preload-container {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}

.preload-container img {
  position: absolute;
  width: 1px;
  height: 1px;
}

/* Preload pierwszego obrazu - ukryty ale priorytetowy */
.preload-first {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}

.hero-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  /* Placeholder dla pierwszego obrazu podczas ładowania */
  background-color: #1a1a1a;
}

.hero-wrapper :deep(.falling-leaves-container) {
  z-index: 5;
}

.slide-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
  z-index: 1;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transform: scale(1);
  transition: opacity 1.5s ease-in-out;
  z-index: 1;
  /* Agresywne cachowanie i optymalizacja GPU */
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Pierwsze zdjęcie - natychmiastowy start */
.slide:first-child {
  /* Pierwsze zdjęcie jest od razu widoczne - lokalny plik */
  background-image: url('/images/hero/gosciniechero.jpeg');
}

/* Efekt Ken Burns - zoom zostaje na końcu */
.slide.ken-burns {
  animation: kenBurnsStay 10s ease-out forwards;
}

/* NOWA animacja - kończy się na zoom i tam zostaje */
@keyframes kenBurnsStay {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1.15) translate(-2%, -2%);
    opacity: 1;
  }
}

/* Alternatywne kierunki dla różnych slajdów */
.slide:nth-child(1).ken-burns {
  animation: kenBurnsStay1 10s ease-out forwards;
}

.slide:nth-child(2).ken-burns {
  animation: kenBurnsStay2 10s ease-out forwards;
}

.slide:nth-child(3).ken-burns {
  animation: kenBurnsStay3 10s ease-out forwards;
}

@keyframes kenBurnsStay1 {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1.15) translate(-3%, -1%);
    opacity: 1;
  }
}

@keyframes kenBurnsStay2 {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1.12) translate(2%, -2%);
    opacity: 1;
  }
}

@keyframes kenBurnsStay3 {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1.13) translate(-1%, 1%);
    opacity: 1;
  }
}

.slide.active {
  opacity: 1;
  z-index: 2;
}

.slide.previous {
  opacity: 0;
  z-index: 1;
  /* Zostaw zoom z poprzedniej animacji */
  transform: inherit;
}

.shadow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.7) 0%, 
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 80%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events: none;
}

.shadow-overlay > * {
  pointer-events: auto;
}

.hero-title {
  margin-top: 110px;
  font-family: Georgia, serif;
  font-size: 4rem;
  color: #F4F0D4;
  text-shadow: 
    3px 3px 6px #af4c1e, 
    4px 4px 8px #000000,
    0 0 40px rgba(175, 76, 30, 0.5);
  text-align: center;
  z-index: 2;
  white-space: nowrap;
  overflow: visible;
  height: 120px;
  line-height: 140px;
  opacity: 0;
}

.hero-title.animate-title {
  animation: titleFadeIn 1.5s ease-out 0.5s forwards;
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

@media (max-width: 600px) {
  .hero-title {
    margin-top: 60px;
    font-size: 2rem;
    line-height: normal;
    height: auto;
    white-space: normal;
    padding: 0 20px;
    text-shadow: 2px 2px 4px #af4c1e, 3px 3px 6px #000000;
  }
}

.crown {
  width: 55px;
  height: 100%;
  margin-right: -2px;
  background-image: url('https://www.dropbox.com/scl/fi/s7030pif0g3to58rdlje8/krona.png?rlkey=spmf4p5tvjjewgcqbnp1dvprv&st=j34viumj&dl=0&raw=1');
  background-size: 140px;
  background-position: -42px 0;
  background-repeat: no-repeat;
  display: inline-block;
}

@media (max-width: 600px) {
  .crown {
    background: none;
    width: 35px;
    height: auto;
  }
}

.hero-action-wrapper {
  display: flex;
  justify-content: center;
  gap: 70px;
  position: absolute;
  bottom: 100px;
  left: 0;
  width: 100%;
  z-index: 2;
}

@media (max-width: 600px) {
  .hero-action-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    bottom: 80px;
  }
}

.hero-action {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(244, 240, 212, 0.9);
  border: 2px solid rgba(212, 165, 116, 0.5);
  border-radius: 12px;
  padding: 0 36px;
  height: 56px;
  font-family: Georgia, serif;
  font-size: 2rem;
  font-weight: bold;
  color: #af4c1e;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  box-shadow: 
    0 12px 48px rgba(40, 20, 5, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(10px);
}

@media (max-width: 600px) {
  .hero-action {
    display: flex;
    justify-content: center;
    width: 300px;
  }
}

.hero-action:hover {
  background: rgba(255, 233, 199, 0.95);
  color: #8c3915;
  box-shadow: 
    0 16px 64px rgba(40, 20, 5, 0.6),
    inset 0 2px 4px rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
  border-color: rgba(212, 165, 116, 0.8);
}

.hero-action a {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: Georgia, serif;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 3px 3px 12px #000, 2px 2px 8px #030100;
}

@media (max-width: 600px) {
  .hero-action a {
    font-size: 1.2rem;
  }

  .hero-action a img {
    width: 16px !important;
    height: 16px !important;
  }
}

.phone-tooltip {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  color: #F4F0D4;
  padding: 10px 20px;
  border-radius: 10px;
  font-family: Georgia, serif;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  z-index: 10;
  border: 1px solid rgba(212, 165, 116, 0.3);
}

.phone-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.95);
}

.hero-action:hover .phone-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-8px);
}

/* Slide Indicators */
.slide-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 3;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(244, 240, 212, 0.8);
  background: rgba(244, 240, 212, 0.3);
  cursor: pointer;
  transition: all 0.4s ease;
  padding: 0;
  backdrop-filter: blur(5px);
}

.indicator:hover {
  background: rgba(244, 240, 212, 0.6);
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(244, 240, 212, 0.6);
}

.indicator.active {
  background: rgba(244, 240, 212, 1);
  width: 40px;
  border-radius: 6px;
  box-shadow: 0 0 20px rgba(244, 240, 212, 0.8);
}

@media (max-width: 600px) {
  .slide-indicators {
    bottom: 20px;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
  }
  
  .indicator.active {
    width: 30px;
  }
}
</style>