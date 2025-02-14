import { Cup } from '@prisma/client';
import api from 'test/api';
import orchestrator from 'test/orchestrator';

let cups: Cup[];

beforeAll(async () => {
  await orchestrator.cleanCups();
  cups = await orchestrator.createCups();
});

describe('GET /cups', () => {
  describe('Anonymouns user', () => {
    test('searching for a list of cups', async () => {
      const resp = await api.get('/cups').expect(200).expect(cups);

      expect(resp.body).toHaveLength(2);
    });
  });
});
