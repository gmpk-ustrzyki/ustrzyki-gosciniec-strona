<template>
  <section id="pokoje" class="options-section">
    <BookingFilter @filter-options="handleFilterOptions" />

    <!-- Powiadomienie o cenach -->
    <Transition name="slide-fade">
      <div v-if="showPriceNotification" class="price-notification">
        <button class="close-btn" @click="closePriceNotification" aria-label="Zamknij">
          ×
        </button>
        <div class="notification-content">
          <h3 class="notification-title">💰 Informacja o cenach</h3>
          <p class="notification-text">
            Ceny różnią się w zależności od terminu i świąt.<br />
            Zadzwoń do nas, a podamy dokładną cenę dla wybranego okresu!
          </p>
        </div>
      </div>
    </Transition>

    <!-- Sekcja z listą pokoi - pokazuje się po wyszukaniu -->
    <div v-if="showRoomsList" class="rooms-list-section">
      <div class="rooms-container">
        <h2 class="rooms-title">
          Dostępne opcje dla {{ selectedGuests }} {{ guestsText }}
        </h2>
        <p class="rooms-subtitle">
          Znaleziono {{ filteredRooms.length }} {{ filteredRooms.length === 1 ? 'opcję' : 'opcji' }}
        </p>

        <div class="room-grid">
          <div
            v-for="(room, index) in filteredRooms"
            :key="index"
            class="room-card"
            @click="handleRoomClick(room)"
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

    <!-- Sekcja z opcjami kafelków - pokazuje się domyślnie -->
    <div v-else class="options-wrapper">
      <div class="background-images">
        <div
          v-for="(option, index) in opcje"
          :key="index"
          class="bg-image"
          :style="{
            backgroundImage: `url(${option.imgSrc})`
          }"
          :data-hover-src="option.hoverSrc"
          @click="handleOptionClick(option.route)"
          @mouseenter="(e) => handleMouseEnter(e, option.hoverSrc)"
          @mouseleave="(e) => handleMouseLeave(e, option.imgSrc)"
        >
          <div class="hover-text">{{ option.hoverText }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Option {
  imgSrc: string;
  hoverSrc: string;
  alt: string;
  hoverText: string;
  route: string;
}

interface Room {
  name: string;
  image: string;
  features: string[];
  capacity: number;
  route: string;
}

const opcje: Option[] = [
  {
    imgSrc: 'https://www.dropbox.com/scl/fi/juxbmnwnwghbxbhg4vc4x/domopcjesize.jpeg?rlkey=84dag4b83pgdttpuecycqja97&st=lqtyljzm&dl=0&raw=1',
    hoverSrc: 'https://www.dropbox.com/scl/fi/pukejeulsl2y8ei6f5t74/domhover.jpg?rlkey=4qjicicif7ulrbt635jj7afgd&st=cvk48nrf&dl=0&raw=1',
    alt: '',
    hoverText: 'Wynajmij cały domek',
    route: '/domek'
  },
  {
    imgSrc: 'https://www.dropbox.com/scl/fi/654a78kjfunzg20wtv7ew/gosciniecfonsize.jpeg?rlkey=zt1iajgdafikc5k6syjdskvqg&st=bpeg465a&dl=0&raw=1',
    hoverSrc: 'https://www.dropbox.com/scl/fi/uxf1lkq3910doqskvlstz/pokojehover.jpg?rlkey=ri2c3zjy0cqv31nyfks9t3okt&st=5va5cg89&dl=0&raw=1',
    alt: '',
    hoverText: 'Sprawdz dostępnę pokoje w gościńcu',
    route: '/pokoje'
  },
  {
    imgSrc: 'https://www.dropbox.com/scl/fi/zsuk6vsnizn6edliv1w5a/calyterenopcjesize.jpeg?rlkey=7ouphg9qxvyslqk79nrgtu1ev&st=od3tih6z&dl=0&raw=1',
    hoverSrc: 'https://www.dropbox.com/scl/fi/rcxi2pfde4j6abj5xf4h9/stawsize.jpeg?rlkey=hiwcy0naribg093z8r2bx3pmw&st=fj6z1180&dl=0&raw=1',
    alt: '',
    hoverText: 'Wynajmij cały teren z domkiem i gościńcem.',
    route: '/caly-teren'
  }
];

const rooms: Room[] = [
  {
    name: "Pokój z łóżkiem typu king-size i balkonem",
    image: "https://www.dropbox.com/scl/fi/e4hte9ciiziiqzftd93j3/king-size1.webp?rlkey=uegtcgjaz743uhjwofj7su3k4&st=rmurtbzw&dl=0&raw=1",
    features: ["2 osoby", "Łóżko king-size", "Balkon"],
    capacity: 2,
    route: '/pokoje-details'
  },
  {
    name: "Pokój Dwuosobowy typu Deluxe",
    image: "https://www.dropbox.com/scl/fi/rv4tj8e881nkxiodmu5ou/pokoj2x2.webp?rlkey=z077lvjzpkzbyyglhowbewsbz&st=fmnqly87&dl=0&raw=1",
    features: ["2 osoby", "Deluxe"],
    capacity: 2,
    route: '/pokoje-deluxe'
  },
  {
    name: "Pokój trzyosobowy",
    image: "https://www.dropbox.com/scl/fi/k34c4ttrowbvm6vnf6c0w/3osoby1.webp?rlkey=v1zsjqkdtey2qy2hahnysufkd&st=3s5a4fkg&dl=0&raw=1",
    features: ["3 osoby"],
    capacity: 3,
    route: '/pokoje-trzy'
  },
  {
    name: "Dwupoziomowy pokój czteroosobowy",
    image: "https://www.dropbox.com/scl/fi/sfyhsopbyfo5v5rxp8grg/dwupoziomowy1.webp?rlkey=x0lv8ooun9qgvgh2tnuznn3dt&e=1&st=ah9n8264&dl=0&raw=1",
    features: ["4 osoby", "Dwupoziomowy"],
    capacity: 4,
    route: '/pokoje-poziom'
  },
  {
    name: "Pokój Czteroosobowy",
    image: "https://www.dropbox.com/scl/fi/pxkuo43lm6ivs9tyeswoy/4pokoje4.webp?rlkey=c8oozv5vr1ycrr6t9xzymszou&st=hkqfea89&dl=0&raw=1",
    features: ["4 osoby"],
    capacity: 4,
    route: '/pokoje-cztery'
  },
  {
    name: "Apartament z 2 sypialniami",
    image: "https://www.dropbox.com/scl/fi/4nwrqf6zkynjqzoi3nvh1/ostatni1.webp?rlkey=eu4e60nzcmo2mkey8y1qu0hbe&st=6hu4wxtw&dl=0&raw=1",
    features: ["6 osób", "2 sypialnie"],
    capacity: 6,
    route: '/pokoje-apartament'
  },
  {
    name: "Apartament typu Suite z balkonem",
    image: "https://www.dropbox.com/scl/fi/skvhk6mmia2bcrq96covi/apartament2.webp?rlkey=joe9ycr28ra3lt8nn24hktadu&st=1vcdo2g2&dl=0&raw=1",
    features: ["7 osób", "Suite", "Balkon"],
    capacity: 7,
    route: '/pokoje-suite'
  },
  {
    name: "Dom łemkowski",
    image: "https://www.dropbox.com/scl/fi/afd6esapqluindrfe2dd6/domek1.webp?rlkey=unewhp9t5o2j4z83fgiwmsk55&st=5ub74o8e&dl=0&raw=1",
    features: ["10 osób", "3 sypialnie", "Cały dom"],
    capacity: 10,
    route: '/domek'
  }
];

const selectedGuests = ref<number | null>(null);
const bookingData = ref<any>(null);
const showRoomsList = ref(false);
const showPriceNotification = ref(false);

const guestsText = computed(() => {
  if (!selectedGuests.value) return '';
  const count = selectedGuests.value;
  if (count === 1) return 'osoby';
  if (count >= 2 && count <= 4) return 'osób';
  return 'osób';
});

const filteredRooms = computed(() => {
  if (!selectedGuests.value) return rooms;

  const guestCount = selectedGuests.value;

  // Filtruj pokoje, które mieszczą wybraną liczbę gości
  return rooms.filter(room => room.capacity >= guestCount);
});

const handleFilterOptions = (data: { guests: number; checkin: string; checkout: string; nights: number }) => {
  selectedGuests.value = data.guests;
  bookingData.value = data;
  showRoomsList.value = true;

  // Scroll do sekcji opcji
  setTimeout(() => {
    const optionsSection = document.getElementById('pokoje');
    if (optionsSection) {
      const yOffset = -100;
      const y = optionsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, 100);
};

const handleMouseEnter = (e: MouseEvent, hoverSrc: string) => {
  const target = e.currentTarget as HTMLElement;
  if (window.innerWidth > 600) {
    target.style.backgroundImage = `url(${hoverSrc})`;
  }
};

const handleMouseLeave = (e: MouseEvent, imgSrc: string) => {
  const target = e.currentTarget as HTMLElement;
  if (window.innerWidth > 600) {
    target.style.backgroundImage = `url(${imgSrc})`;
  }
};

const handleOptionClick = (route: string) => {
  router.push(route);
};

const handleRoomClick = (room: Room) => {
  if (bookingData.value) {
    router.push({
      path: room.route,
      query: {
        guests: bookingData.value.guests,
        checkin: bookingData.value.checkin,
        checkout: bookingData.value.checkout
      }
    });
  } else {
    router.push(room.route);
  }
};

const closePriceNotification = () => {
  showPriceNotification.value = false;
};

// Intersection Observer do pokazania powiadomienia po przewinięciu
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !showPriceNotification.value) {
          setTimeout(() => {
            showPriceNotification.value = true;
          }, 500);
        }
      });
    },
    { threshold: 0.3 }
  );

  const section = document.getElementById('pokoje');
  if (section) {
    observer.observe(section);
  }
});
</script>

<style scoped>
.options-section {
  width: 100%;
}

.options-wrapper {
  position: relative;
  width: 100%;
  min-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 720px;
}

.background-images {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  pointer-events: auto;
}

@media (max-width: 600px) {
  .background-images {
    flex-direction: column;
  }
}

.bg-image {
  position: relative;
  width: 33.3333%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

@media (max-width: 600px) {
  .bg-image {
    width: 100%;
    height: 33.3333%;
  }
}

.bg-image:hover {
  z-index: 999;
  transform: scale(1.05);
  filter: brightness(1.1);
}

@media (max-width: 600px) {
  .bg-image:hover {
    transform: none;
  }
}

.hover-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Georgia, serif;
  color: #f4f0d4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(to bottom, rgba(139, 90, 43, 0.95), rgba(93, 78, 55, 0.9));
  padding: 0 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  opacity: 1;
  transition: all 0.4s ease;
  pointer-events: none;
  z-index: 1;
  border-bottom: 3px solid #D4A574;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.3px;
  line-height: 1.3;
}

@media (max-width: 600px) {
  .hover-text {
    opacity: 1;
    height: 70px;
    padding: 0 1rem;
    font-size: 1rem;
  }
}

.bg-image:hover .hover-text {
  opacity: 0;
  transform: translateY(-20px);
}

/* Price notification */
.price-notification {
  position: relative;
  max-width: 800px;
  margin: 2rem auto;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 250, 245, 0.98));
  border-radius: 12px;
  border: 2px solid #D4A574;
  box-shadow: 0 6px 25px rgba(139, 90, 43, 0.2);
  padding: 1.5rem 3rem 1.5rem 2rem;
  animation: slideIn 0.5s ease-out;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: #8B5A2B;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(139, 90, 43, 0.1);
  transform: rotate(90deg);
}

.notification-content {
  text-align: center;
}

.notification-title {
  color: #5D4E37;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  font-family: Georgia, serif;
  text-shadow: 1px 1px 2px rgba(139, 90, 43, 0.1);
}

.notification-text {
  color: #5D4E37;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .price-notification {
    margin: 1.5rem 1rem;
    padding: 1.5rem 2.5rem 1.5rem 1.5rem;
  }

  .notification-title {
    font-size: 1.2rem;
  }

  .notification-text {
    font-size: 1rem;
  }

  .close-btn {
    top: 0.75rem;
    right: 0.75rem;
    font-size: 1.5rem;
    width: 28px;
    height: 28px;
  }
}

/* Styles for rooms list */
.rooms-list-section {
  width: 100%;
  background: linear-gradient(to bottom, rgba(139, 90, 43, 0.05), rgba(139, 90, 43, 0.02));
  padding: 3rem 1rem;
  min-height: 60vh;
}

.rooms-container {
  max-width: 1200px;
  margin: 0 auto;
}

.rooms-title {
  text-align: center;
  color: #5D4E37;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(139, 90, 43, 0.1);
  font-family: Georgia, serif;
}

.rooms-subtitle {
  text-align: center;
  color: #8B5A2B;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  font-weight: 600;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.room-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  border: 2px solid #D4A574;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(139, 90, 43, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(139, 90, 43, 0.25);
  border-color: #8B5A2B;
}

.room-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.room-info {
  padding: 1.5rem;
}

.room-name {
  font-family: Georgia, serif;
  font-size: 1.3rem;
  color: #5D4E37;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.3;
}

.room-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature {
  background: rgba(139, 90, 43, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #5D4E37;
  font-weight: 600;
  border: 1px solid rgba(139, 90, 43, 0.2);
}

@media (max-width: 768px) {
  .rooms-title {
    font-size: 1.8rem;
  }

  .rooms-subtitle {
    font-size: 1rem;
  }

  .room-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .rooms-list-section {
    padding: 2rem 1rem;
  }
}
</style>
