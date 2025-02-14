import { Cup } from '@prisma/client';
import api from 'test/api';
import orchestrator from 'test/orchestrator';

let cups: Cup[];

beforeAll(async () => {
  await orchestrator.cleanCups();
  cups = await orchestrator.createCups();
});

describe('PATCH /cups/:id', () => {
  describe('Anonymouns user', () => {
    test('updating size cup', async () => {
      await api
        .patch('/cups/2')
        .send({ size: 330 })
        .expect(200)
        .expect({ ...cups[1], size: 330 });
    });

    test('updating size cup with invalid id', async () => {
      await api.patch('/cups/3').send({ size: 330 }).expect(404).expect({
        statusCode: 404,
        error: 'Not Found',
        message: 'Copo não encontrado.',
      });
    });
  });
});
