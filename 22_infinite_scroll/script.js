const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

const count = 10;
const apiKey = "QZUJo-bFWJcCXUlJF-GATUdzxk58NdC5IO80FMI7TOg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function showPhotos() {
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

getPhotos();
