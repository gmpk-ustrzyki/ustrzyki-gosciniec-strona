<template>
  <section id="pokoje" class="options-section">
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
      <div class="options-grid">
        <div
          v-for="(option, index) in opcje"
          :key="index"
          class="option-card"
          @click="handleOptionClick(option.route)"
        >
          <div
            class="option-image"
            :style="{
              backgroundImage: `url(${option.imgSrc})`
            }"
          ></div>
          <h3 class="option-title">{{ option.title }}</h3>
        </div>
      </div>
    </div>

    <!-- Dodatkowe informacje -->
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

        <div class="info-card">
          <div class="info-icon parking-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div class="info-content">
            <h3 class="info-title">Darmowy parking</h3>
            <p class="info-text">Na terenie obiektu</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon wifi-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          </div>
          <div class="info-content">
            <h3 class="info-title">Darmowy Wi-Fi</h3>
            <p class="info-text">W całym obiekcie</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon hiking-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21l8-8m0 0l7-7m-7 7h11M4 4h1l2 16" />
            </svg>
          </div>
          <div class="info-content">
            <h3 class="info-title">Turystyczne szlaki piesze</h3>
            <p class="info-text">W pobliżu obiektu</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon no-smoking-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <div class="info-content">
            <h3 class="info-title">Zakaz palenia</h3>
            <p class="info-text">Obiekt dla niepalących</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon sauna-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </div>
          <div class="info-content">
            <h3 class="info-title">Bania i sauna</h3>
            <p class="info-text">Za dodatkową opłatą</p>
          </div>
        </div>

        <div class="info-card">
          <div class="info-icon products-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="info-content">
            <h3 class="info-title">Własne przetwory</h3>
            <p class="info-text">Dostępne do kupienia</p>
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
  title: string;
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
    title: 'Dom Łemkowski',
    route: '/domek'
  },
  {
    imgSrc: '/images/options/gosciniec-main.jpeg',
    hoverSrc: '/images/options/gosciniec-hover.jpg',
    alt: '',
    hoverText: 'Sprawdz dostępnę pokoje w gościńcu',
    title: 'Pokoje w Gościńcu',
    route: '/pokoje'
  },
  {
    imgSrc: '/images/options/caly-teren-main.jpeg',
    hoverSrc: '/images/options/caly-teren-hover.jpeg',
    alt: '',
    hoverText: 'Wynajmij cały teren z domkiem i gościńcem.',
    title: 'Cały Teren',
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
  // Zapisz w localStorage, że użytkownik zamknął powiadomienie
  if (typeof window !== 'undefined') {
    localStorage.setItem('priceNotificationClosed', 'true');
  }
};

// Pokaż powiadomienie po załadowaniu strony
onMounted(() => {
  // Sprawdź, czy użytkownik już zamknął powiadomienie
  if (typeof window !== 'undefined') {
    const isClosed = localStorage.getItem('priceNotificationClosed');
    if (isClosed === 'true') {
      return; // Nie pokazuj powiadomienia
    }
  }

  // Pokaż powiadomienie po krótkiej chwili
  setTimeout(() => {
    showPriceNotification.value = true;
  }, 500);
});
</script>

<style scoped>
.options-section {
  width: 100%;
  position: relative;
  overflow: visible;
  padding-top: 1rem;
}

.options-wrapper {
  position: relative;
  width: 100%;
  padding: 4rem 2rem;
  padding-top: 2rem;
  background: #ffffff;
  z-index: 2;
}

.options-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

@media (max-width: 1024px) {
  .options-grid {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .options-wrapper {
    padding: 3rem 1.5rem;
  }

  .options-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 600px;
  }
}

.option-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-card:hover {
  transform: translateY(-5px);
}

.option-image {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
}

@media (max-width: 1024px) {
  .option-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .option-image {
    height: 450px;
  }
}

.option-card:hover .option-image {
  filter: brightness(0.95);
}

.option-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #2c2c2c;
  text-align: center;
  margin: 1.5rem 0 0 0;
  padding: 0;
}

@media (max-width: 768px) {
  .option-title {
    font-size: 1rem;
    letter-spacing: 2.5px;
    margin: 1.2rem 0 0 0;
  }
}

/* Price notification */
.price-notification {
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 800px;
  width: 90%;
  background: rgba(30, 41, 59, 0.95);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 1.5rem 3rem 1.5rem 2rem;
  backdrop-filter: blur(20px);
  z-index: 100;
  animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  font-size: 1.8rem;
  color: #ffffff;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: rotate(90deg) scale(1.1);
}

.notification-content {
  text-align: center;
}

.notification-title {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.notification-text {
  color: #ffffff;
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.booking-cta {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.booking-text {
  color: #ffffff;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
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
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(-50%) translateY(-100px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-50%) translateY(-100px);
  opacity: 0;
}

@keyframes slideDown {
  from {
    transform: translateX(-50%) translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .price-notification {
    top: 1rem;
    width: 92%;
    padding: 1.5rem 2.5rem 1.5rem 1.5rem;
  }

  .notification-title {
    font-size: 1.2rem;
  }

  .notification-text {
    font-size: 0.95rem;
  }

  .booking-text {
    font-size: 0.9rem;
  }

  .booking-btn {
    padding: 0.65rem 1.3rem;
    font-size: 0.9rem;
    gap: 0.5rem;
  }

  .booking-btn-arrow {
    font-size: 1.1rem;
  }

  .close-btn {
    top: 0.75rem;
    right: 0.75rem;
    font-size: 1.6rem;
    width: 32px;
    height: 32px;
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
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(139, 90, 43, 0.1);
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
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
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  color: #5D4E37;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.3px;
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

/* Additional info section */
.additional-info {
  width: 100%;
  background: linear-gradient(135deg, #faf8f0 0%, #f5f0e8 50%, #fff8f0 100%);
  padding: 5rem 2rem;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

.additional-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 30%, rgba(212, 165, 116, 0.08), transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(139, 90, 43, 0.05), transparent 50%);
  pointer-events: none;
  animation: subtleGlow 8s ease-in-out infinite;
}

@keyframes subtleGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.info-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.info-card {
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid rgba(212, 165, 116, 0.3);
  border-radius: 16px;
  padding: 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 20px rgba(139, 90, 43, 0.08);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUpCard 0.6s ease forwards;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }
.info-card:nth-child(4) { animation-delay: 0.4s; }
.info-card:nth-child(5) { animation-delay: 0.5s; }
.info-card:nth-child(6) { animation-delay: 0.6s; }
.info-card:nth-child(7) { animation-delay: 0.7s; }
.info-card:nth-child(8) { animation-delay: 0.8s; }

@keyframes fadeInUpCard {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(212, 165, 116, 0.1),
    transparent
  );
  transition: left 0.6s ease;
}

.info-card:hover::before {
  left: 100%;
}

.info-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 35px rgba(139, 90, 43, 0.18);
  border-color: rgba(139, 90, 43, 0.4);
  background: rgba(255, 255, 255, 0.95);
}

.info-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.info-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  opacity: 0;
  transition: all 0.4s ease;
}

.info-card:hover .info-icon {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}

.info-card:hover .info-icon::after {
  opacity: 0.3;
  width: 130%;
  height: 130%;
}

.children-icon {
  background: linear-gradient(135deg, #FFE5B4, #FFD700);
  color: #8B5A2B;
}

.pet-icon {
  background: linear-gradient(135deg, #D4A574, #C19A6B);
  color: #5D4E37;
}

.parking-icon {
  background: linear-gradient(135deg, #93C5FD, #60A5FA);
  color: #1e40af;
}

.wifi-icon {
  background: linear-gradient(135deg, #86EFAC, #4ADE80);
  color: #166534;
}

.hiking-icon {
  background: linear-gradient(135deg, #FCA5A5, #F87171);
  color: #991b1b;
}

.no-smoking-icon {
  background: linear-gradient(135deg, #CBD5E1, #94A3B8);
  color: #334155;
}

.sauna-icon {
  background: linear-gradient(135deg, #FED7AA, #FB923C);
  color: #c2410c;
}

.products-icon {
  background: linear-gradient(135deg, #A78BFA, #8B5CF6);
  color: #5b21b6;
}

.info-icon svg {
  width: 26px;
  height: 26px;
}

.info-content {
  flex: 1;
}

.info-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #5D4E37;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.2px;
}

.info-text {
  font-size: 0.85rem;
  color: #8B5A2B;
  margin: 0;
  font-weight: 600;
}

@media (max-width: 768px) {
  .additional-info {
    padding: 3.5rem 1.25rem;
  }

  .info-container {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    max-width: 500px;
  }

  .info-card {
    padding: 1.125rem 1.125rem;
    gap: 1rem;
  }

  .info-icon {
    width: 46px;
    height: 46px;
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
