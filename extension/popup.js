document.addEventListener("DOMContentLoaded", function(){
    const url_display = document.getElementById('url-display')
    const scan_button = document.getElementById('scan-btn')
    const result_div = document.getElementById('result')

    
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let currentURL = tabs[0].url;
        url_display.textContent = "Target: " + currentURL;

        //Save the URL 
        scan_button.setAttribute('data-url', currentURL)
    });

    scan_button.addEventListener('click', function(){
        let urlToCheck = scan_button.getAttribute('data-url');
        
        result_div.textContent = "Analyzing..."

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url: urlToCheck})
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server Response:", data)

            if (data['result:'] === "good"){
                result_div.textContent = "GOOD";
            } else if (data['result:'] === "bad"){
                result_div.textContent = "BAD";
            } else{
                result_div.textContent = "UNKNOWN";
            }
        })
        .catch((error)=>{
            console.log('Error:', error)
            result_div.textContent = "Error: Server not running";
        });
    });

});