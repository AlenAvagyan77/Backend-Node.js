import { Mapper } from '@nartc/automapper';
import { Authorized, JsonController, CurrentUser, Get } from 'routing-controllers';
import { Service } from 'typedi';
import { User } from '../services/models/User';
import { UserResponse } from './responses/user/UserResponse';

@JsonController('/users')
@Service()
export class UserController {
  @Get('/me')
  @Authorized(['admin', 'user'])
  public async getMe(@CurrentUser() user: User): Promise<UserResponse> {
    return Mapper.map(user, UserResponse);
  }
}
