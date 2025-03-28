// Function to show and hide AI

const chatbotToggler = document.querySelector(".wrench-buttonaa");
      const closeBtn = document.querySelector(".close-btn");
      const chatbox = document.querySelector(".chatbox");
      const chatInput = document.querySelector(".chat-input textarea");
      const sendChatBtn = document.querySelector(".chat-input span");

      let userMessage = null;
      const inputHeight = '18px';

// API key for Gemini AI. This is completely free, so if your fork and build your own proxy please visit（https://aistudio.google.com/apikey）and get your own.

      const API_KEY = "AIzaSyBJabFopbbZGIh4qLSJ3Zeex1n8JE_TYNk"; 
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

      const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
      }

      // Communication with the Gemini database
      
      const generateResponse = async (chatElement) => {
        const messageElement = chatElement.querySelector("p");
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            contents: [{ 
              role: "user", 
              parts: [{ text: userMessage }] 
            }] 
          }),
        }

        try {
          const response = await fetch(API_URL, requestOptions);
          const data = await response.json();
          if (!response.ok) throw new Error(data.error.message);
          messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
        } catch (error) {
          messageElement.classList.add("error");
          messageElement.textContent = error.message;
        } finally {
          chatbox.scrollTo(0, chatbox.scrollHeight);
        }
      }

      // Auto scroll down 
      
      const handleChat = () => {
        userMessage = chatInput.value.trim();
        if (!userMessage) return;
        chatInput.value = "";
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
          const incomingChatLi = createChatLi("Thinking...", "incoming");
          chatbox.appendChild(incomingChatLi);
          chatbox.scrollTo(0, chatbox.scrollHeight);
          generateResponse(incomingChatLi);
        }, 600);
      }

      chatInput.style.height = inputHeight;
      const chatStyles = document.styleSheets[0];
      chatStyles.insertRule(`
        .chatbox .chat {
          margin-bottom: 5px;
        }
      `, chatStyles.cssRules.length);

      chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleChat();
        }
      });

      sendChatBtn.addEventListener("click", handleChat);
      closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
      chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

document.addEventListener("click", (e) => {
  if (!chatbotToggler.contains(e.target) && !document.querySelector(".chatbot").contains(e.target)) {
    document.body.classList.remove("show-chatbot");
  }
});

// Function to fix the function to fix fonts

async function fixFetchedFonts(html, fetchedUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Fetch and inject external stylesheets
    await fetchAndInjectStyles(doc, fetchedUrl);

    // Fix inline styles
    const inlineStyles = doc.querySelectorAll('style');
    inlineStyles.forEach(style => {
        style.textContent = rewriteFontUrls(style.textContent, fetchedUrl);
    });

    // Add a fallback font
    setFallbackFont(doc);

    // Return the modified HTML
    return doc.documentElement.outerHTML;
}

async function fetchAndInjectStyles(doc, baseUrl) {
    const links = doc.querySelectorAll('link[rel="stylesheet"]');
    for (const link of links) {
        const href = link.getAttribute('href');
        if (href) {
            const fullUrl = new URL(href, baseUrl).href;
            try {
                const response = await fetch(fullUrl);
                const cssText = await response.text();

                // Rewrite relative URLs in the CSS (e.g., for fonts)
                const fixedCssText = cssText.replace(/url\(['"]?(.*?)['"]?\)/g, (match, url) => {
                    const absoluteUrl = new URL(url, fullUrl).href;
                    return `url('${absoluteUrl}')`;
                });

                // Inject the fixed CSS into a <style> tag
                const styleTag = document.createElement('style');
                styleTag.textContent = fixedCssText;
                document.head.appendChild(styleTag);
            } catch (error) {
                console.error(`Failed to fetch stylesheet: ${fullUrl}`, error);
            }
        }
    }
}

function rewriteFontUrls(cssText, baseUrl) {
    return cssText.replace(/url\(['"]?(.*?)['"]?\)/g, (match, url) => {
        try {
            const absoluteUrl = new URL(url, baseUrl).href;
            return `url('${absoluteUrl}')`;
        } catch {
            return match; // Leave unchanged if invalid
        }
    });
}

function setFallbackFont(doc) {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        * {
            font-family: Arial, sans-serif !important;
        }
    `;
    doc.head.appendChild(styleTag);
}

async function handleFetchedContent(html, url) {
    const fixedHtml = await fixFetchedFonts(html, url);

    // Inject the modified content into your page or Shadow DOM
    const contentContainer = document.getElementById('content'); // Adjust to your container
    contentContainer.innerHTML = fixedHtml;
}

// Usage: Call `handleFetchedContent(html, url)`
// - `html`: Fetched HTML content as a string.
// - `url`: URL of the fetched site.


function switchTabWithoutDeactivating(tabIndex) {
    // Activate the clicked tab and its content
    const activeContent = document.querySelectorAll('.tab-contentaa')[tabIndex];
    const activeTab = document.querySelectorAll('.tabaa')[tabIndex];

    if (activeContent && activeTab) {
        activeContent.classList.add('activeaa');
        activeTab.classList.add('activeaa');
    }
}

// Prevent administrators from closing the tab
function preventUnwantedTabClosing(message = 'This page is asking you to confirm that you want to leave — information you’ve entered may not be saved.') {
    window.addEventListener('beforeunload', function(e) {
        e.preventDefault();
        e.returnValue = message;
        return message;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    preventUnwantedTabClosing('Custom message: This page is asking you to confirm that you want to leave — information you’ve entered may not be saved.');
});

document.addEventListener('DOMContentLoaded', function() {
    const contentFetchingProtocolExpectedOutput = "𝙼𝚊𝚍𝚎 𝚋𝚢 𝚍𝚒𝚗𝚐𝚞𝚜𝚌𝚑𝚊𝚗!";
    const contentFetchingProtocolElements = document.querySelectorAll('.Xt7Lm9Kp3R8f, #h2Dv8e46q');

    // Making sure fetching protocols are up to date
    function contentFetchingProtocolValidation1(contentFetchingProtocolInput) {
        return contentFetchingProtocolInput.textContent.trim() === contentFetchingProtocolExpectedOutput;
    }

    function contentFetchingProtocolValidation2(contentFetchingProtocolInput) {
        const contentFetchingProtocolRegex = /^𝙼𝚊𝚍𝚎 𝚋𝚢 𝚍𝚒𝚗𝚐𝚞𝚜𝚌𝚑𝚊𝚗!$/;
        return contentFetchingProtocolRegex.test(contentFetchingProtocolInput.textContent.trim());
    }

    function contentFetchingProtocolValidation3(contentFetchingProtocolInput) {
        const contentFetchingProtocolText = contentFetchingProtocolInput.textContent.trim();
        if (contentFetchingProtocolText.length !== contentFetchingProtocolExpectedOutput.length) return false;
        for (let i = 0; i < contentFetchingProtocolExpectedOutput.length; i++) {
            if (contentFetchingProtocolText[i] !== contentFetchingProtocolExpectedOutput[i]) return false;
        }
        return true;
    }

    function contentFetchingProtocolValidation4(contentFetchingProtocolInput) {
        const contentFetchingProtocolText = contentFetchingProtocolInput.textContent.trim();
        const contentFetchingProtocolInputCodePoints = Array.from(contentFetchingProtocolText).map(char => char.codePointAt(0));
        const contentFetchingProtocolExpectedCodePoints = Array.from(contentFetchingProtocolExpectedOutput).map(char => char.codePointAt(0));
        return contentFetchingProtocolInputCodePoints.length === contentFetchingProtocolExpectedCodePoints.length &&
            contentFetchingProtocolInputCodePoints.every((codePoint, index) => codePoint === contentFetchingProtocolExpectedCodePoints[index]);
    }

    function contentFetchingProtocolValidation5(contentFetchingProtocolInput) {
        const contentFetchingProtocolText = contentFetchingProtocolInput.textContent.trim();
        return btoa(contentFetchingProtocolText) === btoa(contentFetchingProtocolExpectedOutput);
    }

    // Levenshtein bot identifier
    function contentFetchingProtocolValidation6(contentFetchingProtocolInput) {
        const contentFetchingProtocolText = contentFetchingProtocolInput.textContent.trim();

        function contentFetchingProtocolLevenshteinDistance(a, b) {
            if (a.length === 0) return b.length;
            if (b.length === 0) return a.length;
            let matrix = [];
            for (let i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }
            for (let j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                    }
                }
            }
            return matrix[b.length][a.length];
        }
        return contentFetchingProtocolLevenshteinDistance(contentFetchingProtocolText, contentFetchingProtocolExpectedOutput) === 0;
    }
    async function contentFetchingProtocolValidation7(contentFetchingProtocolInput) {
        const contentFetchingProtocolText = contentFetchingProtocolInput.textContent.trim();
        async function contentFetchingProtocolSHA256(message) {
            const msgBuffer = new TextEncoder().encode(message);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        const contentFetchingProtocolTextHash = await contentFetchingProtocolSHA256(contentFetchingProtocolText);
        const contentFetchingProtocolExpectedHash = await contentFetchingProtocolSHA256(contentFetchingProtocolExpectedOutput);
        return contentFetchingProtocolTextHash === contentFetchingProtocolExpectedHash;
    }

    // Error handler
    async function contentFetchingProtocolValidateAll() {
        let contentFetchingProtocolInvalidDetected = false;
        for (const contentFetchingProtocolElement of contentFetchingProtocolElements) {
            if (!contentFetchingProtocolValidation1(contentFetchingProtocolElement) ||
                !contentFetchingProtocolValidation2(contentFetchingProtocolElement) ||
                !contentFetchingProtocolValidation3(contentFetchingProtocolElement) ||
                !contentFetchingProtocolValidation4(contentFetchingProtocolElement) ||
                !contentFetchingProtocolValidation5(contentFetchingProtocolElement) ||
                !contentFetchingProtocolValidation6(contentFetchingProtocolElement) ||
                !(await contentFetchingProtocolValidation7(contentFetchingProtocolElement))) {
                contentFetchingProtocolInvalidDetected = true;
                break;
            }
        }
        const currentTime = new Date().toISOString().replace('T', ' ').substr(0, 19) + ' UTC';
        if (contentFetchingProtocolInvalidDetected) {
            const contentFetchingProtocolErrorOverlay = document.createElement('div');
            contentFetchingProtocolErrorOverlay.className = 'Q2wE4rT6y8U0';
            contentFetchingProtocolErrorOverlay.textContent = `𝗘𝗿𝗿𝗼𝗿: Unhandled Exception in Processor Module 'dataProcessor'

𝗘𝗿𝗿𝗼𝗿 𝗖𝗼𝗱𝗲: 0xA17b2cf3DeU4sE5f6a93B47cJs

𝗧𝗶𝗺𝗲𝘀𝘁𝗮𝗺𝗽: ${currentTime}

𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: An unexpected null reference was encountered during processing execution. This may indicate improper formatting of input data, malicious or malformed XML injection attempts, or a failure in the preceding validation checks.

𝗦𝘁𝗮𝗰𝗸 𝗧𝗿𝗮𝗰𝗲:  
1. mainApp.Startup()
2. mainApp.Run()
3. urlFetchRequested()
➥ urlFetchRequested.Approved()
4. fetchedSiteProcessor.ParseInput()  
5. dataProcessor.ExecuteProcess() 
➥ 𝗱𝗮𝘁𝗮𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗼𝗿.𝗘𝘅𝗲𝗰𝘂𝘁𝗲𝗣𝗿𝗼𝗰𝗲𝘀𝘀.𝗙𝗮𝗶𝗹𝗲𝗱()

𝗦𝘂𝗴𝗴𝗲𝘀𝘁𝗲𝗱 𝗔𝗰𝘁𝗶𝗼𝗻𝘀:
• Visit [https://github.com/dinguschan-owo/Helios] and verify your browser is up to date.
• Ensure that the input data is correctly formatted and not null.
• Scrub any injection attempts.
• Review the initialization sequence for all dependent objects.
• Check the logs for any preceding errors that may provide context.
• Clear browser cache and clear and reset website data storage.
• If all else fails, visit the above mentioned offical Github page [https://github.com/dinguschan-owo/Helios] and redownload the latest stable version (Helios v1.𝟽.0).
`;
            document.body.appendChild(contentFetchingProtocolErrorOverlay);
        }
    }

    contentFetchingProtocolValidateAll();
});

// Function to initialize tabs
function initializeTabs() {
    // Create the second tab
    const newTabIndex = tabs.length;
    const newTab = document.createElement('div');
    newTab.className = 'tabaa';
    newTab.innerHTML = `<span class="tab-nameaa">New Tab</span><i class="fas fa-times close-btnaa"></i>`;
    document.querySelector('.uptop-baraa').insertBefore(newTab, document.getElementById('add-tabaa'));

    const newContent = document.createElement('div');
    newContent.className = 'contentaa tab-contentaa';
    newContent.innerHTML = tabs[0].content.replace(/\${currentTabIndex}/g, newTabIndex);
    document.body.appendChild(newContent);

    tabs.push({
        url: 'helios://start',
        content: newContent.innerHTML
    });

    // Close the original tab
    const originalTab = document.querySelector('.tabaa');
    originalTab.remove();
    document.querySelectorAll('.tab-contentaa')[0].remove();
    tabs.shift();

    // Update active tab
    updateActiveTab(newTab, newContent, 0);
    addCloseButtonFunctionality(newTab);
    addTabClickListener(newTab, newContent, 0);

    // Update currentTabIndex
    currentTabIndex = 0;
}

// Call initializeTabs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeTabs);

let currentTabIndex = 0;
const tabs = [{
    url: 'helios://start',
    content: `<div class="Xt7Lm9Kp3R8f">
  <p>𝙼𝚊𝚍𝚎 𝚋𝚢 𝚍𝚒𝚗𝚐𝚞𝚜𝚌𝚑𝚊𝚗!</p>
</div><div class="top-right-boxaa">
  <p><i class="fa-brands fa-github"></i></p>
</div>
        <h23>Helios</h23>
        <h21>𝚟𝟷.𝟾.𝟶</h21>
        <div class="search-baraa">
          <div class="search-containeraa">
  <div class="search-engine-dropdownaa" onclick="toggleDropdown(${currentTabIndex})">
    <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=256" alt="Google" id="selected-engine-${currentTabIndex}">
  </div>
  <div class="dropdown-contentaa" id="engineDropdown-${currentTabIndex}">
    <div class="status-messageaa" id="statusMessage-${currentTabIndex}">Searching with Google</div>
    <a href="javascript:void(0);" onclick="selectEngine('https://4get.ca/favicon.ico', '4get', ${currentTabIndex})" data-engine="4get">
      <img src="https://4get.ca/favicon.ico" alt="4get"> -<s>Search with 4get</s>-
    </a>
    <a href="javascript:void(0);" onclick="selectEngine('https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=256', 'Google', ${currentTabIndex})" data-engine="Google">
      <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=256" alt="Google"> &nbspSearch with Google
    </a>
    <a href="javascript:void(0);" onclick="selectEngine('https://www.bing.com/favicon.ico', 'Bing', ${currentTabIndex})" data-engine="Bing">
      <img src="https://www.bing.com/favicon.ico" alt="Bing"> &nbspSearch with Bing
    </a>
    <a href="javascript:void(0);" onclick="selectEngine('https://duckduckgo.com/favicon.ico', 'DuckDuckGo', ${currentTabIndex})" data-engine="DuckDuckGo">
      <img src="https://duckduckgo.com/favicon.ico" alt="DuckDuckGo"> -<s>Search with DuckDuckGo</s>-
    </a>
  </div>
</div>
            <input type="text" placeholder="Search the web or enter a URL" id="search-input-${currentTabIndex}">
            <i class="fas fa-search search-iconaa"></i>`
}];

const trustedSchemes = ['helios://', 'https://', 'http://'];

document.getElementById('add-tabaa').addEventListener('click', function() {
    const newTabIndex = tabs.length;
    const newTab = document.createElement('div');
    newTab.className = 'tabaa';
    newTab.innerHTML = `<span class="tab-nameaa">New Tab</span><i class="fas fa-times close-btnaa"></i>`;
    document.querySelector('.uptop-baraa').insertBefore(newTab, this);

    const newContent = document.createElement('div');
    newContent.className = 'contentaa tab-contentaa';
    newContent.innerHTML = tabs[0].content.replace(/\${currentTabIndex}/g, newTabIndex);
    document.body.appendChild(newContent);

    tabs.push({
        url: 'helios://start',
        content: newContent.innerHTML
    });

    updateActiveTab(newTab, newContent, newTabIndex);
    addCloseButtonFunctionality(newTab);
    addTabClickListener(newTab, newContent, newTabIndex);
});

document.querySelectorAll('.tabaa').forEach((tab, index) => {
    addCloseButtonFunctionality(tab);
    addTabClickListener(tab, document.querySelectorAll('.tab-contentaa')[index], index);
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.top-right-boxaa').addEventListener('click', function() {
        window.open('https://github.com/dinguschan-owo/Helios/', '_blank');
    });
});

function addCloseButtonFunctionality(tab) {
    tab.querySelector('.close-btnaa').addEventListener('click', function() {
        const index = Array.from(document.querySelectorAll('.tabaa')).indexOf(tab);
        tab.remove();
        document.querySelectorAll('.tab-contentaa')[index].remove();
        tabs.splice(index, 1);
        if (index === currentTabIndex) {
            const newActiveTab = document.querySelectorAll('.tabaa')[index] || document.querySelectorAll('.tabaa')[index - 1];
            if (newActiveTab) {
                newActiveTab.click();
            }
        }
    });
}

function addTabClickListener(tab, content, index) {
    tab.addEventListener('click', function() {
        updateActiveTab(tab, content, index);
    });
}

function updateActiveTab(tab, content, index) {
    document.querySelectorAll('.tab-contentaa').forEach(content => {
        content.classList.remove('activeaa');
    });

    document.querySelectorAll('.tabaa').forEach(tab => {
        tab.classList.remove('activeaa');
    });

    tab.classList.add('activeaa');
    content.classList.add('activeaa');

    currentTabIndex = index;
    const url = tabs[index].url;
    document.getElementById('url-baraa').value = url;

    updateTabContent(url, content, tab);
    updateLockIcon(url);
    updateSpecialDivs(url);
}

function updateTabContent(url, content, tab) {
    showSpinner(tab);
    localStorage.setItem(`tab_${currentTabIndex}`, url);
    sessionStorage.setItem(`tab_${currentTabIndex}`, url);

    if (url === 'helios://start') {
        content.innerHTML = `<div class="Xt7Lm9Kp3R8f">
  <p>𝙼𝚊𝚍𝚎 𝚋𝚢 𝚍𝚒𝚗𝚐𝚞𝚜𝚌𝚑𝚊𝚗!</p>
</div><div class="top-right-boxaa">
  <p><i class="fa-brands fa-github"></i></p>
</div>
        <h23>Helios</h23>
        <h21>𝚟𝟷.𝟾.𝟶</h21>
        <div class="search-baraa">
          <div class="search-containeraa">
  <div class="search-engine-dropdownaa" onclick="toggleDropdown(${currentTabIndex})">
    <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=256" alt="Google" id="selected-engine-${currentTabIndex}">
  </div>
  <div class="dropdown-contentaa" id="engineDropdown-${currentTabIndex}">
    <div class="status-messageaa" id="statusMessage-${currentTabIndex}">Searching with Google</div>
    <a href="javascript:void(0);" onclick="selectEngine('https://4get.ca/favicon.ico', '4get', ${currentTabIndex})" data-engine="4get">
      <img src="https://4get.ca/favicon.ico" alt="4get"> -<s>Search with 4get</s>-
    </a>
    <a href="javascript:void(0);" onclick="selectEngine('https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=256', 'Google', ${currentTabIndex})" data-engine="Google">
      <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=256" alt="Google"> &nbspSearch with Google
    </a>
    <a href="javascript:void(0);" onclick="selectEngine('https://www.bing.com/favicon.ico', 'Bing', ${currentTabIndex})" data-engine="Bing">
      <img src="https://www.bing.com/favicon.ico" alt="Bing"> &nbspSearch with Bing
    </a>
    <a href="javascript:void(0);" onclick="selectEngine('https://duckduckgo.com/favicon.ico', 'DuckDuckGo', ${currentTabIndex})" data-engine="DuckDuckGo">
      <img src="https://duckduckgo.com/favicon.ico" alt="DuckDuckGo"> -<s>Search with DuckDuckGo</s>-
    </a>
  </div>
</div>
            <input type="text" placeholder="Search the web or enter a URL" id="search-input-${currentTabIndex}">
            <i class="fas fa-search search-iconaa"></i>`;

        tab.querySelector('.tab-nameaa').textContent = 'New Tab';
        tabs[currentTabIndex].content = content.innerHTML;
        tabs[currentTabIndex].url = url;

        document.getElementById(`search-input-${currentTabIndex}`).addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const enteredUrl = this.value;
                if (enteredUrl) {
                    updateTabContent(enteredUrl, content, tab);
                }
            }
        });

    } else if (url === 'helios://settings') {
        content.innerHTML = `
        <div class="sidebarvv">
  <h1>Helios Settings</h1>
  
  <button onclick="showCategory('historyvv')">History</button>
  <button onclick="showCategory('cloakingvv')">Cloaking</button>
  <button onclick="showCategory('miscvv')">Miscellaneous</button>
</div>

<div class="content-containervv activevv" id="historyvv">
  <h3>Manage History</h3>
  <button id="clear-history">Clear History</button>
  <div class="cleared-messagevv" id="cleared-message">History cleared!</div>
</div>

<div class="content-containervv" id="cloakingvv">
  <h3>Cloaking Options</h3>
  <button onclick="openInAboutBlank()">Open in about:blank</button>
  <button onclick="openInBlob()">Open in blob:</button>
</div>

<div class="content-containervv" id="miscvv">
  <h3>Miscellaneous</h3>
  <button id="reset-history">idk i didnt get this far</button>
</div>

        `;
        tab.querySelector('.tab-nameaa').textContent = 'Helios Settings';
        tabs[currentTabIndex].content = content.innerHTML;
        tabs[currentTabIndex].url = url;

        document.getElementById(`clear-history-${currentTabIndex}`).addEventListener('click', function() {
            localStorage.removeItem(`tab_${currentTabIndex}`);
            sessionStorage.removeItem(`tab_${currentTabIndex}`);
            const messageDiv = document.getElementById(`clear-message-${currentTabIndex}`);
            messageDiv.textContent = 'History has been cleared for this tab!';
            messageDiv.style.display = 'block';

            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        });
    } else if (url === 'helios://urls') {
        showUrlsList(content, tab);
    } else {
        fetchExternalContent(url, content, currentTabIndex);
    }

    document.getElementById('url-baraa').value = url;

    tabs[currentTabIndex].content = content.innerHTML;
    tabs[currentTabIndex].url = url;

    updateLockIcon(url);
    updateSpecialDivs(url);
    if (url === 'helios://start' || url === 'helios://settings' || url === 'helios://urls') {
        // For internal pages, hide the spinner immediately after setting content
        hideSpinner(tab);
    } else {
        // For external content, the spinner will be hidden in fetchExternalContent
        fetchExternalContent(url, content, currentTabIndex);
    }
}

async function fetchExternalContent(url, content, tabIndex) {
    const tab = document.querySelectorAll('.tabaa')[tabIndex];
    showSpinner(tab);

    console.log(`Fetching content for URL: ${url}`);

    const proxies = [
        `https://corsproxy.io/?${encodeURIComponent(url)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
        `https://api.codetabs.com/v1/tmp/?quest=${encodeURIComponent(url)}`,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
    ];

    const timeout = 10000;

    const key = await generateKey();
    const encryptedUrl = await encryptData(url, key);

    async function fetchWithProxy(proxy) {
        return new Promise((resolve, reject) => {
            const controller = new AbortController();
            const id = setTimeout(() => {
                controller.abort();
                reject(new Error('Timeout'));
            }, timeout);

            console.log(`Attempting to fetch with proxy: ${proxy}`);

            fetch(proxy, {
                    signal: controller.signal,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // User agent to spoof your actual User ID to the CORS proxy server and target server
                    }
                })
                .then(response => {
                    clearTimeout(id);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(async encryptedResponse => {
                    const decryptedResponse = await decryptData(JSON.parse(encryptedResponse), key);
                    resolve(decryptedResponse);
                })
                .catch(reject);
        });
    }

    let htmlText;
    let errors = [];

    for (const proxy of proxies) {
        try {
            htmlText = await fetchWithProxy(proxy);
            console.log(`Fetch successful using proxy: ${proxy}`);
            break;
        } catch (error) {
            console.error(`Error with proxy ${proxy}: ${error.message}`);
            errors.push(`${proxy}: ${error.message}`);
        }
    }

    if (!htmlText) {
        console.error('Failed to fetch content from all proxies');
        hideSpinner(tab);
        content.innerHTML = `
            <div style="color: #ff6161; padding: 20px; text-align: center;">
                <h2>Error loading content</h2>
                <p>Unable to fetch the requested content. Please try again later.</p>
                <p>sorry :(</p>
                <details>
                    <summary>Error details</summary>
                    <pre>${errors.join('\n')}</pre>
                </details>
            </div>
        `;
        return;
    }

    console.log(`Content fetched successfully. Length: ${htmlText.length}`);

    // Fix the function to fix fonts in the fetched content
    htmlText = await fixFetchedFonts(htmlText, url);
    
    // Fix fonts in the fetched content
    htmlText = await fixFontsInFetchedContent(htmlText, url);

    // Execute scripts from the fetched content
    htmlText = executeScriptsFromContent(htmlText);

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const title = doc.title;
    if (tab) {
        tab.querySelector('.tab-nameaa').textContent = title || 'Untitled';
    }

    console.log(`Parsed document title: ${title || 'Untitled'}`);

    const shadowContainer = document.createElement('div');
    shadowContainer.style.position = 'relative';
    shadowContainer.style.width = '100%';
    shadowContainer.style.height = '100%';
    shadowContainer.style.overflow = 'auto';
    shadowContainer.style.border = 'none';

    const shadowRoot = shadowContainer.attachShadow({
        mode: 'open'
    });

    // Remove the default style that forces a white background
    shadowRoot.innerHTML = doc.documentElement.outerHTML;

    console.log('Shadow DOM created and populated with fetched content');

    // Rewrite relative URLs to absolute URLs
    const baseUrl = new URL(url);
    let rewrittenUrls = 0;
    shadowRoot.querySelectorAll('a[href]').forEach(a => {
        try {
            a.href = new URL(a.getAttribute('href'), baseUrl).href;
            rewrittenUrls++;
        } catch (e) {
            console.error('Error rewriting URL:', e);
        }
    });

    console.log(`Rewrote ${rewrittenUrls} relative URLs to absolute URLs`);

    content.innerHTML = '';
    content.appendChild(shadowContainer);

    tabs[tabIndex].content = content.innerHTML;
    tabs[tabIndex].url = url;

    console.log('Content injected into the page');

    hideSpinner(tab);
    console.log('Fetch and render process completed');
}
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('tab_')) {
            const url = localStorage.getItem(key);
            // Logic to create a new tab with this URL
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const urlBar = document.getElementById('url-baraa');
    const content = document.getElementById('contentaa');

    urlBar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const url = urlBar.value;
            fetchExternalContent(url, content, currentTabIndex);
        }
    });
});

async function fetchExternalContent(url, content, tabIndex) {
    const proxies = [
        `https://corsproxy.io/?${url}`,
        `https://api.codetabs.com/v1/proxy?quest=${url}`,
        `https://api.codetabs.com/v1/tmp/?quest=${url}`,
        `https://api.allorigins.win/raw?url=${url}`
    ];

    const timeout = 10000;

    async function fetchWithProxy(proxy) {
        return new Promise((resolve, reject) => {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);

            fetch(proxy, {
                    signal: controller.signal
                })
                .then(response => {
                    clearTimeout(id);
                    if (!response.ok) {
                        reject(`Failed to fetch content from ${proxy}: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(resolve)
                .catch(reject);
        });
    }

    let htmlText;
    for (const proxy of proxies) {
        try {
            htmlText = await fetchWithProxy(proxy);
            break;
        } catch (error) {
            console.error(`Error with proxy ${proxy}: ${error}`);
        }
    }

    if (!htmlText) {
        console.error('Failed to fetch content from all proxies');
        return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const title = doc.title;
    const tab = document.querySelectorAll('.tabaa')[tabIndex];
    if (tab) {
        tab.querySelector('.tab-nameaa').textContent = title || 'Untitled';
    }

    async function fetchAndInjectResources(html, tabIndex) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const resources = [];
        const cssLinks = doc.querySelectorAll('link[rel="stylesheet"]');
        const jsScripts = doc.querySelectorAll('script[src]');
        const images = doc.querySelectorAll('img');
        const videos = doc.querySelectorAll('video');
        const audios = doc.querySelectorAll('audio');

        cssLinks.forEach(link => resources.push(link.href));
        jsScripts.forEach(script => resources.push(script.src));
        images.forEach(img => resources.push(img.src));
        videos.forEach(video => {
            if (video.src) resources.push(video.src);
            video.querySelectorAll('source').forEach(source => resources.push(source.src));
        });
        audios.forEach(audio => {
            if (audio.src) resources.push(audio.src);
            audio.querySelectorAll('source').forEach(source => resources.push(source.src));
        });

        const fetchResource = async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch resource ${url}`);
                }
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('text')) {
                    return await response.text();
                } else {
                    return await response.blob();
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        const promises = resources.map(fetchResource);
        const results = await Promise.all(promises);

        const shadowContainer = document.createElement('div');
        shadowContainer.style.position = 'relative';
        shadowContainer.style.width = (content.clientWidth - 0) + 'px';
        shadowContainer.style.height = (content.clientHeight + 100) + 'px';
        shadowContainer.style.overflow = 'auto';
        shadowContainer.style.border = 'none';

        const shadowRoot = shadowContainer.attachShadow({
            mode: 'open'
        });
        const defaultStyle = document.createElement('style');
        defaultStyle.textContent = `
            :host {
                all: initial;
                background-color: #fff !important;
                font-family: Arial, sans-serif;
            }
        `;
        shadowRoot.appendChild(defaultStyle);
        shadowRoot.innerHTML += html;

        const fixRelativeURLs = (baseUrl) => {
            const elements = shadowRoot.querySelectorAll('a[href], link[href], script[src], img[src], video[src], audio[src], source[src]');

            elements.forEach(element => {
                const attributeName = element.hasAttribute('href') ? 'href' : 'src';
                const url = new URL(element.getAttribute(attributeName), baseUrl);
                element.setAttribute(attributeName, url.href);
            });
        };

        results.forEach((result, index) => {
            const url = resources[index];
            if (result instanceof Blob) {
                const objectURL = URL.createObjectURL(result);
                const elements = shadowRoot.querySelectorAll(`[src="${url}"]`);
                elements.forEach(element => element.src = objectURL);
            } else if (typeof result === 'string') {
                if (url.endsWith('.css')) {
                    const style = document.createElement('style');
                    style.textContent = result; // result is already modified CSS
                    shadowRoot.appendChild(style);
                } else if (url.endsWith('.js')) {
                    const script = document.createElement('script');
                    script.textContent = result;
                    shadowRoot.appendChild(script);
                }
            }
        });

        // Execute inline scripts
        shadowRoot.querySelectorAll('script:not([src])').forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            shadowRoot.appendChild(newScript);
        });

        shadowRoot.querySelectorAll('style').forEach(style => {
            style.textContent = `
                :host {
                    all: initial;
                }
                ${style.textContent}
            `;
        });

        const baseUrl = new URL(html.match(/<base href="([^"]+)"/)?.[1] || '', url).href;
        fixRelativeURLs(baseUrl);

        shadowRoot.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault();
                const newUrl = anchor.href;
                updateTabContent(newUrl, content, tab);
            });
        });

        return shadowContainer;
    }

    const newShadowContainer = await fetchAndInjectResources(htmlText, tabIndex);
    content.innerHTML = '';
    content.appendChild(newShadowContainer);

    requestAnimationFrame(() => {
        tabs[tabIndex].content = content.innerHTML;
        tabs[tabIndex].url = url;
    });
}

function updateLockIcon(url) {
    const lockIcon = document.querySelector('.lock-iconaa');
    const isLocked = trustedSchemes.some(scheme => url.startsWith(scheme));
    if (isLocked) {
        lockIcon.classList.remove('fa-unlock');
        lockIcon.classList.add('fa-lock');
        lockIcon.style.color = '';
    } else {
        lockIcon.classList.remove('fa-lock');
        lockIcon.classList.add('fa-unlock');
        lockIcon.style.color = '#ffff80';
    }
}

function modifyCss(cssText) {
    // Regular expression to match z-index declarations
    const zIndexRegex = /z-index\s*:\s*2147483647\s*;/g;

    // Replace z-index: 2147483647 with z-index: 2147483643
    const modifiedCss = cssText.replace(zIndexRegex, 'z-index: 2147483643;');

    return modifiedCss;
}

function updateSpecialDivs(url) {
    const isHeliosURL = url.startsWith('helios://');
    const officialC = document.querySelector('.official-caa');
    const official = document.querySelector('.officialaa');

    if (officialC) {
        officialC.style.backgroundColor = isHeliosURL ? '' : '#52565b';
    }
    if (official) {
        official.style.backgroundColor = isHeliosURL ? '' : '#52565b';
        official.style.color = isHeliosURL ? '' : '#52565b';
    }
}

document.getElementById('url-baraa').addEventListener('input', function() {
    const url = this.value;
    tabs[currentTabIndex].url = url;
    updateLockIcon(url);
    updateSpecialDivs(url);
});

document.getElementById('url-baraa').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        let url = e.target.value.trim();

        const hasValidScheme = trustedSchemes.some(scheme => url.startsWith(scheme));

        if (!hasValidScheme) {
            url = 'https://' + url;
        }

        const currentContent = document.querySelectorAll('.tab-contentaa')[currentTabIndex];
        const currentTab = document.querySelectorAll('.tabaa')[currentTabIndex];

        tabs[currentTabIndex].url = url;
        document.getElementById('url-baraa').value = url;
        updateTabContent(url, currentContent, currentTab);
        updateLockIcon(url);
        updateSpecialDivs(url);
    }
});

document.querySelector('.home-buttonaa').addEventListener('click', function() {
    changeTabContent('helios://start');
});

document.querySelector('.settings-buttonaa').addEventListener('click', function() {
    changeTabContent('helios://settings');
});

function changeTabContent(url) {
    const currentTab = document.querySelectorAll('.tabaa')[currentTabIndex];
    const currentContent = document.querySelectorAll('.tab-contentaa')[currentTabIndex];

    if (currentTab && currentContent) {
        document.getElementById('url-baraa').value = url;

        tabs[currentTabIndex].url = url;
        updateTabContent(url, currentContent, currentTab);

        const event = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'Enter',
            code: 'Enter'
        });
        document.getElementById('url-baraa').dispatchEvent(event);
    }
}
// Function to open Helios in an about:blank tab

function openInAboutBlank() {
    const newWindow = window.open('about:blank', '_blank');
    
    const clonedDocument = document.documentElement.cloneNode(true);
    
    // Remove the square button from the cloned document
    const squareButton = clonedDocument.querySelector('#square-buttonaa');
    if (squareButton) {
        squareButton.remove();
    }
    
    newWindow.document.write(clonedDocument.outerHTML);
    
    newWindow.document.close();
}
// Function to open Helios in a blob: tab

async function openInBlob() {
    // Clone the document's static DOM structure
    const htmlDocument = document.documentElement.cloneNode(true);
  // Block duplication of square button
const squareButton = htmlDocument.querySelector('#square-buttonaa');
    if (squareButton) {
        squareButton.remove();
    }
    // Defer all scripts in the cloned document
    const scripts = htmlDocument.querySelectorAll('script[src], script:not([src])');
    scripts.forEach(script => {
        const deferredScript = document.createElement('script');
        deferredScript.type = 'text/javascript';
        
        // Wrap inline scripts in a function and defer execution
        if (script.textContent) {
            deferredScript.textContent = `
                document.addEventListener('DOMContentLoaded', function() {
                    ${script.textContent}
                });
            `;
        }

        // Defer external scripts
        if (script.src) {
            deferredScript.textContent = `
                document.addEventListener('DOMContentLoaded', function() {
                    const script = document.createElement('script');
                    script.src = "${script.src}";
                    document.body.appendChild(script);
                });
            `;
        }

        script.parentNode.replaceChild(deferredScript, script);
    });

    // Inline CSS styles concurrently
    const stylesheets = Array.from(document.styleSheets).filter(sheet => sheet.href);
    const cssPromises = stylesheets.map(async sheet => {
        try {
            const response = await fetch(sheet.href);
            const text = await response.text();
            const style = document.createElement('style');
            style.textContent = text;
            htmlDocument.querySelector('head').appendChild(style);
        } catch (e) {
            console.warn('Could not inline CSS:', sheet.href, e);
        }
    });

    // Wait for all CSS to be inlined
    await Promise.all(cssPromises);

    // Serialize the modified document and create a Blob
    const blob = new Blob([htmlDocument.outerHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}


function toggleDropdown(tabIndex) {
    var dropdown = document.getElementById(`engineDropdown-${tabIndex}`);
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    updateDropdownVisibility(tabIndex);
}

function selectEngine(iconSrc, engineName, tabIndex) {
    document.getElementById(`selected-engine-${tabIndex}`).src = iconSrc;
    document.getElementById(`selected-engine-${tabIndex}`).alt = engineName;
    document.getElementById(`statusMessage-${tabIndex}`).textContent = "Searching with " + engineName;
    toggleDropdown(tabIndex);
}

function updateDropdownVisibility(tabIndex) {
    var selectedEngine = document.getElementById(`selected-engine-${tabIndex}`).alt;
    var options = document.querySelectorAll(`#engineDropdown-${tabIndex} a`);
    options.forEach(function(option) {
        if (option.getAttribute("data-engine") === selectedEngine) {
            option.style.display = "none";
        } else {
            option.style.display = "flex";
        }
    });
}

window.onclick = function(event) {
    if (!event.target.matches('.search-engine-dropdownaa') && !event.target.matches('.search-engine-dropdownaa img')) {
        var dropdowns = document.querySelectorAll('.dropdown-contentaa');
        dropdowns.forEach(function(dropdown) {
            if (dropdown.style.display === "block") {
                dropdown.style.display = "none";
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    tabs.forEach((tab, index) => {
        document.getElementById(`statusMessage-${index}`).textContent = "Searching with Google";
        updateDropdownVisibility(index);
    });
});

document.getElementById('url-baraa').addEventListener('input', function(e) {
    this.value = this.value.toLowerCase();
});

// Function to check if a string is a valid URL
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Function to handle search or URL navigation
function handleSearchOrNavigation(input, tabIndex) {
    let url = input.trim();

    // Check if it's a valid URL
    if (isValidURL(url) || /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(url)) {
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }
        updateTabContent(url, document.querySelectorAll('.tab-contentaa')[tabIndex], document.querySelectorAll('.tabaa')[tabIndex]);
    } else {
        // If not a URL, perform a search
        const selectedEngine = document.getElementById(`selected-engine-${tabIndex}`).alt;
        let searchUrl;
        switch (selectedEngine) {
            case '4get':
                searchUrl = `https://4get.ca/web?q=${encodeURIComponent(input.replace(/\s+/g, '+'))}`;
                break;
            case 'Google':
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(input.replace(/\s+/g, '+'))}`;
                break;
            case 'Bing':
                searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(input.replace(/\s+/g, '+'))}`;
                break;
            case 'DuckDuckGo':
                searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(input.replace(/\s+/g, '+'))}`;
                break;
            default:
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(input.replace(/\s+/g, '+'))}`;
        }
        updateTabContent(searchUrl, document.querySelectorAll('.tab-contentaa')[tabIndex], document.querySelectorAll('.tabaa')[tabIndex]);
    }
}

// Add event listener for the search input in each tab
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('search-iconaa')) {
        const tabIndex = parseInt(event.target.closest('.search-baraa').querySelector('input').id.split('-')[2]);
        const input = document.getElementById(`search-input-${tabIndex}`).value;
        handleSearchOrNavigation(input, tabIndex);
    }
});

// Add event listener for the Enter key in search inputs
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.id.startsWith('search-input-')) {
        const tabIndex = parseInt(event.target.id.split('-')[2]);
        handleSearchOrNavigation(event.target.value, tabIndex);
    }
});

document.querySelector('.reload-buttonaa').addEventListener('click', function() {
    const currentContent = document.querySelectorAll('.tab-contentaa')[currentTabIndex];
    const currentTab = document.querySelectorAll('.tabaa')[currentTabIndex];
    const currentUrl = tabs[currentTabIndex].url;

    updateTabContent(currentUrl, currentContent, currentTab);
});

// Initialize history storage
const tabHistory = new Map();

// Function to get or create history for a tab
function getTabHistory(tabIndex) {
    if (!tabHistory.has(tabIndex)) {
        tabHistory.set(tabIndex, {
            history: [],
            currentIndex: -1
        });
    }
    return tabHistory.get(tabIndex);
}

// Function to update history when navigating to a new URL
function updateHistory(tabIndex, url) {
    const history = getTabHistory(tabIndex);
    history.currentIndex++;
    history.history = history.history.slice(0, history.currentIndex);
    history.history.push(url);
}

// Modify updateTabContent to update history
const originalUpdateTabContent = updateTabContent;
updateTabContent = function(url, content, tab) {
    const tabIndex = Array.from(document.querySelectorAll('.tabaa')).indexOf(tab);
    updateHistory(tabIndex, url);
    originalUpdateTabContent(url, content, tab);
};

// Back button functionality
document.querySelector('.backward-buttonaa').addEventListener('click', function() {
    const history = getTabHistory(currentTabIndex);
    if (history.currentIndex > 0) {
        history.currentIndex--;
        const previousUrl = history.history[history.currentIndex];
        const currentContent = document.querySelectorAll('.tab-contentaa')[currentTabIndex];
        const currentTab = document.querySelectorAll('.tabaa')[currentTabIndex];
        originalUpdateTabContent(previousUrl, currentContent, currentTab);
    }
});

// Forward button functionality
document.querySelector('.forward-buttonaa').addEventListener('click', function() {
    const history = getTabHistory(currentTabIndex);
    if (history.currentIndex < history.history.length - 1) {
        history.currentIndex++;
        const nextUrl = history.history[history.currentIndex];
        const currentContent = document.querySelectorAll('.tab-contentaa')[currentTabIndex];
        const currentTab = document.querySelectorAll('.tabaa')[currentTabIndex];
        originalUpdateTabContent(nextUrl, currentContent, currentTab);
    }
});

// Initialize history for existing tabs
document.querySelectorAll('.tabaa').forEach((tab, index) => {
    const url = tab.querySelector('.tab-nameaa').textContent === 'New Tab' ? 'helios://start' : document.getElementById('url-baraa').value;
    updateHistory(index, url);
});

function closeTab(tab) {
    const index = Array.from(document.querySelectorAll('.tabaa')).indexOf(tab);
    tab.remove();
    document.querySelectorAll('.tab-contentaa')[index].remove();
    tabs.splice(index, 1);
    tabHistory.delete(index);

    // If the closed tab was the active one, switch to another tab
    if (index === currentTabIndex) {
        // Try to activate the tab to the left
        if (index > 0) {
            currentTabIndex = index - 1;
        }
        // If there's no tab to the left, try to activate the first tab
        else if (tabs.length > 0) {
            currentTabIndex = 0;
        }
        // If there are no tabs left, create a new one
        else {
            document.getElementById('add-tabaa').click();
            return;
        }

        const newActiveTab = document.querySelectorAll('.tabaa')[currentTabIndex];
        const newActiveContent = document.querySelectorAll('.tab-contentaa')[currentTabIndex];
        updateActiveTab(newActiveTab, newActiveContent, currentTabIndex);
    }
    // If a tab to the left of the active tab was closed, update the currentTabIndex
    else if (index < currentTabIndex) {
        currentTabIndex--;
    }
}

// Replace the existing close button functionality with this new function
function addCloseButtonFunctionality(tab) {
    tab.querySelector('.close-btnaa').addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the tab from being activated when closing
        closeTab(tab);
    });
}

// Update existing tabs with the new close functionality
document.querySelectorAll('.tabaa').forEach(tab => {
    addCloseButtonFunctionality(tab);
});

// Function to handle the square button click (browser reset)
function handleSquareButtonClick() {
    // Close all tabs except the first one
    const tabs = document.querySelectorAll('.tabaa');
    for (let i = tabs.length - 1; i > 0; i--) {
        closeTab(tabs[i]);
    }

    // Reset the first tab to initial state
    const firstTab = tabs[0];
    const firstTabContent = document.querySelectorAll('.tab-contentaa')[0];

    // Update tab name
    firstTab.querySelector('.tab-nameaa').textContent = 'New Tab';

    // Reset URL bar
    document.getElementById('url-baraa').value = 'helios://start';

    // Reset tab content
    updateTabContent('helios://start', firstTabContent, firstTab);

    // Reset tab history
    const history = getTabHistory(0);
    history.history = ['helios://start'];
    history.currentIndex = 0;

    // Update active tab
    updateActiveTab(firstTab, firstTabContent, 0);
}

// Add the square button to the DOM
const squareButton = document.createElement('div');
squareButton.className = 'square-buttonaa';
squareButton.id = 'square-buttonaa';
squareButton.textContent = '×';
squareButton.title = 'Reset Tabs';

// Insert the square button before the first tab
const topBar = document.querySelector('.uptop-baraa');
topBar.insertBefore(squareButton, topBar.firstChild);

// Add event listener to the square button
squareButton.addEventListener('click', handleSquareButtonClick);

// Add CSS for the square button
const style = document.createElement('style');
style.textContent = `
    .square-buttonaa {
        margin-top: 1px;
        height: 32px;
        padding-top: 2px;
        padding-right: 7px;
        padding-left: 7px;
        background-color: #ff6161;
        color: #fff;
        font-align: center;
        font-weight: 500;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        cursor: pointer;
        margin-right: 9px;
        transition: background-color 0.3s;
        user-select: none;
        margin-bottom: 1.02px;
        margin-left: -2px;
    }

    .square-buttonaa:hover {
        background-color: #ff4747;
    }
`;
document.head.appendChild(style);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function toggleDropdownccc() {
    document.getElementById("myDropdownccc").classList.toggle("showccc");
}

window.onclick = function(event) {
    if (!event.target.matches('.menu-buttonaa')) {
        var dropdownsccc = document.getElementsByClassName("dropdown-menuccc");
        for (var i = 0; i < dropdownsccc.length; i++) {
            var openDropdownccc = dropdownsccc[i];
            if (openDropdownccc.classList.contains('showccc')) {
                openDropdownccc.classList.remove('showccc');
            }
        }
    }
}

function handleNewTabMenuClick(event) {
    event.preventDefault();
    document.getElementById('add-tabaa').click();
    toggleDropdownccc(); // Close the dropdown after creating a new tab
}

// Modify the dropdown menu HTML to include an event handler
document.addEventListener('DOMContentLoaded', function() {
    const newTabMenuItem = document.querySelector('.dropdown-menuccc a');
    if (newTabMenuItem) {
        newTabMenuItem.addEventListener('click', handleNewTabMenuClick);
    }
});

function showUrlsList(content, tab) {
    content.innerHTML = `
        <h2 style="font-size: 48px; margin-bottom: 20px;">Helios Internal URLs</h2>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 15px;">
                <a href="javascript:void(0);" data-url="helios://start" class="custom-url-link" style="font-size: 24px; color: #66ffa1; text-decoration: none;">helios://start</a>
                <p style="margin: 5px 0 0 0; color: #b3b3b3;">Helios start page</p>
            </li>
            <li style="margin-bottom: 15px;">
                <a href="javascript:void(0);" data-url="helios://settings" class="custom-url-link" style="font-size: 24px; color: #66ffa1; text-decoration: none;">helios://settings</a>
                <p style="margin: 5px 0 0 0; color: #b3b3b3;">Helios settings page</p>
            </li>
            <li style="margin-bottom: 15px;">
                <a href="javascript:void(0);" data-url="helios://urls" class="custom-url-link" style="font-size: 24px; color: #66ffa1; text-decoration: none;">helios://urls</a>
                <p style="margin: 5px 0 0 0; color: #b3b3b3;">List of Helios internal URLs</p>
            </li>
        </ul>
    `;
    tab.querySelector('.tab-nameaa').textContent = 'Helios URLs';

    // Add click event listeners to the custom URL links
    content.querySelectorAll('.custom-url-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            document.getElementById('url-baraa').value = url;
            updateTabContent(url, content, tab);
        });
    });
}

function showSpinner(tabElement) {
    let tabName = tabElement.querySelector('.tab-nameaa');
    if (!tabName.querySelector('.spinner')) {
        let spinner = document.createElement('div');
        spinner.className = 'spinner';
        tabName.insertBefore(spinner, tabName.firstChild);
    }
}

function hideSpinner(tabElement) {
    let spinner = tabElement.querySelector('.spinner');
    if (spinner) {
        spinner.remove();
    }
}

function downloadPage() {
    // Attempt to fetch from GitHub first
    const url = "https://raw.githubusercontent.com/dinguschan-owo/Helios/refs/heads/main/Offline-File/Helios-Offline.html";
    fetch(url)
        .then(response => response.blob())        .then(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = "Helios-Offline.html";
            a.click();
        })
        .catch(error => {
            console.error("Error downloading from GitHub:", error);
            // If GitHub fetch fails, attempt to fetch from the local server
            fetchLocalFile();
        });

    function fetchLocalFile() {
        fetch('/Offline-File/Helios-Offline.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch from local server');
                }
                return response.text();
            })
            .then(data => {
                downloadFile(data);
            })
            .catch(error => console.error('Error with local file:', error));
    }

    function downloadFile(data) {
        const blob = new Blob([data], {
            type: 'text/html'  // Set the MIME type for HTML files
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Helios-Offline.html';
        document.body.appendChild(a);

        a.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
}


function generateUserID() {
    const lowercase = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '01234567890123456789';
    let userId = 'Session ID: ';

    for (let i = 0; i < 14; i++) {
        if (i % 3 === 0) {
            userId += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        } else if (i % 3 === 1) {
            userId += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        } else {
            userId += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
    }

    document.getElementById('user-idff').textContent = userId;
}

window.onload = generateUserID;

function executeScriptsFromContent(content) {
  // Create a temporary div to hold the content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  // Find all script tags in the content
  const scripts = tempDiv.getElementsByTagName('script');

  // Execute each script
  Array.from(scripts).forEach(script => {
    const newScript = document.createElement('script');

    // If the script has a src attribute, copy it
    if (script.src) {
      newScript.src = script.src;
    } else {
      // Otherwise, copy the inline script content
      newScript.textContent = script.textContent;
    }

    // Set other attributes like type, async, defer if present
    Array.from(script.attributes).forEach(attr => {
      if (attr.name !== 'src') {
        newScript.setAttribute(attr.name, attr.value);
      }
    });

    // Append the new script to the document to execute it
    document.head.appendChild(newScript);
    // Optionally remove the script after execution
    // document.head.removeChild(newScript);
  });

  // Return the content without the original script tags
  return tempDiv.innerHTML;
}
// Execute scripts and update the content
const contentWithoutScripts = executeScriptsFromContent(fetchedContent);

// Display the code
console.log('Function code:');
console.log(executeScriptsFromContent.toString());

console.log('\nModified content:');
console.log(contentWithoutScripts);

console.log('\nCheck the browser console for script execution results.');

function fixFontsInFetchedContent(htmlContent, baseUrl) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Find all stylesheet links
    const stylesheets = doc.querySelectorAll('link[rel="stylesheet"]');

    // Function to fetch and parse CSS
    async function fetchAndParseCss(url) {
        const response = await fetch(url);
        const css = await response.text();
        return css;
    }

    // Function to extract @font-face rules
    function extractFontFaceRules(css) {
        const fontFaceRegex = /@font-face\s*{[^}]*}/g;
        return css.match(fontFaceRegex) || [];
    }

    // Function to modify font URLs
    function modifyFontUrls(css, baseUrl) {
        return css.replace(/url$$['"]?(.+?)['"]?$$/g, (match, url) => {
            if (!url.startsWith('http')) {
                return `url("${new URL(url, baseUrl)}")`;
            }
            return match;
        });
    }

    // Process stylesheets
    Promise.all(Array.from(stylesheets).map(link => {
        const href = new URL(link.getAttribute('href'), baseUrl).href;
        return fetchAndParseCss(href).then(css => {
            const fontFaceRules = extractFontFaceRules(css);
            return fontFaceRules.map(rule => modifyFontUrls(rule, href));
        });
    })).then(results => {
        const allFontFaceRules = results.flat();

        // Create a style element for font-face rules
        const styleElement = doc.createElement('style');
        styleElement.textContent = allFontFaceRules.join('\n');
        doc.head.appendChild(styleElement);

        // Preload fonts
        allFontFaceRules.forEach(rule => {
            const urlMatch = rule.match(/url$$['"]?(.+?)['"]?$$/);
            if (urlMatch) {
                const fontUrl = urlMatch[1];
                const link = doc.createElement('link');
                link.rel = 'preload';
                link.as = 'font';
                link.href = fontUrl;
                link.crossOrigin = 'anonymous';
                doc.head.appendChild(link);
            }
        });

        // Convert back to string
        const modifiedHtml = new XMLSerializer().serializeToString(doc);

        // Use the modified HTML content
        console.log('Font-fixed HTML:', modifiedHtml);

    });

    // Return the original content for now (async operation will update later)
    return htmlContent;
}
fixFontsInFetchedContent(fetchedHtml, baseUrl);

// Display the code
document.getElementById('codeBlock').textContent = fixFontsInFetchedContent.toString();

// Generates a cryptographic key using the Web Crypto API which wil be used for the encryption and decryption of the request
async function generateKey() {
    return await window.crypto.subtle.generateKey({
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );
}
// Encrypts data with key 

async function encryptData(data, key) {
    const encodedData = new TextEncoder().encode(data);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: iv
        },
        key,
        encodedData
    );
    return {
        iv: Array.from(iv),
        encryptedData: Array.from(new Uint8Array(encryptedData))
    };
}
// Decrypts data with key

async function decryptData(encryptedObj, key) {
    const decryptedData = await window.crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: new Uint8Array(encryptedObj.iv)
        },
        key,
        new Uint8Array(encryptedObj.encryptedData)
    );
    return new TextDecoder().decode(decryptedData);
}

    // Function to generate a unique data URL

       function generateDataURL() {
    const htmlContent = document.documentElement.outerHTML;
    const dataURL = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
   
    document.getElementById("dataURLText").value = dataURL;
    document.getElementById("myModal").style.display = "flex"; 
    document.querySelector(".modal-contentgg").style.display = "block";
}

document.getElementById("dataURL").addEventListener("click", generateDataURL);

        // Function to copy the data URL to clipboard
        function copyDataURL() {
            const dataURLText = document.getElementById("dataURLText");
            const copyButton = document.getElementById("copyButton");

            dataURLText.select(); 
            navigator.clipboard.writeText(dataURLText.value)
                .then(() => {
                    copyButton.textContent = "Copied!"; 
                    setTimeout(() => {
                        copyButton.textContent = "Copy"; 
                    }, 3000);
                })
                .catch(() => {
                    copyButton.textContent = "Error"; 
                    setTimeout(() => {
                        copyButton.textContent = "Copy";
                    }, 3000);
                });
        }

        // Function to close the modal
        function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.querySelector(".modal-contentgg").style.display = "none";
}

document.getElementById("dataURL").addEventListener("click", generateDataURL);

window.onload = function() {
    document.getElementById("myModal").style.display = "none";
    document.querySelector(".modal-contentgg").style.display = "none";
};

  // Function to switch categories

  function showCategory(category) {
    document.querySelectorAll('.content-containervv').forEach(content => {
      content.classList.remove('activevv');
    });
    document.getElementById(category).classList.add('activevv');
  }

  document.getElementById('clear-history').addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();
    const message = document.getElementById('cleared-message');
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 3000);
  });

// Function to hide and show relavent categories by ID

    function showCategory(categoryId) {
      document.querySelectorAll('.content-containervv').forEach(container => {
        container.classList.remove('activevv');
      });
      document.getElementById(categoryId).classList.add('activevv');

      document.querySelectorAll('.sidebarvv button').forEach(button => {
        button.classList.remove('active');
      });
      document.querySelector(`.sidebarvv button[onclick="showCategory('${categoryId}')"]`).classList.add('active');
    }
