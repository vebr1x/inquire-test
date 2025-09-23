import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// Forward reference to avoid circular dependency
export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('comments')
export class Comment {
  @ApiProperty({
    description: 'Unique identifier for the comment',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Text content of the comment',
    example: 'Great post! Thanks for sharing this valuable information.',
  })
  @Column({ type: 'text' })
  text: string;

  @ApiProperty({
    description: 'Date and time when the comment was created',
    example: '2023-12-01T10:30:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The post this comment belongs to',
    required: false,
  })
  @ManyToOne('Post', 'comments', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ApiProperty({
    description: 'ID of the post this comment belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ type: 'uuid' })
  postId: string;
}
