export const now = (function () {

  if (typeof performance !== "undefined") {
    return performance.now;
  }

  if (typeof Date.now === "function") {
    return Date.now;
  }

  return function now() {
    return (new Date).getTime();
  };

})();
