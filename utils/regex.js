const urlRegExp = new RegExp(
  /^((http|https|www):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)\S+$/, 'ig'
);

module.exports = urlRegExp;
