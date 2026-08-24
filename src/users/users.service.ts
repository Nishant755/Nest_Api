import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create.user.dto';
import { GetUserResponse } from './interface/user.interface';
import { UpdateUserDTO } from './dto/update.user.dto';
import { PrismaService } from 'src/auth/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }


    async findById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }


    async findAll() {
        return this.prisma.user.findMany();
    }

    async create(createUserDTO: CreateUserDTO) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: createUserDTO.email,

            },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);


        return this.prisma.user.create({
            data: { ...createUserDTO, password: hashedPassword },
        });
    }

    async update(id: number, updateUserDTO: UpdateUserDTO) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!existingUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        const data: Omit<UpdateUserDTO, "password"> & { password?: string } = {
            ...updateUserDTO,
        };

        if (updateUserDTO.password) {
            data.password = await bcrypt.hash(updateUserDTO.password, 10);
        }

        return this.prisma.user.update({
            where: {
                id,
            },
            data,
        });
    }


    async delete(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        await this.prisma.user.delete({
            where: {
                id,
            },
        });


        return { "message": `User with ID ${id} deleted successfully` };
    }



}
