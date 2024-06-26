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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
import { LATITUDE, LONGITUDE, RADIUS } from '../constants/tasks.constants';
import { handleSuccess } from '../helpers/api-response-handler';
import {
  TASKS_RETRIVED_SUCCESSFULLY,
  TASK_CREATED_SUCCESSFULLY,
  TASK_DELETED_SUCCESSFULLY,
  TASK_RETRIVED_SUCCESSFULL,
  TASK_UPDATED_SUCCESSFULLY,
} from '../constants/messages.constants';
import { Task } from '../types/task.entity';

@ApiTags('tasks')
@Controller('/api/tasks')
export class TaskController {
  constructor(
    @Inject('TaskService') private readonly taskService: ITaskService,
  ) {}

  @Get()
  @AuthenticatedApiOperation(GET_ALL_TASKS, RETURN_OF_TASKS)
  async getAllTasks(@Res() res: Response) {
    const data = await this.taskService.getAllTasks();
    return handleSuccess<Task[]>(res, TASKS_RETRIVED_SUCCESSFULLY, data);
  }

  @Post()
  @AuthenticatedApiOperation(CREATE_TASK, RETURN_CREATED_TASK, [], [])
  async createTask(@Res() res: Response, @Body() task: Task) {
    const data = await this.taskService.createTask(task);
    return handleSuccess<Task>(res, TASK_CREATED_SUCCESSFULLY, data);
  }

  @Get(NEAR_LOCATION_API)
  @AuthenticatedApiOperation(
    GET_TASKS_NEAR_LOCATION,
    RETURN_TASKS_NEAR_LOCATION,
    NEAR_LOCATION_QUERY_STRING,
  )
  async getTasksNearLocation(
    @Res() res: Response,
    @Query(LATITUDE) latitude: number,
    @Query(LONGITUDE) longitude: number,
    @Query(RADIUS) radius: number,
  ) {
    const data = await this.taskService.getTasksNearLocation(
      latitude,
      longitude,
      radius,
    );
    return handleSuccess<Task[]>(res, TASKS_RETRIVED_SUCCESSFULLY, data);
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
    @Res() res: Response,
    @Param(GET_TASK_BY_ID_PARAM_NAME) id: string,
  ) {
    const data = await this.taskService.getTaskById(id);
    return handleSuccess<Task>(res, TASK_RETRIVED_SUCCESSFULL, data);
  }

  @Put(':id')
  @AuthenticatedApiOperation(
    PUT_DESCRIPTION,
    PUT_SUMMARY,
    [],
    [{ name: PUT_PARAM_NAME, description: PUT_PARAM_DESCRIPTION }],
  )
  async updateTask(
    @Res() res: Response,
    @Param(PUT_PARAM_NAME) id: string,
    @Body() task: Task,
  ) {
    const data = await this.taskService.updateTask(id, task);
    return handleSuccess<Task>(res, TASK_UPDATED_SUCCESSFULLY, data);
  }

  @Delete(':id')
  @AuthenticatedApiOperation(
    DELETE_DESCRIPTION,
    DELETE_SUMMARY,
    [],
    [{ name: DELETE_PARAM_NAME, description: DELETE_PARAM_DESCRIPTION }],
  )
  async deleteTask(@Res() res: Response, @Param(DELETE_PARAM_NAME) id: string) {
    await this.taskService.deleteTask(id);
    return handleSuccess<Task>(res, TASK_DELETED_SUCCESSFULLY, null);
  }
}
