export default (url, params) => {
  if (url === '/login') {
    return Promise.resolve({
      success: true,
      token: '3e5559ed50cfd254b2158a1bd0e12a37',
    });
  } else if (url === '/users' && params.token) {
    return Promise.resolve({
      success: true,
      data: [
        { id: 1, name: 'Oba' },
        { id: 2, name: 'Obb' },
        { id: 3, name: 'Obc' },
        { id: 4, name: 'Obd' },
      ],
    });
  }
  return Promise.resolve({
    success: false,
  });
};
