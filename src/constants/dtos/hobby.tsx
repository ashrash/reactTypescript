import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { isDeepStrictEqual } from 'util';

export class hobby {
  @IsString()
  @IsNotEmpty()
  public year: string;

  @IsString()
  @IsNotEmpty()
  public passionLevel: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}