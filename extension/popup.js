document.addEventListener("DOMContentLoaded", function(){
    const url_display = document.getElementById('url-display')
    const scan_button = document.getElementById('scan-btn')
    const result_div = document.getElementById('result')
    const notice_div = document.getElementById('notice')

    
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let currentURL = tabs[0].url;
        url_display.textContent = "Target: " + currentURL;

        //Save the URL 
        scan_button.setAttribute('data-url', currentURL)
    });

    scan_button.addEventListener('click', function(){
        let urlToCheck = scan_button.getAttribute('data-url');
        
        let dots = 0;
        const loadingInterval = setInterval(()=>{
            dots = (dots + 1) % 4;
            result_div.textContent = "Analyzing" + ".".repeat(dots);
        }, 500);
        
        // Only show notice after 1 second delay
        const noticeTimeout = setTimeout(() => {
            notice_div.textContent = "Please allow up to 30 seconds for the server to wake up after a long period of inactivity";
        }, 1000);
        
        result_div.classList = " "; //reset color
        fetch(`${CONFIG.API_URL}/predict`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url: urlToCheck}),
        })
        .then(response => response.json())
        .then(data => {
            clearInterval(loadingInterval);
            clearTimeout(noticeTimeout);
            console.log("Server Response:", data)
            notice_div.textContent = ""
            if (data['result:'] === "good"){
                result_div.textContent = "GOOD";
                result_div.classList.add('safe')

            } else if (data['result:'] === "bad"){
                result_div.textContent = "BAD";
                result_div.classList.add('bad')
            } else{
                result_div.textContent = "UNKNOWN";
            }
        })
        .catch((error)=>{
            clearInterval(loadingInterval);
            clearTimeout(noticeTimeout);
            console.log('Error:', error)
            notice_div.textContent = ""
            result_div.textContent = "Error: Server not running";
        });
    });

});