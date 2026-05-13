import React from "react";
import { ScrollView, Image, Text, View } from "react-native";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="w-full max-w-md rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-2xl">
        {/* Header */}
        <View className="mb-8 items-center">
          <View className="mb-4 items-center justify-center h-14 w-14 rounded-2xl bg-indigo-600/10 border border-indigo-200">
            <Image
              source={require("~/assets/images/icon.png")}
              className="h-14 w-14"
              resizeMode="contain"
            />
          </View>

          <Text className="text-[11px] uppercase tracking-[0.35em] text-indigo-500 font-semibold">
            Discipline Flow
          </Text>

          <Text className="text-3xl font-extrabold text-slate-900">
            {title}
          </Text>

          <Text className="text-slate-500 mt-2">
            {subtitle}
          </Text>

          <View className="mt-4 h-1 w-12 rounded-full bg-indigo-200" />
        </View>

        <View className="w-full">
          {children}
        </View>
      </View>
    </ScrollView>
  );
};