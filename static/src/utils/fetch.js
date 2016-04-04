import fetch from 'isomorphic-fetch'

export default (url, option) => {
  option = Object.assign({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'get'
  }, option)
  
  if (option.method.toLowerCase() == 'get' && option.body) {
    url += '?'+ Object.keys(option.body)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(option.body[key]))
            .join("&")
            .replace(/%20/g, "+")
    delete option.body
  }
  if (option.body) {
    option.body = JSON.stringify(option.body)
  }
  return fetch(url, option)
    .then(res => res.json())
    .then(res => {
      if (+res.code === 0) {
        return Promise.resolve(res.data.value)
      }
      return Promise.reject({
        message: res.msg,
        data: res.data
      });
    });
}