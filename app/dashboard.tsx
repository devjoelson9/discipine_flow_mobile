import DashboardScreen from "@/screens/dashboard/DashboardScreen";
import { Stack } from "expo-router";

export default function DashboardRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: "Dashboard",
        }}
      />
      <DashboardScreen />
    </>
  );
}
