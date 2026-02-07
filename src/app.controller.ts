import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,

    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,

    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
  ) {}

  @Post('users')
  createUser() {
    return this.userRepository.save({
      // title: 'test title',
    });
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
        posts: true,
      },
    });
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.userRepository.save({
      ...user,
    });
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'example@ex.com',
    });

    await this.profileRepository.save({
      profileImg: 'asdf.jpg',
      user,
    });

    return user;
  }

  @Post('users/posts')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'saogig0503@naver.com',
    });

    await this.postRepository.save({
      title: 'hello world',
      author: user,
    });

    await this.postRepository.save({
      title: 'hello world 22',
      author: user,
    });

    return user;
  }
}
