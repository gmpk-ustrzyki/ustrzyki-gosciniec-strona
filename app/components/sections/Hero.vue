<template>
  <div class="hero-wrapper">
    <div
      class="slide-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="slide"
        :style="slideStyle(index)"
      />
    </div>
    <div class="shadow-overlay">
      <h1 class="hero-title">
        Gościniec pod Małym <span class="crown">K</span>rólem
      </h1>
      <div class="hero-action-wrapper">
        <button class="hero-action">
          <a href="#pokoje">
            <img
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const images = [
  'https://www.dropbox.com/scl/fi/i6brepybzkj5dr73lpg05/gosciniechero.jpeg?rlkey=d0r09tiq9yrb33dyy9h55sszj&st=u8287oit&dl=0&raw=1',
  'https://www.dropbox.com/scl/fi/w6ot4v6dm7jamg14ij24x/calyterenhero.jpeg?rlkey=n1s9hgtggd2d3sgz19e9jo3qd&st=2fc2ynyj&dl=0&raw=1',
  'https://www.dropbox.com/scl/fi/7zenv6axwqn4f43vfww1z/domhero.jpeg?rlkey=42htkx11nqfis5tavkd3j0jw7&st=0m3d8rjw&dl=0&raw=1',
];

const current = ref(0);
const touchStart = ref(0);
const touchEnd = ref(0);
const isSwiping = ref(false);
const imagesLoaded = ref<boolean[]>([]);

let interval: NodeJS.Timeout | null = null;

// Preload images
onMounted(() => {
  const preloadImages = async () => {
    const loadedStates = await Promise.all(
      images.map((src) => {
        return new Promise<boolean>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      })
    );
    imagesLoaded.value = loadedStates;
  };
  preloadImages();

  // Auto-advance slides
  interval = setInterval(() => {
    if (!isSwiping.value) {
      current.value = (current.value + 1) % images.length;
    }
  }, 5000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});

const handleTouchStart = (event: TouchEvent) => {
  touchStart.value = event.touches[0].clientX;
  touchEnd.value = event.touches[0].clientX;
  isSwiping.value = true;
};

const handleTouchMove = (event: TouchEvent) => {
  touchEnd.value = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  const swipeDistance = touchStart.value - touchEnd.value;
  const minSwipeDistance = 50;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0 && current.value < images.length - 1) {
      current.value++;
    } else if (swipeDistance < 0 && current.value > 0) {
      current.value--;
    }
  }
  isSwiping.value = false;
};

const slideStyle = (index: number) => {
  const position = index - current.value;
  const x = position * 100;

  const zIndex = position === 0 ? 2 :
                 position === -1 ? 1 :
                 position === 1 ? 1 : 0;

  const opacity = position === 0 ? 1 :
                 Math.abs(position) === 1 ? 0.3 : 0;

  const isLoaded = imagesLoaded.value[index];

  return {
    backgroundImage: `url("${images[index]}")`,
    transform: `translateX(${x}%)`,
    transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
    opacity: isLoaded ? opacity : 0,
    zIndex,
    visibility: Math.abs(position) <= 1 ? 'visible' : 'hidden',
    willChange: 'transform, opacity'
  };
};
</script>

<style scoped>
.hero-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.slide-container {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
  transform-style: preserve-3d;
  perspective: 1000px;
  z-index: 1;
}

@media (max-width: 600px) {
  .slide-container {
    height: 100vh;
  }
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
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transform: translateZ(0);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (max-width: 600px) {
  .slide {
    width: 100%;
    height: 100%;
  }
}

.shadow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(100, 100, 100, 0.1) 40%);
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
  text-shadow: 3px 3px 6px #af4c1e, 4px 4px 8px #000000;
  text-align: center;
  z-index: 2;
  white-space: nowrap;
  overflow: visible;
  height: 120px;
  line-height: 140px;
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
  bottom: 60px;
  left: 0;
  width: 100%;
  z-index: 2;
}

@media (max-width: 600px) {
  .hero-action-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
}

.hero-action {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(244, 240, 212, 0.63);
  border: none;
  border-radius: 12px;
  padding: 0 36px;
  height: 56px;
  font-family: Georgia, serif;
  font-size: 2rem;
  font-weight: bold;
  color: #af4c1e;
  text-shadow: 3px 3px 12px #000, 2px 2px 8px #130702;
  box-shadow: 0 12px 48px 0 rgba(40, 20, 5, 0.65);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, color 0.2s;
  position: relative;
}

@media (max-width: 600px) {
  .hero-action {
    display: flex;
    justify-content: center;
    width: 300px;
  }
}

.hero-action:hover {
  background: #ffe9c7;
  color: #8c3915;
  box-shadow: 0 16px 64px 0 rgba(40, 20, 5, 0.75);
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
  background: rgba(0, 0, 0, 0.9);
  color: #F4F0D4;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: Georgia, serif;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.phone-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
}

.hero-action:hover .phone-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-5px);
}
</style>
