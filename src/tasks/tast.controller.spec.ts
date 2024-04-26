import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { ITaskService } from './task.interface';
import { Task } from './task.entity';
import { Response } from 'express';

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: ITaskService;
  let res: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: 'TaskService',
          useValue: {
            createTask: jest.fn(),
            getAllTasks: jest.fn(),
            getTasksNearLocation: jest.fn(),
            getTaskById: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    taskService = module.get<ITaskService>('TaskService');
  });

  it('should return an array of tasks', async () => {
    const tasks: Task[] = [];
    jest.spyOn(taskService, 'getAllTasks').mockResolvedValue(tasks);
    const result = await controller.getAllTasks(res);
    expect(result).toEqual(tasks);
    expect(taskService.getAllTasks).toHaveBeenCalled();
  });

  it('should create a task', async () => {
    const newTask: Task = {
      id: '1',
      description: 'Collect trash at corner of Main St and Elm St',
      location: { latitude: 37.7749, longitude: -122.4194 },
      status: 'pending',
    };
    const createdTask: Task = {
      id: '1',
      description: 'Collect trash at corner of Main St and Elm St',
      location: { latitude: 37.7749, longitude: -122.4194 },
      status: 'pending',
    };
    jest.spyOn(taskService, 'createTask').mockResolvedValue(createdTask);
    const result = await controller.createTask(res,newTask);
    expect(result).toEqual(createdTask);
  });
});
