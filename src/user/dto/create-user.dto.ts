import { MinLength } from 'class-validator';
import { MaxLength } from 'class-validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  classes: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(9)
  @IsNumber()
  phone: number;
}
