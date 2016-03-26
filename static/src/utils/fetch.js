import fetch from 'isomorphic-fetch';

export default (url, option) => {
  option = Object.assign({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  }, option);
  const body = option.body;
  if (body) {
    option.body = JSON.stringify(option.body);
  }
  return fetch(url, option)
    .then(res => res.json())
    .then(res => {
      if (+res.code === 0) {
        return Promise.resolve(res.data);
      }
      if (+res.code === 40003) {
      return Promise.reject('你没有权限');
      } else {
      return Promise.reject(res.mgs);
      }
    });
}