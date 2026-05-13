import { useRouter } from "expo-router";
import { ArrowLeft, UserPlus } from "lucide-react-native";
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
import { registerUser } from "~/services/auth";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  general?: string[];
}

export const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nome deve ter no mínimo 3 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter no mínimo 8 caracteres";
    }

    if (!formData.password_confirmation.trim()) {
      newErrors.password_confirmation = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Senhas não conferem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      if (response.success) {
        router.replace("/");
      } else {
        setErrors({
          general: response.errors || [response.message],
        });
      }
    } catch (error) {
      setErrors({
        general: ["Erro desconhecido ao registrar"],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="relative z-10 px-4"
        >
          {/* Back Button */}
          <View className="pt-8">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center gap-2 py-2"
            >
              <ArrowLeft size={20} color="#64748b" />
              <Text className="text-slate-600">Voltar</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-center py-8">
            <AuthCard
              title="Crie sua conta"
              subtitle="Cadastre-se para começar seus estudos"
            >
              {errors.general && (
                <ErrorAlert
                  title="Erro ao registrar:"
                  errors={errors.general}
                />
              )}

              <View>
  <FormInput
        ref={nameRef}
        label="Nome completo"
        placeholder=""
        value={formData.name}
        onChangeText={(name) => {
          setFormData({ ...formData, name });

          if (errors.name) {
            setErrors({ ...errors, name: undefined });
          }
        }}
        error={errors.name}
        testID="register-name-input"
      />

      <View className="mt-4">
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
          testID="register-email-input"
        />
      </View>

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
          testID="register-password-input"
        />
      </View>

      <View className="mt-4">
        <FormInput
          ref={confirmPasswordRef}
          label="Confirmar senha"
          placeholder=""
          value={formData.password_confirmation}
          onChangeText={(password_confirmation) => {
            setFormData({
              ...formData,
              password_confirmation,
            });

            if (errors.password_confirmation) {
              setErrors({
                ...errors,
                password_confirmation: undefined,
              });
            }
          }}
          secureTextEntry
          error={errors.password_confirmation}
          testID="register-confirm-password-input"
        />
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        disabled={isLoading}
        activeOpacity={0.85}
        className="mt-6 flex-row items-center justify-center rounded-lg bg-indigo-600 py-3"
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <>
            <UserPlus
              size={20}
              color="white"
              style={{ marginRight: 8 }}
            />

            <Text className="font-bold text-white">
              Cadastrar
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>

              <View className="mt-6 flex-row items-center justify-center">
                <Text className="text-sm text-slate-600">
                  Já tem uma conta?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                  <Text className="text-sm font-bold text-indigo-600 underline decoration-2 underline-offset-4">
                    Entrar
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

export default RegisterScreen;
