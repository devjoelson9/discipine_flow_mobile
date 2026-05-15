import React from "react";
import { Text, View } from "react-native";

interface NextExamCardProps {
  examName: string;
  examDate: string;
  daysRemaining: number;
}

export default function NextExamCard({
  examName,
  examDate,
  daysRemaining,
}: NextExamCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getDaysColor = (days: number) => {
    if (days <= 3) return "text-red-600";
    if (days <= 7) return "text-amber-600";
    return "text-emerald-600";
  };

  const getDaysBackgroundColor = (days: number) => {
    if (days <= 3) return "bg-red-50";
    if (days <= 7) return "bg-amber-50";
    return "bg-emerald-50";
  };

  return (
    <View className="mb-6">
      <View
        className={`rounded-2xl border border-slate-200 ${getDaysBackgroundColor(daysRemaining)} p-5 shadow-sm`}
      >
        <Text className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
          Next Exam
        </Text>

        <View className="mb-4">
          <Text className="text-lg font-bold text-slate-900 mb-2">
            {examName}
          </Text>
          <Text className="text-sm text-slate-600 mb-3">
            {formatDate(examDate)}
          </Text>
        </View>

        <View className="rounded-xl border border-slate-200 bg-white p-4 items-center justify-center">
          <Text className={`text-xs font-semibold text-slate-500 mb-1`}>
            Days remaining
          </Text>
          <Text className={`text-3xl font-bold ${getDaysColor(daysRemaining)}`}>
            {daysRemaining}
          </Text>
          <Text className="text-xs text-slate-500 mt-1">
            {daysRemaining === 1 ? "day" : "days"} until exam
          </Text>
        </View>
      </View>
    </View>
  );
}
