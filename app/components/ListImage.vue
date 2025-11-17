<template>
  <div>
    <div class="list-image-wrapper">
      <img
        :src="src"
        :alt="alt"
        class="item"
        @click="open"
      />
      <div class="item-overlay">
        <p>{{ hoverDesc }}</p>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click="close"
        role="dialog"
        aria-modal="true"
      >
        <div @click.stop class="modal-content">
          <img
            :src="src"
            :alt="alt"
            class="modal-image"
          />
          <div v-if="hoverDesc" class="modal-caption">{{ hoverDesc }}</div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  src: string;
  alt: string;
  hoverDesc?: string;
}

const props = defineProps<Props>();

const isOpen = ref(false);

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close();
};

onMounted(() => {
  window.addEventListener('keydown', onKey);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKey);
});
</script>

<style scoped>
.list-image-wrapper {
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
}

.item {
  width: 100%;
  height: 250px;
  object-fit: cover;
  cursor: pointer;
}

.item-overlay {
  opacity: 0;
  position: absolute;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: #f4f0d4;
  text-shadow: 3px 3px 6px #af4c1e, 4px 4px 8px #000000;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.item-overlay p {
  width: 90%;
  margin: 0 auto;
  font-family: Georgia, serif;
  font-size: 1.2rem;
  text-align: center;
  letter-spacing: 0.5px;
  padding: 0 10px;
  max-height: 90%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  line-height: 1.4;
}

.list-image-wrapper:hover .item-overlay {
  opacity: 1;
  pointer-events: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
}

.modal-caption {
  margin-top: 16px;
  color: #f4f0d4;
  text-shadow: 3px 3px 6px #af4c1e, 4px 4px 8px #000000;
  font-family: Georgia, serif;
  font-size: 1.1rem;
  max-width: 90vw;
  text-align: center;
  padding: 0 12px;
}
</style>
