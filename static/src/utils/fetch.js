import fetch from 'isomorphic-fetch';

export default (...args) => {
  return fetch(...args)
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