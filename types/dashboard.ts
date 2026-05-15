// Dashboard Statistics
export interface DashboardStats {
  estudos_hoje: number;
  tarefas_pendentes: number;
  tarefas_total: number;
  cronograma_semana: number;
  disciplinas: number;
  assuntos: number;
  cadernos: number;
  tarefas_concluidas: number;
}

// Study Totals
export interface StudyTotals {
  day_minutes: number;
  week_minutes: number;
}

// Study Goals
export interface StudyGoals {
  daily_goal: number;
  daily_progress: number;
  weekly_goal: number;
  weekly_progress: number;
}

// Timer State
export interface TimerState {
  running: boolean;
  session_id: number | null;
  elapsed_seconds: number;
}

// Weekly Resume Data
export interface TopDiscipline {
  disciplina: string;
  minutos: number;
}

export interface WeeklyResume {
  total_minutes: number;
  top_discipline: TopDiscipline | null;
}

// Chart Data
export interface ChartData {
  labels: string[];
  values: number[];
}

// Heatmap
export interface HeatmapDay {
  date: string;
  minutes: number;
}

// Streaks
export interface Streaks {
  current: number;
  longest: number;
}

// Badge
export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earned_at?: string;
}

// Estudo (Study/Schedule Item)
export interface Estudo {
  id: number;
  disciplina: {
    id: number;
    nome?: string;
    name: string;
  };
  assunto?: {
    id: number;
    titulo: string;
  };
  data_estudo: string;
  conteudo_planejado: string;
}

// Prova (Exam)
export interface Prova {
  id: number;
  nome: string;
  data_prova: string;
}

// Disciplina (Discipline)
export interface Disciplina {
  id: number;
  nome?: string;
  name: string;
  estudos_planejados_count: number;
}

// Revisao (Review)
export interface Revisao {
  id: number;
  titulo: string;
  data_revisao: string;
  status: "pendente" | "concluida" | "cancelada";
}

// Complete Dashboard Data
export interface DashboardData {
  stats: DashboardStats;
  studyTotals: StudyTotals;
  studyGoals: StudyGoals;
  timerState: TimerState;
  weeklyResume: WeeklyResume;
  chartWeekData: ChartData;
  chartTaskData: ChartData;
  streaks?: Streaks;
  heatmap?: Record<string, number>;
  badges?: Badge[];
  proximosEstudos: Estudo[];
  proximaProva: Prova | null;
  disciplinasEmFoco: Disciplina[];
  revisoesDHoje: Revisao[];
  weekStart: string;
  weekEnd: string;
  showOnboarding: boolean;
  userTimerWidgetEnabled: boolean;
  userCanAccessAdvancedStats: boolean;
}

// User Avatar
export interface Avatar {
  url: string;
  initials: string;
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
