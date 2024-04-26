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
import { AuthenticatedApiOperation } from '../factories/secured-api-decorators';
import {
  CREATE_TASK,
  GET_ALL_TASKS,
  GET_TASKS_NEAR_LOCATION,
  NEAR_LOCATION_API,
  NEAR_LOCATION_QUERY_STRING,
  RETURN_CREATED_TASK,
  RETURN_OF_TASKS,
  RETURN_TASKS_NEAR_LOCATION,
  GET_TASK_BY_ID_DESCRIPTION,
  GET_TASK_BY_ID_PARAM_DESCRIPTION,
  GET_TASK_BY_ID_PARAM_NAME,
  GET_TASK_BY_ID_SUMMARY,
  PUT_DESCRIPTION,
  DELETE_DESCRIPTION,
  DELETE_PARAM_DESCRIPTION,
  DELETE_PARAM_NAME,
  DELETE_SUMMARY,
  PUT_PARAM_DESCRIPTION,
  PUT_PARAM_NAME,
  PUT_SUMMARY,
} from '../constants/swagger.constants';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('TaskService') private readonly taskService: ITaskService,
  ) {}

  @Post()
  @AuthenticatedApiOperation(CREATE_TASK, RETURN_CREATED_TASK, [], [])
  async createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Get()
  @AuthenticatedApiOperation(GET_ALL_TASKS, RETURN_OF_TASKS)
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(NEAR_LOCATION_API)
  @AuthenticatedApiOperation(
    GET_TASKS_NEAR_LOCATION,
    RETURN_TASKS_NEAR_LOCATION,
    NEAR_LOCATION_QUERY_STRING,
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
    GET_TASK_BY_ID_DESCRIPTION,
    GET_TASK_BY_ID_SUMMARY,
    [],
    [
      {
        name: GET_TASK_BY_ID_PARAM_NAME,
        description: GET_TASK_BY_ID_PARAM_DESCRIPTION,
      },
    ],
  )
  async getTaskById(
    @Param(GET_TASK_BY_ID_PARAM_NAME) id: string,
  ): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  @AuthenticatedApiOperation(
    PUT_DESCRIPTION,
    PUT_SUMMARY,
    [],
    [{ name: PUT_PARAM_NAME, description: PUT_PARAM_DESCRIPTION }],
  )
  async updateTask(
    @Param(PUT_PARAM_NAME) id: string,
    @Body() task: Task,
  ): Promise<Task> {
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  @AuthenticatedApiOperation(
    DELETE_DESCRIPTION,
    DELETE_SUMMARY,
    [],
    [{ name: DELETE_PARAM_NAME, description: DELETE_PARAM_DESCRIPTION }],
  )
  async deleteTask(@Param(DELETE_PARAM_NAME) id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
