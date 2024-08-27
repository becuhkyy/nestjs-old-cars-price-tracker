import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  async login(loginCredentials: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginCredentials;

    const user = await this.userService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password!');
    }

    const payload: JwtPayload = { username };

    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
