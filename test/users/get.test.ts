import orchestrator from 'test/orchestrator';

beforeAll(async () => {
  await orchestrator.cleanUsers();
});
