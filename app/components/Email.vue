<template>
  <div class="email-wrapper">
    <h4 class="email-label">Email</h4>
    <p class="email-value">
      <a href="mailto:gpmk@wp.pl">gpmk@wp.pl</a>
    </p>
  </div>
</template>

<style scoped>
.email-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(139, 90, 43, 0.2);
}

.email-label {
  color: #5D4E37;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(139, 90, 43, 0.1);
  letter-spacing: 0.3px;
}

.email-value {
  color: #5D4E37;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}

.email-value a {
  color: #5D4E37;
  text-decoration: none;
  transition: color 0.3s ease;
}

.email-value a:hover {
  color: #8B5A2B;
}
</style>
