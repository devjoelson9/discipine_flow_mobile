import { useRouter } from "expo-router";
import { ArrowLeft, Mail } from "lucide-react-native";
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
import { requestPasswordReset } from "~/services/auth";

export const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();
  const emailRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (): boolean => {
    setErrors([]);

    if (!email.trim()) {
      setErrors(["Email é obrigatório"]);
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors(["Email inválido"]);
      return false;
    }

    return true;
  };

  const handleSendReset = async () => {
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await requestPasswordReset(email.trim().toLowerCase());

      if (response.success) {
        setSuccess(true);
      } else {
        setErrors(response.errors || [response.message]);
      }
    } catch (error) {
      setErrors(["Erro desconhecido ao solicitar reset"]);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <SafeAreaView className="flex-1 bg-slate-100">
        <View className="absolute inset-0 overflow-hidden">
          <View className="absolute -top-32 -right-16 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
          <View className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="relative z-10 px-4"
        >
          <View className="flex-1 justify-center py-8">
            <AuthCard
              title="Verifique seu email"
              subtitle="Enviamos um link para recuperar sua senha"
            >
              <View className="mb-8 items-center">
                <View className="mb-4 flex-row items-center justify-center h-16 w-16 rounded-full bg-emerald-100">
                  <Mail size={32} color="#059669" />
                </View>
                <Text className="text-center text-slate-600">
                  Clique no link que enviamos para {email} para redefinir sua
                  senha.
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/")}
                className="flex-row items-center justify-center rounded-lg bg-indigo-600 py-3"
              >
                <Text className="font-bold text-white">Voltar ao login</Text>
              </TouchableOpacity>
            </AuthCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
              title="Recuperar senha"
              subtitle="Digite seu email para receber um link de reset"
            >
              {errors.length > 0 && (
                <ErrorAlert title="Erro ao solicitar reset:" errors={errors} />
              )}

              <View className="space-y-6">
                <FormInput
                  ref={emailRef}
                  label="E-mail"
                  placeholder=""
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    if (errors.length > 0) setErrors([]);
                  }}
                  keyboardType="email-address"
                  testID="forgot-password-email-input"
                />

                <TouchableOpacity
                  onPress={handleSendReset}
                  disabled={isLoading}
                  activeOpacity={0.85}
                  className="flex-row items-center justify-center rounded-lg bg-indigo-600 py-3 disabled:opacity-70 mt-4"
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text className="font-bold text-white">Enviar link</Text>
                  )}
                </TouchableOpacity>
              </View>
            </AuthCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
