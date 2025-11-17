<template>
  <div class="facebook-feed">
    <div class="feed-header">
      <h2>📱 Najnowsze posty z Facebooka</h2>
      <p>Obserwuj nas na Facebooku, aby być na bieżąco!</p>
    </div>
    
    <div class="facebook-container">
      <iframe 
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBieszczadzkiOgrod&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
        width="500" 
        height="800" 
        style="border:none;overflow:hidden" 
        scrolling="no" 
        frameborder="0" 
        allowfullscreen="true" 
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.facebook-feed {
  background: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(139, 111, 71, 0.15);
  border: 2px solid #d4c4a8;
}

.feed-header {
  text-align: center;
  margin-bottom: 2rem;
}

.feed-header h2 {
  font-size: 2rem;
  color: #8B6F47;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.feed-header p {
  color: #666;
  font-size: 1.1rem;
}

.facebook-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.facebook-container iframe {
  max-width: 100%;
  border-radius: 8px;
}


@media (max-width: 768px) {
  .facebook-feed {
    padding: 2rem 1rem;
  }

  .feed-header h2 {
    font-size: 1.5rem;
  }

  .feed-header p {
    font-size: 1rem;
  }

  .facebook-container iframe {
    width: 100% !important;
    height: 600px;
  }
}
</style>