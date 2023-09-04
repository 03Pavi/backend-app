/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const { phone } = createUserDto;
    const isThere = await this.userModel.findOne({ phone });
    if (isThere) {
      return {
        message: 'user Already Exist',
      };
    }
    const newUser = await this.userModel.create(createUserDto);
    return {
      result: newUser,
      message: 'user Added Successfully',
    };
  }

  async findAll() {
    const allUser = await this.userModel.find();
    if (allUser.length < 1) {
      return { message: 'List is Empty' };
    }
    return {
      result: allUser,
      message: 'All User fetch successfully',
    };
  }

  async findOne(phone: number) {
    const User = await this.userModel.findOne({ phone });
    if (User) {
      return {
        result: User,
        message: ' User fetch successfully',
      };
    } else {
      return {
        result: User,
        message: ' User not found',
      };
    }
  }

  async update(phone: number, updateUserDto: UpdateUserDto) {
    // Assuming this.userModel represents your Mongoose model
    // and UpdateUserDto is a valid DTO (Data Transfer Object) for updating a user
    try {
      // Use the 'findOneAndUpdate' method to find and update the user
      const updateUser = await this.userModel.findOneAndUpdate(
        { phone }, // Filter by phone number
        updateUserDto, // Update with the data from updateUserDto
        { new: true }, // Option to return the updated document
      );

      if (!updateUser) {
        // If no user was found with the given phone number, handle this case accordingly
        return {
          result: null,
          message: 'User not found',
        };
      }

      // User was found and updated successfully
      return {
        result: updateUser,
        message: 'User updated successfully',
      };
    } catch (error) {
      // Handle any errors that occur during the update process
      return {
        result: null,
        message: 'Error updating user',
      };
    }
  }

  async remove(phone: number) {
    const isThere = await this.userModel.findOne({ phone });
    if (isThere) {
      await this.userModel.findOneAndRemove({ phone });
      return {
        message: 'Deleted succesfully',
      };
    }
    return {
      result: null,
      message: 'user not found',
    };
  }
}
