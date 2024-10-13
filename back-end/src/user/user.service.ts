import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria um usuário
  async create(createUserDto: CreateUserDto) {
    // Verifica se o usuário existe no banco de dados
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    // Se o usuário existir, lança um erro
    if (userExists) {
      throw new ConflictException({
        message: 'Usuário já cadastrado',
      });
    }

    // Quantidade de SALTs para criptografar a senha
    const SALT = 10;
    // Faz a criptografia da senha
    const hashPassword = await bcrypt.hash(createUserDto.password, SALT);

    // Cria um novo usuário com o e-mail e a senha criptografada
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashPassword,
      },
    });

    return {
      message: 'Usuário criado com sucesso',
      data: user,
    };
  }
}
