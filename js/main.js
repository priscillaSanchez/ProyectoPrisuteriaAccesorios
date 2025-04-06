
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Galeria de fotos
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


///Formulario 
function calcularEdad() {
  const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
  if (fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    document.getElementById('edad').value = edad;
  }
}
//Seccion Joyeria Inicio
document.addEventListener("DOMContentLoaded", function() {
  let currentIndex = 0;

  function moveSlide(direction) {
      console.log("Botón presionado:", direction); // Verifica si se detecta el clic
      
      const gallery = document.querySelector('.gallery');
      const products = document.querySelectorAll('.product');

      if (!gallery || products.length === 0) {
          console.error("Error: No se encontraron productos o la galería");
          return;
      }

      const visibleItems = 3;
      const maxIndex = Math.max(0, products.length - visibleItems);

      console.log("Max Index:", maxIndex);

      // Actualizar índice con límites
      let newIndex = currentIndex + direction;
      if (newIndex < 0 || newIndex > maxIndex) {
          console.warn("Límite alcanzado:", newIndex);
          return; // No mover si está en el límite
      }
      currentIndex = newIndex;

      // Obtener ancho del primer producto
      const itemWidth = products[0].offsetWidth + 
                       (parseInt(window.getComputedStyle(products[0]).marginLeft) || 0) + 
                       (parseInt(window.getComputedStyle(products[0]).marginRight) || 0);

      console.log("Ancho de cada producto:", itemWidth);
      
      // Mover la galería
      gallery.style.transition = 'transform 0.3s ease';
      gallery.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

      console.log("Índice actualizado:", currentIndex, "Transform:", `translateX(-${currentIndex * itemWidth}px)`);
  }

  // Asignar eventos a los botones
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");

  if (leftArrow && rightArrow) {
      leftArrow.addEventListener("click", () => moveSlide(-1));
      rightArrow.addEventListener("click", () => moveSlide(1));
  } else {
      console.error("No se encontraron los botones");
  }
});

//Tienda

//Secccion Joyeria
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('productCarouselJoyeria');
  const prevBtn = document.getElementById('prevBtnJoyeria');
  const nextBtn = document.getElementById('nextBtnJoyeria');
  const cards = document.querySelectorAll('.Joyeria');

  let currentPosition = 0;
  let cardWidth = 0;
  let visibleCards = 0;
  let maxPosition = 0;

  //  Asegura que el contenedor se pueda deslizar horizontalmente
  //carousel.style.display = 'flex';
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

      // 🔧 Ajusta el ancho de cada tarjeta
      cardWidth = containerWidth / visibleCards;

      cards.forEach(card => {
          card.style.minWidth = `${cardWidth}px`;
          card.style.maxWidth = `${cardWidth}px`;
      });

      // 📏 Calcula cuántos pasos de desplazamiento hay
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
      carousel.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
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


  
