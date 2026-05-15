/\*\*

- Exemplos de Integração da API com o Dashboard
-
- Este arquivo mostra como conectar o DashboardScreen
- com endpoints reais da sua API.
  \*/

// ============================================
// EXEMPLO 1: Usando Fetch com AuthToken
// ============================================

export const fetchDashboardData = async (token: string) => {
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

try {
// Buscar todas as estatísticas do dashboard
const response = await fetch(`${API_URL}/api/dashboard`, {
method: 'GET',
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${token}`,
},
});

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    return {
      stats: {
        estudos_hoje: data.estudos_hoje || 0,
        tarefas_pendentes: data.tarefas_pendentes || 0,
        tarefas_total: data.tarefas_total || 0,
        cronograma_semana: data.cronograma_semana || 0,
        disciplinas: data.disciplinas || 0,
        assuntos: data.assuntos || 0,
        cadernos: data.cadernos || 0,
        tarefas_concluidas: data.tarefas_concluidas || 0,
      },
      studyTotals: {
        day_minutes: data.day_minutes || 0,
        week_minutes: data.week_minutes || 0,
      },
      studyGoals: {
        daily_goal: data.daily_goal || 0,
        daily_progress: data.daily_progress || 0,
        weekly_goal: data.weekly_goal || 0,
        weekly_progress: data.weekly_progress || 0,
      },
      timerState: {
        running: data.timer_running || false,
        session_id: data.timer_session_id || null,
        elapsed_seconds: data.elapsed_seconds || 0,
      },
      weeklyResume: {
        total_minutes: data.weekly_total_minutes || 0,
        top_discipline: data.top_discipline || null,
      },
    };

} catch (error) {
console.error('Erro ao buscar dados do dashboard:', error);
throw error;
}
};

// ============================================
// EXEMPLO 2: Usar no DashboardScreen
// ============================================

/\*
import { useAuth } from '@/context/auth';
import { useEffect, useState } from 'react';
import { fetchDashboardData } from '@/services/dashboard';

export default function DashboardScreen() {
const { user, token } = useAuth();
const [loading, setLoading] = useState(true);
const [stats, setStats] = useState(null);
// ... outros states

useEffect(() => {
const loadData = async () => {
try {
if (!token) return;

        const data = await fetchDashboardData(token);
        setStats(data.stats);
        setStudyTotals(data.studyTotals);
        setStudyGoals(data.studyGoals);
        setTimerState(data.timerState);
        setWeeklyResume(data.weeklyResume);
      } catch (error) {
        // Mostrar toast de erro
      } finally {
        setLoading(false);
      }
    };

    loadData();

}, [token]);

// ... resto do componente
}
\*/

// ============================================
// EXEMPLO 3: Endpoints Esperados da API
// ============================================

/_
GET /api/dashboard
Resposta Esperada:
{
"estudos_hoje": 2,
"tarefas_pendentes": 5,
"tarefas_total": 12,
"cronograma_semana": 8,
"disciplinas": 4,
"assuntos": 15,
"cadernos": 3,
"tarefas_concluidas": 7,
"day_minutes": 120,
"week_minutes": 600,
"daily_goal": 180,
"daily_progress": 67,
"weekly_goal": 1200,
"weekly_progress": 50,
"timer_running": false,
"timer_session_id": null,
"elapsed_seconds": 0,
"weekly_total_minutes": 600,
"top_discipline": {
"disciplina": "Matemática",
"minutos": 250
}
}
_/

// ============================================
// EXEMPLO 4: Com React Query (Recomendado)
// ============================================

/\*
import { useQuery } from '@tanstack/react-query';

export const useDashboardData = (token: string) => {
return useQuery({
queryKey: ['dashboard'],
queryFn: () => fetchDashboardData(token),
refetchInterval: 30000, // Atualizar a cada 30s
enabled: !!token,
});
};

// No componente:
const { data, isLoading, error } = useDashboardData(token);

if (isLoading) return <Loading />;
if (error) return <ErrorScreen error={error} />;

return <DashboardScreen data={data} />;
\*/

// ============================================
// EXEMPLO 5: Completar Onboarding
// ============================================

export const completeOnboarding = async (token: string) => {
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

try {
const response = await fetch(`${API_URL}/api/user/onboarding/complete`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${token}`,
},
body: JSON.stringify({
completed_at: new Date().toISOString(),
}),
});

    if (!response.ok) {
      throw new Error('Erro ao completar onboarding');
    }

    return await response.json();

} catch (error) {
console.error('Erro:', error);
throw error;
}
};

// ============================================
// EXEMPLO 6: Tipagem TypeScript Completa
// ============================================

export interface DashboardData {
stats: Stats;
studyTotals: StudyTotals;
studyGoals: StudyGoals;
timerState: TimerState;
weeklyResume: WeeklyResume;
}

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
top_discipline?: {
disciplina: string;
minutos: number;
};
}
