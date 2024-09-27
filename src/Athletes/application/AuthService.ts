import { Athlete } from "../../Athletes/domain/Athlete";
import { Bcrypt } from "../../shared/domain/value-objects/Bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private readonly jwtSecret: string) {}

  async login(athlete: Athlete, password: string): Promise<string> {
    
    const bcrypt = new Bcrypt(athlete.password?.value!);
    const isPasswordValid = await bcrypt.compare(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = this.generateToken(athlete);
    return token;
  }

  private generateToken(athlete: Athlete): string {
    const payload = { id: athlete.uid.value };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: "1h" });
  }
}
