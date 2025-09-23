import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the blog post',
    example: 'My First Blog Post',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'The content/body of the blog post',
    example: 'This is the content of my first blog post. It contains all the details about the topic I want to discuss.',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;
}
