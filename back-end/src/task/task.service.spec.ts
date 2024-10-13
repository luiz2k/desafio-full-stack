import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../database/prisma.service';
import { NotFoundException } from '@nestjs/common';

const fakeTasks = [
  {
    id: 1,
    titulo: 'Tarefa 01',
  },
  {
    id: 2,
    titulo: 'Tarefa 02',
  },
  {
    id: 3,
    titulo: 'Tarefa 03',
  },
];

const prismaMock = {
  tasks: {
    create: jest.fn().mockReturnValue(fakeTasks[0]),
    findMany: jest.fn().mockResolvedValue(fakeTasks),
    findUnique: jest.fn().mockResolvedValue(fakeTasks[0]),
    update: jest.fn().mockResolvedValue(fakeTasks[0]),
    delete: jest.fn().mockResolvedValue(fakeTasks[0]),
  },
};

describe('TaskService', () => {
  let service: TaskService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('create', () => {
    it('Deve criar uma tarefa', async () => {
      const response = await service.create(1, {
        title: 'Tarefa teste',
      });

      expect(response).toEqual(fakeTasks[0]);
    });

    it('Deve retornar uma exceção', async () => {
      prisma.tasks.create = jest.fn().mockRejectedValue(new Error());

      await expect(
        service.create(1, { title: 'Tarefa teste' }),
      ).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('Deve buscar todas as tarefas', async () => {
      const response = await service.findAll(1);

      expect(response).toEqual(fakeTasks);
    });

    it('Deve retornar uma exceção', async () => {
      prisma.tasks.findMany = jest.fn().mockRejectedValue(new Error());

      await expect(service.findAll(1)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('Deve atualizar uma tarefa', async () => {
      const response = await service.update(1, 1, {
        title: 'Tarefa atualizada',
      });

      expect(response).toEqual(fakeTasks[0]);
    });

    it('Deve retornar uma exceção ao tentar atualizar uma tarefa inexistente', async () => {
      jest.spyOn(prisma.tasks, 'findUnique').mockResolvedValueOnce(null);

      await expect(
        service.update(1, 1, {
          title: 'Tarefa atualizada',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('Deve deletar uma tarefa', async () => {
      const response = await service.remove(1, 1);

      expect(response).toEqual(fakeTasks[0]);
    });

    it('Deve retornar uma exceção ao tentar deletar uma tarefa inexistente', async () => {
      jest.spyOn(prisma.tasks, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.remove(1, 1)).rejects.toThrow(NotFoundException);
    });
  });
});
