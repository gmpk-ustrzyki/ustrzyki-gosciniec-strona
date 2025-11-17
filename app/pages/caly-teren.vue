<template>
  <div class="caly-teren-wrapper">
    <div class="caly-teren-content">
      <NuxtLink to="/">
        <button class="back-button">← Powrót na stronę główną</button>
      </NuxtLink>

      <h1 class="caly-teren-title">Cały Teren z Domkiem i Gościńcem</h1>

      <p class="caly-teren-description">
        Wynajmij cały nasz teren wraz z domkiem i gościńcem dla wyjątkowego pobytu w Bieszczadach.
        Idealne rozwiązanie dla większych grup, rodzinnych spotkań lub firm szukających miejsca na integrację.
      </p>

      <div class="caly-teren-features">
        <div class="feature">Bezpłatne Wi-Fi</div>
        <div class="feature">Całkowita prywatność i przestrzeń</div>
        <div class="feature">Bezpłatny parking</div>
        <div class="feature">Ognisko, grill</div>
        <div class="feature">Zimową porą kuligi z ogniskami</div>
      </div>

      <div class="image-gallery">
        <img
          src="https://www.dropbox.com/scl/fi/s556uwj8izooyx97x52gz/calyterenopcje.jpg?rlkey=lloxvzk16xwfpdtzi95s2o6my&st=ud66vfn3&dl=0&raw=1"
          alt="Cały teren - widok ogólny"
        />
        <img
          src="https://www.dropbox.com/scl/fi/do8bgct0luxn9bm7eze33/staw.jpg?rlkey=gqi19ht8zdz0dmhyct2ufiu5i&st=duehwzq6&dl=0&raw=1"
          alt="Staw na terenie"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.caly-teren-wrapper {
  background: linear-gradient(135deg, rgba(26, 27, 26, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%),
    url('https://www.dropbox.com/scl/fi/ghymow5b5eu6ilt5zh7ac/udogodnienia_bg.webp?rlkey=8zjg81t5iehlkmocf6wsca94p&st=dpk8ngjh&dl=0&raw=1');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.caly-teren-content {
  max-width: 900px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.caly-teren-title {
  font-family: Georgia, serif;
  font-size: 3rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .caly-teren-title {
    font-size: 2rem;
  }
}

.caly-teren-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.caly-teren-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.feature {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(46, 125, 50, 0.1);
  border-left: 4px solid #2e7d32;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #2c3e50;
}

.feature:hover {
  background: rgba(46, 125, 50, 0.15);
  transform: translateX(5px);
  transition: all 0.3s ease;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.image-gallery img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.image-gallery img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .image-gallery {
    grid-template-columns: 1fr;
  }

  .image-gallery img {
    height: 250px;
  }
}

.back-button {
  background: #7c704c;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.back-button:hover {
  background: #5d5436;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
