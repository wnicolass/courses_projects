const count = 10;
const apiKey = "QZUJo-bFWJcCXUlJF-GATUdzxk58NdC5IO80FMI7TOg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

getPhotos();
