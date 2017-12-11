import { request } from '../utils';

export default async function login() {
  const url = '/login';
  return request(url);
};

