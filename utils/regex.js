const urlRegExp = new RegExp(
  /^((http|https|www):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)\S+(?:jpg|jpeg|png|bmp|svg|webp)$/, 'ig'
);

module.exports = urlRegExp;
