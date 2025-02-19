import { hash } from 'bcrypt';
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

const createUser = async () => {
  await prisma.user.create({
    data: {
      id: '1',
      name: 'Vanusa Godinho',
      password: await hash('1234', 8),
      phone: '44998692094',
    },
  });
};
const orchestrator = { cleanCups, createCups, cleanUsers, createUser };

export default orchestrator;
