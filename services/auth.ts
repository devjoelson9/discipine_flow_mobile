// Simulando chamadas à API - Substitua pela sua URL real
const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  errors?: string[];
}

/**
 * Realiza login com email e senha
 */
export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  try {
    console.log("API_URL:", API_URL);
    console.log("ENVIANDO:", credentials);

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });

    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log("DATA:", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Erro ao fazer login",
        errors: data.errors || ["Falha na autenticação"],
      };
    }

    return {
      success: true,
      message: "Login realizado com sucesso",
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    console.log("ERRO FETCH:", error);

    return {
      success: false,
      message: "Erro de conexão",
      errors: ["Não foi possível conectar ao servidor"],
    };
  }
};

/**
 * Realiza logout (limpa token e dados)
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

/**
 * Solicita reset de senha
 */
export const requestPasswordReset = async (
  email: string,
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Erro ao solicitar reset",
        errors: data.errors,
      };
    }

    return {
      success: true,
      message: "Email de reset enviado com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro de conexão",
      errors: ["Não foi possível conectar ao servidor"],
    };
  }
};

/**
 * Registra novo usuário
 */
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || "Erro ao registrar",
        errors: responseData.errors,
      };
    }

    return {
      success: true,
      message: "Registro realizado com sucesso",
      token: responseData.token,
      user: responseData.user,
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro de conexão",
      errors: ["Não foi possível conectar ao servidor"],
    };
  }
};
