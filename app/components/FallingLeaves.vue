<template>
  <div class="falling-snowflakes-container">
    <div
      v-for="(snowflake, index) in snowflakes"
      :key="index"
      class="snowflake"
      :style="getSnowflakeStyle(snowflake)"
    >
      {{ snowflake.icon }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Snowflake {
  icon: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

// Zimowe ikony - płatki śniegu i świąteczne elementy
const snowflakeIcons = ['❄️', '❅', '❆', '✨', '⛄', '🎄', '⭐'];

const props = defineProps({
  count: {
    type: Number,
    default: 15
  },
  color: {
    type: String,
    default: '#ffffff'
  }
});

const snowflakes = ref<Snowflake[]>([]);

const generateSnowflakes = () => {
  snowflakes.value = Array.from({ length: props.count }, () => {
    const randomIcon = snowflakeIcons[Math.floor(Math.random() * snowflakeIcons.length)];
    return {
      icon: randomIcon || '❄️',
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      delay: Math.random() * 8,
      duration: 15 + Math.random() * 15,
      size: 0.6 + Math.random() * 1.2,
      rotation: Math.random() * 360
    };
  });
};

const getSnowflakeStyle = (snowflake: Snowflake) => {
  return {
    left: `${snowflake.x}%`,
    top: `${snowflake.y}%`,
    animationDelay: `${snowflake.delay}s`,
    animationDuration: `${snowflake.duration}s`,
    fontSize: `${snowflake.size * 1.8}rem`,
    '--rotation': `${snowflake.rotation}deg`,
    '--swing': `${(Math.random() - 0.5) * 40}px`,
    '--start-y': `${snowflake.y}vh`,
    color: props.color
  };
};

onMounted(() => {
  generateSnowflakes();
});
</script>

<style scoped>
.falling-snowflakes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.snowflake {
  position: absolute;
  opacity: 0;
  animation: snowfall ease-in infinite;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))
          drop-shadow(0 0 4px rgba(173, 216, 230, 0.6));
  will-change: transform, opacity;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.9),
               0 0 20px rgba(173, 216, 230, 0.7),
               0 0 30px rgba(135, 206, 235, 0.5);
}

@keyframes snowfall {
  0% {
    transform: translateY(0) translateX(0) rotate(var(--rotation)) scale(0.8);
    opacity: 0;
  }

  10% {
    opacity: 0.9;
    transform: translateY(5vh) translateX(calc(var(--swing) * 0.3)) rotate(calc(var(--rotation) + 60deg)) scale(1);
  }

  20% {
    transform: translateY(15vh) translateX(var(--swing)) rotate(calc(var(--rotation) + 120deg)) scale(1.1);
  }

  30% {
    opacity: 0.95;
  }

  40% {
    transform: translateY(30vh) translateX(calc(var(--swing) * -0.4)) rotate(calc(var(--rotation) + 240deg)) scale(0.95);
  }

  50% {
    opacity: 0.9;
    transform: translateY(45vh) translateX(calc(var(--swing) * 0.6)) rotate(calc(var(--rotation) + 360deg)) scale(1.05);
  }

  60% {
    transform: translateY(60vh) translateX(calc(var(--swing) * -0.3)) rotate(calc(var(--rotation) + 480deg)) scale(0.9);
  }

  75% {
    opacity: 0.8;
    transform: translateY(75vh) translateX(calc(var(--swing) * 0.5)) rotate(calc(var(--rotation) + 600deg)) scale(1);
  }

  85% {
    opacity: 0.6;
  }

  95% {
    opacity: 0.3;
  }

  100% {
    transform: translateY(95vh) translateX(calc(var(--swing) * -0.2)) rotate(calc(var(--rotation) + 720deg)) scale(0.7);
    opacity: 0;
  }
}

/* Dodatkowa animacja dla świątecznych gwiazdek */
.snowflake:nth-child(5n) {
  animation: twinkle ease-in-out infinite, snowfall ease-in infinite;
}

@keyframes twinkle {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))
            drop-shadow(0 0 4px rgba(173, 216, 230, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 1))
            drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
  }
}

/* Responsywność */
@media (max-width: 768px) {
  .snowflake {
    font-size: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .snowflake {
    animation: none;
    opacity: 0.3;
  }
}
</style>
