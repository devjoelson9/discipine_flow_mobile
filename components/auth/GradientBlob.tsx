import React from "react";
import { View } from "react-native";

interface GradientBlobProps {
  position: "top-right" | "bottom-left";
}

export const GradientBlob: React.FC<GradientBlobProps> = ({ position }) => {
  const topRightClasses = "absolute -top-32 -right-16 h-72 w-72";
  const bottomLeftClasses = "absolute -bottom-32 -left-16 h-72 w-72";
  const baseClasses = "rounded-full blur-3xl";
  const positionClasses =
    position === "top-right" ? topRightClasses : bottomLeftClasses;
  const colorClasses =
    position === "top-right" ? "bg-indigo-200/40" : "bg-sky-200/40";

  return (
    <View className={`${positionClasses} ${baseClasses} ${colorClasses}`} />
  );
};
