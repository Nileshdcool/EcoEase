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
  UseGuards,
} from '@nestjs/common';
import { Task } from './task.entity';
import { ITaskService } from './task.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { authMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('TaskService') private readonly taskService: ITaskService,
  ) {}

  @Post()
  @UseGuards(authMiddleware)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a Task' })
  @ApiResponse({ status: 200, description: 'Return a created Task' })
  async createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Get()
  @UseGuards(authMiddleware)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all Tasks' })
  @ApiResponse({ status: 200, description: 'Returns an array of tasks.' })
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get('near-location')
  @UseGuards(authMiddleware)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get tasks near location' })
  @ApiQuery({
    name: 'latitude',
    description: 'Latitude of the location',
    type: 'number',
  })
  @ApiQuery({
    name: 'longitude',
    description: 'Longitude of the location',
    type: 'number',
  })
  @ApiQuery({
    name: 'radius',
    description: 'Search radius in meters',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns tasks near the specified location.',
  })
  async getTasksNearLocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
  ): Promise<Task[]> {
    return this.taskService.getTasksNearLocation(latitude, longitude, radius);
  }

  @Get(':id')
  @UseGuards(authMiddleware)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({ name: 'id', description: 'ID of the task' })
  @ApiResponse({ status: 200, description: 'Returns the task.' })
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  @UseGuards(authMiddleware)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'ID of the task' })
  @ApiResponse({ status: 200, description: 'Returns the updated task.' })
  async updateTask(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  @UseGuards(authMiddleware)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'ID of the task' })
  @ApiResponse({
    status: 204,
    description: 'Task has been successfully deleted.',
  })
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
