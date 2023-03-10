const images = [
  {
      image: 'img/01.webp',
      title: 'Marvel\'s Spiderman Miles Morales',
      text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
  }, 
  {
      image: 'img/02.webp',
      title: 'Ratchet & Clank: Rift Apart',
      text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
  }, 
  {
      image: 'img/03.webp',
      title: 'Fortnite',
      text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  }, 
  {
      image: 'img/04.webp',
      title: 'Stray',
      text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
  }, 
  {
      image: 'img/05.webp',
      title: "Marvel's Avengers",
      text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
  }
];
// array degli oggetti



// elementi html
const activeImageElement = document.getElementById("active-image");
const arrowUpElement = document.getElementById("arrow-up");
const arrowDownElement = document.getElementById("arrow-down");
const slideTitleElement = document.getElementById("slide-title");
const slideDescriptionElement = document.getElementById("slide-description");

// thumbnails
const thumbnailsElement = document.getElementById("thumbnails");

// controlli autoplay
const startStopButton = document.getElementById("start-stop");
const reverseButton = document.getElementById("reverse");




// popoliamo gli elementi dinamicamente

let slideIndex = 0;






// popoliamo le thumbnails
createThumbnails(thumbnailsElement, images);

// prendere tutte le thumbnail dalla pagina e memorizzarle in un array
const thumbnailsArray = document.querySelectorAll('.thumbnail');


// mostro la prima immagine
showSlide(images, slideIndex);



// al click della freccia giù
arrowDownElement.addEventListener("click", () => {

  // aggiorniamo l'indice
  // slideIndex++;
  slideIndex =  updateIndex(slideIndex, 'giu');

  // chiamo la funzione di visualizzazione della slide con il nuovo indice come parametro
  showSlide(images, slideIndex);

});



// al click della freccia su
arrowUpElement.addEventListener("click", () => {

  // aggiorno l'index
  // slideIndex--;
  slideIndex =  updateIndex(slideIndex, 'su');

  // mostro la slide relativa all'indice
  showSlide(images, slideIndex);
  
})


// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) 
// l’immagine attiva dovrà cambiare alla successiva.

// mi creo una variabile che memorizza se l'autoplay è attivo o no
let isAutoPlayOn = true;
let autoPlayDirection = 'giu';

// memorizzo la timing function in una variabile così la posso manipolare successivamente
let autoplayFunction = setInterval(() => {
  slideIndex = updateIndex(slideIndex, autoPlayDirection);
  showSlide(images, slideIndex);
}, 3000);





// start/stop autoplay
startStopButton.addEventListener("click", () => {

  if(isAutoPlayOn) {

    // rimuovo la timing function
    clearInterval(autoplayFunction);
    
    // modifico la booleana del isPlaying
    isAutoPlayOn = false;
    startStopButton.innerText = "Start";

  } else {


    autoplayFunction = setInterval(() => {
      slideIndex = updateIndex(slideIndex, autoPlayDirection);
      showSlide(images, slideIndex);
    }, 3000);

    isAutoPlayOn = true;


    startStopButton.innerText = "Stop"

  }

});



reverseButton.addEventListener("click", () => {

  
  if(autoPlayDirection == "su") {
    autoPlayDirection = "giu";
  } else {
    autoPlayDirection = "su";
  }
  
  // rimuovo la timing function
  clearInterval(autoplayFunction);

  // la ricreo
  autoplayFunction = setInterval(() => {

    // cambio la slide, in base alla variabile della direzione
    slideIndex = updateIndex(slideIndex, autoPlayDirection);

    // mostro la slide corretta
    showSlide(images, slideIndex);

  }, 3000);

  // modifico la booleana del isPlaying
  isAutoPlayOn = true;

  // gestisco il testo del pulsante
  if(!isAutoPlayOn) {
    startStopButton.innerText = "Start";
  } else {
    startStopButton.innerText = "Stop"
  }

} );




// funzioni


// funzione a cui passo come parametro un oggetto dell'array, e in base a questo oggetto, popola il documento
// questa funzione avrà effetti collaterali, funzionerà solo su questo documento
function showSlide(slideArray, actualIndex) {

  const slideObject = slideArray[actualIndex];

  console.log(slideObject);

  // cambio l'immagine
  activeImageElement.src = slideObject.image;

  // cambio il titolo
  slideTitleElement.innerText = slideObject.title;

  // cambio la descrizione
  slideDescriptionElement.innerText = slideObject.text;


  // rimuovere la classe active da tutte le altre thumbnail
  thumbnailsArray.forEach((actualThumbnail) => {
    actualThumbnail.classList.remove('active');
  })

  // rendo "active" la miniatura relativa all'index
  thumbnailsArray[actualIndex].classList.add('active');


}



// funzione che restituisce l'indice in base alla lunghezza dell'array delle slide
function updateIndex(actualIndex, direction) {

  // controllo quale sia la direzione
  if(direction == "su") {

    // se sono alla prima slide
    if(actualIndex <= 0) {

      return images.length - 1;

    } else {

      return actualIndex - 1;

    }

  } else {

    // se sono all'ultima slide
    if(actualIndex >= images.length -1) {

      return 0;

    } else {

      return actualIndex + 1;

    }

  }

}



// funzione che popola il contenitore delle miniature
/**
 * Description
 * @param {any} thumbnailsContainer
 * @param {Object[]} arrayOfSlides
 * @returns {any}
 */
function createThumbnails(thumbnailsContainer, arrayOfSlides) {
  
  // per ogni elemento di arrayOfSlides
  // il foreach 
  arrayOfSlides.forEach((actualSlide, actualIndex) => {

    // creo un elemento thumbnail
    const newThumbnail = document.createElement("img");
    newThumbnail.classList.add("thumbnail");
    newThumbnail.src = actualSlide.image;

    // modifico l'altezza delle immagini in base alla loro quantità
    // 100% / numero di immagini
    newThumbnail.style.height = "calc(100% / " + arrayOfSlides.length + ")";


    // al click, apri la slide corrispondente all'immagine
    newThumbnail.addEventListener("click", function() {

      // devo modificare l'indice globale (slideIndex) per sicurezza
      slideIndex = actualIndex;
      showSlide(arrayOfSlides, actualIndex);
      
    });

    // appendo la thumbnail appena creata
    thumbnailsContainer.append(newThumbnail);


  });
  

}