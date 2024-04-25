import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [TaskModule],
})
export class AppModule {}
