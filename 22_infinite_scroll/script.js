const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let imagesCount = 5;
const apiKey = "QZUJo-bFWJcCXUlJF-GATUdzxk58NdC5IO80FMI7TOg";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesCount}`;

function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imagesLoaded = 0;
    imagesCount = 30;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function showPhotos() {
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      taget: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: !photo.alt_description
        ? "imagine description here"
        : photo.alt_description,
      title: !photo.alt_description
        ? "imagine title here"
        : photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();

    showPhotos();
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
