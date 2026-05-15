import { Stack } from "expo-router";
import { View } from "react-native";
import AppNavbar from "~/components/layout/appNavbar";
import AppSidebar from "~/components/layout/appSidebar";
import { SidebarProvider, useSidebar } from "~/context/sidebar";

function AppLayoutContent() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <View className="flex-1 bg-white">
      <AppNavbar />
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="dashboard" />
        </Stack>
      </View>
      <AppSidebar visible={isOpen} onClose={closeSidebar} />
    </View>
  );
}

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppLayoutContent />
    </SidebarProvider>
  );
}
