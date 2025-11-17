<template>
  <div class="about-us-wrapper">

    <FallingLeaves :count="35" color="#af4c1e" />

    <div class="background-decorations">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>

    <div class="about-us-container">
      
      <div ref="textSection" class="text-section" :class="{ 'is-visible': isVisible }">
        <div class="section-label">Poznajcie nas</div>
        <h2 class="section-title">Mirek i Kasia</h2>
        <div class="text-content">
          <p class="text-paragraph">
            Nasz gościniec to miejsce stworzone z <strong>pasją i sercem</strong> przez rodzinę – Mirka i Kasię.
            Położony przy malowniczym <strong>szlaku Małego Króla</strong>, otoczony spokojnym lasem i siecią urokliwych
            ścieżek spacerowych, oferuje prawdziwy odpoczynek z dala od miejskiego zgiełku.
          </p>
          <p class="text-paragraph">
            To więcej niż nocleg – to <strong>dom</strong>, w którym goście stają się częścią naszej historii.
            Z miłością dbamy o każdy detal, aby Państwa pobyt był niezapomniany. Nasze domowe
            specjały – aromatyczne <strong>syropy</strong> i świeżo wyciskane <strong>soki</strong> z lokalnych owoców – to smak
            natury, który zabierzecie ze sobą w sercu.
          </p>
          <p class="text-paragraph">
            Zapraszamy do nas – do miejsca, gdzie <em>czas zwalnia</em>, las szumi tuż za oknem, a poranek
            wita śpiewem ptaków. Tutaj odnajdziecie spokój, ciepło i autentyczność górskiej gościnności.
          </p>
          <div class="signature-box">
            <p class="text-signature">
              Serdecznie zapraszamy!
            </p>
            <p class="signature-names">
              <span class="heart-icon">❤</span>
              Mirek i Kasia
            </p>
          </div>
        </div>
      </div>

      <div ref="imageSection" class="image-section" :class="{ 'is-visible': isImageVisible }">
        <div class="image-frame">
          <div class="frame-decoration top-left"></div>
          <div class="frame-decoration top-right"></div>
          <div class="frame-decoration bottom-left"></div>
          <div class="frame-decoration bottom-right"></div>
          
          <div class="image-wrapper">
            <img
              src="/images/about/mirek-kasia.png"
              alt="Mirek i Kasia"
              class="about-us-image"
            />
            <div class="image-glow"></div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const isVisible = ref(false);
const isImageVisible = ref(false);
const textSection = ref(null);
const imageSection = ref(null);

onMounted(async () => {
  await nextTick();

  const observerOptions = { threshold: 0.1, rootMargin: '0px' };

  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    observerOptions
  );

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isImageVisible.value = true;
        }
      });
    },
    observerOptions
  );

  if (textSection.value) {
    textObserver.observe(textSection.value);
  }

  if (imageSection.value) {
    imageObserver.observe(imageSection.value);
  }
});
</script>

<style scoped>
.about-us-wrapper {
  width: 100%;
  background: linear-gradient(135deg, #faf8f0 0%, #f5f0e8 50%, #fff8f0 100%);
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
}


.background-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 165, 116, 0.1), transparent);
  animation: float 8s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.circle-3 {
  width: 250px;
  height: 250px;
  bottom: 10%;
  left: 50%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-30px) scale(1.1);
    opacity: 0.5;
  }
}

.about-us-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}


.text-section {
  opacity: 0;
  transform: translateX(-60px) translateY(20px);
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.text-section.is-visible {
  opacity: 1;
  transform: translateX(0) translateY(0);
}

.section-label {
  font-family: Georgia, serif;
  font-size: 0.9rem;
  color: #D4A574;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards 0.3s;
}

.text-section.is-visible .section-label {
  animation: fadeInUp 0.8s ease forwards 0.3s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-family: Georgia, serif;
  font-size: 3.5rem;
  color: #8B5A2B;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.2;
  position: relative;
  display: inline-block;
  opacity: 0;
}

.text-section.is-visible .section-title {
  animation: fadeInUp 0.8s ease forwards 0.5s;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 4px;
  background: linear-gradient(to right, #D4A574, #8B5A2B);
  border-radius: 2px;
  transition: width 0.8s ease 0.8s;
}

.text-section.is-visible .section-title::after {
  width: 60%;
}

.text-content {
  background: rgba(255, 255, 255, 0.7);
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 10px 40px rgba(139, 90, 43, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(212, 165, 116, 0.2);
}

.text-paragraph {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  line-height: 1.9;
  margin-bottom: 1.5rem;
  color: #5D4E37;
  text-align: justify;
}

.text-paragraph strong {
  color: #8B5A2B;
  font-weight: 600;
  position: relative;
  padding-bottom: 2px;
}

.text-paragraph strong::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, rgba(212, 165, 116, 0.4), transparent);
}

.text-paragraph em {
  color: #8B5A2B;
  font-style: italic;
}

.signature-box {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(212, 165, 116, 0.3);
  text-align: center;
}

.text-signature {
  font-family: Georgia, serif;
  font-size: 1.15rem;
  color: #8B5A2B;
  font-style: italic;
  margin-bottom: 1rem;
}

.signature-names {
  font-family: 'Brush Script MT', cursive, Georgia, serif;
  font-size: 2rem;
  color: #8B5A2B;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.heart-icon {
  color: #D4A574;
  font-size: 1.5rem;
  animation: heartbeat 1.5s ease infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  10%, 30% {
    transform: scale(1.1);
  }
  20%, 40% {
    transform: scale(1);
  }
}


.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateX(60px) translateY(20px) scale(0.95);
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.image-section.is-visible {
  opacity: 1;
  transform: translateX(0) translateY(0) scale(1);
}

.image-frame {
  position: relative;
  width: 100%;
  max-width: 550px;
  animation: floatImage 6s ease-in-out infinite;
}

@keyframes floatImage {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(1deg);
  }
}


.frame-decoration {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 3px solid #D4A574;
  z-index: 2;
  transition: all 0.5s ease;
}

.top-left {
  top: -10px;
  left: -10px;
  border-right: none;
  border-bottom: none;
  border-radius: 8px 0 0 0;
}

.top-right {
  top: -10px;
  right: -10px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 8px 0 0;
}

.bottom-left {
  bottom: -10px;
  left: -10px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 8px;
}

.bottom-right {
  bottom: -10px;
  right: -10px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 8px 0;
}

.image-section:hover .frame-decoration {
  width: 60px;
  height: 60px;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 550px;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(139, 90, 43, 0.1));
  box-shadow: 
    0 25px 80px rgba(139, 90, 43, 0.25),
    0 15px 40px rgba(139, 90, 43, 0.15),
    inset 0 0 40px rgba(255, 255, 255, 0.1);
}

.about-us-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(1.05) contrast(1.05) saturate(1.1);
  transition: all 0.6s ease;
}

.image-section:hover .about-us-image {
  transform: scale(1.05);
  filter: brightness(1.1) contrast(1.08) saturate(1.15);
}


.image-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 20%,
    transparent 50%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.image-section:hover .image-glow {
  opacity: 1;
}

@media (max-width: 768px) {
  .about-us-wrapper {
    padding: 4rem 1.5rem;
  }

  .about-us-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .text-content {
    padding: 2rem;
  }

  .text-paragraph {
    font-size: 1rem;
    text-align: left;
  }

  .signature-names {
    font-size: 1.5rem;
  }

  .image-wrapper {
    height: 400px;
  }

  .frame-decoration {
    width: 30px;
    height: 30px;
  }

  .text-section {
    order: 2;
  }

  .image-section {
    order: 1;
  }

  .decoration-circle {
    opacity: 0.2;
  }

  .circle-1 {
    width: 150px;
    height: 150px;
  }

  .circle-2 {
    width: 120px;
    height: 120px;
  }

  .circle-3 {
    width: 130px;
    height: 130px;
  }
}
</style>