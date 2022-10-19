let apiQuotes = [];

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length) + 1];
  console.log(quote);
}

// Get data from API
async function getQuotes() {
  const apiURL = `https://jacintodesign.github.io/quotes-api/data/quotes.json`;

  try {
    const res = await fetch(apiURL);
    apiQuotes = await res.json();

    newQuote();
  } catch (err) {
    alert("Fail to get the quotes");
  }
}

getQuotes();
