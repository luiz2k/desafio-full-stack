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
  create(
    @Request() req: Req,
    @Body(new ZodValidationPipe(createTaskSchema)) createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(req.user.id, createTaskDto);
  }

  @Get()
  // Obtém todas as tarefas de um usuário
  findAll(@Request() req: Req) {
    return this.taskService.findAll(req.user.id);
  }

  @Put(':id')
  // Atualiza uma tarefa
  update(
    @Param('id') id: string,
    @Request() req: Req,
    @Body(new ZodValidationPipe(updateTaskSchema)) updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(req.user.id, +id, updateTaskDto);
  }

  @Delete(':id')
  // Faz a remoção de uma tarefa
  remove(@Request() req: Req, @Param('id') id: string) {
    return this.taskService.remove(req.user.id, +id);
  }
}
