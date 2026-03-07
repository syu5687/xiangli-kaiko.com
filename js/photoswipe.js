/* photoswipe
*********************************************/
import PhotoSwipeLightbox from "https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.2.2/photoswipe-lightbox.esm.min.js";
const lightbox = new PhotoSwipeLightbox({
	gallery: "#gallery-x-1, #gallery-x-2, #gallery-k-1, #gallery-k-2",
	children: "a",
	pswpModule: () =>
		import(
			"https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.2.2/photoswipe.esm.min.js"
		),
});
lightbox.init();