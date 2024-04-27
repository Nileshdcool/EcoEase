import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { ITaskService } from './task.interface';
import { Response } from 'express';
import { Task } from '../types/task.entity';
import { Status } from '../enums/status.enum';
import { TASKS_RETRIVED_SUCCESSFULLY } from '../constants/messages.constants';

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: ITaskService;

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of tasks', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        description: 'Collect trash at corner of Main St and Elm St',
        location: { latitude: 37.7749, longitude: -122.4194 },
        status: Status.Pending,
        workerId: 12,
      },
      {
        id: '2',
        description: 'Collect trash at corner of Main St and Elm St',
        location: { latitude: 37.7749, longitude: -122.4194 },
        status: Status.Pending,
        workerId: 12,
      },
    ];
    (taskService.getAllTasks as jest.Mock).mockResolvedValueOnce(mockTasks);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.getAllTasks(mockResponse);

    expect(taskService.getAllTasks).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: TASKS_RETRIVED_SUCCESSFULLY,
      data: mockTasks,
      success: true,
    });
  });

  it('should create a new task', async () => {
    const mockTask = {
      id: '1',
      description: 'Collect trash at corner of Main St and Elm St',
      location: { latitude: 37.7749, longitude: -122.4194 },
      status: Status.Pending,
      workerId: 12,
    };
    
    (taskService.createTask as jest.Mock).mockRejectedValueOnce(mockTask);
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.createTask(mockResponse, mockTask);

    expect(taskService.createTask).toHaveBeenCalledWith(mockTask);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Task created successfully',
      data: mockTask,
      success: true
    });
  })
});
