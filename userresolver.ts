// user.resolver.ts

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './user.input';
import { User } from './user.entity';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async registerUser(@Args('input') input: UserInput): Promise<User> {
    // Check if username already exists
    const existingUser = await this.userService.findByUsername(input.username);
    if (existingUser) {
      throw new ConflictException('Username is already taken.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create the user
    return await this.userService.createUser({
      ...input,
      password: hashedPassword,
    });
  }
}
