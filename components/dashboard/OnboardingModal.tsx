import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface OnboardingModalProps {
  onComplete: () => void;
}

const OnboardingStep = ({ title, subtitle, step, link, onPress }: any) => (
  <View className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex-1">
    <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
      {step}. {title}
    </Text>
    <Text className="text-sm font-semibold text-slate-800 mb-1">
      {subtitle}
    </Text>
    <Text className="text-xs text-slate-500 mb-3">
      {step === "1" && "Estruture seu concurso e os assuntos principais."}
      {step === "2" && "Distribua estudos para manter consistência."}
      {step === "3" && "Controle horas e siga revisões de hoje."}
    </Text>
    {link ? (
      <Link href={link} asChild>
        <Pressable>
          <Text className="text-xs font-semibold text-indigo-600">
            {step === "1" && "Ir para cadernos →"}
            {step === "2" && "Abrir cronograma →"}
            {step === "3" && "Abrir timer →"}
          </Text>
        </Pressable>
      </Link>
    ) : (
      <Pressable onPress={onPress}>
        <Text className="text-xs font-semibold text-indigo-600">
          Abrir timer →
        </Text>
      </Pressable>
    )}
  </View>
);

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  return (
    <View className="mb-8 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-lg">
      <View className="p-6">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-2">
            Bem-vindo
          </Text>
          <Text className="text-2xl font-bold text-slate-800 mb-2">
            Seu fluxo de estudo em 3 passos
          </Text>
          <Text className="text-sm text-slate-500">
            Um guia rápido para começar com clareza.
          </Text>
        </View>

        {/* Steps Grid */}
        <View className="gap-4 mb-6">
          <OnboardingStep
            step="1"
            title="Organize"
            subtitle="Crie cadernos e disciplinas"
            link="/cadernos"
          />
          <OnboardingStep
            step="2"
            title="Planeje"
            subtitle="Monte seu cronograma"
            link="/cronograma"
          />
          <OnboardingStep
            step="3"
            title="Registre"
            subtitle="Inicie o timer e revise"
            onPress={() => {}}
          />
        </View>

        {/* Footer Buttons */}
        <View className="gap-3">
          <Text className="text-xs text-slate-500 text-center mb-2">
            Você pode rever este guia depois pelo menu Ajuda.
          </Text>

          <View className="flex-row gap-3">
            <Link href="/" asChild>
              <Pressable className="flex-1 rounded-xl border border-indigo-200 bg-white py-3 px-4">
                <Text className="text-sm font-semibold text-indigo-700 text-center">
                  Abrir ajuda
                </Text>
              </Pressable>
            </Link>

            <Pressable
              onPress={onComplete}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-3 px-4"
            >
              <Text className="text-sm font-semibold text-slate-600 text-center">
                Pular
              </Text>
            </Pressable>

            <Pressable
              onPress={onComplete}
              className="flex-1 rounded-xl bg-indigo-600 py-3 px-4"
            >
              <Text className="text-sm font-semibold text-white text-center">
                Começar agora
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
