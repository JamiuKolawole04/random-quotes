const twitterButton = document.querySelector("#js-tweet");
const spinner = document.querySelector("#js-spinner");
const newQuoteBtn = document.querySelector("#js-new-quote");
newQuoteBtn.addEventListener("click", getQuote);


const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";


async function getQuote() {
    spinner.classList.remove("hidden");
    newQuoteBtn.disabled = true;
    try {
        const quote = await apiResponse();
        displayQuote(quote.message);
        setTweetButton(quote.message);

    } catch (error) {
        alert("Failed to fetch new quote");

    } finally {
        spinner.classList.add("hidden");
        newQuoteBtn.disabled = false
    }
}

async function apiResponse() {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;

}


function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;


}

const setTweetButton = (quote) => {
    try {
        twitterButton.setAttribute("href", `https://twitter.com/share?text=${quote}`);

    } catch (err) {
        console.log(err);
    }
}

getQuote();
