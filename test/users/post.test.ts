beforeAll(async () => {
  await orchestrator.cleanUsers();
});

import api from 'test/api';
import orchestrator from 'test/orchestrator';

describe('POST /users', () => {
  describe('Admin user', () => {
    test('creating user admin', async () => {
      const user = {
        id: '1',
        name: 'vanusa pereira',
        phone: '46999222970',
        rulles: ['read:users', 'write:users'],
      };
      await api
        .post('/users')
        .auth('', { type: 'bearer' })
        .send(user)
        .expect(201)
        .expect(user);
    });

    test('creating user with length phone invalid', async () => {
      const user = { id: '2', name: 'José Honorio', phone: '4498692094' };
      await api.post('/users').send(user).expect(400).expect({
        error: 'Phone Invalid',
        message: 'Telefone deve conter 11 digitos.',
        statusCode: 400,
      });
    });

    test('creating user none phone', async () => {
      const user = { id: '2', name: 'José Honorio' };
      await api.post('/users').send(user).expect(400).expect({
        error: 'Phone Invalid',
        message: 'Telefone deve conter 11 digitos.',
        statusCode: 400,
      });
    });

    test('creating user none lastname', async () => {
      const user = { id: '3', name: 'José', phone: '44998692094' };
      await api.post('/users').send(user).expect(400).expect({
        error: 'Name Invalid',
        message: 'Envie nome e sobrenome.',
        statusCode: 400,
      });
    });

    test('creating user with short name', async () => {
      const user = {
        id: '4',
        name: 'José H. de Oliveira',
        phone: '44998692094',
      };
      await api.post('/users').send(user).expect(400).expect({
        message: 'Nome deve conter ao menos 2 letras e não deve ser abreviado.',
        error: 'Name Invalid',
        statusCode: 400,
      });
    });
  });
  describe('Anonymouns user', () => {
    test('creating user', async () => {
      const user = {
        id: '1',
        name: 'vanusa pereira',
        phone: '46999222970',
      };

      await api.post('/users').send(user).expect(401).expect({
        error: 'Não Autorizado',
        message: 'Para criar usuário deve ter a rulle "write:user"',
      });
    });
  });
});
