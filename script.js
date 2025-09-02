document.addEventListener('DOMContentLoaded', () => {

// 1. Gestion du menu mobile
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('mobileNav'); // On cible "mobileNav"
if (navToggle && nav) {
  // Gère le clic sur l'icône hamburger
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Fermeture automatique du menu au clic sur un lien
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
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


  // 3. Logique de la galerie Lightbox (CORRIGÉE)
const galleryLinks = document.querySelectorAll('.masonry .tile');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

if (lightbox && galleryLinks.length > 0) {
  // On récupère les URLs des images en grand format depuis les liens
  const images = Array.from(galleryLinks).map(link => link.href);
  let currentIndex = 0;

  const showImage = (index) => {
    // On met à jour la source de l'image dans la lightbox
    lightboxImg.src = images[index];
    currentIndex = index;
    // On affiche la lightbox
    lightbox.classList.add('open'); 
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    // On cache la lightbox
    lightbox.classList.remove('open');
    document.body.style.overflow = 'auto';
  };

  const showNextImage = () => showImage((currentIndex + 1) % images.length);
  const showPrevImage = () => showImage((currentIndex - 1 + images.length) % images.length);

  // On attache l'écouteur d'événement au LIEN (<a>) et non à l'image
  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Empêche le navigateur de suivre le lien
      showImage(index);   // Ouvre la lightbox avec la bonne image
    });
  });

  // Gestion des boutons et de la fermeture
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNextImage);
  prevBtn.addEventListener('click', showPrevImage);
  lightbox.addEventListener('click', (e) => (e.target === lightbox) && closeLightbox());

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
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
