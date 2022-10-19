let apiQuotes = [];

async function getQuotes() {
  const apiURL = `https://jacintodesign.github.io/quotes-api/data/quotes.json`;

  try {
    const res = await fetch(apiURL);
    apiQuotes = await res.json();
    console.log(apiQuotes);
  } catch (err) {
    alert("Fail to get the quotes");
  }
}

getQuotes();
