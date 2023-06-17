const urlRegExp = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+))\S+(?:jpg|jpeg|png|bmp|svg|webp)$/, 'ig'
);

module.exports = urlRegExp;
