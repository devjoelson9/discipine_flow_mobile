/**
 * Contexto de Autenticação Global
 *
 * Fornece user, token e funções de auth em toda a aplicação
 * Use com: const { user, token } = useAuth();
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { loginUser, logoutUser, registerUser } from "~/services/auth";

// ============================================
// TIPOS
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  // Estado
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Ações
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<{ success: boolean; error?: string }>;

  // Utilitários
  clearErrors: () => void;
}

// ============================================
// CONTEXTO
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recuperar token ao iniciar
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem("authToken"),
        AsyncStorage.getItem("user"),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao restaurar autenticação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });

      if (response.success && response.token) {
        const userData = response.user || { id: "", email, name: "" };

        await Promise.all([
          AsyncStorage.setItem("authToken", response.token),
          AsyncStorage.setItem("user", JSON.stringify(userData)),
        ]);

        setToken(response.token);
        setUser(userData);

        return { success: true };
      } else {
        return {
          success: false,
          error: response.message || "Falha ao fazer login",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Erro de conexão ao fazer login",
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      await AsyncStorage.multiRemove(["authToken", "user"]);
      setToken(null);
      setUser(null);
    }
  }, []);

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => {
      try {
        const response = await registerUser(data);

        if (response.success && response.token) {
          const userData = response.user || {
            id: "",
            email: data.email,
            name: data.name,
          };

          await Promise.all([
            AsyncStorage.setItem("authToken", response.token),
            AsyncStorage.setItem("user", JSON.stringify(userData)),
          ]);

          setToken(response.token);
          setUser(userData);

          return { success: true };
        } else {
          return {
            success: false,
            error: response.message || "Falha ao registrar",
          };
        }
      } catch (error) {
        return {
          success: false,
          error: "Erro de conexão ao registrar",
        };
      }
    },
    [],
  );

  const clearErrors = useCallback(() => {
    // Implementar se necessário
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    register,
    clearErrors,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// HOOK
// ============================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}

// ============================================
// HOOK HELPERS
// ============================================

/**
 * Hook para verificar se está autenticado
 */
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

/**
 * Hook para obter o usuário atual
 */
export function useCurrentUser(): User | null {
  const { user } = useAuth();
  return user;
}

/**
 * Hook para obter o token
 */
export function useAuthToken(): string | null {
  const { token } = useAuth();
  return token;
}
