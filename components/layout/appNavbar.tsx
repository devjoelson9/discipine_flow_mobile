import {
  Bell,
  ChevronDown,
  Menu,
  Settings,
  User,
  LogOut,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSidebar } from "~/context/sidebar";

export default function AppNavbar() {
  const { toggleSidebar } = useSidebar();

  const [open, setOpen] = useState(false);

  // animação da seta
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // animação dropdown
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const toValue = open ? 0 : 1;

    setOpen(!open);

    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue,
        duration: 220,
        useNativeDriver: true,
      }),

      Animated.spring(dropdownAnim, {
        toValue,
        tension: 70,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const dropdownTranslate = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  return (
    <>
      {/* NAVBAR */}
      <View className="border-b border-slate-200 bg-white/95 px-5 pb-4 pt-14">
        <View className="flex-row items-center justify-between">
          {/* LEFT */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={toggleSidebar}
              activeOpacity={0.8}
              className="h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50"
            >
              <Menu size={20} color="#475569" />
            </TouchableOpacity>

            <View>
              <Text className="text-sm text-slate-500">Olá,</Text>

              <Text className="text-lg font-bold text-slate-800">
                Joelson 👋
              </Text>
            </View>
          </View>

          {/* RIGHT */}
          <View className="flex-row items-center gap-3">
            {/* NOTIFICAÇÃO */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50"
            >
              <Bell size={18} color="#334155" />
            </TouchableOpacity>

            {/* USER */}
            <View className="relative">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={toggleDropdown}
                className="flex-row items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1"
              >
                <Image
                  source={{
                    uri: "https://i.pravatar.cc/100",
                  }}
                  className="h-10 w-10 rounded-full"
                />

                <View className="hidden md:flex">
                  <Text className="text-sm font-bold text-slate-700">
                    Joelson
                  </Text>

                  <Text className="text-xs text-slate-400">
                    Plano Pro
                  </Text>
                </View>

                {/* SETA ANIMADA */}
                <Animated.View
                  style={{
                    transform: [{ rotate }],
                  }}
                >
                  <ChevronDown size={16} color="#64748b" />
                </Animated.View>
              </TouchableOpacity>

              {/* DROPDOWN */}
              {open && (
                <TouchableWithoutFeedback
                  onPress={() => setOpen(false)}
                >
                  <View className="absolute right-0 top-16 z-50">
                    <Animated.View
                      style={{
                        opacity: dropdownAnim,
                        transform: [
                          { translateY: dropdownTranslate },
                          { scale: dropdownAnim },
                        ],
                      }}
                      className="w-64 rounded-3xl border border-slate-200 bg-white shadow-2xl"
                    >
                      {/* HEADER */}
                      <View className="border-b border-slate-100 bg-slate-50 px-5 py-4 rounded-t-3xl">
                        <Text className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Conta
                        </Text>

                        <Text className="mt-2 text-sm font-bold text-slate-800">
                          Joelson Silva
                        </Text>

                        <Text className="text-xs text-slate-500">
                          joelson@estudos.com
                        </Text>

                        <Text className="mt-1 text-xs text-indigo-500">
                          Plano Pro
                        </Text>
                      </View>

                      {/* MENU */}
                      <View className="p-2">
                        <TouchableOpacity className="flex-row items-center gap-3 rounded-2xl px-4 py-3">
                          <User size={18} color="#475569" />

                          <Text className="font-medium text-slate-700">
                            Perfil
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-row items-center gap-3 rounded-2xl px-4 py-3">
                          <Settings size={18} color="#475569" />

                          <Text className="font-medium text-slate-700">
                            Configurações
                          </Text>
                        </TouchableOpacity>

                        <View className="my-2 h-px bg-slate-100" />

                        <TouchableOpacity className="flex-row items-center gap-3 rounded-2xl px-4 py-3">
                          <LogOut size={18} color="#ef4444" />

                          <Text className="font-medium text-red-500">
                            Sair
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Animated.View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
}