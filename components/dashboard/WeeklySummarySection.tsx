import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface WeeklySummaryProps {
  weeklyResume: {
    total_minutes: number;
    top_discipline?: {
      disciplina: string;
      minutos: number;
    };
  };
}

export default function WeeklySummarySection({
  weeklyResume,
}: WeeklySummaryProps) {
  const weekMinutes = weeklyResume.total_minutes;
  const weekHours = Math.floor(weekMinutes / 60);
  const weekRemain = weekMinutes % 60;

  const topDiscipline = weeklyResume.top_discipline;
  const topMinutos = topDiscipline ? Math.floor(topDiscipline.minutos) : 0;
  const topHoras = Math.floor(topMinutos / 60);
  const topRemain = topMinutos % 60;

  return (
    <View className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-6">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-2">
            <View className="w-7 h-7 rounded-lg bg-indigo-100 items-center justify-center">
              <Text className="text-indigo-600 text-lg">📊</Text>
            </View>
            <Text className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Esta semana
            </Text>
          </View>
          <Text className="text-xl font-bold text-slate-900 mb-1">
            Resumo semanal de disciplinas
          </Text>
          <Text className="text-sm text-slate-500">
            Acompanhe seu desempenho por disciplina.
          </Text>
        </View>

        <Link href="/" asChild>
          <Pressable className="rounded-xl bg-indigo-600 px-4 py-2">
            <Text className="text-sm font-semibold text-white">
              Ver análise →
            </Text>
          </Pressable>
        </Link>
      </View>

      {/* Stats Grid */}
      <View className="gap-4">
        {/* Total Estudado */}
        <View className="rounded-2xl border border-indigo-100 bg-white/70 p-5 shadow-sm">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Total estudado
          </Text>

          <Text className="text-4xl font-bold text-indigo-700">
            {weekHours}h
            <Text className="text-xl text-indigo-400 font-semibold">
              {" "}
              {String(weekRemain).padStart(2, "0")}m
            </Text>
          </Text>

          <Text className="text-xs text-slate-500 mt-2">
            {weekMinutes} minutos no total
          </Text>

          {/* Progress Bar */}
          <View className="mt-3 h-2 rounded-full bg-indigo-100 overflow-hidden">
            <View className="h-2 bg-indigo-500 rounded-full w-2/3" />
          </View>
        </View>

        {/* Top Discipline */}
        <View className="rounded-2xl border border-indigo-100 bg-white/70 p-5 shadow-sm">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Foco principal
          </Text>

          {topDiscipline ? (
            <>
              <Text className="text-2xl font-bold text-indigo-800 mb-2">
                {topDiscipline.disciplina}
              </Text>

              <Text className="text-sm text-slate-500 mb-3">
                {topHoras}h {String(topRemain).padStart(2, "0")}m estudados
              </Text>

              <View className="rounded-lg bg-indigo-100 px-2 py-1">
                <Text className="text-xs font-semibold text-indigo-600">
                  Disciplina destaque
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text className="text-lg font-semibold text-slate-400 mb-2">
                Nenhuma disciplina
              </Text>
              <Text className="text-xs text-slate-500">
                Comece a estudar para ver dados
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
