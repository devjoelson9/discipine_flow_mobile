import { apiClient } from "@/services/api";
import { TimerState } from "@/types/dashboard";
import { useCallback, useEffect, useState } from "react";

interface UseStudyTimerReturn {
  timerState: TimerState | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isRunning: boolean;
  elapsedTime: string;
  formattedTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const useStudyTimer = (
  autoRefreshInterval: number = 5000,
): UseStudyTimerReturn => {
  const [timerState, setTimerState] = useState<TimerState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTimerState = useCallback(async () => {
    try {
      setError(null);
      const response = await apiClient.getTimerState();
      setTimerState(response.data || response);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch timer state");
      setError(error);
      console.error("Error fetching timer state:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchTimerState();
  }, [fetchTimerState]);

  useEffect(() => {
    fetchTimerState();
  }, [fetchTimerState]);

  // Auto-refresh timer state at regular intervals
  useEffect(() => {
    if (!autoRefreshInterval || autoRefreshInterval <= 0) return;

    const interval = setInterval(() => {
      refetch();
    }, autoRefreshInterval);

    return () => clearInterval(interval);
  }, [autoRefreshInterval, refetch]);

  // Calculate formatted time
  const getFormattedTime = () => {
    const seconds = timerState?.elapsed_seconds || 0;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, seconds: secs };
  };

  const getElapsedTimeString = () => {
    const { hours, minutes, seconds } = getFormattedTime();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return {
    timerState,
    loading,
    error,
    refetch,
    isRunning: timerState?.running || false,
    elapsedTime: getElapsedTimeString(),
    formattedTime: getFormattedTime(),
  };
};
