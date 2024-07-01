import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

import { Auth } from "../services/auth";
import Cookies from "js-cookie";

import { verifyToken } from "utils/verifyToken";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  setDefinitivePassword: (
    username: string,
    password: string
  ) => Promise<{ idToken: string; refreshToken: string }>;
  confirmPassword: (
    username: string,
    code: string,
    newPassword: string
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const userPoolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT!,
};

const authService = new Auth(userPoolData);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function refreshSessionOnLoad() {
      const { sessionValid, idToken, refreshToken, storedUsername } =
        await verifyToken();

      if (sessionValid && idToken && refreshToken) {
        // Re-Save cookies tokens
        Cookies.set("username", storedUsername);
        Cookies.set("idToken", idToken);
        Cookies.set("refreshToken", refreshToken);
        setIsAuthenticated(true);
      } else {
        console.error("Session is not valid or has expired");
        setIsAuthenticated(false);
      }
    }

    refreshSessionOnLoad();
  }, []);

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const { idToken, refreshToken } = await authService.signin(
        email,
        password
      );

      Cookies.set("username", email);
      Cookies.set("idToken", idToken);
      Cookies.set("refreshToken", refreshToken);

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Erro no login" + error);
      throw error;
    }
  }

  async function logout() {
    try {
      await authService.signout();
      Cookies.remove("username");
      Cookies.remove("idToken");
      Cookies.remove("refreshToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function forgotPassword(email: string): Promise<void> {
    try {
      await authService.forgotPassword(email);
    } catch (error) {
      console.error("Erro ao processar o esquecimento de senha:", error);
      throw error;
    }
  }

  async function setDefinitivePassword(
    username: string,
    password: string
  ): Promise<{ idToken: string; refreshToken: string }> {
    try {
      const { idToken, refreshToken } = await authService.setNewPassword(
        username,
        password
      );

      // If necessasry, save updated tokens
      Cookies.set("idToken", idToken);
      Cookies.set("refreshToken", refreshToken);
      Cookies.set("username", username);

      return { idToken, refreshToken };
    } catch (error) {
      console.error("Erro ao definir a senha:", error);
      throw error;
    }
  }

  async function confirmPassword(
    username: string,
    code: string,
    newPassword: string
  ): Promise<void> {
    try {
      await authService.confirmPassword(username, code, newPassword);
      // A senha foi confirmada com sucesso
    } catch (error) {
      console.error("Erro ao confirmar senha", error);
      throw error;
    }
  }

  // Rendering area
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        forgotPassword,
        setDefinitivePassword,
        confirmPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
