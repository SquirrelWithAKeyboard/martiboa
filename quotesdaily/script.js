const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "You learn more from failure than from success. Don’t let it stop you.", author: "Unknown" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
    { text: "If you are working on something that you really care about, you don’t have to be pushed.", author: "Steve Jobs" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "Don't wait. The time will never be just right.", author: "Napoleon Hill" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
    { text: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt" },
    { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Failure is not the opposite of success; it’s part of success.", author: "Arianna Huffington" },
    { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
    { text: "No matter what you're going through, there's a light at the end of the tunnel.", author: "Demi Lovato" },
    { text: "When you have a dream, you've got to grab it and never let go.", author: "Carol Burnett" },
    { text: "You are enough just as you are.", author: "Meghan Markle" },
    { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
    { text: "The only thing standing between you and your goal is the story you keep telling yourself.", author: "Jordan Belfort" },
    { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.", author: "Ralph Waldo Emerson" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "Limit your 'always' and your 'nevers.'", author: "Amy Poehler" },
    { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" },
    { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
    { text: "The best revenge is massive success.", author: "Frank Sinatra" },
    { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
    { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "Henry David Thoreau" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { text: "Do what you feel in your heart to be right – for you’ll be criticized anyway.", author: "Eleanor Roosevelt" },
    { text: "You have power over your mind – not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
    { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
    { text: "Fall seven times and stand up eight.", author: "Japanese Proverb" },
    { text: "The only real mistake is the one from which we learn nothing.", author: "Henry Ford" },
    { text: "You must do the things you think you cannot do.", author: "Eleanor Roosevelt" },
    { text: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", author: "Christian D. Larson" }
];

let recentQuotes = []; // Track the last 20 quotes

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
    if (recentQuotes.length > 20) {
        recentQuotes.shift();
    }
}

function copyQuote() {
    const quoteText = document.getElementById('quote').innerText;
    navigator.clipboard.writeText(quoteText);
    alert("Quote copied to clipboard!");
}
