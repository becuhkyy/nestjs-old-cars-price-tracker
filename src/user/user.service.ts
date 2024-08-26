import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const user = this.userRepository.create({
      username,
      password,
    });

    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    await this.userRepository.remove(user);
  }
}
