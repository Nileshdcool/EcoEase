import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Task } from './task.entity';
import { ITaskService } from './task.interface';
import { calculateDistance } from '../utils/distance';
import { EARTH_RADIUS_KM } from '../constants/tasks.constants';

@Injectable()
export class TaskService implements ITaskService {
  private readonly db = admin.firestore();

  async createTask(task: Task): Promise<Task> {
    try {
      const docRef = await this.db.collection('tasks').add(task);
      return { id: docRef.id, ...task };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      const snapshot = await this.db.collection('tasks').get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Task),
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTasksNearLocation(
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<Task[]> {
    try {
      const allTasks = await this.getAllTasks();
      const nearTasks = filterTasksNearLocation(
        allTasks,
        latitude,
        longitude,
        radius,
      );
      return nearTasks;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const doc = await this.db.collection('tasks').doc(id).get();
      return { id: doc.id, ...(doc.data() as Task) };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateTask(id: string, task: Task): Promise<Task> {
    try {
      const taskData = { ...task };
      delete taskData.id;
      await this.db.collection('tasks').doc(id).update(taskData);
      return { id, ...task };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.db.collection('tasks').doc(id).delete();
    } catch (error) {
      throw new Error(error);
    }
  }
}

function filterTasksNearLocation(
  tasks: Task[],
  latitude: number,
  longitude: number,
  radius: number,
): Task[] {
  const nearTasks: Task[] = [];
  const earthRadiusKm = EARTH_RADIUS_KM; // Radius of the Earth in kilometers

  tasks.forEach((task) => {
    const distance = calculateDistance(
      task.location.latitude,
      task.location.longitude,
      latitude,
      longitude,
      earthRadiusKm,
    );
    if (distance <= radius) {
      nearTasks.push(task);
    }
  });

  return nearTasks;
}
