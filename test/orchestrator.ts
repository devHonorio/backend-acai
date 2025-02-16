import { prisma } from './prisma';

const cleanCups = async () => {
  await prisma.cup.deleteMany();
};

const createCups = async () => {
  const cups = await prisma.cup.createManyAndReturn({
    data: [
      { id: '1', size: 300 },
      { id: '2', size: 440 },
    ],
  });

  return cups;
};

const cleanUsers = async () => {
  await prisma.user.deleteMany();
};
const orchestrator = { cleanCups, createCups, cleanUsers };

export default orchestrator;
