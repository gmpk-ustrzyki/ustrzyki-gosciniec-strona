<template>
  <div class="map-wrapper">
    <div class="map-container">
      <iframe
        src="https://maps.google.com/maps?q=Strwi%C4%85%C5%BCyk%2035A,%2038-700%20Ustrzyki%20Dolne,%20Poland;Moczary%2039,%2038-700%20Ustrzyki%20Dolne,%20Poland&t=&z=14&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style="border: 0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Lokalizacje Go[ciDca - Strwi|yk 35A i Moczary 39, Ustrzyki Dolne"
      />
    </div>
  </div>
</template>

<style scoped>
.map-wrapper {
  width: 100%;
  background: linear-gradient(to bottom, rgba(139, 90, 43, 0.05), rgba(139, 90, 43, 0.02));
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-container {
  width: 100%;
  max-width: 1200px;
  height: 500px;
  border-radius: 12px;
  border: 2px solid #D4A574;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(139, 90, 43, 0.2);
  transition: all 0.3s ease;
}

.map-container:hover {
  box-shadow: 0 6px 25px rgba(139, 90, 43, 0.3);
  border-color: #8B5A2B;
}

@media (max-width: 768px) {
  .map-wrapper {
    padding: 2rem 1rem;
  }

  .map-container {
    height: 400px;
  }
}
</style>
