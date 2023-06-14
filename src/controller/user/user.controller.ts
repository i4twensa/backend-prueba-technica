import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res , Patch} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.userService.createUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                newUser,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    async updateUser(@Res() response,
        @Param('id') userCode: string,
        @Body() updateUserDto: UpdateUserDto) {
        try {
            const existingUser = await this.userService.updateUser(userCode, updateUserDto);
            return response.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                existingUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getUsers(@Res() response) {
        try {
            const UserData = await this.userService.getAllUsers();
            return response.status(HttpStatus.OK).json({
                message: 'All Users data found successfully',
                UserData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getUser(@Res() response, @Param('id') userCode: string) {
        try {
            const existingUser = await this.userService.getUser(userCode);
            return response.status(HttpStatus.OK).json({
                message: 'User found successfully',
                existingUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Patch('/:id')
    async deleteUser(@Res() response, @Param('id') userCode: string) {
        try {
            const deletedUser = await this.userService.deleteUser(userCode);
            return response.status(HttpStatus.OK).json({
                message: 'User archived successfully',
                deletedUser,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
