import galleryItem from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
  ulGallery: document.querySelector(".js-gallery"),
  modalBox: document.querySelector(".js-lightbox"),
  closeModalBtn: document.querySelector(".lightbox__button"),
  lightboxImage: document.querySelector(".lightbox__image"),
  backdrop: document.querySelector(".lightbox__content"),
};

galleryItem.map((el) => {
  refs.gallery.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item"><a class="gallery__link" href=${el.original}><img class="gallery__image" src=${el.preview} data-source=${el.original} alt=${el.description}/></a></li>`
  );
});

refs.ulGallery.addEventListener("click", openModal);
refs.closeModalBtn.addEventListener("click", closeModal);
refs.backdrop.addEventListener("click", closeBackdrop);

function openModal(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return; // проверка
  refs.modalBox.classList.add("is-open");
  refs.lightboxImage.src = e.target.getAttribute("data-source");
  window.addEventListener("keyup", escapeClose);
}

function closeModal() {
  refs.modalBox.classList.remove("is-open");
  refs.lightboxImage.src = "";
  window.removeEventListener("keyup", escapeClose);
}

function closeBackdrop() {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function escapeClose() {
  if (event.key === "Escape") {
    closeModal();
  }
}
