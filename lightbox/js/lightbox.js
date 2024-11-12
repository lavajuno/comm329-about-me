const LIGHTBOX_OVERLAY = document.getElementById("lightbox_overlay");
const LIGHTBOX_GALLERY = document.getElementById("lightbox_gallery");
const LIGHTBOX_IMAGE = LIGHTBOX_OVERLAY.querySelector("img");
const GALLERY_IMAGES = LIGHTBOX_GALLERY.querySelectorAll("img");
let index = 0;

/**
 * @param {HTMLImageElement} image 
 */
function setLightboxImage(image) {
    LIGHTBOX_IMAGE.src = image.src;
    LIGHTBOX_IMAGE.alt = image.alt;
}

window.addEventListener("load", () => {
    GALLERY_IMAGES.forEach((image, this_index) => {
        image.addEventListener("click", () => {
            setLightboxImage(image);
            index = this_index;
            LIGHTBOX_OVERLAY.style.display = "flex";
        })
    });

    LIGHTBOX_OVERLAY.querySelector(".close").addEventListener("click", () => {
        LIGHTBOX_OVERLAY.style.display = "none";
    });

    LIGHTBOX_OVERLAY.querySelector(".next").addEventListener("click", () => {
        index++;
        if(index > GALLERY_IMAGES.length) { index = GALLERY_IMAGES.length; }
        setLightboxImage(GALLERY_IMAGES[index]);
    });

    LIGHTBOX_OVERLAY.querySelector(".prev").addEventListener("click", () => {
        index--;
        if(index < 0) { index = 0; }
        setLightboxImage(GALLERY_IMAGES[index]);
    });
});
