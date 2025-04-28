document.addEventListener('DOMContentLoaded', function() {

  // --- Animación para las cards al hacer scroll ---
  const cardsToAnimate = document.querySelectorAll('.info-card, .value-item, .beneficio-item, .timeline-content'); // Clases a animar

  // Ocultar inicialmente las tarjetas para animación
  cardsToAnimate.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  const animateOnScroll = () => {
      const triggerBottom = window.innerHeight / 5 * 4; // Punto de activación

      cardsToAnimate.forEach(card => {
          const cardTop = card.getBoundingClientRect().top;
          if (cardTop < triggerBottom) {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
              // Opcional: remover event listener una vez animado para optimizar
              // card.classList.add('animated'); // Añadir clase si se necesita
          }
          // Opcional: para re-animar si se sale de vista y vuelve a entrar
          /* else {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
          } */
      });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Ejecutar una vez al cargar por si hay elementos visibles

  // --- Smooth scroll para enlaces internos (#) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Asegurarse que no sea solo "#" o un enlace de componente Bootstrap
      if (href && href !== '#' && !this.getAttribute('data-bs-toggle')) {
           e.preventDefault();
           const targetId = href;
           try {
               const targetElement = document.querySelector(targetId);
               if (targetElement) {
                  const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70; // Obtener altura del navbar dinámicamente
                  const elementPosition = targetElement.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                  window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                  });
              }
          } catch (error) {
              console.error("Error finding element for smooth scroll:", error);
          }
      }
    });
  });

  // --- Cambiar clase activa en navbar ---
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  // Obtener el nombre del archivo actual de la URL
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    // Quitar 'active' de todos primero
    link.classList.remove('active');
    // Añadir 'active' si el href coincide con la página actual
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page'); // Mejor para accesibilidad
    } else {
      link.removeAttribute('aria-current');
    }
  });

}); // Fin de DOMContentLoaded
