function createCarousel(containerId, imagePaths) {
    const container = document.getElementById(containerId);
  
    if (!container) {
      console.error('Container not found:', containerId);
      return;
    }
  
    // Agregar archivo CSS dinámicamente
    const existingCarouselLink = document.querySelector("link[href='/styles/carousel.css']");
    if (!existingCarouselLink) {
      const carouselLink = document.createElement('link');
      carouselLink.rel = 'stylesheet';
      carouselLink.href = '/styles/carousel.css';
      document.head.appendChild(carouselLink);
    }
  
    // Crear la estructura HTML
    const carousel = document.createElement('div');
    carousel.classList.add('carousel', 'position-relative');
  
    const imagesDiv = document.createElement('div');
    imagesDiv.classList.add('carousel-images');
  
    imagePaths.forEach((path, index) => {
      const img = document.createElement('img');
      img.src = path;
      img.alt = `Image ${index + 1}`;
      img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; // Agregar transición
      img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.05)';
        img.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
      });
      img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
        img.style.boxShadow = 'none';
      });
      imagesDiv.appendChild(img);
    });
  
    const indicatorsDiv = document.createElement('div');
    indicatorsDiv.classList.add('carousel-indicators', 'd-flex', 'justify-content-center', 'position-absolute', 'bottom-0', 'w-100');
  
    imagePaths.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.dataset.index = index;
      indicatorsDiv.appendChild(indicator);
    });
  
    carousel.appendChild(imagesDiv);
    carousel.appendChild(indicatorsDiv);
    container.appendChild(carousel);
  
    // Lógica del carrusel
    const indicators = indicatorsDiv.querySelectorAll('.indicator');
    let currentIndex = 0;
  
    function updateCarousel(index) {
      const offset = index * -500; // Ajustar según el ancho de la imagen
      imagesDiv.style.transform = `translateX(${offset}px)`;
  
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }
  
    indicators.forEach((indicator) => {
      indicator.addEventListener('click', () => {
        currentIndex = parseInt(indicator.dataset.index);
        updateCarousel(currentIndex);
      });
    });
  }
  