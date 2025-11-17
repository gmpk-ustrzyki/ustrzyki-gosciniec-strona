<template>
  <a
    :href="linkHref"
    class="nav-link-wrapper"
    @click="handleClick"
  >
    {{ value }}
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  value: string;
}

const props = defineProps<Props>();
const router = useRouter();

const valueLower = computed(() => (props.value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));

// Określ typ linku i jego ścieżkę
const linkData = computed(() => {
  const v = valueLower.value.replace(/\s+/g, ' ').trim();

  if (v.includes('regulamin') || v.includes('regukamin')) return { type: 'page', path: '/regulamin' };
  if (v.includes('domek')) return { type: 'page', path: '/domek' };
  if (v.includes('go') && v.includes('sciniec')) return { type: 'page', path: '/caly-teren' };
  if (v.includes('gosciniec') || v.includes('goscyniec')) return { type: 'page', path: '/caly-teren' };
  if (v.includes('pokoje')) return { type: 'page', path: '/pokoje' };
  if (v.includes('blog')) return { type: 'page', path: '/blog' };

  // To jest link do sekcji
  const hash = v === 'okolica' ? 'udogodnienia' : v.replace(/\s+/g, '-');
  return { type: 'section', hash };
});

const linkHref = computed(() => {
  if (linkData.value.type === 'page') {
    return linkData.value.path;
  }
  return `/#${linkData.value.hash}`;
});

const handleClick = (e: MouseEvent) => {
  console.log('Link clicked:', linkData.value);

  if (linkData.value.type === 'page' && linkData.value.path) {
    // Link do podstrony - użyj routera
    e.preventDefault();
    router.push(linkData.value.path);
  } else if (linkData.value.type === 'section' && linkData.value.hash) {
    // Link do sekcji - użyj window.location.href
    e.preventDefault();
    const hash = linkData.value.hash;
    console.log('Navigating to section:', hash);

    // Pełne przeładowanie strony z hashem
    window.location.href = `/#${hash}`;
  }
};
</script>

<style scoped>
.nav-link-wrapper {
  display: inline-block;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.3rem;
  line-height: normal;
  height: auto;
  white-space: normal;
  text-shadow: 2px 2px 4px #af4c1e, 3px 3px 6px #000000;
  pointer-events: auto;
}
</style>
