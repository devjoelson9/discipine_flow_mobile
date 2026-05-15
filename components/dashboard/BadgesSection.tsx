import { Badge } from "@/types/dashboard";
import { Award, Lock } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface BadgesSectionProps {
  badges: Badge[];
}

export const BadgesSection: React.FC<BadgesSectionProps> = ({ badges }) => {
  return (
    <View className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
      <Text className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Gamification
      </Text>
      <Text className="text-lg font-bold text-slate-800 mt-2">
        Earned Badges
      </Text>
      <Text className="text-sm text-slate-500 mt-1">
        Progress toward milestones and consistency.
      </Text>

      <View className="mt-5 gap-3">
        {badges.map((badge) => (
          <View
            key={badge.id}
            className={`flex-row items-center gap-3 rounded-2xl border ${
              badge.earned
                ? "border-indigo-200 bg-indigo-50"
                : "border-slate-200 bg-slate-50"
            } px-3 py-3`}
          >
            {/* Badge icon */}
            <View
              className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                badge.earned ? "bg-indigo-600" : "bg-slate-300"
              }`}
            >
              {badge.earned ? (
                <Award size={20} color="#fff" />
              ) : (
                <Lock size={20} color="#9ca3af" />
              )}
            </View>

            {/* Badge info */}
            <View className="flex-1">
              <Text
                className={`text-sm font-semibold ${
                  badge.earned ? "text-slate-800" : "text-slate-600"
                }`}
              >
                {badge.name}
              </Text>
              <Text
                className={`text-xs mt-0.5 ${
                  badge.earned ? "text-slate-600" : "text-slate-500"
                }`}
              >
                {badge.description}
              </Text>
            </View>

            {/* Status */}
            <View className="items-end">
              <Text
                className={`text-xs font-semibold ${
                  badge.earned ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {badge.earned ? "Earned" : "Locked"}
              </Text>
              {badge.earned_at && (
                <Text className="text-xs text-slate-400 mt-0.5">
                  {new Date(badge.earned_at).toLocaleDateString("pt-BR")}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {badges.length === 0 && (
        <View className="mt-5 py-8 items-center">
          <Award size={32} color="#d1d5db" />
          <Text className="text-sm text-slate-500 mt-3 text-center">
            No badges earned yet.
          </Text>
          <Text className="text-xs text-slate-400 mt-1 text-center">
            Keep studying to unlock your first badge!
          </Text>
        </View>
      )}
    </View>
  );
};
