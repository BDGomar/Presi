
// Sélection des éléments nécessaires
const carouselTrack = document.querySelector(".carousel-track");
const slides = Array.from(carouselTrack.children);

// Configuration de l'index initial et du délai
let currentIndex = 0;
const slideInterval = 3000; // Temps entre les transitions en millisecondes
let autoScrollTimeout; // Variable pour gérer l'arrêt automatique

// Fonction pour déplacer le carrousel
function moveToSlide(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  carouselTrack.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Fonction pour gérer le défilement automatique
function startCarousel() {
  autoScrollTimeout = setTimeout(() => {
    currentIndex++;
    // Si l'index dépasse le dernier slide, réinitialiser sans transition pour continuer
    if (currentIndex >= slides.length) {
      currentIndex = -1;
      carouselTrack.style.transition = "transform 0.5s ease"; // Supprime la transition
      moveToSlide(currentIndex);
      // Redémarre avec une transition fluide
      requestAnimationFrame(() => {
        currentIndex++;
        moveToSlide(currentIndex);
      });
    } else {
      // Transition normale si on est encore dans la liste
      moveToSlide(currentIndex);
    }
    startCarousel(); // Redémarre la boucle
  }, slideInterval);
}

// Fonction pour arrêter le défilement automatique
function stopCarousel() {
  clearTimeout(autoScrollTimeout);
}

// Ajout d'événements pour arrêter/reprendre le défilement
carouselTrack.addEventListener("mouseenter", stopCarousel); // Arrête si la souris entre
carouselTrack.addEventListener("mouseleave", startCarousel); // Reprend après avoir quitté

// Initialisation
startCarousel();




// API pour stoper la video si hors de vue
document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById('video-temoignage');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (!entry.isIntersecting) {
              video.pause();
          }
      });
  }, {
      threshold: 0.25 // Ajustez ce seuil selon vos besoins
  });

  observer.observe(video);
});

