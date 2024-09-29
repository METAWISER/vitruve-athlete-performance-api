import { Request, Response } from "express";
import { AuthService } from "../../../../Athletes/application/AuthService";
import { AuthDto } from "../../../dtos/AuthDto";
import HttpResponse from "../../../../shared/infrastructure/response/HttpResponse";
import { AthleteGetterByEmail } from "../../../../Athletes/application/AthleteGetterByEmail";

export class AuthController {
  constructor(
    private authService: AuthService,
    private athleteGetterByEmail: AthleteGetterByEmail,
    private httpResponse: HttpResponse
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    const { email, password }: AuthDto = req.body;
    try {
      const athlete = await this.athleteGetterByEmail.run(email);
      if (!athlete) {
        this.httpResponse.Unauthorized(res, { error: "Invalid credentials" });
        return;
      }

      const token = await this.authService.login(athlete, password);
      this.httpResponse.Ok(res, { token });
    } catch (error) {
      this.httpResponse.Unauthorized(res, { error: (error as Error).message });
    }
  }
}
