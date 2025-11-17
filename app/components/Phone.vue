<template>
  <div class="phone-wrapper">
    <h4 class="phone-label">Telefon</h4>
    <div class="phone-value">
      <a href="tel:+48693960519">693 960 519 – Kasia</a>
      <a href="tel:+48603131190">603 131 190 – Mirek</a>
    </div>
  </div>
</template>

<style scoped>
.phone-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.phone-label {
  color: #5D4E37;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(139, 90, 43, 0.1);
  letter-spacing: 0.3px;
}

.phone-value {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #5D4E37;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}

.phone-value a {
  color: #5D4E37;
  text-decoration: none;
  transition: color 0.3s ease;
}

.phone-value a:hover {
  color: #8B5A2B;
}
</style>
