import { IsDate, IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { Category } from '../types/showCategory.type';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  contents: string;

  @IsUrl()
  image: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  // @IsDate()
  @IsNotEmpty()
  date: Date[];

  @IsNotEmpty()
  price: number;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  // seat
}
