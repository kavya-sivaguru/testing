//Get Quotes From API

/* async fetch request 
        it will not stop the page from loading while the api is being fetched.*/

//due to async await response constant will wait for api to be fetched instead of being set to undefined. 

//try catch statement helps to attempt a fetch request or else attempt to catch the error message that gets received.
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    //Check if author field is blank and replace it with quote unknown
    if (!quote.author) {

        authorText.innerText = 'Unknown';
    } else {

        authorText.innerText = quote.author;
    }
    //Check quote length to determine styling

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quote.text;

}


async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl)
        //global variable w/o var
        //converting data in response 
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //catch error here

    }
}

//Tweet Quote
//use backtics for a template string - use TS so we can use a query parameter(?) called text to pass a variable - ${var} which will be converted into a string
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`
    window.open(twitterUrl, '_') //to open twitter window in a new tab
}

//Event Listners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);


//on load
getQuotes();