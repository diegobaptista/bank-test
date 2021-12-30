import * as Jwt from "jsonwebtoken";
import { LoginDto } from "../../presentation/auth/login.dto";
import { isEqual } from "lodash";

export const authService = () => {
  const getConfigUser = () => {
    return {
      username: process.env.USER_MOCK_USERNAME,
      password: process.env.USER_MOCK_PASSWORD,
    };
  };

  return {
    validateUser(login: LoginDto) {
      const configUser = getConfigUser();
      return isEqual(login, configUser);
    },
    generateJwtToken() {
      const secret = process.env.JWT_SECRET;
      const token = Jwt.sign(
        {
          sub: process.env.USER_MOCK_EMAIL,
          aud: process.env.JWT_AUDIT,
          iss: process.env.JWT_ISSUER,
        },
        secret
      );
      return token;
    },
  };
};
