import * as request from 'supertest';

import { z } from 'zod';

const api = request('http://localhost:3000');
export default api;

const responseBodySchema = z.object({
  access_token: z.string(),
});
const getTokenAdmin = async () => {
  const response = await api
    .post('/auth/login')
    .send({ phone: '44998692094', password: '1234' });
  const { access_token } = responseBodySchema.parse(response.body);

  return access_token;
};

const getTokenUser = async () => {
  const response = await api
    .post('/auth/login')
    .send({ phone: '99999999999', password: '1234' });
  const { access_token } = responseBodySchema.parse(response.body);

  return access_token;
};

export { getTokenAdmin, getTokenUser };
