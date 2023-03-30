import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(taskBody: CreateTaskDto, user: User) {
    return await this.prismaService.task.create({
      data: {
        ...taskBody,
        user: { connect: { id: user.id } },
      },
    });
  }

  async findAll(user: User) {
    // prisma unforutunally doesn't support soft delete so this is a workaround for it by checking on the deletedAt is null.
    return await this.prismaService.task.findMany({
      where: {
        AND: [
          {
            userId: user.id,
          },
          {
            deletedAt: null,
          },
        ],
      },
    });
  }

  async findOne(user: User, id: string) {
    const task = await this.prismaService.task.findFirst({
      where: {
        AND: [
          {
            id,
          },
          {
            userId: user.id,
          },
          {
            deletedAt: null,
          },
        ],
      },
    });

    if (!task) {
      throw new NotFoundException('Task is not found!');
    }
    return task;
  }

  async update(user: User, id: string, updateTaskDto: UpdateTaskDto) {
    const targetTask = await this.findOne(user, id);

    return await this.prismaService.task.update({
      where: { id: targetTask.id },
      data: {
        ...updateTaskDto,
      },
    });
  }

  async markAsDone(user: User, id: string) {
    const targetTask = await this.findOne(user, id);

    return await this.prismaService.task.update({
      where: { id: targetTask.id },
      data: {
        status: TaskStatus.Done,
      },
    });
  }

  async findAllDoneTasks(user: User) {
    return await this.prismaService.task.findMany({
      where: {
        AND: [
          {
            userId: user.id,
          },
          {
            deletedAt: null,
          },
          {
            status: TaskStatus.Done,
          },
        ],
      },
    });
  }

  async findAllPlannedTasks(user: User) {
    return await this.prismaService.task.findMany({
      where: {
        AND: [
          {
            userId: user.id,
          },
          {
            deletedAt: null,
          },
          {
            status: TaskStatus.Planned,
          },
        ],
      },
    });
  }

  async remove(user: User, id: string) {
    const targetTask = await this.findOne(user, id);

    await this.prismaService.task.update({
      where: { id: targetTask.id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
