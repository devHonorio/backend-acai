import { Cup } from '@prisma/client';
import api from 'test/api';
import orchestrator from 'test/orchestrator';

let cups: Cup[];

beforeAll(async () => {
  await orchestrator.cleanCups();
  cups = await orchestrator.createCups();
});

describe('GET /cups/:id', () => {
  describe('Anonymouns user', () => {
    test('searching for unique cup', async () => {
      await api.get('/cups/1').expect(200).expect(cups[0]);
    });
  });
});
