const KEY = 'SOME_KEY';
const storage = {};

const setToken = (token) => {
  storage[KEY] = token;
};

const getToken = () => storage[KEY];

export default {
  setToken,
  getToken,
};
