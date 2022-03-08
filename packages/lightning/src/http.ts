// TODO: it would be nice to have an utility in @trezor/utils that allows http in browser and nodejs ???


export const getRequest = async (url: string) => {
    const response = await fetch(url);

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      const json = await response.json();
      console.log('json', json);
      return json;
    }
    console.error(`HTTP-Error: ${  response.status}`);
};

export const postRequest = async (url: string, payload: object) => {
    // request options
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json'
    }
  }

  // send POST request
  const res = await fetch(url, options);
  console.log('res', res);
  return res.json();
}
