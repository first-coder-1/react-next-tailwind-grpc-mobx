import Cookies from "js-cookie";
import { Auth } from "services/auth";

const userPoolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT!,
};

const authService = new Auth(userPoolData);

export async function verifyToken() {
  const storedUsername = Cookies.get("username");
  const storedRefreshToken = Cookies.get("refreshToken");

  if (storedUsername && storedRefreshToken) {
    const response = await authService.refreshSession(
      storedUsername,
      storedRefreshToken
    );
    const { sessionValid, idToken, refreshToken } = response;
    return {
      sessionValid,
      idToken,
      refreshToken,
      storedUsername,
    };
  }
  return {
    sessionValid: null,
    idToken: null,
    refreshToken: null,
    storedUsername: null,
  };
}
