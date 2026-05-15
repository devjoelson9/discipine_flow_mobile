import { Revisao } from "@/types/dashboard";
import { CheckCircle2, Circle, Clock } from "lucide-react-native";
import React from "react";
import { FlatList, Text, View } from "react-native";

interface ReviewsTodayProps {
  reviews: Revisao[];
}

const getStatusColor = (
  status: string,
): { bg: string; text: string; border: string; icon: React.ReactNode } => {
  switch (status) {
    case "concluida":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: <CheckCircle2 size={20} color="#10b981" />,
      };
    case "pendente":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: <Circle size={20} color="#f59e0b" />,
      };
    default:
      return {
        bg: "bg-slate-50",
        text: "text-slate-700",
        border: "border-slate-200",
        icon: <Clock size={20} color="#64748b" />,
      };
  }
};

export const ReviewsToday: React.FC<ReviewsTodayProps> = ({ reviews }) => {
  const renderReview = ({ item }: { item: Revisao }) => {
    const status = getStatusColor(item.status);

    return (
      <View
        className={`flex-row items-center gap-3 rounded-2xl border ${status.border} ${status.bg} px-3 py-3 mb-3`}
      >
        <View>{status.icon}</View>

        <View className="flex-1">
          <Text className={`text-sm font-semibold ${status.text}`}>
            {item.titulo}
          </Text>
          <Text className={`text-xs mt-0.5 ${status.text}/70`}>
            {new Date(item.data_revisao).toLocaleDateString("pt-BR")}
          </Text>
        </View>

        <View
          className={`px-2 py-1 rounded-lg ${
            item.status === "concluida"
              ? "bg-emerald-200"
              : item.status === "pendente"
                ? "bg-amber-200"
                : "bg-slate-200"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              item.status === "concluida"
                ? "text-emerald-700"
                : item.status === "pendente"
                  ? "text-amber-700"
                  : "text-slate-700"
            }`}
          >
            {item.status === "concluida"
              ? "Done"
              : item.status === "pendente"
                ? "Pending"
                : "Cancelled"}
          </Text>
        </View>
      </View>
    );
  };

  if (!reviews || reviews.length === 0) {
    return (
      <View className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
        <Text className="text-lg font-bold text-slate-800 mb-4">
          Today's Reviews
        </Text>
        <View className="py-8 items-center">
          <Clock size={32} color="#d1d5db" />
          <Text className="text-sm text-slate-500 mt-3 text-center">
            No reviews scheduled for today.
          </Text>
          <Text className="text-xs text-slate-400 mt-1 text-center">
            Great job staying on top of things!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
      <Text className="text-lg font-bold text-slate-800 mb-4">
        Today's Reviews
      </Text>

      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        nestedScrollEnabled={false}
      />

      {/* Stats */}
      <View className="flex-row gap-4 mt-4 pt-4 border-t border-slate-200">
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-emerald-600">
            {reviews.filter((r) => r.status === "concluida").length}
          </Text>
          <Text className="text-xs text-slate-500 mt-1">Completed</Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-amber-600">
            {reviews.filter((r) => r.status === "pendente").length}
          </Text>
          <Text className="text-xs text-slate-500 mt-1">Pending</Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-slate-600">
            {reviews.length}
          </Text>
          <Text className="text-xs text-slate-500 mt-1">Total</Text>
        </View>
      </View>
    </View>
  );
};
