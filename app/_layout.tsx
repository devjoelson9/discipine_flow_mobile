import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "~/context/auth";

import "../global.css";

function RootLayoutNav() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Redireciona para o dashboard se autenticado
        router.replace("/(app)/dashboard");
      } else {
        // Redireciona para login se não autenticado
        router.replace("/(auth)/login");
      }
    }
  }, [isAuthenticated, isLoading]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}
