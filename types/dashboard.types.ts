/**
 * Tipos e Interfaces para o Dashboard
 * Use este arquivo para manter tipos consistentes em toda a aplicação
 */

// ============================================
// TIPOS PRINCIPAIS DO DASHBOARD
// ============================================

export interface Stats {
  estudos_hoje: number;
  tarefas_pendentes: number;
  tarefas_total: number;
  cronograma_semana: number;
  disciplinas: number;
  assuntos: number;
  cadernos: number;
  tarefas_concluidas: number;
}

export interface StudyTotals {
  day_minutes: number;
  week_minutes: number;
}

export interface StudyGoals {
  daily_goal: number;
  daily_progress: number;
  weekly_goal: number;
  weekly_progress: number;
}

export interface TimerState {
  running: boolean;
  session_id: string | null;
  elapsed_seconds: number;
}

export interface WeeklyResume {
  total_minutes: number;
  top_discipline?: TopDiscipline;
}

export interface TopDiscipline {
  disciplina: string;
  minutos: number;
}

export interface DashboardData {
  stats: Stats;
  studyTotals: StudyTotals;
  studyGoals: StudyGoals;
  timerState: TimerState;
  weeklyResume: WeeklyResume;
}

// ============================================
// COMPONENTES
// ============================================

export interface OnboardingModalProps {
  onComplete: () => void;
}

export interface StatsCardsProps {
  stats: Stats;
}

export interface TimerSectionProps {
  studyTotals: StudyTotals;
  studyGoals: StudyGoals;
  timerState: TimerState;
  userShowsTimerWidget: boolean;
}

export interface WeeklySummaryProps {
  weeklyResume: WeeklyResume;
}

// ============================================
// RESPOSTAS DA API
// ============================================

export interface DashboardAPIResponse {
  success: boolean;
  data: DashboardData;
  message?: string;
  error?: string;
}

export interface OnboardingCompleteResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    show_onboarding: boolean;
  };
}

// ============================================
// REQUISIÇÕES À API
// ============================================

export interface FetchDashboardOptions {
  token: string;
  userId?: string;
}

export interface CompleteOnboardingPayload {
  completed_at: string;
  user_id?: string;
}

// ============================================
// CONTEXTO DE AUTENTICAÇÃO
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  show_timer_widget?: boolean;
  show_onboarding?: boolean;
  avatar_url?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// ============================================
// UTILITÁRIOS
// ============================================

export interface TimeFormat {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string; // "2h 30m"
}

export interface ProgressData {
  current: number;
  goal: number;
  percentage: number;
  remaining: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

// ============================================
// FUNÇÕES HELPER PARA TIPOS
// ============================================

/**
 * Converte minutos em formato legível
 */
export function formatMinutesToTime(minutes: number): TimeFormat {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const seconds = 0;

  return {
    hours,
    minutes: mins,
    seconds,
    formatted: `${hours}h ${mins}m`,
  };
}

/**
 * Calcula percentual de progresso
 */
export function calculateProgress(current: number, goal: number): ProgressData {
  const percentage = goal > 0 ? Math.round((current / goal) * 100) : 0;
  const remaining = Math.max(0, goal - current);

  return {
    current,
    goal,
    percentage,
    remaining,
  };
}

/**
 * Obtem início e fim da semana
 */
export function getWeekDateRange(): DateRange {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return { start, end };
}

/**
 * Formata data em padrão brasileiro
 */
export function formatDateBR(date: Date): string {
  return date.toLocaleDateString("pt-BR");
}

/**
 * Cria dados simulados para teste
 */
export function createMockDashboardData(): DashboardData {
  return {
    stats: {
      estudos_hoje: 2,
      tarefas_pendentes: 5,
      tarefas_total: 12,
      cronograma_semana: 8,
      disciplinas: 4,
      assuntos: 15,
      cadernos: 3,
      tarefas_concluidas: 7,
    },
    studyTotals: {
      day_minutes: 120,
      week_minutes: 600,
    },
    studyGoals: {
      daily_goal: 180,
      daily_progress: 67,
      weekly_goal: 1200,
      weekly_progress: 50,
    },
    timerState: {
      running: false,
      session_id: null,
      elapsed_seconds: 0,
    },
    weeklyResume: {
      total_minutes: 600,
      top_discipline: {
        disciplina: "Matemática",
        minutos: 250,
      },
    },
  };
}
