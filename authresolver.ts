// auth.resolver.ts

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput): Promise<string> {
    // Validate user credentials and get user ID
    const userId = await this.authService.validateUser(input.username, input.password);
    if (!userId) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = await this.authService.generateToken(userId);

    return token;
  }
}

