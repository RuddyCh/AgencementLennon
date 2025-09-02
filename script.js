document.addEventListener('DOMContentLoaded', () => {

// 1. Gestion du menu mobile
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  // Gère le clic sur l'icône hamburger
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.classList.toggle('is-open', isOpen); 
  });

  // Fermeture automatique du menu au clic sur un lien
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

  // 2. Gestion du bandeau de cookies
  if (!document.querySelector('.legal-page')) { // Ne pas afficher sur les pages légales
    const cookieBanner = document.createElement("div");
    cookieBanner.id = "cookie-banner";
    cookieBanner.innerHTML = `
      <div class="container cookie-container">
        <p>Nous utilisons des cookies pour améliorer votre expérience. 
        <a href="politique-cookies.html" style="text-decoration: underline;">En savoir plus</a>.</p>
        <div>
          <button id="accept-cookies">Accepter</button>
          <button id="decline-cookies">Refuser</button>
        </div>
      </div>`;

    if (localStorage.getItem("cookiesAccepted") === null) {
      document.body.appendChild(cookieBanner);
    }

    const acceptBtn = document.getElementById("accept-cookies");
    const declineBtn = document.getElementById("decline-cookies");

    acceptBtn?.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.style.display = "none";
    });

    declineBtn?.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "false");
      cookieBanner.style.display = "none";
    });
  }


  // 3. Logique de la galerie Lightbox
  const galleryItems = document.querySelectorAll('.masonry .tile img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (lightbox && galleryItems.length > 0) {
    const images = Array.from(galleryItems).map(item => item.src);
    let currentIndex = 0;

    const showImage = (index) => {
      lightboxImg.src = images[index];
      currentIndex = index;
      lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    const showNextImage = () => showImage((currentIndex + 1) % images.length);
    const showPrevImage = () => showImage((currentIndex - 1 + images.length) % images.length);

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        showImage(index);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    lightbox.addEventListener('click', (e) => (e.target === lightbox) && closeLightbox());

    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
      }
    });
  }


  // 4. Animations au défilement (Fade-in)
  const animatedElements = document.querySelectorAll('.fade-in');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => observer.observe(element));
  }
});
