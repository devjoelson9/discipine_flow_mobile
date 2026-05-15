import React from "react";
import { Pressable, Text, View } from "react-native";

interface TimerWidgetProps {
  dailyMinutes: number;
  dailyGoal: number;
  dailyProgress: number;
  weeklyMinutes: number;
  weeklyGoal: number;
  weeklyProgress: number;
  onShare?: () => void;
}

export default function TimerWidget({
  dailyMinutes,
  dailyGoal,
  dailyProgress,
  weeklyMinutes,
  weeklyGoal,
  weeklyProgress,
  onShare,
}: TimerWidgetProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return { hours, mins };
  };

  const dailyTime = formatTime(dailyMinutes);
  const weeklyTime = formatTime(weeklyMinutes);
  const dailyGoalTime = formatTime(dailyGoal);
  const weeklyGoalTime = formatTime(weeklyGoal);

  return (
    <View className="mb-6">
      <View className="gap-3">
        {/* Daily Widget */}
        <View className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <Text className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">
                Today's Study Time
              </Text>
              <Text className="text-2xl font-bold text-emerald-800">
                {dailyTime.hours}h{" "}
                <Text className="text-lg font-semibold">
                  {dailyTime.mins}m
                </Text>
              </Text>
            </View>
            <Pressable
              onPress={onShare}
              className="rounded-lg bg-emerald-600 px-3 py-2"
            >
              <Text className="text-xs font-semibold text-white">Share</Text>
            </Pressable>
          </View>

          {dailyGoal > 0 && (
            <>
              <Text className="text-xs text-emerald-700 mb-2">
                {dailyTime.hours}h {dailyTime.mins}m / {dailyGoalTime.hours}h{" "}
                {dailyGoalTime.mins}m
              </Text>
              <View className="h-2 rounded-full bg-emerald-200 overflow-hidden mb-2">
                <View
                  className="h-2 rounded-full bg-emerald-600"
                  style={{ width: `${dailyProgress}%` }}
                />
              </View>
              <Text className="text-xs text-emerald-700">
                Progress: {dailyProgress}%
              </Text>
            </>
          )}
        </View>

        {/* Weekly Widget */}
        <View className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <View className="mb-4">
            <Text className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">
              This Week
            </Text>
            <Text className="text-2xl font-bold text-indigo-800">
              {weeklyTime.hours}h{" "}
              <Text className="text-lg font-semibold">
                {weeklyTime.mins}m
              </Text>
            </Text>
          </View>

          {weeklyGoal > 0 && (
            <>
              <Text className="text-xs text-indigo-700 mb-2">
                {weeklyTime.hours}h {weeklyTime.mins}m / {weeklyGoalTime.hours}h{" "}
                {weeklyGoalTime.mins}m
              </Text>
              <View className="h-2 rounded-full bg-indigo-200 overflow-hidden mb-2">
                <View
                  className="h-2 rounded-full bg-indigo-600"
                  style={{ width: `${weeklyProgress}%` }}
                />
              </View>
              <Text className="text-xs text-indigo-700">
                Progress: {weeklyProgress}%
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
