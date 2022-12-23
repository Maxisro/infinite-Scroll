//Unsplash API
const count = 10;
const apiKey = "wgah__Q8rPPf0PJ1ezn0K8z-O3t0uadT3MSSc2pdcGM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos
async function getPhotosFromUnsplashApi() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log("Ooops", error);
	}
}

//On Load
getPhotosFromUnsplashApi();
