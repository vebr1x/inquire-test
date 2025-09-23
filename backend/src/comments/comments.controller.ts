import { Controller, Get, Post as PostDecorator, Patch, Delete, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @PostDecorator()
  @ApiOperation({ summary: 'Add a comment to a blog post' })
  @ApiParam({ name: 'postId', description: 'Post UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'Comment created successfully', type: Comment })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  create(@Param('postId') postId: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(postId, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for a blog post' })
  @ApiParam({ name: 'postId', description: 'Post UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'List of comments for the post', type: [Comment] })
  @ApiResponse({ status: 404, description: 'Post not found' })
  findByPostId(@Param('postId') postId: string) {
    return this.commentsService.findByPostId(postId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiParam({ name: 'id', description: 'Comment UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ status: 200, description: 'Comment updated successfully', type: Comment })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiParam({ name: 'id', description: 'Comment UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
