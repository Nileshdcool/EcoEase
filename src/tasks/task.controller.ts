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
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('TaskService') private readonly taskService: ITaskService,
  ) {}

  @Post()
  async createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get('near')
  @ApiQuery({
    name: 'latitude',
    required: true,
    description: 'Latitude of the location',
  })
  @ApiQuery({
    name: 'longitude',
    required: true,
    description: 'Longitude of the location',
  })
  @ApiQuery({
    name: 'radius',
    required: true,
    description: 'Search radius in meters',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve tasks near the specified location',
  })
  async getTasksNearLocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ): Promise<Task[]> {
    return this.taskService.getTasksNearLocation(latitude, longitude, radius);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
