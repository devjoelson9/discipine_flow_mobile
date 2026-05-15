import React from "react";
import { Text, View } from "react-native";

interface Study {
  id: string;
  discipline: string;
  subject: string;
  date: string;
  content: string;
}

interface UpcomingStudiesProps {
  studies: Study[];
}

export default function UpcomingStudies({ studies }: UpcomingStudiesProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  if (studies.length === 0) {
    return (
      <View className="mb-6">
        <View className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Text className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Upcoming Studies
          </Text>
          <View className="items-center justify-center py-8">
            <Text className="text-base font-semibold text-slate-500 mb-2">
              No upcoming studies
            </Text>
            <Text className="text-xs text-slate-400 text-center">
              Schedule your study sessions to see them here
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
          Upcoming Studies
        </Text>

        <View className="gap-3">
          {studies.map((study) => (
            <View
              key={study.id}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-sm font-bold text-slate-900 flex-1">
                  {study.discipline}
                </Text>
                <Text className="text-xs text-slate-500 ml-2">
                  {formatDate(study.date)}
                </Text>
              </View>

              <Text className="text-xs font-semibold text-indigo-600 mb-1">
                {study.subject}
              </Text>

              <Text className="text-xs text-slate-600">
                {study.content}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
