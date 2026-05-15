import { Streaks } from "@/types/dashboard";
import React from "react";
import { ScrollView, Text, View } from "react-native";

interface HeatmapSectionProps {
  heatmap: Record<string, number>;
  streaks: Streaks;
}

const getHeatmapColor = (minutes: number, maxMinutes: number): string => {
  if (minutes === 0) return "bg-slate-100";
  const ratio = minutes / maxMinutes;

  if (ratio >= 0.75) return "bg-emerald-600";
  if (ratio >= 0.5) return "bg-emerald-500";
  if (ratio >= 0.25) return "bg-emerald-300";
  return "bg-emerald-200";
};

export const HeatmapSection: React.FC<HeatmapSectionProps> = ({
  heatmap,
  streaks,
}) => {
  const heatmapEntries = Object.entries(heatmap);
  const maxMinutes = Math.max(...Object.values(heatmap), 1);

  // Split heatmap into weeks (7 days)
  const weeks: Array<Array<[string, number]>> = [];
  for (let i = 0; i < heatmapEntries.length; i += 7) {
    weeks.push(heatmapEntries.slice(i, i + 7));
  }

  return (
    <View className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
      <View className="flex-row items-start justify-between gap-4 mb-6">
        <View className="flex-1">
          <Text className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Study Heatmap
          </Text>
          <Text className="text-lg font-bold text-slate-800 mt-2">
            Daily Consistency
          </Text>
          <Text className="text-sm text-slate-500 mt-1">
            Last 90 days of study.
          </Text>
        </View>

        <View className="bg-slate-50 rounded-xl p-3">
          <Text className="text-xs text-slate-500">Current Streak</Text>
          <Text className="text-2xl font-bold text-rose-600 mt-1">
            {streaks.current}
          </Text>
          <Text className="text-xs text-slate-500 mt-1">
            Best: {streaks.longest} days
          </Text>
        </View>
      </View>

      {/* Heatmap grid */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="gap-1">
          {weeks.map((week, weekIdx) => (
            <View key={weekIdx} className="flex-row gap-1">
              {week.map(([date, minutes], dayIdx) => {
                const bgColor = getHeatmapColor(minutes, maxMinutes);
                return (
                  <View
                    key={`${weekIdx}-${dayIdx}`}
                    className={`w-4 h-4 rounded-sm ${bgColor} border border-slate-200`}
                    title={`${date}: ${minutes} min`}
                  />
                );
              })}

              {/* Fill remaining cells in last week */}
              {weekIdx === weeks.length - 1 &&
                week.length < 7 &&
                Array.from({ length: 7 - week.length }).map((_, idx) => (
                  <View
                    key={`empty-${idx}`}
                    className="w-4 h-4 rounded-sm bg-slate-50 border border-dashed border-slate-200"
                  />
                ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Legend */}
      <View className="mt-4 flex-row items-center justify-center gap-2">
        <Text className="text-xs text-slate-500">Less</Text>
        <View className="w-3 h-3 rounded-sm bg-slate-100" />
        <View className="w-3 h-3 rounded-sm bg-emerald-200" />
        <View className="w-3 h-3 rounded-sm bg-emerald-300" />
        <View className="w-3 h-3 rounded-sm bg-emerald-500" />
        <View className="w-3 h-3 rounded-sm bg-emerald-600" />
        <Text className="text-xs text-slate-500">More</Text>
      </View>
    </View>
  );
};
