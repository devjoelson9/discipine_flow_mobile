import { AlertCircle } from "lucide-react-native";
import React from "react";
import { FlatList, Text, View } from "react-native";

interface ErrorAlertProps {
  title: string;
  errors: string[];
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, errors }) => {
  return (
    <View className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
      <View className="flex-row items-center gap-2">
        <AlertCircle size={16} color="#e11d48" />
        <Text className="font-semibold text-rose-700">{title}</Text>
      </View>

      <FlatList
        data={errors}
        keyExtractor={(_, index) => `error-${index}`}
        scrollEnabled={false}
        contentContainerStyle={{ marginTop: 8 }}
        renderItem={({ item }) => (
          <Text className="text-sm text-rose-700 ml-6">• {item}</Text>
        )}
      />
    </View>
  );
};
