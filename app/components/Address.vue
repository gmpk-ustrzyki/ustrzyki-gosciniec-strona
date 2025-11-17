<template>
  <div class="address-wrapper">
    <h4 class="address-label">Nasze lokalizacje:</h4>
    <div class="address-value">
      <div class="location-item">
        <strong>Gościniec pod Małym Królem</strong><br />
        Strwiążyk 35A<br />
        38-700 Ustrzyki Dolne
      </div>

      <div class="location-item">
        <strong>Ogród Bieszczadzki</strong><br />
        Moczary 39<br />
        38-700 Ustrzyki Dolne
      </div>
    </div>
  </div>
</template>

<style scoped>
.address-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  border: 2px solid #D4A574;
  box-shadow: 0 4px 20px rgba(139, 90, 43, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
}

.address-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(139, 90, 43, 0.25);
  background: rgba(255, 255, 255, 1);
  border-color: #8B5A2B;
}

.address-label {
  color: #5D4E37;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(139, 90, 43, 0.1);
  letter-spacing: 0.3px;
}

.address-value {
  color: #5D4E37;
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.location-item strong {
  color: #8B5A2B;
  font-weight: 700;
}
</style>
