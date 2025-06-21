const BASE_URL = 'http://localhost:8000/flixer-api/'

export function FlexirApi(endpoint, method = 'GET', data) {
  const headers = {}
  const access_token = localStorage.getItem("access_token")

  if (access_token) {
    headers['Authorization'] = `Bearer ${access_token}`;
  }

  const config = {
    method,
    headers,
  };
  
  if (method === 'PUT' && data instanceof FormData) {
     endpoint += data?.get("id") ? `/${data?.get("id")}` : ''
  } else {
    endpoint += data?.['id'] ? `/${data.id}` : ''
  }

 if (['PUT', 'POST'].includes(method)) {
    if (data instanceof FormData) {
      config['body'] = data;
    } else {
      headers['Content-Type'] = 'application/json';
      config['body'] = JSON.stringify(data);
    }
  }

  return fetch(`${BASE_URL}${endpoint}`, config)
      .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            return data;
          } else {
            const error = new Error(response.statusText);
            error.status = response.status;
            throw error;
          }
      });
}