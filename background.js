console.log("background.js")

chrome.browserAction.onClicked.addListener(function(tab) { 
  async function postData(url = '') {
    // Default options are marked with *
    const response = await fetch("http://localhost:3000/", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({"link":url+""}) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData(tab.url)
    .then(function(response) {                      // first then()
        if(response.status == "success")
        {
          return response.result;         
        }

        throw new Error('' + response.result);
    })  
    .then(function(text) {                          // second then()
      console.log('Request successful', text);  
    })  
    .catch(function(error) {                        // catch
      console.log('Request failed', error);
      alert("yt-server error " + error)
    });

});
