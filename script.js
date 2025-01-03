document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Función para activar el enlace correspondiente durante el scroll
    function activateLink() {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach(link => link.classList.remove("active"));
        if (navLinks[index]) {
            navLinks[index].classList.add("active");
        }
    }

    // Función para realizar el desplazamiento suave (smooth scroll)
    function smoothScroll(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = window.innerWidth <= 768 ? 1500 : 3000; // Reducir la duración en móviles
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);

            window.scrollTo(0, run);

            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Añadir el evento de click en los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetUrl = link.getAttribute('href');
            
            // Verifica si el enlace es interno
            if (targetUrl.startsWith('#')) {
                event.preventDefault(); // Prevenir el comportamiento por defecto de enlaces internos
                const targetSection = document.querySelector(targetUrl);
                if (targetSection) {
                    smoothScroll(targetSection);
                }
            }

            // Efecto hover
            link.classList.add('active-hover');
            setTimeout(() => {
                link.classList.remove('active-hover');
            }, 3000);
        });
    });

    // se activa el enlace al hacer scroll
    window.addEventListener("scroll", activateLink);
    activateLink();
});

// Obtener el botón de la flecha
const backToTopButton = document.getElementById('back-to-top');

// Función para mostrar u ocultar la flecha cuando el usuario hace scroll
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block"; // Mostrar la flecha
    } else {
        backToTopButton.style.display = "none"; // Ocultar la flecha
    }
};

// Función para hacer el scroll hacia arriba con un desplazamiento suave de 3 segundos
backToTopButton.addEventListener('click', function() {
    const startPosition = window.pageYOffset; // Posición actual del scroll
    const endPosition = 0; // Queremos llegar a la parte superior de la página
    const duration = 3000; // Duración del desplazamiento (3 segundos)
    const startTime = performance.now(); // Capturamos el tiempo de inicio

    // Función de animación para el scroll suave
    function scrollAnimation(currentTime) {
        const timeElapsed = currentTime - startTime; // Tiempo transcurrido
        const progress = Math.min(timeElapsed / duration, 1); // Asegura que no se pase de 1

        // Calcula la nueva posición de desplazamiento
        window.scrollTo(0, startPosition + (endPosition - startPosition) * progress);

        // Continúa la animación mientras no haya llegado al final
        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    requestAnimationFrame(scrollAnimation); // Inicia la animación
});
