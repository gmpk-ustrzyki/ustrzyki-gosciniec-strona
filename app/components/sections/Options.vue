<template>
  <section id="pokoje" class="options-section">
    <FallingLeaves :count="25" color="#D4A574" />
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
          <div class="booking-cta">
            <p class="booking-text">Albo zarezerwuj swój pobyt na Booking już teraz</p>
            <a
              href="https://www.booking.com/hotel/pl/gosciniec-pod-malym-krolem.pl.html?aid=318615&label=Polish_Poland_PL_PL_28510505545-Pp48DVUKbUvqbN_uj5E1CwS217288760776%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi55769350487%3Atidsa-300772407013%3Alp1011468%3Ali%3Adec%3Adm&sid=94df31e1c787121eb06586fc680b2382&checkin=2025-12-01&checkout=2025-12-02&dest_id=-534141&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1762775957&srpvid=c62b544744a3034f&type=total&ucfs=1&#tab-main"
              target="_blank"
              rel="noopener noreferrer"
              class="booking-btn"
            >
              <span class="booking-btn-text">Rezerwuj na Booking.com</span>
              <span class="booking-btn-arrow">→</span>
            </a>
          </div>
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

    <!-- Dodatkowe informacje - dzieci i zwierzęta -->
    <div class="additional-info">
      <div class="info-container">
        <div class="info-card">
          <div class="info-icon children-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="info-content">
            <h3 class="info-title">Dzieci do 3. roku życia</h3>
            <p class="info-text">Bezpłatnie</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon pet-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="4.5" cy="9.5" r="2.5"/>
              <circle cx="9" cy="5.5" r="2.5"/>
              <circle cx="15" cy="5.5" r="2.5"/>
              <circle cx="19.5" cy="9.5" r="2.5"/>
              <path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"/>
            </svg>
          </div>
          <div class="info-content">
            <h3 class="info-title">Akceptujemy zwierzęta</h3>
            <p class="info-text">Dodatkowa opłata</p>
          </div>
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
    imgSrc: '/images/options/dom-main.jpeg',
    hoverSrc: '/images/options/dom-hover.jpg',
    alt: '',
    hoverText: 'Wynajmij cały domek',
    route: '/domek'
  },
  {
    imgSrc: '/images/options/gosciniec-main.jpeg',
    hoverSrc: '/images/options/gosciniec-hover.jpg',
    alt: '',
    hoverText: 'Sprawdz dostępnę pokoje w gościńcu',
    route: '/pokoje'
  },
  {
    imgSrc: '/images/options/caly-teren-main.jpeg',
    hoverSrc: '/images/options/caly-teren-hover.jpeg',
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

// Flaga czy powiadomienie zostało już zamknięte w tej sesji
const wasNotificationClosed = ref(false);

const closePriceNotification = () => {
  showPriceNotification.value = false;
  // Ustaw flagę, że powiadomienie zostało zamknięte (tylko dla tej sesji)
  wasNotificationClosed.value = true;
};

// Intersection Observer do pokazania powiadomienia po przewinięciu
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !showPriceNotification.value && !wasNotificationClosed.value) {
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
  position: relative;
  overflow: hidden;
}

.options-wrapper {
  position: relative;
  width: 100%;
  min-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 720px;
  z-index: 2;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  width: 90%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 250, 245, 0.98));
  border-radius: 12px;
  border: 2px solid #D4A574;
  box-shadow: 0 6px 25px rgba(139, 90, 43, 0.2);
  padding: 1.5rem 3rem 1.5rem 2rem;
  animation: slideIn 0.5s ease-out;
  z-index: 100;
  pointer-events: auto;
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
  margin: 0 0 1.5rem 0;
}

.booking-cta {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(139, 90, 43, 0.2);
}

.booking-text {
  color: #5D4E37;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  font-weight: 500;
}

.booking-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #0071c2 0%, #003580 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 53, 128, 0.3);
}

.booking-btn:hover {
  background: linear-gradient(135deg, #005a9c 0%, #002a5c 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 53, 128, 0.4);
}

.booking-btn-text {
  white-space: nowrap;
}

.booking-btn-arrow {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.booking-btn:hover .booking-btn-arrow {
  transform: translateX(4px);
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
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .price-notification {
    width: 95%;
    padding: 1.5rem 2.5rem 1.5rem 1.5rem;
  }

  .notification-title {
    font-size: 1.2rem;
  }

  .notification-text {
    font-size: 1rem;
  }

  .booking-text {
    font-size: 0.9rem;
  }

  .booking-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    gap: 0.5rem;
  }

  .booking-btn-arrow {
    font-size: 1.1rem;
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
  position: relative;
  z-index: 2;
}

.rooms-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
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

/* Additional info section - dzieci i zwierzęta */
.additional-info {
  width: 100%;
  background: linear-gradient(to bottom, rgba(244, 240, 212, 0.2), rgba(244, 240, 212, 0.05));
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(212, 165, 116, 0.2);
  position: relative;
  z-index: 2;
}

.info-container {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #D4A574;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 10px rgba(139, 90, 43, 0.1);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(139, 90, 43, 0.2);
  border-color: #8B5A2B;
}

.info-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.info-card:hover .info-icon {
  transform: scale(1.08);
}

.children-icon {
  background: linear-gradient(135deg, #FFE5B4, #FFD700);
  color: #8B5A2B;
}

.pet-icon {
  background: linear-gradient(135deg, #D4A574, #C19A6B);
  color: #5D4E37;
}

.info-icon svg {
  width: 26px;
  height: 26px;
}

.info-content {
  flex: 1;
}

.info-title {
  font-family: Georgia, serif;
  font-size: 0.95rem;
  color: #5D4E37;
  margin: 0 0 0.25rem 0;
  font-weight: 700;
  line-height: 1.2;
}

.info-text {
  font-size: 0.85rem;
  color: #8B5A2B;
  margin: 0;
  font-weight: 600;
}

@media (max-width: 768px) {
  .additional-info {
    padding: 1.25rem 1rem;
  }

  .info-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
  }

  .info-card {
    padding: 0.875rem 1rem;
    gap: 0.875rem;
  }

  .info-icon {
    width: 40px;
    height: 40px;
  }

  .info-icon svg {
    width: 24px;
    height: 24px;
  }

  .info-title {
    font-size: 0.9rem;
  }

  .info-text {
    font-size: 0.8rem;
  }
}
</style>
