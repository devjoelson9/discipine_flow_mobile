import React from "react";
import { Text, View } from "react-native";

interface WeeklySummaryProps {
  totalMinutes: number;
  topDisciplineName?: string;
  topDisciplineMinutes?: number;
}

export default function WeeklySummary({
  totalMinutes,
  topDisciplineName,
  topDisciplineMinutes = 0,
}: WeeklySummaryProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return { hours, mins };
  };

  const totalTime = formatTime(totalMinutes);
  const topTime = formatTime(topDisciplineMinutes);

  return (
    <View className="mb-6">
      <View className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
        <Text className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">
          Weekly Summary
        </Text>

        {/* Total Studied */}
        <View className="mb-5 pb-5 border-b border-slate-100">
          <Text className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
            Total Studied
          </Text>
          <Text className="text-3xl font-bold text-indigo-700">
            {totalTime.hours}h{" "}
            <Text className="text-lg font-semibold text-indigo-500">
              {String(totalTime.mins).padStart(2, "0")}m
            </Text>
          </Text>
          <Text className="text-xs text-slate-500 mt-1">
            {totalMinutes} minutes total
          </Text>
        </View>

        {/* Top Discipline */}
        <View>
          <Text className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Top Discipline
          </Text>

          {topDisciplineName ? (
            <>
              <Text className="text-xl font-bold text-slate-900 mb-1">
                {topDisciplineName}
              </Text>
              <Text className="text-sm text-slate-600 mb-3">
                {topTime.hours}h {String(topTime.mins).padStart(2, "0")}m
                studied
              </Text>
              <View className="rounded-lg bg-indigo-100 px-3 py-1.5">
                <Text className="text-xs font-semibold text-indigo-600">
                  Highlight Discipline
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text className="text-base font-semibold text-slate-500">
                No data yet
              </Text>
              <Text className="text-xs text-slate-400 mt-1">
                Start studying to see top discipline
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
