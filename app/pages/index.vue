<template>
  <div>
    <SectionsNavigation />
    <SectionsHero />
    <SectionsOptions />
    <SectionsUdogodnienia />
    <LazySectionsTrailsMap />
    <SectionsReviews />
    <SectionsAboutUs />
    <SectionsMap />
    <SectionsKontakt />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Obsługa hash navigation po załadowaniu strony
onMounted(() => {
  console.log('Index page mounted, route.hash:', route.hash);

  // Jeśli URL zawiera hash, scrolluj do tego elementu
  if (route.hash) {
    console.log('Hash detected, will scroll to:', route.hash);
    setTimeout(() => {
      const hash = route.hash.substring(1); // usuń '#'
      console.log('Searching for element with id:', hash);
      const element = document.getElementById(hash);

      if (element) {
        console.log('Element found, scrolling');
        const yOffset = -80; // offset dla fixed navbar
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        console.log('Element NOT found with id:', hash);
      }
    }, 500); // Dłuższy timeout żeby wszystko się załadowało
  } else {
    console.log('No hash in URL');
  }
});
</script>
