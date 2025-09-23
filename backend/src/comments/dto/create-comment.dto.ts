import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The text content of the comment',
    example: 'Great post! Thanks for sharing this valuable information.',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  text: string;
}
