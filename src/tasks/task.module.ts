import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [
    { provide: 'TaskService', useClass: TaskService },
    { provide: 'ITaskService', useClass: TaskService },
  ],
})
export class TaskModule {}
