<template>
  <div class="falling-leaves-container">
    <div
      v-for="(leaf, index) in leaves"
      :key="index"
      class="leaf"
      :style="getLeafStyle(leaf)"
    >
      {{ leaf.icon }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Leaf {
  icon: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

// Różne ikony liści (Unicode) - można użyć SVG zamiast tego
const leafIcons = ['🍂', '🍁', '🍃'];

const props = defineProps({
  count: {
    type: Number,
    default: 15
  },
  color: {
    type: String,
    default: '#af4c1e'
  }
});

const leaves = ref<Leaf[]>([]);

const generateLeaves = () => {
  leaves.value = Array.from({ length: props.count }, () => {
    const randomIcon = leafIcons[Math.floor(Math.random() * leafIcons.length)];
    return {
      icon: randomIcon || '🍂',
      x: Math.random() * 100, // pozycja X w %
      y: Math.random() * 100, // pozycja startowa Y w % wysokości sekcji
      delay: Math.random() * 10, // opóźnienie startu animacji (0-10s)
      duration: 10 + Math.random() * 10, // czas trwania animacji (10-20s)
      size: 0.5 + Math.random() * 1, // rozmiar (0.5-1.5)
      rotation: Math.random() * 360 // początkowa rotacja
    };
  });
};

const getLeafStyle = (leaf: Leaf) => {
  return {
    left: `${leaf.x}%`,
    top: `${leaf.y}%`,
    animationDelay: `${leaf.delay}s`,
    animationDuration: `${leaf.duration}s`,
    fontSize: `${leaf.size * 2}rem`,
    '--rotation': `${leaf.rotation}deg`,
    '--swing': `${(Math.random() - 0.5) * 30}px`,
    '--start-y': `${leaf.y}vh`,
    color: props.color
  };
};

onMounted(() => {
  generateLeaves();
});
</script>

<style scoped>
.falling-leaves-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.leaf {
  position: absolute;
  opacity: 0;
  animation: fall linear infinite;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
  will-change: transform, opacity;
}

@keyframes fall {
  0% {
    transform: translateY(0) translateX(0) rotate(var(--rotation)) scale(1);
    opacity: 0;
  }

  5% {
    opacity: 0.7;
  }

  10% {
    opacity: 0.8;
  }

  25% {
    transform: translateY(15vh) translateX(var(--swing)) rotate(calc(var(--rotation) + 180deg)) scale(1.1);
  }

  50% {
    transform: translateY(35vh) translateX(calc(var(--swing) * -0.5)) rotate(calc(var(--rotation) + 360deg)) scale(0.9);
  }

  75% {
    transform: translateY(55vh) translateX(var(--swing)) rotate(calc(var(--rotation) + 540deg)) scale(1.05);
    opacity: 0.6;
  }

  90% {
    opacity: 0.3;
  }

  100% {
    transform: translateY(70vh) translateX(calc(var(--swing) * -0.2)) rotate(calc(var(--rotation) + 720deg)) scale(0.8);
    opacity: 0;
  }
}

/* Alternatywna animacja dla bardziej naturalnego ruchu */
@keyframes sway {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(var(--swing));
  }
}

/* Responsywność */
@media (max-width: 768px) {
  .leaf {
    font-size: 1.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .leaf {
    animation: none;
    opacity: 0.2;
  }
}
</style>
