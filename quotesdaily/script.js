const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "You learn more from failure than from success. Don’t let it stop you.", author: "Unknown" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
    { text: "If you are working on something that you really care about, you don’t have to be pushed.", author: "Steve Jobs" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" } // No comma here since it's the last item
];


let recentQuotes = [];

function generateQuote() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (recentQuotes.includes(randomIndex));

    const randomQuote = quotes[randomIndex];
    document.getElementById('quote').innerText = `"${randomQuote.text}" - ${randomQuote.author}`;

    // Change background color randomly
    document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 80%)`;

    // Update recent quotes list
    recentQuotes.push(randomIndex);
    if (recentQuotes.length > 4) {
        recentQuotes.shift();
    }
}

function copyQuote() {
    const quoteText = document.getElementById('quote').innerText;
    navigator.clipboard.writeText(quoteText);
    alert("Quote copied to clipboard!");
}
