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
        <div 
          v-for="(trail, index) in trails" 
          :key="index"
          class="trail-card"
          @click="focusTrail(trail)"
          @mouseenter="highlightTrail(trail)"
          @mouseleave="unhighlightTrail"
          :class="{ active: selectedTrail?.id === trail.id, highlighted: highlightedTrail?.id === trail.id }"
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

      <!-- Mapa -->
      <div class="map-container">
        <div id="map" ref="mapContainer"></div>
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
  // Dynamiczny import Leaflet (tylko po stronie klienta)
  if (process.client) {
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

  .trail-card {
    padding: 1rem;
  }

  .trail-info h3 {
    font-size: 1rem;
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