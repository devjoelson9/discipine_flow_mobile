import React from "react";
import { Text, View } from "react-native";

interface StatsCardsProps {
  stats: {
    estudos_hoje: number;
    tarefas_pendentes: number;
    tarefas_total: number;
    cronograma_semana: number;
    disciplinas: number;
    assuntos: number;
    cadernos: number;
    tarefas_concluidas: number;
  };
}

const StatCard = ({
  label,
  value,
  sublabel,
  color,
}: any) => (
  <View className="h-24 flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2">
    <Text
      numberOfLines={1}
      className="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
    >
      {label}
    </Text>

    <Text className={`mt-1 text-xl font-bold ${color}`}>
      {value}
    </Text>

    <Text
      numberOfLines={1}
      className="mt-0.5 text-[10px] text-slate-500"
    >
      {sublabel}
    </Text>
  </View>
);

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <View className="mb-6">
      {/* Primeira linha */}
      <View className="mb-3 flex-row gap-3">
        <StatCard
          label="Tarefas pendentes"
          value={stats.tarefas_pendentes}
          sublabel={`de ${stats.tarefas_total} tarefas`}
          color="text-amber-600"
        />

        <StatCard
          label="Cronograma"
          value={stats.cronograma_semana}
          sublabel="itens planejados"
          color="text-indigo-600"
        />
      </View>

      {/* Segunda linha */}
      <View className="flex-row gap-3">
        <StatCard
          label="Disciplinas"
          value={stats.disciplinas}
          sublabel={`${stats.assuntos} assuntos`}
          color="text-emerald-600"
        />

        <StatCard
          label="Cadernos"
          value={stats.cadernos}
          sublabel={`${stats.tarefas_concluidas} concluídas`}
          color="text-violet-600"
        />
      </View>
    </View>
  );
}