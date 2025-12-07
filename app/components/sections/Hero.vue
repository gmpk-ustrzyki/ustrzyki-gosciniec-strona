<template>
  <div class="hero-wrapper">
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
      <div class="hero-content">
        <p class="hero-subtitle animate-subtitle">Odpoczynek w Bieszczadach</p>
        <h1 class="hero-title animate-title">
          Gościniec pod Małym Królem
        </h1>
        <a href="#options" class="hero-cta-button animate-button">
          Sprawdź naszą ofertę
        </a>
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
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.shadow-overlay > * {
  pointer-events: auto;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
  padding: 0 2rem;
}

.hero-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
  opacity: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-subtitle.animate-subtitle {
  animation: subtitleFadeIn 1.2s ease-out 0.3s forwards;
}

.hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: 4rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 0;
  white-space: nowrap;
  overflow: visible;
  opacity: 0;
  letter-spacing: 1px;
}

.hero-title.animate-title {
  animation: titleFadeIn 1.5s ease-out 0.6s forwards;
}

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

@media (max-width: 600px) {
  .hero-subtitle {
    font-size: 0.8rem;
    letter-spacing: 2px;
  }

  .hero-title {
    font-size: 2rem;
    white-space: normal;
    padding: 0 20px;
  }
}

/* CTA Button */
.hero-cta-button {
  display: inline-block;
  padding: 1rem 3rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  text-decoration: none;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-cta-button.animate-button {
  animation: buttonFadeIn 1.2s ease-out 0.9s forwards;
}

.hero-cta-button:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
}

@keyframes buttonFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .hero-cta-button {
    font-size: 0.9rem;
    padding: 0.8rem 2rem;
  }
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

/* Garden Logo Styles */
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

@media (max-width: 768px) {
  .garden-text {
    right: 110px;
    font-size: 0.65rem;
    padding: 0.4rem 1rem;
    letter-spacing: 1.5px;
  }

  .garden-logo {
    right: -180px;
    width: 200px;
    padding: 0.6rem;
  }

  .garden-logo p {
    font-size: 0.75rem;
    margin-bottom: 0.6rem;
    letter-spacing: 1px;
  }

  .garden-logo img {
    width: 60px;
  }
}
</style>