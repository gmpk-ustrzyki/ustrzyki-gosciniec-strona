<template>
  <section class="map-section">
    <div class="container">
      <div class="content-wrapper">
        
        
            
            
        
        
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2587.8667839934797!2d22.590819776901396!3d49.43132997139362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c5d7e5e5e5e5d%3A0x5e5e5e5e5e5e5e5e!2sStrwi%C4%85%C5%BCyk%2035A%2C%2038-700%20Ustrzyki%20Dolne!5e0!3m2!1spl!2spl!4v1234567890123!5m2!1spl!2spl"
            width="600"
            height="450"
            style="border:0;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Mapa lokalizacji gościńca w Ustrzykach Dolnych"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
.map-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  position: relative;
  overflow: hidden;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
}

.map-container {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgb(246, 245, 245);
  height: 500px;
}

.map-container iframe {
  width: 100%;
  height: 100%;
  display: block;
}


@media (max-width: 968px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .map-container {
    height: 400px;
  }

  .info-box {
    padding: 30px;
  }

  .info-box h2 {
    font-size: 1.75rem;
  }
}

@media (max-width: 640px) {
  .map-section {
    padding: 40px 15px;
  }

  .info-box {
    padding: 25px;
  }

  .info-box h2 {
    font-size: 1.5rem;
  }

  .info-item {
    gap: 15px;
  }

  .map-container {
    height: 350px;
  }
}
</style>