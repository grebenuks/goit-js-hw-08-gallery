import galleryItem from "./gallery-items.js";

let gallery = document.querySelector(".gallery");

galleryItem.map((el) => {
  gallery.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item"><a class="gallery__link" href=${el.original}><img class="gallery__image" src=${el.preview} data-source=${el.original} alt=${el.description}/></a></li>`
  );
});

const ulGallery = document.querySelector(".js-gallery");
ulGallery.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(event.target);
});
