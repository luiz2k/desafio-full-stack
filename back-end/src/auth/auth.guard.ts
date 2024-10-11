import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
// Responsável por verificar se o token do usuário é valido
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // Se o token não existir, lança um erro
    if (!token) {
      throw new UnauthorizedException({
        message: 'Não autorizado',
      });
    }

    try {
      // Verifica se o token é valido
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Adiciona o usuário na requisição
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException({
        message: 'Não autorizado',
      });
    }

    return true;
  }

  // Verifica se o token está no formato Bearer <token>
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
