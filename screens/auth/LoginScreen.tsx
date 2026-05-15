import { useRouter } from "expo-router";
import { LogIn } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthCard } from "~/components/auth/AuthCard";
import { ErrorAlert } from "~/components/auth/ErrorAlert";
import { FormInput } from "~/components/auth/FormInput";
import { useAuth } from "~/context/auth";

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string[];
}

export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // Estado do formulário
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Valida o formulário
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Password
    if (!formData.password.trim()) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Realiza o login
   */
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await login(
        formData.email.trim().toLowerCase(),
        formData.password,
      );

      console.log("RESULT LOGIN:", result);

      if (result.success) {
        router.replace("/(app)/dashboard");
      } else {
        setErrors({
          general: [result.error || "Erro ao fazer login"],
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Navega para a tela de recuperação de senha
   */
  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  /**
   * Navega para a tela de registro
   */
  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Background Blobs */}

      {/* Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="relative z-10 px-4"
        >
          <View className="flex-1 justify-center py-8">
            <AuthCard
              title="Acesse sua conta"
              subtitle="Entre para continuar seus estudos."
            >
              {/* Erros Gerais */}
              {errors.general && (
                <ErrorAlert
                  title="Não foi possível entrar:"
                  errors={errors.general}
                />
              )}

              {/* Formulário */}
              <View>
                {/* Email Input */}
                <FormInput
                  ref={emailRef}
                  label="E-mail"
                  placeholder=""
                  value={formData.email}
                  onChangeText={(email) => {
                    setFormData({ ...formData, email });
                    if (errors.email) {
                      setErrors({ ...errors, email: undefined });
                    }
                  }}
                  keyboardType="email-address"
                  error={errors.email}
                  testID="login-email-input"
                />

                {/* Password Input */}
                <View className="mt-4">
                  <FormInput
                    ref={passwordRef}
                    label="Senha"
                    placeholder=""
                    value={formData.password}
                    onChangeText={(password) => {
                      setFormData({ ...formData, password });
                      if (errors.password) {
                        setErrors({ ...errors, password: undefined });
                      }
                    }}
                    secureTextEntry
                    error={errors.password}
                    testID="login-password-input"
                  />

                  <View className="mt-2 w-full">
                    <TouchableOpacity
                      onPress={handleForgotPassword}
                      style={{ alignSelf: "flex-end" }}
                    >
                      <Text className="text-sm text-slate-600">
                        Esqueceu a senha?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={isLoading}
                  activeOpacity={0.85}
                  className="mt-2 flex-row items-center justify-center rounded-lg bg-indigo-600 py-3 shadow-lg active:scale-95 disabled:opacity-70"
                  style={isLoading ? { opacity: 0.7 } : {}}
                >
                  {isLoading ? (
                    <>
                      <ActivityIndicator
                        color="white"
                        size="small"
                        style={{ marginRight: 8 }}
                      />
                      <Text className="font-bold text-white">Entrando...</Text>
                    </>
                  ) : (
                    <>
                      <LogIn
                        size={20}
                        color="white"
                        style={{ marginRight: 8 }}
                      />
                      <Text className="font-bold text-white">
                        Entrar na conta
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {/* Register Link */}
              <View className="mt-8 flex-row items-center justify-center">
                <Text className="text-sm text-slate-600">
                  Não tem uma conta?{" "}
                </Text>
                <TouchableOpacity onPress={handleRegister}>
                  <Text className="font-bold text-indigo-600 underline">
                    Cadastre-se
                  </Text>
                </TouchableOpacity>
              </View>
            </AuthCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
