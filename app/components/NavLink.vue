<template>
  <NuxtLink
    v-if="isRouterLink"
    :to="routePath"
    class="nav-link-wrapper"
  >
    {{ value }}
  </NuxtLink>
  <a
    v-else
    :href="anchorPath"
    class="nav-link-wrapper"
  >
    {{ value }}
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  value: string;
}

const props = defineProps<Props>();

const valueLower = computed(() => props.value.toLowerCase());

const isRouterLink = computed(() => {
  return ['regulamin', 'domek', 'gościniec', 'pokoje'].includes(valueLower.value);
});

const routePath = computed(() => {
  switch (valueLower.value) {
    case 'regulamin':
      return '/regulamin';
    case 'domek':
      return '/domek';
    case 'gościniec':
      return '/caly-teren';
    case 'pokoje':
      return '/pokoje';
    default:
      return '/';
  }
});

const anchorPath = computed(() => {
  if (valueLower.value === 'okolica') {
    return '#udogodnienia';
  }
  return `#${valueLower.value}`;
});
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
}
</style>
