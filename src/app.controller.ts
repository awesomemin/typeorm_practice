import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,

    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,

    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,

    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  createUser() {
    return this.userRepository.save({
      email: 'test title',
    });
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      where: {
        // id: Not(1),
        // id: LessThan(30),
        // id: LessThanOrEqual(30),
        // id: MoreThan(30),
        // id: MoreThanOrEqual(30),
        // id: Equal(30),
        // email: Like('%google%'),
        // email: ILike('GOOGLE'),
        // id: Between(10, 15),
        // id: In([1, 3, 5, 7, 99]),
        // id: IsNull(),
      },
      // select: {
      //   id: true,
      //   email: true,
      //   profile: {
      //     id: true,
      //   },
      // },
      // relations: {
      //   profile: true,
      // },
      // order: {
      //   id: 'ASC',
      // },
      // skip: 0,
      // take: 1,
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

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'Post 111!',
    });

    const post2 = await this.postRepository.save({
      title: 'Post 222',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    await this.postRepository.save({
      title: 'Post 333',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
