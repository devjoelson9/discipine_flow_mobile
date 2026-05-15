# API Integration Examples

## Expected Data Structure

Your Laravel backend should return data matching these TypeScript interfaces. Here are examples:

### Dashboard Endpoint Response

**Endpoint**: `GET /api/dashboard`

```json
{
  "success": true,
  "data": {
    "stats": {
      "estudos_hoje": 2,
      "tarefas_pendentes": 5,
      "tarefas_total": 12,
      "cronograma_semana": 8,
      "disciplinas": 4,
      "assuntos": 24,
      "cadernos": 3,
      "tarefas_concluidas": 7
    },
    "studyTotals": {
      "day_minutes": 180,
      "week_minutes": 720
    },
    "studyGoals": {
      "daily_goal": 240,
      "daily_progress": 75,
      "weekly_goal": 1400,
      "weekly_progress": 52
    },
    "timerState": {
      "running": false,
      "session_id": null,
      "elapsed_seconds": 0
    },
    "weeklyResume": {
      "total_minutes": 720,
      "top_discipline": {
        "disciplina": "Matemática",
        "minutos": 300
      }
    },
    "chartWeekData": {
      "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      "values": [120, 150, 100, 200, 180, 100, 50]
    },
    "chartTaskData": {
      "labels": ["Completed", "Pending"],
      "values": [7, 5]
    },
    "streaks": {
      "current": 12,
      "longest": 25
    },
    "heatmap": {
      "2025-01-01": 60,
      "2025-01-02": 120,
      "2025-01-03": 90
    },
    "badges": [
      {
        "id": 1,
        "name": "First Session",
        "description": "Complete your first study session",
        "icon": "fa-medal",
        "earned": true,
        "earned_at": "2025-01-01"
      }
    ],
    "proximosEstudos": [
      {
        "id": 1,
        "disciplina": {
          "id": 1,
          "nome": "Matemática",
          "name": "Matemática"
        },
        "assunto": {
          "id": 1,
          "titulo": "Cálculo"
        },
        "data_estudo": "2025-01-15",
        "conteudo_planejado": "Derivatives and integrals review"
      }
    ],
    "proximaProva": {
      "id": 1,
      "nome": "Mathematics Test",
      "data_prova": "2025-02-15"
    },
    "disciplinasEmFoco": [
      {
        "id": 1,
        "nome": "Matemática",
        "name": "Matemática",
        "estudos_planejados_count": 5
      }
    ],
    "revisoesDHoje": [
      {
        "id": 1,
        "titulo": "Linear Algebra",
        "data_revisao": "2025-01-14",
        "status": "pendente"
      }
    ],
    "weekStart": "2025-01-08",
    "weekEnd": "2025-01-14",
    "showOnboarding": false,
    "userTimerWidgetEnabled": true,
    "userCanAccessAdvancedStats": true
  }
}
```

---

## Laravel Controller Example

Here's how your Laravel backend might look:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $user = auth()->user();

        $data = [
            'stats' => $this->getStats($user),
            'studyTotals' => $this->getStudyTotals($user),
            'studyGoals' => $this->getStudyGoals($user),
            'timerState' => $this->getTimerState($user),
            'weeklyResume' => $this->getWeeklyResume($user),
            'chartWeekData' => $this->getChartWeekData($user),
            'chartTaskData' => $this->getChartTaskData($user),
            'streaks' => $this->getStreaks($user),
            'heatmap' => $this->getHeatmap($user),
            'badges' => $user->badges()->with('users')->get(),
            'proximosEstudos' => $this->getUpcomingStudies($user),
            'proximaProva' => $this->getNextExam($user),
            'disciplinasEmFoco' => $this->getFocusedDisciplines($user),
            'revisoesDHoje' => $this->getReviewsToday($user),
            'weekStart' => now()->startOfWeek()->format('Y-m-d'),
            'weekEnd' => now()->endOfWeek()->format('Y-m-d'),
            'showOnboarding' => !$user->has_completed_onboarding,
            'userTimerWidgetEnabled' => $user->show_timer_widget,
            'userCanAccessAdvancedStats' => $user->hasSubscription('premium'),
        ];

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    private function getStats($user)
    {
        return [
            'estudos_hoje' => $user->estudos()->whereDate('created_at', today())->count(),
            'tarefas_pendentes' => $user->tarefas()->where('status', 'pendente')->count(),
            'tarefas_total' => $user->tarefas()->count(),
            'cronograma_semana' => $user->cronogramas()->whereBetween('data_estudo', [
                now()->startOfWeek(),
                now()->endOfWeek()
            ])->count(),
            'disciplinas' => $user->disciplinas()->count(),
            'assuntos' => $user->assuntos()->count(),
            'cadernos' => $user->cadernos()->count(),
            'tarefas_concluidas' => $user->tarefas()->where('status', 'concluida')->count(),
        ];
    }

    private function getStudyTotals($user)
    {
        $today = $user->estudos()
            ->whereDate('data_estudo', today())
            ->sum('duracao_minutos');

        $week = $user->estudos()
            ->whereBetween('data_estudo', [
                now()->startOfWeek(),
                now()->endOfWeek()
            ])
            ->sum('duracao_minutos');

        return [
            'day_minutes' => $today ?? 0,
            'week_minutes' => $week ?? 0,
        ];
    }

    private function getChartWeekData($user)
    {
        $labels = [];
        $values = [];

        for ($i = 0; $i < 7; $i++) {
            $date = now()->startOfWeek()->addDays($i);
            $labels[] = $date->format('D');

            $minutes = $user->estudos()
                ->whereDate('data_estudo', $date)
                ->sum('duracao_minutos');

            $values[] = $minutes ?? 0;
        }

        return ['labels' => $labels, 'values' => $values];
    }

    // ... implement other private methods similarly
}
```

---

## API Client Configuration

Update `services/api.ts` with your actual endpoints:

```typescript
// services/api.ts

async getDashboardData(): Promise<DashboardData> {
  try {
    const response = await this.instance.get<ApiResponse<DashboardData>>(
      '/dashboard'  // Change to your endpoint
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.message || 'Failed to fetch');
  } catch (error) {
    this.handleError(error);
    throw error;
  }
}

async getStats() {
  return this.instance.get('/dashboard/stats')
    .then(res => res.data);
}

async getChartData() {
  return this.instance.get('/dashboard/charts')
    .then(res => res.data);
}
```

---

## Environment Setup

**.env.local** (in project root)

```
# API Configuration
EXPO_PUBLIC_API_URL=http://192.168.1.100:8000/api
EXPO_PUBLIC_API_TIMEOUT=10000

# Feature Flags
EXPO_PUBLIC_ENABLE_HEATMAP=true
EXPO_PUBLIC_ENABLE_BADGES=true
```

---

## Testing Integration

### Step 1: Test Mock Data (Default)

```bash
npm start
# Mock data loads instantly
```

### Step 2: Switch to API

```typescript
// components/dashboard/useDashboard.ts
const useMockData = false; // Change this to false

export const useDashboard = (useMockData: boolean = false) => {
  // Now it fetches from API
};
```

### Step 3: Check Network Requests

In React DevTools Network tab, you should see:

- `GET /dashboard` - Returns all dashboard data

If errors occur:

- 401: Authentication issue
- 404: Endpoint not found
- 500: Server error

---

## Authentication Flow

```typescript
// Login endpoint
async login(email: string, password: string) {
  const response = await apiClient.instance.post('/login', {
    email,
    password,
  });

  const token = response.data.token;

  // Store token
  await AsyncStorage.setItem('auth_token', token);

  // API client automatically includes it in requests
}

// Logout endpoint
async logout() {
  await apiClient.instance.post('/logout');

  // Clear token
  await AsyncStorage.removeItem('auth_token');
  apiClient.clearAuthToken();
}
```

---

## Error Handling

The app automatically handles:

- **401 (Unauthorized)** - Logout user, redirect to login
- **404 (Not Found)** - Show friendly error message
- **500 (Server Error)** - Retry option with exponential backoff
- **Network Error** - Use cached data if available

---

## Data Validation

The API client expects consistent data structures. Ensure:

1. **All fields are present** (use null if no data)
2. **Dates are ISO 8601 format** (YYYY-MM-DD)
3. **Numbers are actual numbers**, not strings
4. **Boolean values are true/false**, not "true"/"false"
5. **Arrays are always arrays**, even if empty

Example:

```json
{
  "estudos_hoje": 2, // ✅ number
  "tarefas_total": "12", // ❌ string - convert to number
  "data_estudo": "01/15/2025", // ❌ wrong format - use "2025-01-15"
  "show_timer_widget": "true", // ❌ string - use true
  "proximosEstudos": null, // ✅ null is okay
  "proximosEstudos": [] // ✅ empty array is okay
}
```

---

## Performance Optimization

### For Large Datasets

If you have many records, paginate:

```typescript
async getUpcomingStudies(page: number = 1): Promise<Estudo[]> {
  const response = await this.instance.get('/dashboard/upcoming-studies', {
    params: { page, per_page: 20 }
  });
  return response.data.data;
}
```

### For Real-time Updates

Use polling or WebSockets:

```typescript
// Poll every 30 seconds
const REFRESH_INTERVAL = 30000;

useEffect(() => {
  const interval = setInterval(() => {
    refresh();
  }, REFRESH_INTERVAL);

  return () => clearInterval(interval);
}, [refresh]);
```

---

## Common Issues & Solutions

| Issue        | Cause                       | Solution                                |
| ------------ | --------------------------- | --------------------------------------- |
| 401 errors   | No token or expired         | Ensure token is stored in AsyncStorage  |
| 404 errors   | Wrong endpoint              | Check endpoint names in API client      |
| 500 errors   | Server issue                | Check backend logs                      |
| CORS errors  | Frontend origin not allowed | Update CORS config on backend           |
| Blank fields | Missing data                | Ensure all fields are returned from API |
| Slow loading | Large payloads              | Implement pagination or caching         |

---

## Testing Endpoints with Curl

```bash
# Get dashboard data
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/dashboard

# Get stats
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/dashboard/stats

# Get charts
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/dashboard/charts
```

---

## Next Steps

1. ✅ Implement Laravel backend endpoints
2. ✅ Test endpoints with Curl or Postman
3. ✅ Set `EXPO_PUBLIC_API_URL` in `.env.local`
4. ✅ Change `useMockData = false` in hook
5. ✅ Test app with real data
6. ✅ Debug any API mismatches
7. ✅ Deploy!

---

Created: 2025-05-15
