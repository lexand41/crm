const URL = 'https://jsonplaceholder.typicode.com/posts'

const httpRequest = (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
    }

    xhr.addEventListener('load', () => {
      const data = JSON.parse(xhr.response);
      if (callback) callback(null, data);
    })

    xhr.addEventListener('error', () => {
      console.log('error');
    })

    xhr.send(JSON.stringify(body));
  } catch (err) {
    callback(err);
  }
};

const renderGoods = (err, data) => {
  if (err) {
    const h2 = document.createElement('h2');
    h2 .style.color = 'red';
    h2.textContent = err;
    document.body.append(h2); 
  }

  const goods = data.map(item => {
    // console.log(item);
  })
};

// rendeGoods();
httpRequest(URL, {
  method: 'get',
  callback: renderGoods,
});

