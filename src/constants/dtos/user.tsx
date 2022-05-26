import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class user {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
