// Mobile nav
const btn = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if(btn && nav){
  btn.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Basic lazy loading for any images added in gallery later
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.addEventListener('error', () => { img.removeAttribute('loading'); });
});


document.addEventListener("DOMContentLoaded", () => {
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.innerHTML = `
    <div class="cookie-container">
      <p>Nous utilisons des cookies pour améliorer votre expérience. 
      <a href="politique-cookies.html">En savoir plus</a>.</p>
      <button id="accept-cookies">Accepter</button>
      <button id="decline-cookies">Refuser</button>
    </div>`;
  document.body.appendChild(banner);

  const acceptBtn = document.getElementById("accept-cookies");
  const declineBtn = document.getElementById("decline-cookies");

  if (localStorage.getItem("cookiesAccepted") === "true") {
    banner.style.display = "none";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.style.display = "none";
  });

  declineBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "false");
    banner.style.display = "none";
  });
});

// Lightbox Gallery Logic
document.addEventListener('DOMContentLoaded', () => {
  // Sélectionne toutes les images dans la galerie
  const galleryItems = document.querySelectorAll('.masonry .tile img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  // Si les éléments de la lightbox n'existent pas, on ne fait rien
  if (!lightbox || !lightboxImg || !closeBtn || !prevBtn || !nextBtn) {
    return;
  }

  let currentIndex = 0;
  // Crée un tableau avec les chemins de toutes les images de la galerie
  const images = Array.from(galleryItems).map(item => item.src);

  // Fonction pour afficher une image spécifique dans la lightbox
  const showImage = (index) => {
    lightboxImg.src = images[index];
    currentIndex = index;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Empêche le défilement de la page en arrière-plan
  };

  // Ajoute un écouteur d'événement sur chaque image de la galerie
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      showImage(index);
    });
  });

  // Fonction pour fermer la lightbox
  const closeLightbox = () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Réactive le défilement
  };

  // Fonction pour afficher l'image suivante
  const showNextImage = () => {
    const newIndex = (currentIndex + 1) % images.length; // Boucle à la première image si on est à la fin
    showImage(newIndex);
  };

  // Fonction pour afficher l'image précédente
  const showPrevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length; // Boucle à la dernière image
    showImage(newIndex);
  };

  // Écouteurs pour les boutons de contrôle
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNextImage);
  prevBtn.addEventListener('click', showPrevImage);

  // Ferme la lightbox si on clique sur le fond noir
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation au clavier (flèches et Echap)
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      }
    }
  });
});

// Animation au défilement (Fade-in)
document.addEventListener('DOMContentLoaded', () => {
  // Sélectionne tous les éléments qu'on veut animer
  const animatedElements = document.querySelectorAll('.fade-in');

  // Si il n'y a pas d'éléments à animer, on ne fait rien
  if (animatedElements.length === 0) return;

  // Crée un "observateur" qui va surveiller quand les éléments entrent dans l'écran
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Si l'élément est visible à l'écran...
      if (entry.isIntersecting) {
        // ...on lui ajoute la classe "visible" pour déclencher l'animation CSS
        entry.target.classList.add('visible');
        // On arrête de l'observer pour que l'animation ne se joue qu'une fois
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
  });

  // Demande à l'observateur de surveiller chaque élément à animer
  animatedElements.forEach(element => {
    observer.observe(element);
  });
});
