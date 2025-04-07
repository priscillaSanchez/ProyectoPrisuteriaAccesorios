const listaAccesorios=document.querySelector('#listaAccesorios');
document.addEventListener('DOMContentLoaded', function(){
   eventListener();

});

function eventListener(){
    listaAccesorios.addEventListener('click',getDataElements);

}


//Seccion Aretes
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('productCarouselAretes');
    const prevBtn = document.getElementById('prevBtnAretes');
    const nextBtn = document.getElementById('nextBtnAretes');
    const cards = document.querySelectorAll('.Aretes');
  
    let currentPosition = 0;
    let cardWidth = 0;
    let visibleCards = 0;
    let maxPosition = 0;
  
    //  Asegura que el contenedor se pueda deslizar horizontalmente
    //  carousel.style.display = 'flex';
    //  carousel.style.transition = 'transform 0.3s ease-in-out';
    //  carousel.style.willChange = 'transform';
  
    //  Actualiza medidas y lógica de carrusel
    function updateDimensions() {
        const containerWidth = carousel.parentElement.clientWidth;
  
        //  Lógica responsiva
        if (window.innerWidth > 992) {
            visibleCards = 4;
        } else if (window.innerWidth > 768) {
            visibleCards = 3;
        } else if (window.innerWidth > 576) {
            visibleCards = 2;
        } else {
            visibleCards = 1;
        }
  
        //  Ajusta el ancho de cada tarjeta
        cardWidth = containerWidth / visibleCards;
  
        cards.forEach(card => {
            card.style.minWidth = ${cardWidth}px;
            card.style.maxWidth = ${cardWidth}px;
        });
  
        // Calcula cuántos pasos de desplazamiento hay
        maxPosition = Math.max(0, cards.length - visibleCards);
  
        //  Corrige posición si está fuera de rango
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
        }
  
        updateCarouselPosition();
        updateButtonsVisibility();
    }
  
    //  Desplaza el carrusel
    function moveCarousel(direction) {
        currentPosition += direction;
  
        //  No salir de límites
        if (currentPosition < 0) currentPosition = 0;
        if (currentPosition > maxPosition) currentPosition = maxPosition;
  
        updateCarouselPosition();
        updateButtonsVisibility();
    }
  
    //  Aplica el desplazamiento
    function updateCarouselPosition() {
        carousel.style.transform = translateX(-${currentPosition * cardWidth}px);
    }
  
    //  Oculta botones si no se puede mover más
    function updateButtonsVisibility() {
        prevBtn.style.opacity = currentPosition === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentPosition === 0 ? 'none' : 'auto';
  
        nextBtn.style.opacity = currentPosition === maxPosition ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentPosition === maxPosition ? 'none' : 'auto';
    }
  
    // Botones
  
    prevBtn.addEventListener('click', () => moveCarousel(-1));
    nextBtn.addEventListener('click', () => moveCarousel(1));
  
    //  Redimensionar / cargar
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  });
  
  
  
  //Seccion Pulseras
  document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('productCarouselPulseras');
    const prevBtnA = document.getElementById('prevBtnPulseras');
    const nextBtnA = document.getElementById('nextBtnPulseras');
    const cards = document.querySelectorAll('.Pulseras');
  
    let currentPosition = 0;
    let cardWidth = 0;
    let visibleCards = 0;
    let maxPosition = 0;
  
    //  Asegura que el contenedor se pueda deslizar horizontalmente
    //  carousel.style.display = 'flex';
    //  carousel.style.transition = 'transform 0.3s ease-in-out';
    //  carousel.style.willChange = 'transform';
  
    //  Actualiza medidas y lógica de carrusel
    function updateDimensions() {
        const containerWidth = carousel.parentElement.clientWidth;
  
        //  Lógica responsiva
        if (window.innerWidth > 992) {
            visibleCards = 4;
        } else if (window.innerWidth > 768) {
            visibleCards = 3;
        } else if (window.innerWidth > 576) {
            visibleCards = 2;
        } else {
            visibleCards = 1;
        }
  
        //  Ajusta el ancho de cada tarjeta
        cardWidth = containerWidth / visibleCards;
  
        cards.forEach(card => {
            card.style.minWidth = ${cardWidth}px;
            card.style.maxWidth = ${cardWidth}px;
        });
  
        // Calcula cuántos pasos de desplazamiento hay
        maxPosition = Math.max(0, cards.length - visibleCards);
  
        //  Corrige posición si está fuera de rango
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
        }
  
        updateCarouselPosition();
        updateButtonsVisibility();
    }
  
    //  Desplaza el carrusel
    function moveCarousel(direction) {
        currentPosition += direction;
  
        //  No salir de límites
        if (currentPosition < 0) currentPosition = 0;
        if (currentPosition > maxPosition) currentPosition = maxPosition;
  
        updateCarouselPosition();
        updateButtonsVisibility();
    }
  
    //  Aplica el desplazamiento
    function updateCarouselPosition() {
        carousel.style.transform = translateX(-${currentPosition * cardWidth}px);
    }
  
    //  Oculta botones si no se puede mover más
    function updateButtonsVisibility() {
      prevBtnA.style.opacity = currentPosition === 0 ? '0.3' : '1';
      prevBtnA.style.pointerEvents = currentPosition === 0 ? 'none' : 'auto';
  
        nextBtnA.style.opacity = currentPosition === maxPosition ? '0.3' : '1';
        nextBtnA.style.pointerEvents = currentPosition === maxPosition ? 'none' : 'auto';
    }
  
    // Botones
    prevBtnA.addEventListener('click', () => moveCarousel(-1));
    nextBtnA.addEventListener('click', () => moveCarousel(1));
  
    //  Redimensionar / cargar
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  });