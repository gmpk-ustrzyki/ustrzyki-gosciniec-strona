<template>
  <nav class="nav-wrapper" :class="{ scrolled: isScrolled }">
    <!-- Christmas Lights -->
    <div class="christmas-lights">
      <span v-for="i in 30" :key="i" class="light" :style="{ left: `${(i - 1) * 3.33}%`, animationDelay: `${Math.random() * 2}s` }"></span>
    </div>

    <!-- Hamburger + Logo -->
    <div class="nav-left-section">
      <button
        class="hamburger-button"
        @click.stop="toggleMobileMenu"
      >
        <span :class="{ open: isMobileMenuOpen }" />
        <span :class="{ open: isMobileMenuOpen }" />
        <span :class="{ open: isMobileMenuOpen }" />
      </button>
      <div class="logo-text">Gościniec pod Małym Królem</div>
    </div>

    <!-- Booking Filter Panel -->
    <div class="booking-panel" :class="{ hidden: isFilterHidden }">
      <div class="filter-inputs">
        <div class="input-group">
          <label class="input-label">Przyjazd</label>
          <input
            type="date"
            v-model="checkinDate"
            :min="today"
            class="date-input"
          />
        </div>
        <div class="input-group">
          <label class="input-label">Wyjazd</label>
          <input
            type="date"
            v-model="checkoutDate"
            :min="minCheckout"
            class="date-input"
          />
        </div>
        <div class="input-group">
          <label class="input-label">Goście</label>
          <select v-model="guestCount" class="guest-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <button class="search-btn" @click="handleSearch">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Phone Icon -->
    <div class="nav-right-section">
      <a href="tel:693960519" class="phone-icon" aria-label="Zadzwoń">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>
    </div>

    <!-- Overlay -->
    <div class="menu-overlay" :class="{ 'is-visible': isMobileMenuOpen }" @click="toggleMobileMenu"></div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <!-- Christmas Lights for Mobile Menu -->
      <div class="mobile-christmas-lights-top">
        <span v-for="i in 30" :key="`mobile-top-${i}`" class="mobile-light" :style="{ left: `${(i - 1) * 3.33}%`, animationDelay: `${Math.random() * 2}s` }"></span>
      </div>
      <div class="mobile-christmas-lights-bottom">
        <span v-for="i in 30" :key="`mobile-bottom-${i}`" class="mobile-light" :style="{ left: `${(i - 1) * 3.33}%`, animationDelay: `${Math.random() * 2}s` }"></span>
      </div>
      <div class="mobile-nav-links-wrapper">
        <h1 v-for="item in allMenuItems" :key="item" class="hero-title" @click="toggleMobileMenu">
          <NavLink :value="item" />
        </h1>
        <div class="social-links">
          <a
            href="https://www.facebook.com/BieszczadzkiOgrod?ref=embed_page"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img src="/images/fsb.png" alt="Facebook" width="32" height="32" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img src="/images/inst.png" alt="Instagram" width="32" height="32" />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const isFilterHidden = ref(false);

// Booking filter state
const checkinDate = ref('');
const checkoutDate = ref('');
const guestCount = ref('2');

// All menu items
const allMenuItems = ['Pokoje', 'Domek', 'Regulamin', 'Blog', 'Okolica', 'Kontakt'];

const today = computed(() => {
  const date = new Date();
  return date.toISOString().split('T')[0];
});

const minCheckout = computed(() => {
  if (!checkinDate.value) return today.value;
  const date = new Date(checkinDate.value);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
});

const toggleMobileMenu = async () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  await nextTick();
};


const handleSearch = () => {
  if (!checkinDate.value || !checkoutDate.value) {
    alert('Proszę wybrać daty pobytu');
    return;
  }

  const guests = parseInt(guestCount.value);

  // Stwórz format room1 (A dla każdego dorosłego)
  const room1 = Array(guests).fill('A').join('%2C');

  // Bazowy URL Booking.com dla tego hotelu
  const baseUrl = 'https://www.booking.com/hotel/pl/gosciniec-pod-malym-krolem.pl.html';

  // Parametry URL
  const params = new URLSearchParams({
    aid: '318615',
    label: 'Polish_Poland_PL_PL_28510505545-Pp48DVUKbUvqbN_uj5E1CwS217288760776:pl:ta:p1:p2:ac:ap:neg:fi55769350487:tidsa-300772407013:lp1011468:li:dec:dm',
    sid: '94df31e1c787121eb06586fc680b2382',
    checkin: checkinDate.value,
    checkout: checkoutDate.value,
    dest_id: '-534141',
    dest_type: 'city',
    dist: '0',
    group_adults: guests.toString(),
    group_children: '0',
    hapos: '1',
    hpos: '1',
    no_rooms: '1',
    req_adults: guests.toString(),
    req_children: '0',
    room1: room1,
    sb_price_type: 'total',
    sr_order: 'popularity',
    srepoch: '1765115546',
    srpvid: '42ce618b191b0fce',
    type: 'total',
    ucfs: '1'
  });

  // Przekieruj do Booking.com
  window.open(`${baseUrl}?${params.toString()}`, '_blank');
};

const handleScroll = () => {
  if (window.scrollY > 100) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.nav-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  gap: 15px;
  padding: 12px 20px;
  z-index: 99999;
  box-sizing: border-box;
  pointer-events: auto;
  transition: all 0.3s ease;
}

.nav-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: none;
  z-index: -1;
  transition: background 0.3s ease;
}

.nav-wrapper.scrolled::before {
  background: rgba(60, 60, 60, 0.85);
  backdrop-filter: blur(10px);
}

/* Christmas Lights */
.christmas-lights {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  pointer-events: none;
  z-index: 10;
}

.light {
  position: absolute;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: twinkle 2s infinite;
}

.light:nth-child(4n+1) {
  background: radial-gradient(circle, #ff0000, #cc0000);
  box-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
}

.light:nth-child(4n+2) {
  background: radial-gradient(circle, #00ff00, #00cc00);
  box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
}

.light:nth-child(4n+3) {
  background: radial-gradient(circle, #0080ff, #0066cc);
  box-shadow: 0 0 10px #0080ff, 0 0 20px #0080ff;
}

.light:nth-child(4n) {
  background: radial-gradient(circle, #ffff00, #cccc00);
  box-shadow: 0 0 10px #ffff00, 0 0 20px #ffff00;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}

/* Mobile Menu Christmas Lights */
.mobile-christmas-lights-top,
.mobile-christmas-lights-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 10px;
  pointer-events: none;
  z-index: 10;
}

.mobile-christmas-lights-top {
  top: 0;
}

.mobile-christmas-lights-bottom {
  bottom: 0;
}

.mobile-light {
  position: absolute;
  top: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: twinkle 2s infinite;
}

.mobile-light:nth-child(4n+1) {
  background: radial-gradient(circle, #ff0000, #cc0000);
  box-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
}

.mobile-light:nth-child(4n+2) {
  background: radial-gradient(circle, #00ff00, #00cc00);
  box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
}

.mobile-light:nth-child(4n+3) {
  background: radial-gradient(circle, #0080ff, #0066cc);
  box-shadow: 0 0 10px #0080ff, 0 0 20px #0080ff;
}

.mobile-light:nth-child(4n) {
  background: radial-gradient(circle, #ffff00, #cccc00);
  box-shadow: 0 0 10px #ffff00, 0 0 20px #ffff00;
}

/* Left Section - Hamburger + Logo */
.nav-left-section {
  display: flex;
  align-items: center;
  gap: 15px;
  justify-self: start;
}

.hamburger-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  z-index: 10002;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.hamburger-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hamburger-button span {
  display: block;
  width: 24px;
  height: 2.5px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.hamburger-button span.open:nth-child(1) {
  transform: rotate(-45deg) translate(-6px, 7px);
}

.hamburger-button span.open:nth-child(2) {
  opacity: 0;
}

.hamburger-button span.open:nth-child(3) {
  transform: rotate(45deg) translate(-6px, -7px);
}

.logo-text {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  transition: all 0.3s ease;
}

.logo-text:hover {
  text-shadow: 0 2px 12px rgba(255, 255, 255, 0.3);
}

/* Booking Panel */
.booking-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  justify-self: center;
  max-width: 600px;
  width: 100%;
}

.booking-panel.hidden {
  opacity: 0;
  pointer-events: none;
}

.filter-inputs {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.input-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 4px;
}

.date-input,
.guest-select {
  padding: 6px 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  transition: all 0.2s;
}

.date-input:focus,
.guest-select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 1);
}

.guest-select {
  cursor: pointer;
}

.search-btn {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
}

.search-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

/* Right Section - Phone */
.nav-right-section {
  display: flex;
  align-items: center;
  justify-self: end;
}

.phone-icon {
  color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.phone-icon:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Menu Overlay */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.menu-overlay.is-visible {
  opacity: 1;
  pointer-events: auto;
}

/* Mobile Menu */
.mobile-menu {
  transition: all 0.4s ease-in-out;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100vh;
  background: rgba(70, 70, 70, 0.85);
  backdrop-filter: blur(20px);
  z-index: 10000;
  overflow-y: auto;
  transform: translateX(-100%);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.mobile-menu.is-open {
  transform: translateX(0);
}

.mobile-nav-links-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 80px 30px 40px;
  background-color: transparent;
  height: 100%;
  pointer-events: auto;
  gap: 20px;
}

.hero-title {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  text-align: left;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  font-weight: 400;
  letter-spacing: 1px;
}

.hero-title:hover {
  color: #ffffff;
  padding-left: 10px;
  text-shadow: 0 2px 15px rgba(255, 255, 255, 0.3);
  border-bottom-color: rgba(255, 255, 255, 0.3);
}

.social-links {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  margin-top: auto;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-icon {
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  opacity: 0.7;
}

.social-icon:hover {
  transform: scale(1.15);
  opacity: 1;
}

/* Responsive */
@media (max-width: 1024px) {
  .booking-panel {
    max-width: 500px;
    padding: 5px 10px;
  }

  .filter-inputs {
    gap: 8px;
  }

  .input-label {
    font-size: 0.6rem;
  }

  .date-input,
  .guest-select {
    font-size: 0.8rem;
    padding: 5px 6px;
  }

  .search-btn {
    padding: 6px 10px;
  }

  .search-btn svg {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 768px) {
  .nav-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    gap: 10px;
  }

  .nav-left-section {
    flex: 1;
  }

  .logo-text {
    font-size: 0.8rem;
    letter-spacing: 2px;
  }

  .booking-panel {
    display: none;
  }

  .phone-icon {
    padding: 8px;
  }

  .mobile-menu {
    width: 100%;
  }

  .mobile-nav-links-wrapper {
    padding: 80px 20px 40px;
    justify-content: center;
  }

  .hero-title {
    font-size: 1.8rem;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 15px 0;
  }

  .hero-title:hover {
    color: #ffffff;
    padding-left: 0;
  }

  .social-links {
    justify-content: center;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .social-icon {
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 0.65rem;
    letter-spacing: 1px;
  }

  .hamburger-button span {
    width: 24px;
    height: 2px;
  }

  .hero-title {
    font-size: 1.5rem;
  }
}
</style>