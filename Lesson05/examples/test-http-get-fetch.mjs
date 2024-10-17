var requestOptions = {
    method: 'GET',
    headers : {
      "Host": "www.smplanet.com",
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "pt-PT,pt-BR,pt,en-US,en",
      "Cache-Control": "max-age=0",
      "Connection": "keep-alive"
    }
  };
  
  fetch("http://www.smplanet.com/teaching/webpage-sample", requestOptions)
    .then(response => response.text())
    .then(headers => console.log(headers))
    .catch(error => console.log('error', error));
