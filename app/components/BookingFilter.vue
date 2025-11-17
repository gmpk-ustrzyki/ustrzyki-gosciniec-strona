<template>
  <div class="booking-filter">
    <div class="filter-container">
      <div class="filter-form">
        <input
          type="date"
          id="checkin"
          v-model="checkinDate"
          :min="today"
          placeholder="Przyjazd"
        />

        <input
          type="date"
          id="checkout"
          v-model="checkoutDate"
          :min="minCheckout"
          placeholder="Wyjazd"
        />

        <select id="guests" v-model="guestCount">
          <option value="1">1 osoba</option>
          <option value="2">2 osoby</option>
          <option value="3">3 osoby</option>
          <option value="4">4 osoby</option>
          <option value="5">5 osób</option>
          <option value="6">6 osób</option>
          <option value="7">7 osób</option>
          <option value="8">8 osób</option>
          <option value="9">9 osób</option>
          <option value="10">10+ osób</option>
        </select>

        <button class="search-btn" @click="handleSearch">
          Sprawdź dostępność
        </button>
      </div>

      <div v-if="nights > 0" class="summary">
        {{ nights }} {{ nightsText }}
      </div>
    </div>
  </div>
</template>

<script setup>
const checkinDate = ref('');
const checkoutDate = ref('');
const guestCount = ref('2');

const emit = defineEmits(['filter-options']);

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

const nights = computed(() => {
  if (!checkinDate.value || !checkoutDate.value) return 0;
  const checkin = new Date(checkinDate.value);
  const checkout = new Date(checkoutDate.value);
  const diff = checkout - checkin;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

const nightsText = computed(() => {
  if (nights.value === 1) return 'noc';
  if (nights.value >= 2 && nights.value <= 4) return 'noce';
  return 'nocy';
});

const handleSearch = () => {
  if (!checkinDate.value || !checkoutDate.value) {
    alert('Proszę wybrać daty pobytu');
    return;
  }

  const guests = parseInt(guestCount.value);

  // Emituj event z liczbą gości, aby sekcja Options mogła filtrować opcje
  emit('filter-options', {
    guests,
    checkin: checkinDate.value,
    checkout: checkoutDate.value,
    nights: nights.value
  });
};
</script>

<style scoped>
.booking-filter {
  width: 100%;
  background: linear-gradient(to bottom, rgba(139, 90, 43, 0.15), rgba(139, 90, 43, 0.05));
  padding: 1.5rem 1rem;
  margin-bottom: 0;
  border-bottom: 3px solid #8B5A2B;
}

.filter-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 20px rgba(139, 90, 43, 0.15);
  border: 2px solid #D4A574;
}

.filter-form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

input[type="date"],
select {
  padding: 0.7rem 0.9rem;
  border: 2px solid #D4A574;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: white;
  color: #5D4E37;
  font-family: inherit;
  min-width: 160px;
  max-width: 180px;
}

input[type="date"]:focus,
select:focus {
  outline: none;
  border-color: #8B5A2B;
  box-shadow: 0 0 0 3px rgba(139, 90, 43, 0.1);
}

input[type="date"]:hover,
select:hover {
  border-color: #A67C52;
}

.search-btn {
  padding: 0.7rem 1.3rem;
  background: linear-gradient(to bottom, #8B5A2B, #6B4423);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(139, 90, 43, 0.3);
  white-space: nowrap;
  min-width: auto;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(139, 90, 43, 0.4);
  background: linear-gradient(to bottom, #9B6A3B, #7B5433);
}

.search-btn:active {
  transform: translateY(0);
}

.summary {
  padding: 0.5rem 1rem;
  background: rgba(139, 90, 43, 0.1);
  border-radius: 8px;
  color: #8B5A2B;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .booking-filter {
    padding: 1rem 0.5rem;
  }

  .filter-container {
    flex-direction: column;
    padding: 1rem;
    gap: 0.75rem;
  }

  .filter-form {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  input[type="date"],
  select,
  .search-btn {
    width: 100%;
    min-width: 0;
  }

  .summary {
    width: 100%;
    text-align: center;
  }
}
</style>
