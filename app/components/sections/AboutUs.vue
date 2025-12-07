<template>
  <div class="about-us-wrapper">
    <div class="about-us-content">

      <!-- Główny nagłówek -->
      <div class="hero-heading">
        <p class="subtitle">Poznajcie nas</p>
        <h1 class="main-title">Mirek i Kasia</h1>
      </div>

      <div class="grid-container">
        <!-- Sekcja tekstowa -->
        <div ref="textSection" class="text-section" :class="{ 'visible': textVisible }">
          <div class="text-card">
            <p class="paragraph">
              Nasz gościniec to miejsce stworzone z <strong>pasją i sercem</strong> przez rodzinę – Mirka i Kasię.
              Położony przy malowniczym <strong>szlaku Małego Króla</strong>, otoczony spokojnym lasem i siecią urokliwych ścieżek spacerowych,
              oferuje prawdziwy odpoczynek z dala od miejskiego zgiełku.
            </p>
            <p class="paragraph">
              To więcej niż nocleg – to <strong>dom</strong>, w którym goście stają się częścią naszej historii.
              Z miłością dbamy o każdy detal, aby Państwa pobyt był niezapomniany. Nasze domowe specjały – aromatyczne
              <strong>syropy</strong> i świeżo wyciskane <strong>soki</strong> z lokalnych owoców – to smak natury,
              który zabierzecie ze sobą w sercu.
            </p>
            <p class="paragraph">
              Zapraszamy do nas – do miejsca, gdzie <em>czas zwalnia</em>, las szumi tuż za oknem,
              a poranek wita śpiewem ptaków. Tutaj odnajdziecie spokój, ciepło i autentyczność górskiej gościnności.
            </p>

            <div class="signature">
              <p class="greeting">Serdecznie zapraszamy!</p>
              <p class="names">
                <span class="heart">❤</span> Mirek i Kasia
              </p>
            </div>
          </div>
        </div>

        <!-- Sekcja ze zdjęciem -->
        <div ref="imageSection" class="image-section" :class="{ 'visible': imageVisible }">
          <div class="image-container">
            <img
              src="https://www.dropbox.com/scl/fi/enrk7nxf5a9z33s7587oy/MirekiKasiabialyfon.png?rlkey=9fip7cpyt2457fg07xs3nqgb1&raw=1"
              alt="Mirek i Kasia - wlasciciele Goscinca pod Malym Krollem"
              class="profile-image"
            />
            <div class="image-border"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const textVisible = ref(false)
const imageVisible = ref(false)
const textSection = ref<HTMLElement | null>(null)
const imageSection = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === textSection.value) textVisible.value = true
          if (entry.target === imageSection.value) imageVisible.value = true
        }
      })
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
  )

  if (textSection.value) observer.observe(textSection.value)
  if (imageSection.value) observer.observe(imageSection.value)
})
</script>

<style scoped>
.about-us-wrapper {
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 50%, #fafafa 100%);
  min-height: 100vh;
  padding: 8rem 2rem 12rem;
  font-family: 'Poppins', system-ui, sans-serif;
  position: relative;
  overflow: hidden;
}

.about-us-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.hero-heading {
  margin-bottom: 7rem;
}

.subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #7c704c;
  margin: 0;
  opacity: 0.85;
}

.main-title {
  font-family: 'Poppins', sans-serif;
  font-size: 4rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  letter-spacing: 1px;
  line-height: 1.2;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7rem;
  align-items: center;
}

/* Tablet responsiveness */
@media (max-width: 992px) {
  .about-us-wrapper {
    padding: 6rem 1.5rem 8rem;
  }

  .hero-heading {
    margin-bottom: 4rem;
  }

  .main-title {
    font-size: 3.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
    letter-spacing: 3.5px;
  }

  .grid-container {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .image-section {
    order: -1;
  }

  .image-container {
    max-width: 450px;
  }

  .text-card {
    padding: 3rem;
  }

  .paragraph {
    font-size: 1.1rem;
    line-height: 1.85;
  }
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .about-us-wrapper {
    padding: 3.5rem 1rem 4rem;
    min-height: auto;
    background: #ffffff;
  }

  .hero-heading {
    margin-bottom: 2rem;
    padding: 0 0.5rem;
  }

  .main-title {
    font-size: 1.5rem;
    letter-spacing: 0.3px;
    line-height: 1.3;
  }

  .subtitle {
    font-size: 0.7rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .grid-container {
    gap: 2rem;
  }

  .text-card {
    padding: 1.8rem 1.3rem;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(124, 112, 76, 0.1);
  }

  .paragraph {
    font-size: 0.8rem;
    line-height: 1.7;
    margin-bottom: 1rem;
    text-align: justify;
    color: #7c704c;
    font-weight: 300;
    letter-spacing: 0.3px;
  }

  .paragraph strong {
    font-weight: 500;
  }

  .image-container {
    max-width: 100%;
    padding: 0 0.5rem;
  }

  .profile-image {
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .image-border {
    inset: -10px;
    border-radius: 20px;
    border: 1px solid rgba(124, 112, 76, 0.15);
  }

  .signature {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(124, 112, 76, 0.15);
  }

  .greeting {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    font-weight: 300;
  }

  .names {
    font-size: 1.2rem;
    gap: 0.5rem;
    font-weight: 400;
  }

  .heart {
    font-size: 1rem;
  }
}

/* Extra small mobile */
@media (max-width: 400px) {
  .about-us-wrapper {
    padding: 3rem 0.8rem 3.5rem;
  }

  .hero-heading {
    padding: 0 0.3rem;
  }

  .main-title {
    font-size: 1.35rem;
    line-height: 1.4;
  }

  .subtitle {
    font-size: 0.65rem;
    letter-spacing: 1.5px;
  }

  .text-card {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }

  .paragraph {
    font-size: 0.75rem;
    line-height: 1.65;
  }

  .greeting {
    font-size: 0.8rem;
  }

  .names {
    font-size: 1.1rem;
  }

  .heart {
    font-size: 0.95rem;
  }

  .image-container {
    padding: 0 0.3rem;
  }
}

.text-section {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.text-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.text-card {
  background: rgba(255, 255, 255, 0.6);
  padding: 4rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(124, 112, 76, 0.15);
  text-align: left;
  backdrop-filter: blur(10px);
}

.paragraph {
  font-family: 'Poppins', sans-serif;
  font-size: 1.15rem;
  line-height: 1.9;
  color: #7c704c;
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0.9;
}

.paragraph strong {
  color: #7c704c;
  font-weight: 500;
  opacity: 1;
}

.paragraph em {
  color: #7c704c;
  font-style: italic;
  font-weight: 300;
}

.signature {
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(124, 112, 76, 0.2);
  text-align: center;
}

.greeting {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: #7c704c;
  font-style: italic;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.names {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 500;
  color: #7c704c;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  letter-spacing: 1px;
}

.heart {
  color: #e63946;
  font-size: 1.5rem;
  animation: heartbeat 1.6s ease infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

.image-section {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0.15s;
}

.image-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.image-container {
  position: relative;
  max-width: 580px;
  margin: 0 auto;
}

.profile-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.image-container:hover .profile-image {
  transform: translateY(-5px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
}

.image-border {
  position: absolute;
  inset: -20px;
  border: 2px solid rgba(124, 112, 76, 0.2);
  border-radius: 24px;
  pointer-events: none;
  z-index: -1;
  transition: all 0.6s ease;
}

.image-container:hover .image-border {
  inset: -24px;
  border-color: rgba(124, 112, 76, 0.3);
}
</style>