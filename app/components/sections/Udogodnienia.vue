<template>
  <section id="udogodnienia">
    <div class="udogodnienia-wrapper">
      <div class="udogodnienia-content">
        <div class="intro-section">
          <h2 class="section-heading animate-on-scroll">Nasza Okolica</h2>
          <div class="intro-text-container animate-on-scroll">
            <p class="intro-text">
              Serdecznie zapraszamy do naszego malowniczego gościńca, gdzie wśród spokojnej przyrody 
              znajdziecie Państwo wszystko, czego potrzeba do udanego wypoczynku.
            </p>
            <p class="intro-text">
              Na naszych gości czeka <strong>urokliwy staw</strong> z pomostem, <strong>grill</strong> 
              oraz przestronna <strong>altanka</strong> – idealne miejsca na rodzinne spotkania. 
              Najmłodsi goście z pewnością ucieszą się z bezpiecznego <strong>placu zabaw</strong>.
            </p>
            <p class="intro-text highlight">
              To miejsce, gdzie natura spotyka się z domowym ciepłem, 
              tworząc niezapomnianą atmosferę relaksu dla całej rodziny.
            </p>
        </div>
        </div>

        <!-- Centralne zdjęcie w tle z efektem parallax -->
        <div class="background-image-container" ref="backgroundImageRef">
          <img 
            src="https://www.dropbox.com/scl/fi/rcxi2pfde4j6abj5xf4h9/stawsize.jpeg?rlkey=hiwcy0naribg093z8r2bx3pmw&st=i12u0oxo&dl=0&raw=1" 
            alt="Staw w tle"
            class="background-center-image"
            :style="parallaxStyle"
          />
          <div class="background-image-overlay"></div>
          <div class="floating-particles">
            <span class="particle" v-for="i in 15" :key="i"></span>
          </div>
        </div>
        
        <div class="carousel-container">
          <button 
            class="carousel-arrow left" 
            @click="scrollLeft"
            :disabled="isAtStart"
          >
            ‹
          </button>
          
          <div class="carousel-wrapper" ref="carouselRef">
            <div 
              v-for="(image, index) in images"
              :key="index"
              class="image-card"
              @click="openModal(index)"
            >
              <div class="image-wrapper">
                <img 
                  :src="image.src" 
                  :alt="image.alt"
                  class="card-image"
                />
                <div class="card-shine"></div>
              </div>
              <div class="card-content">
                <h3 class="card-title">{{ image.hoverTitle }}</h3>
                <p class="card-description">{{ image.hoverDesc }}</p>
              </div>
            </div>
          </div>
          
          <button 
            class="carousel-arrow right" 
            @click="scrollRight"
            :disabled="isAtEnd"
          >
            ›
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="isModalOpen" 
          class="modal-overlay"
          @click="closeModal"
        >
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal">✕</button>
            
            <button 
              class="modal-arrow left"
              @click="previousImage"
              v-if="images.length > 1"
            >
              ‹
            </button>
            
            <div class="modal-body" v-if="images[currentImageIndex]">
              <div class="modal-image-wrapper">
                <img
                  :src="images[currentImageIndex].src"
                  :alt="images[currentImageIndex].alt"
                  class="modal-image"
                />
              </div>
              <div class="modal-text">
                <h3 class="modal-title">{{ images[currentImageIndex].hoverTitle }}</h3>
                <p class="modal-description">{{ images[currentImageIndex].hoverDesc }}</p>
              </div>
            </div>
            
            <button 
              class="modal-arrow right"
              @click="nextImage"
              v-if="images.length > 1"
            >
              ›
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

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
    hoverDesc: "Bezpieczny i kolorowy plac zabaw dla najmłodszych gości. Pod otwartym niebem w zasięgu wzroku rodziców i oddzielny pokój zabaw w gościńcu.",
  },
  {
    src: "https://www.dropbox.com/scl/fi/38uzlswowadw6a1pilk33/kuchniasize.jpeg?rlkey=z1fn21te2arx1tpbyman4w2sj&st=30nsvkf2&dl=0&raw=1",
    alt: "Kuchnia",
    hoverTitle: "Wyposażona kuchnia",
    hoverDesc: "Wspólna w pełni wyposażona kuchnia do dyspozycji gości gościńca i oddzielny aneks kuchenny w domku.",
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

const carouselRef = ref<HTMLElement | null>(null);
const backgroundImageRef = ref<HTMLElement | null>(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);
const isModalOpen = ref(false);
const currentImageIndex = ref(0);
const scrollY = ref(0);

const parallaxStyle = computed(() => ({
  transform: `translateY(${scrollY.value * 0.3}px) scale(${1 + scrollY.value * 0.0001})`
}));

const handleScroll = () => {
  if (backgroundImageRef.value) {
    const rect = backgroundImageRef.value.getBoundingClientRect();
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight && elementTop + elementHeight > 0) {
      scrollY.value = (windowHeight - elementTop) * 0.5;
    }
  }
};

const scrollLeft = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: -320, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: 320, behavior: 'smooth' });
  }
};

const updateArrowStates = () => {
  if (carouselRef.value) {
    isAtStart.value = carouselRef.value.scrollLeft <= 0;
    isAtEnd.value = 
      carouselRef.value.scrollLeft + carouselRef.value.clientWidth >= 
      carouselRef.value.scrollWidth - 1;
  }
};

const openModal = (index: number) => {
  currentImageIndex.value = index;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = '';
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

const previousImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length;
};

onMounted(() => {
  if (carouselRef.value) {
    carouselRef.value.addEventListener('scroll', updateArrowStates);
    updateArrowStates();
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (!isModalOpen.value) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') previousImage();
  };

  window.addEventListener('keydown', handleKeydown);

  onUnmounted(() => {
    if (carouselRef.value) {
      carouselRef.value.removeEventListener('scroll', updateArrowStates);
    }
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  });
});
</script>

<style scoped>
.udogodnienia-wrapper {
  background-image: url('/images/options/caly-teren-hover.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 5rem 2rem;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.udogodnienia-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(245, 245, 240, 0.75);
  pointer-events: none;
  z-index: 0;
}

.udogodnienia-content {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

/* Background Image Section - SUPER WOW */
.background-image-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1200px;
  height: 1000px;
  z-index: 0;
  pointer-events: none;
  animation: floatBackground 6s ease-in-out infinite;
}

@keyframes floatBackground {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-20px);
  }
}

.background-center-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  opacity: 0.65;
  filter: brightness(1.15) saturate(0.9) contrast(1.05);
  box-shadow: 
    0 40px 100px rgba(139, 90, 43, 0.25),
    0 20px 60px rgba(139, 90, 43, 0.15),
    inset 0 0 80px rgba(255, 255, 255, 0.1);
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.background-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(245, 245, 240, 0) 0%,
    rgba(245, 245, 240, 0.2) 35%,
    rgba(245, 245, 240, 0.6) 65%,
    rgba(245, 245, 240, 0.95) 100%
  );
  z-index: 1;
  border-radius: 30px;
  animation: pulseOverlay 4s ease-in-out infinite;
}

@keyframes pulseOverlay {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
  }
}

/* Floating Particles */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(212, 165, 116, 0.6), transparent);
  border-radius: 50%;
  animation: floatParticle 8s ease-in-out infinite;
  opacity: 0;
}

.particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
.particle:nth-child(2) { left: 20%; top: 80%; animation-delay: 1s; }
.particle:nth-child(3) { left: 30%; top: 40%; animation-delay: 2s; }
.particle:nth-child(4) { left: 40%; top: 70%; animation-delay: 0.5s; }
.particle:nth-child(5) { left: 50%; top: 30%; animation-delay: 1.5s; }
.particle:nth-child(6) { left: 60%; top: 60%; animation-delay: 2.5s; }
.particle:nth-child(7) { left: 70%; top: 25%; animation-delay: 0.8s; }
.particle:nth-child(8) { left: 80%; top: 75%; animation-delay: 1.8s; }
.particle:nth-child(9) { left: 90%; top: 45%; animation-delay: 2.2s; }
.particle:nth-child(10) { left: 15%; top: 55%; animation-delay: 1.2s; }
.particle:nth-child(11) { left: 25%; top: 15%; animation-delay: 0.3s; }
.particle:nth-child(12) { left: 35%; top: 85%; animation-delay: 1.7s; }
.particle:nth-child(13) { left: 45%; top: 50%; animation-delay: 2.8s; }
.particle:nth-child(14) { left: 55%; top: 10%; animation-delay: 0.6s; }
.particle:nth-child(15) { left: 85%; top: 35%; animation-delay: 2.3s; }

@keyframes floatParticle {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    transform: translateY(-30px) translateX(20px);
    opacity: 0.8;
  }
  75% {
    opacity: 0.4;
  }
}

/* Intro Section Styles */
.intro-section {
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  z-index: 2;
}

.section-heading {
  font-size: 3rem;
  font-weight: 700;
  font-family: Georgia, serif;
  color: #8B5A2B;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  opacity: 0;
  transform: translateY(-30px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.section-heading.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-heading::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(to right, transparent, #D4A574, transparent);
  transition: width 0.8s ease 0.3s;
}

.section-heading.is-visible::after {
  width: 80px;
}

.intro-text-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(139, 90, 43, 0.12);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
}

.intro-text-container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.intro-text {
  font-family: Georgia, serif;
  font-size: 1.15rem;
  line-height: 1.9;
  color: #5D4E37;
  margin-bottom: 1.25rem;
  text-align: justify;
}

.intro-text:last-child {
  margin-bottom: 0;
}

.intro-text strong {
  color: #8B5A2B;
  font-weight: 600;
  position: relative;
}

.intro-text strong::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #D4A574, transparent);
  opacity: 0.3;
}

.intro-text.highlight {
  font-size: 1.2rem;
  font-style: italic;
  color: #8B5A2B;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(139, 90, 43, 0.2);
  text-align: center;
}

/* Carousel Styles */
.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2;
}

.carousel-wrapper {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 1rem 0;
}

.carousel-wrapper::-webkit-scrollbar {
  display: none;
}

.image-card {
  flex: 0 0 280px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(139, 90, 43, 0.15);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  position: relative;
}

.image-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 16px 48px rgba(139, 90, 43, 0.3);
}

.image-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: rgba(139, 90, 43, 0.05);
  position: relative;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.image-card:hover .card-image {
  transform: scale(1.15) rotate(2deg);
}

/* Shine Effect */
.card-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.8s ease;
}

.image-card:hover .card-shine {
  transform: translateX(100%);
}

.card-content {
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.card-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #D4A574, transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.image-card:hover .card-content::before {
  transform: scaleX(1);
}

.card-title {
  font-family: Georgia, serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #8B5A2B;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.image-card:hover .card-title {
  color: #6D4423;
}

.card-description {
  font-family: Georgia, serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #5D4E37;
}

.carousel-arrow {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B5A2B 0%, #6D4423 100%);
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(139, 90, 43, 0.3);
  position: relative;
  overflow: hidden;
}

.carousel-arrow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.carousel-arrow:hover:not(:disabled)::before {
  width: 100%;
  height: 100%;
}

.carousel-arrow:hover:not(:disabled) {
  transform: scale(1.15);
  box-shadow: 0 8px 24px rgba(139, 90, 43, 0.4);
}

.carousel-arrow:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.modal-content {
  position: relative;
  max-width: 1200px;
  width: 100%;
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #8B5A2B;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal-close:hover {
  background: #6D4423;
  transform: rotate(90deg) scale(1.1);
}

.modal-body {
  display: flex;
  gap: 2rem;
  width: 100%;
  align-items: center;
}

.modal-image-wrapper {
  flex: 1;
  max-width: 600px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.modal-image {
  width: 100%;
  height: auto;
  display: block;
}

.modal-text {
  flex: 1;
  padding: 1rem;
}

.modal-title {
  font-family: Georgia, serif;
  font-size: 2rem;
  font-weight: 600;
  color: #8B5A2B;
  margin-bottom: 1.5rem;
}

.modal-description {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #5D4E37;
}

.modal-arrow {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B5A2B 0%, #6D4423 100%);
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-arrow:hover {
  background: linear-gradient(135deg, #6D4423 0%, #5a3519 100%);
  transform: scale(1.15);
}

.modal-arrow.left {
  margin-right: auto;
}

.modal-arrow.right {
  margin-left: auto;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.85) translateY(50px);
}

@media (max-width: 768px) {
  .udogodnienia-wrapper {
    padding: 3rem 1rem;
  }

  .background-image-container {
    width: 90%;
    height: 300px;
  }

  .background-center-image {
    opacity: 0.5;
  }

  .intro-section {
    margin-bottom: 3rem;
  }

  .section-heading {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .intro-text-container {
    padding: 1.5rem;
  }

  .intro-text {
    font-size: 1rem;
    text-align: left;
    margin-bottom: 1rem;
  }

  .intro-text.highlight {
    font-size: 1.05rem;
    margin-top: 1rem;
    padding-top: 1rem;
  }

  .carousel-container {
    gap: 0.5rem;
  }

  .carousel-wrapper {
    gap: 1rem;
  }

  .image-card {
    flex: 0 0 240px;
  }

  .image-wrapper {
    height: 160px;
  }

  .card-content {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .card-description {
    font-size: 0.85rem;
  }

  .carousel-arrow {
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-content {
    padding: 1.5rem;
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-body {
    flex-direction: column;
  }

  .modal-image-wrapper {
    max-width: 100%;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-description {
    font-size: 1rem;
  }

  .modal-arrow {
    display: none;
  }
}
</style>