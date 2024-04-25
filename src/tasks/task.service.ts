import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Task } from './task.entity';
import { ITaskService } from './task.interface';

@Injectable()
export class TaskService implements ITaskService {
  private readonly db = admin.firestore();

  async createTask(task: Task): Promise<Task> {
    const docRef = await this.db.collection('tasks').add(task);
    return { id: docRef.id, ...task };
  }

  async getAllTasks(): Promise<Task[]> {
    const snapshot = await this.db.collection('tasks').get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Task),
    }));
  }

  async getTaskById(id: string): Promise<Task> {
    const doc = await this.db.collection('tasks').doc(id).get();
    return { id: doc.id, ...(doc.data() as Task) };
  }

  async updateTask(id: string, task: Task): Promise<Task> {
    const taskData = { ...task };
    delete taskData.id;
    await this.db.collection('tasks').doc(id).update(taskData);
    return { id, ...task };
  }

  async deleteTask(id: string): Promise<void> {
    await this.db.collection('tasks').doc(id).delete();
  }
}
