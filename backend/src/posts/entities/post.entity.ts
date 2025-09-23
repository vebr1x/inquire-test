import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// Forward reference to avoid circular dependency
export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  postId: string;
}

@Entity('posts')
export class Post {
  @ApiProperty({
    description: 'Unique identifier for the post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Title of the blog post',
    example: 'My First Blog Post',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    description: 'Content/body of the blog post',
    example: 'This is the content of my first blog post...',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'Date and time when the post was created',
    example: '2023-12-01T10:30:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the post was last updated',
    example: '2023-12-01T15:45:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Comments associated with this post',
    required: false,
  })
  @OneToMany('Comment', 'post')
  comments: Comment[];
}
