import React from "react";
import { Dimensions, Text, View } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";

interface StudyChartProps {
  labels: string[];
  values: number[];
  maxValue?: number;
}

const { width } = Dimensions.get("window");

export const StudyChart: React.FC<StudyChartProps> = ({
  labels,
  values,
  maxValue,
}) => {
  const chartWidth = width - 32;
  const chartHeight = 280;
  const maxVal = maxValue || Math.max(...values, 1);
  const barWidth = (chartWidth - 60) / (values.length || 1);
  const barSpacing = 10;

  return (
    <View className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
      <Text className="text-lg font-bold text-slate-800">Studies per day</Text>
      <Text className="text-sm text-slate-500 mt-1">
        Visualize your study load throughout the week.
      </Text>

      <View className="mt-5">
        <Svg height={chartHeight} width={chartWidth}>
          {/* Y-axis labels */}
          {[0, maxVal / 2, maxVal].map((val, idx) => (
            <SvgText
              key={`y-${idx}`}
              x="30"
              y={chartHeight - (val / maxVal) * (chartHeight - 60) - 5}
              fontSize="12"
              fill="#94a3b8"
              textAnchor="end"
            >
              {Math.round(val)}
            </SvgText>
          ))}

          {/* Bars */}
          {values.map((value, idx) => {
            const barHeight = (value / maxVal) * (chartHeight - 80);
            const x = 50 + idx * (barWidth + barSpacing);
            const y = chartHeight - barHeight - 40;

            return (
              <Rect
                key={`bar-${idx}`}
                x={x}
                y={y}
                width={barWidth - barSpacing}
                height={barHeight}
                fill="#4f46e5"
                rx="8"
              />
            );
          })}

          {/* X-axis labels */}
          {labels.map((label, idx) => {
            const x =
              50 + idx * (barWidth + barSpacing) + (barWidth - barSpacing) / 2;
            return (
              <SvgText
                key={`x-${idx}`}
                x={x}
                y={chartHeight - 10}
                fontSize="12"
                fill="#64748b"
                textAnchor="middle"
              >
                {label}
              </SvgText>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};
