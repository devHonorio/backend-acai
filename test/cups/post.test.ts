import api from 'test/api';
import orchestrator from 'test/orchestrator';

beforeAll(async () => {
  await orchestrator.cleanCups();
});

describe('POST /cups', () => {
  describe('Anonymouns user', () => {
    test('creating user', async () => {
      return await api.post('/cups').send({ id: '1', size: 300 }).expect(201);
    });

    test('creating user exists', async () => {
      return api.post('/cups').send({ id: '1', size: 300 }).expect(400).expect({
        message: 'Esse copo já existe.',
        error: 'Se teve ter um único copo de um mesmo tamanho',
        statusCode: 400,
      });
    });

    test('creating user size invalid', async () => {
      return api
        .post('/cups')
        .send({ id: '1', size: 'string' })
        .expect(400)
        .expect({
          message: 'Verifique se o tamanho do copo é valido.',
          error: 'Tamanho invalido',
          statusCode: 400,
        });
    });

    test('creating user id invalid', async () => {
      return api
        .post('/cups')
        .send({ id: 4, size: 440 })
        .expect(201)
        .expect({});
    });
  });
});
