/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-04-20T23:43:35+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-04-21T00:18:14+08:00
* @License: The MIT License (MIT)
*/


export default function pick(o, ...fields) {
  return fields.reduce((a, x) => {
    if (o === undefined) {
      return null;
    }
    if (o.hasOwnProperty(x)) {
      a[x] = o[x];
    }
    return a;
  }, {});
}
