import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(8)
  @IsNotEmpty({ message: '닉네임을 입력해주세요. (3자 이상, 8자 이하)' })
  nickName: string;

  @IsStrongPassword()
  @MinLength(8)
  @IsNotEmpty({ message: '비밀번호를 입력해주세요. (대소문자 포함, 8자 이상)' })
  password: string;

  @IsStrongPassword()
  @IsNotEmpty({ message: '확인을 위해 비밀번호를 다시 한 번 입력해주세요.' })
  confirmPassword: string;
}
