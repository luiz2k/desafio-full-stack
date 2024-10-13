import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/validation/zod-validation-pipe';
import { CreateTaskDto, createTaskSchema } from './dto/create-task.dto';
import { UpdateTaskDto, updateTaskSchema } from './dto/update-task.dto';
import { TaskService } from './task.service';

interface Req {
  user: {
    id: number;
  };
}

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  // Cria uma tarefa
  async create(
    @Request() req: Req,
    @Body(new ZodValidationPipe(createTaskSchema)) createTaskDto: CreateTaskDto,
  ) {
    const task = await this.taskService.create(req.user.id, createTaskDto);

    return {
      message: 'Tarefa criada',
      data: task,
    };
  }

  @Get()
  // Obtém todas as tarefas de um usuário
  async findAll(@Request() req: Req) {
    const tasks = await this.taskService.findAll(req.user.id);

    return {
      message: 'Tarefas encontradas',
      data: tasks,
    };
  }

  @Put(':id')
  // Atualiza uma tarefa
  async update(
    @Param('id') id: string,
    @Request() req: Req,
    @Body(new ZodValidationPipe(updateTaskSchema)) updateTaskDto: UpdateTaskDto,
  ) {
    const updatedTask = await this.taskService.update(
      req.user.id,
      +id,
      updateTaskDto,
    );

    return {
      message: 'Tarefa atualizada',
      data: updatedTask,
    };
  }

  @Delete(':id')
  // Faz a remoção de uma tarefa
  async remove(@Request() req: Req, @Param('id') id: string) {
    const deletedTask = await this.taskService.remove(req.user.id, +id);

    return {
      message: 'Tarefa removida',
      data: deletedTask,
    };
  }
}
