export default function pick(o, ...fields) {
  return fields.reduce((a, x) => {
    if (o == undefined) {
      return;
    }
    if (o.hasOwnProperty(x)) {
      a[x] = o[x];
    }
    return a;
  }, {});
}