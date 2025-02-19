import api from 'test/api';
import orchestrator from 'test/orchestrator';

beforeAll(async () => {
  await orchestrator.cleanUsers();
  await orchestrator.createUser();
});

describe('POST /auth/login', () => {
  test('logging user', async () => {
    const response = await api
      .post('/auth/login')
      .send({ phone: '44998692094', password: '1234' })
      .expect(200);

    expect(response.body).toHaveProperty('access_token');
  });

  test('logging user not found', async () => {
    await api
      .post('/auth/login')
      .send({ phone: '00000000000', password: '1234' })
      .expect(404)
      .expect({
        error: 'Not Found',
        message: 'Usuário não encontrado.',
        statusCode: 404,
      });
  });

  test('logging user password invalid.', async () => {
    await api
      .post('/auth/login')
      .send({ phone: '44998692094', password: '123' })
      .expect(401)
      .expect({
        message: 'Senha incorreta.',
        error: 'Unauthorized',
        statusCode: 401,
      });
  });
});
