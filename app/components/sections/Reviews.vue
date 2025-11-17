<template>
  <section id="opinie" class="reviews-section">
    <FallingLeaves :count="20" color="#af4c1e" />

    <div class="reviews-container">
      <div class="section-header">
        <h2 class="section-title">Co mówią o nas goście</h2>
        <a
          href="https://www.booking.com/hotel/pl/gosciniec-pod-malym-krolem.pl.html?aid=318615&label=Polish_Poland_PL_PL_28510505545-Pp48DVUKbUvqbN_uj5E1CwS217288760776%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi55769350487%3Atidsa-300772407013%3Alp1011468%3Ali%3Adec%3Adm&sid=94df31e1c787121eb06586fc680b2382&checkin=2025-12-01&checkout=2025-12-02&dest_id=-534141&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1762775957&srpvid=c62b544744a3034f&type=total&ucfs=1&#tab-reviews"
          target="_blank"
          rel="noopener noreferrer"
          class="booking-badge"
        >
          <img src="https://cf.bstatic.com/static/img/booking_logo_knowledge_graph/247454a990efac1952e44dddbf30c58677aa0fd8.png" alt="Booking.com" class="booking-logo" />
          <div class="rating-summary">
            <span class="rating-score">{{ overallRating }}</span>
            <div class="rating-details">
              <span class="rating-text">{{ ratingText }}</span>
              <span class="review-count">{{ reviews.length }} opinii</span>
            </div>
          </div>
          <div class="see-all-reviews">
            <span class="see-all-text">Zobacz wszystkie opinie</span>
            <span class="arrow-icon">→</span>
          </div>
        </a>
      </div>

      <div class="reviews-carousel">
        <button
          class="carousel-btn prev"
          @click="goToPrevPage"
          :disabled="!hasPrevPage"
        >
          ‹
        </button>

        <div class="reviews-track-container">
          <div class="reviews-track">
            <div
              v-for="(review, index) in visibleReviews"
              :key="`page-${currentPage}-review-${index}`"
              class="review-card"
            >
              <div class="review-header">
                <div class="reviewer-info">
                  <div class="reviewer-avatar">
                    {{ review.name.charAt(0) }}
                  </div>
                  <div class="reviewer-details">
                    <h3 class="reviewer-name">{{ review.name }}</h3>
                    <p class="reviewer-location">{{ review.country }}</p>
                  </div>
                </div>
                <div class="review-rating">
                  <span class="rating-badge">{{ review.rating }}</span>
                </div>
              </div>

              <div class="review-content">
                <p class="review-text">
                  <span v-if="!isTextLong(review.text)">{{ review.text }}</span>
                  <span v-else>
                    <span v-if="!isReviewExpanded(currentPage * REVIEWS_PER_PAGE + index)">
                      {{ getTruncatedText(review.text) }}
                    </span>
                    <span v-else>{{ review.text }}</span>
                  </span>
                </p>
                <button
                  v-if="isTextLong(review.text)"
                  class="read-more-btn"
                  @click="toggleReviewExpansion(currentPage * REVIEWS_PER_PAGE + index)"
                >
                  {{ isReviewExpanded(currentPage * REVIEWS_PER_PAGE + index) ? 'Zobacz mniej' : 'Zobacz więcej' }}
                </button>
                <div class="review-highlights" v-if="review.highlights && review.highlights.length > 0">
                  <span v-for="(highlight, i) in review.highlights" :key="i" class="highlight-tag">
                    {{ highlight }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          class="carousel-btn next"
          @click="goToNextPage"
          :disabled="!hasNextPage"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Review {
  name: string;
  country: string;
  rating: number;
  text: string;
  highlights?: string[];
  date: string;
}

const currentPage = ref(0);
const overallRating = ref(9.6); // Twoja ocena z Booking.com
const ratingText = ref('Wyjątkowy'); // Booking.com używa "Wyjątkowy" dla 9+

// Prawdziwe opinie z Booking.com
const reviews = ref<Review[]>([
  {
    name: 'Anna',
    country: 'Polska',
    rating: 10,
    text: 'Wszystko, lokalizacja, dom, otoczenie i sympatyczni gospodarze ♥️ Polecam jak najbardziej pokoje ładne czyste duża przestronna kuchnia i wielka jadalnia wszystko w stylu górskim.',
    highlights: ['Lokalizacja', 'Czystość', 'Wyposażenie'],
    date: 'Październik 2025'
  },
  {
    name: 'Barbara',
    country: 'Polska',
    rating: 10,
    text: 'Przepiękne pokoje całe w drewnie oddają w całości bieszczadzki klimat. Bardzo mili i otwarci właściciele + plac zabaw i bawialnia dla dzieci na każdą pogodę. Polecam',
    highlights: ['Klimat', 'Obsługa', 'Dla rodzin'],
    date: 'Sierpień 2025'
  },
  {
    name: 'Edyta',
    country: 'Polska',
    rating: 10,
    text: 'Wspaniali gospodarze, cudowna okolica, kuchnia wyposażona we wszystko czego dusza zapragnie, z okien piękne widoki, na pewno wrócę ❤️',
    highlights: ['Gospodarze', 'Widoki', 'Wyposażenie'],
    date: 'Lipiec 2025'
  },
  {
    name: 'Furgała',
    country: 'Polska',
    rating: 10,
    text: 'Obiekt z niesamowitym klimatem, wszystko jest czyste i zadbane. Czuć klimat Bieszczad. Właściciele są niesamowitymi ludźmi, którzy traktują gości jak swoją najbliższą rodzinę, czuć zaopiekowanie oraz dobroć. Naprawdę można tu odpocząć od codziennego zgiełku, chaosu. Jeżeli ktoś potrzebuje się zresetować to napewno jest to miejsce.',
    highlights: ['Klimat', 'Obsługa', 'Relaks'],
    date: 'Lipiec 2025'
  },
  {
    name: 'Dumala',
    country: 'Polska',
    rating: 10,
    text: 'Lokalizacja super, zarówno jako miejsce do relaksu jak i baza wypadowa do wycieczek pieszych, rowerowych czy zwiedzania okolicy przez zmotoryzowanych. Internet bez zarzutu, pies akceptowany i szczęśliwy. Dostępna duża i konkretnie wyposażona kuchnia tudzież jadalnia. Możliwość zakupu lokalnych wyrobów (sok aronia + mięta obłędny!). Wygodny parking. Duże podwórko z placem zabaw, leżakami, hamakiem a nawet... przeuroczym domkiem na drzewie! Pokoje z klimatem, spore balkony. Genialna gospodyni, jeśli chcecie podpowie gdzie, co, jak i kiedy warto zobaczyć. Na bank wrócimy na dłużej!',
    highlights: ['Lokalizacja', 'Wyposażenie', 'Gospodarze'],
    date: 'Czerwiec 2025'
  },
  {
    name: 'Katarzyna',
    country: 'Polska',
    rating: 10,
    text: 'Bardzo urocze miejsce z klimatem regionalnym, Gospodarze dbają o każdy detal, piękne miejsce',
    highlights: ['Klimat', 'Dbałość o detale', 'Gospodarze'],
    date: 'Grudzień 2024'
  },
  {
    name: 'Varjanka',
    country: 'Polska',
    rating: 10,
    text: 'To miejsce, w którym czujesz się jak w domu, aż szkoda było wyjeżdżać:( Właściciele są przemiłymi i pomocnymi osobami, pozdrawiamy panią Kasię 😉 Pokój przestronny, bardzo czysty, wspólna kuchnia pięknie urządzona i dobrze wyposażona. Ładny teren dookoła posesji, gdzie spędziliśmy miłe chwile z naszym czworonożnym członkiem rodziny. Bardzo blisko szlaków, a jesienią można podziwiać rykowisko przed samym domem :) chętnie znowu wrócimy!',
    highlights: ['Atmosfera', 'Czystość', 'Pet-friendly'],
    date: 'Wrzesień 2024'
  },
  {
    name: 'Robert',
    country: 'Polska',
    rating: 10,
    text: 'Lokalizacja w cichym miejscu, podwórze bardzo zadbane, dużo atrakcji dla dzieci.',
    highlights: ['Lokalizacja', 'Dla rodzin', 'Cisza'],
    date: 'Wrzesień 2024'
  }
]);

const REVIEWS_PER_PAGE = 3;

// Oblicz całkowitą liczbę stron
const totalPages = computed(() => Math.ceil(reviews.value.length / REVIEWS_PER_PAGE));

// Pobierz opinie dla aktualnej strony
const visibleReviews = computed(() => {
  const startIndex = currentPage.value * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  return reviews.value.slice(startIndex, endIndex);
});

// Sprawdź czy jest poprzednia strona
const hasPrevPage = computed(() => currentPage.value > 0);

// Sprawdź czy jest następna strona
const hasNextPage = computed(() => currentPage.value < totalPages.value - 1);

const goToPrevPage = () => {
  if (hasPrevPage.value) {
    currentPage.value--;
  }
};

const goToNextPage = () => {
  if (hasNextPage.value) {
    currentPage.value++;
  }
};

// Flagi dla rozwinięcia tekstu dla każdej opinii
const expandedReviews = ref<Set<number>>(new Set());

const toggleReviewExpansion = (reviewIndex: number) => {
  if (expandedReviews.value.has(reviewIndex)) {
    expandedReviews.value.delete(reviewIndex);
  } else {
    expandedReviews.value.add(reviewIndex);
  }
};

const isReviewExpanded = (reviewIndex: number) => {
  return expandedReviews.value.has(reviewIndex);
};

// Sprawdź czy tekst jest długi (powyżej 150 znaków)
const isTextLong = (text: string) => {
  return text.length > 150;
};

// Pobierz skrócony tekst
const getTruncatedText = (text: string) => {
  return text.substring(0, 150) + '...';
};
</script>

<style scoped>
.reviews-section {
  position: relative;
  background: linear-gradient(135deg, #faf8f0 0%, #f5f0e8 50%, #fff8f0 100%);
  padding: 4rem 2rem;
  overflow: hidden;
}

.reviews-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-family: Georgia, serif;
  font-size: 2.5rem;
  color: #3D2817;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.booking-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 2.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 650px;
  margin: 0 auto;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.booking-badge:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.15);
  background: #f8f8f8;
}

.booking-logo {
  height: 35px;
  width: auto;
  flex-shrink: 0;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-shrink: 0;
}

.rating-score {
  font-size: 2.8rem;
  font-weight: bold;
  color: white;
  padding: 0.7rem 1.3rem;
  background: linear-gradient(135deg, #0071c2 0%, #003580 100%);
  border-radius: 12px;
  flex-shrink: 0;
}

.rating-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  min-width: 0;
  flex-shrink: 1;
}

.rating-text {
  font-weight: bold;
  color: #3D2817;
  font-size: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.review-count {
  color: #666;
  font-size: 1rem;
  white-space: nowrap;
}

.see-all-reviews {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #0071c2 0%, #003580 100%);
  border-radius: 10px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.booking-badge:hover .see-all-reviews {
  background: linear-gradient(135deg, #005a9c 0%, #002a5c 100%);
  transform: translateX(3px);
}

.see-all-text {
  color: white;
  font-weight: 600;
  font-size: 1.05rem;
  white-space: nowrap;
}

.arrow-icon {
  color: white;
  font-size: 1.4rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.booking-badge:hover .arrow-icon {
  transform: translateX(3px);
}

.reviews-carousel {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.carousel-btn {
  background: white;
  border: 2px solid #D4A574;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 2rem;
  color: #af4c1e;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  z-index: 10;
}

.carousel-btn:hover:not(:disabled) {
  background: #af4c1e;
  color: white;
  transform: scale(1.1);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.reviews-track-container {
  overflow: visible;
  flex: 1;
}

.reviews-track {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
}

.review-card {
  flex: 0 0 calc((100% - 2rem) / 3);
  max-width: calc((100% - 2rem) / 3);
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e7e7e7;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 300px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f0e6d2;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.reviewer-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #af4c1e 0%, #8b3a1e 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(175, 76, 30, 0.3);
  flex-shrink: 0;
}

.reviewer-details {
  display: flex;
  flex-direction: column;
}

.reviewer-name {
  font-size: 1rem;
  font-weight: bold;
  color: #3D2817;
  margin: 0;
}

.reviewer-location {
  color: #666;
  font-size: 0.85rem;
  margin: 0;
}

.review-rating {
  flex-shrink: 0;
}

.rating-badge {
  background: linear-gradient(135deg, #0071c2 0%, #003580 100%);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.1rem;
}

.review-content {
  margin: 0.75rem 0 0 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.review-text {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #333;
  margin-bottom: 0.5rem;
  flex: 1;
}

.read-more-btn {
  background: none;
  border: none;
  color: #0071c2;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.3rem 0;
  text-align: left;
  transition: color 0.2s ease;
  text-decoration: underline;
}

.read-more-btn:hover {
  color: #003580;
}

.review-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.highlight-tag {
  background: #f0e6d2;
  color: #af4c1e;
  padding: 0.3rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #af4c1e;
  width: 30px;
  border-radius: 6px;
}

.dot:hover {
  background: #D4A574;
}

/* Responsywność */
@media (max-width: 1024px) {
  .review-card {
    flex: 0 0 calc((100% - 1rem) / 2);
    max-width: calc((100% - 1rem) / 2);
  }
}

@media (max-width: 768px) {
  .reviews-section {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .booking-badge {
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.5rem 1.2rem;
    max-width: 95%;
  }

  .booking-logo {
    height: 30px;
  }

  .rating-score {
    font-size: 2.2rem;
    padding: 0.6rem 1.1rem;
  }

  .rating-text {
    font-size: 1.1rem;
  }

  .review-count {
    font-size: 0.9rem;
  }

  .see-all-reviews {
    padding: 0.7rem 1.3rem;
    width: 100%;
    justify-content: center;
  }

  .see-all-text {
    font-size: 0.95rem;
  }

  .arrow-icon {
    font-size: 1.2rem;
  }

  .carousel-btn {
    width: 35px;
    height: 35px;
    font-size: 1.3rem;
  }

  .review-card {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 1.25rem;
    min-height: 350px;
    max-height: 350px;
  }

  .reviews-track {
    gap: 0.75rem;
  }

  .review-text {
    font-size: 0.9rem;
  }

  .reviewer-avatar {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .reviewer-name {
    font-size: 0.95rem;
  }

  .reviewer-location {
    font-size: 0.8rem;
  }

  .rating-badge {
    font-size: 1rem;
    padding: 0.35rem 0.7rem;
  }

  .highlight-tag {
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
  }
}
</style>
