import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface TaskChartProps {
  labels: string[];
  values: number[];
}

export const TaskChart: React.FC<TaskChartProps> = ({ labels, values }) => {
  const completed = values[0] || 0;
  const pending = values[1] || 0;
  const total = completed + pending;

  const completedPercent = total > 0 ? (completed / total) * 100 : 0;
  const circumference = 2 * Math.PI * 50;
  const completedOffset =
    circumference - (completedPercent / 100) * circumference;

  const size = 200;
  const radius = 50;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <View className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
      <Text className="text-lg font-bold text-slate-800">Task Status</Text>
      <Text className="text-sm text-slate-500 mt-1">
        Track your overall task progress.
      </Text>

      <View className="mt-6 items-center">
        <Svg height={size} width={size}>
          {/* Background circle */}
          <Circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />

          {/* Progress circle */}
          <Circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={completedOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </Svg>

        {/* Center text */}
        <View className="absolute items-center">
          <Text className="text-3xl font-bold text-slate-800">
            {Math.round(completedPercent)}%
          </Text>
          <Text className="text-xs text-slate-500 mt-1">Complete</Text>
        </View>
      </View>

      {/* Legend */}
      <View className="mt-6 gap-3">
        <View className="flex-row items-center gap-3">
          <View className="w-3 h-3 rounded-full bg-emerald-500" />
          <Text className="text-sm text-slate-700 flex-1">Completed</Text>
          <Text className="text-sm font-semibold text-slate-900">
            {completed}
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="w-3 h-3 rounded-full bg-amber-500" />
          <Text className="text-sm text-slate-700 flex-1">Pending</Text>
          <Text className="text-sm font-semibold text-slate-900">
            {pending}
          </Text>
        </View>
      </View>
    </View>
  );
};
