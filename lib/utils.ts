/**
 * Função utilitária para mesclar classes condicionais
 * Similar ao clsx ou classnames
 */
export function cn(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes
    .filter((cls): cls is string => typeof cls === "string")
    .join(" ");
}
