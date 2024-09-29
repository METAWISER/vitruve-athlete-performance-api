import { Context } from 'hono';
import { AuthService } from '../../../Athletes/application/AuthService';
import { AuthDto } from '../../dtos/AuthDto';
import HttpResponse from '../../../shared/infrastructure/response/HttpResponse';
import { AthleteGetterByEmail } from '../../../Athletes/application/AthleteGetterByEmail';

export class AuthenticateController {
  constructor(
    private authService: AuthService,
    private athleteGetterByEmail: AthleteGetterByEmail,
    private httpResponse: HttpResponse
  ) {}

  async login(c: Context): Promise<Response> {
    const { email, password }: AuthDto = await c.req.json();

    try {
      const athlete = await this.athleteGetterByEmail.run(email);
      if (!athlete) {
        return this.httpResponse.Unauthorized(c, { error: 'Invalid credentials' });
      }

      const token = await this.authService.login(athlete, password);
      console.log({token});
      return this.httpResponse.Ok(c, { token });
    } catch (error) {
      return this.httpResponse.Unauthorized(c, { error: (error as Error).message });
    }
  }
}
