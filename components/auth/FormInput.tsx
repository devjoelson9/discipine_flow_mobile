import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { cn } from "~/lib/utils";

interface FormInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "phone-pad"
    | "decimal-pad"
    | "numeric";
  editable?: boolean;
  error?: string;
  testID?: string;
}

export const FormInput = React.forwardRef<TextInput, FormInputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      secureTextEntry = false,
      keyboardType = "default",
      editable = true,
      error,
      testID,
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPasswordField = secureTextEntry;

    return (
      <View className="space-y-1.5">
        <Text className="text-sm font-semibold text-slate-700">{label}</Text>

        <View
          className={`
  relative flex-row items-center rounded-lg border px-2 py-1
  ${isFocused ? "border-indigo-500 bg-white" : "border-slate-300 bg-slate-50"}
  ${error ? "border-rose-500 bg-rose-50" : ""}
  ${!editable ? "opacity-60" : ""}
`}
        >
          <TextInput
            ref={ref}
            testID={testID}
            placeholder={placeholder}
            placeholderTextColor="#cbd5e1"
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isPasswordField && !showPassword}
            keyboardType={keyboardType}
            editable={editable}
            className="flex-1 text-base font-medium text-slate-900"
          />

          {isPasswordField && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="ml-2 p-2"
              accessibilityLabel={
                showPassword ? "Ocultar senha" : "Mostrar senha"
              }
              accessibilityRole="button"
            >
              {showPassword ? (
                <EyeOff size={20} color="#64748b" />
              ) : (
                <Eye size={20} color="#64748b" />
              )}
            </TouchableOpacity>
          )}
        </View>

        {error && (
          <Text className="text-xs font-medium text-rose-600">{error}</Text>
        )}
      </View>
    );
  },
);

FormInput.displayName = "FormInput";
