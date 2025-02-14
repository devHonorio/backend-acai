import { Cup } from '@prisma/client';
import api from 'test/api';
import orchestrator from 'test/orchestrator';

let cups: Cup[];

beforeAll(async () => {
  await orchestrator.cleanCups();
  cups = await orchestrator.createCups();
});

describe('DELETE /cups/:id', () => {
  describe('Anonymouns user', () => {
    test('deleting cup', async () => {
      await api.delete('/cups/2').expect(200).expect(cups[1]);
    });

    test('deleting cup with inalid id', async () => {
      await api.delete('/cups/2').expect(404).expect({
        message: 'Copo não encontrado para ser deletado.',
        statusCode: 404,
        error: 'Not Found',
      });
    });
  });
});
