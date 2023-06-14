import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { IUser } from 'src/interface/user.interface';
import { Model } from "mongoose";
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) { }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const newUser = await new this.userModel(createUserDto);
        return newUser.save();
    }

    async updateUser(userCode: string, updateUserDto: UpdateUserDto): Promise<IUser> {
        const existingUser = await this.userModel.findByIdAndUpdate(userCode, updateUserDto, { new: true });
        if (!existingUser) {
            throw new NotFoundException(`User #${userCode} not found`);
        }
        return existingUser;
    }

    async getAllUsers(): Promise<IUser[]> {
        const UserData = await this.userModel.find();
        if (!UserData || UserData.length == 0) {
            throw new NotFoundException('Users data not found!');
        }
        return UserData;
    }

    async getUser(userCode: string): Promise<IUser> {
        const existingUser = await this.userModel.findById(userCode).exec();
        if (!existingUser) {
            throw new NotFoundException(`User #${userCode} not found`);
        }
        return existingUser;
    }

    async deleteUser(userCode: string): Promise<IUser> {
        const deletedUser = await this.userModel.findByIdAndDelete(userCode);
        if (!deletedUser) {
            throw new NotFoundException(`User #${userCode} not found`);
        }
        return deletedUser;
    }
}
