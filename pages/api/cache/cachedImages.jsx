var createCache = (function () {
  //Private variable, available via closure
  let newData = [];

  function createCache(data) {
    if (data) {
      newData.push(data);
    }

    var provideCache = function () {
      return newData;
    };

    return provideCache();
  }

  return createCache;
})();

export { createCache };
