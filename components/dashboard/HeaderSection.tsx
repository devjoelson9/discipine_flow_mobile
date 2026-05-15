import React from "react";
import { Text, View } from "react-native";

export default function HeaderSection() {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <View className="mb-8 overflow-hidden rounded-[32px] bg-indigo-600">
      {/* Glow effects */}
      <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-400/30" />
      <View className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-indigo-400/20" />

      {/* Conteúdo */}
      <View className="p-7">
        {/* Badge */}
        <View className="mb-5 self-start rounded-full border border-white/10 bg-white/10 px-4 py-2">
          <Text className="text-[11px] font-semibold uppercase tracking-[2px] text-indigo-100">
            Painel de Estudos
          </Text>
        </View>

        {/* Título */}
        <Text className="text-4xl font-black leading-tight text-white">
          Sua semana {"\n"}
          organizada 
        </Text>

        {/* Subtexto */}
        <Text className="mt-4 text-sm leading-6 text-indigo-100/90">
          Período atual: {formatDate(weekStart)} até{" "}
          {formatDate(weekEnd)}
        </Text>

        {/* Card interno */}
        <View className="mt-7 rounded-3xl border border-white/15 bg-white/10 px-6 py-5">
          <Text className="text-[11px] font-semibold uppercase tracking-[2px] text-indigo-100">
            Estudos hoje
          </Text>

          <Text className="mt-2 text-5xl font-black text-white">
            2
          </Text>
        </View>
      </View>
    </View>
  );
}