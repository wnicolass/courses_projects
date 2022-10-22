const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let firstFetch = true;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let initialCount = 5;
const apiKey = "QZUJo-bFWJcCXUlJF-GATUdzxk58NdC5IO80FMI7TOg";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function changeImagesCount(imgCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;
}

function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function showPhotos() {
  imagesLoaded = 0;
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
    if (firstFetch) {
      changeImagesCount(30);
      firstFetch = false;
    }
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
