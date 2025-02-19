import api, { getToken } from 'test/api';
import orchestrator from 'test/orchestrator';

let acces_token: string;

beforeAll(async () => {
  await orchestrator.cleanUsers();
  await orchestrator.createUser();

  acces_token = await getToken();
});

describe('GET /auth/profile', () => {
  test('get currenty user', async () => {
    await api
      .get('/auth/profile')
      .auth(acces_token, { type: 'bearer' })
      .expect(200)
      .expect({ id: '1', username: 'Vanusa Godinho', phone: '44998692094' });
  });

  test('get currenty user token invalid', async () => {
    await api
      .get('/auth/profile')
      .auth('1234', { type: 'bearer' })
      .expect(401)
      .expect({ message: 'Usuário não autorizado', statusCode: 401 });
  });
});
