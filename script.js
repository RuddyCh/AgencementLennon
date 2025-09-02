document.addEventListener('DOMContentLoaded', () => {

  // 1. Gestion du menu mobile (AMÉLIORÉE)
  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  const nav = document.getElementById('mobileNav');

  if (navToggle && nav && navClose) {
    const openNav = () => {
      nav.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Bloque le scroll du body
    };

    const closeNav = () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = 'auto'; // Réactive le scroll
    };

    // Ouvre le menu
    navToggle.addEventListener('click', openNav);
    
    // Ferme le menu avec le bouton X
    navClose.addEventListener('click', closeNav);

    // Fermeture auto en cliquant sur un lien
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Fermeture avec la touche "Échap"
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
      }
    });

    // Fermeture en cliquant en dehors du menu
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== navToggle) {
        closeNav();
      }
    });
  }

  // 2. Gestion du bandeau de cookies (AMÉLIORÉE)
  const createCookieBanner = () => {
    // Si le bandeau existe déjà, on ne fait rien
    if (document.getElementById("cookie-banner")) return;
    
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.backgroundColor = 'var(--blue-dark)';
    banner.style.color = 'white';
    banner.style.padding = '1rem';
    banner.style.zIndex = '2000';
    banner.style.boxShadow = '0 -5px 15px rgba(0,0,0,0.1)';
    
    banner.innerHTML = `
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <p style="margin: 0;">Nous utilisons des cookies pour améliorer votre expérience. 
        <a href="politique-cookies.html" style="text-decoration: underline; color: white;">En savoir plus</a>.</p>
        <div style="display: flex; gap: 0.5rem;">
          <button id="accept-cookies" class="btn">Accepter</button>
          <button id="decline-cookies" class="btn btn-outline">Refuser</button>
        </div>
      </div>`;
      
    document.body.appendChild(banner);
    
    const acceptBtn = document.getElementById("accept-cookies");
    const declineBtn = document.getElementById("decline-cookies");

    acceptBtn?.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      banner.remove();
    });

    declineBtn?.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "false");
      banner.remove();
    });
  };

  // Afficher le bandeau seulement si aucun choix n'a été fait
  if (localStorage.getItem("cookiesAccepted") === null) {
    createCookieBanner();
  }

  // Gérer le clic sur le lien "Gérer les cookies"
  const manageCookiesLink = document.getElementById('manageCookies');
  if(manageCookiesLink) {
    manageCookiesLink.addEventListener('click', (e) => {
      e.preventDefault();
      // On supprime l'ancien choix pour que le bandeau s'affiche à nouveau
      localStorage.removeItem("cookiesAccepted");
      createCookieBanner();
    });
  }

  // 3. Logique de la galerie Lightbox (INCHANGÉE)
  const galleryLinks = document.querySelectorAll('.masonry .tile');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (lightbox && galleryLinks.length > 0) {
    const images = Array.from(galleryLinks).map(link => link.href);
    let currentIndex = 0;

    const showImage = (index) => {
      lightboxImg.src = images[index];
      currentIndex = index;
      lightbox.classList.add('open'); 
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = 'auto';
    };

    const showNextImage = () => showImage((currentIndex + 1) % images.length);
    const showPrevImage = () => showImage((currentIndex - 1 + images.length) % images.length);

    galleryLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showImage(index);
      });
    });

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

  // 4. Animations au défilement (Fade-in) (INCHANGÉE)
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
