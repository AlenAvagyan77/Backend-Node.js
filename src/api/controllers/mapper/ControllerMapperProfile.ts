import { AutoMapper, ProfileBase, mapWith } from '@nartc/automapper';
import { Auth } from '../../services/models/Auth';
import { User } from '../../services/models/User';
import { AuthResponse } from '../responses/auth/AuthResponse';
import { UserResponse } from '../responses/user/UserResponse';
import { PhotoResponse } from '../responses/user/PhotoResponse';
import { Photo } from '@/api/services/models/Photo';

export class ControllerMapperProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, UserResponse).reverseMap();
    mapper.createMap(Auth, AuthResponse).reverseMap();
    mapper.createMap(Photo, PhotoResponse);
  }
}
