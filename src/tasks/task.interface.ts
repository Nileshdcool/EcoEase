import { Task } from './task.entity';

export interface ITaskService {
  createTask(task: Task): Promise<Task>;
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  updateTask(id: string, task: Task): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}
