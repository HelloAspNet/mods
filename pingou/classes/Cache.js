var Cache = {
  set: function (name, value) {
    localStorage.setItem(name, value);
  },
  get: function (name) {
    localStorage.getItem(name);
  },
  remove: function (name) {
    localStorage.removeItem(name);
  }
};

export default Cache;
