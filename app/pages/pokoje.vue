<template>
  <div class="pokoje-wrapper">
    <div class="pokoje-content">
      <NuxtLink to="/">
        <button class="back-button">← Powrót na stronę główną</button>
      </NuxtLink>

      <h1 class="pokoje-title">
        {{ guestFilter && parseInt(guestFilter) >= 2 ? 'Pokoje i Dom w Gościńcu' : 'Pokoje w Gościńcu' }}
      </h1>

      <p v-if="guestFilter" class="pokoje-description">
        Wyświetlane opcje dla {{ guestFilter }} {{ parseInt(guestFilter) === 1 ? 'osoby' : 'osób' }} i więcej
        ({{ filteredRooms.length }} {{ filteredRooms.length === 1 ? 'opcja' : 'opcji' }})
      </p>

      <p class="pokoje-description">
        {{
          guestFilter && parseInt(guestFilter) >= 2
            ? 'Zapraszamy do komfortowych pokoi w naszym gościńcu oraz całego domu łemkowskiego. Każde zakwaterowanie zostało urządzone z myślą o Państwa wygodzie i relaksie podczas pobytu w Bieszczadach.'
            : 'Zapraszamy do komfortowych pokoi w naszym gościńcu. Każdy pokój został urządzony z myślą o Państwa wygodzie i relaksie podczas pobytu w Bieszczadach.'
        }}
      </p>

      <div class="room-grid">
        <div
          v-for="(room, index) in filteredRooms"
          :key="index"
          class="room-card clickable"
          @click="handleRoomClick(room.name)"
        >
          <img :src="room.image" :alt="room.name" class="room-image" />
          <div class="room-info">
            <h3 class="room-name">{{ room.name }}</h3>
            <div class="room-features">
              <div v-for="(feature, idx) in room.features" :key="idx" class="feature">
                {{ feature }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const guestFilter = computed(() => route.query.guests as string | undefined);

const rooms = [
  {
    name: "Pokój z łóżkiem typu king-size i balkonem",
    image: "https://www.dropbox.com/scl/fi/e4hte9ciiziiqzftd93j3/king-size1.webp?rlkey=uegtcgjaz743uhjwofj7su3k4&st=rmurtbzw&dl=0&raw=1",
    features: ["2 osoby"],
    capacity: 2
  },
  {
    name: "Pokój Dwuosobowy typu Deluxe",
    image: "https://www.dropbox.com/scl/fi/rv4tj8e881nkxiodmu5ou/pokoj2x2.webp?rlkey=z077lvjzpkzbyyglhowbewsbz&st=fmnqly87&dl=0&raw=1",
    features: ["2 osoby"],
    capacity: 2
  },
  {
    name: "Dwupoziomowy pokój czteroosobowy",
    image: "https://www.dropbox.com/scl/fi/sfyhsopbyfo5v5rxp8grg/dwupoziomowy1.webp?rlkey=x0lv8ooun9qgvgh2tnuznn3dt&e=1&st=ah9n8264&dl=0&raw=1",
    features: ["4 osoby"],
    capacity: 4
  },
  {
    name: "Apartament typu Suite z balkonem",
    image: "https://www.dropbox.com/scl/fi/skvhk6mmia2bcrq96covi/apartament2.webp?rlkey=joe9ycr28ra3lt8nn24hktadu&st=1vcdo2g2&dl=0&raw=1",
    features: ["7 osoby"],
    capacity: 7
  },
  {
    name: "Pokój Czteroosobowy",
    image: "https://www.dropbox.com/scl/fi/pxkuo43lm6ivs9tyeswoy/4pokoje4.webp?rlkey=c8oozv5vr1ycrr6t9xzymszou&st=hkqfea89&dl=0&raw=1",
    features: ["4 osoby"],
    capacity: 4
  },
  {
    name: "Pokój trzyosobowy",
    image: "https://www.dropbox.com/scl/fi/k34c4ttrowbvm6vnf6c0w/3osoby1.webp?rlkey=v1zsjqkdtey2qy2hahnysufkd&st=3s5a4fkg&dl=0&raw=1",
    features: ["3 osoby"],
    capacity: 3
  },
  {
    name: "Apartament z 2 sypialniami",
    image: "https://www.dropbox.com/scl/fi/4nwrqf6zkynjqzoi3nvh1/ostatni1.webp?rlkey=eu4e60nzcmo2mkey8y1qu0hbe&st=6hu4wxtw&dl=0&raw=1",
    features: ["6 osoby"],
    capacity: 6
  }
];

const domek = {
  name: "Dom łemkowski",
  image: "https://www.dropbox.com/scl/fi/afd6esapqluindrfe2dd6/domek1.webp?rlkey=unewhp9t5o2j4z83fgiwmsk55&st=5ub74o8e&dl=0&raw=1",
  features: ["10 osób", "3 sypialnie", "Cały dom"],
  capacity: 10
};

const filteredRooms = computed(() => {
  if (!guestFilter.value) return rooms;

  const guestCount = parseInt(guestFilter.value);
  const filteredRoomsList = rooms.filter(room => room.capacity >= guestCount);

  // Add domek option for 2+ guests
  if (guestCount >= 2) {
    filteredRoomsList.unshift(domek);
  }

  return filteredRoomsList;
});

const handleRoomClick = (roomName: string) => {
  if (roomName === "Pokój z łóżkiem typu king-size i balkonem") {
    router.push('/pokoje-details');
  }
  if (roomName === "Pokój Dwuosobowy typu Deluxe") {
    router.push('/pokoje-deluxe');
  }
  if (roomName === "Dwupoziomowy pokój czteroosobowy") {
    router.push('/pokoje-poziom');
  }
  if (roomName === "Apartament typu Suite z balkonem") {
    router.push('/pokoje-suite');
  }
  if (roomName === "Pokój Czteroosobowy") {
    router.push('/pokoje-cztery');
  }
  if (roomName === "Pokój trzyosobowy") {
    router.push('/pokoje-trzy');
  }
  if (roomName === "Apartament z 2 sypialniami") {
    router.push('/pokoje-apartament');
  }
  if (roomName === "Dom łemkowski") {
    router.push('/domek');
  }
};
</script>

<style scoped>
.pokoje-wrapper {
  background: linear-gradient(135deg, rgba(26, 27, 26, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%),
    url('https://www.dropbox.com/scl/fi/ghymow5b5eu6ilt5zh7ac/udogodnienia_bg.webp?rlkey=8zjg81t5iehlkmocf6wsca94p&st=dpk8ngjh&dl=0&raw=1');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.pokoje-content {
  max-width: 1200px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.pokoje-title {
  font-family: Georgia, serif;
  font-size: 3rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .pokoje-title {
    font-size: 2rem;
  }
}

.pokoje-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.room-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.room-card.clickable {
  cursor: pointer;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.room-card.clickable:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.room-card.clickable:active {
  transform: translateY(-3px);
}

.room-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.room-info {
  padding: 1.5rem;
}

.room-name {
  font-family: Georgia, serif;
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.room-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature {
  background: rgba(124, 112, 76, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #2c3e50;
}

.back-button {
  background: #7c704c;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.back-button:hover {
  background: #5d5436;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
