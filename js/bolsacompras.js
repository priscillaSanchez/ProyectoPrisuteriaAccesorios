document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('productCarouselAretes');
    const prevBtn = document.getElementById('prevBtnAretes');
    const nextBtn = document.getElementById('nextBtnAretes');
    const cards = document.querySelectorAll('.Aretes');
  
    let currentPosition = 0;
    let cardWidth = 0;
    let visibleCards = 0;
    let maxPosition = 0;
  
    //  Actualiza las dimensiones y la lógica del carrusel
    function updateDimensions() {
      const containerWidth = carousel.parentElement.clientWidth;
  
      // Lógica responsiva
      if (window.innerWidth > 992) {
        visibleCards = 3; // Muestra 3 productos en pantallas grandes
      } else if (window.innerWidth > 768) {
        visibleCards = 2; // Muestra 2 productos en pantallas medianas
      } else {
        visibleCards = 1; // Muestra 1 producto en pantallas pequeñas
      }
  
      // Calcula el ancho de cada tarjeta
      cardWidth = containerWidth / visibleCards;
  
      cards.forEach(card => {
        card.style.minWidth = `${cardWidth}px`;
        card.style.maxWidth = `${cardWidth}px`;
      });
  
      // Calcula el máximo desplazamiento del carrusel
      maxPosition = Math.max(0, cards.length - visibleCards);
  
      // Asegura que la posición no se desborde
      if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
      }
  
      updateCarouselPosition();
      updateButtonsVisibility();
    }
  
    // Mueve el carrusel en la dirección deseada
    function moveCarousel(direction) {
      currentPosition += direction;
  
      // No dejar que el carrusel se desplace fuera de los límites
      if (currentPosition < 0) currentPosition = 0;
      if (currentPosition > maxPosition) currentPosition = maxPosition;
  
      updateCarouselPosition();
      updateButtonsVisibility();
    }
  
    // Actualiza la posición del carrusel
    function updateCarouselPosition() {
      carousel.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
    }
  
    // Actualiza la visibilidad de los botones de navegación
    function updateButtonsVisibility() {
      prevBtn.style.opacity = currentPosition === 0 ? '0.3' : '1';
      prevBtn.style.pointerEvents = currentPosition === 0 ? 'none' : 'auto';
  
      nextBtn.style.opacity = currentPosition === maxPosition ? '0.3' : '1';
      nextBtn.style.pointerEvents = currentPosition === maxPosition ? 'none' : 'auto';
    }
  
    // Eventos de los botones de navegación
    prevBtn.addEventListener('click', () => moveCarousel(-1));
    nextBtn.addEventListener('click', () => moveCarousel(1));
  
    // Inicializa el carrusel y redimensiona cuando la ventana cambie
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  });
  
  //pulseras

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('productCarouselPulseras');
  const prevBtn = document.getElementById('prevBtnPulseras');
  const nextBtn = document.getElementById('nextBtnPulseras');
  const cards = carousel.querySelectorAll('.product-card');

  let currentPosition = 0;
  let cardWidth = 0;
  let visibleCards = 1;
  let maxPosition = 0;

  function updateDimensions() {
    const containerWidth = carousel.parentElement.clientWidth;

    if (window.innerWidth > 992) {
      visibleCards = 4;
    } else if (window.innerWidth > 768) {
      visibleCards = 3;
    } else if (window.innerWidth > 576) {
      visibleCards = 2;
    } else {
      visibleCards = 1;
    }

    cardWidth = containerWidth / visibleCards;

    cards.forEach(card => {
      card.style.minWidth = `${cardWidth}px`;
    });

    maxPosition = Math.max(0, cards.length - visibleCards);

    if (currentPosition > maxPosition) {
      currentPosition = maxPosition;
    }

    updateCarouselPosition();
    updateButtonsVisibility();
  }

  function moveCarousel(direction) {
    currentPosition += direction;
    if (currentPosition < 0) currentPosition = 0;
    if (currentPosition > maxPosition) currentPosition = maxPosition;
    updateCarouselPosition();
    updateButtonsVisibility();
  }

  function updateCarouselPosition() {
    carousel.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
  }

  
  prevBtn.addEventListener('click', () => moveCarousel(-1));
  nextBtn.addEventListener('click', () => moveCarousel(1));

  updateDimensions();
  window.addEventListener('resize', updateDimensions);
});