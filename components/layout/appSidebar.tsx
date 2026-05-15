import {
    BookOpen,
    Brain,
    Calendar,
    Clock3,
    Cog,
    Crown,
    HelpCircle,
    Home,
    NotebookPen,
    Users,
    X,
} from "lucide-react-native";

import { router, usePathname } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

const menuSections = [
  {
    title: "Estudos",
    items: [
      {
        label: "Dashboard",
        icon: Home,
        route: "/(app)/dashboard",
      },
      {
        label: "Minhas tarefas",
        icon: NotebookPen,
        route: "/(app)/tarefas",
      },
      {
        label: "Cronograma",
        icon: Calendar,
        route: "/(app)/cronograma",
      },
      {
        label: "Timer",
        icon: Clock3,
        route: "/(app)/timer",
      },
    ],
  },

  {
    title: "Organização",
    items: [
      {
        label: "Cadernos",
        icon: BookOpen,
        route: "/(app)/cadernos",
      },
    ],
  },

  {
    title: "Ferramentas",
    items: [
      {
        label: "IA Estudos",
        icon: Brain,
        route: "/(app)/ia",
      },
      {
        label: "Configurações",
        icon: Cog,
        route: "/(app)/configuracoes",
      },
    ],
  },

  {
    title: "Sistema",
    items: [
      {
        label: "Admin usuários",
        icon: Users,
        route: "/(app)/admin/usuarios",
      },
      {
        label: "Ajuda",
        icon: HelpCircle,
        route: "/(app)/ajuda",
      },
      {
        label: "Upgrade",
        icon: Crown,
        route: "/(app)/upgrade",
      },
    ],
  },
];

export default function AppSidebar({ visible, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {visible && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="absolute inset-0 z-40 bg-black/40"
        />
      )}

      {/* Sidebar */}
      <View
        className={`absolute left-0 top-0 z-50 h-full w-72 bg-slate-900 ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <View className="border-b border-slate-800 px-6 pb-6 pt-14">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600">
                <BookOpen size={22} color="white" />
              </View>

              <Text className="text-xl font-black text-white">
                Discipline
                <Text className="text-indigo-500">Flow</Text>
              </Text>
            </View>

            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-4 py-5"
        >
          {menuSections.map((section) => (
            <View key={section.title} className="mb-6">
              <Text className="mb-3 ml-4 text-[10px] font-bold uppercase tracking-[2px] text-slate-500">
                {section.title}
              </Text>

              <View className="gap-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const active = pathname === item.route;

                  return (
                    <TouchableOpacity
                      key={item.label}
                      activeOpacity={0.8}
                      onPress={() => {
                        router.push(item.route as any);
                        onClose();
                      }}
                      className={`flex-row items-center gap-3 rounded-2xl px-4 py-3 ${
                        active ? "bg-indigo-600" : "bg-transparent"
                      }`}
                    >
                      <Icon size={20} color={active ? "white" : "#94a3b8"} />

                      <Text
                        className={`font-medium ${
                          active ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Footer User */}
        <View className="border-t border-slate-800 p-4">
          <View className="flex-row items-center gap-3 rounded-2xl bg-slate-800/70 p-3">
            <Image
              source={{
                uri: "https://i.pravatar.cc/100",
              }}
              className="h-11 w-11 rounded-xl"
            />

            <View className="flex-1">
              <Text numberOfLines={1} className="font-bold text-white">
                Joelson Silva
              </Text>

              <Text numberOfLines={1} className="text-xs text-slate-400">
                joelson@estudos.com
              </Text>

              <Text className="mt-1 text-[11px] text-indigo-400">
                Plano PRO
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
