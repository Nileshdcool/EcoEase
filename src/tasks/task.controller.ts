import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { Task } from './task.entity';
import { ITaskService } from './task.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedApiOperation } from 'src/factories/secured-api-decorators';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('TaskService') private readonly taskService: ITaskService,
  ) {}

  @Post()
  @AuthenticatedApiOperation(
    'Create a Task',
    'Return a created Task',
    [],
    [],
  )
  async createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Get()
  @AuthenticatedApiOperation('Get all Tasks', 'Returns an array of tasks.')
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get('near-location')
  @AuthenticatedApiOperation(
    'Get tasks near location',
    'Returns tasks near the specified location.',
    [
      {
        name: 'latitude',
        description: 'Latitude of the location',
        type: 'number',
      },
      {
        name: 'longitude',
        description: 'Longitude of the location',
        type: 'number',
      },
      {
        name: 'radius',
        description: 'Search radius in meters',
        type: 'number',
      },
    ],
  )
  async getTasksNearLocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ): Promise<Task[]> {
    return this.taskService.getTasksNearLocation(latitude, longitude, radius);
  }

  @Get(':id')
  @AuthenticatedApiOperation(
    'Get task by ID',
    'Returns the task.',
    [],
    [{ name: 'id', description: 'ID of the task' }],
  )
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  @AuthenticatedApiOperation(
    'Update a task by ID',
    'Returns the updated task.',
    [],
    [{ name: 'id', description: 'ID of the task' }],
  )
  async updateTask(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  @AuthenticatedApiOperation(
    'Delete a task',
    'Task has been successfully deleted.',
    [],
    [{ name: 'id', description: 'ID of the task' }],
  )
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
