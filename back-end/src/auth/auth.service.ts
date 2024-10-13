import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // Responsável pela autenticação do usuário
  async signIn(signInDto: SignInDto) {
    // Verifica se o usuário existe no banco de dados
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    // Se o usuário existir, lança um erro
    if (!userExists) {
      throw new NotFoundException({
        message: 'E-mail ou senha inválidos',
      });
    }

    // Verifica se a senha informada bate com a do usuário
    const passwordMatch = await bcrypt.compare(
      signInDto.password,
      userExists.password,
    );

    // Se a senha for incorreta, lança um erro
    if (!passwordMatch) {
      throw new NotFoundException({
        message: 'E-mail ou senha inválidos',
      });
    }

    // Gera um token de acesso para o usuário
    const token = await this.jwtService.signAsync({
      email: userExists.email,
      id: userExists.id,
    });

    return {
      message: 'Usuário autenticado com sucesso',
      data: {
        accessToken: token,
      },
    };
  }
}
