import { request } from '../utils';

export default async function getUsers(params) {
  const url = '/users';
  return request(url, params);
}
