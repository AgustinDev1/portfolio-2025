document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    function activateLink() {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach(link => link.classList.remove("active"));
        if (navLinks[index]) {
            navLinks[index].classList.add("active");
        }
    }

    function smoothScroll(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, 3000);

            window.scrollTo(0, run);

            if (timeElapsed < 3000) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetUrl = link.getAttribute('href');
            
            // Verifica si el enlace es interno
            if (targetUrl.startsWith('#')) {
                event.preventDefault(); // Solo prevenir el comportamiento por defecto de enlaces internos
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

    window.addEventListener("scroll", activateLink);
    activateLink();
});
