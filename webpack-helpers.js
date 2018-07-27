const path = require("path");

module.exports = function() {
  let paths = [].slice.apply(arguments);
  return path.join.apply(path, [__dirname].concat(paths));
};
