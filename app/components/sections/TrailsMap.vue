<!-- components/sections/TrailsMap.vue -->
<template>
  <section class="trails-section">
    <FallingLeaves :count="30" color="#8B6F47" />
    <div class="trails-header">
      <h2>🥾 Najlepsze szlaki w okolicy</h2>
      <p>Odkryj piękno Bieszczadzkiego Parku Narodowego</p>
    </div>

    <div class="trails-container">
      <!-- Lista szlaków -->
      <div class="trails-list">
        <!-- Strzałka w lewo (mobile carousel) -->
        <button
          class="mobile-trail-arrow left"
          @click="previousTrail"
          :disabled="currentTrailIndex === 0"
          aria-label="Poprzedni szlak"
        >
          ‹
        </button>

        <!-- Desktop: wszystkie karty, Mobile: tylko aktywna karta -->
        <div class="trails-wrapper">
          <div
            v-for="(trail, index) in trails"
            :key="index"
            class="trail-card"
            :class="{
              active: selectedTrail?.id === trail.id,
              highlighted: highlightedTrail?.id === trail.id,
              'mobile-active': currentTrailIndex === index
            }"
            @click="focusTrail(trail)"
            @mouseenter="highlightTrail(trail)"
            @mouseleave="unhighlightTrail"
          >
            <div class="trail-number">#{{ index + 1 }}</div>
            <div class="trail-info">
              <h3>{{ trail.name }}</h3>
              <div class="trail-meta">
                <span class="rating">⭐ {{ trail.rating }}</span>
                <span class="difficulty">{{ trail.difficulty }}</span>
                <span class="distance">{{ trail.distance }} km</span>
                <span class="time">{{ trail.time }}</span>
              </div>
              <p class="trail-description">{{ trail.description }}</p>
            </div>
          </div>
        </div>

        <!-- Strzałka w prawo (mobile carousel) -->
        <button
          class="mobile-trail-arrow right"
          @click="nextTrail"
          :disabled="currentTrailIndex === trails.length - 1"
          aria-label="Następny szlak"
        >
          ›
        </button>

        <!-- Wskaźniki (mobile) -->
        <div class="mobile-trail-indicators">
          <span
            v-for="(_, index) in trails"
            :key="`indicator-${index}`"
            class="trail-indicator"
            :class="{ active: currentTrailIndex === index }"
            @click="goToTrail(index)"
          ></span>
        </div>
      </div>

      <!-- Mapa -->
      <div class="map-container">
        <div id="map" ref="mapContainer"></div>
        <!-- Overlay dla mobile - blokuje interakcję z mapą -->
        <div
          v-if="showMapOverlay"
          class="map-overlay"
          @click="activateMap"
        >
          <div class="map-overlay-content">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="touch-icon">
              <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"/>
            </svg>
            <p class="map-overlay-text">Dotknij aby aktywować mapę</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mapContainer = ref(null)
let map = null
let markers = []
let trailLines = []
const selectedTrail = ref(null)
const highlightedTrail = ref(null)
const showMapOverlay = ref(false)
const currentTrailIndex = ref(0)

// Sprawdź czy to urządzenie mobilne
const checkMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768
  }
  return false
}

// Aktywuj mapę (usuń overlay)
const activateMap = () => {
  showMapOverlay.value = false
}

// Funkcje nawigacji karuzelki (mobile)
const nextTrail = () => {
  if (currentTrailIndex.value < trails.value.length - 1) {
    currentTrailIndex.value++
    focusTrail(trails.value[currentTrailIndex.value])
  }
}

const previousTrail = () => {
  if (currentTrailIndex.value > 0) {
    currentTrailIndex.value--
    focusTrail(trails.value[currentTrailIndex.value])
  }
}

const goToTrail = (index) => {
  currentTrailIndex.value = index
  focusTrail(trails.value[index])
}

// Dane szlaków w Bieszczadach
const trails = ref([
  {
    id: 1,
    name: 'Wołosate - Tarnica',
    rating: '4.6',
    difficulty: 'Umiarkowany',
    distance: '10.0',
    time: '4-4.5 godz.',
    description: 'Piękna i widokowa trasa prowadząca na Tarnicę, najwyższy szczyt w polskich Bieszczadach (1346 m n.p.m.).',
    coordinates: [
      [49.0550, 22.7500],
      [49.0650, 22.7400],
      [49.0750, 22.7350],
      [49.0833, 22.7333]
    ],
    lat: 49.0833,
    lng: 22.7333,
    color: '#e63946'
  },
  {
    id: 2,
    name: 'Wołosate - Tarnica - Halicz - Rozsypaniec',
    rating: '4.8',
    difficulty: 'Trudny',
    distance: '20.6',
    time: '7-7.5 godz.',
    description: 'Piękna trasa po odkrytych graniach, obfitująca we wspaniałe widoki. Bardzo popularna pętla w Bieszczadach.',
    coordinates: [
      [49.0550, 22.7500],
      [49.0600, 22.7450],
      [49.0500, 22.7500],
      [49.0450, 22.7550]
    ],
    lat: 49.0500,
    lng: 22.7500,
    color: '#f77f00'
  },
  {
    id: 3,
    name: 'Wetlina - Połonina Wetlińska - Chatka Puchatka',
    rating: '4.8',
    difficulty: 'Trudny',
    distance: '21.1',
    time: '7.5-8.5 godz.',
    description: 'Niesamowita trasa przez grzbiet Połoniny Wetlińskiej, na końcu którego znajduje się kultowy schron turystyczny Chatka Puchatka.',
    coordinates: [
      [49.1400, 22.4700],
      [49.1350, 22.4750],
      [49.1333, 22.4833],
      [49.1300, 22.4900]
    ],
    lat: 49.1333,
    lng: 22.4833,
    color: '#06a77d'
  },
  {
    id: 4,
    name: 'Muczne - Bukowe Berdo',
    rating: '4.7',
    difficulty: 'Umiarkowany',
    distance: '12.5',
    time: '5-6 godz.',
    description: 'Wspaniały szlak przez bukowe lasy prowadzący na Bukowe Berdo z przepięknymi widokami na Bieszczady.',
    coordinates: [
      [49.1200, 22.6100],
      [49.1180, 22.6150],
      [49.1167, 22.6167],
      [49.1150, 22.6200]
    ],
    lat: 49.1167,
    lng: 22.6167,
    color: '#4361ee'
  },
  {
    id: 5,
    name: 'Ustrzyki Górne - Połonina Caryńska',
    rating: '4.5',
    difficulty: 'Umiarkowany',
    distance: '15.2',
    time: '6-7 godz.',
    description: 'Klasyczna trasa bieszczadzka prowadząca przez połoniny z widokami na otaczające szczyty.',
    coordinates: [
      [49.0700, 22.6700],
      [49.0680, 22.6750],
      [49.0667, 22.6833],
      [49.0650, 22.6900]
    ],
    lat: 49.0667,
    lng: 22.6833,
    color: '#7209b7'
  },
  {
    id: 6,
    name: 'Przełęcz Wyżna - Krzemień',
    rating: '4.6',
    difficulty: 'Łatwy',
    distance: '8.3',
    time: '3-4 godz.',
    description: 'Stosunkowo łatwy szlak na jeden z najbardziej widokowych szczytów Bieszczad.',
    coordinates: [
      [49.0400, 22.7900],
      [49.0360, 22.7920],
      [49.0333, 22.8000],
      [49.0300, 22.8050]
    ],
    lat: 49.0333,
    lng: 22.8000,
    color: '#d62828'
  }
])

const highlightTrail = (trail) => {
  highlightedTrail.value = trail
  
  if (!map) return
  
  // Podświetl linię szlaku na mapie
  trailLines.forEach(line => {
    if (line.trail.id === trail.id) {
      line.setStyle({
        weight: 6,
        opacity: 1,
        color: trail.color
      })
      line.bringToFront()
    } else {
      line.setStyle({
        weight: 3,
        opacity: 0.4
      })
    }
  })
  
  // Podświetl marker
  markers.forEach(marker => {
    if (marker.trail.id === trail.id) {
      const element = marker.getElement()
      if (element) {
        element.style.transform = 'scale(1.2)'
        element.style.zIndex = '1000'
      }
    }
  })
}

const unhighlightTrail = () => {
  highlightedTrail.value = null
  
  if (!map) return
  
  // Przywróć normalny wygląd linii
  trailLines.forEach(line => {
    line.setStyle({
      weight: 3,
      opacity: 0.7
    })
  })
  
  // Przywróć normalny rozmiar markerów
  markers.forEach(marker => {
    const element = marker.getElement()
    if (element) {
      element.style.transform = 'scale(1)'
    }
  })
}

const focusTrail = (trail) => {
  selectedTrail.value = trail
  if (map) {
    map.setView([trail.lat, trail.lng], 13)
    
    // Pokaż popup dla wybranego szlaku
    markers.forEach(marker => {
      if (marker.trail.id === trail.id) {
        marker.openPopup()
      }
    })
  }
}

onMounted(async () => {
  // Sprawdź czy to mobile i pokaż overlay
  if (checkMobile()) {
    showMapOverlay.value = true
  }

  // Dynamiczny import Leaflet (tylko po stronie klienta)
  if (typeof window !== 'undefined') {
    try {
      const L = await import('leaflet')
      
      // Inicjalizacja mapy
      map = L.map(mapContainer.value).setView([49.1, 22.6], 11)
      
      // Dodaj warstwę OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map)
      
      // Dodaj linie szlaków
      trails.value.forEach((trail) => {
        const polyline = L.polyline(trail.coordinates, {
          color: trail.color,
          weight: 3,
          opacity: 0.7,
          smoothFactor: 1
        }).addTo(map)
        
        polyline.trail = trail
        trailLines.push(polyline)
        
        // Interakcja z linią szlaku
        polyline.on('mouseover', () => {
          highlightTrail(trail)
        })
        
        polyline.on('mouseout', () => {
          unhighlightTrail()
        })
        
        polyline.on('click', () => {
          focusTrail(trail)
        })
      })
      
      // Dodaj markery dla każdego szlaku
      trails.value.forEach((trail, index) => {
        const marker = L.marker([trail.lat, trail.lng], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin" style="background-color: ${trail.color}">${index + 1}</div>`,
            iconSize: [30, 40],
            iconAnchor: [15, 40]
          })
        }).addTo(map)
        
        marker.bindPopup(`
          <div class="popup-content">
            <h3>${trail.name}</h3>
            <p><strong>⭐ ${trail.rating}</strong> • ${trail.difficulty}</p>
            <p>${trail.distance} km • ${trail.time}</p>
          </div>
        `)
        
        marker.trail = trail
        markers.push(marker)
        
        marker.on('click', () => {
          focusTrail(trail)
        })
        
        marker.on('mouseover', () => {
          highlightTrail(trail)
        })
        
        marker.on('mouseout', () => {
          unhighlightTrail()
        })
      })
    } catch (error) {
      console.error('Błąd ładowania mapy:', error)
    }
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
.trails-section {
  width: 100%;
  padding: 4rem 2rem;
  background-color: #f5f1e8;
  position: relative;
  overflow: hidden;
}

.trails-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.trails-header h2 {
  font-size: 2.5rem;
  color: #8B6F47;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.trails-header p {
  font-size: 1.2rem;
  color: #666;
}

.trails-container {
  display: grid;
  grid-template-columns: 500px 1fr;
  background: white;
  box-shadow: 0 4px 20px rgba(139, 111, 71, 0.15);
  max-width: 1400px;
  margin: 0 auto;
  height: 800px;
  position: relative;
  z-index: 2;
}

/* Lista szlaków */
.trails-list {
  padding: 2rem;
  overflow-y: auto;
  border-right: 2px solid #e5e5e5;
}

.trail-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #f9f7f4;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.trail-card:hover,
.trail-card.highlighted {
  background: #f0ebe3;
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(139, 111, 71, 0.3);
}

.trail-card.active {
  border-color: #8B6F47;
  background: #fff;
}

.trail-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #8B6F47;
  min-width: 40px;
  transition: transform 0.3s ease;
}

.trail-card.highlighted .trail-number {
  transform: scale(1.2);
}

.trail-info h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.trail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.trail-meta span {
  padding: 0.2rem 0.6rem;
  background: white;
  border-radius: 4px;
  white-space: nowrap;
}

.rating {
  color: #f59e0b;
  font-weight: 600;
}

.difficulty {
  color: #8B6F47;
}

.distance, .time {
  color: #666;
}

.trail-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
}

/* Mapa */
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
}

/* Map Overlay - blokuje interakcję na mobile */
.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(139, 111, 71, 0.85);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.map-overlay:hover {
  background: rgba(139, 111, 71, 0.9);
}

.map-overlay-content {
  text-align: center;
  color: white;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.touch-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.map-overlay-text {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.5px;
}

/* Mobile carousel elements - ukryte na desktop */
.mobile-trail-arrow {
  display: none;
}

.mobile-trail-indicators {
  display: none;
}

.trails-wrapper {
  width: 100%;
}

/* Scrollbar */
.trails-list::-webkit-scrollbar {
  width: 8px;
}

.trails-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.trails-list::-webkit-scrollbar-thumb {
  background: #8B6F47;
  border-radius: 4px;
}

/* Responsywność */
@media (max-width: 1024px) {
  .trails-container {
    grid-template-columns: 1fr;
    height: auto;
  }

  .trails-list {
    border-right: none;
    border-bottom: 2px solid #e5e5e5;
    max-height: 600px;
  }

  .map-container {
    min-height: 500px;
  }
}

@media (max-width: 768px) {
  .trails-section {
    padding: 2rem 0;
  }

  .trails-header h2 {
    font-size: 2rem;
  }

  /* Mobile carousel styling */
  .trails-list {
    position: relative;
    padding: 1rem;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .trails-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .trail-card {
    padding: 1.5rem;
    margin-bottom: 0;
    display: none; /* Ukryj wszystkie karty */
  }

  .trail-card.mobile-active {
    display: flex; /* Pokaż tylko aktywną kartę */
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .trail-info h3 {
    font-size: 1.1rem;
  }

  /* Strzałki mobile carousel */
  .mobile-trail-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: #8B6F47;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .mobile-trail-arrow:hover:not(:disabled) {
    background: #6D4423;
    transform: translateY(-50%) scale(1.1);
  }

  .mobile-trail-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .mobile-trail-arrow.left {
    left: -5px;
  }

  .mobile-trail-arrow.right {
    right: -5px;
  }

  /* Wskaźniki mobile */
  .mobile-trail-indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 1rem;
  }

  .trail-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d9d9d9;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .trail-indicator.active {
    background: #8B6F47;
    width: 24px;
    border-radius: 4px;
  }

  .map-container {
    min-height: 400px;
  }
}
</style>

<style>
/* Globalne style dla Leaflet */
@import 'leaflet/dist/leaflet.css';

.custom-marker .marker-pin {
  width: 30px;
  height: 30px;
  color: white;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.custom-marker .marker-pin::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.leaflet-popup-content-wrapper {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.popup-content h3 {
  color: #8B6F47;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.popup-content p {
  margin: 0.3rem 0;
  color: #666;
  font-size: 0.9rem;
}

.leaflet-interactive {
  cursor: pointer;
}
</style>