import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface TimerSectionProps {
  studyTotals: {
    day_minutes: number;
    week_minutes: number;
  };
  studyGoals: {
    daily_goal: number;
    daily_progress: number;
    weekly_goal: number;
    weekly_progress: number;
  };
  timerState: any;
  userShowsTimerWidget: boolean;
}

const TimeCard = ({
  label,
  minutes,
  goal,
  progress,
  bgColor,
  textColor,
}: any) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return (
    <View className={`rounded-2xl ${bgColor} p-5 flex-1`}>
      <Text
        className={`text-xs uppercase tracking-widest font-semibold ${textColor}`}
      >
        {label}
      </Text>
      <Text className={`text-2xl font-bold mt-3 ${textColor}`}>
        {hours}h <Text className="text-lg">{mins}m</Text>
      </Text>
      <Text className={`text-xs mt-1 ${textColor.replace("600", "700")}`}>
        {minutes} min
      </Text>

      {goal > 0 && (
        <>
          <Text className={`text-xs mt-3 ${textColor.replace("600", "700")}`}>
            {hours}h {mins}m / {Math.floor(goal / 60)}h {goal % 60}m
          </Text>
          <View
            className={`mt-2 h-2 rounded-full ${bgColor.replace("50", "200")}`}
          >
            <View
              className={`h-2 rounded-full ${bgColor.replace("50", "600")}`}
              style={{ width: `${progress}%` }}
            />
          </View>
          <Text className={`text-xs mt-1 ${textColor.replace("600", "700")}`}>
            Progresso: {progress}%
          </Text>
        </>
      )}
    </View>
  );
};

export default function TimerSection({
  studyTotals,
  studyGoals,
  timerState,
  userShowsTimerWidget,
}: TimerSectionProps) {
  const timerRunning = timerState?.running ?? false;
  const timerSessionId = timerState?.session_id;
  const elapsedSeconds = timerState?.elapsed_seconds ?? 0;

  const timerStatus = timerRunning
    ? "Em andamento"
    : timerSessionId
      ? "Pausado"
      : "Desligado";
  const timerStatusColor = timerRunning
    ? "text-emerald-600"
    : timerSessionId
      ? "text-amber-600"
      : "text-slate-500";

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View className="mb-6">
      <View className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-1">
            <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Timer de estudo
            </Text>
            <Text className="text-lg font-bold text-slate-800 mb-1">
              Resumo rápido
            </Text>
            <Text className="text-sm text-slate-500">
              Acompanhe seu total diário e semanal.
            </Text>
          </View>

          {userShowsTimerWidget ? (
            <Pressable className="rounded-xl bg-indigo-600 px-4 py-2">
              <Text className="text-sm font-semibold text-white">
                Abrir timer
              </Text>
            </Pressable>
          ) : (
            <Link href="/" asChild>
              <Pressable className="rounded-xl border border-slate-200 px-4 py-2">
                <Text className="text-sm font-semibold text-slate-600">
                  Ativar no menu
                </Text>
              </Pressable>
            </Link>
          )}
        </View>

        {/* Time Cards */}
        <View className="flex-row gap-4 mb-6">
          <TimeCard
            label="Total hoje"
            minutes={studyTotals.day_minutes}
            goal={studyGoals.daily_goal}
            progress={studyGoals.daily_progress}
            bgColor="rounded-2xl border border-emerald-100 bg-emerald-50"
            textColor="text-emerald-700"
          />
          <TimeCard
            label="Total semana"
            minutes={studyTotals.week_minutes}
            goal={studyGoals.weekly_goal}
            progress={studyGoals.weekly_progress}
            bgColor="rounded-2xl border border-indigo-100 bg-indigo-50"
            textColor="text-indigo-700"
          />
        </View>

        {/* Timer Status */}
        <View className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <Text className="text-xs text-slate-500 mb-2">Status do timer</Text>
          <View className="flex-row items-center gap-2">
            <Text className={`text-sm font-semibold ${timerStatusColor}`}>
              {timerStatus}
            </Text>
            {!userShowsTimerWidget && (
              <Text className="text-xs text-slate-500">
                (widget desativado)
              </Text>
            )}
          </View>
          <Text className="text-xs text-slate-500 mt-2">
            Tempo atual: {formatTime(elapsedSeconds)}
          </Text>

          {!userShowsTimerWidget && (
            <Text className="text-xs text-amber-700 mt-2">
              Lembrete: sem o timer flutuante, você pode esquecer de registrar
              suas horas. Reative nas configurações quando quiser.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
