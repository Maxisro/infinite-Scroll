const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

//Unsplash API
let initialCount = 5;
const apiKey = "wgah__Q8rPPf0PJ1ezn0K8z-O3t0uadT3MSSc2pdcGM";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}&query='Cats'`;

function updateAPIURLWithNewCount(picCount) {
	apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}&query='Cats'`;
}

// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

//Helper function to Set Attributes
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

//Create Elements For Link & Photos, ADD to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	//Run function for each object in Array
	photosArray.forEach((photo) => {
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});

		const img = document.createElement("img");
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		//Event Listener, check when each is finished loading
		img.addEventListener("load", imageLoaded);

		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos
async function getPhotosFromUnsplashApi() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
		if (isInitialLoad) {
			updateAPIURLWithNewCount(30);
			isInitialLoad = false;
		}
	} catch (error) {
		console.log("Ooops", error);
	}
}

// Check to see if scrolling near bottom of page, Load Vore Photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotosFromUnsplashApi();
	}
});

//On Load
getPhotosFromUnsplashApi();
