import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(createUserDto: CreateUserDto) {
    const { username, password: plainPassword } = createUserDto;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainPassword, salt);

    const user = await this.userService.create({
      username,
      password,
    });

    return user;
  }

  login() {}
}
