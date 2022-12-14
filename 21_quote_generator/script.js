const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  showLoadingSpinner();
  setTimeout(() => {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length) + 1];

    if (!quote.author) {
      authorText.textContent = "Unknown";
    } else {
      authorText.textContent = quote.author;
    }

    if (quote.text.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.textContent = quote.text;
    removeLoadingSpinner();
  }, 700);
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
    removeLoadingSpinner();
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}

getQuotes();

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
