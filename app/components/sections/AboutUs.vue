<template>
  <div class="about-us-wrapper">
    <div class="about-us-container">
      <!-- Lewa strona - miejsce na zdjęcie -->
      <div class="image-section">
        <div class="image-placeholder">
          <!-- Tu można dodać zdjęcie -->
        </div>
      </div>

      <!-- Prawa strona - tekst z animacją -->
      <div ref="textSection" class="text-section" :class="{ 'is-visible': isVisible }">
        <div class="text-content">
          <p class="text-paragraph">
            Nasz gościniec to miejsce stworzone z pasją i sercem przez rodzinę – Mirka i Kasię.
            Położony przy malowniczym szlaku Małego Króla, otoczony spokojnym lasem i siecią urokliwych
            ścieżek spacerowych, oferuje prawdziwy odpoczynek z dala od miejskiego zgiełku.
          </p>
          <p class="text-paragraph">
            To więcej niż nocleg – to dom, w którym goście stają się częścią naszej historii.
            Z miłością dbamy o każdy detal, aby Państwa pobyt był niezapomniany. Nasze domowe
            specjały – aromatyczne syropy i świeżo wyciskane soki z lokalnych owoców – to smak
            natury, który zabierzecie ze sobą w sercu.
          </p>
          <p class="text-paragraph">
            Zapraszamy do nas – do miejsca, gdzie czas zwalnia, las szumi tuż za oknem, a poranek
            wita śpiewem ptaków. Tutaj odnajdziecie spokój, ciepło i autentyczność górskiej gościnności.
          </p>
          <p class="text-signature">
            Serdecznie zapraszamy!<br />
            <strong>Mirek i Kasia</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const isVisible = ref(false);
const textSection = ref(null);

onMounted(async () => {
  await nextTick();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        } else {
          isVisible.value = false;
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px' }
  );

  if (textSection.value) {
    observer.observe(textSection.value);
  }
});
</script>

<style scoped>
.about-us-wrapper {
  width: 100%;
  background: linear-gradient(to bottom, rgba(139, 90, 43, 0.03), rgba(139, 90, 43, 0.08));
  padding: 4rem 2rem;
}

.about-us-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  width: 100%;
  height: 500px;
  background: rgba(139, 90, 43, 0.1);
  border-radius: 12px;
  border: 2px solid #D4A574;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8B5A2B;
  font-size: 1.2rem;
  font-family: Georgia, serif;
}

.text-section {
  opacity: 0;
  transform: translateX(100px);
  transition: all 1.2s ease-out;
}

.text-section.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.text-content {
  color: #5D4E37;
}

.text-paragraph {
  font-family: Georgia, serif;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: justify;
}

.text-signature {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-top: 2rem;
  text-align: right;
  color: #8B5A2B;
}

.text-signature strong {
  font-size: 1.3rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .about-us-wrapper {
    padding: 3rem 1rem;
  }

  .about-us-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .image-placeholder {
    height: 300px;
  }

  .text-section {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  .text-paragraph {
    font-size: 1rem;
    text-align: left;
  }

  .text-signature {
    text-align: center;
    font-size: 1rem;
  }

  .text-signature strong {
    font-size: 1.1rem;
  }
}
</style>
