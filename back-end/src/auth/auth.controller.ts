import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/validation/zod-validation-pipe';
import { AuthService } from './auth.service';
import { SignInDto, signInSchema } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @UsePipes(new ZodValidationPipe(signInSchema))
  // Responsável pela autenticação do usuário
  signIn(@Body() signInDto: SignInDto) {
    const token = this.authService.signIn(signInDto);

    return {
      message: 'Usuário autenticado com sucesso',
      data: {
        accessToken: token,
      },
    };
  }
}
