import { compare, hash } from 'bcrypt';
import _ from 'lodash';

import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const nick_name = createUserDto.nickName;
    const role = createUserDto.role;
    console.log(createUserDto);
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 해당 이메일로 가입된 사용자가 있습니다!');
    }

    const isEqualPasswords = this.comparePasswords(createUserDto.password, createUserDto.confirmPassword);

    if (!isEqualPasswords) {
      throw new BadRequestException('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    }

    const hashedPassword = await hash(createUserDto.password, 10);
    await this.userRepository.save({
      email: email,
      nick_name: nick_name,
      password: hashedPassword,
      role: role
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const email = loginUserDto.email;
    const password = loginUserDto.password;

    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email }
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  // async logout() {}

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  comparePasswords(password, confirmPassword) {
    return password === confirmPassword;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
