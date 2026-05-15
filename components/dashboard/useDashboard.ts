import { apiClient } from "@/services/api";
import { DashboardData } from "@/types/dashboard";
import { useCallback, useEffect, useState } from "react";

interface UseDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  refresh: () => Promise<void>;
  isRefreshing: boolean;
}

// Mock data for development/testing
const getMockDashboardData = (): DashboardData => ({
  stats: {
    estudos_hoje: 2,
    tarefas_pendentes: 5,
    tarefas_total: 12,
    cronograma_semana: 8,
    disciplinas: 4,
    assuntos: 24,
    cadernos: 3,
    tarefas_concluidas: 7,
  },
  studyTotals: {
    day_minutes: 180,
    week_minutes: 720,
  },
  studyGoals: {
    daily_goal: 240,
    daily_progress: 75,
    weekly_goal: 1400,
    weekly_progress: 52,
  },
  timerState: {
    running: false,
    session_id: null,
    elapsed_seconds: 0,
  },
  weeklyResume: {
    total_minutes: 720,
    top_discipline: {
      disciplina: "Matemática",
      minutos: 300,
    },
  },
  chartWeekData: {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    values: [120, 150, 100, 200, 180, 100, 50],
  },
  chartTaskData: {
    labels: ["Concluídas", "Pendentes"],
    values: [7, 5],
  },
  streaks: {
    current: 12,
    longest: 25,
  },
  heatmap: {
    "2024-01-01": 60,
    "2024-01-02": 120,
    "2024-01-03": 90,
    "2024-01-04": 150,
    "2024-01-05": 200,
  },
  badges: [
    {
      id: 1,
      name: "Primeira Sessão",
      description: "Complete sua primeira sessão de estudo",
      icon: "fa-medal",
      earned: true,
      earned_at: "2024-01-01",
    },
    {
      id: 2,
      name: "Uma Semana",
      description: "Estude por 7 dias consecutivos",
      icon: "fa-fire",
      earned: false,
    },
  ],
  proximosEstudos: [
    {
      id: 1,
      disciplina: { id: 1, nome: "Matemática", name: "Matemática" },
      assunto: { id: 1, titulo: "Cálculo" },
      data_estudo: "2024-01-15",
      conteudo_planejado: "Revisão de derivadas e integrais",
    },
    {
      id: 2,
      disciplina: { id: 2, nome: "Português", name: "Português" },
      assunto: { id: 2, titulo: "Literatura" },
      data_estudo: "2024-01-16",
      conteudo_planejado: "Análise de obras clássicas",
    },
  ],
  proximaProva: {
    id: 1,
    nome: "Prova de Matemática",
    data_prova: "2024-02-15",
  },
  disciplinasEmFoco: [
    {
      id: 1,
      nome: "Matemática",
      name: "Matemática",
      estudos_planejados_count: 5,
    },
    {
      id: 2,
      nome: "Português",
      name: "Português",
      estudos_planejados_count: 3,
    },
    { id: 3, nome: "História", name: "História", estudos_planejados_count: 2 },
  ],
  revisoesDHoje: [],
  weekStart: "2024-01-08",
  weekEnd: "2024-01-14",
  showOnboarding: false,
  userTimerWidgetEnabled: true,
  userCanAccessAdvancedStats: true,
});

export const useDashboard = (
  useMockData: boolean = false,
): UseDashboardReturn => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      let dashboardData: DashboardData;

      if (useMockData) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        dashboardData = getMockDashboardData();
      } else {
        dashboardData = await apiClient.getDashboardData();
      }

      setData(dashboardData);
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to fetch dashboard data");
      setError(error);
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [useMockData]);

  const refetch = useCallback(async () => {
    setLoading(true);
    await fetchData();
  }, [fetchData]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchData();
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    refresh,
    isRefreshing,
  };
};
