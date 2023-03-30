import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  public async create(
    @Req() request: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(createTaskDto, request.user);
  }

  @Get('listTasks')
  public async findAll(@Req() request: RequestWithUser) {
    return this.tasksService.findAll(request.user);
  }

  @Get('listDoneTasks')
  public async findAllDoneTasks(@Req() request: RequestWithUser) {
    return this.tasksService.findAllDoneTasks(request.user);
  }

  @Get('listPlannedTasks')
  public async findAllPlannedTasks(@Req() request: RequestWithUser) {
    return this.tasksService.findAllPlannedTasks(request.user);
  }

  @Get(':id')
  public async findOne(@Req() request: RequestWithUser, @Param() { id }) {
    return this.tasksService.findOne(request.user, id);
  }

  @Put(':id')
  public async update(
    @Req() request: RequestWithUser,
    @Param() { id },
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(request.user, id, updateTaskDto);
  }

  @Post('markAsDone/:id')
  public async markAsDone(@Req() request: RequestWithUser, @Param() { id }) {
    return this.tasksService.markAsDone(request.user, id);
  }

  @Delete(':id')
  public async remove(@Req() request: RequestWithUser, @Param() { id }) {
    return this.tasksService.remove(request.user, id);
  }
}
