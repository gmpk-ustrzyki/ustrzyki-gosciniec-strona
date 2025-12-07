<template>
  <div class="pokoje-wrapper">
    <div class="pokoje-content">
      <!-- Przycisk powrotu – taki jak na Twoim screenie -->
      <NuxtLink to="/">
        <button class="back-button">
          Powrót na stronę główną
        </button>
      </NuxtLink>

      <!-- Tytuł -->
      <h1 class="pokoje-title">
        {{ guestFilter && parseInt(guestFilter) >= 2 ? 'Pokoje i Dom w Gościńcu' : 'Pokoje w Gościńcu' }}
      </h1>

      <!-- Podtytuł gdy jest filtrujemy po liczbie osób -->
      <p v-if="guestFilter" class="pokoje-subtitle">
        Wyświetlane opcje dla {{ guestFilter }} {{ parseInt(guestFilter) === 1 ? 'osoby' : 'osób' }} i więcej
        ({{ filteredRooms.length }} {{ filteredRooms.length === 1 ? 'opcja' : 'opcji' }})
      </p>

      <!-- Opis -->
      <p class="pokoje-description">
        {{
          guestFilter && parseInt(guestFilter) >= 2
            ? 'Zapraszamy do komfortowych pokoi w naszym gościńcu oraz całego domu łemkowskiego na wyłączność.'
            : 'Zapraszamy do przytulnych i elegancko urządzonych pokoi z widokiem na Bieszczady.'
        }}
      </p>

      <!-- Siatka pokoi -->
      <div class="room-grid">
        <div
          v-for="(room, index) in filteredRooms"
          :key="index"
          class="room-card clickable"
          @click="handleRoomClick(room.name)"
        >
          <img :src="room.image" :alt="room.name" class="room-image" loading="lazy" />
          <div class="room-info">
            <h3 class="room-name">{{ room.name }}</h3>
            <div class="room-features">
              <span v-for="(feature, idx) in room.features" :key="idx" class="feature">
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const guestFilter = computed(() => route.query.guests as string | undefined)

// Wszystkie pokoje – zdjęcia naprawione (działają!)
const rooms = [
  {
    name: "Pokój z łóżkiem typu king-size i balkonem",
    image: "https://www.dropbox.com/scl/fi/e4hte9ciiziiqzftd93j3/king-size1.webp?rlkey=uegtcgjaz743uhjwofj7su3k4&raw=1",
    features: ["2 osoby"],
    capacity: 2
  },
  {
    name: "Pokój Dwuosobowy typu Deluxe",
    image: "https://www.dropbox.com/scl/fi/rv4tj8e881nkxiodmu5ou/pokoj2x2.webp?rlkey=z077lvjzpkzbyyglhowbewsbz&raw=1",
    features: ["2 osoby"],
    capacity: 2
  },
  {
    name: "Dwupoziomowy pokój czteroosobowy",
    image: "https://www.dropbox.com/scl/fi/sfyhsopbyfo5v5rxp8grg/dwupoziomowy1.webp?rlkey=x0lv8ooun9qgvgh2tnuznn3dt&raw=1",
    features: ["4 osoby"],
    capacity: 4
  },
  {
    name: "Apartament typu Suite z balkonem",
    image: "https://www.dropbox.com/scl/fi/skvhk6mmia2bcrq96covi/apartament2.webp?rlkey=joe9ycr28ra3lt8nn24hktadu&raw=1",
    features: ["7 osób"],
    capacity: 7
  },
  {
    name: "Pokój Czteroosobowy",
    image: "https://www.dropbox.com/scl/fi/pxkuo43lm6ivs9tyeswoy/4pokoje4.webp?rlkey=c8oozv5vr1ycrr6t9xzymszou&raw=1",
    features: ["4 osoby"],
    capacity: 4
  },
  {
    name: "Pokój trzyosobowy",
    image: "https://www.dropbox.com/scl/fi/k34c4ttrowbvm6vnf6c0w/3osoby1.webp?rlkey=v1zsjqkdtey2qy2hahnysufkd&raw=1",
    features: ["3 osoby"],
    capacity: 3
  },
  {
    name: "Apartament z 2 sypialniami",
    image: "https://www.dropbox.com/scl/fi/4nwrqf6zkynjqzoi3nvh1/ostatni1.webp?rlkey=eu4e60nzcmo2mkey8y1qu0hbe&raw=1",
    features: ["6 osób"],
    capacity: 6
  }
]

const domek = {
  name: "Dom łemkowski",
  image: "https://www.dropbox.com/scl/fi/afd6esapqluindrfe2dd6/domek1.webp?rlkey=unewhp9t5o2j4z83fgiwmsk55&raw=1",
  features: ["10 osób", "3 sypialnie", "Cały dom"],
  capacity: 10
}

const filteredRooms = computed(() => {
  if (!guestFilter.value) return rooms
  const guestCount = parseInt(guestFilter.value)
  const list = rooms.filter(r => r.capacity >= guestCount)
  if (guestCount >= 2) list.unshift(domek)
  return list
})

const handleRoomClick = (roomName: string) => {
  const routes: Record<string, string> = {
    "Pokój z łóżkiem typu king-size i balkonem": '/pokoje-details',
    "Pokój Dwuosobowy typu Deluxe": '/pokoje-deluxe',
    "Dwupoziomowy pokój czteroosobowy": '/pokoje-poziom',
    "Apartament typu Suite z balkonem": '/pokoje-suite',
    "Pokój Czteroosobowy": '/pokoje-cztery',
    "Pokój trzyosobowy": '/pokoje-trzy',
    "Apartament z 2 sypialniami": '/pokoje-apartament',
    "Dom łemkowski": '/domek'
  }
  router.push(routes[roomName] ?? '/')
}
</script>

<style scoped>
.pokoje-wrapper {
  background: #ffffff;
  min-height: 100vh;
  padding: 5rem 1rem 8rem;
}

.pokoje-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

/* Przycisk powrotu – dokładnie jak na Twoim screenie */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: #7c704c;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.9rem 2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  margin-bottom: 4rem;
  box-shadow: 0 10px 25px rgba(124, 112, 76, 0.3);
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #665d3a;
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(124, 112, 76, 0.4);
}

.pokoje-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 4.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 2rem;
  line-height: 1.2;
}

@media (max-width: 968px) { .pokoje-title { font-size: 3.8rem; } }
@media (max-width: 640px) { .pokoje-title { font-size: 2.9rem; } }

.pokoje-subtitle {
  font-size: 1.4rem;
  color: #7c704c;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.pokoje-description {
  font-size: 1.3rem;
  color: #555;
  max-width: 900px;
  margin: 0 auto 5rem;
  line-height: 1.8;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.room-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  transition: all 0.4s ease;
  border: 1px solid #f5f5f5;
}

.room-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.18);
}

.room-card.clickable { cursor: pointer; }

.room-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.room-card:hover .room-image {
  transform: scale(1.06);
}

.room-info {
  padding: 2rem;
}

.room-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.2rem;
}

.room-features {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.feature {
  background: #f8f5f0;
  color: #7c704c;
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
}
</style>