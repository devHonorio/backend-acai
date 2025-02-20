import api, { getTokenAdmin, getTokenUser } from 'test/api';
import orchestrator from 'test/orchestrator';
import { z } from 'zod';

let access_token: string;
let access_token_user: string;
beforeAll(async () => {
  await orchestrator.cleanUsers();
  await orchestrator.createUserAdmin();
  await orchestrator.createUserNotAutorized();
  access_token = await getTokenAdmin();
  access_token_user = await getTokenUser();
});
const bodySchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  password: z.string(),
  rulles: z.array(z.string()),
});
describe('POST /users', () => {
  const user = {
    id: '2',
    name: 'vanusa pereira',
    phone: '46999222970',
    password: '1234',
    rulles: ['read:users', 'write:users'],
  };
  describe('Admin user', () => {
    test('creating user admin', async () => {
      const response = await api
        .post('/users')
        .auth(access_token, { type: 'bearer' })
        .send(user)
        .expect(201);

      const { id, name, phone, rulles } = bodySchema.parse(response.body);
      expect(id).toBe('2');
      expect(name).toBe('vanusa pereira');
      expect(phone).toBe('46999222970');
      expect(id).toBe('2');
      expect(rulles).toEqual(['read:users', 'write:users']);
    });

    test('creating user with length phone invalid', async () => {
      const user = { id: '2', name: 'José Honorio', phone: '4498692094' };
      await api
        .post('/users')
        .send(user)
        .auth(access_token, { type: 'bearer' })
        .expect(400)
        .expect({
          error: 'Phone Invalid',
          message: 'Telefone deve conter 11 digitos.',
          statusCode: 400,
        });
    });

    test('creating user none phone', async () => {
      const user = { id: '2', name: 'José Honorio' };
      await api
        .post('/users')
        .send(user)
        .auth(access_token, { type: 'bearer' })
        .expect(400)
        .expect({
          error: 'Phone Invalid',
          message: 'Telefone deve conter 11 digitos.',
          statusCode: 400,
        });
    });

    test('creating user none lastname', async () => {
      const user = { id: '3', name: 'José', phone: '44998692094' };
      await api
        .post('/users')
        .send(user)
        .auth(access_token, { type: 'bearer' })
        .expect(400)
        .expect({
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
      await api
        .post('/users')
        .send(user)
        .auth(access_token, { type: 'bearer' })
        .expect(400)
        .expect({
          message:
            'Nome deve conter ao menos 2 letras e não deve ser abreviado.',
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
        message: 'Usuário não autorizado',
        error: 'Unauthorized',
        statusCode: 401,
      });
    });
  });

  describe('Unauthoriized User', () => {
    test('creating new user without write:users rule', async () => {
      await api
        .post('/users')
        .auth(access_token_user, { type: 'bearer' })
        .send({
          id: '12',
          name: 'vanusa pereira',
          phone: '00000000002',
          password: '1234',
          rulles: ['read:users', 'write:users'],
        })
        .expect(401)
        .expect({
          message:
            'Usuário não autorizado verifique se tem a regra "write:users"',
          error: 'Unauthorized',
          statusCode: 401,
        });
    });
  });
});
