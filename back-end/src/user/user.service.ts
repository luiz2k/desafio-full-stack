import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create(createUserDto) {
    return 'This action adds a new user';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
