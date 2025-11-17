<template>
  <div class="blog-page">
    <!-- Przycisk NA GÓRZE strony -->
    <div class="back-button-wrapper">
      <NuxtLink to="/" class="back-button">
        <span class="arrow">←</span> Powrót do strony głównej
      </NuxtLink>
    </div>

    <!-- Hero sekcja -->
    <section class="blog-hero">
      <div class="hero-content">
        <h1>Co nowego w Gościńcu?</h1>
        <p>Zobacz nasze najnowsze posty, zdjęcia i aktualności prosto z Bieszczad!</p>
      </div>
    </section>

    <!-- Sekcja z postami z Facebooka -->
    <section class="blog-content">
      <div class="container">
        <FacebookFeed />
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Blog - Gościniec pod Małym Królem',
  meta: [
    { name: 'description', content: 'Aktualności i wydarzenia z Gościńca pod Małym Królem w Bieszczadach' }
  ]
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background-color: #f5f1e8;
}

/* Wrapper dla przycisku */
.back-button-wrapper {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 1000;
}

/* Przycisk powrotu */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: rgba(139, 111, 71, 0.95);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.back-button:hover {
  background-color: rgba(109, 86, 53, 0.95);
  transform: translateX(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.back-button:hover .arrow {
  transform: translateX(-3px);
}

/* Hero sekcja */
.blog-hero {
  background: linear-gradient(135deg, #8B6F47 0%, #a68968 100%);
  min-height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  border-bottom: 4px solid #6d5635;
}

.hero-content {
  max-width: 800px;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  letter-spacing: 0.5px;
}

.hero-content p {
  font-size: 1.4rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  font-weight: 300;
  line-height: 1.6;
}

/* Sekcja z postami */
.blog-content {
  padding: 4rem 0;
  background-color: #f5f1e8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Responsywność */
@media (max-width: 768px) {
  .back-button-wrapper {
    top: 1rem;
    left: 1rem;
  }

  .back-button {
    padding: 0.8rem 1.2rem;
    font-size: 0.95rem;
  }

  .arrow {
    font-size: 1.2rem;
  }

  .hero-content h1 {
    font-size: 2.2rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .blog-hero {
    min-height: 30vh;
    padding: 3rem 1rem;
  }
}
</style>