import galleryItem from "./gallery-items.js";

const refs = {
  ulGallery: document.querySelector(".js-gallery"),
  modalBox: document.querySelector(".js-lightbox"),
  closeModalBtn: document.querySelector(".lightbox__button"),
  lightboxImage: document.querySelector(".lightbox__image"),
  backdrop: document.querySelector(".lightbox__content"),
};

galleryItem.forEach((el, i) => (el.i = i));

const gallery = galleryItem
  .map((el) => {
    return `<li class="gallery__item"><a class="gallery__link" href=${el.original}><img class="gallery__image" src=${el.preview} data-source=${el.original} data-position=${el.i} alt=${el.description}/></a></li>`;
  })
  .join("");

refs.ulGallery.insertAdjacentHTML("beforeend", gallery);

refs.ulGallery.addEventListener("click", openModal);
refs.closeModalBtn.addEventListener("click", closeModal);
refs.backdrop.addEventListener("click", closeBackdrop);

let activeSlide = 0;

function openModal(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return; // проверка
  refs.modalBox.classList.add("is-open");
  refs.lightboxImage.src = e.target.getAttribute("data-source");
  activeSlide = e.target.dataset.position;
  window.addEventListener("keyup", escapeClose);
  window.addEventListener("keyup", moveRight);
  window.addEventListener("keyup", moveLeft);
}

function closeModal() {
  refs.modalBox.classList.remove("is-open");
  refs.lightboxImage.src = "";
  window.removeEventListener("keyup", escapeClose);
  window.removeEventListener("keyup", moveRight);
  window.removeEventListener("keyup", moveLeft);
}

function closeBackdrop(e) {
  if (e.target === event.currentTarget) {
    closeModal();
  }
}

function escapeClose(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

function moveRight() {
  if (event.key === "ArrowLeft") {
    activeSlide--;
    if (activeSlide < 0) {
      activeSlide = galleryItem.length - 1;
    }
    refs.lightboxImage.src = galleryItem[activeSlide].original;
  }
}

function moveLeft() {
  if (event.key === "ArrowRight") {
    activeSlide++;
    if (activeSlide > galleryItem.length - 1) {
      activeSlide = 0;
    }
    refs.lightboxImage.src = galleryItem[activeSlide].original;
  }
}
