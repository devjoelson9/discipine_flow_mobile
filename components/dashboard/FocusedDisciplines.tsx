import React from "react";
import { Text, View } from "react-native";

interface Discipline {
  id: string;
  name: string;
  plannedStudies: number;
}

interface FocusedDisciplinesProps {
  disciplines: Discipline[];
}

export default function FocusedDisciplines({
  disciplines,
}: FocusedDisciplinesProps) {
  if (disciplines.length === 0) {
    return (
      <View className="mb-6">
        <View className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Text className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Focused Disciplines
          </Text>
          <View className="items-center justify-center py-8">
            <Text className="text-base font-semibold text-slate-500 mb-2">
              No disciplines planned
            </Text>
            <Text className="text-xs text-slate-400 text-center">
              Add disciplines to your study plan for this week
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-6">
      <View className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <Text className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
          Focused Disciplines
        </Text>

        <View className="gap-3">
          {disciplines.map((discipline) => (
            <View
              key={discipline.id}
              className="rounded-xl border border-violet-100 bg-violet-50 p-4"
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-sm font-bold text-slate-900">
                    {discipline.name}
                  </Text>
                  <Text className="text-xs text-slate-600 mt-1">
                    {discipline.plannedStudies}{" "}
                    {discipline.plannedStudies === 1
                      ? "planned study"
                      : "planned studies"}
                  </Text>
                </View>

                <View className="rounded-lg bg-violet-200 px-2.5 py-1.5">
                  <Text className="text-xs font-bold text-violet-700">
                    {discipline.plannedStudies}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
