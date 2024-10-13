import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../database/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria uma tarefa
  async create(userId: number, createTaskDto: CreateTaskDto) {
    // Cria uma tarefa com o ID do usuário
    const task = await this.prisma.tasks.create({
      data: {
        title: createTaskDto.title,
        userId: userId,
      },
    });

    return task;
  }

  // Obtém todas as tarefas de um usuário
  async findAll(userId: number) {
    // Busca todas as tarefas do usuário
    const tasks = await this.prisma.tasks.findMany({
      where: {
        userId: userId,
      },
    });

    return tasks;
  }

  // Atualiza uma tarefa
  async update(userId: number, taskId: number, updateTaskDto: UpdateTaskDto) {
    const taskExists = await this.prisma.tasks.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (!taskExists) {
      throw new NotFoundException({
        message: 'Tarefa inexistente',
      });
    }

    // Atualiza a tarefa pelo ID da tarefa e pelo ID do usuário
    const updatedTask = await this.prisma.tasks.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: {
        ...updateTaskDto,
      },
    });

    return updatedTask;
  }

  // Faz a remoção de uma tarefa
  async remove(userId: number, taskId: number) {
    // Busca pelo ID da tarefa e pelo ID do usuário
    const task = await this.prisma.tasks.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    // Se a tarefa não existir, lança um erro
    if (!task) {
      throw new NotFoundException({
        message: 'Tarefa inexistente',
      });
    }

    // Remove a tarefa
    const deletedTask = await this.prisma.tasks.delete({
      where: {
        id: taskId,
      },
    });

    return deletedTask;
  }
}
