<template>
  <nav class="nav-wrapper">
    <div class="logo-wrapper" :class="{ show: showLogo }">
      <Logo />
    </div>

    <div class="mobile-nav-wrapper">
      <button class="hamburger-button" @click="toggleMobileMenu">
        <span :class="{ open: isMobileMenuOpen }" />
        <span :class="{ open: isMobileMenuOpen }" />
        <span :class="{ open: isMobileMenuOpen }" />
      </button>
      <a href="tel:693960519" class="call-button">Zadzwoń</a>
    </div>

    <div class="nav-left">
      <NavLink v-for="item in leftMenuItems" :key="item" :value="item" />
    </div>

    <div class="nav-right">
      <NavLink v-for="item in rightMenuItems" :key="item" :value="item" />
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        class="social-icon"
      >
        <img src="/images/fsb.png" alt="Facebook" width="24" height="24" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        class="social-icon"
      >
        <img src="/images/inst.png" alt="Instagram" width="24" height="24" />
      </a>
    </div>

    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <div class="mobile-nav-links-wrapper">
        <h1 v-for="item in leftMenuItems" :key="'left-' + item" class="hero-title">
          <NavLink :value="item" />
        </h1>
        <h1 v-for="item in rightMenuItems" :key="'right-' + item" class="hero-title">
          <NavLink :value="item" />
        </h1>
      </div>
      <div class="social-wrapper">
        <a class="social-icon" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isMobileMenuOpen = ref(false);
const showLogo = ref(false);

const leftMenuItems = ['Pokoje', 'Domek', 'Gościniec', 'Regulamin'];
const rightMenuItems = ['Blog', 'Okolica', 'Kontakt'];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleScroll = () => {
  if (window.scrollY > 100) {
    showLogo.value = true;
  } else {
    showLogo.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  gap: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .nav-wrapper {
    padding: 5px 10px;
    justify-content: space-between;
    gap: 10px;
    height: 40px;
  }
}

.mobile-nav-wrapper {
  display: none;
  width: 100%;
}

@media (max-width: 768px) {
  .mobile-nav-wrapper {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    z-index: 101;
    justify-content: space-between;
  }
}

.logo-wrapper {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s;
  transform: translateY(-100%);
  opacity: 0;
  will-change: transform, opacity;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

.logo-wrapper.show {
  transform: translateY(0);
  opacity: 1;
}

@media (max-width: 768px) {
  .logo-wrapper {
    display: none;
    position: relative;
    transform: none;
    opacity: 1;
    margin-left: auto;
    order: 2;
  }
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: 100px;
}

@media (max-width: 768px) {
  .nav-left {
    display: none;
  }
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

@media (max-width: 768px) {
  .nav-right {
    display: none;
  }
}

.hamburger-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

@media (max-width: 768px) {
  .hamburger-button {
    display: block;
    position: relative;
  }
}

.hamburger-button span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #f4f0d4;
  margin: 4px 0;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.hamburger-button span.open:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger-button span.open:nth-child(2) {
  opacity: 0;
}

.hamburger-button span.open:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

.mobile-menu {
  transition: height 1s ease-in-out;
  display: none;
  overflow: hidden;
}

@media (max-width: 768px) {
  .mobile-menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    background: url('/images/menu-bg.webp') no-repeat center center;
    background-size: cover;
    z-index: -1;
    height: 0;
  }

  .mobile-menu.is-open {
    z-index: 100;
    height: 100%;
  }
}

.mobile-nav-links-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 55px 15px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
}

.hero-title {
  margin-top: 0px;
  font-family: Georgia, serif;
  font-size: 2rem;
  color: #f4f0d4;
  text-shadow: 3px 3px 6px #af4c1e, 4px 4px 8px #000000;
  text-align: center;
}

.social-wrapper {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .social-wrapper {
    margin-top: 0;
    display: none;
  }
}

.social-icon {
  display: flex;
  align-items: center;
  color: #fff;
  transition: color 0.2s;
}

.social-icon:hover {
  color: #ffe9c7;
}

.call-button {
  display: none;
}

@media (max-width: 768px) {
  .call-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 5px 10px;
    color: #f4f0d4;
    text-decoration: none;
    font-family: Georgia, serif;
    font-size: 1.3rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    z-index: 101;
  }

  .call-button:hover {
    color: #ffe9c7;
  }
}
</style>
