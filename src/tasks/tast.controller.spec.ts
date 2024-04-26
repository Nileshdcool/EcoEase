import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { ITaskService } from './task.interface';
import { Task } from './task.entity';

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

  it('should create a task', async () => {
    const newTask: Task = {
      id: 'GHAQ0001',
      description: 'location1 garbage',
      location: { latitude: 13.1, longitude: -13.1 },
    };
    const createdTask: Task = {
      id: 'GHAQ0001',
      description: 'location1 garbage',
      location: { latitude: 13.1, longitude: -13.1 },
    };
    jest.spyOn(taskService, 'createTask').mockResolvedValue(createdTask);
    const result = await controller.createTask(newTask);
    expect(result).toEqual(createdTask);
  });
});
