import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':phone')
  async findOne(@Param('phone') number: number) {
    return await this.userService.findOne(number);
  }

  @Put(':phone')
  async update(
    @Param('phone') phone: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(phone, updateUserDto);
  }

  @Delete(':phone')
  async remove(@Param('phone') phone: number) {
    return await this.userService.remove(phone);
  }
}
